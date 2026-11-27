# Démarrage rapide

Avec Prism, plus besoin de passer d’un dossier à l’autre : vous formulez votre demande dans une seule conversation et il coordonne plusieurs projets à la fois. Le guide illustré étape par étape est disponible en [anglais](/guide/start) et en [chinois](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Installer les sept plugins

Dans DSH, ouvrez **Plugins → Add plugin** et installez les sept paquets ci-dessous dans l’ordre, dans le même profil. Cliquez sur **Enable now** après chaque installation avant de passer au suivant.

| Ordre | Paquet et version |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

L’orchestrateur démarre dès que Mesh est activé.

> [!TIP]
> Si **Prism** n’apparaît pas dans la barre latérale juste après avoir activé les sept plugins, rechargez l’onglet du navigateur.

### Mémoire à long terme et déclencheurs d’événements {#optional-plugins}

La mémoire conserve les informations et permet de joindre des médias. Les déclencheurs ajoutent des rappels planifiés et des événements externes.

Ouvrez **Settings → Prism/Memory → Remote API**. Copiez la valeur de `EMBEDDINGS_BASE_URL` dans **BASE_URL** et celle de `EMBEDDINGS_API_KEY` dans **API_KEY**. Saisissez `BAAI/bge-large-zh-v1.5` dans **MODEL_ID**, puis confirmez l’association. Après la vérification de la connexion et l’initialisation, les outils de mémoire sont disponibles. Prism recharge automatiquement l’association au démarrage de DSH.

## 2. Connecter un modèle et ajouter vos projets

1. Allez dans **Settings → Models → Add model provider → Custom model API** et choisissez **OpenAI Responses**. Copiez les valeurs de `BASE_URL` et de `API_KEY` dans **Base URL** et **API key**, saisissez `deepseek-v4.1-flash` comme identifiant de modèle, puis enregistrez le fournisseur.
2. Modifiez le fournisseur. Dans **Customized settings → Model options** de `deepseek-v4.1-flash`, activez **Reasoning levels**. Vérifiez que la valeur d’API du niveau `high` est `high`, puis enregistrez. Dans un chat DSH, sélectionnez `deepseek-v4.1-flash` et **Effort → High**. L’orchestrateur `0.2.1` transmet uniquement le fournisseur et le modèle aux sessions Prism.
3. Dans la barre latérale, cliquez sur **Add workspace** et ouvrez vos dossiers de projet (par exemple `harbor-books` et `lantern-cafe`). Prism détecte automatiquement les espaces locaux par leur nom.
4. Dans **Settings → Prism/Configuration**, choisissez les modèles pour **L1 Conversation**, **L2 Planification** et **L3 Exécution**. Pour un modèle donné, reprenez la même description et le même prompt des [profils de modèle](./model-metadata.md) à chaque étape où vous l’activez. Vous pouvez choisir `gpt-6.2-sol` s’il est disponible séparément dans DSH.

## 3. Lancer la tâche et vérifier le résultat

Ouvrez **Prism** dans la barre latérale et demandez-lui de relever l’heure, le lieu et le responsable dans le `README.md` de chaque projet. Prism affiche des cartes d’avancement dans le fil et publie le résumé final une fois terminé.

Pour vérifier quels fichiers ont été lus, cliquez sur **DeepSeek Harness** en haut et consultez l’historique en lecture seule dans chaque espace de travail.

Suite : [La conversation](/fr/guide/chat) · [Messageries](/fr/guide/im)
