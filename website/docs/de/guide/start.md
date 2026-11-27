# Schnellstart

Mit Prism müssen Sie nicht mehr zwischen Projektordnern hin- und herspringen. Sie stellen eine Anfrage in einem einzigen Chat, und Prism prüft mehrere Projekte gleichzeitig und fasst die Ergebnisse zusammen. Die bebilderte Schritt-für-Schritt-Anleitung finden Sie auf [Englisch](/guide/start) und [Chinesisch](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Plugins installieren

Öffnen Sie in DSH **Plugins → Add plugin** und installieren Sie die fünf Pakete aus der Tabelle nacheinander. Klicken Sie nach jedem Paket auf **Enable now**, bevor Sie das nächste installieren:

| Reihenfolge | Paket und Version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.1` |

Der Orchestrator startet, sobald Mesh aktiviert ist.

> [!TIP]
> Falls **Prism** nach dem Aktivieren aller fünf Plugins noch nicht in der Seitenleiste erscheint, laden Sie den Browser-Tab einmal neu.

### Langzeitspeicher und Ereignisauslöser (optional) {#optional-plugins}

Nach der Aktivierung der fünf Kern-Plugins können Sie diese Pakete bei Bedarf im gleichen DSH-Profil ergänzen. Der Langzeitspeicher ermöglicht gespeichertes Wissen und Medienanhänge. Die Auslöser unterstützen geplante Erinnerungen und externe Ereignisse.

Geben Sie unter **Plugins → Add plugin** den genauen Paketnamen mit Version ein und wählen Sie **Enable now**. Für das Profil `web` können Sie auch die folgenden Befehle verwenden.

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.3.0"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.1"
```

Binden Sie unter **Settings → Prism/Memory** ein lokales Embedding-Modell oder eine Remote-API. Die Speicherwerkzeuge stehen nach der Initialisierung sofort zur Verfügung. Bei späteren DSH-Starts wird die Bindung automatisch geladen.

## 2. Modell und Projektordner einrichten

1. Öffnen Sie **Settings → Models → Add model provider → Custom model API**, wählen Sie **OpenAI Responses**, tragen Sie Ihre Zugangsdaten sowie die Modell-ID `deepseek-v4.1-flash` ein und wählen Sie das Modell im DSH-Chat aus.
2. Fügen Sie über **Add workspace** Ihre Projektordner hinzu (z. B. `harbor-books` und `lantern-cafe`). Prism erkennt lokale DSH-Arbeitsbereiche automatisch anhand ihres Namens.
3. Optional können Sie unter **Settings → Prism/Configuration** für jede Stufe (**L1 Gespräch**, **L2 Planung**, **L3 Ausführung**) eigene Modelle, Beschreibungen und Hinweise festlegen.

## 3. Aufgabe starten und prüfen

Öffnen Sie **Prism** in der Seitenleiste und bitten Sie darum, in beiden Projekten jeweils Startzeit, Ort und Ansprechperson aus der `README.md` zu prüfen. Prism zeigt kompakte Aufgabenkarten im Verlauf an und antwortet mit der fertigen Zusammenfassung.

Wenn Sie später nachsehen möchten, welche Dateien genau gelesen wurden, wechseln Sie oben über **DeepSeek Harness** zurück und öffnen den schreibgeschützten Verlauf im jeweiligen Arbeitsbereich.

Weiter: [Unterhaltung](/de/guide/chat) · [Messenger einrichten](/de/guide/im)
