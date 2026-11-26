# Démarrage rapide

Commencez avec une machine et un projet. Vous pourrez ajouter une autre machine ou un compte de messagerie après le premier échange.

## Installer et démarrer

Installez Git, npm et Node.js 24.9 ou ultérieur. Le script récupère les cinq révisions de plugins associées au dépôt principal. Exécutez ces commandes dans un terminal.

Le dépôt principal et cette documentation sont publics. Pour exécuter le système, il faut un accès Git en lecture aux cinq dépôts privés de plugins. Authentifiez Git avec un compte autorisé avant le checkout, puis travaillez dans le répertoire `runtime/` généré.

```sh
git clone https://github.com/dsh-plugins/dsh-prism.git
cd dsh-prism
node scripts/checkout.mjs
cd runtime
npm ci
npm run build
cp prism.example.json prism.config.json
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

## Relier un modèle et un projet

L’exemple utilise le fournisseur DSH `deepseek-official`. Configurez ses identifiants dans DSH ou définissez `DEEPSEEK_API_KEY` dans l’environnement du processus. Renseignez le répertoire dans `registry.projects[].workspace`. Un chemin local relatif part du dossier du fichier de configuration.

`orchestrator.defaultProjectId` doit désigner un projet autorisé pour le propriétaire Web. L’exemple accorde la lecture et la recherche. Redémarrez le service après une modification du JSON.

## Ouvrir la première conversation

Ouvrez le lien de connexion affiché par DSH. Le navigateur échange le jeton contre un cookie et ouvre `/prism`. Demandez les projets accessibles, puis un livrable concret. En cas d’échec, vérifiez les identifiants, le modèle et les droits sur le projet par défaut.

[La conversation](/fr/guide/chat) · [Modèles et projets](/fr/develop/models)
