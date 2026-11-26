# 分层与权限

每个角色都运行在正式 DSH 会话中，对外暴露 Subagent Provider 接口。宿主在工具发现和调用时实施权限限制。

| 角色 | 职责与边界 |
| --- | --- |
| **L1** | 在配置的默认项目中接待用户。只查询该主体有权访问的项目元数据，选择目标项目及 L2 模型。没有文件读写与终端执行工具。 |
| **L2** | 在 L1 指定的项目中规划，动态选择 L3 模型，派发步骤时可收窄工具权限。只与直接上下级交换消息。 |
| **L3** | 在父任务所属节点和工作区执行步骤。原生工具由角色、项目及上级授予的权限共同限定。 |

## 主动发信与完成事件

L1 只有调用 `send_user` 才会向用户发出可见回复。普通模型文本保留在底层会话。`send_parent` 与 `send_child` 通过持久队列唤醒接收方。上级可调用 `get_progress` 查询进度；子任务进入终态时，会向上级投递 `task_settled` 事件。

| 角色 | 编排工具 |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

投递状态和任务卡可单独更新。收到完成事件后，L1 判断是否需要主动通知用户。通过 `list_models` 可查询下一层模型的能力介绍。

[模型与项目](/zh/develop/models) · [Mesh 与会话](/zh/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
