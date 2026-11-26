# Modèles et projets

Le registre décrit les projets accessibles. L’orchestrateur définit séparément les modèles et les outils natifs de chaque rôle.

## Configurer chaque niveau

Placez cet extrait sous `orchestrator` dans `prism.config.json`. Les identifiants doivent être pris en charge par le fournisseur actif et uniques au sein du niveau.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Recueil des demandes" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planification et vérification" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revue de code ciblée", "promptMode": "append", "prompt": "Indique les fichiers effectivement examinés." }]
  }
}
```

## Description et consigne système

`description` indique au parent dans quels cas choisir le modèle. `provider` sélectionne le fournisseur DSH ; en son absence, l’hôte utilise son fournisseur par défaut.

`promptMode: "append"` ajoute les consignes du rôle et du modèle. `"replace"` utilise `prompt` comme consigne système personnalisée complète. Les droits d’outils restent contrôlés par l’hôte.

## Accès au projet

Une entrée contient `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` et `permissions` ; `gitRemote` est facultatif. L1 reçoit les métadonnées autorisées. Seul le code de confiance résout le répertoire. Les outils de L3 sont à l’intersection de la liste d’exécution, de la politique du projet et de la délégation du parent.

[Rôles et permissions](/fr/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
