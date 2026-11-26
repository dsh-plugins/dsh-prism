# Aplicativos de mensagens

Cada conversa privada autenticada é associada a uma identidade L1 persistente. Os canais de mensagens recebem suas próprias respostas explícitas e atualizações de tarefas.

## Configurar pela interface do DSH

Abra as configurações do Prism e selecione um dos sete serviços em **Messaging channels**. Nesse painel você gerencia as credenciais, os usuários autorizados, os códigos de pareamento e o estado da conexão. O Feishu/Lark também oferece registro por código QR. Com o DSH em português, esse painel exibe os rótulos em inglês. [Guia ilustrado em inglês](/guide/im) · [Guia ilustrado em chinês](/zh/guide/im)

## Conexão e pareamento pelo inicializador compilado

Ative o adaptador em `im` no `prism.config.json`. Execute o login por QR no coordenador e escaneie o código no aplicativo correspondente. Para outro usuário, gere um código no host e peça que envie `/pair CODE` ao bot em uma conversa privada.

Os comandos são alternativas. Execute o adequado a partir de `runtime/`. `setup` ativa o adaptador e lista as variáveis de ambiente necessárias. Em canais sem QR, emite o primeiro código; use `pair` para adicionar outra pessoa.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

O login por QR guarda credenciais localmente e autoriza quem fez a leitura verificada. O código de pareamento é de uso único e vale por dez minutos. Para um caminho de estado personalizado, passe `--config prism.config.json` à CLI e inicie com o mesmo arquivo.

## Conexões disponíveis

| Plataforma | Conexão |
| --- | --- |
| Telegram | Long polling da Bot API. Configure o token por `im.telegram.tokenEnv`, autorize ou pareie o usuário e remova o webhook existente. |
| WeChat | WeChat pessoal pelo iLink. Execute `login wechat` no host e abra a conversa privada da conta verificada. |
| Feishu / Lark | Autorize o aplicativo com `login feishu`. Conclua as permissões e a configuração de mensagens na plataforma. |
| WeCom | Configure o bot corporativo e suas credenciais em `im.wecom` e pareie o usuário em particular. |
| OneBot | Conecte o serviço OneBot para mensagens privadas e encaminhe eventos assinados a `/prism/im/onebot`. |
| QQ | Configure o bot QQ com o callback oficial `/prism/im/qq`. O gateway verifica a assinatura da plataforma. |
| Discord | Habilite as mensagens diretas do bot Discord e faça o pareamento por DM. |

## Chaves de configuração do inicializador compilado

Ative apenas os canais utilizados. Configure os segredos no ambiente do coordenador. `allowedUserIds` concede acesso a IDs conhecidos da plataforma. Preserve o SQLite nos reinícios para manter credenciais QR e pareamentos.

| Plataforma | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Se os eventos não chegarem, confira o callback ou a conexão de saída do canal. QQ C2C aplica janelas de resposta e cotas de mensagens proativas. Alguns canais enviam outra mensagem de estado quando não conseguem editar o cartão original.

## Comandos de conversa

| Interface | Comportamento |
| --- | --- |
| `/models` | Listar modelos L1 e suas capacidades. |
| `/model …` | Selecionar modelo pelo ID ou número exibido. |
| `/tasks` | Listar tarefas desta conversa. |
| `/inspect …` | Ler uma tarefa pelo ID. |
| `/language …` | Definir um idioma, como `pt`. |
| `/pair …` | Usar o código de pareamento. |

`im.locale` define o idioma padrão. Cada usuário pode alterá-lo no bot. O SQLite preserva o estado de entrega após reiniciar. Uma interrupção entre a entrega e o recibo local pode gerar uma duplicata.

[Interfaces de desenvolvimento](/pt/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
