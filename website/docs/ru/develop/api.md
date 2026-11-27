# Интерфейсы разработчика

Внешние клиенты работают через аутентифицированный HTTP API, а плагины внутри хоста — через сервис Cordis с теми же проверками владения.

## Web HTTP API

Использует cookie входа DSH. Запросы на запись требуют JSON и заголовок `X-Prism-Request: 1`.

| Интерфейс | Действие |
| --- | --- |
| `GET /prism/api/view` | Текущий диалог и разрешённые модели L1. |
| `GET /prism/api/events` | SSE-поток сообщений и карточек задач. |
| `POST /prism/api/message` | Отправка `text` со стабильным `requestId`. |
| `POST /prism/api/model` | Выбор модели `modelId` L1 для следующих сообщений. |
| `GET /prism/api/trace?task=…` | Чтение истории задачи пользователя (только чтение). |

## Сервис Cordis (`ctx.prism`)

| Интерфейс | Действие |
| --- | --- |
| `ctx.prism.view(owner)` | Прочитать публичный снимок. |
| `ctx.prism.message(owner, text, requestId?)` | Поставить аутентифицированное сообщение в очередь. |
| `ctx.prism.selectModel(owner, modelId)` | Сменить модель L1 для следующих ходов. |
| `ctx.prism.trace(owner, taskId)` | Прочитать журнал задачи владельца. |
| `ctx.prism.subscribe(owner, listener)` | Подписаться на обновления; возвращает функцию отписки. |

Физические пути разрешаются только в доверенном коде хоста через `ctx.prismRegistry.resolve`.

## Мессенджеры в запуске из исходников

При установке из пакетов используйте **Settings → Prism/IM → Add IM** ([руководство](/ru/guide/im)). Для запуска из исходников (`runtime/`) включите адаптер в разделе `im` файла `prism.config.json`:

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Сохраняйте SQLite-файл шлюза между перезапусками, чтобы не потерять QR-ключи и привязки пользователей.

| Платформа | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Далее: [Мессенджеры](/ru/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
