# モデルとプロジェクト

DSH の画面からプラグインをインストールした場合、Prism は DSH のチャットで選んだモデルを使います。プロジェクトと権限は Prism の設定で管理できます。以下の JSON はソースから起動する場合の設定例です。[クイックスタート](/ja/guide/start)

レジストリはアクセスできるプロジェクトを記述します。オーケストレーターは各ロールのモデルとネイティブツールを別に設定します。

## 階層ごとに設定する

次の設定は `prism.config.json` の `orchestrator` の中に置きます。利用中のプロバイダーで使えるモデル ID を指定し、同じ階層では重複させません。

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "対話による要件整理" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "計画と検証" }],
    "L3": [{ "id": "deepseek-flash", "description": "対象を絞ったコードレビュー", "promptMode": "append", "prompt": "確認したファイルを明示してください。" }]
  }
}
```

## モデル紹介とシステム指示

`description` には親がそのモデルを選ぶべき場面を書きます。`provider` は DSH プロバイダーの指定です。省略するとホストの既定値を使います。

`promptMode: "append"` はロールとモデルの指示を追加します。`"replace"` は `prompt` を完全なカスタムシステム指示として使います。ツール権限は引き続きホストが検査します。

## プロジェクトの認可

各項目には `id`、`description`、`stack`、`nodeId`、`workspace`、`principals`、`permissions` を設定し、必要なら `gitRemote` を追加します。L1 に返るのは許可されたメタデータだけです。物理パスは信頼されたホストコードが解決します。L3 が使えるのは実行ツール、プロジェクト方針、親の委譲範囲に共通するものです。

[ロールと権限](/ja/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
