# Roles and permissions

Every role runs in a formal DSH session and is exposed through a Subagent Provider. The host enforces the boundary on tool discovery and invocation.

| Role | Responsibility and boundary |
| --- | --- |
| **L1** | Talks to the user in the configured default project. It sees the project metadata granted to that identity and selects the target project and L2 model. It cannot read files, write files or run shell commands. |
| **L2** | Plans in the project selected by L1. It selects L3 models, assigns individual steps and can reduce their tool budgets. It communicates with its own parent and children. |
| **L3** | Executes a step in its parent’s project, on the same node and in the same workspace. Native tools are limited by the role, project and parent’s grant. |

## Messages and completion

L1 publishes a visible reply with `send_user`. Ordinary model text remains in the DSH session. `send_parent` and `send_child` wake the receiving agent through its queue. A parent can inspect `get_progress` between updates. A terminal task enqueues a `task_settled` event for its parent.

| Role | Orchestration tools |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

A delivery status or card update can appear independently of an assistant reply. After receiving a completion event, L1 decides whether to send the user a message. Use `list_models` to inspect the descriptions of models available to the next tier.

[Models and projects](/develop/models) · [Mesh and sessions](/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
