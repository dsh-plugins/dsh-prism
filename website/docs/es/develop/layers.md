# Roles y permisos

Cada rol se ejecuta en una sesión formal de DSH detrás de un Subagent Provider. El servidor controla las herramientas tanto al enumerarlas como al invocarlas.

| Rol | Responsabilidad y límites |
| --- | --- |
| **L1** | Atiende al usuario en el proyecto predeterminado. Consulta metadatos autorizados, elige proyecto y modelo L2. Carece de herramientas de archivos y terminal. |
| **L2** | Planifica en el proyecto elegido por L1. Selecciona modelos L3, reparte pasos y puede restringir sus herramientas. Se comunica con su superior y sus subordinados directos. |
| **L3** | Ejecuta cada paso en el nodo y espacio de trabajo de su superior. El rol, la política del proyecto y la delegación delimitan las herramientas nativas. |

## Mensajes y finalización

L1 usa `send_user` para publicar una respuesta. El texto ordinario del modelo permanece en la sesión. `send_parent` y `send_child` activan al destinatario mediante su cola. `get_progress` consulta el progreso. Al finalizar la tarea, el superior recibe `task_settled`.

| Rol | Herramientas de coordinación |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Las tarjetas pueden actualizarse sin generar una respuesta. Tras el evento, L1 decide si avisa al usuario. `list_models` devuelve las capacidades de los modelos del nivel siguiente.

[Modelos y proyectos](/es/develop/models) · [Mesh y sesiones](/es/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
