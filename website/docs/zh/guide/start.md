# 快速开始：一句话同时查两个项目

用上棱镜之后，你不用再自己切换工作区、记住每个文件夹在哪。这篇指南带你从头完成一次配置，并在同一个聊天窗口里同时让两个项目（`harbor-books` 书店和 `lantern-cafe` 咖啡馆）各自核对活动信息，最后汇总给你。

本指南基于 DeepSeek Harness `0.2.3-alpha.2`。你可以直接使用自己的项目目录，也可以下载仓库自带的两个示例目录：[查看 GitHub 示例目录](https://github.com/dsh-plugins/dsh-prism/tree/main/docs/examples)。

## 1. 安装七个必需的棱镜插件

打开 DeepSeek Harness。首次启动时，在预览版说明中点击 **继续**，如果弹出 **开始使用** 窗口可以直接关掉。

![首次启动的预览版说明](../../guide/screens/0.2.2/zh/01-preview.png)

![安装前的 DSH 首页](../../guide/screens/0.2.2/zh/02-home.png)

在左侧栏进入 **插件 → 添加插件**，在 **包名或地址** 中填入下表里的完整包名和版本，保持 **默认安装源** 不变，点击 **安装**，确认版本号无误后点 **立即启用**。请按顺序逐个安装并启用：

| 安装顺序 | npm 包名及版本 |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

<details>
<summary>从源码构建实测版编排器</summary>

表格列出 npm 仓库中的版本。下面的截图使用从源码构建的编排器 `0.2.2` 安装包，包含 High 和 Cron 修复。有编排器仓库读取权限时，可按下面的命令构建，并在安装第 2 个插件时通过 **插件 → 添加插件** 填入压缩包的绝对路径。

```sh
git clone https://github.com/dsh-plugins/dsh-orchestrator.git
cd dsh-orchestrator
git checkout 6790d2aa019147f977d9fea8d530c8d03cc75ee6
npm ci
npm run build
npm pack
```

</details>

启用 Mesh 后，编排器会启动。如果安装 Mesh 前 DSH 提示编排器未激活，继续安装并启用 Mesh，再刷新页面，确认两者的开关均为开启状态。

![DSH 插件页的添加入口](../../guide/screens/0.2.2/zh/03-plugins.png)

<details>
<summary>七个插件的安装截图</summary>

![输入 dsh-workspace-registry 的包名和版本](../../guide/screens/0.2.2/zh/04-1-source-dsh-workspace-registry.png)

![dsh-workspace-registry 安装成功，可立即启用](../../guide/screens/0.2.2/zh/05-1-installed-dsh-workspace-registry.png)

![输入实测版编排器的本地安装包路径](../../guide/screens/0.2.2/zh/04-2-source-dsh-orchestrator.png)

![dsh-orchestrator 安装成功，可立即启用](../../guide/screens/0.2.2/zh/05-2-installed-dsh-orchestrator.png)

![输入 dsh-mesh-node 的包名和版本](../../guide/screens/0.2.2/zh/04-3-source-dsh-mesh-node.png)

![dsh-mesh-node 安装成功，可立即启用](../../guide/screens/0.2.2/zh/05-3-installed-dsh-mesh-node.png)

![输入 dsh-im-gateway 的包名和版本](../../guide/screens/0.2.2/zh/04-4-source-dsh-im-gateway.png)

安装 IM 网关时，如果 DSH 提示需要确认运行依赖脚本，核对列出的依赖后点击 **允许这些脚本并重试** 即可。

![安装 IM 网关时出现依赖脚本确认](../../guide/screens/0.2.2/zh/05-4-scripts.png)

![dsh-im-gateway 安装成功，可立即启用](../../guide/screens/0.2.2/zh/05-4-installed-dsh-im-gateway.png)

![输入 dsh-concierge-ui 的包名和版本](../../guide/screens/0.2.2/zh/04-5-source-dsh-concierge-ui.png)

![dsh-concierge-ui 安装成功，可立即启用](../../guide/screens/0.2.2/zh/05-5-installed-dsh-concierge-ui.png)

![输入记忆插件包名](../../guide/screens/0.2.2/zh/04-6-source-dsh-memory.png)

![启用记忆插件](../../guide/screens/0.2.2/zh/05-6-installed-dsh-memory.png)

![输入事件触发器插件包名](../../guide/screens/0.2.2/zh/04-7-source-dsh-triggers.png)

![启用事件触发器插件](../../guide/screens/0.2.2/zh/05-7-installed-dsh-triggers.png)

</details>

> [!TIP]
> 如果七个插件都启用后，左侧栏还没有出现 **棱镜** 入口，刷新一次浏览器页面。如果页面提示 `missing or incompatible host boot descriptor`，刷新也会重新加载棱镜客户端。

![DSH 插件页中七个棱镜插件均已启用](../../guide/screens/0.2.2/zh/06-seven-plugins.png)

要连接另一台设备，请在两台设备的 **设置 → 棱镜/连接** 输入同一个信令地址和连接码。[WebRTC Mesh 指南](../develop/mesh.md)

### 配置长期记忆和事件触发器 {#optional-plugins}

长期记忆插件支持保存资料和媒体附件，事件触发器插件支持定时提醒与外部事件。请在同一个 DSH 配置档中启用全部七个插件。

打开 **设置 → 棱镜/记忆 → 远程 API**。将 `EMBEDDINGS_BASE_URL` 的值填入 **BASE_URL**，将 `EMBEDDINGS_API_KEY` 的值填入 **API_KEY**，在 **MODEL_ID** 中输入 `BAAI/bge-large-zh-v1.5`。确认绑定并等待初始化。页面显示当前模型和向量维度后，即可使用记忆工具。之后每次启动 DSH 都会自动加载绑定。

![远程嵌入表单](../../guide/screens/0.2.2/zh/08-memory-connect.png)

![确认绑定嵌入模型](../../guide/screens/0.2.2/zh/09-memory-confirm.png)

![远程模型已绑定，记忆工具处于启用状态](../../guide/screens/0.2.2/zh/10-memory-bound.png)

## 2. 接入模型

打开账号菜单，进入 **设置 → 模型 → 添加模型提供商 → 自定义模型 API**。在 **API 协议** 中选择 **OpenAI Responses**，填入连接标识（如 `prism-responses`）和显示名称（如 **Prism Responses**）。

将 `BASE_URL` 的值填入 **API 地址**，将 `API_KEY` 的值填入 **API 密钥**。点击 **获取可用模型** 并选中 `deepseek-v4.1-flash`，也可以点击 **添加模型** 手动输入模型 ID。

![从 DSH 模型设置添加提供商](../../guide/screens/0.2.2/zh/11-model-settings.png)

![已选择 OpenAI Responses，私密字段已遮挡](../../guide/screens/0.2.2/zh/12-provider-form.png)

![Responses 提供商目录中显示 deepseek-v4.1-flash](../../guide/screens/0.2.2/zh/13-provider-models.png)

展开 `deepseek-v4.1-flash` 的 **模型选项**，启用 **推理等级**，确认 **High** 对应的 API 值为 `high`，再点击 **创建提供商**。保存后也可在该提供商的 **自定义设置** 中修改推理等级。[DSH 模型提供商指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md#reasoning-effort)

![将 High 映射到 API 值 high](../../guide/screens/0.2.2/zh/14-provider-reasoning.png)

![已保存 Prism Responses 提供商](../../guide/screens/0.2.2/zh/15-provider-saved.png)

## 3. 添加项目目录

在侧栏 **工作区** 旁点击 **添加工作区**，选中第一个项目目录（如 `harbor-books`）并点击 **打开**（也可以点 **编辑路径** 直接粘贴绝对路径后回车）。用同样的方法添加第二个项目目录（`lantern-cafe`）。

如果首次启动时 DSH 无法创建默认工作区，可以按上述步骤手动添加目录。

棱镜会自动识别你在 DSH 里添加的所有本地工作区，之后你在对话里直接提项目名字，它就能找到对应的目录。

![在目录选择器中定位书店项目](../../guide/screens/0.2.2/zh/16-1-workspace-harbor-books.png)

![书店项目已加入工作区](../../guide/screens/0.2.2/zh/17-1-workspace-added.png)

![在目录选择器中定位咖啡馆项目](../../guide/screens/0.2.2/zh/16-2-workspace-lantern-cafe.png)

![工作区侧栏已出现两个项目](../../guide/screens/0.2.2/zh/17-2-workspace-added.png)

在 DSH 对话输入框旁选择 **Prism Responses → deepseek-v4.1-flash**，再次打开模型菜单，将推理等级设为 **High**。从编排器 `0.2.2` 起，棱镜在提供商和模型 ID 均相同时继承 DSH 的推理等级。前端实测中，原生 DSH 会话、棱镜 L1 以及两个项目的 L2、L3 会话均显示 **High**。编排器 `0.2.1` 使用提供商路由的默认推理等级。

![DSH 模型菜单中的 High 推理等级](../../guide/screens/0.2.2/zh/18-effort-picker.png)

![DSH 对话输入框显示已选中的 High 推理等级](../../guide/screens/0.2.2/zh/19-native-high.png)

## 4. 为不同环节挑选模型（可选）

打开 **设置 → 棱镜/配置**，这里可以分别设置棱镜在三个环节中允许使用的模型：
- **L1（对话）**：负责和你沟通、理解需求并分派任务。
- **L2（规划）**：负责在具体项目里拆解步骤。
- **L3（执行）**：负责读取文件、核查资料和执行具体操作。

在三个环节都勾选 `deepseek-v4.1-flash`。如果某个环节未选择模型，棱镜会沿用 DSH 的默认模型。点击模型旁边的编辑按钮，填入 **模型介绍** 和 **模型提示词** 后保存。在多个环节启用同一个模型时，请使用相同的介绍与提示词。模型介绍供上一级选择子代理，模型提示词用于设置该模型的工作偏好。如果你的 DSH 已通过其他提供商接入 `gpt-6.2-sol`，可以为它填写对应的介绍与提示词。[模型介绍与提示词](./model-metadata.md)

![在棱镜分层配置中查看已保存的 DeepSeek 模型介绍与提示词](../../guide/screens/0.2.2/zh/21-l1-model-copy.png)

<details>
<summary>各环节的模型选择截图</summary>

![配置页及本机工作区发现说明](../../guide/screens/0.2.2/zh/20-layer-configuration.png)

![L2 已勾选目标模型](../../guide/screens/0.2.2/zh/21-l2-model-copy.png)

![L3 已勾选目标模型](../../guide/screens/0.2.2/zh/21-l3-model-copy.png)

![重新进入配置页核对已保存的分层设置](../../guide/screens/0.2.2/zh/22-layer-settings.png)

</details>

> [!NOTE]
> 如果你还想在微信、飞书/Lark、Telegram 等聊天软件里直接找棱镜办事，可以去 **设置 → 棱镜/IM** 里配置。详见[接入即时通讯指南](./im.md)。

## 5. 一句话向两个项目派发任务

关掉设置窗口，点击侧栏的 **棱镜**。确认输入框旁显示的是 `deepseek-v4.1-flash`，发送下面的需求：

> 请分别给 harbor-books 和 lantern-cafe 分派一项任务，每项任务用对应的项目名作为标题。让每个项目的规划与执行流程读取各自工作区的 README.md，核对活动开始时间、场地和现场负责人。两个项目都核实后，请在这里用两行回复，每行以项目名开头。

![棱镜对话与当前模型](../../guide/screens/0.2.2/zh/23-prism-chat.png)

![在同一请求中指定两个工作区](../../guide/screens/0.2.2/zh/24-request.png)

你会看到时间线里出现两张任务卡，棱镜在后台分别核查完两个项目后，会直接给你汇总出两行结果：

![对话时间线中显示两项派发任务](../../guide/screens/0.2.2/zh/25-two-tasks.png)

![棱镜回复分别列出了两个项目的活动资料](../../guide/screens/0.2.2/zh/26-results.png)

如果你使用的是仓库自带的示例目录，核对出的结果如下：

| 项目 | 开始时间 | 场地 | 现场负责人 |
| --- | --- | --- | --- |
| Harbor Books | 18:30 | 楼上阅览室（upstairs reading room） | Mira |
| Lantern Cafe | 16:00 | 花园房间（garden room） | Kai |

<details>
<summary>验证记忆和定时提醒</summary>

在编排器 `0.2.2` 中，可以请棱镜创建 Cron 提醒。棱镜通过 `event_add_cron` 分别接收表达式、时区和提醒内容。干净环境实测已创建订阅、在原对话收到通知，并按请求移除测试订阅。

![写入并查回测试记忆](../../guide/screens/0.2.2/zh/29-memory-readback.png)

![棱镜创建 Cron 订阅](../../guide/screens/0.2.2/zh/28-cron-subscription.png)

![定时通知送回同一对话](../../guide/screens/0.2.2/zh/30-cron-delivered.png)

![取消测试订阅](../../guide/screens/0.2.2/zh/31-cron-cancelled.png)

![Cron 工具返回订阅 ID](../../guide/screens/0.2.2/zh/32-cron-trajectory.png)

![DSH 轨迹确认订阅已移除](../../guide/screens/0.2.2/zh/32-cancel-trajectory.png)

</details>

## 6. 按需回看底层过程（可选）

平时用棱镜不需要关心底层细节；只有当你想核对“它到底读了哪个文件、是怎么得出结论的”时，点击顶部的 **DeepSeek Harness** 就能切回工作区视图。

在左侧 **工作区** 里展开对应项目：**棱镜** 对应主对话，**棱镜 L2** 对应任务规划，**棱镜 L3** 对应具体执行。你可以随时点开这些只读记录查看原文和调用过程，看完后再点侧栏的 **棱镜** 就能回到聊天窗口。

<details>
<summary>展开查看：在 DSH 中查看只读会话记录</summary>

![DSH 工作区侧栏列出各层会话](../../guide/screens/0.2.2/zh/27-l1-high.png)

![harbor-books 的规划层会话](../../guide/screens/0.2.2/zh/27-harbor-l2-high.png)

![harbor-books 的执行层读取本项目 README](../../guide/screens/0.2.2/zh/27-harbor-l3-high.png)

![lantern-cafe 的规划层会话](../../guide/screens/0.2.2/zh/27-lantern-l2-high.png)

![lantern-cafe 的执行层读取本项目 README](../../guide/screens/0.2.2/zh/27-lantern-l3-high.png)

</details>

下一步：[与棱镜对话](./chat.md) · [接入即时通讯](./im.md)

## 常见问题

- **安装插件时提示“这个包没有声明组合包”**：请核对是否按第 1 步表格填写了带版本号的完整包名（例如 `@dsh-prism/dsh-workspace-registry@0.1.2`），并在每次安装后点击 **立即启用**。
- 如果启用七个插件后侧栏仍没有显示 **棱镜**，刷新一次 DSH 浏览器标签页。
- **在目录选择器输入路径后，页面仍停留在原目录**：再点一次 **编辑路径** 输入目标路径，确认路径栏末尾已经变成目标文件夹名后再点 **打开**。
