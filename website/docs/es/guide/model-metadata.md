---
pageClass: model-metadata
---

# Descripciones y prompts de modelos

En **Settings → Prism/Configuration**, usa la misma descripción y el mismo prompt en todos los niveles donde habilites un modelo (L1, L2 o L3). El agente del nivel superior usa la descripción para elegir un subagente. El prompt establece las preferencias generales de trabajo del modelo.

## `deepseek-v4.1-flash`

Selecciona el esfuerzo de razonamiento **High** (`high`) en el selector de modelos de DSH. Con el orquestador de Prism `0.2.2`, una sesión hereda el esfuerzo de DSH cuando el proveedor y el identificador del modelo coinciden con la selección predeterminada de DSH. Las demás sesiones usan el esfuerzo predeterminado de la ruta del modelo. En `0.2.1`, todas las sesiones usaban el valor predeterminado de su ruta. [Inicio rápido](./start.md)

### Descripción del modelo {#deepseek-description}

```text
Capacidades: De nivel medio, suficientes para resolver tareas puntuales y bien delimitadas. Eficiencia media-alta (rápido, pero con un bajo aprovechamiento de los tokens por turno). Tiende a razonar de más en situaciones complejas. Casos de uso: Cambios en un solo archivo, reescrituras por lotes siguiendo una plantilla establecida, búsquedas específicas y síntesis de información, y revisiones pequeñas de código. Especialidad: Modelo dedicado a crear plugins para DSH (DeepSeek Harness). Cuándo usarlo: Cuando el objetivo y los criterios de aceptación ya estén claros, la tarea no requiera sopesar decisiones entre módulos y la eficiencia sea importante. Si el agente principal usa un modelo ajeno a DeepSeek, da prioridad a este modelo para crear plugins de DeepSeek Harness.
```

### Prompt del modelo {#deepseek-prompt}

```text
Completa la tarea con la máxima eficiencia, sin preocuparte por los costes asociados. Da prioridad a **usar en paralelo** varias herramientas o ejecutar en paralelo varias instrucciones en un mismo turno. En lo posible, **evita las llamadas aisladas a herramientas** y reduce al mínimo los turnos en los que solo ejecutas una instrucción.
```

## `gpt-6.2-sol`

Usa estos valores si `gpt-6.2-sol` está disponible en DSH a través de un proveedor configurado por separado.

### Descripción del modelo {#gpt-description}

```text
Capacidades: Destaca en razonamiento lógico, matemáticas y desarrollo de backend. Su capacidad para mantener una visión de conjunto y diseñar la arquitectura de un proyecto es muy baja. Eficiencia habitual. Casos de uso: Revisar partes concretas del código y resolver problemas que requieren un razonamiento lógico riguroso o matemáticas complejas. Cuándo usarlo: En paralelo para revisiones acotadas centradas en la lógica del código. También para resolver problemas que requieren un razonamiento lógico riguroso o matemáticas complejas.
```

### Prompt del modelo {#gpt-prompt}

```text
Usa un lenguaje preciso y natural. Respeta estrictamente este estilo al responder, redactar documentación o escribir comentarios de código. Indica directamente la operación que vas a realizar o la conclusión técnica que has confirmado. **No añadas explicaciones** sobre lo que no vas a hacer, lo que quedará igual ni cómo piensas dividir o clasificar los resultados. Omite el relato de lo que leíste y de cómo llegaste a la conclusión. Evita empezar con saludos, elogios o una reformulación de la pregunta. Evita cerrar con resúmenes vacíos, eslóganes o descargos sobre los límites de tu intervención.
```
