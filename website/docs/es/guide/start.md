# Inicio rápido

Con Prism no hace falta ir saltando de una carpeta a otra: pides lo que necesitas en un único chat y él consulta varios proyectos a la vez para entregarte el resumen. Puedes ver la guía ilustrada paso a paso en [inglés](/guide/start) o en [chino](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Instala los cinco plugins

En DSH, abre **Plugins → Add plugin** e instala uno por uno los paquetes de la tabla. Pulsa **Enable now** tras cada instalación antes de pasar al siguiente:

| Orden | Paquete y versión |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.0` |

El orquestador se inicia al habilitar Mesh.

> [!TIP]
> Si **Prism** no aparece en la barra lateral justo después de activar los cinco plugins, recarga la pestaña del navegador.

### Memoria a largo plazo y disparadores de eventos (opcional) {#optional-plugins}

Después de habilitar los cinco complementos principales, instala los paquetes que necesites en el mismo perfil de DSH. La memoria permite guardar información y adjuntar archivos multimedia. Los disparadores añaden recordatorios programados y eventos externos.

En **Plugins → Add plugin**, introduce el nombre exacto del paquete y su versión y elige **Enable now**. También puedes usar los siguientes comandos para el perfil `web`.

```sh
dsh plugin --profile web add "@dsh-prism/dsh-memory@0.2.0"
dsh plugin --profile web add "@dsh-prism/dsh-triggers@0.2.0"
```

## 2. Conecta tu modelo y añade tus proyectos

1. Ve a **Settings → Models → Add model provider → Custom model API**, elige **OpenAI Responses**, introduce tu endpoint, clave API y el modelo `deepseek-v4.1-flash`, y selecciónalo en el chat de DSH.
2. En la barra lateral, pulsa **Add workspace** y abre las carpetas de tus proyectos (por ejemplo, `harbor-books` y `lantern-cafe`). Prism detecta automáticamente los espacios locales por su nombre.
3. Si quieres ajustar qué modelos usa cada etapa (**L1 Conversación**, **L2 Planificación**, **L3 Ejecución**), ábrelo en **Settings → Prism/Configuration**.

## 3. Lanza la consulta y revisa el resultado

Abre **Prism** en la barra lateral y pídele que revise la hora, el lugar y la persona responsable en el `README.md` de ambos proyectos. Prism mostrará tarjetas de progreso en la conversación y responderá con el resumen final cuando termine.

Si en algún momento quieres comprobar exactamente qué archivos leyó, pulsa **DeepSeek Harness** arriba y abre el historial de solo lectura dentro de cada proyecto.

Siguiente: [La conversación](/es/guide/chat) · [Mensajería](/es/guide/im)
