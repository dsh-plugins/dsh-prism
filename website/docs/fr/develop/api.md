# Interfaces de développement

Les clients externes passent par une API HTTP authentifiée ; les plugins de l’hôte utilisent le service Cordis avec les mêmes contrôles de propriété.

## API HTTP Web

Utilisez le cookie de session DSH. Les requêtes d’écriture exigent du JSON et l’en-tête `X-Prism-Request: 1`.

| Interface | Fonction |
| --- | --- |
| `GET /prism/api/view` | Conversation en cours et modèles L1 autorisés. |
| `GET /prism/api/events` | Flux SSE des messages et cartes de tâches. |
| `POST /prism/api/message` | Soumettre `text` avec un `requestId` stable. |
| `POST /prism/api/model` | Choisir le `modelId` L1 des prochains tours. |
| `GET /prism/api/trace?task=…` | Lire le journal en lecture seule d’une tâche possédée. |

## Service Cordis (`ctx.prism`)

| Interface | Fonction |
| --- | --- |
| `ctx.prism.view(owner)` | Lire l’instantané public. |
| `ctx.prism.message(owner, text, requestId?)` | Mettre en file un message authentifié. |
| `ctx.prism.selectModel(owner, modelId)` | Changer le modèle L1 suivant. |
| `ctx.prism.trace(owner, taskId)` | Lire le journal d’une tâche possédée. |
| `ctx.prism.subscribe(owner, listener)` | S’abonner aux mises à jour ; retourne la fonction de désabonnement. |

Les intégrations doivent dériver `owner` d’un canal authentifié ; les chemins physiques ne sont résolus que via `ctx.prismRegistry.resolve`.

## Messageries dans le lanceur source

Pour une installation par paquets, utilisez **Settings → Prism/IM → Add IM** ([guide](/fr/guide/im)). Avec le lanceur source (`runtime/`), activez l’adaptateur sous `im` dans `prism.config.json` :

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Conservez le fichier SQLite de la passerelle entre les redémarrages pour garder les identifiants QR et appairages.

| Plateforme | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Suite : [Messageries](/fr/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
