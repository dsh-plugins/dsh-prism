# メッセージアプリ

認証された個別チャットは永続的な L1 の主体に対応します。各チャネルは Web と独立して明示的な返信と状態更新を受け取ります。

## DSH の画面から設定する

Prism の設定を開き、**Messaging channels** から 7 種類のサービスのいずれかを選びます。認証情報、許可するユーザー、ペアリングコード、接続状態を管理できます。飛書／Lark では QR コードによる登録も選べます。DSH の表示言語が日本語の場合、この設定パネルのラベルは英語です。 [英語の画面付きガイド](/guide/im) · [中国語の画面付きガイド](/zh/guide/im)

## ソース版ランチャーでのログインとペアリング

`prism.config.json` の `im` でアダプターを有効にします。QR ログインは制御ホストで実行し、該当アプリでコードを読み取ります。別のユーザーを追加する場合はホストでコードを発行し、そのユーザーがボットとの個別チャットで `/pair CODE` を送信します。

以下は接続方法ごとの例です。`runtime/` で必要なコマンドだけを実行します。`setup` はアダプターを有効化して必要な環境変数を表示し、QR を使わないチャネルでは最初のコードも発行します。ユーザーの追加には `pair` を使います。

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

QR ログインは認証情報をローカルに保存し、確認されたスキャン元を認可します。ペアリングコードの有効期間は 10 分で、1 回だけ使えます。状態パスを変えた場合は CLI に `--config prism.config.json` を渡し、同じ設定で起動します。

## 対応する接続

| プラットフォーム | 接続方法 |
| --- | --- |
| Telegram | Bot API のロングポーリング。`im.telegram.tokenEnv` でトークンを渡し、ユーザーを認可またはペアリングします。既存 webhook は解除します。 |
| WeChat | iLink による個人向け WeChat。ホストで `login wechat` を実行し、スキャンしたアカウントの個別チャットを使います。 |
| Feishu / Lark | `login feishu` で飛書アプリを認証します。プラットフォーム側の権限とメッセージ設定を済ませます。 |
| WeCom | `im.wecom` に企業向けボットの認証情報を設定し、個別チャットでペアリングします。 |
| OneBot | OneBot の個別メッセージを接続し、署名付きイベントを `/prism/im/onebot` に送ります。 |
| QQ | QQ ボットの公式コールバックを `/prism/im/qq` に設定します。ゲートウェイが署名を検証します。 |
| Discord | Discord ボットのダイレクトメッセージを有効にし、DM でペアリングします。 |

## ソース版ランチャーの設定キー

使うチャネルだけを有効化し、秘密情報はコーディネーターの環境変数に設定します。`allowedUserIds` で既知のユーザー ID を事前に許可できます。再起動時は QR 認証情報とペアリングを保存する SQLite ファイルを維持してください。

| プラットフォーム | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

イベントが届かない場合はコールバック URL または外向きの接続を確認します。QQ C2C には返信可能な時間や能動送信の制限があります。以前のカードを編集できないチャネルは新しいメッセージで状態を伝えます。

## チャットコマンド

| インターフェース | 動作 |
| --- | --- |
| `/models` | L1 モデルと能力を一覧表示。 |
| `/model …` | 表示番号か ID でモデルを選択。 |
| `/tasks` | この会話のタスクを一覧表示。 |
| `/inspect …` | ID でタスクを閲覧。 |
| `/language …` | `ja` などの言語コードを設定。 |
| `/pair …` | ワンタイムコードでペアリング。 |

`im.locale` が既定言語です。ユーザーはボットで言語を変更できます。SQLite が配信状態を保存します。配信後、受領記録を書く前に停止した場合は重複して届くことがあります。

[開発者向け API](/ja/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
