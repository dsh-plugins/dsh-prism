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

[Messaging apps](/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
