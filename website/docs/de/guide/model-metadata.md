---
pageClass: model-metadata
---

# Modellbeschreibungen und Prompts

Verwenden Sie unter **Settings → Prism/Configuration** für ein Modell dieselbe Beschreibung und denselben Prompt auf allen Ebenen, auf denen es aktiviert ist (L1, L2 oder L3). Übergeordnete Agenten wählen anhand der Beschreibung einen Subagenten aus. Der Prompt legt die allgemeinen Arbeitspräferenzen des Modells fest.

## `deepseek-v4.1-flash`

Wählen Sie in der DSH-Modellauswahl die Denkstufe **High** (`high`). Mit dem Prism-Orchestrator `0.2.2` übernimmt eine Sitzung die DSH-Denkstufe, wenn Anbieter und Modell-ID mit der DSH-Standardauswahl übereinstimmen. Andere Sitzungen verwenden die Standard-Denkstufe ihrer Modellroute. In `0.2.1` verwendeten alle Sitzungen die Standard-Denkstufe ihrer Route. [Schnellstart](./start.md)

### Modellbeschreibung {#deepseek-description}

```text
Fähigkeiten: Durchschnittlich, ausreichend für einzelne, klar abgegrenzte Aufgaben. Mittlere bis hohe Effizienz (schnell, aber geringe Token-Ausnutzung pro Zug). Bei komplexen Aufgaben neigt das Modell zu übermäßig langem Nachdenken. Einsatzbereiche: Änderungen an einzelnen Dateien, gebündelte Überarbeitungen nach einer vorgegebenen Vorlage, gezielte Suche und Zusammenfassung von Informationen sowie kleine Code-Reviews. Besonderheit: Speziell für die Entwicklung von Plugins für DSH (DeepSeek Harness) vorgesehen. Eignung: Verwenden, wenn Aufgabenstellung und Abnahmekriterien bereits feststehen, keine Abwägungen zwischen Modulen nötig sind und Effizienz wichtig ist. Wenn der Hauptagent kein DeepSeek-Modell verwendet, dieses Modell für die Entwicklung von DeepSeek-Harness-Plugins bevorzugen.
```

### Modell-Prompt {#deepseek-prompt}

```text
Erledige die Aufgabe so effizient wie möglich, ohne auf die damit verbundenen Kosten zu achten. Setze in einem Zug bevorzugt mehrere Werkzeuge **parallel ein** oder führe mehrere Anweisungen parallel aus. **Vermeide nach Möglichkeit einzelne Werkzeugaufrufe** und beschränke Züge mit nur einer Anweisung auf ein Minimum.
```

## `gpt-6.2-sol`

Verwenden Sie diese Werte, wenn `gpt-6.2-sol` in DSH über einen separat eingerichteten Anbieter verfügbar ist.

### Modellbeschreibung {#gpt-description}

```text
Fähigkeiten: Hervorragend im logischen Schlussfolgern, in Mathematik und in der Backend-Entwicklung. Sehr schwach darin, den Gesamtüberblick zu behalten und eine Projektarchitektur zu entwerfen. Durchschnittliche Effizienz. Einsatzbereiche: Reviews einzelner Codebereiche sowie Aufgaben, die anspruchsvolle Logik oder komplexe Mathematik erfordern. Eignung: Für kleine Code-Reviews mit Schwerpunkt auf der Logik parallel einsetzen. Auch für Aufgaben verwenden, die anspruchsvolle Logik oder komplexe Mathematik erfordern.
```

### Modell-Prompt {#gpt-prompt}

```text
Verwende eine präzise, natürliche Sprache und halte dich in Antworten, Dokumenten und Codekommentaren strikt an diesen Stil. Nenne direkt die geplante Aktion oder das bestätigte technische Ergebnis. **Erläutere nicht zusätzlich**, was du nicht tun wirst, was unverändert bleibt oder wie du die Ergebnisse aufteilen und einordnen willst. Schildere weder deinen Lesevorgang noch deinen Gedankengang. Beginne ohne Höflichkeitsfloskeln, Komplimente oder Wiederholung der Frage. Verzichte am Schluss auf inhaltsleere Zusammenfassungen, Schlagworte und Vorbehalte zu deinen Grenzen.
```
