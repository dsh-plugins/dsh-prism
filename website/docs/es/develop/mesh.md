# Mesh y sesiones

`dsh-mesh-node` 0.2.2 conecta dispositivos de confianza con canales de datos WebRTC cifrados. El servicio de señalización WSS coordina la conexión. Cuando hace falta un relé, TURN retransmite datos cifrados.

## Transparencia de ubicación

El coordinador usa el Subagent Provider de DSH `prism-<nodeId>` para cada nodo. L1 puede iniciar varias tareas L2 a la vez con `agent_spawn` y seleccionar sus proyectos mediante `(nodeId, projectId)`. L3 hereda el espacio de trabajo de L2. Con `room: true`, las tareas L2 autorizadas del grupo pueden intercambiar mensajes con `peer_send`.

## Conectar dos nodos

Abre **Settings → Prism/Connection** en los dos dispositivos. Introduce la misma dirección de señalización y el mismo código de conexión, y selecciona **Connect** en ambos.

### Nodos estáticos

Asigna a cada dispositivo una `nodeId`, un perfil DSH independiente y una clave Ed25519. Registra las claves públicas en el servicio de señalización y en `peers[].publicKey` de los otros dispositivos. Configura `webrtc.signalingUrl`, `webrtc.privateKeyEnv` y, si lo requiere la red, STUN o TURN en `webrtc.iceServers`. Comparte proyectos desde el nodo de ejecución con `peers[].projects`. Consulta los ejemplos y la migración coordinada en [Configuración y migración](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md).

## Virtual Facade & Copy-on-Conflict

Si se produce un conflicto de escritura, el ejecutor crea una sesión DSH desde el historial observable y actualiza el vínculo de forma atómica. La vista previa de solo lectura funciona por separado de esa sesión.

## Persistencia e inspección remota

El coordinador muestra el estado y los resultados de las tareas. Los registros completos se guardan en las sesiones DSH del dispositivo ejecutor. Para consultarlos, abre en ese dispositivo el espacio de trabajo del proyecto.

Siguiente: [Interfaces de desarrollo](/es/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
