# Mesh et sessions

Le coordinateur confie les sessions à `prism-<nodeId>`. Le contrat du fournisseur est identique pour une exécution locale ou distante.

## Relier deux nœuds

Placez le premier bloc `mesh` sur le coordinateur et le second sur le nœud d’exécution. Définissez le même secret aléatoire dans `PRISM_WORKER_TOKEN` des deux côtés. Enregistrez `atlas` avec l’identifiant de nœud `worker` dans les deux registres. Le nœud d’exécution résout le répertoire réel.

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

Employez HTTPS entre les machines et autorisez le nom d’hôte du nœud dans DSH. HTTP sur la boucle locale convient aux essais. Chaque machine garde son `DSH_HOME`. Le coordinateur ouvre la connexion et y reçoit les appels d’outils.

## Activation et conflits de verrou

Le nœud vérifie à nouveau l’appelant, le projet, le modèle et les droits. En cas de conflit sur le verrou d’écriture, il crée un fork de l’historique observable, publie atomiquement la nouvelle association et inscrit la session d’origine à archiver. Les éditeurs concurrents vérifient l’association retenue.

## Consulter une tâche distante

Une requête autorisée lit la session par le même lien sans verrou d’écriture. Conservez les répertoires d’état lors d’un redémarrage. Après une coupure, contrôlez le statut avant de répéter une opération susceptible de modifier des données.

[Interfaces de développement](/fr/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
