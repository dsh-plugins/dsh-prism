# Funções e permissões

A arquitetura do Prism parte de um princípio claro: **ocultar toda a complexidade de infraestrutura do usuário e trocar limites internos rigorosos por alta autonomia e confiabilidade.**

Cinco plugins (`dsh-concierge-ui`, `dsh-workspace-registry`, `dsh-orchestrator`, `dsh-mesh-node`, `dsh-im-gateway`) cooperam em três camadas estritamente isoladas.

## Seis princípios de design

1. **Zero-Workspace UX**: A Web e os mensageiros dão acesso à conversa. A Web mostra cartões de tarefas e os espaços de trabalho DSH exibem os históricos disponíveis em modo somente leitura.
2. **Strict Isolation**: quanto mais perto do usuário, menores as permissões. **L1** não possui ferramentas de arquivo nem de terminal, evitando escaladas por injeção e mantendo o contexto de roteamento limpo.
3. **Silent-by-Default Actor**: o texto comum gerado por L1 fica apenas como raciocínio interno. Toda saída visível passa explicitamente por `send_user`, e a comunicação entre camadas usa filas persistentes assíncronas.
4. **Self-Describing Routing**: cada camada mantém seu próprio catálogo de modelos com descrição de capacidades (`description`) e ajuste opcional de prompt. L1 e L2 escolhem dinamicamente via `list_models`.
5. **Location Transparency**: o `dsh-mesh-node` encapsula nós remotos como um Subagent Provider padrão `prism-<nodeId>`. Como L3 sempre herda o espaço de trabalho de L2, operações intensivas de arquivo ficam locais no nó proprietário.
6. **Virtual Facade & Copy-on-Conflict**: Cada camada é executada em uma sessão nativa do DSH. Se houver um conflito de gravação, o executor cria uma sessão e atualiza o vínculo de forma atômica. Os históricos somente leitura usam sessões separadas.

## Três camadas de isolamento

| Função | Espaço de trabalho | Responsabilidade e limites |
| --- | --- | --- |
| **L1** | Projeto padrão | Atende o usuário, consulta metadados autorizados em `dsh-workspace-registry`, escolhe projeto destino e modelo L2. **Sem acesso a arquivos ou terminal.** |
| **L2** | Projeto escolhido por L1 | Planeja no projeto, escolhe modelos L3, delega etapas e pode restringir ainda mais as ferramentas. L2 também pode enviar mensagens a membros autorizados do mesmo Room. |
| **L3** | **Herda obrigatoriamente** nó e espaço de L2 | Executa localmente dentro da interseção entre função L3, política do projeto e orçamento de L2. |

## Mensagens e conclusão

`send_user` publica respostas visíveis; `send_parent` e `send_child` acordam o destinatário via fila; `report_progress` / `get_progress` e `task_settled` coordenam o acompanhamento assíncrono.

| Função | Ferramentas de coordenação |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `agent_spawn`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress`, `peer_send` (quando autorizado no Room) |
| L3 | `send_parent`, `report_progress` |

Próximo: [Modelos e projetos](/pt/develop/models) · [Mesh e sessões](/pt/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
