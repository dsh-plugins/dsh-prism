# Mesh und Sitzungen

`dsh-mesh-node` 0.2.2 verbindet vertrauenswürdige Geräte über verschlüsselte WebRTC-DataChannels. Der WSS-Signalisierungsdienst vermittelt den Verbindungsaufbau. Bei Bedarf leitet TURN verschlüsselte Daten weiter.

## Ortstransparenz über Subagent Provider

Der Koordinator verwendet für jeden Knoten den DSH Subagent Provider `prism-<nodeId>`. L1 kann mit `agent_spawn` mehrere L2-Aufgaben gleichzeitig starten und Projekte über `(nodeId, projectId)` wählen. L3 übernimmt den Arbeitsbereich der L2-Aufgabe. Mit `room: true` können berechtigte L2-Aufgaben derselben Gruppe über `peer_send` Nachrichten austauschen.

## Zwei Knoten verbinden

Öffnen Sie auf beiden Geräten **Settings → Prism/Connection**. Geben Sie dieselbe Signalisierungsadresse und denselben Verbindungscode ein und wählen Sie jeweils **Connect**.

### Statische Knoten

Geben Sie jedem Gerät eine eigene `nodeId`, ein separates DSH-Profil und einen Ed25519-Schlüssel. Tragen Sie die öffentlichen Schlüssel beim Signalisierungsdienst und auf den jeweiligen Gegenstellen unter `peers[].publicKey` ein. Konfigurieren Sie `webrtc.signalingUrl` und `webrtc.privateKeyEnv` sowie bei Bedarf STUN oder TURN unter `webrtc.iceServers`. Geben Sie Projekte auf dem ausführenden Gerät über `peers[].projects` frei. Beispiele und Schritte für die gemeinsame Migration finden Sie unter [Konfiguration und Migration](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md).

## Virtual Facade & Copy-on-Conflict

Bei einem Konflikt mit einer Schreibsperre legt der Runner eine neue DSH-Sitzung aus dem verfügbaren Verlauf an und aktualisiert die Bindung atomar. Die getrennte, schreibgeschützte Historie beansprucht keine Schreibsperre der aktiven Sitzung.

## Persistenz und Ferninspektion

Aufgabenstatus und Ergebnisse erscheinen auf dem Koordinator. Vollständige Protokolle bleiben in den DSH-Sitzungen auf dem ausführenden Gerät. Öffnen Sie zur Prüfung dort den Arbeitsbereich des Projekts.

Weiter: [Entwicklerschnittstellen](/de/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
