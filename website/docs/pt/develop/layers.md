# Funções e permissões

Cada função roda em uma sessão formal do DSH exposta por um Subagent Provider. O host controla as ferramentas disponíveis tanto na descoberta quanto na chamada.

| Função | Responsabilidade e limites |
| --- | --- |
| **L1** | Atende no projeto padrão. Consulta metadados autorizados e escolhe o projeto de destino e o modelo L2. Não tem ferramentas de arquivo ou terminal. |
| **L2** | Planeja no projeto escolhido por L1. Seleciona modelos L3, distribui etapas e pode restringir as ferramentas. Comunica-se com seu superior e subordinados diretos. |
| **L3** | Executa a etapa no nó e na área de trabalho do superior. A função, a política do projeto e a delegação limitam as ferramentas nativas. |

## Mensagens e conclusão

L1 usa `send_user` para publicar a resposta ao usuário. O texto comum do modelo permanece na sessão. `send_parent` e `send_child` acionam o destinatário por uma fila. O superior usa `get_progress` e recebe `task_settled` quando a tarefa chega ao estado final.

| Função | Ferramentas de coordenação |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

O cartão pode ser atualizado sem uma resposta do agente. Após o evento, L1 decide se deve avisar o usuário. `list_models` informa as capacidades dos modelos no nível seguinte.

[Modelos e projetos](/pt/develop/models) · [Mesh e sessões](/pt/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
