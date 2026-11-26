# Quick start

Start with one machine and one project. A second device or messaging account can be added after your first conversation.

## Install and start

Install Git, npm and Node.js 24.9 or later. The checkout script fetches the five plugin revisions used together by the hub. Run these commands in a terminal.

The hub and this documentation are public. Running the system requires Git read access to all five private plugin repositories. Authenticate Git using an account that has those grants before running checkout. Continue in the generated `runtime/` directory.

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

## Connect a model and a project

The example uses DSH’s `deepseek-official` provider. Configure a working model credential in DSH or supply `DEEPSEEK_API_KEY` in the host process environment. Set `registry.projects[].workspace` to the target directory. Relative paths on the local node resolve against the configuration file’s directory.

Keep `orchestrator.defaultProjectId` aligned with a project visible to the web owner. The example grants read and search tools. Restart the host after changing the JSON file.

## Open your first chat

Open the login link printed by DSH. The browser exchanges the token for a cookie and opens `/prism`. Ask which projects you can work with, then request a specific deliverable. If your first message shows a processing failure, check the provider credentials, model ID and default project grant.

[The conversation](/guide/chat) · [Models and projects](/develop/models)
