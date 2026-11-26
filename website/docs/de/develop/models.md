# Modelle und Projekte

Bei der Installation über die DSH-Oberfläche übernimmt Prism das im DSH-Chat ausgewählte Modell. Projekte und ihre Berechtigungen verwalten Sie in den Prism-Einstellungen. Die folgenden JSON-Beispiele gehören zum Start aus dem Quellcode. [Schnellstart](/de/guide/start)

Das Register bestimmt zugängliche Projekte. Der Orchestrator konfiguriert Modelle und native Werkzeuge der Rollen separat.

## Modelle je Rolle

Dieser Ausschnitt gehört in `orchestrator` in `prism.config.json`. Modell-IDs müssen vom Anbieter unterstützt werden und innerhalb einer Ebene eindeutig sein.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Anfragen im Dialog klären" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planung und Prüfung" }],
    "L3": [{ "id": "deepseek-flash", "description": "Gezielte Codeprüfung", "promptMode": "append", "prompt": "Nenne die geprüften Dateien." }]
  }
}
```

## Beschreibung und Systemanweisung

`description` erklärt, wann der übergeordnete Agent dieses Modell wählen soll. `provider` wählt einen DSH-Anbieter. Ohne diesen Eintrag gilt der Standardanbieter des Hosts.

`promptMode: "append"` ergänzt die Rollen- und Modellanweisung; `"replace"` verwendet `prompt` als vollständige benutzerdefinierte Systemanweisung. Werkzeugrechte werden weiterhin vom Host geprüft.

## Projektzugriff

Ein Eintrag enthält `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` und `permissions`; `gitRemote` ist optional. L1 bekommt freigegebene Metadaten. Nur vertrauenswürdiger Hostcode löst das Verzeichnis auf. Für L3 gilt die Schnittmenge aus Werkzeugliste, Projektfreigabe und delegierten Rechten.

[Rollen und Rechte](/de/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
