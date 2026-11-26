# Início rápido

Você pode testar o Prism com duas pastas de projeto na mesma máquina. O guia ilustrado mostra o fluxo completo no DeepSeek Harness 0.2.3-alpha.2. [Guia em inglês](/guide/start) · [Guia em chinês](/zh/guide/start)

1. Abra o gerenciador de plugins do DSH. Instale e ative os cinco plugins do Prism na ordem indicada no guia ilustrado.
2. Nas configurações de modelos, adicione um provedor de API personalizado. Escolha OpenAI Responses e informe a URL do provedor, sua chave de API e o ID do modelo `deepseek-v4.1-flash`.
3. Abra cada pasta como um espaço de trabalho do DSH. Escolha o novo provedor e o modelo em uma conversa do DSH.
4. Nas configurações do Prism, adicione um projeto por pasta com um ID distinto e o caminho absoluto. Para consultar os arquivos README, bastam as permissões `read`, `glob` e `grep`.
5. Abra o Prism e peça uma tarefa separada para cada projeto. Compare a resposta com os dois arquivos README e consulte a sessão somente leitura pelo cartão da tarefa para conferir o trabalho.

[A conversa](/pt/guide/chat) · [Modelos e projetos](/pt/develop/models)
