<div align="center">

<img src="icon.svg" width="256" height="256" alt="dsh-prism 图标">

# dsh-prism

**在一个对话里委托 DeepSeek Harness 跨项目、跨设备完成工作。**

[English](README.md) | 简体中文

</div>

## 在一次对话中使用两个项目

在浏览器打开 DeepSeek Harness 0.2.3-alpha.2。图文指南从空白环境开始安装，分别读取书店与咖啡馆的 README，并在 DSH 工作区会话中核对两份原文。可以用自己的项目，也可使用本仓库提供的两个示例目录。[仓库中的逐步图解](website/docs/zh/guide/start.md) · [在官网阅读](https://prism.dsh-plug.in/zh/guide/start) · [示例项目](docs/examples)

1. 在 **插件 → 添加插件** 中依次填入下表的 npm 包名和版本。每安装一个包，点 **立即启用** 后再安装下一个。
2. 在 **设置 → 模型** 中添加 **自定义模型 API**，选择 **OpenAI Responses**，填入服务地址、API 密钥和模型 ID `deepseek-v4.1-flash`，然后在 DSH 对话中选用该提供商和模型。
3. 把两个项目目录分别作为 DSH 工作区打开，棱镜会自动采用已登记的本机工作区。在 **设置 → 棱镜/配置** 中可以为对话、规划、执行分别勾选模型，编辑本层的模型介绍和提示词。
4. 在 **设置 → 棱镜/配置** 中点 **打开棱镜**，要求为两个项目各派发一个任务，读取各自 README 中的时间、地点和负责人。点 **DeepSeek Harness** 返回 DSH，在工作区侧栏查看各层的只读历史。

![棱镜逐项目汇总活动时间、地点和负责人](website/docs/guide/screens/0.1.2/zh/16-results.png)

## 五个插件

| 安装顺序 | 包名 | 用途 |
| --- | --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` | 保存项目元数据及各身份获准使用的项目。 |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` | 在持有项目目录的节点上执行任务。 |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` | 按所选模型和允许的工具运行对话、规划和执行会话。 |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` | 接入支持的即时通讯私聊通道。 |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.3` | 提供棱镜设置、对话和任务卡。 |

在 **设置 → 棱镜/IM** 点 **添加 IM**，可选择 Telegram、微信、飞书/Lark、企业微信、QQ 机器人、OneBot 或 Discord。指南实拍展示了七种表单、停用账号的保存与重开、飞书扫码授权入口和待审批列表。[消息账号配置图解](website/docs/zh/guide/im.md) · [在官网阅读](https://prism.dsh-plug.in/zh/guide/im)

源码开发者可查阅[锁定版本的检出步骤及技术参考](docs/TECH.md)。

## 在本地阅读文档

官网使用 VitePress。在公开的 `dsh-prism` 仓库根目录，运行以下命令启动本地预览，或使用 `npm run docs:build --prefix website` 构建静态站点。

```sh
npm ci --prefix website
npm run docs:dev --prefix website
```

[棱镜使用指南](https://prism.dsh-plug.in/zh/) · [技术参考](docs/TECH.md)
