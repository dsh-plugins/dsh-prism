# Model descriptions and prompts · 模型介绍与提示词

Under **Settings → Prism/Configuration**, use the same description and prompt wherever a model is enabled across L1, L2, or L3. The parent agent uses the description to select a subagent. The prompt sets the model's general working preferences.

在 **设置 → 棱镜/配置** 中，同一个模型在 L1、L2、L3 各环节使用相同的介绍和提示词。上一级代理根据模型介绍选择子代理，模型提示词用于设置该模型的通用工作偏好。

## `deepseek-v4.1-flash`

Select **High** (`high`) reasoning effort in the DSH model picker. Prism orchestrator `0.2.1` passes only the provider and model ID to its sessions, so Prism's reasoning effort depends on the provider default. [Quick start](./start.md)

在 DSH 模型菜单中选择 **高**（`high`）推理强度。棱镜编排器 `0.2.1` 只向会话传递提供商和模型 ID，棱镜会话的推理强度由提供商的默认值决定。[快速开始](../zh/guide/start.md)

### Model description · 模型介绍

```text
能力：能力平均，足以完成边界清晰的单点任务。中高效率（速度快，但单轮 Token 利用率低）。复杂场景下容易过度思考。场景：单文件修改、按既定模板批量改写、定向搜索与信息汇总、小型代码审查。特殊：DSH（DeepSeek Harness）插件创作专用模型。适用：任务目标与验收标准已经明确、不涉及跨模块权衡、要求效率时使用。主代理非 DeepSeek 模型时，编写 DeepSeek Harness 插件优先使用。
```

### Model prompt · 模型提示词

```text
使用最高效率完成任务，无须在意相关成本问题。单轮优先**并行使用**多个工具或多个指令执行任务，少且尽可能的**避免单步调用**工具或执行单轮指令。
```

## `gpt-6.2-sol`

Use these values if `gpt-6.2-sol` is available through a separately configured DSH provider.

如果 DSH 已通过其他提供商接入 `gpt-6.2-sol`，请使用以下值。

### Model description · 模型介绍

```text
能力：逻辑推理与数学能力出众。后端能力出众。大局观与项目架构能力极差。效率常规。场景：局部代码审查，强逻辑性/复杂数学问题解决。适用：小范围逻辑性代码审查时并行化使用，解决强逻辑性/复杂数学问题时使用。
```

### Model prompt · 模型提示词

```text
使用准确、自然的语言，严格控制对话回复、文档与代码注释的文风：直接说明准备执行的操作或已确认的技术结论。**不要额外介绍**你不会做什么、哪些内容将保持不变，或者你准备如何拆分和归类结果；禁止交代阅读过程与心路历程。 禁止开头寒暄、恭维或复述问题。禁止结尾空泛总结、口号与边界免责声明。
```
