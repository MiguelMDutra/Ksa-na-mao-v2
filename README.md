<h1 align="center">Ksa-na-mão</h1>

O Ksa-na-mão é um projeto que busca facilitar a gestão de alimentos, com a possibilidade de incorporar novas funcionalidades e áreas de atuação no futuro.

Este repositório contém a **segunda versão do projeto**. Desde o início da primeira versão, aprendi muitaaaa coisa sobre desenvolvimento de software e percebi que queria recomeçar, aplicando melhor os conhecimentos adquiridos e dando mais atenção a aspectos que antes eu negligenciava.

Um desses aspectos é a documentação. Por isso, esta versão começa com uma preocupação maior com planejamento, organização e registro das decisões tomadas durante o desenvolvimento.

## Objetivos

O objetivo do Ksa-na-mão é desenvolver um sistema para auxiliar na gestão de alimentos, oferecendo uma maneira organizada de controlar ingredientes, descobrir receitas e acompanhar a validade dos produtos.

Seja para organizar os ingredientes daquele churrasco de sexta-feira, descobrir receitas diferentes sem precisar ficar procurando em vários aplicativos ou lembrar quando o leite está prestes a vencer, o Ksa-na-mão busca reunir tudo isso em um só lugar.

O projeto está sendo desenvolvido com foco em uma estrutura organizada, consistente e preparada para futuras expansões.

## Tecnologias utilizadas

### Linguagem

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Banco de dados e persistência

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![pg](https://img.shields.io/badge/pg-PostgreSQL_Driver-4169E1?style=for-the-badge)
![pg-hstore](https://img.shields.io/badge/pg--hstore-HSTORE-4169E1?style=for-the-badge)

### API e documentação

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Swagger JSDoc](https://img.shields.io/badge/Swagger_JSDoc-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Swagger UI Express](https://img.shields.io/badge/Swagger_UI_Express-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

### Autenticação e segurança

![Bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Configuração e desenvolvimento

![Dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=black)
![Sequelize CLI](https://img.shields.io/badge/Sequelize_CLI-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### Serviços externos

![Brevo](https://img.shields.io/badge/Brevo-0B996E?style=for-the-badge&logo=brevo&logoColor=white)

## Modelagem e arquitetura

A modelagem do sistema é desenvolvida utilizando o (terá foto ainda) [Astah](https://astah.net/).

Os diagramas auxiliam no planejamento da estrutura do sistema, na identificação das entidades e de seus relacionamentos e na compreensão dos requisitos antes e durante a implementação.

A documentação dos diagramas e das decisões de modelagem poderá ser encontrada em [`docs/`](./docs/).

## Endpoints

A documentação dos endpoints será ampliada conforme novas funcionalidades forem implementadas.

Quando disponível, a documentação interativa da API poderá ser acessada pelo Swagger.

## Documentação

A documentação complementar do projeto será organizada no diretório [`docs/`](./docs/), incluindo, conforme necessário:

- Requisitos funcionais e não funcionais.
- Diagramas de modelagem.
- Decisões de arquitetura.
- Convenções de código.
- Decisões técnicas relevantes.

## Configuração e variáveis de ambiente

O projeto utiliza variáveis de ambiente para configurar informações sensíveis e parâmetros de execução.

Arquivos contendo credenciais, tokens ou outras informações sensíveis não devem ser versionados no repositório.

As instruções de configuração poderão ser documentadas futuramente, conforme o projeto estiver preparado para ser executado por terceiros.

## Status do projeto

O projeto está em desenvolvimento. Sua estrutura, funcionalidades e documentação poderão mudar conforme sua evolução.

---

Este README será atualizado conforme o Ksa-na-mão evoluir.
