# Início rápido

Comece com uma máquina e um projeto. Depois da primeira conversa, você pode conectar um segundo dispositivo ou um bot.

## Instalar e iniciar

Instale Git, npm e Node.js 24.9 ou superior. O script de checkout busca as revisões dos cinco plugins correspondentes ao repositório principal. Execute os comandos em um terminal.

O repositório principal e esta documentação são públicos. Para executar o sistema, você precisa de acesso Git de leitura aos cinco repositórios privados dos plugins. Autentique o Git com uma conta autorizada antes do checkout e prossiga no diretório `runtime/` gerado.

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

## Conectar modelo e projeto

O exemplo usa o provedor DSH `deepseek-official`. Configure uma credencial válida no DSH ou defina `DEEPSEEK_API_KEY` no ambiente do processo. Informe o diretório real em `registry.projects[].workspace`. Caminhos locais relativos são resolvidos a partir do arquivo de configuração.

`orchestrator.defaultProjectId` deve indicar um projeto autorizado para o proprietário Web. O exemplo permite leitura e busca. Reinicie o serviço após editar o JSON.

## Abrir a primeira conversa

Abra o link de acesso exibido pelo DSH. O navegador troca o token por um cookie e abre `/prism`. Pergunte pelos projetos disponíveis e descreva o resultado desejado. Se o processamento falhar, confira a credencial, o ID do modelo e o acesso ao projeto padrão.

[A conversa](/pt/guide/chat) · [Modelos e projetos](/pt/develop/models)
