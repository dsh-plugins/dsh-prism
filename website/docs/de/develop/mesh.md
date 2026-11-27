# Mesh und Sitzungen

Prism verbindet **ortstransparente Verteilung** (`dsh-mesh-node`) mit **Copy-on-Conflict-Sitzungswiederherstellung**, sodass die Orchestrierung lokal wie entfernt identisch arbeitet und nie an Schreibsperren hängenbleibt.

## Ortstransparenz über Subagent Provider

Jeder Knoten registriert einen `prism-<nodeId>` Subagent Provider. Der Koordinator vergibt ein einmaliges Dispatch-Ticket und erhält die ID einer regulären DSH-Sitzung auf dem Zielknoten. Da **L1 den Arbeitsbereich für L2 wählt** und **L3 diesen zwingend erbt**, bleiben alle Dateioperationen lokal auf dem Zielgerät – über das Netz gehen nur schlanke Steuersignale und Zusammenfassungen.

## Zwei Knoten verbinden

Legen Sie das erste `mesh`-Fragment auf dem Koordinator (`hub`) und das zweite auf dem Worker (`worker`) ab. Beide teilen sich denselben Zufallsschlüssel in `PRISM_WORKER_TOKEN` und registrieren `atlas` mit `nodeId: "worker"` (nur der Worker löst den lokalen Pfad auf):

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

Verwenden Sie zwischen Geräten HTTPS (Loopback-HTTP nur für lokale Tests). Jeder Knoten behält sein eigenes `DSH_HOME`.

## Virtual Facade & Copy-on-Conflict

Nach außen wirkt jede Ebene wie ein leichter Subagent, läuft intern aber in einer **formalen DSH-Sitzung** mit Persistenz und Verlauf. Trifft die Aktivierung auf einen DSH-Schreibsperren-Konflikt, blockiert der Runner nicht, sondern **forkt** die sichtbare Historie sofort in eine neue Sitzung, aktualisiert die logische Bindung atomar und merkt die alte Sitzung zur Archivierung vor.

## Persistenz und Ferninspektion

Nachrichten, Modellwahl, Aufgabenstatus und Warteschlangen liegen in `conversations.sqlite`, die vollständigen Protokolle in den DSH-Sitzungen. Autorisierte Lesezugriffe (Trace) laufen sperrfrei über dieselbe Mesh-Verbindung. Nach einem Verbindungsabbruch sollte vor einer Wiederholung zuerst der Aufgabenstatus geprüft werden.

Weiter: [Entwicklerschnittstellen](/de/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
