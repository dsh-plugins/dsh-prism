# クイックスタート

最初は 1 台の端末に 1 件のプロジェクトを登録します。動作を確かめてから他の端末やボットを追加できます。

## インストールと起動

Git、npm、Node.js 24.9 以降を用意します。チェックアウトスクリプトは本体に対応する 5 つのプラグインのリビジョンを取得します。次のコマンドをターミナルで実行してください。

本体のリポジトリとこのドキュメントは公開されています。システムを動かすには、5 つの非公開プラグインリポジトリすべてへの Git 読み取り権限が必要です。チェックアウトの前に権限のあるアカウントで Git の認証を済ませ、生成された `runtime/` で操作を続けます。

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

## モデルとプロジェクトの接続

設定例では DSH の `deepseek-official` を使います。DSH に認証情報を登録するか、実行環境に `DEEPSEEK_API_KEY` を設定します。`registry.projects[].workspace` には対象ディレクトリを指定します。ローカルの相対パスは設定ファイルの位置を基準に解決されます。

`orchestrator.defaultProjectId` には Web 利用者がアクセスできるプロジェクトを指定します。設定例で許可されているのは読み取りと検索です。JSON の編集後はホストを再起動してください。

## 初めての会話

DSH が表示したログインリンクを開きます。トークンが Cookie に交換され、`/prism` が開きます。利用できるプロジェクトを尋ね、具体的な成果物を依頼しましょう。処理に失敗した場合は認証情報、モデル ID、既定プロジェクトへの権限を確認します。

[会話の使い方](/ja/guide/chat) · [モデルとプロジェクト](/ja/develop/models)
