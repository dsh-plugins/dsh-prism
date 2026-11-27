# Démarrage rapide

Avec Prism, plus besoin de passer d’un dossier à l’autre : vous formulez votre demande dans une seule conversation et il coordonne plusieurs projets à la fois. Le guide illustré étape par étape est disponible en [anglais](/guide/start) et en [chinois](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Installer les cinq plugins

Dans DSH, ouvrez **Plugins → Add plugin** et installez les cinq paquets ci-dessous dans l’ordre. Cliquez sur **Enable now** après chaque installation avant de passer au suivant :

| Ordre | Paquet et version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.3` |

> [!TIP]
> Si **Prism** n’apparaît pas dans la barre latérale juste après avoir activé les cinq plugins, rechargez l’onglet du navigateur.

## 2. Connecter un modèle et ajouter vos projets

1. Allez dans **Settings → Models → Add model provider → Custom model API**, choisissez **OpenAI Responses**, renseignez votre point d’accès, votre clé API et l’identifiant `deepseek-v4.1-flash`, puis sélectionnez ce modèle dans un chat DSH.
2. Dans la barre latérale, cliquez sur **Add workspace** et ouvrez vos dossiers de projet (par exemple `harbor-books` et `lantern-cafe`). Prism détecte automatiquement les espaces locaux par leur nom.
3. Pour personnaliser les modèles utilisés à chaque étape (**L1 Conversation**, **L2 Planification**, **L3 Exécution**), ouvrez **Settings → Prism/Configuration**.

## 3. Lancer la tâche et vérifier le résultat

Ouvrez **Prism** dans la barre latérale et demandez-lui de relever l’heure, le lieu et le responsable dans le `README.md` de chaque projet. Prism affiche des cartes d’avancement dans le fil et publie le résumé final une fois terminé.

Pour vérifier quels fichiers ont été lus, cliquez sur **DeepSeek Harness** en haut et consultez l’historique en lecture seule dans chaque espace de travail.

Suite : [La conversation](/fr/guide/chat) · [Messageries](/fr/guide/im)
