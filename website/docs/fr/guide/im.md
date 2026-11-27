# Messageries

Connectez Prism à vos messageries habituelles pour envoyer vos demandes et recevoir les résultats directement en message privé.

En tant que propriétaire DSH, ouvrez **Settings → Prism/IM** puis cliquez sur **Add IM**. Chaque compte enregistré apparaît sous forme de carte permettant de modifier ses réglages ou d’activer/désactiver la connexion. **Pending approvals** répertorie les personnes qui écrivent au bot pour la première fois. ([Guide illustré en anglais](/guide/im) · [En chinois](/zh/guide/im))

Sauf pour Feishu/Lark, saisissez un **Username** pour identifier chaque carte. Cliquez sur **Save settings**, puis sur **Enable channel** une fois les identifiants ou le QR code prêts.

## Plateformes prises en charge

- **Telegram** : saisissez le **Bot token** fourni par `@BotFather`, enregistrez et activez. Supprimez d’abord tout webhook existant côté Telegram.
- **WeChat** : sous **Account registration**, cliquez sur **Generate QR code**, scannez avec WeChat, enregistrez et activez.
- **Feishu / Lark** : utilisez **QR binding → Generate QR code** pour lier ou créer un bot, ou **Manual binding** avec **Service**, **App ID** et **App secret** (en activant les événements de message privé dans la console). Activez ensuite le canal.
- **WeCom** : saisissez **Username**, **Bot ID** et **Bot secret** d’un bot WeCom compatible connexion persistante, enregistrez et activez.
- **QQ Bot** : saisissez **Username**, **App ID** et **App secret**, puis configurez l’URL `/prism/im/qq` (HTTPS accessible depuis Internet) dans la console QQ.
- **OneBot** : saisissez **Username**, **OneBot account ID**, **OneBot HTTP API URL**, **Access token** et **Event-signing secret**, et pointez le callback d’événements vers `/prism/im/onebot`.
- **Discord** : saisissez **Username** et le **Bot token** issu du Discord Developer Portal, enregistrez et activez.

## Approuver les nouveaux utilisateurs

Lorsqu’une personne écrit au bot en privé pour la première fois, ouvrez **Pending approvals**, vérifiez la plateforme, le nom et l’identifiant, puis cliquez sur **Approve** (autorise le chat et traite ce premier message) ou **Reject**.

## Commandes dans le chat

- `/models` — Lister les modèles disponibles
- `/model ID` — Sélectionner un modèle
- `/tasks` — Afficher les tâches de ce chat
- `/inspect TASK_ID` — Ouvrir l’historique en lecture seule d’une tâche
- `/language fr` — Changer la langue des réponses

Suite : [La conversation](/fr/guide/chat) · [Interfaces de développement](/fr/develop/api)
