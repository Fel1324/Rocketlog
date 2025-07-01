# 🚀 Rocketlog

API para gerenciamento de entregas de encomendas, desenvolvida com Node.js, Express, TypeScript, Prisma e PostgreSQL.

## ✨ Funcionalidades

- Cadastro e autenticação de usuários (com roles: `customer` e `sale`)
- Criação e listagem de entregas
- Atualização de status das entregas (`processing`, `shipped`, `delivered`, `canceled`)
- Logs detalhados de cada entrega
- Controle de acesso por autenticação JWT e autorização por perfil
- Validação de dados com Zod

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) (testes automatizados)
- [Docker](https://www.docker.com/) (para banco de dados)

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/rockectlog.git
cd rockectlog
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env-example`:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rocketlog?schema=public
JWT_SECRET=sua_chave_secreta
```

### 4. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Execute as migrations do Prisma

```bash
npx prisma migrate deploy
```

### 6. Rode o servidor em modo desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3333](http://localhost:3333).

## 🧪 Rodando os testes

```bash
npm run test:dev
```

## 📚 Estrutura de Pastas

```
src/
  controllers/
  middlewares/
  routes/
  database/
  utils/
  types/
  tests/
prisma/
  schema.prisma
  migrations/
```

## 📝 Exemplos de Rotas

### Autenticação

- `POST /sessions` — Login do usuário

### Usuários

- `POST /users` — Cadastro de usuário

### Entregas

- `GET /deliveries` — Listar entregas (apenas `sale`)
- `POST /deliveries` — Criar entrega (apenas `sale`)
- `PATCH /deliveries/:id/status` — Atualizar status (apenas `sale`)

### Logs de Entrega

- `GET /delivery-logs/:delivery_id/show` — Visualizar logs (autorização por role)
- `POST /delivery-logs` — Criar log (apenas `sale`)

## 🔒 Autenticação & Autorização

- Utilize o token JWT retornado no login no header `Authorization: Bearer <token>` para acessar rotas protegidas.
- Controle de acesso por role implementado nos middlewares.

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discord.gg/rocketseat)