# 开发接口与源码配置

Web 前端通过受限且经过认证的 HTTP 接口与棱镜交互，宿主内的其他插件则通过 Cordis 服务接入，两者共享同一套主体归属校验。

## Web HTTP 接口

浏览器请求携带 DSH 登录 Cookie。POST 请求需要 `X-Prism-Request: 1` 请求头。消息和选模使用 JSON，上传附件使用原始媒体的 MIME 类型。服务端从认证主体推导 `owner`。

| 接口 | 用途 |
| --- | --- |
| `GET /prism/api/view` | 获取当前可见对话快照与获准的 L1 模型列表。 |
| `GET /prism/api/events` | 通过服务器发送事件（SSE）订阅消息及任务卡。命名事件 `appearance` 的数据为 `light`、`dark` 或 `system`。 |
| `POST /prism/api/message` | 提交 `text` 和客户端生成的稳定 `requestId`。可选的 `attachments` 数组可包含最多八个已上传的附件 ID。 |
| `POST /prism/api/attachment?name=…` | 上传最多 16 MiB 的图片或视频原始字节，取得其 `assetId`。需要[记忆插件](../guide/start.md#optional-plugins)。 |
| `GET /prism/api/attachment?id=…` | 读取当前认证主体有权访问的附件原件。 |
| `POST /prism/api/model` | 切换后续轮次使用的 L1 `modelId`。 |
| `GET /prism/api/trace?task=…` | 读取获准的本机任务记录。远程任务的响应会提示到执行节点的 DSH 工作区查看。 |

重试同一消息时复用原 `requestId`，服务端会去重。SSE 重连会重新发送最新对话快照。棱镜页面通过 DSH 工作区查看会话历史。

## Cordis 服务（`ctx.prism`）

| 方法 | 用途 |
| --- | --- |
| `ctx.prism.view(owner)` | 读取公开对话快照。 |
| `ctx.prism.message(owner, text, requestId?, source?, attachmentIds?)` | 将已认证的用户消息入队。 |
| `ctx.prism.selectModel(owner, modelId)` | 更改后续交互使用的 L1 模型。 |
| `ctx.prism.trace(owner, taskId)` | 读取所属任务的底层会话轨迹。 |
| `ctx.prism.subscribe(owner, listener)` | 订阅状态变更；调用返回的函数即可取消订阅。 |

外部集成必须由可信通道推导 `owner`。注册表查询只返回公开元数据，真实工作区路径仅在受信宿主代码中通过 `ctx.prismRegistry.resolve` 解析。

## 扩展 IM 通道

如需接入新的即时通讯平台，请实现 `ImTransport` 接口，提供稳定的通道/机器人命名空间、目标归属验证以及 `send` / `edit` 方法。请务必在 `ImGateway.receive` 成功后才向平台确认事件接收，并在重试时保持平台事件 ID 稳定。

## 源码启动器中的 IM 配置

通过 DSH 插件管理器安装的用户可直接在 **设置 → 棱镜/IM → 添加 IM** 完成配置（见[接入即时通讯](/zh/guide/im)）。以下 CLI 与配置字段供使用锁定的历史源码启动器（`runtime/`）的开发者参考。

在 `prism.config.json` 的 `im` 段启用对应适配器后，在 `runtime/` 下执行相应命令。`setup` 会启用适配器、列出所需环境变量，并为非扫码通道签发首个配对码；后续授权其他用户使用 `pair`（在私聊发送 `/pair CODE`，单次有效，10 分钟后过期）。

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

若使用自定义状态目录，请为 CLI 传入 `--config prism.config.json` 并用同一配置启动协调节点。重启时请保留网关的 SQLite 文件以维持扫码凭据和已配对用户状态。

### 源码配置字段

仅启用实际使用的通道，密钥通过协调进程的环境变量注入（可通过 `allowedUserIds` 预先授权已知的平台用户 ID）：

| 平台 | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

可通过 `im.locale` 设置默认语言，用户在私聊中可使用 `/language` 随时切换。不支持原地编辑消息的平台会自动改为发送新的状态消息。

下一步：[接入即时通讯](/zh/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
