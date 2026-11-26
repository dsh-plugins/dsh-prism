# Messenger einrichten

Ein authentifizierter privater Chat ist mit einer dauerhaften L1-Identität verbunden. Jeder Kanal empfängt gezielte Antworten und Statusmeldungen unabhängig vom Web.

## Einrichtung in der DSH-Oberfläche

Öffnen Sie die Prism-Einstellungen und wählen Sie unter **Messaging channels** einen der sieben Dienste. Hier können Sie Zugangsdaten, zugelassene Benutzer, Kopplungscodes und den Verbindungsstatus verwalten. Für Feishu/Lark gibt es zusätzlich die QR-Registrierung. Dieser Teil der Oberfläche verwendet bei deutscher Sprache die englischen Bezeichnungen. [Anleitung mit englischen Bildern](/guide/im) · [Anleitung mit chinesischen Bildern](/zh/guide/im)

## Anmelden und koppeln beim Start aus dem Quellcode

Aktivieren Sie den Adapter unter `im` in `prism.config.json`. Starten Sie die QR-Anmeldung auf dem Koordinator und scannen Sie den Code in der jeweiligen App. Für weitere Benutzer erzeugen Sie am Host einen Kopplungscode. Der Benutzer sendet `/pair CODE` im privaten Bot-Chat.

Die Befehle sind Alternativen. Führen Sie den passenden Befehl in `runtime/` aus. `setup` aktiviert den Adapter und nennt die benötigten Umgebungsvariablen. Für Kanäle ohne QR erzeugt es auch den ersten Code; weitere Benutzer verbinden Sie mit `pair`.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

Die QR-Anmeldung speichert die Zugangsdaten lokal und autorisiert den bestätigten Benutzer. Codes sind einmalig und zehn Minuten gültig. Nutzen Sie bei eigenem Zustandspfad `--config prism.config.json` für CLI und Koordinator.

## Verbindungsarten

| Plattform | Anbindung |
| --- | --- |
| Telegram | Bot-API mit Long Polling. Token über `im.telegram.tokenEnv` bereitstellen, Benutzer freigeben oder koppeln und einen bestehenden Webhook entfernen. |
| WeChat | Persönliches WeChat über iLink. `login wechat` am Host starten und nach dem Scan den privaten Chat öffnen. |
| Feishu / Lark | Die Feishu-App über `login feishu` autorisieren. App-Berechtigungen und Nachrichtenfunktion auf der Plattform aktivieren. |
| WeCom | Bot und Zugangsdaten unter `im.wecom` konfigurieren, anschließend den Benutzer im privaten Chat koppeln. |
| OneBot | Privatnachrichten vom OneBot-Dienst; signierte Ereignisse an `/prism/im/onebot` senden. |
| QQ | QQ-Bot einrichten und den offiziellen Callback auf `/prism/im/qq` setzen. Der Gateway prüft die Signatur. |
| Discord | Discord-Bot für Direktnachrichten aktivieren und den Benutzer im privaten Chat koppeln. |

## Schlüssel für die Quellcode-Konfiguration

Aktivieren Sie nur benötigte Kanäle und setzen Sie Geheimnisse im Prozessumfeld des Koordinators. `allowedUserIds` gewährt bekannten Plattformbenutzern Zugriff. Bewahren Sie die SQLite-Datei mit QR-Zugängen und Kopplungen bei Neustarts auf.

| Plattform | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Bleiben Ereignisse aus, prüfen Sie Callback oder ausgehende Verbindung des Kanals. Für QQ C2C gelten Antwortfenster und Kontingente der Plattform. Kann ein Kanal keine Karte bearbeiten, sendet er einen neuen Statusbeitrag.

## Chatbefehle

| Schnittstelle | Funktion |
| --- | --- |
| `/models` | L1-Modelle und Beschreibungen anzeigen. |
| `/model …` | Modell anhand Nummer oder ID wählen. |
| `/tasks` | Aufgaben dieses Gesprächs auflisten. |
| `/inspect …` | Aufgabe anhand ihrer ID lesen. |
| `/language …` | Sprachcode einstellen, etwa `de`. |
| `/pair …` | Einmaligen Kopplungscode einlösen. |

`im.locale` legt die Standardsprache fest. Benutzer können die Sprache im Bot wechseln. Der Zustellstand bleibt in SQLite erhalten. Ein Absturz zwischen Zustellung und lokaler Quittierung kann zu einer doppelten Nachricht führen.

[Entwicklerschnittstellen](/de/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
