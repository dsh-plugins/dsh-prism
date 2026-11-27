# Mesh y sesiones

Prism combina **despacho transparente a la ubicación** (`dsh-mesh-node`) con **recuperación Copy-on-Conflict**, de modo que la orquestación funciona igual en local o en remoto y nunca se bloquea por un candado de escritura.

## Transparencia de ubicación

Cada nodo registra un Subagent Provider `prism-<nodeId>`. El coordinador emite un ticket de un solo uso y recibe el ID de una sesión formal de DSH en el nodo destino. Como **L1 elige el espacio de L2** y **L3 hereda el espacio de L2**, todas las operaciones de archivos permanecen locales en el nodo propietario.

## Conectar dos nodos

Coloca el primer bloque `mesh` en el coordinador (`hub`) y el segundo en el ejecutor (`worker`), compartiendo el mismo secreto en `PRISM_WORKER_TOKEN` y registrando `atlas` con `nodeId: "worker"`:

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

Usa HTTPS entre máquinas (HTTP loopback solo en pruebas locales). Cada nodo conserva su propio `DSH_HOME`.

## Virtual Facade & Copy-on-Conflict

Externamente son Subagents ligeros; internamente son **sesiones formales de DSH**. Si al activar una sesión existe un conflicto de bloqueo de escritura, el ejecutor hace **Fork** inmediato del historial observable a una sesión nueva, actualiza el enlace atómicamente y marca la anterior para archivado.

## Persistencia e inspección remota

`conversations.sqlite` guarda mensajes, modelos, estados y colas, mientras DSH guarda las transcripciones completas. Las consultas de solo lectura (`trace`) viajan por el mismo enlace Mesh sin adquirir bloqueo de escritura.

Siguiente: [Interfaces de desarrollo](/es/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
