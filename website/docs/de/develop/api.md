# Entwicklerschnittstellen

Externe Clients greifen über eine schlanke, authentifizierte HTTP-Oberfläche auf Prism zu; Plugins im DSH-Host nutzen den Cordis-Dienst mit derselben Eigentümerprüfung.

## Web-HTTP-API

Browser-Anfragen nutzen das DSH-Login-Cookie. POST-Anfragen benötigen `X-Prism-Request: 1`. Nachrichten und Modellwechsel verwenden JSON, Uploads den MIME-Typ des Mediums.

| Schnittstelle | Funktion |
| --- | --- |
| `GET /prism/api/view` | Aktuelle Unterhaltung und erlaubte L1-Modelle abrufen. |
| `GET /prism/api/events` | SSE-Stream für Nachrichten und Aufgabenkarten. Das Ereignis `appearance` überträgt `light`, `dark` oder `system`. |
| `POST /prism/api/message` | `text` und eine stabile `requestId` senden. `attachments` kann bis zu acht hochgeladene IDs enthalten. |
| `POST /prism/api/attachment?name=…` | Bild- oder Videodaten bis 16 MiB hochladen und eine `assetId` erhalten. Erfordert das Speicher-Plugin. |
| `GET /prism/api/attachment?id=…` | Einen zugänglichen Anhang abrufen. |
| `POST /prism/api/model` | Erlaubtes L1-Modell (`modelId`) für Folge-Turns wählen. |
| `GET /prism/api/trace?task=…` | Protokoll einer berechtigten lokalen Aufgabe lesen. Bei entfernten Aufgaben verweist die Antwort auf den DSH-Arbeitsbereich des Zielgeräts. |

Verwenden Sie pro Nachricht eine stabile `requestId` für sichere Wiederholungen.

## Cordis-Dienst (`ctx.prism`)

| Schnittstelle | Funktion |
| --- | --- |
| `ctx.prism.view(owner)` | Öffentlichen Snapshot lesen. |
| `ctx.prism.message(owner, text, requestId?, source?, attachmentIds?)` | Authentifizierte Nachricht einreihen. |
| `ctx.prism.selectModel(owner, modelId)` | L1-Modell für Folge-Turns ändern. |
| `ctx.prism.trace(owner, taskId)` | Verlauf einer eigenen Aufgabe lesen. |
| `ctx.prism.subscribe(owner, listener)` | Änderungen abonnieren; Rückgabefunktion beendet das Abo. |

Integrationen müssen `owner` aus einem authentifizierten Kanal ableiten. Physische Pfade löst ausschließlich vertrauenswürdiger Host-Code über `ctx.prismRegistry.resolve` auf.

## Messenger im Quellcode-Launcher

Bei Paketinstallation richten Sie Kanäle bequem über **Settings → Prism/IM → Add IM** ein ([Anleitung](/de/guide/im)). Für den fixierten älteren Quellcode-Launcher (`runtime/`) aktivieren Sie den Adapter unter `im` in `prism.config.json`:

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

`setup` aktiviert den Adapter und erzeugt bei Kanälen ohne QR-Code den ersten Pairing-Code (`/pair CODE` im privaten Chat, 10 Minuten gültig); `pair` erzeugt Codes für weitere Nutzer. Bewahren Sie die SQLite-Datei des Gateways über Neustarts hinweg auf.

| Plattform | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Weiter: [Messenger einrichten](/de/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
