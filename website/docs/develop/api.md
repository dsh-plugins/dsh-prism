# Developer interfaces

The browser uses a narrow authenticated HTTP surface. Integrations running inside the host use the Cordis service and the same ownership checks.

## Web HTTP

Use the DSH login cookie. Pass JSON and `X-Prism-Request: 1` on write requests. The server derives the owner from the authenticated principal.

| Interface | Behavior |
| --- | --- |
| `GET /prism/api/view` | Current public conversation and available L1 models. |
| `GET /prism/api/events` | Server-sent snapshots of messages and task cards. |
| `POST /prism/api/message` | Submit `text` and a stable `requestId`. |
| `POST /prism/api/model` | Select a permitted L1 `modelId`. |
| `GET /prism/api/trace?task=…` | Read the current owner’s task transcript. |

Generate a stable `requestId` per submitted user message and reuse it when retrying an uncertain acknowledgement. An SSE reconnect receives a fresh snapshot. Fetch the trace only after the user opens a task.

## Cordis service

| Interface | Behavior |
| --- | --- |
| `ctx.prism.view(owner)` | Read a public snapshot. |
| `ctx.prism.message(owner, text, requestId?)` | Enqueue an authenticated user message. |
| `ctx.prism.selectModel(owner, modelId)` | Change the next interaction model. |
| `ctx.prism.trace(owner, taskId)` | Read the transcript of an owned task. |
| `ctx.prism.subscribe(owner, listener)` | Observe updates; call the returned function to unsubscribe. |

Integrations must derive `owner` from an authenticated channel. Registry queries return public metadata; physical paths resolve through `ctx.prismRegistry.resolve` in trusted host code.

## Transport adapters

Implement `ImTransport` with a stable channel/bot namespace, destination authorization, `send` and `edit`. An adapter acknowledges an inbound event after `ImGateway.receive` succeeds. Keep the platform event ID stable across retries. Message delivery and the platform acknowledgement can occur in separate transactions.

## Messaging from the source launcher

For a packaged DSH installation, use the controls in **Settings → Prism → Messaging channels**. The following commands and keys apply to developers running the source launcher. [Configure messaging in the browser](/guide/im)

Enable the adapter under `im` in `prism.config.json`. For QR login, run the command on the coordinating host and scan the displayed QR in the matching app. For an additional user, issue a pairing code on that host and send `/pair CODE` in a private chat with the bot.

The commands below are alternatives. Run the appropriate one from `runtime/`. `setup` enables an adapter and lists the environment variables it needs. For non-QR channels it also issues the first pairing code; use `pair` for another user.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

The QR login stores credentials locally and authorizes the verified scanner. A pairing code works once and expires after ten minutes. Use `--config prism.config.json` with the CLI when selecting a nondefault state path. Then start the coordinator with that same configuration.

### Source configuration keys

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

Configure `im.locale` for the default language. Each user can change their language in the bot. The gateway stores delivery state in SQLite so it can resume after a restart. If delivery succeeded just before the local receipt was saved, the platform can show a duplicate.

[Messaging apps](/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
