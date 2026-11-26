# 接入即时通讯

通道适配器把已认证的私聊绑定到持久 L1 身份。网页与各 IM 通道分别接收主动消息及任务更新。

## 连接账号与配对

在 `prism.config.json` 的 `im` 中启用适配器。扫码登录时，在协调节点运行对应命令，用目标应用扫描二维码。授权其他用户时，在宿主机签发配对码，由该用户在与机器人的私聊中发送 `/pair CODE`。

下面是不同接入方式的示例。在 `runtime/` 中选择适合的命令执行。`setup` 会启用适配器并列出需要的环境变量，非扫码通道还会签发首个配对码；后续用户使用 `pair`。

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

扫码登录会在本机保存凭据并授权经过验证的扫码用户。配对码一次有效，十分钟后过期。若自定义状态路径，CLI 传入 `--config prism.config.json`，再使用同一配置启动协调节点。

## 支持的连接方式

| 平台 | 连接方式 |
| --- | --- |
| Telegram | Bot API 长轮询。通过 `im.telegram.tokenEnv` 设置令牌并授权或配对用户。先清除这个 Bot 已有的 webhook。 |
| WeChat | 个人微信通过 iLink 连接。在宿主运行 `login wechat`，扫码后进入对应私聊。 |
| Feishu / Lark | 在宿主运行 `login feishu` 授权飞书应用。完成平台端应用权限与收发消息配置后，向机器人发起私聊。 |
| WeCom | 在 `im.wecom` 中配置企业微信机器人的身份和凭据，再在私聊中完成配对。 |
| OneBot | 连接负责私聊的 OneBot 服务，将已签名的事件回调指向 `/prism/im/onebot`。 |
| QQ | 配置 QQ 机器人，官方事件回调指向 `/prism/im/qq`，网关验证平台签名。 |
| Discord | 启用可接收直接消息的 Discord 机器人，通过私信完成用户配对。 |

## 配置字段

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

## 私聊命令

| 接口 | 行为 |
| --- | --- |
| `/models` | 列出 L1 模型及能力介绍。 |
| `/model …` | 按模型 ID 或显示序号切换。 |
| `/tasks` | 列出此对话的任务。 |
| `/inspect …` | 按任务 ID 读取会话。 |
| `/language …` | 设置语言代码，例如 `zh` 或 `en`。 |
| `/pair …` | 使用一次性配对码授权当前用户。 |

`im.locale` 指定默认语言，用户可在机器人中切换语言。网关用 SQLite 保存投递状态，重启可继续运行。若平台已送达而本地回执尚未落库，消息可能重复出现。

[开发接口](/zh/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
