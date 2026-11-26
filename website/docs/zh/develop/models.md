# 模型与项目

注册表记录可访问项目。编排器另行配置各角色可选择的模型，以及可向下授予的原生工具。

## 在 DSH 界面中设置插件

通过插件管理器安装时，对话、规划与执行三个角色使用 DSH 对话选定的模型。在 **设置 → 模型** 添加提供商，再在原生对话的输入区选择模型。在 **设置 → 棱镜** 中为每个项目填写唯一 ID、宿主上的目录及允许使用的工具。[完整操作图解](/zh/guide/start)

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

## 项目授权

注册表条目包含 `id`、`description`、`stack`、`nodeId`、`workspace`、`principals` 和 `permissions`，`gitRemote` 可选。L1 查询只返回获准的元数据。实际目录仅由受信宿主代码解析。执行工具须同时满足 L3 白名单、项目策略与上级派发时设定的上限。

[分层与权限](/zh/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
