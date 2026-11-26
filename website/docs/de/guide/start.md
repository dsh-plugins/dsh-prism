# Schnellstart

Mit zwei Projektordnern auf demselben Rechner können Sie Prism eine Aufgabe pro Projekt geben. Die bebilderte Anleitung zeigt den gesamten Ablauf mit DeepSeek Harness 0.2.3-alpha.2. [Anleitung auf Englisch](/guide/start) · [Anleitung auf Chinesisch](/zh/guide/start)

1. Öffnen Sie die Plugin-Verwaltung in DSH. Installieren und aktivieren Sie die fünf Prism-Plugins in der Reihenfolge der bebilderten Anleitung.
2. Fügen Sie in den Modelleinstellungen einen eigenen API-Anbieter hinzu. Wählen Sie OpenAI Responses und tragen Sie die URL des Anbieters, Ihren API-Schlüssel und die Modell-ID `deepseek-v4.1-flash` ein.
3. Öffnen Sie beide Projektordner als DSH-Arbeitsbereiche. Wählen Sie den neuen Anbieter und das Modell in einem DSH-Chat aus.
4. Fügen Sie beide Projekte in den Prism-Einstellungen mit jeweils eigener ID und absolutem Ordnerpfad hinzu. Für das Lesen der README-Dateien reichen `read`, `glob` und `grep`.
5. Öffnen Sie Prism und bitten Sie um einen Auftrag für jedes Projekt. Vergleichen Sie die Ergebnisse mit beiden README-Dateien. Über eine Aufgabenkarte können Sie die zugehörige Sitzung im Lesemodus öffnen.

[Unterhaltung](/de/guide/chat) · [Modelle und Projekte](/de/develop/models)
