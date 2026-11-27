# Mesh et sessions

Prism associe **distribution transparente à la localisation** (`dsh-mesh-node`) et **reprise Copy-on-Conflict** afin que l’orchestration reste identique en local comme à distance sans jamais bloquer sur un verrou d’écriture.

## Transparence de localisation

Chaque nœud enregistre un Subagent Provider `prism-<nodeId>`. Le coordinateur émet un ticket à usage unique et reçoit l’ID d’une session DSH formelle sur le nœud cible. Comme **L1 choisit l’espace de L2** et **L3 hérite de celui de L2**, les accès fichiers restent locaux au nœud propriétaire.

## Connecter deux nœuds

Placez le premier bloc `mesh` sur le coordinateur (`hub`) et le second sur l’exécutant (`worker`), avec le même secret dans `PRISM_WORKER_TOKEN` et le projet `atlas` déclaré des deux côtés avec `nodeId: "worker"` :

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

Utilisez HTTPS entre machines (HTTP loopback uniquement pour les tests locaux). Chaque nœud conserve son propre `DSH_HOME`.

## Virtual Facade & Copy-on-Conflict

En surface ce sont des Subagents légers ; en interne ce sont des **sessions DSH formelles**. Si l’activation rencontre un conflit de verrou d’écriture, le moteur effectue immédiatement un **Fork** de l’historique observable vers une nouvelle session, met à jour la liaison atomiquement et marque l’ancienne pour archivage.

## Persistance et inspection à distance

`conversations.sqlite` stocke messages, modèles, états et files, tandis que DSH conserve les journaux complets. Les lectures `trace` passent par le même lien Mesh sans acquérir de verrou d’écriture.

Suite : [Interfaces de développement](/fr/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
