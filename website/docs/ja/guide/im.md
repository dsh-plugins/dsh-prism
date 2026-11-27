# メッセージアプリ

普段使っているメッセージアプリを Prism に接続すると、プライベートチャットから直接依頼を送り、完了結果を受け取れます。

DSH のオーナーとして **Settings → Prism/IM** を開き、**Add IM** からプラットフォームを選びます。保存したアカウントはカードとして表示され、設定の編集や接続のオン／オフを切り替えられます。初めてボットにメッセージを送った人は **Pending approvals** に表示されます。（[英語の画像ガイド](/guide/im) · [中国語の画像ガイド](/zh/guide/im)）

Feishu/Lark 以外は、カードを区別しやすいよう **Username** を入力してください。**Save settings** で保存し、認証情報や QR ログインの準備ができたら **Enable channel** で接続を開始します。

## 対応プラットフォーム

- **Telegram**：`@BotFather` の **Bot token** を入力して保存し、有効化します。既存の Webhook がある場合は先に Telegram 側で解除してください。
- **WeChat**：**Account registration** の **Generate QR code** を押し、WeChat でスキャンして保存・有効化します。
- **Feishu / Lark**：**QR binding → Generate QR code** でボットを連携／作成するか、**Manual binding** で **Service**・**App ID**・**App secret** を入力します（開発者コンソールでダイレクトメッセージイベントを有効化）。その後 **Enable channel** を押します。
- **WeCom**：永続接続に対応した WeCom ボットの **Username**・**Bot ID**・**Bot secret** を入力して保存・有効化します。
- **QQ Bot**：**Username**・**App ID**・**App secret** を入力し、フォームに表示される `/prism/im/qq` のコールバック URL（外部到達可能な HTTPS）を QQ コンソールに設定します。
- **OneBot**：**Username**・**OneBot account ID**・**OneBot HTTP API URL**・**Access token**・**Event-signing secret** を入力し、イベント送信先を `/prism/im/onebot` に向けます。
- **Discord**：**Username** と Discord Developer Portal の **Bot token** を入力して保存・有効化します。

## 初回ユーザーの承認

新しいユーザーから初めてダイレクトメッセージが届くと **Pending approvals** に保留されます。プラットフォーム・ユーザー名・ID を確認し、**Approve**（承認して最初のメッセージを処理）または **Reject** を選択します。

## チャットコマンド

- `/models` — 利用可能な会話モデル一覧
- `/model ID` — 使用モデルの切り替え
- `/tasks` — このチャットのタスク一覧
- `/inspect TASK_ID` — タスクの読み取り専用履歴を表示
- `/language ja` — 返信言語の切り替え

次へ：[会話の使い方](/ja/guide/chat) · [開発者向け API](/ja/develop/api)
