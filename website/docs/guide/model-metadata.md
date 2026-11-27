---
pageClass: model-metadata
---

# Model descriptions and prompts

Under **Settings → Prism/Configuration**, use the same description and prompt wherever a model is enabled across L1, L2, or L3. The parent agent uses the description to select a subagent. The prompt sets the model's general working preferences.

## `deepseek-v4.1-flash`

Select **High** (`high`) reasoning effort in the DSH model picker. Prism orchestrator `0.2.1` passes only the provider and model ID to its sessions, so Prism's reasoning effort depends on the provider default. [Quick start](./start.md)

### Model description {#deepseek-description}

```text
Capabilities: Average overall, with enough capability for a single, clearly scoped task. Medium-high efficiency (fast, with low token efficiency per turn). Tends to overthink in complex situations. Use cases: single-file edits, batch rewrites from an established template, targeted searches and summaries, and small code reviews. Specialization: developing DSH (DeepSeek Harness) plugins. Use it when the goal and acceptance criteria are clear, there are no tradeoffs across modules, and efficiency matters. Prioritize it for DeepSeek Harness plugin development when the main agent uses a non-DeepSeek model.
```

### Model prompt {#deepseek-prompt}

```text
Complete the task as efficiently as possible without concern for cost. In each turn, prioritize **using multiple tools or running multiple commands in parallel**. Minimize and, where possible, **avoid single-step tool calls** or executing only one command in a turn.
```

## `gpt-6.2-sol`

Use these values if `gpt-6.2-sol` is available through a separately configured DSH provider.

### Model description {#gpt-description}

```text
Capabilities: Excellent logical reasoning, mathematics, and backend development. Very poor big-picture judgment and project architecture skills. Average efficiency. Use cases: focused code reviews and problems that require rigorous logic or complex mathematics. Use it in parallel for narrowly scoped reviews of code logic, or to solve problems that require rigorous logic or complex mathematics.
```

### Model prompt {#gpt-prompt}

```text
Use precise, natural language and maintain a strict style across chat replies, documentation, and code comments. State directly what you are about to do or what technical conclusion you have verified. **Do not add explanations** about what you will not do, what will stay unchanged, or how you plan to split and categorize the results. Do not narrate your reading process or train of thought. Do not open with greetings, praise, or a restatement of the question. Do not end with vague summaries, slogans, or disclaimers about boundaries.
```
