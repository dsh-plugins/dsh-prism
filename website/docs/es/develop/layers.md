# Roles y permisos

La arquitectura de Prism parte de una idea clara: **ocultar toda la complejidad de infraestructura al usuario y, por debajo, cambiar límites estrictos por alta autonomía y fiabilidad.**

Cinco plugins (`dsh-concierge-ui`, `dsh-workspace-registry`, `dsh-orchestrator`, `dsh-mesh-node`, `dsh-im-gateway`) colaboran a través de tres niveles estrictamente aislados.

## Seis principios de diseño

1. **Zero-Workspace UX**: El usuario quiere resolver una tarea, no saber en qué máquina o carpeta está el código. Web e IM muestran solo una conversación limpia, tarjetas de tareas plegables y un enlace de solo lectura para inspeccionar detalles.
2. **Strict Isolation**: Cuanto más cerca del usuario, menores son los permisos. **L1** carece por completo de herramientas de archivos o terminal, evitando escaladas por inyección desde el chat y manteniendo el contexto libre de ruido.
3. **Silent-by-Default Actor**: El texto normal de L1 queda como pensamiento interno. Toda salida visible al usuario pasa por `send_user`, y la comunicación entre niveles usa colas persistentes asíncronas.
4. **Self-Describing Routing**: Cada nivel tiene su propio catálogo de modelos con descripción de capacidades (`description`) y ajuste opcional de prompt. L1 y L2 eligen el modelo óptimo en tiempo de ejecución mediante `list_models`.
5. **Location Transparency**: `dsh-mesh-node` envuelve nodos remotos como un Subagent Provider estándar `prism-<nodeId>`. Como L3 hereda siempre el espacio de trabajo de L2, las operaciones intensivas de archivos permanecen locales en el nodo propietario.
6. **Virtual Facade & Copy-on-Conflict**: Por fuera parecen Subagents ligeros; por dentro son sesiones formales de DSH con persistencia y reanudación. Si al activar una sesión hay conflicto de bloqueo de escritura, se hace un Fork inmediato, se reasigna el enlace de forma atómica y se archiva la sesión anterior.

## Tres niveles de aislamiento

| Rol | Espacio de trabajo | Responsabilidad y límites |
| --- | --- | --- |
| **L1** | Proyecto por defecto | Atiende al usuario, consulta metadatos autorizados en `dsh-workspace-registry`, elige proyecto destino y modelo L2. **Sin acceso a archivos ni terminal.** |
| **L2** | Proyecto elegido por L1 | Planifica dentro del proyecto, elige modelos L3, delega pasos y puede restringir aún más sus herramientas. |
| **L3** | **Hereda obligatoriamente** nodo y espacio de L2 | Ejecuta pasos localmente dentro de la intersección entre rol L3, política del proyecto y presupuesto de L2. |

## Mensajes y eventos de cierre

`send_user` publica la respuesta visible; `send_parent` y `send_child` despiertan al destinatario por su cola; `report_progress` / `get_progress` y `task_settled` coordinan avances y finalizaciones asíncronas.

| Rol | Herramientas de coordinación |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Siguiente: [Modelos y proyectos](/es/develop/models) · [Mesh y sesiones](/es/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
