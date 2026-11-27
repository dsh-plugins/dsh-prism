---
pageClass: model-metadata
---

# Descrições e prompts dos modelos

Em **Settings → Prism/Configuration**, use a mesma descrição e o mesmo prompt em todas as camadas (L1, L2 e L3) em que um modelo estiver habilitado. O agente da camada superior usa a descrição para escolher um subagente. O prompt define as preferências gerais de trabalho do modelo.

## `deepseek-v4.1-flash`

Selecione o nível de raciocínio **High** (`high`) no seletor de modelos do DSH. O orquestrador do Prism `0.2.1` envia às sessões apenas o provedor e o ID do modelo, de modo que o nível de raciocínio no Prism segue o padrão do provedor. [Início rápido](./start.md)

### Descrição do modelo {#deepseek-description}

```text
Capacidades: desempenho médio, suficiente para tarefas pontuais com escopo bem definido. Eficiência de média a alta (responde rápido, mas aproveita pouco os tokens em cada turno). Em situações complexas, tende a raciocinar além do necessário. Cenários: alterações em um único arquivo, reescrita em lote conforme um modelo definido, busca direcionada e síntese de informações, e pequenas revisões de código. Especialidade: modelo dedicado à criação de plugins do DSH (DeepSeek Harness). Quando usar: quando o objetivo e os critérios de aceitação já estiverem claros, a tarefa não exigir ponderar escolhas entre módulos e a eficiência for importante. Dê preferência a este modelo para desenvolver plugins do DeepSeek Harness quando o agente principal usar um modelo que não seja da DeepSeek.
```

### Prompt do modelo {#deepseek-prompt}

```text
Conclua a tarefa com a máxima eficiência, sem se preocupar com os custos. Em um mesmo turno, priorize o **uso em paralelo** de várias ferramentas ou a execução paralela de várias instruções. Reduza ao mínimo e, sempre que possível, **evite chamadas isoladas** a ferramentas ou a execução de uma única instrução por turno.
```

## `gpt-6.2-sol`

Use os valores abaixo se `gpt-6.2-sol` estiver disponível por meio de outro provedor configurado no DSH.

### Descrição do modelo {#gpt-description}

```text
Capacidades: destaca-se no raciocínio lógico, na matemática e no desenvolvimento de back-end. A visão de conjunto e a capacidade de projetar a arquitetura de um projeto são muito fracas. A eficiência é mediana. Cenários: revisão de trechos de código e resolução de problemas que exijam lógica rigorosa ou matemática complexa. Quando usar: em paralelo para pequenas revisões da lógica do código e para resolver problemas que exijam raciocínio lógico rigoroso ou matemática complexa.
```

### Prompt do modelo {#gpt-prompt}

```text
Use linguagem precisa e natural. Mantenha um controle rigoroso do estilo das respostas em conversas, da documentação e dos comentários no código. Diga diretamente que ações pretende executar ou a que conclusões técnicas já chegou. **Não acrescente explicações** sobre o que você não fará, o que ficará inalterado ou como pretende dividir e classificar os resultados. Não descreva o processo de leitura nem seu percurso de raciocínio. Não comece com cumprimentos, elogios ou uma repetição da pergunta. Não termine com resumos vazios, slogans ou ressalvas sobre os limites da resposta.
```
