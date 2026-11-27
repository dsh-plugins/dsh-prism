# Mesh e sessões

O Prism 0.2.0 conecta dispositivos confiáveis por canais de dados WebRTC criptografados. O serviço de sinalização WSS coordena a conexão. Quando é preciso usar um retransmissor, o TURN encaminha dados criptografados.

## Transparência de localização

O coordenador usa o Subagent Provider do DSH `prism-<nodeId>` para cada nó. L1 pode iniciar várias tarefas L2 em um lote com `agent_spawn` e identificar os projetos por `(nodeId, projectId)`. L3 herda o espaço de trabalho de L2. Com `room: true`, as tarefas L2 autorizadas no lote podem trocar mensagens com `peer_send`.

## Conectar dois nós

Configure uma `nodeId`, um perfil DSH independente e uma chave Ed25519 para cada dispositivo. Cadastre as chaves públicas no serviço de sinalização e em `peers[].publicKey` dos outros dispositivos. Configure `webrtc.signalingUrl`, `webrtc.privateKeyEnv` e, conforme a rede, STUN ou TURN em `webrtc.iceServers`. Compartilhe projetos no nó executor por `peers[].projects`. Veja os exemplos e a migração coordenada em [Configuração e migração](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md).

## Virtual Facade & Copy-on-Conflict

Em caso de conflito de gravação, o executor cria uma sessão DSH com base no histórico disponível e atualiza o vínculo de forma atômica. O histórico somente leitura fica em uma sessão separada.

## Persistência e inspeção remota

O coordenador exibe o estado e os resultados das tarefas. Os registros completos ficam nas sessões DSH do dispositivo executor. Para consultá-los, abra o espaço de trabalho do projeto nesse dispositivo.

Próximo: [Interfaces de desenvolvimento](/pt/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
