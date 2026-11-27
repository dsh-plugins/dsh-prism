# Mesh e sessões

O Prism combina **despacho transparente à localização** (`dsh-mesh-node`) com **recuperação Copy-on-Conflict**, mantendo a orquestração idêntica local ou remotamente e livre de travamentos por bloqueio de escrita.

## Transparência de localização

Cada nó registra um Subagent Provider `prism-<nodeId>`. O coordenador emite um ticket de uso único e recebe o ID de uma sessão formal do DSH no nó de destino. Como **L1 escolhe o espaço de L2** e **L3 herda o espaço de L2**, todas as operações de arquivo permanecem locais no nó proprietário.

## Conectar dois nós

Coloque o primeiro bloco `mesh` no coordenador (`hub`) e o segundo no executor (`worker`), usando o mesmo segredo em `PRISM_WORKER_TOKEN` e registrando `atlas` com `nodeId: "worker"` dos dois lados:

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

Use HTTPS entre máquinas (HTTP loopback apenas para testes locais). Cada nó mantém seu próprio `DSH_HOME`.

## Virtual Facade & Copy-on-Conflict

Por fora são Subagents leves; por dentro são **sessões formais do DSH**. Se a ativação encontrar um conflito de bloqueio de escrita, o executor faz imediatamente um **Fork** do histórico observável para uma nova sessão, atualiza o vínculo atomicamente e marca a antiga para arquivamento.

## Persistência e inspeção remota

`conversations.sqlite` guarda mensagens, modelos, estados e filas; o DSH guarda as transcrições completas. Consultas `trace` seguem pelo mesmo link Mesh sem adquirir bloqueio de escrita.

Próximo: [Interfaces de desenvolvimento](/pt/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
