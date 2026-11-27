# Modelos y proyectos

Prism separa **quién elige el modelo** de **quién resuelve la ruta física**, combinando enrutamiento dinámico con control estricto de acceso en el host.

## Catálogos de modelos por nivel

En **Settings → Prism/Configuration** (o `orchestrator.models` en `prism.config.json`), **L1**, **L2** y **L3** configuran sus propios modelos. Si un nivel queda vacío, usa el modelo por defecto de DSH.

- `id` y `provider` opcional: Identifican el modelo y proveedor en DSH.
- `description`: Resumen de capacidades que el nivel superior lee con `list_models` para elegir modelo en tiempo de ejecución.
- `prompt` y `promptMode`: `"append"` (por defecto) añade instrucciones; `"replace"` sustituye el prompt del sistema. Nunca amplía los permisos de herramientas del host.

El usuario elige libremente el modelo **L1**; los agentes superiores eligen **L2** y **L3** dinámicamente.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Recepción y coordinación" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planificación y verificación" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revisión puntual de código", "promptMode": "append", "prompt": "Cita los archivos revisados." }]
  }
}
```

## Descubrimiento y registro de espacios

1. **Descubrimiento automático en DSH**: Cada carpeta abierta en la barra lateral se registra con su UUID nativo y nombre visible (por defecto `read`, `glob`, `grep` para el propietario y usuarios de IM aprobados).
2. **Registro explícito (`registry`)**: Define `id`, `description`, `stack`, `nodeId`, `workspace`, `principals`, `permissions` y `gitRemote` opcional, con prioridad sobre los valores descubiertos.

`query_projects` solo expone metadatos autorizados a L1; las rutas reales se resuelven únicamente en el código confiable del host.

Siguiente: [Roles y permisos](/es/develop/layers) · [Mesh y sesiones](/es/develop/mesh) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
