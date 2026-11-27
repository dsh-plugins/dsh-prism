# Interfaces de desenvolvimento

Clientes externos usam uma API HTTP autenticada, enquanto plugins no host utilizam o serviço Cordis com as mesmas verificações de propriedade.

## API HTTP Web

Use o cookie de login do DSH. Requisições de escrita exigem JSON e o cabeçalho `X-Prism-Request: 1`.

| Interface | Comportamento |
| --- | --- |
| `GET /prism/api/view` | Conversa atual e modelos L1 permitidos. |
| `GET /prism/api/events` | Stream SSE de mensagens e cartões de tarefas. |
| `POST /prism/api/message` | Enviar `text` com um `requestId` estável. |
| `POST /prism/api/model` | Selecionar o `modelId` L1 dos próximos turnos. |
| `GET /prism/api/trace?task=…` | Ler o registro somente leitura de uma tarefa própria. |

## Serviço Cordis (`ctx.prism`)

| Interface | Comportamento |
| --- | --- |
| `ctx.prism.view(owner)` | Ler o snapshot público. |
| `ctx.prism.message(owner, text, requestId?)` | Enfileirar uma mensagem autenticada. |
| `ctx.prism.selectModel(owner, modelId)` | Alterar o próximo modelo L1. |
| `ctx.prism.trace(owner, taskId)` | Ler a transcrição de uma tarefa própria. |
| `ctx.prism.subscribe(owner, listener)` | Assinar atualizações; retorna função de cancelamento. |

Integrações devem derivar `owner` de um canal autenticado; caminhos físicos são resolvidos apenas via `ctx.prismRegistry.resolve`.

## Mensageria no lançador de código-fonte

Para instalações por pacotes, use **Settings → Prism/IM → Add IM** ([guia](/pt/guide/im)). No lançador de código-fonte (`runtime/`), ative o adaptador em `im` no `prism.config.json`:

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Preserve o arquivo SQLite do gateway entre reinicializações para manter credenciais QR e pareamentos.

| Plataforma | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Próximo: [Aplicativos de mensagens](/pt/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
