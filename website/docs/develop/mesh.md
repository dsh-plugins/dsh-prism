# Mesh and session resilience

Prism's distributed runtime combines **location-transparent dispatch** (`dsh-mesh-node`) with **Copy-on-Conflict session recovery** so orchestration logic stays identical across local and remote nodes and never deadlocks on a session write lock.

## Location transparency via Subagent Providers

Every node registers a standard `prism-<nodeId>` Subagent Provider. To the orchestrator, dispatching a task to another machine uses the exact same contract as spawning a local session:

1. The coordinator issues a one-time dispatch credential and calls `prism-<nodeId>`, receiving back the ID of a formal DSH session on the target node.
2. Because **L1 picks L2's workspace** and **L3 must inherit L2's workspace**, all high-frequency file reads, searches, and edits stay local to the node that owns the project directory. Only lightweight control signals, progress updates, and summaries cross the network.
3. On arrival, the worker node independently re-verifies the caller, allowed project, model, and tool ceiling against its own registry and policies before starting execution.

## Connecting two nodes

Place the `mesh` configuration below on the coordinator (`hub`) and worker (`worker`). Set the same random shared secret in `PRISM_WORKER_TOKEN` on both hosts, and register project `atlas` on both sides with `nodeId: "worker"` (only the worker resolves the physical directory).

**Coordinator (`hub`)**:

```json
{
  "nodeId": "hub",
  "peers": [{ "id": "worker", "url": "https://worker.example.org", "tokenEnv": "PRISM_WORKER_TOKEN" }]
}
```

**Worker (`worker`)**:

```json
{
  "nodeId": "worker",
  "incoming": [{ "id": "hub", "tokenEnv": "PRISM_WORKER_TOKEN", "projects": ["atlas"] }]
}
```

Use HTTPS between separate machines and add the worker's hostname to DSH's trusted hosts (loopback HTTP is permitted for local testing). Each node keeps its own `DSH_HOME`—nodes never need to share SQLite databases or project filesystems. The coordinator initiates the outbound connection and receives tool callbacks over that link.

## Virtual Facade & Copy-on-Conflict

Externally, every tier exposes a lightweight Subagent interface; internally, every tier runs inside a **formal DSH session**, giving Prism native persistence, resume-on-restart, and read-only inspection out of the box.

To prevent lock contention from stalling an active workflow, Prism decouples **logical agent identity** from **physical DSH session ID**:

1. When activating a bound session hits a DSH write-lock conflict, the runner neither blocks indefinitely nor steals the lock.
2. Instead, it immediately **forks** the observable history of the locked source session into a fresh physical DSH session.
3. It atomically updates the logical binding to the new session and records the previous session for archival (competing publishers re-check the winning binding).

## Durability and remote inspection

- **State persistence**: User messages, model selections, task states, and pending actor messages live in `conversations.sqlite`, while full execution transcripts live in native DSH session logs. Preserve both the coordinator and worker state directories across restarts.
- **Crash recovery**: Unstarted turns resume automatically on restart; tasks that lost their runner mid-flight are marked failed so an operator can inspect side effects before retrying.
- **Read-only remote trace**: Authorized trace requests follow the same Mesh link and read the worker's session log without acquiring a write lock. If a transport drop interrupts a side-effecting request, always inspect the task trace before re-issuing it.

Next: [Developer interfaces](/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
