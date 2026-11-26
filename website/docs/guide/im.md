# Messaging apps

Messaging adapters bind an authenticated private conversation to a persistent L1 identity. Each channel delivers explicit replies and task updates independently of the browser.

## Connect and pair

Enable the adapter under `im` in `prism.config.json`. For QR login, run the command on the coordinating host and scan the displayed QR in the matching app. For an additional user, issue a pairing code on that host and send `/pair CODE` in a private chat with the bot.

The commands below are alternatives. Run the appropriate one from `runtime/`. `setup` enables an adapter and lists the environment variables it needs. For non-QR channels it also issues the first pairing code; use `pair` for another user.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

The QR login stores credentials locally and authorizes the verified scanner. A pairing code works once and expires after ten minutes. Use `--config prism.config.json` with the CLI when selecting a nondefault state path. Then start the coordinator with that same configuration.

## Supported connections

| Platform | Connection |
| --- | --- |
| Telegram | Bot API long polling. Set the bot token through `im.telegram.tokenEnv` and register or pair the user. Clear any existing webhook on that bot. |
| WeChat | Personal WeChat through iLink. Run `login wechat` on the host, then use the private chat associated with the scanned account. |
| Feishu / Lark | Authorize the Feishu app on the host with `login feishu`. Complete the platform’s app permissions and messaging setup before sending a private message. |
| WeCom | Configure your organization’s WeCom bot and its credentials in `im.wecom`, then pair the user in a private conversation. |
| OneBot | Connect a OneBot service for private messages. Point the signed event callback to `/prism/im/onebot`. |
| QQ | Configure the QQ bot and point the official callback to `/prism/im/qq`. The gateway verifies signed platform events. |
| Discord | Connect a Discord bot with direct messaging enabled. Pair the user in a DM with the bot. |

## Configuration keys

Select the channels you actually use. Set secrets in the environment of the coordinator. `allowedUserIds` optionally grants access to known platform user IDs. QR credentials and pairings belong to the gateway state, so keep its SQLite file across restarts.

| Platform | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

If an event does not arrive, check the platform callback URL or outbound connection for that adapter. QQ C2C messages are subject to the platform’s reply and proactive-message limits. Some transports deliver a new status message when editing an earlier card is unavailable.

## Chat commands

| Interface | Behavior |
| --- | --- |
| `/models` | List L1 models and their capability descriptions. |
| `/model …` | Select a model by ID or displayed number. |
| `/tasks` | List this conversation’s tasks. |
| `/inspect …` | Read a task by its identifier. |
| `/language …` | Set a language code, such as `en` or `zh`. |
| `/pair …` | Redeem a one-time pairing code. |

Configure `im.locale` for the default language. Each user can change their language in the bot. The gateway stores delivery state in SQLite so it can resume after a restart. If delivery succeeded just before the local receipt was saved, the platform can show a duplicate.

[Developer interfaces](/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
