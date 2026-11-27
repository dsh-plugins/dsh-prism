# クイックスタート

Prism を使えば、プロジェクトごとにワークスペースを行き来する必要はありません。1 つのチャットから複数のプロジェクトにまとめて確認を依頼し、結果を整理して受け取れます。画像付きの詳細ガイドは[英語版](/guide/start)および[中国語版](/zh/guide/start)をご覧ください（DeepSeek Harness `0.2.3-alpha.2` 対応）。

## 1. 必須の 7 つのプラグインをインストール

DSH の **Plugins → Add plugin** から、下の表のパッケージを順番にインストールします。1 つインストールしたら **Enable now** を押して有効にしてから次へ進んでください。

| 順序 | パッケージ名とバージョン |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

<details>
<summary>検証済みのオーケストレーターをソースからビルドする</summary>

表は npm レジストリのバージョンです。High と Cron の修正はソースからビルドしたオーケストレーター `0.2.2` で検証しました。リポジトリの読み取り権限がある場合はアーカイブをビルドし、2 番目のプラグインを追加するときに **Plugins → Add plugin** で絶対パスを入力します。

```sh
git clone https://github.com/dsh-plugins/dsh-orchestrator.git
cd dsh-orchestrator
git checkout 6790d2aa019147f977d9fea8d530c8d03cc75ee6
npm ci
npm run build
npm pack
```

</details>

Mesh を有効にするとオーケストレーターが起動します。

> [!TIP]
> 7 つすべてを有効にしてもサイドバーに **Prism** が表示されない場合は、ブラウザーのタブを再読み込みしてください。

### 長期メモリーとイベントトリガー {#optional-plugins}

長期メモリーは情報の保存とメディア添付、トリガーはリマインダーの予約と外部イベントに対応します。

**Settings → Prism/Memory** で **Remote API** を選択します。`BASE_URL` と `API_KEY` の欄にはそれぞれ環境変数 `EMBEDDINGS_BASE_URL` と `EMBEDDINGS_API_KEY` の値を入力し、`MODEL_ID` に `BAAI/bge-large-zh-v1.5` を指定します。接続を確認し、初期化が完了するまで待ちます。初期化後はメモリツールを利用でき、以後 DSH を起動するたびに設定が自動で読み込まれます。

## 2. モデルとプロジェクトを準備

1. **Settings → Models → Add model provider → Custom model API** を開き、**OpenAI Responses** を選択します。環境変数 `BASE_URL` と `API_KEY` の値を入力し、モデル ID に `deepseek-v4.1-flash` を登録します。
2. プロバイダーを編集し、**Customized settings → Model options** で **Reasoning levels** を有効にします。`high` の API 値を `high` にして保存し、DSH チャットでモデルを選んで **Effort → High** を指定します。オーケストレーター `0.2.2` では、プロバイダーとモデル ID が一致すると DSH で選んだ推論レベルが引き継がれます。
3. サイドバーの **Add workspace** から `harbor-books` と `lantern-cafe` などのプロジェクトフォルダーを追加します。Prism は表示名からプロジェクトを認識します。
4. **Settings → Prism/Configuration** で、同じモデルには **L1 会話**、**L2 計画**、**L3 実行** のすべてで同じ説明とプロンプトを設定します。[モデルの説明とプロンプト](./model-metadata.md)を参照してください。`gpt-6.2-sol` は、別途 DSH で利用できる場合に設定します。

## 3. 依頼して結果を確認

サイドバーの **Prism** を開き、両方のプロジェクトの `README.md` から開始時刻・会場・担当者を調べてまとめるよう依頼します。タイムラインにコンパクトなタスクカードが表示され、完了するとまとめの返信が届きます。

どのファイルを実際に読んだか確認したいときは、上部の **DeepSeek Harness** から戻り、各ワークスペースの読み取り専用履歴を開けます。

次へ：[会話の使い方](/ja/guide/chat) · [メッセージアプリ](/ja/guide/im)
