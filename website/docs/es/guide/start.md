# Inicio rápido

Puedes probar Prism con dos carpetas de proyecto en el mismo equipo. La guía ilustrada muestra el recorrido completo en DeepSeek Harness 0.2.3-alpha.2. [Guía en inglés](/guide/start) · [Guía en chino](/zh/guide/start)

1. Abre el gestor de complementos de DSH. Introduce uno por uno los cinco paquetes npm de la tabla. Instala y activa cada uno antes de añadir el siguiente.
2. En los ajustes de modelos añade un proveedor de API personalizado. Elige OpenAI Responses e introduce la URL del proveedor, tu clave y el ID de modelo `deepseek-v4.1-flash`.
3. Abre las dos carpetas como espacios de trabajo de DSH. Elige el nuevo proveedor y su modelo en un chat de DSH.
4. Abre **Prism** en la barra lateral de DSH. Pide una tarea para cada espacio de trabajo y que se consulte el README de cada uno para obtener la hora, el lugar y la persona responsable del evento.
5. La tarjeta muestra la hora y el estado de la tarea. Vuelve a DSH con **DeepSeek Harness** y abre el historial de ejecución de solo lectura en el espacio de trabajo correspondiente. Compara la respuesta con ambos README.

## Paquetes para el gestor de complementos

| Orden | Paquete y versión |
| --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` |
| 2 | `@dsh-prism/dsh-mesh-node@0.1.1` |
| 3 | `@dsh-prism/dsh-orchestrator@0.1.2` |
| 4 | `@dsh-prism/dsh-im-gateway@0.1.2` |
| 5 | `@dsh-prism/dsh-concierge-ui@0.1.2` |

[La conversación](/es/guide/chat) · [Modelos y proyectos](/es/develop/models)
