# Modelos e projetos

Abra as pastas de projeto como espaços de trabalho do DSH para que o Prism as detecte. Nas configurações do DSH, abra **Prism/Configuração** e selecione os modelos permitidos para L1, L2 e L3. Uma camada sem modelos selecionados usa o modelo padrão do DSH. Pelo ícone de lápis ao lado do modelo, você pode alterar a descrição e o prompt do modelo para aquela camada. Os exemplos de JSON abaixo são para o inicializador compilado a partir do código-fonte. [Início rápido](/pt/guide/start)

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
