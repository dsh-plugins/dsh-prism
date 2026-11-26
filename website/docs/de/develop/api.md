# Entwicklerschnittstellen

Der Browser nutzt authentifizierte HTTP-Routen. Host-Erweiterungen verwenden den Cordis-Dienst mit denselben Eigentumsprüfungen.

## Web-HTTP

Verwenden Sie das DSH-Anmeldecookie. Schreibzugriffe senden JSON und `X-Prism-Request: 1`. Der Server ermittelt den Eigentümer aus der authentifizierten Identität.

| Schnittstelle | Funktion |
| --- | --- |
| `GET /prism/api/view` | Öffentliche Unterhaltung und erlaubte L1-Modelle. |
| `GET /prism/api/events` | SSE-Schnappschüsse der Nachrichten und Aufgaben. |
| `POST /prism/api/message` | `text` und stabile `requestId` einreichen. |
| `POST /prism/api/model` | Erlaubte L1-`modelId` wählen. |
| `GET /prism/api/trace?task=…` | Verlauf einer eigenen Aufgabe lesen. |

Vergeben Sie eine stabile `requestId` pro Nachricht und nutzen Sie sie nach unklarer Bestätigung erneut. SSE liefert beim Wiederverbinden einen aktuellen Schnappschuss. Laden Sie den Verlauf erst beim Öffnen der Aufgabe.

## Cordis-Dienst

| Schnittstelle | Funktion |
| --- | --- |
| `ctx.prism.view(owner)` | Öffentlichen Zustand lesen. |
| `ctx.prism.message(owner, text, requestId?)` | Benutzernachricht in die Warteschlange stellen. |
| `ctx.prism.selectModel(owner, modelId)` | Folgendes Gesprächsmodell ändern. |
| `ctx.prism.trace(owner, taskId)` | Verlauf einer eigenen Aufgabe abrufen. |
| `ctx.prism.subscribe(owner, listener)` | Aktualisierungen abonnieren; Rückgabefunktion beendet das Abonnement. |

Leiten Sie `owner` aus dem authentifizierten Kanal ab. Registerabfragen liefern öffentliche Metadaten. Vertrauenswürdiger Hostcode erhält Pfade mit `ctx.prismRegistry.resolve`.

## Messenger-Adapter

Ein `ImTransport` benötigt eine stabile Kanal- und Bot-Kennung, Zielautorisierung sowie `send` und `edit`. Bestätigen Sie ein Ereignis nach erfolgreichem `ImGateway.receive`. Bei Wiederholungen bleibt die Ereignis-ID gleich. Zustellung und lokale Quittierung erfolgen getrennt.

[Messenger einrichten](/de/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
