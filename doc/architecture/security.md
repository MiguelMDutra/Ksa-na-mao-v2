# Security

A segurança da aplicação é construída utilizando diferentes estratégias, cada uma responsável por proteger uma parte específica do sistema. Atualmente, as principais tecnologias utilizadas são Bcrypt, Brevo e JWT.

## Bcrypt

O Bcrypt é utilizado para realizar o hash das senhas dos usuários antes de armazená-las no banco de dados.

A escolha foi motivada pela facilidade de integração e pela segurança oferecida pelo algoritmo. Além disso, o Bcrypt utiliza um salt durante o processo de hash, dificultando ataques baseados em tabelas pré-computadas e a identificação de senhas iguais por meio dos hashes armazenados.

## Brevo

Embora o Brevo não seja propriamente uma ferramenta de segurança, ele desempenha um papel importante na verificação de posse dos endereços de e-mail utilizados na aplicação.

O sistema utiliza o serviço para enviar mensagens de verificação, permitindo confirmar se o usuário possui acesso ao endereço de e-mail informado durante determinadas operações.

Dessa forma, é possível adicionar uma camada extra de proteção a ações que exigem a confirmação do controle sobre o e-mail cadastrado.

## JWT

O JWT (JSON Web Token) foi escolhido como mecanismo de autenticação da aplicação.

Sua utilização permite gerar tokens que carregam informações necessárias para identificar e autenticar usuários durante suas requisições.

A escolha também levou em consideração a facilidade de implementação, a familiaridade com a tecnologia e sua flexibilidade para acompanhar o crescimento do projeto.

Quando implementado corretamente, utilizando algoritmos adequados, validação de assinatura e controle de expiração, o JWT oferece uma solução eficiente para autenticação baseada em tokens.

## Autorização

O sistema utiliza as informações extraídas do JWT para identificar o usuário responsável por cada requisição.

Após a validação do token pelo middleware, informações como `userId` e `role` são disponibilizadas para as próximas etapas do fluxo.

Com esses dados, as operações podem considerar a identidade e as permissões do usuário que realizou a requisição, permitindo aplicar regras de acesso aos recursos da aplicação.

Dessa forma, o sistema consegue verificar, por exemplo, se um usuário possui permissão para modificar determinado estoque ou se uma operação está restrita a administradores.

## Proteção de rotas

A proteção das rotas é realizada principalmente por meio de middlewares. O mais utilizado na aplicação é o `verify`.

Sua responsabilidade é extrair o token JWT presente no header da requisição e validar sua autenticidade. Após a validação, o middleware extrai informações como `userId` e `role`, disponibilizando-as para as próximas etapas do processamento.

Caso o token esteja ausente, seja inválido ou não possa ser validado, a requisição é interrompida e o cliente recebe uma resposta HTTP `401 Unauthorized`.

Esse mecanismo impede que requisições não autenticadas avancem para as operações protegidas da aplicação.
