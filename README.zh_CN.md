<div align="center">

<img src="icon.svg" width="256" height="256" alt="dsh-prism 图标">

# dsh-prism

**只管提出需求，跨项目与跨设备的协作交给棱镜。**

[English](README.md) | 简体中文

</div>

## 棱镜能帮你做什么

平时同时处理多个项目或跨设备干活时，往往要来回切换工作区、记住目录在哪台机器上，再手动把结果拼在一起。棱镜把这些繁琐细节藏在背后，只留给你一个干净的聊天窗口。

你可以在网页端或常用的即时通讯软件里直接用自然语言提需求：棱镜会自动把任务分派到对应的项目里去执行，用可折叠的任务卡片展示进度，并在完成后把汇总结果发给你。如果想知道某个结论是怎么查出来的，随时点开任务记录或回到 DeepSeek Harness，就能以只读方式查看完整过程。

![棱镜在一次对话中汇总两个项目的核查结果](website/docs/guide/screens/0.1.2/zh/16-results.png)

## 四步快速上手

你可以直接使用自己的项目目录，也可以用仓库自带的两个示例目录（`harbor-books` 和 `lantern-cafe`，见 [docs/examples](docs/examples)）体验完整流程。详细图文步骤见[快速开始指南](website/docs/zh/guide/start.md)或[官网文档](https://prism.dsh-plug.in/zh/guide/start)。

1. **按顺序安装五个插件**：在 DeepSeek Harness（`0.2.3-alpha.2`）中打开 **插件 → 添加插件**，按下面表格的顺序逐个安装并点击 **立即启用**。
2. **接入模型**：在 **设置 → 模型** 中添加 **自定义模型 API**（选择 **OpenAI Responses**），填入服务地址、API 密钥和模型 ID（例如 `deepseek-v4.1-flash`），然后在对话中选中它。
3. **添加项目目录**：把需要协作的项目目录逐个添加到 DSH 侧栏的 **工作区**，棱镜会自动识别它们。你也可以在 **设置 → 棱镜/配置** 中为不同环节挑选模型。
4. **开始对话**：点击 **打开棱镜**（或侧栏的 **棱镜**），用一句话同时向多个项目派发任务。如果想核对底层执行细节，点顶部的 **DeepSeek Harness** 即可回到工作区侧栏查看只读记录。

## 五个插件

| 安装顺序 | 包名及版本 | 负责什么 |
| --- | --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` | 管理可用的项目信息与访问授权。 |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` | 负责对话理解、任务拆解与跨会话协调。 |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` | 在项目所在的设备上实际运行任务。 |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` | 连接 Telegram、微信、飞书等即时通讯私聊入口。 |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.0` | 提供棱镜对话界面、任务状态卡与配置页面。 |

想在微信、飞书/Lark、Telegram、企业微信、QQ、OneBot 或 Discord 里直接找棱镜办事？请查看[接入即时通讯指南](website/docs/zh/guide/im.md)（[官网阅读](https://prism.dsh-plug.in/zh/guide/im)）。

棱镜 0.2.0 在每个 DSH 配置档中为 Web 和已获批的私聊共享会话。跨设备执行请配置 [WebRTC Mesh](website/docs/zh/develop/mesh.md)。

### 可选安装长期记忆和事件触发器

启用五个核心插件后，可在同一个 DSH 配置档中按需加装长期记忆和事件触发器。长期记忆支持资料保存和媒体附件，事件触发器支持定时提醒与外部事件。在 **插件 → 添加插件** 中输入完整包名和版本，安装后选择 **立即启用**。也可以通过命令行安装到 `web` 配置档。

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.2.0"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.0"
```

[长期记忆与事件触发器配置](docs/CONFIG.md#长期记忆与事件)

## 开发者与贡献者

- 架构设计原则、技术路线与源码检出方式：[技术参考](docs/TECH.md)
- 共享会话、长期记忆、事件和 WebRTC 的配置及切换步骤见[配置与迁移](docs/CONFIG.md)。
- 在 `dsh-prism` 根目录本地预览官网文档：

```sh
npm ci --prefix website
npm run docs:dev --prefix website
```

[棱镜官网](https://prism.dsh-plug.in/zh/) · [技术参考](docs/TECH.md)
