# Início rápido

Com o Prism você não precisa alternar entre pastas de projeto: basta fazer um pedido em um único chat para que ele verifique vários projetos ao mesmo tempo e entregue o resumo. O guia ilustrado passo a passo está disponível em [inglês](/guide/start) e em [chinês](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Instale os cinco plugins

No DSH, abra **Plugins → Add plugin** e instale os cinco pacotes abaixo na ordem indicada. Clique em **Enable now** após cada instalação antes de passar ao próximo:

| Ordem | Pacote e versão |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |

O orquestrador inicia assim que o Mesh é habilitado.

> [!TIP]
> Se **Prism** não aparecer na barra lateral logo após ativar os cinco plugins, recarregue a aba do navegador.

### Memória de longo prazo e gatilhos de eventos (opcionais) {#optional-plugins}

Depois de habilitar os cinco plugins principais, instale os pacotes de que precisa no mesmo perfil do DSH. A memória guarda informações e permite anexar mídia. Os gatilhos acrescentam lembretes agendados e eventos externos.

Em **Plugins → Add plugin**, informe o nome exato e a versão do pacote e selecione **Enable now**. Você também pode usar os comandos abaixo para o perfil `web`.

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.3.1"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.1"
```

Em **Settings → Prism/Memory**, vincule um modelo de embeddings local ou uma API remota. As ferramentas de memória ficam disponíveis assim que a inicialização termina, e o Prism carrega o vínculo automaticamente nas próximas inicializações do DSH.

## 2. Conecte seu modelo e adicione os projetos

1. Abra **Settings → Models → Add model provider → Custom model API**, escolha **OpenAI Responses**, informe seu endpoint, chave de API e o modelo `deepseek-v4.1-flash`, e selecione-o em um chat do DSH.
2. Na barra lateral, clique em **Add workspace** e abra suas pastas de projeto (por exemplo, `harbor-books` e `lantern-cafe`). O Prism identifica os espaços locais automaticamente pelo nome.
3. Se quiser definir modelos específicos para cada etapa (**L1 Conversa**, **L2 Planejamento**, **L3 Execução**), acesse **Settings → Prism/Configuration**.

## 3. Envie o pedido e confira o resultado

Abra **Prism** na barra lateral e peça que ele verifique horário, local e responsável no `README.md` de ambos os projetos. O Prism exibe cartões de progresso na conversa e responde com o resumo final assim que terminar.

Se quiser conferir exatamente quais arquivos foram lidos, clique em **DeepSeek Harness** no topo e abra o histórico somente leitura em cada espaço de trabalho.

Próximo: [A conversa](/pt/guide/chat) · [Aplicativos de mensagens](/pt/guide/im)
