# Mensajería

Un chat privado autenticado se vincula a una identidad L1 persistente. Cada canal recibe mensajes explícitos y actualizaciones independientemente de la web.

## Configuración desde la interfaz de DSH

Abre los ajustes de Prism y elige uno de los siete servicios en **Messaging channels**. Allí puedes gestionar las credenciales, los usuarios permitidos, los códigos de emparejamiento y el estado de conexión. Feishu/Lark también ofrece un registro por QR. Con DSH en español, esta sección de la interfaz usa etiquetas en inglés. [Guía ilustrada en inglés](/guide/im) · [Guía ilustrada en chino](/zh/guide/im)

## Conexión y emparejamiento con el lanzador de código fuente

Activa el adaptador en `im` de `prism.config.json`. Ejecuta el acceso por QR en el coordinador y escanea el código en la aplicación correspondiente. Para otro usuario, emite un código en el servidor y pídele que envíe `/pair CODE` al bot en privado.

Estos comandos son alternativas. Ejecuta el que corresponda desde `runtime/`. `setup` activa el adaptador y muestra las variables de entorno necesarias. En canales sin QR genera el primer código; usa `pair` para añadir otra persona.

```sh
npm run im -- login wechat --config prism.config.json
npm run im -- login feishu --config prism.config.json
npm run im -- setup telegram --config prism.config.json
npm run im -- pair telegram --config prism.config.json
```

El acceso QR guarda credenciales locales y autoriza a quien escaneó el código. Los códigos de emparejamiento son de un uso y duran diez minutos. Si usas otra ruta de estado, pasa `--config prism.config.json` a la CLI y arranca el coordinador con el mismo archivo.

## Canales disponibles

| Plataforma | Conexión |
| --- | --- |
| Telegram | Long polling de la Bot API. Define el token mediante `im.telegram.tokenEnv`, autoriza o empareja al usuario y elimina cualquier webhook existente. |
| WeChat | WeChat personal con iLink. Ejecuta `login wechat` y abre el chat privado de la cuenta verificada. |
| Feishu / Lark | Autoriza la app con `login feishu`. Completa los permisos y configura los mensajes en la plataforma antes del chat privado. |
| WeCom | Configura el bot y sus credenciales en `im.wecom` y empareja al usuario en privado. |
| OneBot | Conecta OneBot para mensajes privados y dirige los eventos firmados a `/prism/im/onebot`. |
| QQ | Registra el callback oficial en `/prism/im/qq`. La pasarela comprueba la firma de QQ. |
| Discord | Habilita los mensajes directos del bot y empareja al usuario en un DM de Discord. |

## Claves de configuración del lanzador de código fuente

Habilita solo los canales que utilices y guarda sus secretos en el entorno del coordinador. `allowedUserIds` autoriza identificadores conocidos de la plataforma. Conserva SQLite tras reiniciar para mantener credenciales QR y emparejamientos.

| Plataforma | JSON | ENV |
| --- | --- | --- |
| Telegram | `im.telegram.tokenEnv` | `TELEGRAM_BOT_TOKEN` |
| WeChat | `im.wechat` | — |
| Feishu / Lark | `im.feishu.domain`, `appId`, `appSecretEnv` | `FEISHU_APP_SECRET` |
| WeCom | `im.wecom.botId`, `secretEnv` | `WECOM_BOT_SECRET` |
| OneBot | `im.onebot.selfId`, `apiBase`, `accessTokenEnv`, `eventSecretEnv` | `ONEBOT_ACCESS_TOKEN`, `ONEBOT_EVENT_SECRET` |
| QQ | `im.qq.appId`, `appSecretEnv` | `QQ_BOT_SECRET` |
| Discord | `im.discord.tokenEnv` | `DISCORD_BOT_TOKEN` |

Si no llegan eventos, revisa el callback o la conexión saliente del canal. QQ C2C limita las ventanas de respuesta y los mensajes proactivos. Algunos canales publican un nuevo estado cuando no pueden editar la tarjeta original.

## Comandos de chat

| Interfaz | Función |
| --- | --- |
| `/models` | Listar modelos L1 y capacidades. |
| `/model …` | Seleccionar por número o identificador. |
| `/tasks` | Listar las tareas de este chat. |
| `/inspect …` | Leer una tarea por ID. |
| `/language …` | Elegir un código de idioma, como `es`. |
| `/pair …` | Canjear el código de emparejamiento. |

`im.locale` establece el idioma inicial. Cada usuario puede cambiarlo en el bot. SQLite conserva el estado de entrega al reiniciar. Una interrupción entre la entrega y el recibo puede producir un duplicado.

[Interfaces de desarrollo](/es/develop/api) · [dsh-im-gateway](https://github.com/dsh-plugins/dsh-im-gateway)
