# Modelos y proyectos

El registro define los proyectos accesibles. El orquestador configura por separado los modelos y las herramientas nativas de cada rol.

## Modelos por nivel

Este fragmento va en `orchestrator` dentro de `prism.config.json`. Usa modelos disponibles en el proveedor activo. Los identificadores deben ser únicos dentro de cada nivel.

```json
{
  "defaultProjectId": "prism",
  "defaultL1Model": "deepseek-flash",
  "models": {
    "L1": [{ "id": "deepseek-flash", "description": "Atención de solicitudes" }],
    "L2": [{ "id": "deepseek-v4-pro", "description": "Planificación y validación" }],
    "L3": [{ "id": "deepseek-flash", "description": "Revisión puntual de código", "promptMode": "append", "prompt": "Cita los archivos revisados." }]
  }
}
```

## Descripción e instrucciones

`description` indica cuándo debe elegir ese modelo el agente superior. `provider` selecciona un proveedor de DSH; al omitirlo se usa el predeterminado del servidor.

`promptMode: "append"` agrega las instrucciones del rol y del modelo. `"replace"` utiliza `prompt` como instrucción completa del sistema. Los permisos de herramientas siguen bajo control del servidor.

## Acceso a proyectos

Cada entrada incluye `id`, `description`, `stack`, `nodeId`, `workspace`, `principals` y `permissions`; `gitRemote` es opcional. L1 recibe metadatos autorizados. Solo el código de confianza resuelve el directorio físico. En L3 se aplica la intersección de herramientas disponibles, política de proyecto y concesión heredada.

[Roles y permisos](/es/develop/layers) · [dsh-workspace-registry](https://github.com/dsh-plugins/dsh-workspace-registry)
