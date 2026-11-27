# Démarrage rapide

Avec Prism, plus besoin de passer d’un dossier à l’autre : vous formulez votre demande dans une seule conversation et il coordonne plusieurs projets à la fois. Le guide illustré étape par étape est disponible en [anglais](/guide/start) et en [chinois](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Installer les cinq plugins

Dans DSH, ouvrez **Plugins → Add plugin** et installez les cinq paquets ci-dessous dans l’ordre. Cliquez sur **Enable now** après chaque installation avant de passer au suivant :

| Ordre | Paquet et version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |

L’orchestrateur démarre dès que Mesh est activé.

> [!TIP]
> Si **Prism** n’apparaît pas dans la barre latérale juste après avoir activé les cinq plugins, rechargez l’onglet du navigateur.

### Mémoire à long terme et déclencheurs d’événements (facultatifs) {#optional-plugins}

Après avoir activé les cinq modules principaux, ajoutez les paquets dont vous avez besoin dans le même profil DSH. La mémoire conserve les informations et permet de joindre des médias. Les déclencheurs ajoutent des rappels planifiés et des événements externes.

Dans **Plugins → Add plugin**, saisissez le nom exact du paquet et sa version, puis choisissez **Enable now**. Vous pouvez aussi utiliser les commandes suivantes pour le profil `web`.

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.3.1"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.1"
```

Dans **Settings → Prism/Memory**, associez un modèle d’embedding local ou une API distante. Les outils de mémoire sont disponibles dès la fin de l’initialisation et Prism recharge automatiquement cette association aux démarrages suivants de DSH.

## 2. Connecter un modèle et ajouter vos projets

1. Allez dans **Settings → Models → Add model provider → Custom model API**, choisissez **OpenAI Responses**, renseignez votre point d’accès, votre clé API et l’identifiant `deepseek-v4.1-flash`, puis sélectionnez ce modèle dans un chat DSH.
2. Dans la barre latérale, cliquez sur **Add workspace** et ouvrez vos dossiers de projet (par exemple `harbor-books` et `lantern-cafe`). Prism détecte automatiquement les espaces locaux par leur nom.
3. Pour personnaliser les modèles utilisés à chaque étape (**L1 Conversation**, **L2 Planification**, **L3 Exécution**), ouvrez **Settings → Prism/Configuration**.

## 3. Lancer la tâche et vérifier le résultat

Ouvrez **Prism** dans la barre latérale et demandez-lui de relever l’heure, le lieu et le responsable dans le `README.md` de chaque projet. Prism affiche des cartes d’avancement dans le fil et publie le résumé final une fois terminé.

Pour vérifier quels fichiers ont été lus, cliquez sur **DeepSeek Harness** en haut et consultez l’historique en lecture seule dans chaque espace de travail.

Suite : [La conversation](/fr/guide/chat) · [Messageries](/fr/guide/im)
