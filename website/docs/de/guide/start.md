# Schnellstart

Mit zwei Projektordnern auf demselben Rechner können Sie Prism eine Aufgabe pro Projekt geben. Die bebilderte Anleitung zeigt den gesamten Ablauf mit DeepSeek Harness 0.2.3-alpha.2. [Anleitung auf Englisch](/guide/start) · [Anleitung auf Chinesisch](/zh/guide/start)

1. Öffnen Sie die Plugin-Verwaltung in DSH. Geben Sie die fünf unten aufgeführten npm-Pakete nacheinander ein. Installieren und aktivieren Sie jedes Paket, bevor Sie das nächste hinzufügen.
2. Fügen Sie in den Modelleinstellungen einen eigenen API-Anbieter hinzu. Wählen Sie OpenAI Responses und tragen Sie die URL des Anbieters, Ihren API-Schlüssel und die Modell-ID `deepseek-v4.1-flash` ein.
3. Öffnen Sie beide Projektordner als DSH-Arbeitsbereiche. Wählen Sie den neuen Anbieter und das Modell in einem DSH-Chat aus.
4. Öffnen Sie **Prism** in der DSH-Seitenleiste. Bitten Sie Prism, für jeden Arbeitsbereich eine Aufgabe zu delegieren und die Veranstaltungszeit, den Ort und die Ansprechperson aus der jeweiligen README zu nennen.
5. Die Aufgabenkarte zeigt Zeit und Status. Kehren Sie über **DeepSeek Harness** zu DSH zurück. Öffnen Sie im jeweiligen Arbeitsbereich den schreibgeschützten Verlauf der Ausführung und vergleichen Sie die Antwort mit beiden README-Dateien.

## Pakete für den Plugin-Manager

| Reihenfolge | Paket mit Version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.3` |

[Unterhaltung](/de/guide/chat) · [Modelle und Projekte](/de/develop/models)
