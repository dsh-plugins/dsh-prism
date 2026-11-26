# Mesh und Sitzungen

Der Koordinator beauftragt `prism-<nodeId>` über dieselbe Providerschnittstelle für lokale und entfernte Arbeit.

## Zwei Knoten verbinden

Tragen Sie den ersten `mesh`-Abschnitt beim Koordinator, den zweiten beim Worker ein. Setzen Sie `PRISM_WORKER_TOKEN` auf beiden Seiten auf dasselbe zufällige Geheimnis. Registrieren Sie `atlas` beidseits mit Knoten-ID `worker`; der Worker bestimmt den tatsächlichen Pfad.

```json
{
  "nodeId": "hub",
  "peers": [{ "id": "worker", "url": "https://worker.example.org", "tokenEnv": "PRISM_WORKER_TOKEN" }]
}
```

```json
{
  "nodeId": "worker",
  "incoming": [{ "id": "hub", "tokenEnv": "PRISM_WORKER_TOKEN", "projects": ["atlas"] }]
}
```

Verwenden Sie geräteübergreifend HTTPS und erlauben Sie den Worker-Hostnamen in DSH. Auf Loopback ist HTTP möglich. Jeder Knoten hat ein eigenes `DSH_HOME`. Die Verbindung und der Empfang von Werkzeugaufrufen gehen vom Koordinator aus.

## Aktivierung und Schreibsperren

Der Worker prüft Absender, Projekt, Modell und Werkzeugbudget erneut. Bei einer DSH-Schreibsperre erzeugt er einen Fork aus dem beobachtbaren Verlauf, ersetzt die logische Bindung atomar und merkt die Ursprungssitzung zur Archivierung vor. Konkurrierende Prozesse prüfen die tatsächlich veröffentlichte Bindung erneut.

## Entfernten Verlauf lesen

Eine autorisierte Abfrage liest die Sitzung über dieselbe Verbindung ohne Schreibsperre. Erhalten Sie die Zustandsverzeichnisse beider Seiten bei Neustarts. Prüfen Sie nach einem Verbindungsabbruch den Aufgabenstatus, bevor Sie einen Vorgang mit Nebenwirkungen wiederholen.

[Entwicklerschnittstellen](/de/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
