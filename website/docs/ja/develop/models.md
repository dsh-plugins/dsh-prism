# モデルとプロジェクト

Prism は**モデルの選択権**と**実体パスの解決権**を分離し、実行時の柔軟なルーティングとホスト側での厳格なアクセス制御を両立しています。

## 階層別モデルプール

**Settings → Prism/Configuration**（または `prism.config.json` の `orchestrator.models`）で、**L1**・**L2**・**L3** ごとに利用可能なモデルを設定できます。未設定の層は DSH のデフォルトモデルに従います。

- `id` と任意の `provider`：モデル ID と DSH プロバイダーを指定します。
- `description`：上位層が `list_models` で読み取る能力サマリーです。
- `prompt` と `promptMode`：`"append"`（既定）はロール指示に追記し、`"replace"` はシステムプロンプト全体を置き換えます（ツール権限は拡大しません）。

**L1** モデルはユーザーが自由に選び、**L2** と **L3** は上位エージェントが動的に選択します。

同じモデルを複数の層で使う場合は、すべての層で同じ説明とプロンプトを設定します。説明にはモデルの能力や適した用途を記載し、プロンプトには層や個別タスクに依存しない指針を記載します。[モデルの説明とプロンプト](../../guide/model-metadata.md)を参照してください。

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "example-model",
  "models": {
    "L1": [{ "id": "example-model", "description": "範囲が明確なタスクに適しています。", "promptMode": "append", "prompt": "簡潔で自然な言葉を使ってください。" }],
    "L2": [{ "id": "example-model", "description": "範囲が明確なタスクに適しています。", "promptMode": "append", "prompt": "簡潔で自然な言葉を使ってください。" }],
    "L3": [{ "id": "example-model", "description": "範囲が明確なタスクに適しています。", "promptMode": "append", "prompt": "簡潔で自然な言葉を使ってください。" }]
  }
}
```

## ワークスペース検出とレジストリ

1. **DSH 自動検出**：サイドバーで開いたローカルフォルダーをネイティブ UUID と表示名で自動登録します（既定権限は `read`・`glob`・`grep`、オーナーおよび承認済み IM ユーザーが利用可能）。
2. **明示的レジストリ（`registry`）**：`id`・`description`・`stack`・`nodeId`・`workspace`・`principals`・`permissions`（任意の `gitRemote`）を定義し、同一ノード・パスの自動検出設定に優先します。

`query_projects` は認可済みメタデータのみを L1 に返し、物理パスは信頼されたホストコード内でのみ解決されます。

次へ：[ロールと権限](/ja/develop/layers) · [Mesh とセッション](/ja/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
