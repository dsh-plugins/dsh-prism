# 開発者向け API

ブラウザーには認証付きの限定 HTTP ルートが公開されます。ホスト内からは同じ所有権検査を行う Cordis サービスを使います。

## Web HTTP

DSH のログイン Cookie を使います。書き込みリクエストは JSON と `X-Prism-Request: 1` を送ります。所有者はサーバーが認証済みの主体から決めます。

| インターフェース | 動作 |
| --- | --- |
| `GET /prism/api/view` | 公開会話と利用可能な L1 モデル。 |
| `GET /prism/api/events` | メッセージとタスクカードの SSE スナップショット。 |
| `POST /prism/api/message` | `text` と安定した `requestId` を送信。 |
| `POST /prism/api/model` | 許可された L1 `modelId` を選択。 |
| `GET /prism/api/trace?task=…` | 所有するタスクのセッションを取得。 |

送信ごとに安定した `requestId` を生成し、応答が不明な場合の再試行では同じ値を使います。SSE 再接続時には最新スナップショットが戻ります。タスクの履歴はユーザーが開いた時に取得します。

## Cordis サービス

| インターフェース | 動作 |
| --- | --- |
| `ctx.prism.view(owner)` | 公開状態を取得する。 |
| `ctx.prism.message(owner, text, requestId?)` | 認証済みのユーザーメッセージをキューに入れる。 |
| `ctx.prism.selectModel(owner, modelId)` | 次に使う対話モデルを変更する。 |
| `ctx.prism.trace(owner, taskId)` | 自分のタスク履歴を読む。 |
| `ctx.prism.subscribe(owner, listener)` | 変更を購読し、返された関数で解除する。 |

`owner` は認証済みチャネルから導きます。レジストリは公開可能なメタデータを返し、ホスト内の `ctx.prismRegistry.resolve` がパスを解決します。

## メッセージングアダプター

`ImTransport` に永続的なチャネルとボットの識別子、送信先の認可、`send` と `edit` を実装します。`ImGateway.receive` の成功後にプラットフォームへ確認を返します。再試行ではイベント ID を維持します。配信と受領記録は別トランザクションになり得ます。

[メッセージアプリ](/ja/guide/im) · [dsh-concierge-ui](https://github.com/dsh-plugins/dsh-concierge-ui) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
