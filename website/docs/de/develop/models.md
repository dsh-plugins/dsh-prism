# Modelle und Projekte

Prism trennt **Modellwahl** und **Pfadauflösung** strikt voneinander: Übergeordnete Agenten wählen Modelle dynamisch anhand ihrer Beschreibung, während Dateipfade ausschließlich im vertrauenswürdigen Host-Code aufgelöst werden.

## Selbstbeschreibende Modellpools

Unter **Settings → Prism/Configuration** (oder `orchestrator.models` in `prism.config.json`) erhält jede Ebene (**L1**, **L2**, **L3**) eine eigene Modellliste. Bleibt eine Ebene leer, greift das DSH-Standardmodell.

- `id` & optional `provider`: Modellkennung und DSH-Anbieter (ohne `provider` gilt der Host-Standard).
- `description`: Fähigkeitsprofil für `list_models`, damit L1/L2 zur Laufzeit das passende Modell auswählen können.
- `prompt` & `promptMode`: `"append"` (Standard) ergänzt den Rollen-Prompt; `"replace"` ersetzt ihn vollständig. Werkzeugrechte werden dadurch nie erweitert.

Während Nutzer das **L1**-Modell frei wechseln, wählen übergeordnete Agenten **L2** und **L3** dynamisch aus.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Anfragen klären und verteilen" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planung und Gegenprüfung" }],
    "L3": [{ "id": "deepseek-flash", "description": "Gezielte Code-Prüfung", "promptMode": "append", "prompt": "Geprüfte Dateien angeben." }]
  }
}
```

## Arbeitsbereich-Erkennung und Registry

1. **Automatische DSH-Erkennung**: Jeder in der DSH-Seitenleiste geöffnete Ordner wird automatisch mit seiner nativen UUID als Projekt-ID und seinem Anzeigenamen erfasst (Standardrechte: `read`, `glob`, `grep` für DSH-Eigentümer und freigegebene Messenger-Nutzer).
2. **Explizite Registry-Einträge**: Einträge in `registry` (`id`, `description`, `stack`, `nodeId`, `workspace`, `principals`, `permissions`, optional `gitRemote`) überschreiben Standardwerte für denselben Knoten und Pfad.

`query_projects` liefert an L1 ausschließlich autorisierte Metadaten; physische Pfade werden erst bei der Ausführung im Host-Code aufgelöst.

Weiter: [Rollen und Rechte](/de/develop/layers) · [Mesh und Sitzungen](/de/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
