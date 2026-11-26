# 快速开始

先在一台机器上配置一个项目。完成首次对话后，再接入第二台设备或即时通讯账号。

## 安装并启动

准备 Git、npm 和 Node.js 24.9 或更高版本。以下命令克隆主仓库，按固定版本检出五个插件，并在本机启动服务。

主仓库和本文档公开。运行系统需要拥有五个私有插件仓库的 Git 读取权限。请先用具有相应权限的账号完成 Git 认证，再执行检出。之后在生成的 `runtime/` 目录中操作。

```sh
git clone https://github.com/dsh-plugins/dsh-prism.git
cd dsh-prism
node scripts/checkout.mjs
cd runtime
npm ci
npm run build
cp prism.example.json prism.config.json
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

## 配置模型凭据和项目

示例使用 DSH 的 `deepseek-official` 提供方。先在 DSH 中配置有效凭据，或给宿主进程设置 `DEEPSEEK_API_KEY`。将 `registry.projects[].workspace` 改为实际项目目录，本地相对路径从配置文件所在目录解析。

`orchestrator.defaultProjectId` 必须对应网页所有者有权访问的项目。示例只授予读取和搜索工具。修改 JSON 后重启宿主。

## 第一次对话

打开 DSH 在终端打印的登录链接，浏览器交换 Cookie 后进入 `/prism`。先询问可用项目，再交付具体任务。若消息显示处理失败，核对模型凭据、模型 ID 和默认项目授权。

[与棱镜对话](/zh/guide/chat) · [模型与项目](/zh/develop/models)
