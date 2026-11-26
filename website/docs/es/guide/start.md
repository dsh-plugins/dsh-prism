# Inicio rápido

Empieza con un equipo y un proyecto. Podrás conectar otro dispositivo o un bot después de probar la primera conversación.

## Instalar y arrancar

Necesitas Git, npm y Node.js 24.9 o posterior. El script descarga las revisiones de los cinco complementos que corresponden al repositorio principal. Ejecuta los comandos en una terminal.

El repositorio principal y la documentación son públicos. Para ejecutar el sistema necesitas permiso de lectura de Git en los cinco repositorios privados de plugins. Autentica Git con una cuenta autorizada antes del checkout y continúa en el directorio `runtime/` generado.

```sh
git clone https://github.com/dsh-plugins/dsh-prism.git
cd dsh-prism
node scripts/checkout.mjs
cd runtime
npm ci
npm run build
cp prism.example.json prism.config.json
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

## Conectar un modelo y un proyecto

El ejemplo usa el proveedor de DSH `deepseek-official`. Configura una credencial en DSH o define `DEEPSEEK_API_KEY` en el entorno del proceso. Indica el directorio real en `registry.projects[].workspace`. Las rutas locales relativas se resuelven desde el archivo de configuración.

`orchestrator.defaultProjectId` debe identificar un proyecto autorizado al usuario web. El ejemplo permite leer y buscar. Reinicia el servidor después de editar el JSON.

## Abrir una conversación

Abre el enlace que imprime DSH. El navegador canjea el token por una cookie y abre `/prism`. Pregunta qué proyectos hay y solicita un resultado concreto. Si el mensaje falla, comprueba la credencial, el identificador del modelo y el acceso al proyecto predeterminado.

[La conversación](/es/guide/chat) · [Modelos y proyectos](/es/develop/models)
