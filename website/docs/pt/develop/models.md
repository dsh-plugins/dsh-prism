# Modelos e projetos

O registro descreve os projetos acessíveis. O orquestrador configura separadamente os modelos e ferramentas nativas de cada função.

## Configurar cada nível

Coloque este trecho em `orchestrator` dentro de `prism.config.json`. Os IDs devem ser aceitos pelo provedor ativo e únicos em cada nível.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Triagem de solicitações" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planejamento e validação" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revisão de código direcionada", "promptMode": "append", "prompt": "Indique os arquivos revisados." }]
  }
}
```

## Descrição e instrução do sistema

`description` explica quando o agente superior deve escolher aquele modelo. `provider` seleciona o provedor DSH. Quando omitido, vale o provedor padrão do host.

`promptMode: "append"` adiciona as instruções da função e do modelo. `"replace"` usa `prompt` como instrução de sistema personalizada completa. As permissões de ferramentas continuam sob controle do host.

## Acesso a projetos

Cada registro inclui `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` e `permissions`; `gitRemote` é opcional. L1 recebe metadados autorizados. Só o código confiável resolve o diretório físico. Em L3 vale a interseção das ferramentas de execução, política do projeto e delegação do superior.

[Funções e permissões](/pt/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
