# Models and projects

The registry describes accessible projects. The orchestrator separately specifies the models and native tools each role may use.

## Plugin settings in DSH

In the installed plugins, the conversation, planning and execution roles use the model selected in the DSH chat. Add a provider under **Settings → Models**, then choose its model in the native chat composer. In **Settings → Prism**, give each project a unique ID, its folder on the host and allowed tools. [Illustrated walkthrough](/guide/start)

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

## Project access

Each registry entry has an `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` and `permissions`; `gitRemote` is optional. The L1 query returns authorized metadata. Only trusted host code resolves the directory. The L3 ceiling intersects execution tools, project policy and the budget passed down during dispatch.

[Roles and permissions](/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
