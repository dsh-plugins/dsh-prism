# 在一次对话中使用两个项目

本指南从新的 DeepSeek Harness 0.2.3-alpha.2 会话开始，在网页里安装五个 0.1.1 版棱镜插件，接入 OpenAI Responses 模型，再让棱镜分别读取两个项目各自的 README。

请准备支持 OpenAI Responses 协议及 `deepseek-v4.1-flash` 模型的服务地址和 API 密钥，以及 DSH 宿主可以读取的两个目录。要复现实例，可使用本仓库 `docs/examples` 下的 `harbor-books` 和 `lantern-cafe`。每个目录都有自己的 README，记录一场活动的信息。[GitHub 示例项目](https://github.com/dsh-plugins/dsh-prism/tree/main/docs/examples)

## 打开 DSH

打开你的 DSH 实例提供的登录链接。首次启动时，在预览版说明中点 **继续**。如果出现 **开始使用** 对话框，点 **关闭**。进入首页后，可从侧栏找到 **插件**、**工作区** 和账号菜单。

![DSH 首次启动时的预览版说明](../../guide/screens/zh/01-preview.png)

![尚未打开项目的 DSH 首页](../../guide/screens/zh/02-home.png)

## 安装并启用五个插件

打开 **插件 → 添加插件**。在 **包名或地址** 中填写含版本的 npm 包名，例如 `@dsh-prism/dsh-workspace-registry@0.1.1`。同一输入框也可填写压缩包在 DSH 宿主上的路径。点 **安装**，等安装完成并确认版本后点 **立即启用**。回到 **添加插件** 安装下一个包。按下表的顺序操作，先启用后续插件要用到的依赖。

![插件页右上角的添加入口](../../guide/screens/zh/03-plugins.png)

![安装对话框中的插件来源](../../guide/screens/zh/04-package-source.png)

| 顺序 | 包名 |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.1` |
| 2 | `@dsh-prism/dsh-orchestrator@0.1.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.1` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.1` |

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

在 DSH 原生对话的输入区打开模型选择器，在 **Prism Responses** 下选 **deepseek-v4.1-flash**。插件安装模式下，棱镜的对话、规划和执行三个角色跟随 DSH 选定的模型。

![DSH 的模型菜单列出 Prism Responses 及其模型](../../guide/screens/zh/model-picker.png)

![DSH 原生对话已选定供应商和模型](../../guide/screens/zh/09-default-model.png)

## 向棱镜授权两个项目

在 **设置 → 棱镜** 点 **添加项目**。填入唯一的 **项目 ID** 和 DSH 宿主上的 **项目目录** 绝对路径，可补充简短 **说明** 帮助对话代理区分项目。DSH 工作区用于打开目录。棱镜根据这里保存的项目和工具授权来派发任务。

![尚未添加项目的棱镜设置页](../../guide/screens/zh/10-prism-settings.png)

先保存 `harbor-books`，再添加并保存 `lantern-cafe`。在 **项目目录** 中分别粘贴对应工作区的绝对路径。本例使用本地节点和 `web:owner` 身份，保留 **read**、**glob** 和 **grep** 三项读取、列文件与搜索权限。核对 **已授权项目** 中的两个项目 ID。

![书店项目的目录与读取权限](../../guide/screens/zh/11-1-project-form.png)

![咖啡馆项目使用独立的 ID 和目录](../../guide/screens/zh/11-2-project-form.png)

![两个项目均已保存到棱镜](../../guide/screens/zh/12-two-projects.png)

### 给一个项目单独授权 IM 身份

在 **已授权项目** 中点 Harbor Books 的 **编辑**，展开 **高级设置**。在 **授权身份** 中每行填写一个身份。本例第一行为 `web:owner`，第二行为 `im:["telegram/demo-bot","demo-chat","demo-user"]`。其中三项占位字符串分别表示渠道、会话和用户。实际授权时请使用目标私聊的真实身份，并在该渠道通过允许列表或配对码授权私聊用户。

![书店项目的网页所有者和一条单独的演示 IM 身份](../../guide/screens/zh/12-project-im-identity.png)

点 **保存**，重新打开编辑器，确认完整 IM 身份仍在同一行。本次演示随后移除示例身份、保存，再次核对书店项目保留了网页所有者授权。

![保存并重开项目后，完整 IM 身份仍占一行](../../guide/screens/zh/12-project-im-identity-reopened.png)

![清除演示 IM 身份后，项目保留网页所有者授权](../../guide/screens/zh/12-project-im-identity-cleared.png)

### 查看消息渠道

同一设置页还有 **消息渠道**，可在停用连接时检查表单或保存草稿。消息配置指南展示全部七个渠道、Telegram 草稿重开验证及飞书扫码入口。继续下面的网页对话时，各渠道可保持停用。[消息渠道配置图解](./im.md)

## 向每个项目派发一个任务

查看消息渠道后，先切回 **已授权项目**，点 **打开棱镜**，确认输入区显示 `deepseek-v4.1-flash`，再发送下面的请求。

![棱镜对话页已选定模型](../../guide/screens/zh/13-prism-chat.png)

> 请分别为 harbor-books 和 lantern-cafe 派发任务，以项目 ID 作为任务标题。让每个执行代理读取自己项目的 README.md，核对活动开始时间、场地和现场负责人。两个项目都核实后，在这里用两行汇总各自的结果。

![输入框中的跨项目请求](../../guide/screens/zh/14-request.png)

![同一场对话中出现各项目的任务卡](../../guide/screens/zh/15-dispatched.png)

## 核对两个项目的结果

将回复与两个 README 分别对照。本例中的时间、场地与联系人各不相同。

| 项目 | 开始时间 | 场地 | 现场负责人 |
| --- | --- | --- | --- |
| Harbor Books | 18:30 | 楼上阅览室（upstairs reading room） | Mira |
| Lantern Cafe | 16:00 | 花园房间（garden room） | Kai |

![棱镜汇总两个项目各自的活动信息](../../guide/screens/zh/16-results.png)

展开某个项目的任务卡，再展开执行步骤，打开该步骤的只读会话。`read` 工具记录会显示实际读取的 README 路径和内容。对另一个项目重复操作，核对两个工作目录各不相同。关闭查看器可回到原对话。

![书店执行器读取了本项目 README，负责人为 Mira](../../guide/screens/zh/17-harbor-books-read-only-session.png)

![咖啡馆执行器读取了本项目 README，负责人为 Kai](../../guide/screens/zh/17-lantern-cafe-read-only-session.png)

![关闭会话查看器后的完成状态](../../guide/screens/zh/18-finish.png)

## 安装时提示“这个包没有声明组合包”

在 DSH 中安装 `@dsh-prism/dsh-workspace-registry@0.1.0` 可复现此错误。该压缩包缺少插件管理器所需的 DSH 组合包声明。返回 **编辑**，选择 0.1.1 版安装，待安装完成后点 **立即启用**。

![DSH 拒绝安装缺少组合包声明的 0.1.0 版插件](../../guide/screens/issues/install-0.1.0.png)

[与棱镜对话](./chat.md) · [模型与项目](../develop/models.md)
