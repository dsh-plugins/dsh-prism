# Interfaces de développement

Le navigateur utilise des routes HTTP authentifiées et limitées. Le code de l’hôte passe par le service Cordis, avec les mêmes contrôles de propriété.

## HTTP Web

Utilisez le cookie de connexion DSH. Pour une écriture, envoyez du JSON avec `X-Prism-Request: 1`. Le serveur déduit le propriétaire de l’identité authentifiée.

| Interface | Fonction |
| --- | --- |
| `GET /prism/api/view` | Conversation publique et modèles L1 disponibles. |
| `GET /prism/api/events` | Instantanés SSE des messages et des cartes. |
| `POST /prism/api/message` | Soumettre `text` et une `requestId` stable. |
| `POST /prism/api/model` | Choisir un `modelId` L1 autorisé. |
| `GET /prism/api/trace?task=…` | Lire une tâche du propriétaire courant. |

Attribuez une `requestId` stable à chaque message et réutilisez-la si la confirmation est incertaine. La reconnexion SSE transmet un état actualisé. Chargez l’historique lorsque l’utilisateur ouvre une tâche.

## Service Cordis

| Interface | Fonction |
| --- | --- |
| `ctx.prism.view(owner)` | Lire l’état public. |
| `ctx.prism.message(owner, text, requestId?)` | Enfiler un message utilisateur authentifié. |
| `ctx.prism.selectModel(owner, modelId)` | Choisir le prochain modèle d’interaction. |
| `ctx.prism.trace(owner, taskId)` | Lire la session d’une tâche autorisée. |
| `ctx.prism.subscribe(owner, listener)` | Recevoir les mises à jour ; appeler la fonction retournée pour se désabonner. |

Déduisez `owner` du canal authentifié. Le registre expose des métadonnées publiques ; le code de confiance obtient les chemins via `ctx.prismRegistry.resolve`.

## Adaptateurs de messagerie

Un `ImTransport` définit une identité stable pour le canal et le bot, autorise la destination et implémente `send` et `edit`. Confirmez un événement après la réussite d’`ImGateway.receive`. Gardez son identifiant lors des nouvelles tentatives. Livraison et reçu local peuvent être validés séparément.

[Messageries](/fr/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
