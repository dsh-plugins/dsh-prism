# Mesh and session resilience

Prism 0.2.0 connects trusted devices using encrypted WebRTC DataChannels. A WSS signaling service exchanges connection metadata. Tasks, progress, project indexes, and Room messages flow over the peer channels. When the network requires a relay, TURN forwards encrypted traffic.

The orchestrator dispatches local and remote tasks through the same DSH Subagent Provider interface. File operations run on the device that owns the selected project.

## Location transparency via Subagent Providers

The orchestrator registers a `prism-<nodeId>` provider for each node:

1. L1 can dispatch several L2 tasks in one batch with `agent_spawn`. Each task identifies its project by `(nodeId, projectId)`. The target provider creates or resumes a native DSH session.
2. An L3 task inherits the L2 workspace. The worker checks the peer's project exports, user authorization, model and tool permissions, and delegation depth against its local policy.
3. Set `room: true` to let the authorized L2 tasks in that batch exchange messages using `peer_send`. Participating devices must register each other's public keys. A receiving task gets the message through its persisted inbox.

## Connecting two nodes

1. Give each device a unique `nodeId` and its own Ed25519 key. Register each public key with the signaling service and with the other device under `peers[].publicKey`.
2. Set `webrtc.signalingUrl` to the same reachable `wss://` endpoint on both devices. Use `webrtc.privateKeyEnv` for each device's PKCS#8 PEM private key. Add STUN or TURN to `webrtc.iceServers` as required by the network.
3. Register `atlas` on the worker with its local absolute path and permissions. On the worker, grant the coordinator access by adding `atlas` to `peers[].projects` for that peer. The coordinator discovers the exported project metadata through Mesh.

Each node keeps a separate DSH profile. For the full settings example and coordinated migration from the old Mesh protocol, see [Configuration and migration](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md).

## Virtual Facade & Copy-on-Conflict

Each tier runs in a native DSH session. For eligible local sessions, Prism publishes a separate read-only history in the corresponding DSH workspace.

To prevent lock contention from stalling an active workflow, Prism decouples **logical agent identity** from **physical DSH session ID**:

1. When activating a bound session hits a DSH write-lock conflict, the runner neither blocks indefinitely nor steals the lock.
2. Instead, it immediately **forks** the observable history of the locked source session into a fresh physical DSH session.
3. It atomically updates the logical binding to the new session. Publishing read-only history does not acquire the active session's write lock.

## Durability and remote inspection

- **State persistence**: User messages, model selections, task states, and pending actor messages live in `conversations.sqlite`, while full execution transcripts live in native DSH session logs. Preserve both the coordinator and worker state directories across restarts.
- **Crash recovery**: Unstarted turns resume automatically on restart; tasks that lost their runner mid-flight are marked failed so an operator can inspect side effects before retrying.
- **Remote history**: The coordinator shows task status and results. To review full session history for a remote task, open its workspace on the execution node. If a connection drops during an operation that can change data, check for existing effects before retrying.

Next: [Developer interfaces](/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
