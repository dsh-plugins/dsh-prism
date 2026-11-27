# Mesh とセッション

Prism は**位置透過なディスパッチ**（`dsh-mesh-node`）と **Copy-on-Conflict によるセッション復旧**を組み合わせ、ローカルでもリモートでも同じ契約で動作し、書き込みロックで停止しないランタイムを実現しています。

## 位置透過なノード抽象化

各ノードは標準の `prism-<nodeId>` Subagent Provider を登録します。コーディネーターはワンタイムのディスパッチ資格情報を発行して呼び出し、対象ノード上の正式な DSH セッション ID を受け取ります。**L1 が L2 のワークスペースを指定し、L3 が L2 のワークスペースを強制継承する**ため、ファイル操作はすべて対象ノード内で完結します。

## 2 台のノードを接続する

1 つ目の `mesh` 設定をコーディネーター（`hub`）に、2 つ目をワーカー（`worker`）に配置し、共通のランダムトークンを `PRISM_WORKER_TOKEN` に設定して双方に `atlas`（`nodeId: "worker"`）を登録します。

```json
{
  "nodeId": "hub",
  "peers": [{ "id": "worker", "url": "https://worker.example.org", "tokenEnv": "PRISM_WORKER_TOKEN" }]
}
```

```json
{
  "nodeId": "worker",
  "incoming": [{ "id": "hub", "tokenEnv": "PRISM_WORKER_TOKEN", "projects": ["atlas"] }]
}
```

デバイス間は HTTPS を使用してください（ループバック HTTP はローカルテスト専用）。各ノードは独自の `DSH_HOME` を保持します。

## Virtual Facade と Copy-on-Conflict

外部からは軽量な Subagent に見えながら、内部では**正式な DSH セッション**として永続化と再開に対応しています。セッション起動時に書き込みロック競合を検知すると、ランナーは観測可能な履歴から即座に新セッションを **Fork** し、論理バインディングを原子的に更新して旧セッションをアーカイブ対象に記録します。

## 永続化とリモート参照

メッセージ・モデル選択・タスク状態・キューは `conversations.sqlite` に、完全な実行ログは DSH セッションに保存されます。認可された `trace` 参照は同じ Mesh 経路でロックを取得せずに読み取ります。

次へ：[開発者向け API](/ja/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
