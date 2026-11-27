# Models and workspaces

## Choose models for each layer in DSH

Add a provider under **Settings → Models** and choose the default model in a native DSH chat. Open **Settings → Prism/Configuration** to select models separately for conversation (L1), planning (L2) and execution (L3). A layer with no model selected follows the DSH default. The edit button beside each model saves its description and prompt for that layer. [Step-by-step model configuration](../guide/start.md)

## Discover local workspaces

Add project folders in the DSH workspace sidebar. Prism uses each native workspace UUID as its internal project ID and the workspace display name to identify it in a request. A discovered workspace provides `read`, `glob` and `grep`. The DSH web owner and private conversations authorized by the messaging gateway can query these workspaces. An explicitly configured project on the same node and path keeps its own permissions. [Messaging account approval](../guide/im.md)

## Configure a model per role in the source launcher

For deployments built with the source launcher, this fragment belongs inside `orchestrator` in `prism.config.json`. Supply model IDs supported by the active DSH provider. A model ID must be unique within its tier.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Conversational intake" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planning and verification" }],
    "L3": [{ "id": "deepseek-flash", "description": "Focused code review", "promptMode": "append", "prompt": "Cite the files you reviewed." }]
  }
}
```

## Description and system prompt

`description` is the capability summary used for routing. Include the situations in which a parent should choose that model. `provider` selects a provider explicitly; an omitted value uses the host’s current default model provider.

`promptMode: "append"` adds the role and model instructions to the system prompt. `"replace"` uses the configured `prompt` as the complete custom system prompt. Changing the prompt does not expand the host-enforced tools.

## Access for explicitly configured projects

Each registry entry has an `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` and `permissions`; `gitRemote` is optional. The L1 query returns authorized metadata. Only trusted host code resolves the directory. The L3 ceiling intersects execution tools, project policy and the budget passed down during dispatch.

[Roles and permissions](/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
