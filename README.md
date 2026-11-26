<div align="center">

<img src="icon.svg" width="256" height="256" alt="dsh-prism icon">

# dsh-prism

**Ask DeepSeek Harness to work across projects and devices from a single chat.**

English | [简体中文](README.zh_CN.md)

</div>

## Run a task across two projects

Open DeepSeek Harness 0.2.3-alpha.2 in your browser. The illustrated walkthrough starts with a fresh DSH profile and uses two folders on the same machine. You can follow it with your own projects or the two sample directories in this repository. [Illustrated guide in this repository](website/docs/guide/start.md) · [View on the documentation site](https://prism.dsh-plug.in/guide/start) · [Sample projects](docs/examples)

1. In **Plugins → Add plugin**, enter each npm package and version from the table below. Choose **Install**, then **Enable now**, in the order listed.
2. In **Settings → Models**, add a **Custom model API** provider using **OpenAI Responses**, your endpoint and API key, and the model ID `deepseek-v4.1-flash`. Select that provider and model in a DSH chat.
3. Open each project folder as a DSH workspace. In **Settings → Prism**, add its project ID, absolute folder and allowed tools. The sample only needs `read`, `glob` and `grep`.
4. Choose **Open Prism**. Ask it to delegate one task to each project and check the time, venue and coordinator in each project's README. Expand a task card and open its read-only session to inspect the work.

![Prism reports the independently verified event details for Harbor Books and Lantern Cafe](website/docs/guide/screens/en/16-results.png)

## The five plugins

| Installation order | Package | What it adds |
| --- | --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.1` | Project metadata and the permissions granted to each identity. |
| 2 | `@dsh-prism/dsh-orchestrator@0.1.1` | Conversation, planning and execution sessions that use the selected model and permitted tools. |
| 3 | `@dsh-prism/dsh-mesh-node@0.1.1` | Task execution on the node that owns the project. |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.1` | Integration with private chats on supported messaging services. |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.1` | Prism settings, the chat, task cards and a read-only session viewer. |

In **Settings → Prism → Messaging channels**, choose Telegram, WeChat, Feishu/Lark, WeCom, QQ Bot, OneBot or Discord. The guide shows each form, a Telegram draft saved while disabled, and a Feishu QR sign-in cancelled before account authorization. [Illustrated messaging guide](website/docs/guide/im.md) · [View on the documentation site](https://prism.dsh-plug.in/guide/im)

Source contributors can use the [pinned checkout and technical reference](docs/TECH.md).

## Run the documentation locally

The public documentation is built with VitePress. From the public `dsh-prism` repository root, start the preview below or run `npm run docs:build --prefix website` to build the static site.

```sh
npm ci --prefix website
npm run docs:dev --prefix website
```

[Prism documentation](https://prism.dsh-plug.in/) · [Technical reference](docs/TECH.md)
