# Schnellstart

Mit Prism müssen Sie nicht mehr zwischen Projektordnern hin- und herspringen. Sie stellen eine Anfrage in einem einzigen Chat, und Prism prüft mehrere Projekte gleichzeitig und fasst die Ergebnisse zusammen. Die bebilderte Schritt-für-Schritt-Anleitung finden Sie auf [Englisch](/guide/start) und [Chinesisch](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Plugins installieren

Öffnen Sie in DSH **Plugins → Add plugin** und installieren Sie alle sieben Pakete aus der Tabelle im selben DSH-Profil. Klicken Sie nach jedem Paket auf **Enable now**, bevor Sie das nächste installieren:

| Reihenfolge | Paket und Version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

Der Orchestrator startet, sobald Mesh aktiviert ist.

> [!TIP]
> Falls **Prism** nach dem Aktivieren aller sieben Plugins noch nicht in der Seitenleiste erscheint, laden Sie den Browser-Tab einmal neu.

### Langzeitspeicher und Ereignisauslöser {#optional-plugins}

Der Langzeitspeicher speichert Wissen und Medienanhänge. Die Auslöser unterstützen geplante Erinnerungen und externe Ereignisse.

Öffnen Sie **Settings → Prism/Memory → Remote API**. Übernehmen Sie den Wert aus `EMBEDDINGS_BASE_URL` in **BASE_URL** und den Wert aus `EMBEDDINGS_API_KEY` in **API_KEY**. Tragen Sie `BAAI/bge-large-zh-v1.5` als **MODEL_ID** ein und bestätigen Sie die Bindung. Nach der Verbindungsprüfung und Initialisierung stehen die Speicherwerkzeuge zur Verfügung. Bei späteren DSH-Starts wird die Bindung automatisch geladen.

## 2. Modell und Projektordner einrichten

1. Öffnen Sie **Settings → Models → Add model provider → Custom model API** und wählen Sie **OpenAI Responses**. Tragen Sie die Werte aus `BASE_URL` und `API_KEY` in **Base URL** und **API key** sowie `deepseek-v4.1-flash` als Modell-ID ein. Speichern Sie den Anbieter.
2. Bearbeiten Sie den Anbieter. Öffnen Sie **Customized settings → Model options** für `deepseek-v4.1-flash` und aktivieren Sie **Reasoning levels**. Stellen Sie sicher, dass der API-Wert für `high` auf `high` gesetzt ist, und speichern Sie. Wählen Sie im DSH-Chat `deepseek-v4.1-flash` und **Effort → High**. An Prism-Sitzungen übergibt der Orchestrator `0.2.1` nur den Anbieter und das Modell.
3. Fügen Sie über **Add workspace** Ihre Projektordner hinzu (z. B. `harbor-books` und `lantern-cafe`). Prism erkennt lokale DSH-Arbeitsbereiche automatisch anhand ihres Namens.
4. Wählen Sie unter **Settings → Prism/Configuration** die Modelle für **L1 Gespräch**, **L2 Planung** und **L3 Ausführung**. Verwenden Sie für dasselbe Modell auf allen Stufen dieselbe Beschreibung und denselben Prompt aus den [Modellprofilen](../../guide/model-metadata.md). Wählen Sie `gpt-6.2-sol` nur, wenn es separat in DSH verfügbar ist.

## 3. Aufgabe starten und prüfen

Öffnen Sie **Prism** in der Seitenleiste und bitten Sie darum, in beiden Projekten jeweils Startzeit, Ort und Ansprechperson aus der `README.md` zu prüfen. Prism zeigt kompakte Aufgabenkarten im Verlauf an und antwortet mit der fertigen Zusammenfassung.

Wenn Sie später nachsehen möchten, welche Dateien genau gelesen wurden, wechseln Sie oben über **DeepSeek Harness** zurück und öffnen den schreibgeschützten Verlauf im jeweiligen Arbeitsbereich.

Weiter: [Unterhaltung](/de/guide/chat) · [Messenger einrichten](/de/guide/im)
