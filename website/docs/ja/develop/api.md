# 開発者向け API

外部クライアントは認証付きの限定的な HTTP API から、ホスト内プラグインは同じ所有権チェックを備えた Cordis サービスから Prism を利用します。

## Web HTTP API

DSH ログイン Cookie を使用し、書き込みリクエストには JSON と `X-Prism-Request: 1` ヘッダーを付与します。

| インターフェース | 動作 |
| --- | --- |
| `GET /prism/api/view` | 現在の会話スナップショットと許可された L1 モデルを取得。 |
| `GET /prism/api/events` | メッセージとタスクカードの SSE 更新を購読。 |
| `POST /prism/api/message` | `text` と安定した `requestId` を送信。 |
| `POST /prism/api/model` | 次ターン以降の L1 `modelId` を選択。 |
| `GET /prism/api/trace?task=…` | 所有タスクの読み取り専用ログを取得。 |

## Cordis サービス（`ctx.prism`）

| インターフェース | 動作 |
| --- | --- |
| `ctx.prism.view(owner)` | 公開スナップショットを取得。 |
| `ctx.prism.message(owner, text, requestId?)` | 認証済みメッセージをキューに追加。 |
| `ctx.prism.selectModel(owner, modelId)` | 次回以降の L1 モデルを変更。 |
| `ctx.prism.trace(owner, taskId)` | 所有タスクのログを読み取り。 |
| `ctx.prism.subscribe(owner, listener)` | 更新を購読（戻り値の関数で解除）。 |

物理パスは信頼されたホストコード内の `ctx.prismRegistry.resolve` でのみ解決されます。

## ソースランチャーでの IM 設定

パッケージ導入の場合は **Settings → Prism/IM → Add IM** をご利用ください（[利用ガイド](/ja/guide/im)）。ソースランチャー（`runtime/`）では `prism.config.json` の `im` 配下でアダプターを有効化します。

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

QR 認証情報やペアリング状態を維持するため、再起動時もゲートウェイの SQLite ファイルを保持してください。

| プラットフォーム | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

次へ：[メッセージアプリ](/ja/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
