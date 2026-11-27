# Interfaces de desarrollo

Los clientes externos interactúan mediante una API HTTP autenticada, mientras los plugins del host usan el servicio Cordis con las mismas comprobaciones de pertenencia.

## API HTTP Web

Usa la cookie de sesión de DSH. Las peticiones de escritura requieren JSON y la cabecera `X-Prism-Request: 1`.

| Interfaz | Función |
| --- | --- |
| `GET /prism/api/view` | Conversación actual y modelos L1 permitidos. |
| `GET /prism/api/events` | Flujo SSE de mensajes y tarjetas de tareas. |
| `POST /prism/api/message` | Enviar `text` con un `requestId` estable. |
| `POST /prism/api/model` | Elegir el `modelId` L1 para los siguientes turnos. |
| `GET /prism/api/trace?task=…` | Leer el registro de solo lectura de una tarea propia. |

## Servicio Cordis (`ctx.prism`)

| Interfaz | Función |
| --- | --- |
| `ctx.prism.view(owner)` | Leer la instantánea pública. |
| `ctx.prism.message(owner, text, requestId?)` | Encolar un mensaje autenticado. |
| `ctx.prism.selectModel(owner, modelId)` | Cambiar el modelo L1 siguiente. |
| `ctx.prism.trace(owner, taskId)` | Leer la transcripción de una tarea propia. |
| `ctx.prism.subscribe(owner, listener)` | Suscribirse a cambios; devuelve función para cancelar. |

Las integraciones deben derivar `owner` de un canal autenticado; las rutas físicas solo se resuelven mediante `ctx.prismRegistry.resolve`.

## Mensajería en el lanzador de código fuente

Para instalaciones con paquetes, usa **Settings → Prism/IM → Add IM** ([guía](/es/guide/im)). En el lanzador de código fuente (`runtime/`), activa el adaptador bajo `im` en `prism.config.json`:

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Conserva el archivo SQLite de la pasarela entre reinicios para mantener credenciales QR y emparejamientos.

| Plataforma | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Siguiente: [Mensajería](/es/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
