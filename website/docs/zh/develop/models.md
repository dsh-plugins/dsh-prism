# 动态点将与工作区治理

棱镜将「模型选择权」与「路径解析权」彻底解耦：模型由运行时按能力简历动态择优，而工作区目录只在受信宿主代码中按授权规则解析。

## 分层模型池与动态点将

在 **设置 → 棱镜/配置**（或源码启动器 `prism.config.json` 的 `orchestrator.models`）中，L1、L2、L3 三层各自维护独立的可用模型列表。某层留空时，自动沿用 DSH 当前的默认模型。

每个模型条目支持以下配置：
- `id` 与可选的 `provider`：指定模型 ID 及对应的 DSH 提供方（省略 `provider` 时使用宿主默认提供方）。同一层内的模型 ID 须保持唯一。
- `description`（能力介绍）：供上级代理在派发前通过 `list_models` 读取的「能力简历」。建议写明该模型擅长快速分诊、复杂规划还是严谨核查，以便上级按任务复杂度动态点将。
- `prompt` 与 `promptMode`（提示词覆写）：注入或替代该模型的系统提示词。`"append"`（默认）在角色提示词后追加指令；`"replace"` 则将配置的 `prompt` 作为完整系统提示词。无论如何配置提示词，都无法突破宿主层面的工具权限上限。

**运行时选择权归属**：
- **L1 模型**由用户在 Web 输入框或 IM 的 `/model` 命令中自由切换。
- **L2 与 L3 模型**由直接上级（L1 选 L2，L2 选 L3）在派发时根据各模型的 `description` 动态决定，兼顾效果、延迟与成本。

### 源码启动器配置示例

在 `prism.config.json` 的 `orchestrator` 段中配置各层模型池：

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "日常需求澄清与分派" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "复杂任务拆解与交叉验证" }],
    "L3": [
      {
        "id": "deepseek-flash",
        "description": "定向代码审查与事实核对",
        "promptMode": "append",
        "prompt": "汇报时请附上实际核查过的文件路径。"
      }
    ]
  }
}
```

## 工作区发现与注册表治理

为了让用户只提项目名就能办事，同时防止底层路径与未授权项目暴露给前端会话，工作区通过两条路径纳入 `dsh-workspace-registry` 治理：

1. **DSH 原生工作区自动发现**：在 DSH 侧栏添加的本地目录会被自动纳入注册表，Prism 以原生工作区 UUID 作为内部项目 ID、以工作区显示名称匹配用户意图。自动发现的工作区默认仅开放只读检索工具（`read`、`glob`、`grep`），对 DSH 网页所有者及已批准的 IM 私聊用户可见。
2. **显式项目注册表**：在多设备或精细权限场景下，可通过 `registry` 显式声明 `id`、`description`、`stack`、`nodeId`、`workspace`、`principals`、`permissions`（以及可选的 `gitRemote`）。同一节点与路径的显式配置优先于自动发现的默认规则。

**安全边界**：L1 调用 `query_projects` 时只能拿到已授权的元数据，无法直接接触物理路径；真实工作区目录仅在受信宿主代码派发任务时解析，而 L3 最终可用的工具集合严格受限于「L3 角色白名单 ∩ 项目策略 ∩ L2 下传预算」三者交集。

下一步：[架构设计与分层隔离](/zh/develop/layers) · [Mesh 与遇锁自愈](/zh/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
