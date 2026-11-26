# Mesh 与会话

协调节点通过 `prism-<nodeId>` 派发会话。本地和远程任务遵循相同的 Provider 接口。

## 连接两个节点

将第一段 `mesh` 配置放在协调端，第二段放在执行端。两端的 `PRISM_WORKER_TOKEN` 设置同一随机链路凭据。双方均注册项目 `atlas` 并标记节点 `worker`，由工作节点解析真实目录。

```json
{
  "nodeId": "hub",
  "peers": [{ "id": "worker", "url": "https://worker.example.org", "tokenEnv": "PRISM_WORKER_TOKEN" }]
}
```

```json
{
  "nodeId": "worker",
  "incoming": [{ "id": "hub", "tokenEnv": "PRISM_WORKER_TOKEN", "projects": ["atlas"] }]
}
```

跨设备使用 HTTPS，将工作节点域名加入 DSH 的可信主机配置。回环 HTTP 可用于本机测试。每台设备有独立的 `DSH_HOME`。协调端发起出站连接，经该链路接收工具调用。

## 启动与锁冲突

工作节点重新验证调用方、项目、模型与工具上限。若正式会话发生写锁冲突，运行器从原会话可观测历史 Fork 新会话，原子更新逻辑绑定并记录原会话的归档义务。多个发布者竞争时，会重新检查已生效的绑定。

## 查看远程任务

已授权的只读查询通过同一链路读取工作节点的会话，无需获取写锁。重启时应保留双方状态目录。连接中断后先检查任务状态，再决定是否重复可能产生副作用的操作。

[开发接口](/zh/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
