# Developer interfaces

External clients interact with Prism through a narrow, authenticated surface, while host-side plugins integrate over Cordis services using the same ownership checks.

## Web HTTP API

Browser requests authenticate with the DSH login cookie. Write requests require JSON and the `X-Prism-Request: 1` header; the server always derives `owner` from the authenticated principal.

| Endpoint | Purpose |
| --- | --- |
| `GET /prism/api/view` | Fetch the current conversation snapshot and permitted L1 models. |
| `GET /prism/api/events` | Subscribe to Server-Sent Events (SSE) for message and task-card updates. |
| `POST /prism/api/message` | Submit `text` with a client-generated `requestId`. |
| `POST /prism/api/model` | Switch the active L1 `modelId` for upcoming turns. |
| `GET /prism/api/trace?task=…` | Read the read-only transcript of a task owned by the caller. |

Generate a stable `requestId` per user message and reuse it on retries so duplicate submissions are deduplicated. An SSE reconnect automatically receives a fresh snapshot; fetch `/prism/api/trace` lazily only when the user opens a task.

## Cordis service (`ctx.prism`)

| Method | Purpose |
| --- | --- |
| `ctx.prism.view(owner)` | Read the public conversation snapshot. |
| `ctx.prism.message(owner, text, requestId?)` | Enqueue an authenticated user message. |
| `ctx.prism.selectModel(owner, modelId)` | Change the L1 model for subsequent turns. |
| `ctx.prism.trace(owner, taskId)` | Read the transcript of an owned task. |
| `ctx.prism.subscribe(owner, listener)` | Subscribe to updates; invoke the returned function to unsubscribe. |

Integrations must derive `owner` from an authenticated channel. Project queries return public metadata only; physical paths are resolved exclusively by trusted host code via `ctx.prismRegistry.resolve`.

## Custom IM transport adapters

To add a messaging platform, implement `ImTransport` with a stable channel/bot namespace, destination authorization, `send`, and `edit`. Acknowledge inbound platform events only after `ImGateway.receive` succeeds, and keep platform event IDs stable across retries.

## Source launcher IM setup

If you installed Prism via the DSH Plugin Manager, configure channels in **Settings → Prism/IM → Add IM** ([user guide](/guide/im)). The CLI and `prism.config.json` keys below are for developers running from the source launcher (`runtime/`).

Enable the adapter under `im` in `prism.config.json`, then run the matching command from `runtime/`. `setup` enables an adapter, prints required environment variables, and (for non-QR channels) issues the initial pairing code; use `pair` to authorize additional users (`/pair CODE` in private chat, single-use, expires in 10 minutes).

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Pass `--config prism.config.json` when using a custom state path, and start the coordinator with the same file. Keep the gateway SQLite file across restarts to preserve QR credentials and pairings.

### Source configuration keys

Enable only the channels you use and supply secrets via coordinator environment variables (`allowedUserIds` optionally pre-authorizes known platform user IDs):

| Platform | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Set `im.locale` for the default bot language (users can override it per chat with `/language`). Platforms that do not support in-place message editing fall back to posting a follow-up status message.

Next: [Messaging apps](/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
