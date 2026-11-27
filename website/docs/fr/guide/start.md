# Démarrage rapide

Deux dossiers de projet sur la même machine suffisent pour essayer Prism. Le guide illustré présente le parcours complet dans DeepSeek Harness 0.2.3-alpha.2. [Guide en anglais](/guide/start) · [Guide en chinois](/zh/guide/start)

1. Ouvrez le gestionnaire de plugins de DSH et saisissez les cinq paquets npm du tableau dans l’ordre indiqué. Installez puis activez chaque paquet avant d’ajouter le suivant.
2. Dans les paramètres des modèles, ajoutez un fournisseur d’API personnalisé. Choisissez OpenAI Responses, puis renseignez l’URL du fournisseur, votre clé API et l’identifiant de modèle `deepseek-v4.1-flash`.
3. Ouvrez les deux dossiers comme espaces de travail DSH. Dans une conversation DSH, choisissez le fournisseur et le modèle que vous venez de configurer.
4. Ouvrez **Prism** dans la barre latérale de DSH. Demandez une tâche par espace de travail pour retrouver dans chaque README l’heure, le lieu et la personne responsable de l’événement.
5. La carte de la tâche affiche son heure et son état. Revenez dans DSH avec **DeepSeek Harness** et ouvrez l’historique d’exécution en lecture seule dans l’espace de travail correspondant. Comparez la réponse aux deux README.

## Paquets à saisir dans DSH

| Ordre | Paquet et version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.2` |

[La conversation](/fr/guide/chat) · [Modèles et projets](/fr/develop/models)
