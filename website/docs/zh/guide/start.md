# 在一次对话中使用两个项目

在 DeepSeek Harness 0.2.3-alpha.2 的网页中安装下表列出的五个插件并接入 OpenAI Responses 模型后，可以让棱镜分别读取两个工作区的 README。截图来自 0.1.1 版演示，展示的是当时的插件版本和设置界面。

请准备支持 OpenAI Responses 协议及 `deepseek-v4.1-flash` 模型的服务地址和 API 密钥，以及 DSH 宿主可以读取的两个目录。要复现实例，可使用本仓库 `docs/examples` 下的 `harbor-books` 和 `lantern-cafe`。每个目录都有自己的 README，记录一场活动的信息。[GitHub 示例项目](https://github.com/dsh-plugins/dsh-prism/tree/main/docs/examples)

## 打开 DSH

打开你的 DSH 实例提供的登录链接。首次启动时，在预览版说明中点 **继续**。如果出现 **开始使用** 对话框，点 **关闭**。进入首页后，可从侧栏找到 **插件**、**工作区** 和账号菜单。

![DSH 首次启动时的预览版说明](../../guide/screens/zh/01-preview.png)

![尚未打开项目的 DSH 首页](../../guide/screens/zh/02-home.png)

## 安装并启用五个插件

打开 **插件 → 添加插件**。在 **包名或地址** 中填写下表指定版本的 npm 包名，例如 `@dsh-prism/dsh-workspace-registry@0.1.2`。也可填写对应压缩包在 DSH 宿主上的路径。点 **安装**，确认安装的版本后点 **立即启用**，按下表顺序安装各插件。

![插件页右上角的添加入口](../../guide/screens/zh/03-plugins.png)

![安装对话框中的插件来源](../../guide/screens/zh/04-package-source.png)

| 顺序 | 包名 |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.2` |

安装消息网关时，DSH 可能要求确认依赖的安装脚本。本次列出的依赖为 `protobufjs@7.6.6`。核对脚本后点 **允许这些脚本并重试**，继续安装。该许可会保存在当前 DSH 配置档中。

![DSH 要求确认 protobufjs 依赖的安装脚本](../../guide/screens/zh/05-im-install-scripts.png)

<details>
<summary>查看五个插件逐个安装成功的界面</summary>

![项目注册表安装完成](../../guide/screens/zh/05-1-installed-dsh-workspace-registry.png)

![编排器安装完成](../../guide/screens/zh/05-2-installed-dsh-orchestrator.png)

![Mesh 节点安装完成](../../guide/screens/zh/05-3-installed-dsh-mesh-node.png)

![消息网关安装完成](../../guide/screens/zh/05-4-installed-dsh-im-gateway.png)

![网页对话插件安装完成](../../guide/screens/zh/05-5-installed-dsh-concierge-ui.png)

</details>

在 **已安装插件** 下确认五个插件均已列出。

![DSH 中已安装的五个棱镜插件](../../guide/screens/zh/06-all-plugins.png)

## 接入 OpenAI Responses 模型

打开账号菜单，进入 **设置 → 模型 → 添加模型提供商**，选择 **自定义模型 API**。下表给出示例使用的设置，服务地址和密钥请填自己的实际值。

![DSH 模型设置中的提供商列表](../../guide/screens/zh/models.png)

| 字段 | 填写内容 |
| --- | --- |
| Provider ID | `prism-responses` |
| 显示名称 | `Prism Responses` |
| API 地址 | 服务提供商给出的完整地址，即测试环境中的 `BASE_URL` 值 |
| API 协议 | **OpenAI Responses** |
| API 密钥 | 服务提供商的密钥，即测试环境中的 `API_KEY` 值 |
| 模型 ID | `deepseek-v4.1-flash` |

点 **添加模型**，在出现的 **模型 ID 1** 中填入 `deepseek-v4.1-flash`。

![在自定义提供商中添加了模型 ID 1](../../guide/screens/zh/before_private_input.png)

输入服务地址和密钥，然后点 **创建提供商**。回到列表，确认 `Prism Responses` 已创建并显示已配置 API 密钥。两张表单截图均已遮盖私密字段。

![自定义提供商已选 OpenAI Responses 协议](../../guide/screens/zh/custom_provider.png)

![已配置密钥的 Prism Responses 提供商](../../guide/screens/zh/provider_saved.png)

## 打开两个工作区并选用模型

在侧栏 **工作区** 旁点 **添加工作区**，选中第一个项目目录。也可在目录选择器中点 **编辑路径**，粘贴绝对路径，按回车后点 **打开**。重复一次打开第二个项目。本例中两个目录分别是 `harbor-books` 和 `lantern-cafe`。

![在目录选择器中选中书店项目](../../guide/screens/zh/workspace-picker-harbor-books.png)

![打开 Harbor Books 工作区](../../guide/screens/zh/08-1-workspace.png)

![在目录选择器中选中咖啡馆项目](../../guide/screens/zh/workspace-picker-lantern-cafe.png)

![两个目录已出现在 DSH 工作区列表](../../guide/screens/zh/08-2-workspace.png)

在 DSH 对话的输入区打开模型选择器，在 **Prism Responses** 下选 **deepseek-v4.1-flash**。未单独配置模型的层使用 DSH 默认模型。需要分别设置对话、规划和执行各层可用的模型时，打开 **设置 → 棱镜/配置**。

![DSH 的模型菜单列出 Prism Responses 及其模型](../../guide/screens/zh/model-picker.png)

![DSH 原生对话已选定供应商和模型](../../guide/screens/zh/09-default-model.png)

## 在棱镜中使用已登记的工作区

棱镜会自动发现 DSH 已登记的本机工作区。发送请求时可以直接使用工作区名称。本例让棱镜分别读取并核对两个工作区的 README。

<details>
<summary>0.1.1 版的项目登记及 IM 身份截图</summary>

旧版演示填写了两个项目的 ID 和绝对目录，并授予读取、列文件及搜索权限。操作者还保存并移除了用于演示的 IM 身份，以核对重新打开编辑器后记录是否完整。

![尚未添加项目的棱镜设置页](../../guide/screens/zh/10-prism-settings.png)

![书店项目的目录与读取权限](../../guide/screens/zh/11-1-project-form.png)

![咖啡馆项目使用独立的 ID 和目录](../../guide/screens/zh/11-2-project-form.png)

![两个项目均已保存到棱镜](../../guide/screens/zh/12-two-projects.png)

![书店项目的网页所有者和一条单独的演示 IM 身份](../../guide/screens/zh/12-project-im-identity.png)

![保存并重开项目后，完整 IM 身份仍占一行](../../guide/screens/zh/12-project-im-identity-reopened.png)

![清除演示 IM 身份后，项目保留网页所有者授权](../../guide/screens/zh/12-project-im-identity-cleared.png)

</details>

### 查看消息渠道

打开 **设置 → 棱镜/IM**，点 **添加 IM** 后选择账号类型。执行下面的网页对话示例时，各渠道可保持停用。[旧版消息渠道图解](./im.md)

## 向每个项目派发一个任务

首次进入时，点 DSH 侧栏中的 **棱镜**，或在 **设置 → 棱镜/配置** 点 **打开棱镜**。成功打开后，在同一浏览器再次访问 DSH 首页地址会直接进入棱镜。确认输入区显示 `deepseek-v4.1-flash`，再发送下面的请求。

![棱镜对话页已选定模型](../../guide/screens/zh/13-prism-chat.png)

> 请分别为 harbor-books 和 lantern-cafe 派发任务，以工作区名称作为任务标题。让每个执行代理读取自己工作区的 README.md，核对活动开始时间、场地和现场负责人。两个工作区都核实后，在这里用两行汇总各自的结果。

![输入框中的跨项目请求](../../guide/screens/zh/14-request.png)

![同一场对话中出现各项目的任务卡](../../guide/screens/zh/15-dispatched.png)

## 核对两个项目的结果

将回复与两个 README 分别对照。本例中的时间、场地与联系人各不相同。

| 项目 | 开始时间 | 场地 | 现场负责人 |
| --- | --- | --- | --- |
| Harbor Books | 18:30 | 楼上阅览室（upstairs reading room） | Mira |
| Lantern Cafe | 16:00 | 花园房间（garden room） | Kai |

![棱镜汇总两个项目各自的活动信息](../../guide/screens/zh/16-results.png)

点 **DeepSeek Harness** 返回 DSH。在 **工作区** 侧栏打开对话（**棱镜**）、规划（**棱镜 L2**）和执行（**棱镜 L3**）的只读历史。对照两个项目的执行记录，核对 `read` 工具读取的 README 路径与返回内容。

<details>
<summary>0.1.1 版的执行记录截图</summary>

![书店执行器读取了本项目 README，负责人为 Mira](../../guide/screens/zh/17-harbor-books-read-only-session.png)

![咖啡馆执行器读取了本项目 README，负责人为 Kai](../../guide/screens/zh/17-lantern-cafe-read-only-session.png)

![关闭会话查看器后的完成状态](../../guide/screens/zh/18-finish.png)

</details>

## 安装时提示“这个包没有声明组合包”

在 DSH 中安装 `@dsh-prism/dsh-workspace-registry@0.1.0` 曾出现此错误。该压缩包缺少插件管理器所需的 DSH 组合包声明。返回 **编辑**，填写本指南安装清单中的版本，安装后点 **立即启用**。

![DSH 拒绝安装缺少组合包声明的 0.1.0 版插件](../../guide/screens/issues/install-0.1.0.png)

[与棱镜对话](./chat.md) · [模型与项目](../develop/models.md)
