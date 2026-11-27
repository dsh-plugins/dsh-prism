# Messageries

Chaque conversation privée authentifiée correspond à une identité L1 persistante. Les canaux reçoivent leurs propres réponses explicites et mises à jour.

## Configuration dans l’interface DSH

Dans les paramètres de DSH, ouvrez **Prism/IM → Add IM** et choisissez Telegram, WeChat, Feishu/Lark, WeCom, QQ Bot, OneBot ou Discord. Pour un nouveau compte, renseignez **Username** et les identifiants. Feishu récupère le nom du bot lors de l’association. Cliquez sur **Save settings**, rouvrez la fiche du compte, puis choisissez **Enable channel** pour lancer la connexion.

Pour Feishu, choisissez **Manual binding** si vous avez les identifiants de l’application, ou **QR binding → Generate QR code** pour associer le bot par QR code. Scannez-le avec Feishu ou Lark et choisissez ou créez un bot sur la page officielle d’autorisation. Lorsqu’une personne écrit au bot en privé pour la première fois, le propriétaire de DSH peut accéder à **Pending approvals** et choisir **Approve** ou **Reject**. [Guide illustré en anglais](/guide/im) · [Guide illustré en chinois](/zh/guide/im)

## Connexion et association depuis le lanceur compilé

Activez l’adaptateur dans la section `im` de `prism.config.json`. Lancez la connexion QR sur le coordinateur et scannez le code dans l’application. Pour un autre utilisateur, générez un code sur l’hôte et demandez-lui d’envoyer `/pair CODE` au bot en privé.

Ces commandes sont des alternatives à exécuter depuis `runtime/`. `setup` active un adaptateur et indique les variables d’environnement requises. Pour les canaux sans QR, il génère le premier code ; utilisez `pair` pour un autre utilisateur.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

La connexion QR conserve les identifiants localement et autorise l’utilisateur vérifié. Un code d’association est valable une fois pendant dix minutes. Pour un chemin d’état personnalisé, transmettez `--config prism.config.json` à la CLI et utilisez ce même fichier au démarrage.

### Canaux pris en charge

| Plateforme | Connexion |
| --- | --- |
| Telegram | Interrogation longue de la Bot API. Définissez le jeton via `im.telegram.tokenEnv`, autorisez ou associez l’utilisateur et supprimez tout webhook existant. |
| WeChat | WeChat personnel via iLink. Lancez `login wechat` et ouvrez la conversation privée du compte vérifié. |
| Feishu / Lark | Autorisez l’application avec `login feishu`. Configurez les permissions et les messages de l’application sur la plateforme. |
| WeCom | Configurez le bot d’entreprise et ses identifiants dans `im.wecom`, puis associez l’utilisateur en privé. |
| OneBot | Connectez OneBot pour les messages privés ; dirigez les événements signés vers `/prism/im/onebot`. |
| QQ | Configurez le bot QQ et son callback officiel `/prism/im/qq`. La passerelle vérifie la signature. |
| Discord | Activez les messages directs du bot Discord et associez l’utilisateur par message privé. |

### Clés de configuration du lanceur compilé

Activez uniquement les canaux utilisés et renseignez les secrets dans l’environnement du coordinateur. `allowedUserIds` autorise des identifiants connus sur la plateforme. Conservez le fichier SQLite qui contient les associations et les identifiants QR.

| Plateforme | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

En l’absence d’événements, vérifiez le callback ou la connexion sortante du canal. QQ C2C impose ses fenêtres de réponse et quotas de messages proactifs. Certains canaux publient un nouveau statut lorsque la carte précédente ne peut pas être modifiée.

## Commandes de conversation

| Interface | Fonction |
| --- | --- |
| `/models` | Lister les modèles L1 et leurs capacités. |
| `/model …` | Choisir un modèle par numéro ou identifiant. |
| `/tasks` | Lister les tâches de cette conversation. |
| `/inspect …` | Lire une tâche par identifiant. |
| `/language …` | Choisir une langue, par exemple `fr`. |
| `/pair …` | Valider le code d’association à usage unique. |

`im.locale` fixe la langue par défaut. L’utilisateur peut la changer dans le bot. SQLite conserve l’état de livraison au redémarrage. Une panne entre livraison et enregistrement du reçu peut produire un doublon.

[Interfaces de développement](/fr/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
