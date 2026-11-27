# Rollen und Rechte

Prisms Architektur folgt einem Leitgedanken: **Alle Infrastruktur-Komplexität vor dem Nutzer verbergen und im Inneren strenge Grenzen für hohe Autonomie und Ausfallsicherheit setzen.**

Fünf Plugins (`dsh-concierge-ui`, `dsh-workspace-registry`, `dsh-orchestrator`, `dsh-mesh-node`, `dsh-im-gateway`) arbeiten über drei strikt isolierte Agenten-Ebenen zusammen.

## Sechs Designprinzipien

1. **Zero-Workspace UX**: Nutzer wollen ein Ergebnis, keine Pfade oder Hostnamen. Web und Messenger zeigen nur einen Chatverlauf, klappbare Aufgabenkarten und einen schreibgeschützten Trace-Link.
2. **Strict Isolation**: Je näher am Nutzer, desto enger die Rechte. **L1** besitzt keinerlei Datei- oder Shell-Werkzeuge – das schützt vor Prompt-Injection aus dem Chat und hält Code sowie Logs vom Routing-Kontext fern.
3. **Silent-by-Default Actor**: Normale Textausgaben von L1 bleiben interne Überlegungen. Sichtbare Antworten an Nutzer laufen ausschließlich über `send_user`; Ebenen kommunizieren asynchron über persistente Warteschlangen.
4. **Self-Describing Routing**: Jede Ebene pflegt einen eigenen Modellpool mit Fähigkeitsbeschreibung (`description`) und optionaler Prompt-Anpassung. L1 und L2 wählen zur Laufzeit per `list_models` das jeweils passende Modell.
5. **Location Transparency**: `dsh-mesh-node` kapselt entfernte DSH-Instanzen als einheitlichen `prism-<nodeId>` Subagent Provider. Da L3 stets den Arbeitsbereich von L2 erbt, bleiben Dateioperationen lokal auf dem Zielknoten.
6. **Virtual Facade & Copy-on-Conflict**: Nach außen wirken alle Ebenen wie schlanke Subagents, laufen intern aber als vollwertige DSH-Sitzungen. Bei Schreibsperren-Konflikten wird sofort eine neue Sitzung geforkt, atomar umgebunden und die alte archiviert.

## Drei Ebenen und ihre Grenzen

| Rolle | Arbeitsbereich | Aufgabe und Befugnisse |
| --- | --- | --- |
| **L1** | Konfiguriertes Standardprojekt | Nimmt Anfragen entgegen, liest autorisierte Projekt-Metadaten über `dsh-workspace-registry`, wählt Zielprojekt und L2-Modell. **Keine Datei- oder Terminal-Tools.** |
| **L2** | Zielprojekt von L1 | Plant im Projekt, wählt L3-Modelle dynamisch aus, vergibt Einzelschritte und kann Werkzeugbudgets weiter einschränken. |
| **L3** | **Erbt zwingend** Knoten und Arbeitsbereich von L2 | Führt Schritte lokal aus. Verfügbare Tools sind die Schnittmenge aus L3-Rolle, Projekt-Policy und L2-Budget. |

## Nachrichten und Abschlussereignisse

- `send_user`: Einziger Weg für L1, eine sichtbare Antwort zu veröffentlichen.
- `send_parent` / `send_child`: Wecken Empfänger asynchron über deren persistente Warteschlange.
- `report_progress` / `get_progress` & `task_settled`: Zwischenstände werden gemeldet und geprüft; bei Abschluss eines Teilauftrags geht ein `task_settled`-Ereignis an den übergeordneten Agenten.

| Rolle | Orchestrierungswerkzeuge |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Weiter: [Modelle und Projekte](/de/develop/models) · [Mesh und Sitzungen](/de/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
