# Schnellstart

Beginnen Sie mit einem Rechner und einem Projekt. Weitere Geräte und Messenger können Sie danach anschließen.

## Installieren und starten

Sie benötigen Git, npm und Node.js ab 24.9. Das Checkout-Skript lädt die fünf zum Hauptprojekt passenden Plugin-Revisionen. Führen Sie diese Befehle in einem Terminal aus.

Das Hauptprojekt und diese Dokumentation sind öffentlich. Für den Betrieb benötigen Sie Git-Lesezugriff auf alle fünf privaten Plugin-Repositories. Melden Sie Git vor dem Checkout mit einem berechtigten Konto an. Arbeiten Sie anschließend im erzeugten Verzeichnis `runtime/`.

```sh
git clone https://github.com/dsh-plugins/dsh-prism.git
cd dsh-prism
node scripts/checkout.mjs
cd runtime
npm ci
npm run build
cp prism.example.json prism.config.json
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

## Modell und Projekt verbinden

Das Beispiel nutzt den DSH-Anbieter `deepseek-official`. Hinterlegen Sie gültige Zugangsdaten in DSH oder setzen Sie `DEEPSEEK_API_KEY` für den Hostprozess. Tragen Sie unter `registry.projects[].workspace` das Projektverzeichnis ein. Lokale relative Pfade beziehen sich auf die Konfigurationsdatei.

`orchestrator.defaultProjectId` muss auf ein für den Web-Benutzer freigegebenes Projekt verweisen. Das Beispiel erlaubt Lesen und Suchen. Starten Sie den Host nach Änderungen an der JSON-Datei neu.

## Erstes Gespräch

Öffnen Sie den von DSH ausgegebenen Anmeldelink. Nach dem Austausch des Tokens gegen ein Cookie öffnet sich `/prism`. Fragen Sie nach verfügbaren Projekten und geben Sie anschließend eine konkrete Aufgabe. Prüfen Sie bei Verarbeitungsfehlern Zugangsdaten, Modell-ID und Projektfreigabe.

[Unterhaltung](/de/guide/chat) · [Modelle und Projekte](/de/develop/models)
