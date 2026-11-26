# Work across two projects in DSH

This walkthrough starts with a fresh DeepSeek Harness 0.2.3-alpha.2 session. You will install the five Prism 0.1.1 plugins, connect an OpenAI Responses model, and have Prism read a different README in each project. All DSH settings below are available in the web interface.

You will need an endpoint and an API key for a provider that serves `deepseek-v4.1-flash` over OpenAI Responses. Use two folders that the DSH host can read. To reproduce the example, use the `harbor-books` and `lantern-cafe` folders under `docs/examples` in a copy of this repository. Each contains a README with a different event brief. [Sample projects on GitHub](https://github.com/dsh-plugins/dsh-prism/tree/main/docs/examples)

## Open DSH

Open the sign-in link from your DSH instance. On first launch, select **Continue** on the preview notice. If the **Get started** dialog opens, select **Close**. The sidebar gives you access to **Plugins**, **Workspaces**, and the account menu.

![First-launch preview notice](./screens/en/01-preview.png)

![Fresh DSH session with no project open](./screens/en/02-home.png)

## Install and enable the five plugins

Choose **Plugins → Add plugin**. In **Package name or address**, enter the package name with the tested version, for example `@dsh-prism/dsh-workspace-registry@0.1.1`. Use the default registry. The same field also accepts a path to the matching 0.1.1 tarball on the DSH host. Choose **Install**, wait for **Installed** and check the version. Choose **Enable now** and return to **Add plugin** for the next package. Use this order so each plugin's dependencies are available when you enable it.

![DSH Plugins page with Add plugin in the upper right](./screens/en/03-plugins.png)

![The plugin source entered in the installation dialog](./screens/en/04-package-source.png)

| Install in order | Package |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.1` |
| 2 | `@dsh-prism/dsh-orchestrator@0.1.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.1` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.1` |

While installing the messaging gateway, DSH may ask permission to run a dependency’s installation script. In this run the list contained `protobufjs@7.6.6`. Review the dependency and choose **Allow these scripts and retry** to continue. DSH saves the permission in this profile.

![DSH requests approval for the protobufjs dependency script](./screens/en/05-im-install-scripts.png)

<details>
<summary>Installation confirmation for each plugin</summary>

![Project registry installed](./screens/en/05-1-installed-dsh-workspace-registry.png)

![Orchestrator installed](./screens/en/05-2-installed-dsh-orchestrator.png)

![Mesh node installed](./screens/en/05-3-installed-dsh-mesh-node.png)

![Messaging gateway installed](./screens/en/05-4-installed-dsh-im-gateway.png)

![Web interface installed](./screens/en/05-5-installed-dsh-concierge-ui.png)

</details>

Confirm that all five plugins appear under **Installed plugins**.

![The five installed Prism plugins](./screens/en/06-all-plugins.png)

## Connect an OpenAI Responses model

From the account menu, open **Settings → Models → Add model provider**. Select **Custom model API**. The following values reproduce the example. Enter the endpoint and key you received from your own provider.

![Model providers in DSH Settings](./screens/en/models.png)

| Field | Value |
| --- | --- |
| Provider ID | `prism-responses` |
| Display name | `Prism Responses` |
| Base URL | The exact endpoint supplied by your provider (`BASE_URL` in the test environment) |
| API protocol | **OpenAI Responses** |
| API key | Your provider's key (`API_KEY` in the test environment) |
| Model ID | `deepseek-v4.1-flash` |

Choose **Add model** and enter `deepseek-v4.1-flash` in **Model ID 1**.

![Model ID 1 added to the custom provider form](./screens/en/before_private_input.png)

Enter the endpoint and key, then choose **Create provider**. The provider appears in the model list with its API key configured. Private fields are covered in both form images.

![Custom provider form set to OpenAI Responses](./screens/en/custom_provider.png)

![Saved Prism Responses provider](./screens/en/provider_saved.png)

## Open two workspaces and select the model

Beside **Workspaces**, choose **Add workspace** and select the first project's folder. To enter a path directly, choose **Edit path**, paste the absolute path, press Enter and choose **Open**. Repeat for the second folder. This example opens `harbor-books` and `lantern-cafe`.

![The folder picker positioned on Harbor Books](./screens/en/workspace-picker-harbor-books.png)

![Harbor Books opened as a DSH workspace](./screens/en/08-1-workspace.png)

![The folder picker positioned on Lantern Cafe](./screens/en/workspace-picker-lantern-cafe.png)

![Both workspaces visible in DSH](./screens/en/08-2-workspace.png)

In a DSH chat, open the model picker in the composer. Under **Prism Responses**, select **deepseek-v4.1-flash**. The installed Prism plugins use the DSH selection for the conversation, planner and executor.

![Prism Responses and its model in the native model picker](./screens/en/model-picker.png)

![The selected provider and model in the native DSH chat](./screens/en/09-default-model.png)

## Give Prism read access to both projects

Open **Settings → Prism → Add project**. Enter a unique **Project ID** and the absolute **Project folder** on the DSH host. Add a short description so the conversation agent can distinguish the projects. The DSH workspace opens the folder. This separate Prism authorization controls which project and tools an agent can use.

![Prism settings before registering any projects](./screens/en/10-prism-settings.png)

Save a record for `harbor-books` and another for `lantern-cafe`. Paste the absolute path of the matching workspace into **Project folder**. The examples use the local node and the `web:owner` identity. Keep **read**, **glob** and **grep** selected for this task. After saving, both IDs should appear under **Authorized projects**.

![Read permissions for the Harbor Books folder](./screens/en/11-1-project-form.png)

![Separate registration and folder for Lantern Cafe](./screens/en/11-2-project-form.png)

![Both project IDs saved in Prism](./screens/en/12-two-projects.png)

### Authorize a messaging identity for one project

Under **Authorized projects**, choose **Edit** on Harbor Books and open **Advanced settings**. Enter one identity per line in **Authorized identities**. In the example, the first line is `web:owner` and the second is `im:["telegram/demo-bot","demo-chat","demo-user"]`. The three placeholder strings illustrate the channel, chat and user parts of an IM identity. Use the identity for your own private chat when granting real access. The channel also needs to authorize the user through its allowlist or a pairing code.

![Harbor Books project editor with the web owner and a separate demonstration IM identity](./screens/en/12-project-im-identity.png)

Choose **Save**, then reopen the editor and check that the IM identity remains on one line. In this run, the operator removed the demonstration line, saved, and confirmed that Harbor Books retained its web-owner grant.

![The complete IM identity after saving and reopening the project](./screens/en/12-project-im-identity-reopened.png)

![The web owner grant after the demonstration IM identity was removed](./screens/en/12-project-im-identity-cleared.png)

### View messaging channels

The same settings page includes **Messaging channels**. You can inspect a channel or save a draft with the connection disabled. The separate guide shows all seven forms, the saved Telegram draft and the Feishu QR sign-in screen. For the web conversation below, leave all channels disabled. [Messaging setup with screenshots](./im.md)

## Delegate one task to each project

After viewing the messaging settings, return to **Authorized projects** and select **Open Prism**. Check that the model picker shows `deepseek-v4.1-flash`, then send this request.

![Prism conversation showing the selected model](./screens/en/13-prism-chat.png)

> Please delegate a task to each project, harbor-books and lantern-cafe. Use the project ID as each task title. Have an executor read its own README.md to verify the event time, venue and on-site coordinator. Once both projects are verified, report the results here in two lines.

![The two-project request in the composer](./screens/en/14-request.png)

![Separate task cards in the same conversation](./screens/en/15-dispatched.png)

## Verify the answers

Compare the reply with each project's README. The two folders in the sample produce different answers.

| Project | Start | Venue | Coordinator |
| --- | --- | --- | --- |
| Harbor Books | 18:30 | Upstairs reading room | Mira |
| Lantern Cafe | 16:00 | Garden room | Kai |

![Prism's reply with results from both project folders](./screens/en/16-results.png)

Expand a project’s task card and its execution step, then open the step’s read-only session. The `read` tool record shows the path to that project’s README and the lines returned. Repeat for the second project. Close the viewer to return to the conversation.

![The Harbor Books executor read the bookshop README and found Mira](./screens/en/17-harbor-books-read-only-session.png)

![The Lantern Cafe executor read the cafe README and found Kai](./screens/en/17-lantern-cafe-read-only-session.png)

![Completed conversation after closing the session viewer](./screens/en/18-finish.png)

## If DSH reports “This package declares no bundle”

DSH reproduced this error when installing `@dsh-prism/dsh-workspace-registry@0.1.0`. That tarball lacked the DSH bundle declaration needed by the plugin manager. Return to **Edit**, select the 0.1.1 package and install it, then choose **Enable now**.

![The original 0.1.0 package rejected by the DSH plugin manager](./screens/issues/install-0.1.0.png)

[Work with a conversation](./chat.md) · [Models and projects](../develop/models.md)
