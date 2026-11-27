# Rôles et permissions

L’architecture de Prism repose sur une idée simple : **masquer toute la complexité d’infrastructure à l’utilisateur et échanger en interne des frontières strictes contre une forte autonomie et fiabilité.**

Cinq plugins (`dsh-concierge-ui`, `dsh-workspace-registry`, `dsh-orchestrator`, `dsh-mesh-node`, `dsh-im-gateway`) coopèrent à travers trois niveaux strictement isolés.

## Six principes de conception

1. **Zero-Workspace UX** : l’utilisateur veut accomplir une tâche, pas gérer des chemins ou des machines. Web et messageries n’affichent qu’un fil épuré, des cartes de tâches repliables et un accès trace en lecture seule.
2. **Strict Isolation** : plus un agent est proche de l’utilisateur, plus ses droits sont restreints. **L1** ne possède aucun outil de fichier ni de terminal, ce qui bloque les escalades par injection et garde le contexte de routage propre.
3. **Silent-by-Default Actor** : le texte ordinaire de L1 reste une réflexion interne. Toute réponse visible passe explicitement par `send_user`, et les échanges entre niveaux reposent sur des files persistantes asynchrones.
4. **Self-Describing Routing** : chaque niveau dispose de son propre catalogue de modèles avec description des capacités (`description`) et surcharge de prompt optionnelle. L1 et L2 choisissent dynamiquement via `list_models`.
5. **Location Transparency** : `dsh-mesh-node` encapsule les nœuds distants derrière un Subagent Provider standard `prism-<nodeId>`. Comme L3 hérite toujours de l’espace de travail de L2, les opérations sur fichiers restent locales au nœud propriétaire.
6. **Virtual Facade & Copy-on-Conflict** : en surface, chaque niveau se présente comme un Subagent léger ; en interne, il s’exécute dans une session DSH formelle. En cas de conflit de verrou d’écriture, le runtime effectue un Fork immédiat, rebascule la liaison atomiquement et archive l’ancienne session.

## Trois niveaux d’isolation

| Rôle | Espace de travail | Responsabilité et limites |
| --- | --- | --- |
| **L1** | Projet par défaut | Accueille l’utilisateur, consulte les métadonnées autorisées via `dsh-workspace-registry`, choisit le projet cible et le modèle L2. **Aucun outil fichier ou terminal.** |
| **L2** | Projet choisi par L1 | Planifie dans le projet, choisit les modèles L3, délègue les étapes et peut réduire leurs budgets d’outils. |
| **L3** | **Hérite obligatoirement** du nœud et de l’espace de L2 | Exécute localement selon l’intersection entre rôle L3, politique du projet et budget L2. |

## Messages et fin de tâche

`send_user` publie une réponse visible ; `send_parent` et `send_child` réveillent le destinataire via sa file ; `report_progress` / `get_progress` et `task_settled` orchestrent le suivi asynchrone.

| Rôle | Outils de coordination |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

Suite : [Modèles et projets](/fr/develop/models) · [Mesh et sessions](/fr/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
