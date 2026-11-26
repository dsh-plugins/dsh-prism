# Interfaces de desenvolvimento

O navegador usa rotas HTTP limitadas e autenticadas. Integrações no host usam o serviço Cordis com as mesmas verificações de titularidade.

## HTTP da Web

Use o cookie de acesso do DSH. Escritas devem enviar JSON e `X-Prism-Request: 1`. O servidor determina o proprietário a partir da identidade autenticada.

| Interface | Comportamento |
| --- | --- |
| `GET /prism/api/view` | Conversa pública e modelos L1 disponíveis. |
| `GET /prism/api/events` | Instantâneos SSE de mensagens e cartões. |
| `POST /prism/api/message` | Enviar `text` e uma `requestId` estável. |
| `POST /prism/api/model` | Selecionar um `modelId` L1 permitido. |
| `GET /prism/api/trace?task=…` | Ler o histórico de uma tarefa própria. |

Gere uma `requestId` estável por mensagem e reutilize-a quando houver dúvida sobre a confirmação. A reconexão SSE devolve o estado atual. Consulte o histórico quando a pessoa abrir a tarefa.

## Serviço Cordis

| Interface | Comportamento |
| --- | --- |
| `ctx.prism.view(owner)` | Ler o estado público. |
| `ctx.prism.message(owner, text, requestId?)` | Enfileirar uma mensagem autenticada. |
| `ctx.prism.selectModel(owner, modelId)` | Alterar o próximo modelo de conversa. |
| `ctx.prism.trace(owner, taskId)` | Ler a sessão de uma tarefa própria. |
| `ctx.prism.subscribe(owner, listener)` | Assinar mudanças; chamar a função retornada para cancelar. |

Obtenha `owner` do canal autenticado. O registro expõe metadados públicos; código confiável resolve caminhos por `ctx.prismRegistry.resolve`.

## Adaptadores de mensagens

Implemente `ImTransport` com uma identidade estável de canal e bot, autorização de destino, `send` e `edit`. Confirme o recebimento após o sucesso de `ImGateway.receive`. Preserve o ID do evento em novas tentativas. Entrega e confirmação local são registradas separadamente.

[Aplicativos de mensagens](/pt/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
