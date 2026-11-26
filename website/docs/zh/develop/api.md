# 开发接口

浏览器通过经过认证的有限 HTTP 路由访问对话。宿主内集成通过 Cordis 服务调用，并使用同一套归属检查。

## Web HTTP 接口

请求使用 DSH 登录 Cookie。写入时传 JSON 并设置 `X-Prism-Request: 1`。归属主体由服务端从认证身份得出。

| 接口 | 行为 |
| --- | --- |
| `GET /prism/api/view` | 读取可见对话和 L1 模型目录。 |
| `GET /prism/api/events` | 订阅消息与任务卡的 SSE 快照。 |
| `POST /prism/api/message` | 提交 `text` 与稳定的 `requestId`。 |
| `POST /prism/api/model` | 选择获准的 L1 `modelId`。 |
| `GET /prism/api/trace?task=…` | 读取当前主体所属任务的会话记录。 |

每次提交用户消息时生成稳定的 `requestId`，确认结果未知而重试时复用。SSE 重连会得到最新快照。用户打开任务后再按需请求会话记录。

## Cordis 服务

| 接口 | 行为 |
| --- | --- |
| `ctx.prism.view(owner)` | 读取公开快照。 |
| `ctx.prism.message(owner, text, requestId?)` | 将已认证的用户消息入队。 |
| `ctx.prism.selectModel(owner, modelId)` | 更改后续交互使用的模型。 |
| `ctx.prism.trace(owner, taskId)` | 读取所属任务的底层会话。 |
| `ctx.prism.subscribe(owner, listener)` | 订阅变更；调用返回的函数取消订阅。 |

从已认证的通道推导 `owner`。注册表查询返回公开元数据；受信宿主代码通过 `ctx.prismRegistry.resolve` 解析实际路径。

## 扩展 IM 通道

实现 `ImTransport`，提供稳定的通道及机器人命名空间、归属验证、`send` 和 `edit`。`ImGateway.receive` 成功后再向平台确认接收。重试时保留平台事件 ID。消息送达与本地记录回执可能分别提交。

[接入即时通讯](/zh/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
