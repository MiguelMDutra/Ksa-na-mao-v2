## Como iniciar o projeto?

**Pré-requisitos:**

- **Node.js:** ambiente necessário para executar a aplicação.
- **npm:** gerenciador de pacotes utilizado para instalar as dependências do projeto.
- **SGBD:** sistema gerenciador de banco de dados compatível com o Sequelize (ex.: PostgreSQL, MySQL etc.).

**Observação:** o SGBD escolhido deve possuir o driver correspondente instalado e suas configurações de conexão devem ser ajustadas de acordo com o ambiente utilizado. Caso opte por um SGBD diferente daquele utilizado durante o desenvolvimento, pode ser necessário realizar adaptações na aplicação.

## Clonando e rodando o servidor

Após clonar o repositório, abra o terminal na pasta raiz do projeto e execute o comando:

_> `npm install`_

Esse comando instalará todas as dependências necessárias para executar o projeto.

Em seguida, execute:

_> `npm run dev`_

Esse comando iniciará o servidor de desenvolvimento, permitindo que você teste os endpoints da API utilizando ferramentas como Postman ou Bruno.

Caso queira executar os testes automatizados end-to-end (E2E), utilize o comando:

_> `npm run test:e2e`_

Ele será responsável por executar a suíte de testes automatizados do projeto.

**Importante:** para que o sistema funcione corretamente na sua máquina, é necessário possuir um arquivo `.env` devidamente configurado. Além disso, o comando `npm run test:e2e` espera que exista um segundo arquivo de configuração, denominado `.env.test`, utilizado durante a execução dos testes.

**Exemplo do arquivo `.env`:**

```env
# Configurações de autenticação
JSONKEY=tokenDoJson

# Configurações do servidor
PORT=3000
NODE_ENV=development

# Configurações do banco de dados
DB_HOST=xxx
DB_PORT=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_DATABASE=xxx

# Configurações da API Brevo
BREVO_API_KEY=chaveDaApiBrevo
```

**Descrição das variáveis:**

- `JSONKEY`: chave utilizada para a geração e validação de tokens JWT.
- `PORT`: porta na qual o servidor será inicializado.
- `NODE_ENV`: ambiente de execução da aplicação (development, test ou production).
- `DB_HOST`: endereço do servidor do banco de dados.
- `DB_PORT`: porta de conexão com o banco de dados.
- `DB_USERNAME`: usuário utilizado para acessar o banco de dados.
- `DB_PASSWORD`: senha do usuário do banco de dados.
- `DB_DATABASE`: nome do banco de dados utilizado pela aplicação.
- `BREVO_API_KEY`: chave de autenticação utilizada para acessar a API da Brevo.

Além disso, é necessário criar uma pasta chamada `config` dentro da pasta `database` e, nela, um arquivo `config.json`, seguindo a estrutura do exemplo abaixo:

```json
{
  "development": {
    "username": "usuario do banco de dados exemplo",
    "password": "senha do banco",
    "database": "nome do banco de dados",
    "host": "endereco do servidor",
    "port": 3000,
    "dialect": "SGBD utilizado exemplo"
  }
}
```

Esse arquivo contém as configurações de conexão com o banco de dados utilizadas pelo Sequelize durante a execução da aplicação. Substitua os valores de exemplo pelas informações correspondentes ao seu ambiente.
