# Modèles et projets

Prism sépare **qui choisit le modèle** de **qui résout le chemin physique**, alliant routage dynamique à l’exécution et contrôle d’accès dans le code hôte de confiance.

## Catalogues de modèles par niveau

Sous **Settings → Prism/Configuration** (ou `orchestrator.models` dans `prism.config.json`), **L1**, **L2** et **L3** définissent chacun leurs modèles autorisés. Un niveau vide suit le modèle DSH par défaut.

- `id` et `provider` optionnel : identifient le modèle et le fournisseur DSH.
- `description` : résumé des capacités lu par le niveau supérieur via `list_models`.
- `prompt` et `promptMode` : `"append"` (défaut) complète le prompt du rôle ; `"replace"` le remplace entièrement sans jamais élargir les outils autorisés.

L’utilisateur choisit librement le modèle **L1** ; les agents parents sélectionnent **L2** et **L3** dynamiquement.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Accueil et coordination" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planification et vérification" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revue ciblée de code", "promptMode": "append", "prompt": "Citez les fichiers vérifiés." }]
  }
}
```

## Découverte et registre des espaces

1. **Découverte automatique DSH** : chaque dossier ouvert dans la barre latérale est indexé avec son UUID natif et son nom affiché (`read`, `glob`, `grep` par défaut pour le propriétaire et les utilisateurs IM approuvés).
2. **Entrées explicites (`registry`)** : définissent `id`, `description`, `stack`, `nodeId`, `workspace`, `principals`, `permissions` et `gitRemote` optionnel, et priment sur les valeurs découvertes.

`query_projects` ne renvoie que les métadonnées autorisées à L1 ; les chemins physiques sont résolus uniquement côté hôte de confiance.

Suite : [Rôles et permissions](/fr/develop/layers) · [Mesh et sessions](/fr/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
