# クイックスタート

同じマシン上の 2 つのプロジェクトフォルダーを使って、Prism から別々のタスクを依頼できます。画像付きガイドでは DeepSeek Harness 0.2.3-alpha.2 での手順を紹介しています。 [英語の画像付きガイド](/guide/start) · [中国語の画像付きガイド](/zh/guide/start)

1. DSH のプラグイン管理画面で、下表の npm パッケージ名とバージョンを順番に入力します。1 件ずつインストールして有効にしてから次へ進みます。
2. モデル設定でカスタム API プロバイダーを追加します。OpenAI Responses を選び、サービスの URL、API キー、モデル ID `deepseek-v4.1-flash` を入力します。
3. 2 つのフォルダーを DSH のワークスペースとして開きます。DSH のチャットで、追加したプロバイダーとモデルを選択します。
4. DSH のサイドバーで **Prism** を開きます。それぞれのワークスペースにタスクを 1 件ずつ依頼し、各 README からイベントの開始時刻、会場、担当者を調べてもらいます。
5. タスクカードに時刻と状態が表示されます。**DeepSeek Harness** で DSH に戻り、各ワークスペースで実行セッションの読み取り専用履歴を開いて、回答を 2 つの README と照合します。

## プラグイン管理画面に入力するパッケージ

| 順序 | パッケージ名とバージョン |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.3` |

[会話の使い方](/ja/guide/chat) · [モデルとプロジェクト](/ja/develop/models)
