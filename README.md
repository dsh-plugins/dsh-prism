<div align="center">

<img src="icon.svg" width="256" height="256" alt="dsh-prism icon">

# dsh-prism

**Ask DeepSeek Harness to work across projects and devices from a single chat.**

English | [简体中文](README.zh_CN.md)

</div>

## Start a local conversation

To run the application, install Node.js 24.9 or later, npm and Git. You need a Git identity with read access to all five private plugin repositories. The website and its public source can be read without signing in. Configure DeepSeek credentials in DSH or set `DEEPSEEK_API_KEY` in the environment where you start Prism. The example uses the `deepseek-official` model provider. The checkout command creates a local `runtime/` directory containing the pinned plugins, launcher, example configuration and tests. Run the application commands from that directory.

```sh
git clone https://github.com/dsh-plugins/dsh-prism.git
cd dsh-prism
node scripts/checkout.mjs
cd runtime
npm ci
npm run build
npm start
```

Open the login URL printed by DSH. The example gives the agent search and read access to the checked-out project. Try “Find where this project defines the models for each layer, and summarize the options.” The model selector beside Send shows the available conversation models and their descriptions. Choose one before sending your next message.

![Prism’s Chinese chat interface showing a request and its task card](docs/images/web-task.png)

## Follow a task

The conversation agent chooses an authorized project and a planning model. The planner splits the request into steps and chooses an execution model for each. A task card updates as they work. Expand the card and choose the read-only session action to inspect the underlying conversation. Your chat receives updates that the conversation agent explicitly sends.

## Use your own project or chat app

Inside `runtime/`, copy the example configuration, then set `registry.projects[].workspace` to the directory you want the agents to work in. Set a project ID, its node and permissions, and set `orchestrator.defaultProjectId` to an authorized project. Restart with the edited file.

```sh
cp prism.example.json prism.config.json
```

```sh
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

To use a messaging app, configure the corresponding entry under `im`. The gateway has integrations for Telegram, WeChat, Feishu/Lark, WeCom, QQ Bot, OneBot and Discord. For WeChat or Feishu, run `npm run im -- login wechat --config prism.config.json` or use `feishu` in the same command and follow the QR login. Each private chat keeps its own identity and history. The Web interface, IM commands and documentation are available in German, English, Spanish, French, Japanese, Portuguese, Russian and Simplified Chinese. [Messaging gateway](https://github.com/dsh-plugins/dsh-im-gateway)

## Explore the plugins

The following links open private source repositories for authorized contributors.

| Plugin | What it does for your conversation |
| --- | --- |
| [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) | Shows the conversation, model switcher, task cards and read-only session viewer. |
| [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry) | Lists the projects the current user can delegate to. |
| [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator) | Chooses and starts formal DSH sessions with the tools allowed for each role. |
| [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node) | Runs a delegated task on the device that holds its project. |
| [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway) | Delivers agent messages, task updates and session details to a private chat. |

## Run the documentation locally

The public documentation is built with VitePress. From the public `dsh-prism` repository root, one directory above `runtime/`, start the preview below or run `npm run docs:build --prefix website` to build the static site.

```sh
npm ci --prefix website
npm run docs:dev --prefix website
```

[Prism documentation](https://prism.dsh-plug.in/) · [Technical reference](docs/TECH.md)
