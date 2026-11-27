# Aplicativos de mensagens

Conecte o Prism aos seus mensageiros favoritos para enviar pedidos e receber resultados diretamente em um chat privado.

Como proprietário do DSH, abra **Settings → Prism/IM** e clique em **Add IM**. Cada conta salva aparece como um cartão para editar configurações ou ligar e desligar a conexão. Em **Pending approvals** ficam as pessoas que enviaram mensagem ao bot pela primeira vez. ([Guia ilustrado em inglês](/guide/im) · [Em chinês](/zh/guide/im))

Exceto no Feishu/Lark, informe um **Username** para identificar cada cartão. Clique em **Save settings** e depois em **Enable channel** quando as credenciais ou o login por QR estiverem prontos.

## Plataformas compatíveis

- **Telegram**: informe o **Bot token** do `@BotFather`, salve e ative. Se o bot já tiver um webhook configurado, remova-o antes no Telegram.
- **WeChat**: em **Account registration**, clique em **Generate QR code**, escaneie com o WeChat, salve e ative.
- **Feishu / Lark**: use **QR binding → Generate QR code** para vincular ou criar um bot pela página oficial, ou **Manual binding** com **Service**, **App ID** e **App secret** (ativando eventos de mensagem privada no console). Depois clique em **Enable channel**.
- **WeCom**: informe **Username**, **Bot ID** e **Bot secret** de um bot inteligente do WeCom com conexão persistente, salve e ative.
- **QQ Bot**: informe **Username**, **App ID** e **App secret** e configure a URL `/prism/im/qq` (HTTPS acessível externamente) no console do QQ.
- **OneBot**: informe **Username**, **OneBot account ID**, **OneBot HTTP API URL**, **Access token** e **Event-signing secret**, apontando o callback de eventos para `/prism/im/onebot`.
- **Discord**: informe **Username** e o **Bot token** do Discord Developer Portal, salve e ative.

## Aprovar novos usuários

Quando alguém enviar a primeira mensagem privada para o bot, abra **Pending approvals**, confira plataforma, nome e ID, e escolha **Approve** (autoriza o chat e processa a primeira mensagem) ou **Reject**.

## Comandos no chat

- `/models` — Listar modelos disponíveis
- `/model ID` — Trocar de modelo
- `/tasks` — Ver tarefas deste chat
- `/inspect TASK_ID` — Abrir o registro somente leitura de uma tarefa
- `/language pt` — Alterar o idioma das respostas

Próximo: [A conversa](/pt/guide/chat) · [Interfaces de desenvolvimento](/pt/develop/api)
