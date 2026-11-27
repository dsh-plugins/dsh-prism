# ロールと権限

Prism の設計思想はひとことで表せます。**「インフラの複雑さはすべてユーザーから隠し、内部の厳格な境界によって高い自律性と可用性を得る」**という考え方です。

5 つのプラグイン（`dsh-concierge-ui`、`dsh-workspace-registry`、`dsh-orchestrator`、`dsh-mesh-node`、`dsh-im-gateway`）が、厳密に分離された 3 つの階層で連携します。

## 6 つの設計原則

1. **Zero-Workspace UX**：Web と IM から会話できます。Web にはタスクカードが表示され、対象のセッション履歴は DSH ワークスペースで読み取り専用として確認できます。
2. **Strict Isolation**：ユーザーに近い層ほど権限を絞り、コンテキストを清潔に保ちます。**L1** にはファイル操作やシェル実行ツールを一切持たせず、プロンプトインジェクションの拡大と不要なログ汚染を防ぎます。
3. **Silent-by-Default Actor**：L1 の通常テキスト出力は内部思考にとどめ、ユーザーへの可視出力は必ず `send_user` を通します。階層間も永続キューを介した非同期メッセージで連携します。
4. **Self-Describing Routing**：各層が独自のモデルプールと能力紹介（`description`）、プロンプト上書きを持ち、L1/L2 が実行時に `list_models` で最適なモデルを動的に選びます。
5. **Location Transparency**：`dsh-mesh-node` がリモート端末の DSH を標準の `prism-<nodeId>` Subagent Provider として抽象化します。L3 は必ず L2 のワークスペースを継承するため、高頻度のファイル I/O は対象ノード内で完結します。
6. **Virtual Facade & Copy-on-Conflict**：各層は DSH のネイティブセッションで実行されます。書き込みロックが競合すると、新しいセッションを作成し、論理的な対応付けをアトミックに更新します。読み取り専用の履歴は別のセッションに保存されます。

## 3 階層の権限境界

| ロール | ワークスペース | 役割と上限 |
| --- | --- | --- |
| **L1** | 設定されたデフォルトプロジェクト | ユーザー応対、`dsh-workspace-registry` からの認可済みメタデータ参照、対象プロジェクトと L2 モデルの選定。**ファイル／ターミナルツールなし。** |
| **L2** | L1 が指定したプロジェクト | タスク分解、L3 モデルの動的選定、ステップ割当とツール権限のさらなる絞り込み。 L2 は同じ Room の許可されたメンバーにもメッセージを送信できます。 |
| **L3** | **L2 のノードとワークスペースを強制継承** | ローカルで手順を実行。L3 ロール・プロジェクト方針・L2 予算の積集合のみ許可。 |

## 通知と完了イベント

`send_user` のみがユーザーに返信を届けます。`send_parent` / `send_child` は永続キュー経由で相手を起こし、`report_progress` / `get_progress` と終端イベント `task_settled` で非同期の進行を管理します。

| ロール | 調整用ツール |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `agent_spawn`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress`, `peer_send` (Room 内で許可されている場合) |
| L3 | `send_parent`, `report_progress` |

次へ：[モデルとプロジェクト](/ja/develop/models) · [Mesh とセッション](/ja/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
