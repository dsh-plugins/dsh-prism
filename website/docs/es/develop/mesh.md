# Mesh y sesiones

El coordinador delega en `prism-<nodeId>`. El contrato del proveedor es el mismo para las sesiones locales y remotas.

## Conectar dos nodos

Coloca el primer bloque `mesh` en el coordinador y el segundo en el nodo de ejecución. Define el mismo secreto aleatorio en `PRISM_WORKER_TOKEN` en ambos. Registra `atlas` con nodo `worker` en los dos registros. El nodo ejecutor resuelve el directorio real.

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

Usa HTTPS entre equipos y añade el nombre del nodo ejecutor a los hosts de confianza de DSH. HTTP en loopback sirve para pruebas locales. Cada nodo tiene su propio `DSH_HOME`. El coordinador inicia la conexión y recibe las llamadas a herramientas por ella.

## Activación y bloqueos

El nodo vuelve a comprobar identidad, proyecto, modelo y permisos. Si la sesión está bloqueada para escritura, crea un fork del historial observable, publica el nuevo enlace de forma atómica y registra el archivado de la sesión anterior. Si compiten dos procesos, se vuelve a consultar el enlace ganador.

## Inspeccionar una tarea remota

Una consulta autorizada lee la sesión por el mismo enlace sin adquirir el bloqueo de escritura. Conserva los directorios de estado al reiniciar. Tras una desconexión comprueba el estado antes de repetir una operación con efectos externos.

[Interfaces de desarrollo](/es/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
