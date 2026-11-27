# Início rápido

Com o Prism você não precisa alternar entre pastas de projeto: basta fazer um pedido em um único chat para que ele verifique vários projetos ao mesmo tempo e entregue o resumo. O guia ilustrado passo a passo está disponível em [inglês](/guide/start) e em [chinês](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Instale os sete plugins obrigatórios

No DSH, abra **Plugins → Add plugin** e instale os sete pacotes abaixo na ordem indicada. Clique em **Enable now** após cada instalação antes de passar ao próximo:

| Ordem | Pacote e versão |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

O orquestrador inicia assim que o Mesh é habilitado.

> [!TIP]
> Se **Prism** não aparecer na barra lateral logo após ativar os sete plugins, recarregue a aba do navegador.

### Memória de longo prazo e gatilhos de eventos {#optional-plugins}

A memória guarda informações e permite anexar mídia. Os gatilhos acrescentam lembretes agendados e eventos externos.

Em **Settings → Prism/Memory**, escolha **Remote API**. Nos campos `BASE_URL` e `API_KEY`, informe os valores das variáveis de ambiente `EMBEDDINGS_BASE_URL` e `EMBEDDINGS_API_KEY`, respectivamente. Preencha `MODEL_ID` com `BAAI/bge-large-zh-v1.5`, confirme a conexão e aguarde o fim da inicialização. As ferramentas de memória ficam disponíveis nesse momento, e o Prism carrega o vínculo automaticamente nas próximas inicializações do DSH.

## 2. Conecte seu modelo e adicione os projetos

1. Abra **Settings → Models → Add model provider → Custom model API** e escolha **OpenAI Responses**. Use os valores das variáveis de ambiente `BASE_URL` e `API_KEY` e adicione `deepseek-v4.1-flash` como ID do modelo.
2. Edite o provedor, abra **Customized settings → Model options** e habilite **Reasoning levels**. Salve o nível `high` com o valor de API `high`. No chat do DSH, selecione o modelo e escolha **Effort → High**. O orquestrador do Prism `0.2.1` passa apenas o provedor e o modelo às sessões do Prism, que não herdam o nível de raciocínio escolhido no chat do DSH.
3. Na barra lateral, clique em **Add workspace** e abra suas pastas de projeto, como `harbor-books` e `lantern-cafe`. O Prism identifica os espaços locais automaticamente pelo nome.
4. Em **Settings → Prism/Configuration**, use a mesma descrição e o mesmo prompt para cada modelo em **L1 Conversa**, **L2 Planejamento** e **L3 Execução**. Veja [descrições e prompts dos modelos](./model-metadata.md). Configure `gpt-6.2-sol` se ele também estiver disponível no DSH por outro provedor.

## 3. Envie o pedido e confira o resultado

Abra **Prism** na barra lateral e peça que ele verifique horário, local e responsável no `README.md` de ambos os projetos. O Prism exibe cartões de progresso na conversa e responde com o resumo final assim que terminar.

Se quiser conferir exatamente quais arquivos foram lidos, clique em **DeepSeek Harness** no topo e abra o histórico somente leitura em cada espaço de trabalho.

Próximo: [A conversa](/pt/guide/chat) · [Aplicativos de mensagens](/pt/guide/im)
