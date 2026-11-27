# 棱镜共享会话与跨设备配置

每个 DSH Profile 有独立的共享 L1 会话、长期记忆、事件订阅与 Mesh 状态。Web 管理员可查看整个新会话。已获批的 IM 私聊参与同一个会话，答复、进度和后台通知沿原路由投递，项目权限按发起请求的身份校验。L1 会看到各入口的新消息，请只批准同一信任范围内的用户。

## 长期记忆与事件

安装 0.2.0 核心插件后，可以在同一 Profile 加装长期记忆 `@dsh-prism/dsh-memory` 和事件触发器 `@dsh-prism/dsh-triggers`。获取各插件的源码后，分别执行 `npm ci`、`npm run build`、`npm pack`，再在 DSH 插件页面选择各自的本地 `.tgz` 安装并启用。

- 记忆默认使用本机 BGE。首次使用会下载并校验 ONNX 文件和词表。已有离线文件时，在 `embedding` 下设置 `backend: onnx`、`modelPath` 和 `tokenizerDirectory`。
- 远端 BGE 使用 `backend: openai` 和 `model: bge-large-zh-v1.5`。用图片或视频进行语义检索时，设置 `model: Qwen3-VL-Embedding-8B`，服务需接受 vLLM 的多模态 `/v1/embeddings` 请求。将 `baseUrl` 设为服务地址（含 `/v1`），`apiKeyEnv` 填密钥的环境变量名。待嵌入的分片、查询和媒体会发送到该服务。
- Web 可直接添加图片和视频。IM 从平台取回原件，资源无法获取时提示改用 Web。一次消息最多八个附件，单个附件最多 16 MiB。可以请棱镜整理一份记忆，或者按内容找回已保存的资料。BGE 可检索文本和媒体描述，Qwen 可从媒体原件生成向量。
- Qwen 视频索引需要本机的 FFmpeg 和 FFprobe。可以从 PATH 启动，也可在记忆插件中用 `video.ffmpegPath` 和 `video.ffprobePath` 指定绝对路径。支持最长 180 秒的 MP4、MOV 和 WebM。每秒抽取一帧，按时间段索引，检索结果显示命中时间范围。原件继续保存在当前 Profile。
- 可以请棱镜订阅定时提醒或编写 TypeScript 事件 Provider。内置 `cron` 的 `expression` 接受标准五段表达式，`timezone` 接受 IANA 时区名，缺省为 UTC，`payload` 可附带事件资料。通知回到创建订阅的 Web 或 IM 私聊。停机期间错过的时刻跳过，已写入待投递队列的事件恢复发送。

### MSP 外部事件

`dsh-triggers` 用一个 `msp-ts` 节点维护发现、连接和重连。缺省关闭。启用时，在当前 Profile 补丁中填写与 MSP 节点共用的发现目录和允许连接的节点。默认连接回环地址，可用 `allowedHosts` 显式允许其他设备的 IP。

```yaml
- id: dsh-triggers
  config:
    msp:
      nodesDir: /absolute/path/to/msp-nodes
      nodeId: prism_bridge
      allowedNodes: [sensor_a]
```

L1 用已有的 `event_add` 和 `event_remove` 管理订阅。以下示例监听指定节点的温度路径，只在值变化时触发，入队后冷却 30 秒。

```json
{
  "providerId": "msp",
  "params": {
    "nodeId": "sensor_a",
    "path": "sensor.temperature.**",
    "cooldownMs": 30000,
    "changeOnly": true
  }
}
```

`path` 支持精确路径、`*` 和 `**`。冷却按订阅计算，变化判断按路径比较上次入队的 JSON 值。命中的信号以 `external.trigger` 进入 L1 Inbox，标记为 `untrusted`。L1 在独立上下文处理该信号，可以沿订阅原路由发通知。

## WebRTC 节点

每台设备使用 Node 24、唯一 `nodeId` 和独立的 Ed25519 密钥。把 PKCS#8 PEM 私钥全文写入 `webrtc.privateKeyEnv` 指向的环境变量。公钥用 SPKI DER 的 base64url 文本登记到信令服务及对端 `peers[].publicKey`。信令配置包含 `host`、`port`、`certFile`、`keyFile` 和 `nodes`（节点 ID 到公钥的映射）。用 0.2.0 的 `dsh-prism-mesh-signaling --config signaling.json` 启动 TLS 信令。

以下为执行设备的 Profile 补丁。协调端需反向登记 `worker` 公钥。私有信令 CA 可用 `signalingCaFile` 指定。

```yaml
- id: dsh-mesh-node
  config:
    nodeId: worker
    webrtc:
      signalingUrl: wss://signal.example.org:8443/prism/mesh/signaling/v2
      privateKeyEnv: PRISM_MESH_PRIVATE_KEY
      iceServers:
        - urls: ['stun:turn.example.org:3478']
        - urls: ['turn:turn.example.org:3478?transport=udp', 'turns:turn.example.org:5349?transport=tcp']
          username: prism
          credentialEnv: PRISM_TURN_PASSWORD
    peers:
      - id: hub
        publicKey: '<协调设备公钥>'
        projects: ['atlas']
```

在执行节点的注册表显式登记 `atlas`、该项目的本地绝对路径、`nodeId: worker`、主体与工具权限。协调端获得授权项目索引，以 `(nodeId, projectId)` 区分同名项目。需要强制中继时，把 `webrtc.iceTransportPolicy` 设为 `relay`。Session 历史在执行设备的 DSH 工作区查看。

`agent_spawn` 的 `agents` 每项填写 `nodeId`、`projectId`、`modelId`、`title`、`instruction` 和可选的 `permissions`。默认由 L1 协调。设为 `room: true` 时，本批 L2 可用 `peer_send` 互发消息，参与设备需互相登记公钥。`max_depth: 1` 只允许 L2，`2` 允许 L2 下派 L3，节点配置 `maxDepth` 还可进一步收紧。子代理通过 `send_parent` 把需要用户决定的问题交给 L1。

## 切换与回滚

1. 暂停新消息，等待执行中的任务结束。备份各设备的 DSH Profile、会话目录及旧 `$DSH_HOME/data/prism`，停止服务后再复制 SQLite 文件。
2. 在所有设备安装 [0.2.0 兼容组合](../website/docs/zh/guide/start.md)，并启动 WSS 信令。将旧 `peers[].url`、`tokenEnv` 与 `incoming` 替换为对端公钥与项目导出列表。先验证信令、STUN/TURN、工作区索引及一次只读派发，再恢复消息入口。
3. 新消息进入当前 Profile 的 `data/dsh-prism`。旧 Web 和 IM 会话数据原地归档。原 `web` Profile 可继续使用已有 IM 授权库。自定义过 `stateDirectory` 或 `statePath` 的实例沿用对应路径和备份。
4. 回滚时暂停消息入口，按节点组恢复旧版本、配置与备份。分别保留切换前后的日志和数据库。恢复前核对中断任务是否已经产生外部副作用。
