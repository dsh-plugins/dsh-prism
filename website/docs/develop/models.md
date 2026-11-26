# Models and projects

The registry describes accessible projects. The orchestrator separately specifies the models and native tools each role may use.

## Configure a model per role

This fragment belongs inside `orchestrator` in `prism.config.json`. Supply model IDs supported by the active DSH provider. A model ID must be unique within its tier.

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
