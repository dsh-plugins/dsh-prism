---
pageClass: model-metadata
---

# Descriptions et prompts des modèles

Dans **Settings → Prism/Configuration**, utilisez la même description et le même prompt à chaque niveau où un modèle est activé (L1, L2 ou L3). L’agent du niveau supérieur s’appuie sur la description pour choisir un sous-agent. Le prompt définit les préférences de travail générales du modèle.

## `deepseek-v4.1-flash`

Sélectionnez l’effort de raisonnement **High** (`high`) dans le sélecteur de modèles de DSH. Avec l’orchestrateur Prism `0.2.2`, une session reprend l’effort de DSH si le fournisseur et l’identifiant du modèle correspondent tous deux à la sélection par défaut de DSH. Les autres sessions utilisent l’effort par défaut de la route du modèle. Dans la version `0.2.1`, toutes les sessions utilisaient l’effort par défaut de leur route. [Démarrage rapide](./start.md)

### Description du modèle {#deepseek-description}

```text
Capacités : moyennes, suffisantes pour des tâches ponctuelles et bien délimitées. Efficacité moyenne à élevée (rapide, mais exploite mal les tokens sur un même tour). A tendance à trop réfléchir dans les situations complexes. Cas d’usage : modification d’un seul fichier, réécriture par lots selon un modèle prédéfini, recherche ciblée et synthèse d’informations, petites revues de code. Spécialité : modèle dédié à la création de plugins pour DSH (DeepSeek Harness). À utiliser lorsque l’objectif et les critères d’acceptation sont déjà clairs, qu’aucun arbitrage entre modules n’est nécessaire et que l’efficacité compte. Si l’agent principal n’utilise pas un modèle DeepSeek, privilégiez ce modèle pour créer des plugins DeepSeek Harness.
```

### Prompt du modèle {#deepseek-prompt}

```text
Accomplissez la tâche le plus efficacement possible, sans vous soucier des coûts associés. Privilégiez l’usage de plusieurs outils ou l’exécution de plusieurs instructions **en parallèle** au cours d’un même tour. Dans la mesure du possible, **évitez les appels isolés à un outil** et limitez les tours consacrés à une seule instruction.
```

## `gpt-6.2-sol`

Utilisez ces valeurs si `gpt-6.2-sol` est disponible dans DSH via un fournisseur configuré séparément.

### Description du modèle {#gpt-description}

```text
Capacités : excellentes en raisonnement logique, en mathématiques et en développement côté serveur. Très faibles pour appréhender les projets dans leur ensemble et concevoir leur architecture. Efficacité ordinaire. Cas d’usage : revue de portions de code et résolution de problèmes qui exigent un raisonnement logique poussé ou des mathématiques complexes. Utilisez-le en parallèle pour les revues de code à périmètre réduit axées sur la logique. Utilisez-le également pour les problèmes qui exigent un raisonnement logique poussé ou des mathématiques complexes.
```

### Prompt du modèle {#gpt-prompt}

```text
Employez un langage précis et naturel. Respectez strictement ce style dans vos réponses, vos documents et vos commentaires de code. Indiquez directement l’action prévue ou la conclusion technique confirmée. **N’ajoutez aucune explication** sur ce que vous ne ferez pas, ce qui restera inchangé ou la façon dont vous comptez répartir ou classer les résultats. Ne décrivez ni votre parcours de lecture ni votre cheminement de pensée. Évitez de commencer par des salutations, des compliments ou une reformulation de la question. Évitez de terminer par des résumés creux, des slogans ou des mises en garde sur les limites de votre intervention.
```
