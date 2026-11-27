# Models and workspaces

Prism separates **who picks the model** from **who resolves the workspace path**, keeping routing flexible at runtime while enforcing access boundaries in trusted host code.

## Self-describing model pools

Under **Settings → Prism/Configuration** (or `orchestrator.models` in `prism.config.json`), you can configure independent model lists for **L1** (conversation), **L2** (planning), and **L3** (execution). Any tier left unconfigured falls back to the DSH default model.

Each model entry supports:
- `id` & optional `provider`: Identifies the model and DSH provider (omitting `provider` uses the host default). Model IDs must be unique within a tier.
- `description`: A capability summary read by the parent tier via `list_models` when choosing which model to dispatch—for example, whether a model excels at fast triage, deep planning, or careful code review.
- `prompt` & `promptMode`: Customizes how the model enters its role. `"append"` (default) adds your instructions after the role prompt; `"replace"` substitutes the configured `prompt` as the full system prompt. Prompt overrides never expand host-enforced tool permissions.

**Runtime selection**:
- **L1** is chosen freely by the user in the web composer or via `/model` in IM.
- **L2 and L3** are chosen dynamically by their parent agent (`L1` picks `L2`, `L2` picks `L3`) based on each candidate's `description`.

### Source launcher configuration example

In `prism.config.json`, place the model pools inside `orchestrator`:

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Conversational intake" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planning and verification" }],
    "L3": [
      {
        "id": "deepseek-flash",
        "description": "Focused code review",
        "promptMode": "append",
        "prompt": "Cite the files you reviewed."
      }
    ]
  }
}
```

## Workspace discovery and registry governance

Prism supports two complementary ways to expose projects to L1 without leaking filesystem paths into the conversation:

1. **Automatic DSH workspace discovery**: Any folder opened in the DSH **Workspaces** sidebar is automatically discovered by `dsh-workspace-registry`. Prism uses the native workspace UUID as the internal project ID and its display name for matching user requests. Discovered workspaces default to read-only inspection tools (`read`, `glob`, `grep`) and are accessible to the DSH web owner and approved IM users.
2. **Explicit registry entries**: For fine-grained multi-user or multi-node control, entries in `registry` define `id`, `description`, `stack`, `nodeId`, `workspace`, `principals`, `permissions`, and an optional `gitRemote`. Explicit entries on the same node and path take precedence over auto-discovered defaults.

**Security boundary**: `query_projects` only returns authorized metadata (`id`, `description`, `stack`, `nodeId`) to L1. Physical directory paths are resolved exclusively inside trusted host code during dispatch, and L3's actual tool set is bounded by the intersection of the L3 ceiling, the project's `permissions`, and any narrower budget passed by L2.

Next: [Architecture and role isolation](/develop/layers) · [Mesh and sessions](/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
