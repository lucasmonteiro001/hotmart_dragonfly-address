Autor: Lucas Pereira Monteiro

Email: lucasmonteiro001@gmail.com

DragonFly - Módulo de Endereços
===============================

Ambiente em que foram realizados os testes
--------------------
- OSX ou Unix
- Node 4.4.7
    -   Para installar o Node, acessar https://nodejs.org/en/download/
- Npm 4.0.0
- Framework de Desenvolvimento: Meteor 1.4.2.3
    -   Para instalar o Meteor, acessar https://www.meteor.com/install
- Navegadores testados: Google Chrome, Firefox e Safari.
- **Obs:** Para execução em ambientes Windows, é necessário reconfigurar as variáveis de ambiente que se encontram no arquivo *.config* e alterar o comando ```npm start``` que se encontra no *package.json*.

Demonstração de sistema em funcionamento
----------------------------------------
A aplicação também foi hospedada no Digital Ocean, para testar 
acesse: http://bit.ly/implementacao-lucas

Como executar o sistema
-----------------------
- Clonar o projeto e acessar a pasta.
- **Nota**: para mudar a porta de execução, basta editar o arquivo *package.json* e alterar a variável ```port``` para o novo valor.
- **Execução**: para executar, basta rodar o comando 
```npm start``` . Este comando irá instalar todas as dependências, configurar as variáveis de ambiente e executar o meteor na **Porta 3000**.
    - Para visualizar o sistema em execução, basta acessar *http://localhost:3000* ou *http://localhost:[port]* onde [port] é a porta especificado no arquivo de configuração.
 
- **Testes**: para executar os testes, basta executar o comando ```npm test``` .
    - Para visualizar o resultado dos testes, basta acessar *http://localhost:3000* no seu navegador. 
- **Obs**: as variáveis de ambiente contém valores sensíveis (como chaves de aplicação). O ideal é que esses valores não sejam versionados no repositório. Porém, coloquei as chaves no repositório para não precisar passar um arquivo de configuração separado.

Capturas de tela
----------------

Tela inicial
![Tela inicial](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/1.inicio.png)

Tela após login
![Tela após login](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/2_inicio.png)

Tela aposs clicar em obter endereços
![Tela aposs clicar em obter endereços](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/3_apos_obter_enderecos.png)

Tela de visualização de endereçoes parte 1
![Tela de visualização de endereçoes parte 1](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/4_visualizacao.png)

Tela de visualização de endereçoes parte 2
![Tela de visualização de endereçoes parte 2](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/5_visualizacao.png)

Tela de adicionar novo endereço
![Tela de adicionar novo endereço](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/6_adicionar_endereco.png)

Tela para mudar configuração de tabela
![Tela para mudar configuração de tabela](https://raw.githubusercontent.com/lucasmonteiro001/dragonfly-address/master/public/img/7_configuracao_tabela.png)

