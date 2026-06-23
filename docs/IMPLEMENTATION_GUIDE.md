# Guia de Implementação - Estagi.ON

> **Documento de Apoio ao README.md**
> 
> Este documento fornece detalhes técnicos complementares para a fase de implementação.

---

## 1. Contexto Técnico da Implementação

### Stack Tecnológico Confirmado

A solução **Estagi.ON** foi desenvolvida utilizando a seguinte arquitetura:

#### **Frontend**
- **Framework**: React.js (v18+)
- **Linguagem**: JavaScript (ES6+)
- **Estilo**: CSS3 + Bootstrap 5
- **Gerenciamento de Estado**: Context API / Redux (conforme implementação)
- **Requisições HTTP**: Axios / Fetch API
- **Build Tool**: Webpack (via Create React App)

#### **Backend**
- **Runtime**: Node.js (v14 ou superior)
- **Framework Web**: Express.js
- **Linguagem**: JavaScript (Node.js)
- **Autenticação**: JWT (JSON Web Tokens) + bcrypt
- **Validação**: Joi ou express-validator

#### **Banco de Dados**
- **Banco Relacional**: PostgreSQL (v12+)
- **Alternativa NoSQL**: MongoDB (se adotado)
- **ORM/ODM**: Sequelize (PostgreSQL) ou Mongoose (MongoDB)

#### **Infraestrutura e Deploy**
- **Controle de Versão**: Git + GitHub
- **Hospedagem Backend**: Heroku / AWS / DigitalOcean (a definir)
- **Hospedagem Frontend**: Vercel / Netlify / GitHub Pages
- **Variáveis de Ambiente**: arquivo `.env` + dotenv

---

## 2. Arquitetura da Aplicação

### Estrutura de Diretórios

```
pmg-es-2026-1-ti1-0427200-estagi-on/
│
├── docs/                          # Documentação
│   ├── README.md                  # Documento principal
│   ├── IMPLEMENTATION_GUIDE.md    # Este arquivo
│   ├── files/                     # Documentos auxiliares (PDFs, etc)
│   └── images/                    # Imagens da documentação
│
├── codigo/                        # Código-fonte
│   ├── backend/                   # API Node.js + Express
│   │   ├── src/
│   │   │   ├── config/            # Configurações (DB, JWT, etc)
│   │   │   ├── controllers/       # Controladores (lógica de negócio)
│   │   │   ├── models/            # Modelos de dados (Sequelize/Mongoose)
│   │   │   ├── routes/            # Rotas da API
│   │   │   ├── middleware/        # Middlewares (autenticação, validação)
│   │   │   └── utils/             # Funções auxiliares
│   │   ├── .env.example           # Template de variáveis de ambiente
│   │   ├── package.json
│   │   └── server.js              # Arquivo principal
│   │
│   └── frontend/                  # Aplicação React
│       ├── public/                # Assets estáticos
│       ├── src/
│       │   ├── components/        # Componentes reutilizáveis
│       │   ├── pages/             # Páginas/telas da aplicação
│       │   ├── services/          # Serviços (requisições à API)
│       │   ├── context/           # Context API (estado global)
│       │   ├── styles/            # Arquivos CSS globais
│       │   └── App.jsx            # Componente raiz
│       ├── .env.example
│       ├── package.json
│       └── index.js
│
└── README.md                       # Arquivo raiz do repositório

```

---

## 3. Variáveis de Ambiente

### Backend (.env)

```env
# Configuração do Servidor
PORT=5000
NODE_ENV=development

# Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/estagi_on_db
# Alternativa MongoDB:
# MONGODB_URI=mongodb://usuario:senha@localhost:27017/estagi_on

# Segurança
JWT_SECRET=sua_chave_secreta_super_segura_aqui_mude_em_producao
JWT_EXPIRY=7d

# Encriptação de Senhas
BCRYPT_ROUNDS=10

# CORS
CORS_ORIGIN=http://localhost:3000

# Email (Notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app_google

# APIs Externas (Opcional)
GOOGLE_CALENDAR_API_KEY=sua_chave_api

# Logging
LOG_LEVEL=info
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## 4. Configuração do Banco de Dados

### Migrations (Sequelize - PostgreSQL)

As migrations devem ser criadas na sequência:

1. **Usuários**
```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  login VARCHAR(100) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('estudante', 'empresa', 'admin') NOT NULL,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. **Perfis de Estudante**
```sql
CREATE TABLE perfis_estudante (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  curso VARCHAR(255) NOT NULL,
  semestre INTEGER NOT NULL,
  bio TEXT,
  foto_perfil VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **Perfis de Empresa**
```sql
CREATE TABLE perfis_empresa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  razao_social VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  descricao TEXT,
  logo VARCHAR(255),
  website VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Vagas**
```sql
CREATE TABLE vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES perfis_empresa(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  requisitos TEXT[] NOT NULL,
  curso_alvo VARCHAR(255),
  semestre_minimo INTEGER,
  modelo_trabalho VARCHAR(50), -- remoto, presencial, hibrido
  localizacao VARCHAR(255),
  salario DECIMAL(10, 2),
  data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_encerramento TIMESTAMP,
  ativa BOOLEAN DEFAULT true,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. **Candidaturas**
```sql
CREATE TABLE candidaturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vaga_id UUID NOT NULL REFERENCES vagas(id) ON DELETE CASCADE,
  estudante_id UUID NOT NULL REFERENCES perfis_estudante(id) ON DELETE CASCADE,
  data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'em_avaliacao', -- em_avaliacao, aceita, recusada, desistencia
  feedback TEXT,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(vaga_id, estudante_id)
);
```

6. **Notificações**
```sql
CREATE TABLE notificacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  mensagem TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lida BOOLEAN DEFAULT false
);
```

---

## 5. API REST - Endpoints Principais

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Criar nova conta (estudante/empresa) |
| POST | `/api/auth/login` | Fazer login |
| POST | `/api/auth/logout` | Fazer logout |
| POST | `/api/auth/refresh-token` | Renovar token JWT |
| POST | `/api/auth/password-reset` | Recuperar senha |

### Usuários e Perfis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios/perfil` | Obter perfil do usuário autenticado |
| PUT | `/api/usuarios/perfil` | Atualizar perfil |
| GET | `/api/usuarios/:id` | Obter dados de um usuário |
| DELETE | `/api/usuarios/:id` | Deletar conta |

### Vagas (Estudantes)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/vagas` | Listar vagas (com filtros) |
| GET | `/api/vagas/:id` | Obter detalhes da vaga |
| GET | `/api/vagas/filtrar?curso=X&semestre=Y&modelo=Z` | Filtrar vagas |

### Vagas (Empresas)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/vagas` | Criar nova vaga |
| PUT | `/api/vagas/:id` | Editar vaga |
| DELETE | `/api/vagas/:id` | Deletar vaga |
| GET | `/api/vagas/empresa/:id` | Listar vagas da empresa |

### Candidaturas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/candidaturas` | Candidatar-se a uma vaga |
| GET | `/api/candidaturas/estudante` | Listar candidaturas do estudante |
| GET | `/api/candidaturas/vaga/:id` | Listar candidatos de uma vaga |
| PUT | `/api/candidaturas/:id/status` | Atualizar status (aceita/recusa) |
| DELETE | `/api/candidaturas/:id` | Cancelar candidatura |

### Notificações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/notificacoes` | Listar notificações do usuário |
| PUT | `/api/notificacoes/:id/marcar-lida` | Marcar como lida |
| DELETE | `/api/notificacoes/:id` | Deletar notificação |

---

## 6. Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuário acessa a aplicação                       │
│    → Verifica localStorage para JWT existente       │
└────────────────┬────────────────────────────────────┘
                 │
         ┌───────▼──────────┐
         │ JWT válido?      │
         └───┬──────────┬───┘
         NÃO │          │ SIM
         ┌───▼───┐      │
         │ Login │      │
         └───┬───┘      │
             │          │
      ┌──────▼──────────▼──────────┐
      │ 2. Enviar credenciais      │
      │    POST /api/auth/login    │
      └──────┬─────────────────────┘
             │
      ┌──────▼──────────────────────┐
      │ 3. Backend valida e gera    │
      │    JWT (Header: HS256)      │
      └──────┬─────────────────────┘
             │
      ┌──────▼──────────────────────┐
      │ 4. Frontend armazena JWT    │
      │    no localStorage          │
      └──────┬─────────────────────┘
             │
      ┌──────▼──────────────────────┐
      │ 5. Requisições posteriores  │
      │    incluem JWT no header:   │
      │    Authorization: Bearer... │
      └──────┬─────────────────────┘
             │
      ┌──────▼──────────────────────┐
      │ 6. Backend valida JWT       │
      │    em cada requisição       │
      └────────────────────────────┘
```

---

## 7. Procedimentos de Setup

### Pré-requisitos Globais

```bash
# Node.js (verificar versão)
node --version  # v14+

# npm ou yarn
npm --version

# Git
git --version

# PostgreSQL (local ou remoto)
psql --version
```

### Setup do Backend

```bash
# 1. Navegar para a pasta backend
cd codigo/backend

# 2. Instalar dependências
npm install

# 3. Copiar e configurar .env
cp .env.example .env
# Editar .env com as credenciais reais

# 4. Executar migrations
npm run migrate:up

# 5. Seed do banco (opcional)
npm run seed

# 6. Iniciar servidor
npm start
# Server rodando em http://localhost:5000
```

### Setup do Frontend

```bash
# 1. Navegar para a pasta frontend
cd codigo/frontend

# 2. Instalar dependências
npm install

# 3. Copiar e configurar .env
cp .env.example .env

# 4. Iniciar aplicação
npm start
# App rodando em http://localhost:3000
```

### Testes

```bash
# Backend
cd codigo/backend
npm run test          # Testes unitários
npm run test:e2e      # Testes E2E

# Frontend
cd codigo/frontend
npm run test          # Testes dos componentes
npm run test:coverage # Cobertura de testes
```

---

## 8. Deploy em Produção

### Backend (Heroku)

```bash
# 1. Login no Heroku
heroku login

# 2. Criar app
heroku create estagi-on-api

# 3. Adicionar variáveis de ambiente
heroku config:set JWT_SECRET=sua_chave_secreta
heroku config:set DATABASE_URL=postgres://seu_banco_prod

# 4. Deploy
git push heroku main

# 5. Verificar logs
heroku logs --tail
```

### Frontend (Vercel)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente no dashboard Vercel
# REACT_APP_API_URL=https://estagi-on-api.herokuapp.com/api
```

---

## 9. Checklist de Entrega

- [ ] README.md completo em `/docs`
- [ ] Arquivo `.env.example` no backend
- [ ] Arquivo `.env.example` no frontend
- [ ] Migrations do banco criadas e testadas
- [ ] Seeds (dados de exemplo) criados
- [ ] API funcional em desenvolvimento
- [ ] Frontend conectado à API
- [ ] Testes unitários implementados
- [ ] Documentação de API (Swagger/OpenAPI)
- [ ] Script de inicialização única (`npm run setup`)
- [ ] GitHub com commits regulares e mensagens descritivas
- [ ] Vídeo de apresentação publicado no YouTube
- [ ] PDF gerado do README.md

---

## 10. Referências Técnicas

- [Express.js Documentation](https://expressjs.com/)
- [React Official Docs](https://react.dev/)
- [Sequelize ORM](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Design Guidelines](https://restfulapi.net/)
- [Heroku Deployment Guide](https://devcenter.heroku.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Última atualização:** Junho de 2026
**Responsável:** Equipe Estagi.ON

