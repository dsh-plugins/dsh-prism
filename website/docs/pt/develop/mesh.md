# Mesh e sessões

O coordenador delega sessões por `prism-<nodeId>`. O contrato de provedor atende tanto a execução local quanto a remota.

## Conectar dois nós

Coloque o primeiro bloco `mesh` no coordenador e o segundo no executor. Atribua o mesmo segredo aleatório à variável `PRISM_WORKER_TOKEN` nas duas máquinas. Registre `atlas` com o nó `worker` nos dois lados. O executor resolve o diretório real.

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

Use HTTPS entre dispositivos e autorize o nome do executor no DSH. HTTP em loopback serve para testes locais. Cada nó mantém seu `DSH_HOME`. O coordenador inicia a conexão e recebe por ela as chamadas de ferramentas.

## Ativação e bloqueios

O executor verifica novamente a identidade, o projeto, o modelo e as permissões. Em um conflito de bloqueio de escrita, cria um fork do histórico observável, publica o novo vínculo de forma atômica e registra o arquivamento da sessão original. Processos concorrentes consultam o vínculo vencedor.

## Consultar uma tarefa remota

A consulta autorizada lê a sessão pelo mesmo enlace sem bloqueio de escrita. Mantenha os diretórios de estado ao reiniciar. Após uma falha de conexão, consulte o estado antes de repetir uma operação com efeitos externos.

[Interfaces de desenvolvimento](/pt/develop/api) · [dsh-mesh-node](https://github.com/dsh-plugins/dsh-mesh-node)
