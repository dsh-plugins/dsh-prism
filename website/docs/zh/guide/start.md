# 快速开始：一句话同时查两个项目

用上棱镜之后，你不用再自己切换工作区、记住每个文件夹在哪。这篇指南带你从头完成一次配置，并在同一个聊天窗口里同时让两个项目（`harbor-books` 书店和 `lantern-cafe` 咖啡馆）各自核对活动信息，最后汇总给你。

本指南基于 DeepSeek Harness `0.2.3-alpha.2`。你可以直接使用自己的项目目录，也可以下载仓库自带的两个示例目录：[查看 GitHub 示例目录](https://github.com/dsh-plugins/dsh-prism/tree/main/docs/examples)。

## 1. 安装五个棱镜插件

打开 DeepSeek Harness。首次启动时，在预览版说明中点击 **继续**，如果弹出 **开始使用** 窗口可以直接关掉。

![首次启动的预览版说明](../../guide/screens/0.1.2/zh/01-preview.png)

![安装前的 DSH 首页](../../guide/screens/0.1.2/zh/02-home.png)

在左侧栏进入 **插件 → 添加插件**，在 **包名或地址** 中填入下表里的完整包名和版本，保持 **默认安装源** 不变，点击 **安装**，确认版本号无误后点 **立即启用**。请按顺序逐个安装并启用：

| 安装顺序 | npm 包名及版本 |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.0` |

请使用表格中的当前包版本。截图展示的是早期版本中的相同安装控件。启用 Mesh 后，编排器会启动。

![DSH 插件页的添加入口](../../guide/screens/0.1.2/zh/03-plugins.png)

<details>
<summary>展开查看：五个插件的逐个安装截图</summary>

![输入 dsh-workspace-registry 的包名和版本](../../guide/screens/0.1.2/zh/04-1-source-dsh-workspace-registry.png)

![dsh-workspace-registry 安装成功，可立即启用](../../guide/screens/0.1.2/zh/05-1-installed-dsh-workspace-registry.png)

![输入 dsh-orchestrator 的包名和版本](../../guide/screens/0.1.2/zh/04-3-source-dsh-orchestrator.png)

![dsh-orchestrator 安装成功，可立即启用](../../guide/screens/0.1.2/zh/05-3-installed-dsh-orchestrator.png)

![输入 dsh-mesh-node 的包名和版本](../../guide/screens/0.1.2/zh/04-2-source-dsh-mesh-node.png)

![dsh-mesh-node 安装成功，可立即启用](../../guide/screens/0.1.2/zh/05-2-installed-dsh-mesh-node.png)

![输入 dsh-im-gateway 的包名和版本](../../guide/screens/0.1.2/zh/04-4-source-dsh-im-gateway.png)

安装 IM 网关时，如果 DSH 提示需要确认运行依赖脚本，核对列出的依赖后点击 **允许这些脚本并重试** 即可。

![安装 IM 网关时出现依赖脚本确认](../../guide/screens/0.1.2/zh/05-im-install-scripts.png)

![dsh-im-gateway 安装成功，可立即启用](../../guide/screens/0.1.2/zh/05-4-installed-dsh-im-gateway.png)

![输入 dsh-concierge-ui 的包名和版本](../../guide/screens/0.1.2/zh/04-5-source-dsh-concierge-ui.png)

![dsh-concierge-ui 安装成功，可立即启用](../../guide/screens/0.1.2/zh/05-5-installed-dsh-concierge-ui.png)

</details>

![五个棱镜插件全部安装完成](../../guide/screens/0.1.2/zh/06-before-reload.png)

> [!TIP]
> 如果五个插件都启用后，左侧栏还没有出现 **棱镜** 入口，刷新一次浏览器页面即可。

![刷新 DSH 后显示棱镜入口](../../guide/screens/0.1.2/zh/06-after-reload.png)

### 可选安装长期记忆和事件触发器 {#optional-plugins}

启用五个核心插件后，可在同一个 DSH 配置档中按需加装长期记忆和事件触发器。长期记忆支持资料保存和媒体附件，事件触发器支持定时提醒与外部事件。

在 **插件 → 添加插件** 中输入完整包名与版本，安装后选择 **立即启用**。也可以通过命令行安装到 `web` 配置档。

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.2.0"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.0"
```

## 2. 接入模型

打开账号菜单，进入 **设置 → 模型 → 添加模型提供商 → 自定义模型 API**。在 **API 协议** 中选择 **OpenAI Responses**，填入连接标识（如 `prism-responses`）和显示名称（如 **Prism Responses**）。

点击 **添加模型**，在 **模型 ID 1** 中输入 `deepseek-v4.1-flash`，填好你的 **API 地址** 和 **API 密钥** 后点击 **创建提供商**。

![从 DSH 模型设置添加提供商](../../guide/screens/0.1.2/zh/models.png)

![在自定义提供商中添加模型 ID](../../guide/screens/0.1.2/zh/before_private_input.png)

![已选择 OpenAI Responses，私密字段已遮挡](../../guide/screens/0.1.2/zh/custom_provider.png)

![已保存 Prism Responses 提供商](../../guide/screens/0.1.2/zh/provider_saved.png)

接着在 DSH 对话输入框旁的模型菜单里，选中 **Prism Responses → deepseek-v4.1-flash** 作为默认模型。

![DSH 模型菜单中的提供商和模型](../../guide/screens/0.1.2/zh/model-picker.png)

![DSH 中已选定的默认模型](../../guide/screens/0.1.2/zh/09-default-model.png)

## 3. 添加项目目录

在侧栏 **工作区** 旁点击 **添加工作区**，选中第一个项目目录（如 `harbor-books`）并点击 **打开**（也可以点 **编辑路径** 直接粘贴绝对路径后回车）。用同样的方法添加第二个项目目录（`lantern-cafe`）。

棱镜会自动识别你在 DSH 里添加的所有本地工作区，之后你在对话里直接提项目名字，它就能找到对应的目录。

![在目录选择器中定位书店项目](../../guide/screens/0.1.2/zh/workspace-picker-harbor-books.png)

![书店项目已加入工作区](../../guide/screens/0.1.2/zh/08-1-workspace.png)

![在目录选择器中定位咖啡馆项目](../../guide/screens/0.1.2/zh/workspace-picker-lantern-cafe.png)

![工作区侧栏已出现两个项目](../../guide/screens/0.1.2/zh/08-2-workspace.png)

## 4. 为不同环节挑选模型（可选）

打开 **设置 → 棱镜/配置**，这里可以分别设置棱镜在三个环节中允许使用的模型：
- **L1（对话）**：负责和你沟通、理解需求并分派任务。
- **L2（规划）**：负责在具体项目里拆解步骤。
- **L3（执行）**：负责读取文件、核查资料和执行具体操作。

勾选某个环节允许使用的模型即可；如果某个环节不勾选，就会自动沿用 DSH 的默认模型。你还可以点击模型旁边的编辑按钮，写一段 **模型介绍**（帮棱镜判断什么时候适合派它上场）和 **模型提示词**，最后点击 **保存**。

在下面的示例里，我们为三个环节都勾选 `deepseek-v4.1-flash`，并填上对应的介绍与提示词：

| 环节 | 模型介绍 | 模型提示词 |
| --- | --- | --- |
| L1（对话） | 协调多个项目的任务 | 按照用户指定的语言和格式汇总已核实的结果。 |
| L2（规划） | 规划项目任务 | 复用已经核实的结果，并向协调者汇报已完成的工作。 |
| L3（执行） | 核查工作区资料 | 报告已核实的事实，并在需要时注明来源文件。 |

<details>
<summary>展开查看：配置各环节模型与规则的截图</summary>

![配置页及本机工作区发现说明](../../guide/screens/0.1.2/zh/10-prism-configuration.png)

![L1 已勾选目标模型](../../guide/screens/0.1.2/zh/11-l1-model.png)

![L1 的模型介绍和提示词](../../guide/screens/0.1.2/zh/11-l1-rule.png)

![L2 已勾选目标模型](../../guide/screens/0.1.2/zh/11-l2-model.png)

![L2 的模型介绍和提示词](../../guide/screens/0.1.2/zh/11-l2-rule.png)

![L3 已勾选目标模型](../../guide/screens/0.1.2/zh/11-l3-model.png)

![L3 的模型介绍和提示词](../../guide/screens/0.1.2/zh/11-l3-rule.png)

![重新进入配置页核对已保存的分层设置](../../guide/screens/0.1.2/zh/12-model-settings-verified.png)

</details>

> [!NOTE]
> 如果你还想在微信、飞书/Lark、Telegram 等聊天软件里直接找棱镜办事，可以去 **设置 → 棱镜/IM** 里配置。详见[接入即时通讯指南](./im.md)。

## 5. 一句话向两个项目派发任务

关掉设置窗口，点击侧栏的 **棱镜**（或者在 **棱镜/配置** 里点 **打开棱镜**）。确认输入框旁显示的是 `deepseek-v4.1-flash`，发送下面的需求：

> 请分别给 harbor-books 和 lantern-cafe 分派一项任务，每项任务用对应的项目名作为标题。让每个项目的规划与执行流程读取各自工作区的 README.md，核对活动开始时间、场地和现场负责人。两个项目都核实后，请在这里用两行回复，每行以项目名开头。

![DSH 侧栏中的棱镜入口](../../guide/screens/0.1.2/zh/09-default-model.png)

![棱镜对话与当前模型](../../guide/screens/0.1.2/zh/13-prism-chat.png)

![在同一请求中指定两个工作区](../../guide/screens/0.1.2/zh/14-request.png)

你会看到时间线里出现两张折叠任务卡，棱镜在后台分别核查完两个项目后，会直接给你汇总出两行结果：

![对话时间线中显示两项派发任务](../../guide/screens/0.1.2/zh/15-dispatched.png)

![棱镜回复分别列出了两个项目的活动资料](../../guide/screens/0.1.2/zh/16-results.png)

如果你使用的是仓库自带的示例目录，核对出的结果如下：

| 项目 | 开始时间 | 场地 | 现场负责人 |
| --- | --- | --- | --- |
| Harbor Books | 18:30 | 楼上阅览室（upstairs reading room） | Mira |
| Lantern Cafe | 16:00 | 花园房间（garden room） | Kai |

## 6. 按需回看底层过程（可选）

平时用棱镜不需要关心底层细节；只有当你想核对“它到底读了哪个文件、是怎么得出结论的”时，点击顶部的 **DeepSeek Harness** 就能切回工作区视图。

在左侧 **工作区** 里展开对应项目：**棱镜** 对应主对话，**棱镜 L2** 对应任务规划，**棱镜 L3** 对应具体执行。你可以随时点开这些只读记录查看原文和调用过程，看完后再点侧栏的 **棱镜** 就能回到聊天窗口。

<details>
<summary>展开查看：在 DSH 中查看只读会话记录</summary>

![DSH 工作区侧栏列出各层会话](../../guide/screens/0.1.2/zh/17-native-workspace-history.png)

![在 DSH 查看对话层的会话记录](../../guide/screens/0.1.2/zh/17-l1-conversation.png)

![harbor-books 的规划层会话](../../guide/screens/0.1.2/zh/17-harbor-books-planner.png)

![harbor-books 的执行层读取本项目 README](../../guide/screens/0.1.2/zh/17-harbor-books-executor.png)

![lantern-cafe 的规划层会话](../../guide/screens/0.1.2/zh/17-lantern-cafe-planner.png)

![lantern-cafe 的执行层读取本项目 README](../../guide/screens/0.1.2/zh/17-lantern-cafe-executor.png)

![从 DSH 回到棱镜，已核对的结果仍在对话中](../../guide/screens/0.1.2/zh/18-finish.png)

</details>

下一步：[与棱镜对话](./chat.md) · [接入即时通讯](./im.md)

## 常见问题

- **安装插件时提示“这个包没有声明组合包”**：请核对是否按第 1 步表格填写了带版本号的完整包名（例如 `@dsh-prism/dsh-workspace-registry@0.1.2`），并在每次安装后点击 **立即启用**。
- **五个插件都启用了，但侧栏找不到“棱镜”**：刷新一次 DSH 浏览器标签页即可。
- **在目录选择器输入路径后，页面仍停留在原目录**：再点一次 **编辑路径** 输入目标路径，确认路径栏末尾已经变成目标文件夹名后再点 **打开**。
