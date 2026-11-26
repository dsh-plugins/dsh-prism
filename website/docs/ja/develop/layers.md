# ロールと権限

各ロールは正式な DSH セッションで動作し、Subagent Provider インターフェースを公開します。ホストがツールの列挙時と呼び出し時に権限を検査します。

| ロール | 役割と権限の範囲 |
| --- | --- |
| **L1** | 既定プロジェクトで利用者と対話します。許可されたメタデータを検索し、対象プロジェクトと L2 モデルを選びます。ファイル操作や端末実行の権限はありません。 |
| **L2** | L1 が選んだプロジェクトで計画を作り、L3 モデルを選びます。手順ごとにツール権限を絞り、直接の親・子とメッセージを交換します。 |
| **L3** | 親と同じノード、同じワークスペースで手順を実行します。利用できるネイティブツールはロール、プロジェクト、親からの許可で制限されます。 |

## メッセージと完了通知

ユーザーに表示する返信は `send_user` で明示的に送信します。通常のモデル出力はセッション内に残ります。`send_parent` と `send_child` は受信側をキュー経由で起動します。親は `get_progress` を使えます。終了時には親に `task_settled` が届きます。

| ロール | 調整用ツール |
| --- | --- |
| L1 | `query_projects`, `list_models`, `dispatch_planner`, `send_child`, `get_progress`, `send_user` |
| L2 | `list_models`, `dispatch_executor`, `send_parent`, `send_child`, `get_progress`, `report_progress` |
| L3 | `send_parent`, `report_progress` |

カードの状態更新と対話の返信は別々に届きます。完了イベントを受けた L1 が通知の要否を判断します。`list_models` で次の階層のモデル紹介を確認できます。

[モデルとプロジェクト](/ja/develop/models) · [Mesh とセッション](/ja/develop/mesh) · [dsh-orchestrator](https://github.com/dsh-plugins/dsh-orchestrator)
