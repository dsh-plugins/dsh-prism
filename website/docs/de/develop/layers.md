# Rollen und Rechte

Jede Rolle läuft in einer regulären DSH-Sitzung hinter einem Subagent Provider. Der Host filtert Werkzeuge bei der Auflistung und beim Aufruf.

| Rolle | Aufgabe und Befugnisse |
| --- | --- |
| **L1** | Arbeitet im Standardprojekt, liest freigegebene Projektmetadaten und wählt Zielprojekt und L2-Modell. Es stehen weder Dateizugriffe noch Shell-Befehle zur Verfügung. |
| **L2** | Plant im von L1 gewählten Projekt, wählt L3-Modelle und kann deren Werkzeugrechte auf einzelne Schritte beschränken. Kommuniziert mit direkten Eltern und Kindern. |
| **L3** | Führt einen Schritt am Knoten und im Arbeitsbereich der Elternsitzung aus. Rolle, Projektrichtlinie und erteilte Freigabe begrenzen die nativen Werkzeuge. |

## Nachrichten und Abschluss

Nur `send_user` veröffentlicht eine Antwort an den Benutzer. Normaler Modelltext bleibt in der Sitzung. `send_parent` und `send_child` aktivieren den Empfänger über dessen Warteschlange. `get_progress` fragt Fortschritt ab. Ein Endzustand erzeugt das Ereignis `task_settled` für den Elternagenten.

| Rolle | Orchestrierungswerkzeuge |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Statusänderungen und Antworten werden getrennt zugestellt. L1 entscheidet nach einem Abschluss, ob eine Nachricht erforderlich ist. `list_models` liefert die Fähigkeiten der nächsttieferen Ebene.

[Modelle und Projekte](/de/develop/models) · [Mesh und Sitzungen](/de/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
