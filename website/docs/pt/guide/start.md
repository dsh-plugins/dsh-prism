# Início rápido

Você pode testar o Prism com duas pastas de projeto na mesma máquina. O guia ilustrado mostra o fluxo completo no DeepSeek Harness 0.2.3-alpha.2. [Guia em inglês](/guide/start) · [Guia em chinês](/zh/guide/start)

1. Abra o gerenciador de plugins do DSH. Adicione os cinco pacotes npm da tabela, na ordem indicada. Instale e ative cada pacote antes de adicionar o próximo.
2. Nas configurações de modelos, adicione um provedor de API personalizado. Escolha OpenAI Responses e informe a URL do provedor, sua chave de API e o ID do modelo `deepseek-v4.1-flash`.
3. Abra cada pasta como um espaço de trabalho do DSH. Escolha o novo provedor e o modelo em uma conversa do DSH.
4. Abra o **Prism** na barra lateral do DSH. Peça uma tarefa para cada espaço de trabalho e solicite que o agente consulte cada README para encontrar o horário, o local e a pessoa responsável pelo evento.
5. O cartão da tarefa mostra o horário e o estado. Volte ao DSH por **DeepSeek Harness**, abra o histórico de execução somente leitura no espaço de trabalho correspondente e compare a resposta com os dois arquivos README.

## Pacotes para o gerenciador de plugins

| Ordem | Pacote e versão |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.2` |

[A conversa](/pt/guide/chat) · [Modelos e projetos](/pt/develop/models)
