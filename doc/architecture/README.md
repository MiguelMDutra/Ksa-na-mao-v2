# Overview

O **Ksa na mão** é um projeto pensado para pessoas que costumam cozinhar em casa e frequentemente esquecem AQUELE ingrediente que estava faltando. Além de ajudar a resolver esse problema, a aplicação também funciona como uma plataforma de compartilhamento de receitas. Afinal, quem nunca precisou pesquisar no Google aquela receita de bolo de limão?

Entre as principais funcionalidades, podemos destacar:

- **Ingredientes da comunidade:** acesso a ingredientes cadastrados e compartilhados por outros usuários.
- **Criação de ingredientes personalizados:** possibilidade de cadastrar ingredientes específicos, escolhendo se estarão disponíveis para toda a comunidade ou apenas para uso próprio.
- **Gerenciamento de estoque:** criação e organização de estoques para controlar os alimentos disponíveis.
- **Compartilhamento de estoque:** possibilidade de compartilhar estoques com outras pessoas, facilitando a organização dos mantimentos de casa ou até mesmo o planejamento de eventos, como um churrasco.
- **Controle de quantidade mínima:** possibilidade de definir uma quantidade mínima para cada ingrediente. Quando uma receita é preparada e o estoque fica abaixo desse limite, o sistema pode adicionar automaticamente o ingrediente à lista de compras.
- **Lista de compras:** visualização e edição dos itens adicionados automaticamente pelo sistema ou manualmente pelo usuário.

# Arquitetura

A arquitetura escolhida para o projeto foi a **arquitetura modular, utilizando Repositories e Use Cases**.

Como este é um projeto pessoal, a escolha também levou em consideração minhas próprias preferências e a facilidade de organização e manutenção do código. Ter responsabilidades bem definidas facilita identificar onde cada operação está localizada e evita concentrar muitas regras de negócio em uma única camada.

Inicialmente, outra abordagem considerada e até mesmo implementada foi a separação tradicional entre Controllers e Services. Apesar de funcionar bem, senti que essa estrutura poderia facilitar a concentração de muitas responsabilidades dentro dos Services conforme o projeto crescesse.

Por isso, optei por separar as operações em Use Cases, buscando uma divisão mais clara das responsabilidades. A arquitetura modular também se mostrou uma boa escolha, principalmente pela familiaridade que já possuía com essa abordagem.

Vale ressaltar que outras arquiteturas foram analisadas durante o desenvolvimento, mas nenhuma se mostrou tão adequada às minhas preferências e à organização que gostaria de manter no projeto.

# Tecnologias

| Tecnologia    | Responsabilidade                                   |
| ------------- | -------------------------------------------------- |
| **Node.js**   | Ambiente de execução do backend.                   |
| **Express**   | Construção e gerenciamento das rotas HTTP da API.  |
| **Sequelize** | ORM utilizado para interação com o banco de dados. |
| **Bcrypt**    | Hash de senhas para armazenamento seguro.          |
| **JWT**       | Autenticação baseada em tokens.                    |
| **Brevo**     | Serviço utilizado para envio de e-mails.           |

# Estrutura do projeto

Atualmente, o sistema possui dois módulos principais implementados: **User** e **Pantry**.

Entretanto, a arquitetura foi pensada para comportar cinco grandes módulos, cada um com responsabilidades bem definidas. São eles:

- **User:** responsável pelo gerenciamento das informações dos usuários, incluindo cadastro, autenticação, login e gerenciamento de perfil.
- **Pantry:** responsável pelo gerenciamento dos estoques. Aqui ficam as operações de criação, edição e exclusão de estoques, gerenciamento de seus ingredientes e compartilhamento com outros usuários. Também controla as informações relacionadas aos estoques compartilhados.
- **Recipe:** responsável pelo gerenciamento das receitas e dos ingredientes disponíveis no sistema, permitindo que os usuários criem e compartilhem suas próprias receitas e ingredientes.
- **ShoppingList:** responsável pelo gerenciamento das listas de compras, incluindo a adição e remoção de ingredientes, tanto manualmente quanto por meio das regras de controle de estoque.
- **Social:** responsável pelas funcionalidades de interação entre usuários, como comentários, curtidas e sistema de seguidores.

Essa divisão permite que cada módulo concentre as operações relacionadas a um determinado domínio, facilitando a manutenção e a expansão do sistema conforme novas funcionalidades forem desenvolvidas.

# Fluxo de uma requisição

O fluxo de uma requisição começa na **Route**, responsável por direcionar a solicitação para o Controller correspondente.

O **Controller** recebe a requisição e extrai as informações necessárias, organizando os dados que serão enviados para o Use Case.

O **Use Case** é responsável por executar as regras de negócio relacionadas à operação. É nessa camada que as decisões necessárias para a execução da funcionalidade são tomadas.

Caso a operação precise consultar ou modificar informações persistidas, o Use Case utiliza um **Repository**, responsável pelo acesso aos dados.

O Repository realiza a comunicação com os Models do Sequelize, que fazem a interação com o banco de dados.

Após a conclusão da operação, o resultado percorre o caminho de volta até o Controller, que fica responsável por construir e enviar a resposta HTTP ao cliente.
