Testes Automatizados da API ServerRest
Este projeto tem como objetivo realizar testes automatizados nas requisições da API ServerRest, utilizando o Cypress com JavaScript. Os testes validam tanto o funcionamento das requisições quanto as regras de negócio e respostas esperadas da API.

🧪 Tecnologias Utilizadas
Cypress

JavaScript

Git + GitHub

🚀 Como executar o projeto

Clone o repositório: git clone https://github.com/JoaoOViana/ServerRestAPIAutomacoes.git

Acesse a pasta do projeto: cd nome-do-repositorio

Instale as dependências: npm install

Execute os testes: npx cypress open

Ou, para executar em modo headless (sem interface): npx cypress run

📋 Funcionalidades testadas
Requisições GET, POST, PUT e DELETE

Validação de status code

Validação de mensagens de erro e sucesso

Regras de negócio específicas implementadas na API ServerRest

📌 Observações
A API ServerRest deve estar disponível e acessível para execução dos testes.

Certifique-se de configurar corretamente os endpoints utilizados nos testes.