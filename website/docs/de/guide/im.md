# Messenger einrichten

Verbinden Sie Prism mit Ihren gewohnten Messengern, um Aufgaben direkt im privaten Chat zu stellen und Ergebnisse automatisch zu erhalten.

Öffnen Sie als DSH-Eigentümer **Settings → Prism/IM** und wählen Sie **Add IM**. Gespeicherte Konten erscheinen als Karten, über die Sie Einstellungen ändern oder die Verbindung ein- und ausschalten können. Unter **Pending approvals** erscheinen Personen, die den Bot erstmals angeschrieben haben. ([Bebilderte Anleitung auf Englisch](/guide/im) · [Chinesisch](/zh/guide/im))

Für alle Plattformen außer Feishu/Lark vergeben Sie zunächst einen **Username**, damit Sie die Karten leicht unterscheiden können. Klicken Sie auf **Save settings** und anschließend auf **Enable channel**, sobald Zugangsdaten oder QR-Anmeldung bereit sind.

## Unterstützte Plattformen

- **Telegram**: **Bot token** von `@BotFather` eintragen, speichern und aktivieren. Falls zuvor ein Webhook aktiv war, diesen zuerst bei Telegram entfernen.
- **WeChat**: Unter **Account registration** auf **Generate QR code** klicken, mit WeChat scannen, speichern und aktivieren.
- **Feishu / Lark**: Entweder per **QR binding → Generate QR code** scannen und Bot auswählen/erstellen, oder unter **Manual binding** **Service**, **App ID** und **App secret** eintragen (Privatnachrichten-Events in der Entwicklerkonsole aktivieren). Danach **Enable channel** wählen.
- **WeCom**: **Username**, **Bot ID** und **Bot secret** eines WeCom-Bots mit dauerhafter Verbindung eintragen, speichern und aktivieren.
- **QQ Bot**: **Username**, **App ID** und **App secret** eintragen und die angezeigte `/prism/im/qq`-Callback-URL (per HTTPS erreichbar) in der QQ-Konsole hinterlegen.
- **OneBot**: **Username**, **OneBot account ID**, **OneBot HTTP API URL**, **Access token** und **Event-signing secret** eintragen und den Event-Callback auf `/prism/im/onebot` richten.
- **Discord**: **Username** und **Bot token** aus dem Discord Developer Portal eintragen, speichern und aktivieren.

## Erste Nachrichten freigeben

Schreibt jemand den Bot erstmals privat an, landet die Anfrage unter **Pending approvals**. Prüfen Sie Plattform, Benutzername und ID und wählen Sie **Approve** (gibt den Chat frei und verarbeitet die erste Nachricht) oder **Reject**.

## Chat-Befehle

In freigegebenen privaten Chats stehen folgende Befehle bereit:
- `/models` — Verfügbare Gesprächsmodelle anzeigen
- `/model ID` — Modell für kommende Nachrichten wählen
- `/tasks` — Aufgaben dieses Chats auflisten
- `/inspect TASK_ID` — Schreibgeschützten Aufgabenverlauf öffnen
- `/language de` — Sprache der Antworten umstellen

Weiter: [Unterhaltung](/de/guide/chat) · [Entwicklerschnittstellen](/de/develop/api)
