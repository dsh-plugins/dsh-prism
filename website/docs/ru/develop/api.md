# Интерфейсы разработчика

Внешние клиенты работают через аутентифицированный HTTP API, а плагины внутри хоста — через сервис Cordis с теми же проверками владения.

## Web HTTP API

Используйте cookie входа в DSH. Для POST нужен `X-Prism-Request: 1`. Сообщения и выбор модели используют JSON, а при загрузке указывается тип MIME файла.

| Интерфейс | Действие |
| --- | --- |
| `GET /prism/api/view` | Текущий диалог и разрешённые модели L1. |
| `GET /prism/api/events` | Поток SSE с сообщениями и карточками задач. Событие `appearance` содержит `light`, `dark` или `system`. |
| `POST /prism/api/message` | Отправить `text` и постоянный `requestId`. В `attachments` можно указать до восьми идентификаторов загруженных файлов. |
| `POST /prism/api/attachment?name=…` | Загрузить изображение или видео размером до 16 МиБ и получить `assetId`. Требуется плагин памяти. |
| `GET /prism/api/attachment?id=…` | Получить вложение, доступное пользователю. |
| `POST /prism/api/model` | Выбор модели `modelId` L1 для следующих сообщений. |
| `GET /prism/api/trace?task=…` | Прочитать журнал разрешённой локальной задачи. Для удалённой задачи ответ указывает рабочую область DSH на узле исполнения. |

## Сервис Cordis (`ctx.prism`)

| Интерфейс | Действие |
| --- | --- |
| `ctx.prism.view(owner)` | Прочитать публичный снимок. |
| `ctx.prism.message(owner, text, requestId?, source?, attachmentIds?)` | Поставить аутентифицированное сообщение в очередь. |
| `ctx.prism.selectModel(owner, modelId)` | Сменить модель L1 для следующих ходов. |
| `ctx.prism.trace(owner, taskId)` | Прочитать журнал задачи владельца. |
| `ctx.prism.subscribe(owner, listener)` | Подписаться на обновления; возвращает функцию отписки. |

Физические пути разрешаются только в доверенном коде хоста через `ctx.prismRegistry.resolve`.

## Мессенджеры в запуске из исходников

При установке из пакетов используйте **Settings → Prism/IM → Add IM** ([руководство](/ru/guide/im)). Для фиксированной прежней версии исходного кода (`runtime/`) включите адаптер в разделе `im` файла `prism.config.json`:

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
