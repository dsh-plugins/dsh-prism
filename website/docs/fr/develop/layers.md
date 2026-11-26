# Rôles et permissions

Chaque rôle s’exécute dans une session DSH à part entière derrière un Subagent Provider. L’hôte contrôle les outils à la découverte et à l’appel.

| Rôle | Responsabilité et limites |
| --- | --- |
| **L1** | Accueille l’utilisateur dans le projet par défaut. Consulte les métadonnées autorisées, choisit le projet cible et le modèle L2. Ne dispose pas d’outils de fichiers ou de terminal. |
| **L2** | Planifie dans le projet choisi par L1. Sélectionne les modèles L3, distribue les étapes et peut réduire leurs droits. Échange avec son parent et ses enfants directs. |
| **L3** | Exécute une étape sur le nœud et dans l’espace de travail du parent. Les outils natifs sont bornés par le rôle, la politique du projet et les droits délégués. |

## Messages et fin de tâche

L1 publie une réponse avec `send_user`. Le texte ordinaire du modèle reste dans la session. `send_parent` et `send_child` réveillent le destinataire par sa file. Le parent interroge `get_progress` et reçoit `task_settled` lorsque la tâche atteint un état final.

| Rôle | Outils de coordination |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Les cartes peuvent évoluer indépendamment des réponses. L1 décide après réception de l’événement s’il faut prévenir l’utilisateur. `list_models` décrit les modèles disponibles au niveau suivant.

[Modèles et projets](/fr/develop/models) · [Mesh et sessions](/fr/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
