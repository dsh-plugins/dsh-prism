# クイックスタート

Prism を使えば、プロジェクトごとにワークスペースを行き来する必要はありません。1 つのチャットから複数のプロジェクトにまとめて確認を依頼し、結果を整理して受け取れます。画像付きの詳細ガイドは[英語版](/guide/start)および[中国語版](/zh/guide/start)をご覧ください（DeepSeek Harness `0.2.3-alpha.2` 対応）。

## 1. 5 つのプラグインをインストール

DSH の **Plugins → Add plugin** から、下の表のパッケージを順番にインストールします。1 つインストールしたら **Enable now** を押して有効にしてから次へ進んでください。

| 順序 | パッケージ名とバージョン |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.0` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.0` |

Mesh を有効にするとオーケストレーターが起動します。

> [!TIP]
> 5 つすべてを有効にしてもサイドバーに **Prism** が表示されない場合は、ブラウザーのタブを再読み込みしてください。

## 2. モデルとプロジェクトを準備

1. **Settings → Models → Add model provider → Custom model API** を開き、**OpenAI Responses** を選択してエンドポイント・API キー・モデル ID（`deepseek-v4.1-flash`）を登録し、DSH チャットで選択します。
2. サイドバーの **Add workspace** から対象プロジェクトのフォルダー（例：`harbor-books` と `lantern-cafe`）を追加します。Prism は表示名から自動でプロジェクトを認識します。
3. 段階ごと（**L1 会話**、**L2 計画**、**L3 実行**）に使用するモデルや説明を調整したい場合は、**Settings → Prism/Configuration** から設定できます。

## 3. 依頼して結果を確認

サイドバーの **Prism** を開き、両方のプロジェクトの `README.md` から開始時刻・会場・担当者を調べてまとめるよう依頼します。タイムラインにコンパクトなタスクカードが表示され、完了するとまとめの返信が届きます。

どのファイルを実際に読んだか確認したいときは、上部の **DeepSeek Harness** から戻り、各ワークスペースの読み取り専用履歴を開けます。

次へ：[会話の使い方](/ja/guide/chat) · [メッセージアプリ](/ja/guide/im)
