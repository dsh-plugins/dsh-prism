# Interfaces de desarrollo

La web dispone de rutas HTTP limitadas y autenticadas. Las integraciones del servidor usan el servicio Cordis con las mismas comprobaciones de titularidad.

## HTTP de la web

Usa la cookie de inicio de sesión de DSH. Las escrituras requieren JSON y `X-Prism-Request: 1`. El servidor obtiene el propietario de la identidad autenticada.

| Interfaz | Función |
| --- | --- |
| `GET /prism/api/view` | Conversación pública y modelos L1 disponibles. |
| `GET /prism/api/events` | Instantáneas SSE de mensajes y tarjetas. |
| `POST /prism/api/message` | Enviar `text` y una `requestId` estable. |
| `POST /prism/api/model` | Elegir una `modelId` L1 permitida. |
| `GET /prism/api/trace?task=…` | Leer una tarea perteneciente al usuario actual. |

Genera una `requestId` por mensaje y reutilízala si reintentas un envío cuya confirmación no llegó. Al reconectar, SSE envía una instantánea actual. Carga el historial cuando el usuario abra la tarea.

## Servicio Cordis

| Interfaz | Función |
| --- | --- |
| `ctx.prism.view(owner)` | Leer el estado público. |
| `ctx.prism.message(owner, text, requestId?)` | Encolar un mensaje autenticado. |
| `ctx.prism.selectModel(owner, modelId)` | Cambiar el modelo del siguiente turno. |
| `ctx.prism.trace(owner, taskId)` | Leer una sesión propia. |
| `ctx.prism.subscribe(owner, listener)` | Suscribirse a cambios; la función devuelta cancela la suscripción. |

Obtén `owner` a partir del canal autenticado. El registro devuelve metadatos públicos; el código de confianza resuelve rutas mediante `ctx.prismRegistry.resolve`.

## Adaptadores de mensajería

Implementa `ImTransport` con una identidad estable de canal y bot, autorización de destino, `send` y `edit`. Confirma el evento en la plataforma cuando `ImGateway.receive` termine correctamente. Conserva su ID al reintentar. La entrega y el recibo local se escriben por separado.

[Mensajería](/es/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
