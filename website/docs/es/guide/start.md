# Inicio rápido

Con Prism no hace falta ir saltando de una carpeta a otra: pides lo que necesitas en un único chat y él consulta varios proyectos a la vez para entregarte el resumen. Puedes ver la guía ilustrada paso a paso en [inglés](/guide/start) o en [chino](/zh/guide/start) (DeepSeek Harness `0.2.3-alpha.2`).

## 1. Instala los siete plugins

En DSH, abre **Plugins → Add plugin** e instala los siete paquetes de la tabla en el mismo perfil de DSH. Pulsa **Enable now** tras cada instalación antes de pasar al siguiente:

| Orden | Paquete y versión |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.1` |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.2` |
| 6 | `@dsh-prism/dsh-memory@0.3.1` |
| 7 | `@dsh-prism/dsh-triggers@0.2.1` |

<details>
<summary>Compilar el orquestador probado desde el código fuente</summary>

La tabla muestra las versiones del registro npm. Las correcciones de High y Cron se probaron con el orquestador `0.2.2` compilado desde el código fuente. Si tienes acceso de lectura al repositorio del orquestador, genera el archivo y escribe su ruta absoluta en **Plugins → Add plugin** para el elemento 2.

```sh
git clone https://github.com/dsh-plugins/dsh-orchestrator.git
cd dsh-orchestrator
git checkout 6790d2aa019147f977d9fea8d530c8d03cc75ee6
npm ci
npm run build
npm pack
```

</details>

El orquestador se inicia al habilitar Mesh.

> [!TIP]
> Si **Prism** no aparece en la barra lateral justo después de activar los siete plugins, recarga la pestaña del navegador.

### Memoria a largo plazo y disparadores de eventos {#optional-plugins}

La memoria permite guardar información y adjuntar archivos multimedia. Los disparadores añaden recordatorios programados y eventos externos.

Abre **Settings → Prism/Memory → Remote API**. Copia el valor de `EMBEDDINGS_BASE_URL` en **BASE_URL** y el de `EMBEDDINGS_API_KEY` en **API_KEY**. Escribe `BAAI/bge-large-zh-v1.5` en **MODEL_ID** y confirma la vinculación. Tras verificar la conexión e inicializar el modelo, las herramientas de memoria estarán disponibles. Prism vuelve a cargar la vinculación al iniciar DSH.

## 2. Conecta tu modelo y añade tus proyectos

1. Ve a **Settings → Models → Add model provider → Custom model API** y elige **OpenAI Responses**. Copia los valores de `BASE_URL` y `API_KEY` en **Base URL** y **API key**, escribe `deepseek-v4.1-flash` como identificador del modelo y guarda el proveedor.
2. Edita el proveedor. En **Customized settings → Model options** de `deepseek-v4.1-flash`, activa **Reasoning levels**, comprueba que el valor de API del nivel `high` sea `high` y guarda. Selecciona `deepseek-v4.1-flash` y **Effort → High** en el chat de DSH. El orquestador `0.2.2` hereda el esfuerzo de DSH cuando coinciden el proveedor y el ID del modelo.
3. En la barra lateral, pulsa **Add workspace** y abre las carpetas de tus proyectos (por ejemplo, `harbor-books` y `lantern-cafe`). Prism detecta automáticamente los espacios locales por su nombre.
4. En **Settings → Prism/Configuration**, elige los modelos de **L1 Conversación**, **L2 Planificación** y **L3 Ejecución**. Usa la misma descripción y el mismo prompt de los [perfiles de modelo](./model-metadata.md) en todas las etapas donde habilites un modelo. Si `gpt-6.2-sol` está disponible por separado en DSH, puedes seleccionarlo aquí.

## 3. Lanza la consulta y revisa el resultado

Abre **Prism** en la barra lateral y pídele que revise la hora, el lugar y la persona responsable en el `README.md` de ambos proyectos. Prism mostrará tarjetas de progreso en la conversación y responderá con el resumen final cuando termine.

Si en algún momento quieres comprobar exactamente qué archivos leyó, pulsa **DeepSeek Harness** arriba y abre el historial de solo lectura dentro de cada proyecto.

Siguiente: [La conversación](/es/guide/chat) · [Mensajería](/es/guide/im)
