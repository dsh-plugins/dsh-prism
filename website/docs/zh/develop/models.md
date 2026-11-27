# 模型与工作区

## 在 DSH 中选择各层模型

在 **设置 → 模型** 中添加供应商，并在 DSH 原生对话的模型菜单中选择默认模型。打开 **设置 → 棱镜/配置**，分别勾选 L1 对话、L2 规划和 L3 执行可以使用的模型。未勾选模型的层跟随 DSH 默认模型。点某个模型旁的编辑按钮可保存该层使用的模型介绍和提示词。[逐层配置图解](../guide/start.md)

## DSH 工作区发现

从 DSH 侧栏添加本机项目目录。棱镜采用原生工作区 UUID 作为内部项目 ID，以工作区显示名称供用户和规划代理识别项目。自动发现的目录默认允许 `read`、`glob` 和 `grep`。网页所有者及经消息网关授权的 IM 私聊用户可以查询这些工作区。显式配置的同节点项目优先采用其自身的权限限定。[配置消息账号与审批](../guide/im.md)

## 使用源码启动器分别设置各层模型

从源码启动时，可把下面的片段放在 `prism.config.json` 的 `orchestrator` 中。模型 ID 需受当前 DSH 提供方支持，并在同一层内唯一。

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "日常需求澄清" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "复杂规划与验证" }],
    "L3": [{ "id": "deepseek-flash", "description": "定向代码审查", "promptMode": "append", "prompt": "列出实际检查过的文件。" }]
  }
}
```

## 模型介绍与系统提示词

`description` 用于帮助上级判断适用场景。可以写明擅长检索、规划还是复杂实现。`provider` 显式选择 DSH 提供方，省略时采用宿主当前的默认模型提供方。

`promptMode: "append"` 将角色与模型指令追加到系统提示词；`"replace"` 将配置的 `prompt` 用作完整自定义系统提示词。工具权限仍由宿主实施。

## 显式项目的授权

注册表条目包含 `id`、`description`、`stack`、`nodeId`、`workspace`、`principals` 和 `permissions`，`gitRemote` 可选。L1 查询只返回获准的元数据。实际目录仅由受信宿主代码解析。执行工具须同时满足 L3 白名单、项目策略与上级派发时设定的上限。

[分层与权限](/zh/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
