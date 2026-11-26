# Mesh and sessions

A controller dispatches a bound session through `prism-<nodeId>`. The same provider contract covers local and remote work.

## Connect two nodes

Put the first `mesh` fragment on the controller and the second on the worker. Set the same random link credential in `PRISM_WORKER_TOKEN` on both machines. Register `atlas` on both sides with node ID `worker`; the worker owns the actual directory.

```json
{
  "nodeId": "hub",
  "peers": [{ "id": "worker", "url": "https://worker.example.org", "tokenEnv": "PRISM_WORKER_TOKEN" }]
}
```

```json
{
  "nodeId": "worker",
  "incoming": [{ "id": "hub", "tokenEnv": "PRISM_WORKER_TOKEN", "projects": ["atlas"] }]
}
```

Use HTTPS between devices and allow the worker’s hostname in DSH. A loopback HTTP URL is supported for local testing. Every node keeps its own `DSH_HOME`. The controller makes the outbound call and receives tool calls through that connection.

## Session activation and contention

The worker rechecks the caller, allowed project, model and tool ceiling. On a DSH writer-lock conflict the runner forks the observable source history into a fresh session, publishes the new logical binding atomically and records the source for archival. Competing publishers recheck the winning binding.

## Inspect a remote task

An authorized trace request follows the same link and reads the worker’s session without acquiring its write lock. Preserve the coordinator and worker state directories across restarts. A transport interruption is not evidence that an executing operation never ran; inspect the task before repeating a side-effecting request.

[Developer interfaces](/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
