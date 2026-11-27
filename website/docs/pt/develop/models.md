# Modelos e projetos

O Prism separa **quem escolhe o modelo** de **quem resolve o caminho físico**, unindo roteamento dinâmico em tempo de execução e controle de acesso no host confiável.

## Catálogos de modelos por camada

Em **Settings → Prism/Configuration** (ou `orchestrator.models` em `prism.config.json`), **L1**, **L2** e **L3** configuram suas listas independentes de modelos. Uma camada vazia segue o padrão do DSH.

- `id` e `provider` opcional: identificam o modelo e o provedor no DSH.
- `description`: resumo de capacidades lido pela camada superior via `list_models`.
- `prompt` e `promptMode`: `"append"` (padrão) acrescenta instruções; `"replace"` substitui o prompt do sistema sem nunca ampliar as permissões de ferramentas.

O usuário escolhe o modelo **L1** livremente; os agentes superiores escolhem **L2** e **L3** dinamicamente.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Triagem e coordenação" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planejamento e verificação" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revisão focada de código", "promptMode": "append", "prompt": "Cite os arquivos revisados." }]
  }
}
```

## Descoberta e registro de espaços

1. **Descoberta automática no DSH**: cada pasta aberta na barra lateral é registrada com seu UUID nativo e nome de exibição (`read`, `glob`, `grep` por padrão para o proprietário e usuários de IM aprovados).
2. **Registro explícito (`registry`)**: define `id`, `description`, `stack`, `nodeId`, `workspace`, `principals`, `permissions` e `gitRemote` opcional, com prioridade sobre os padrões descobertos.

`query_projects` expõe apenas metadados autorizados para L1; caminhos físicos são resolvidos somente no código confiável do host.

Próximo: [Funções e permissões](/pt/develop/layers) · [Mesh e sessões](/pt/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
