Autor: Lucas Pereira Monteiro

Email: lucasmonteiro001@gmail.com

DragonFly - Módulo de Endereços
===============================

Ambiente em que foram realizados os testes
--------------------
- OSX ou Unix
- Node 4.4.7
- Npm 4.0.0
- Framework de Desenvolvimento: Meteor 1.4.2.3
    -   Para instalar o Meteor, acessar https://www.meteor.com/install
- Navegadores testados: Google Chrome, Firefox e Safari.
- **Obs:** Para execução em ambientes Windows, é necessário reconfigurar as variáveis de ambiente que se encontram no arquivo *.config* e alterar o comando ```npm start``` que se encontra no *package.json*.

Demonstração de sistema em funcionamento
----------------------------------------

Acessar http://bit.ly/implementacao-lucas

Como executar o sistema
-----------------------
- **Nota**: para mudar a porta de execução, basta editar o arquivo *package.json* e alterar a variável ```port``` para o novo valor.
- **Execução**: para executar, basta rodar o comando 
```npm start``` . Este comando irá instalar todas as dependências, configurar as variáveis de ambiente e executar o meteor na **Porta 3000**.
    - Para visualizar o sistema em execução, basta acessar *http://localhost:3000* ou *http://localhost:[port]* onde [port] é a porta especificado no arquivo de configuração.
 
- **Testes**: para executar os testes, basta executar o comando ```npm test``` .
    - Para visualizar o resultado dos testes, basta acessar *http://localhost:3000* no seu navegador. 

