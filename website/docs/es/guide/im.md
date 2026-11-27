# Mensajería

Conecta Prism a tus aplicaciones de mensajería para enviar peticiones y recibir resultados directamente en un chat privado.

Como propietario de DSH, abre **Settings → Prism/IM** y pulsa **Add IM**. Cada cuenta guardada aparece como una tarjeta para editar sus datos o activar y pausar la conexión. En **Pending approvals** verás a quienes escriban al bot por primera vez. ([Guía ilustrada en inglés](/guide/im) · [En chino](/zh/guide/im))

Salvo en Feishu/Lark, introduce un **Username** para identificar cada tarjeta. Pulsa **Save settings** y luego **Enable channel** cuando las credenciales o el código QR estén listos.

## Plataformas compatibles

- **Telegram**: Introduce el **Bot token** de `@BotFather`, guarda y activa el canal. Si el bot tenía un webhook previo, elimínalo antes en Telegram.
- **WeChat**: En **Account registration**, pulsa **Generate QR code**, escanéalo con WeChat, guarda y activa.
- **Feishu / Lark**: Usa **QR binding → Generate QR code** para vincular o crear un bot desde la página oficial, o **Manual binding** con **Service**, **App ID** y **App secret** (activando los eventos de mensaje privado en la consola). Después pulsa **Enable channel**.
- **WeCom**: Introduce **Username**, **Bot ID** y **Bot secret** de un bot inteligente de WeCom con conexión persistente, guarda y activa.
- **QQ Bot**: Introduce **Username**, **App ID** y **App secret**, y configura la URL `/prism/im/qq` (HTTPS accesible desde Internet) como callback firmado en la consola de QQ.
- **OneBot**: Introduce **Username**, **OneBot account ID**, **OneBot HTTP API URL**, **Access token** y **Event-signing secret**, y apunta el callback de eventos a `/prism/im/onebot`.
- **Discord**: Introduce **Username** y el **Bot token** del Discord Developer Portal, guarda y activa.

## Aprobar a nuevos usuarios

Cuando alguien envíe su primer mensaje privado al bot, abre **Pending approvals**, revisa la plataforma, el nombre y el ID, y elige **Approve** (autoriza el chat y procesa ese primer mensaje) o **Reject**.

## Comandos en el chat

- `/models` — Listar modelos disponibles
- `/model ID` — Cambiar de modelo
- `/tasks` — Ver tareas de este chat
- `/inspect TASK_ID` — Abrir el registro de solo lectura de una tarea
- `/language es` — Cambiar el idioma de las respuestas

Siguiente: [La conversación](/es/guide/chat) · [Interfaces de desarrollo](/es/develop/api)
