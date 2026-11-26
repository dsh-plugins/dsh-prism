# Mesh とセッション

コーディネーターは `prism-<nodeId>` を通じてセッションを委譲します。ローカルでもリモートでも同じインターフェースを使います。

## 2 台のノードを接続する

最初の `mesh` 設定を制御側に、次をワーカーに記述します。両方の `PRISM_WORKER_TOKEN` に同じランダムな秘密値を設定します。両側にノード ID `worker` のプロジェクト `atlas` を登録し、実際のディレクトリはワーカーが解決します。

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

端末間には HTTPS を使い、ワーカーのホスト名を DSH に許可します。ループバックでは HTTP で試せます。`DSH_HOME` はノードごとに独立しています。接続は制御側から開始し、同じ経路でツール呼び出しを受け取ります。

## 起動とロック競合

ワーカーは呼び出し元、プロジェクト、モデル、権限を再確認します。書き込みロックが競合したら、観測できた履歴から新規セッションを Fork し、論理バインドを原子的に差し替え、元セッションをアーカイブ対象にします。複数の更新が競合した場合は確定したバインドを再確認します。

## リモート履歴の閲覧

認可済みの履歴取得は書き込みロックを取らずに同じリンクを通ります。再起動時は両側の状態ディレクトリを維持してください。通信が切れたら、データを変更する操作を繰り返す前にタスク状態を確認します。

[開発者向け API](/ja/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
