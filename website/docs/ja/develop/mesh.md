# Mesh とセッション

`dsh-mesh-node` 0.2.1 は、信頼関係のあるデバイスを暗号化された WebRTC データチャネルで接続します。WSS シグナリングサービスが接続を仲介し、リレーが必要な場合は TURN が暗号化されたデータを中継します。

## 位置透過なノード抽象化

コーディネーターは各ノードの DSH Subagent Provider `prism-<nodeId>` を使います。L1 は `agent_spawn` で複数の L2 タスクをまとめて起動し、各プロジェクトを `(nodeId, projectId)` で指定できます。L3 は L2 のワークスペースを引き継ぎます。`room: true` を指定すると、同じバッチ内の許可された L2 タスクが `peer_send` でメッセージを交換できます。

## 2 台のノードを接続する

各デバイスに一意の `nodeId`、個別の DSH プロファイル、Ed25519 鍵を設定します。公開鍵をシグナリングサービスと接続先の `peers[].publicKey` に登録します。`webrtc.signalingUrl` と `webrtc.privateKeyEnv` を設定し、必要に応じて `webrtc.iceServers` に STUN または TURN を追加します。実行ノードの `peers[].projects` で共有プロジェクトを指定します。[設定例と移行手順](https://github.com/dsh-plugins/dsh-prism/blob/main/docs/CONFIG.md)を参照してください。

## Virtual Facade と Copy-on-Conflict

書き込みロックが競合すると、実行側は参照可能な履歴から新しい DSH セッションを作り、論理的な対応付けをアトミックに更新します。閲覧用の履歴は別の読み取り専用セッションに保存されます。

## 永続化とリモート参照

コーディネーターではタスクの状態と結果を確認できます。実行ログ全体を確認するには、実行デバイスでプロジェクトの DSH ワークスペースを開きます。

次へ：[開発者向け API](/ja/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
