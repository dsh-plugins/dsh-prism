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

## 源码启动器中的 IM 配置

在 DSH 插件管理器中安装的用户可以从 **设置 → 棱镜/IM → 添加 IM** 完成设置。下面的命令及字段供使用源码启动器的开发者参考。[在网页中配置消息渠道](/zh/guide/im)

在 `prism.config.json` 的 `im` 中启用适配器。扫码登录时，在协调节点运行对应命令，用目标应用扫描二维码。授权其他用户时，在宿主机签发配对码，由该用户在与机器人的私聊中发送 `/pair CODE`。

下面是不同接入方式的示例。在 `runtime/` 中选择适合的命令执行。`setup` 会启用适配器并列出需要的环境变量，非扫码通道还会签发首个配对码；后续用户使用 `pair`。

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

扫码登录会在本机保存凭据并授权经过验证的扫码用户。配对码一次有效，十分钟后过期。若自定义状态路径，CLI 传入 `--config prism.config.json`，再使用同一配置启动协调节点。

### 源码配置字段

仅启用实际使用的通道，密钥放在协调进程的环境变量中。`allowedUserIds` 可预先授权已知的平台用户 ID。扫码凭据和配对状态属于网关，重启时保留其 SQLite 文件。

| 平台 | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

收不到事件时，核对通道的回调地址或出站连接。QQ 单聊受平台回复窗口和主动消息额度限制。无法原地编辑卡片的通道会通过后续消息更新状态。

`im.locale` 指定默认语言，用户可在机器人中切换语言。网关用 SQLite 保存投递状态，重启可继续运行。若平台已送达而本地回执尚未落库，消息可能重复出现。

[接入即时通讯](/zh/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
