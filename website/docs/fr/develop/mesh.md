# Mesh et sessions

`dsh-mesh-node` 0.2.2 relie des appareils de confiance via des canaux de données WebRTC chiffrés. Le service de signalisation WSS négocie la connexion. Si un relais est nécessaire, TURN transmet les données chiffrées.

## Transparence de localisation

Le coordinateur utilise le Subagent Provider DSH `prism-<nodeId>` pour chaque nœud. L1 peut lancer plusieurs tâches L2 en même temps avec `agent_spawn` et choisir leurs projets par `(nodeId, projectId)`. L3 hérite de l’espace de travail de L2. Avec `room: true`, les tâches L2 autorisées du groupe peuvent échanger des messages grâce à `peer_send`.

## Connecter deux nœuds

Ouvrez **Settings → Prism/Connection** sur les deux appareils. Saisissez la même adresse de signalisation et le même code de connexion, puis sélectionnez **Connect** sur chacun.

### Nœuds statiques

Attribuez à chaque appareil une `nodeId`, un profil DSH séparé et une clé Ed25519. Inscrivez les clés publiques auprès du service de signalisation et dans `peers[].publicKey` sur les appareils pairs. Configurez `webrtc.signalingUrl`, `webrtc.privateKeyEnv` et, selon le réseau, STUN ou TURN dans `webrtc.iceServers`. Partagez les projets via `peers[].projects` sur le nœud d’exécution. Les exemples et la migration coordonnée sont décrits dans [Configuration et migration](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md).

## Virtual Facade & Copy-on-Conflict

En cas de conflit de verrouillage, l’exécuteur crée une session DSH à partir de l’historique observable et met à jour la liaison de façon atomique. L’historique en lecture seule utilise une session séparée.

## Persistance et inspection à distance

Le coordinateur affiche l’état et les résultats des tâches. Les journaux complets restent dans les sessions DSH de l’appareil d’exécution. Pour les consulter, ouvrez l’espace de travail du projet sur cet appareil.

Suite : [Interfaces de développement](/fr/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
