<div align="center">

<img src="icon.svg" width="256" height="256" alt="dsh-prism icon">

# dsh-prism

**Just say what you need—Prism handles the projects and devices behind the scenes.**

English | [简体中文](README.zh_CN.md)

</div>

## What Prism does

Normally, working across multiple projects or machines means switching workspaces, tracking directories, and piecing answers together yourself. Prism hides all of that setup behind a single conversation.

You talk to Prism in the web chat or a connected messaging app, and it delegates the work to the right projects, keeps track of progress with collapsible task cards, and replies once the results are ready. Whenever you want to double-check how an answer was found, you can still open the underlying DeepSeek Harness records in read-only mode.

![Prism summarizing results from two project workspaces in one conversation](website/docs/guide/screens/0.1.2/en/16-results.png)

## Get started in four steps

You can try Prism with your own project folders or with the two sample folders (`harbor-books` and `lantern-cafe`) in [docs/examples](docs/examples). For the full step-by-step screenshots, see the [Quick start guide](website/docs/guide/start.md) or the [documentation site](https://prism.dsh-plug.in/guide/start).

1. **Install the five plugins**: In DeepSeek Harness (`0.2.3-alpha.2`), open **Plugins → Add plugin**, install each package from the table below in order, and choose **Enable now** after each one.
2. **Connect a model**: In **Settings → Models**, add a **Custom model API** provider (using **OpenAI Responses**), enter your endpoint, API key, and model ID (such as `deepseek-v4.1-flash`), then select it in chat.
3. **Add your project folders**: Open each project folder as a workspace in the DSH sidebar so Prism can find it by name. In **Settings → Prism/Configuration**, choose which models Prism can use for conversation, planning, and execution.
4. **Start chatting**: Choose **Prism** in the sidebar and ask it to check both projects at once. To see the underlying steps at any time, switch back via **DeepSeek Harness** and open the read-only history in each workspace.

## The five plugins

| Install order | Package | Role |
| --- | --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` | Keeps track of available projects and who is allowed to access them. |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` | Coordinates conversation, planning, and execution across sessions. |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` | Runs tasks on the device where each project lives. |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` | Connects Prism to private chats on supported messaging apps. |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.1` | Provides the Prism chat view, task cards, and settings pages. |

Want to message Prism from Telegram, WeChat, Feishu/Lark, WeCom, QQ, OneBot, or Discord? See the [Messaging apps guide](website/docs/guide/im.md) ([online](https://prism.dsh-plug.in/guide/im)).

Prism shares the conversation across Web and approved private chats in each DSH profile. To connect devices, set up [WebRTC Mesh](website/docs/develop/mesh.md).

### Optional memory and triggers

After enabling the five core plugins, add memory for saved knowledge and media attachments, or triggers for reminders and external events. Install the packages you need in the same DSH profile using **Plugins → Add plugin**, then choose **Enable now**. For the `web` profile, you can also use the command line.

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.3.0"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.1"
```

In **Settings → Prism/Memory**, bind a local embedding model or a remote API. Memory tools become available as soon as initialization completes, and Prism reloads the binding automatically on later DSH starts.

[Memory and trigger configuration](docs/CONFIG.md#长期记忆与事件)

## For developers and contributors

- Architecture, design principles, and source checkout instructions: [Technical reference](docs/TECH.md)
- Configuration and migration for shared conversations, memory, triggers, and WebRTC. [Configuration and migration](docs/CONFIG.md)
- Run the VitePress documentation site locally from the `dsh-prism` root:

```sh
npm ci --prefix website
npm run docs:dev --prefix website
```

[Prism documentation](https://prism.dsh-plug.in/) · [Technical reference](docs/TECH.md)
