# Guia de Implementação - Estagi.ON

> **Documento de Apoio ao README.md**
> 
> Este documento fornece detalhes técnicos sobre a implementação atual do Estagi.ON, que utiliza JSON Server como backend.

---

## 1. Stack Tecnológico Atual

A solução **Estagi.ON** foi desenvolvida utilizando a seguinte arquitetura:

### **Frontend**
- **Linguagem:** HTML5 + CSS3 + JavaScript (ES6+)
- **Framework CSS:** CSS3 puro com variáveis customizadas
- **Requisições HTTP:** Fetch API
- **Armazenamento:** SessionStorage (para autenticação)
- **Sem dependências externas** - Desenvolvido com tecnologias nativas do navegador

### **Backend**
- **Runtime:** Node.js (v14 ou superior)
- **API:** JSON Server (módulo npm)
- **Linguagem:** JavaScript (Node.js)
- **Autenticação:** Simples (email + senha)
- **Banco de Dados:** Arquivo `db.json` (JSON estruturado)

### **Infraestrutura e Deploy**
- **Controle de Versão:** Git + GitHub
- **Ambiente Local:** Node.js + JSON Server
- **Porta Padrão:** 3000 (Frontend e Backend compartilham a mesma porta)

---

## 2. Arquitetura da Aplicação

### Estrutura de Diretórios

```
pmg-es-2026-1-ti1-0427200-estagi-on/
│
├── docs/                              # Documentação
│   ├── README.md                      # Documento principal
│   ├── IMPLEMENTATION_GUIDE.md        # Este arquivo
│   ├── files/                         # Documentos auxiliares (PDFs)
│   └── images/                        # Imagens da documentação
│
├── codigo/                            # Código-fonte (raiz do projeto)
│   ├── index.js                       # Servidor JSON Server
│   ├── package.json                   # Configurações Node.js
│   ├── db/
│   │   └── db.json                    # Base de dados (estruturas de dados)
│   │
│   ├── public/                        # Frontend (arquivos estáticos)
│   │   ├── index.html                 # Página principal (dashboard)
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── global.css         # Estilos globais
│   │   │   │   ├── sidebar.css        # Estilos da navegação
│   │   │   │   └── (outros arquivos .css)
│   │   │   ├── js/
│   │   │   │   ├── login.js           # Lógica de autenticação
│   │   │   │   ├── authGuard.js       # Proteção de rotas
│   │   │   │   ├── validation.js      # Validação de formulários
│   │   │   │   └── (outros arquivos .js)
│   │   │   ├── images/
│   │   │   │   ├── logo.png
│   │   │   │   └── (outras imagens)
│   │   │   └── fonts/
│   │   │       └── (fontes customizadas)
│   │   │
│   │   └── pages/
│   │       ├── login/
│   │       │   ├── index.html
│   │       │   └── style.css
│   │       ├── listagem-vagas/
│   │       │   ├── index.html
│   │       │   ├── estilo.css
│   │       │   └── script.js
│   │       ├── cadastro-vagas/
│   │       │   ├── index.html
│   │       │   ├── style.css
│   │       │   └── script.js
│   │       ├── perfil/
│   │       │   ├── index.html
│   │       │   └── style.css
│   │       └── (outras páginas)
│   │
│   └── README.md                      # Instruções do backend

└── README.md                          # Arquivo raiz do repositório
```

---

## 3. Estrutura do Banco de Dados (db.json)

O arquivo `db/db.json` contém toda a estrutura de dados da aplicação em formato JSON:

### **Coleções Principais:**

```json
{
  "estudantes": [
    {
      "id": 1,
      "nome": "Kaio Borges",
      "email": "kaio@example.com",
      "senha": "senha123",
      "curso": "Engenharia de Software",
      "semestre": 5,
      "instituicao": "PUC Minas",
      "habilidades": ["JavaScript", "React", "Node.js"],
      "bio": "Apaixonado por tecnologia"
    }
  ],
  "empresas": [
    {
      "id": 1,
      "nome": "Tech Company",
      "email": "contato@techcompany.com",
      "senha": "empresa123",
      "cnpj": "12.345.678/0001-90",
      "area": "Tecnologia",
      "descricao": "Empresa de desenvolvimento de software"
    }
  ],
  "vagas": [
    {
      "id": 1,
      "titulo": "Estagiário de Desenvolvimento Backend",
      "descricao": "Buscamos estagiários para trabalhar com Node.js...",
      "empresa_id": 1,
      "requisitos": ["Node.js", "JavaScript", "SQL"],
      "curso_alvo": "Engenharia de Software",
      "semestre_minimo": 3,
      "modelo_trabalho": "híbrido",
      "localizacao": "Belo Horizonte, MG",
      "salario": "R$ 1.500,00",
      "data_publicacao": "2026-06-01",
      "data_encerramento": "2026-07-01",
      "ativa": true
    }
  ],
  "candidaturas": [
    {
      "id": 1,
      "vaga_id": 1,
      "estudante_id": 1,
      "data_candidatura": "2026-06-15",
      "status": "em_avaliacao",
      "feedback": null
    }
  ],
  "notificacoes": [
    {
      "id": 1,
      "usuario_id": 1,
      "tipo": "candidatura_aceita",
      "titulo": "Parabéns!",
      "mensagem": "Sua candidatura foi aceita!",
      "data_criacao": "2026-06-20",
      "lida": false
    }
  ]
}
```

---

## 4. API REST - Endpoints JSON Server

O JSON Server gera automaticamente endpoints RESTful para cada coleção:

### **Estudantes**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/estudantes` | Listar todos os estudantes |
| GET | `/estudantes?email=kaio@example.com` | Buscar estudante por email |
| GET | `/estudantes/:id` | Obter detalhes de um estudante |
| POST | `/estudantes` | Criar novo estudante |
| PUT | `/estudantes/:id` | Atualizar estudante |
| DELETE | `/estudantes/:id` | Deletar estudante |

### **Empresas**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/empresas` | Listar todas as empresas |
| GET | `/empresas?email=contato@company.com` | Buscar empresa por email |
| GET | `/empresas/:id` | Obter detalhes de uma empresa |
| POST | `/empresas` | Criar nova empresa |
| PUT | `/empresas/:id` | Atualizar empresa |
| DELETE | `/empresas/:id` | Deletar empresa |

### **Vagas**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/vagas` | Listar todas as vagas |
| GET | `/vagas/:id` | Obter detalhes da vaga |
| GET | `/vagas?curso_alvo=Engenharia de Software` | Filtrar vagas por curso |
| GET | `/vagas?empresa_id=1` | Listar vagas de uma empresa |
| POST | `/vagas` | Criar nova vaga |
| PUT | `/vagas/:id` | Editar vaga |
| DELETE | `/vagas/:id` | Deletar vaga |

### **Candidaturas**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/candidaturas` | Listar todas as candidaturas |
| GET | `/candidaturas?estudante_id=1` | Candidaturas de um estudante |
| GET | `/candidaturas?vaga_id=1` | Candidatos de uma vaga |
| POST | `/candidaturas` | Criar candidatura |
| PUT | `/candidaturas/:id` | Atualizar candidatura |
| DELETE | `/candidaturas/:id` | Deletar candidatura |

### **Notificações**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/notificacoes` | Listar notificações |
| GET | `/notificacoes?usuario_id=1` | Notificações de um usuário |
| POST | `/notificacoes` | Criar notificação |
| PUT | `/notificacoes/:id` | Atualizar notificação |
| DELETE | `/notificacoes/:id` | Deletar notificação |

---

## 5. Fluxo de Autenticação

```
┌──────────────────────────────────────────────────┐
│ 1. Usuário acessa a aplicação                    │
│    → Verifica sessionStorage para usuarioAtivo   │
└────────────┬──────────────────────────────────────┘
             │
     ┌───────▼──────────┐
     │ usuarioAtivo     │
     │ no session?      │
     └───┬────────────┬─┘
     NÃO │            │ SIM
     ┌───▼───┐        │
     │ Login │        │
     └───┬───┘        │
         │            │
  ┌──────▼────────────▼──────────┐
  │ 2. Buscar usuário no JSON    │
  │    GET /estudantes?email=... │
  │    GET /empresas?email=...   │
  └──────┬─────────────────────┘
         │
  ┌──────▼──────────────────────┐
  │ 3. Validar senha             │
  │    (comparação em memória)   │
  └──────┬─────────────────────┘
         │
  ┌──────▼──────────────────────┐
  │ 4. Salvar no sessionStorage: │
  │    usuarioAtivo = {          │
  │      id, nome, email,        │
  │      tipo, ...               │
  │    }                         │
  └──────┬─────────────────────┘
         │
  ┌──────▼──────────────────────┐
  │ 5. Redirecionar para index   │
  │    ou página inicial         │
  └──────┬─────────────────────┘
         │
  ┌──────▼──────────────────────┐
  │ 6. Cada requisição verifica  │
  │    o sessionStorage          │
  │    (proteção via authGuard)  │
  └──────────────────────────────┘
```

### **Arquivo: `assets/js/login.js`**

```javascript
async function processaFormLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById("username").value;
  const senha = document.getElementById("password").value;
  
  // Busca em estudantes
  const estudanteResponse = await fetch(
    `http://localhost:3000/estudantes?email=${email}`
  );
  const estudantes = await estudanteResponse.json();
  
  if (estudantes.length > 0 && estudantes[0].senha === senha) {
    sessionStorage.setItem("usuarioAtivo", JSON.stringify(estudantes[0]));
    window.location.href = "../../index.html";
  } else {
    // Busca em empresas
    const empresaResponse = await fetch(
      `http://localhost:3000/empresas?email=${email}`
    );
    const empresas = await empresaResponse.json();
    
    if (empresas.length > 0 && empresas[0].senha === senha) {
      sessionStorage.setItem("usuarioAtivo", JSON.stringify(empresas[0]));
      window.location.href = "../../index.html";
    }
  }
}
```

---

## 6. Procedimentos de Setup

### **Pré-requisitos**

```bash
# Node.js (verificar versão)
node --version  # v14+

# npm (gerenciador de pacotes)
npm --version

# Git (controle de versão)
git --version
```

### **Instalação e Execução**

#### **Passo 1: Clone o repositório**

```bash
git clone https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git
cd pmg-es-2026-1-ti1-0427200-estagi-on/codigo
```

#### **Passo 2: Instale as dependências**

```bash
npm install
```

Isso instalará:
- `json-server` - API RESTful automática
- Outras dependências definidas em `package.json`

#### **Passo 3: Inicie o servidor**

```bash
npm start
```

**Saída esperada:**
```
JSON Server is running em http://localhost:3000
```

#### **Passo 4: Acesse a aplicação**

Abra seu navegador e navegue para:
- **Frontend:** http://localhost:3000
- **API REST:** http://localhost:3000/estudantes (ou outras coleções)

### **Login de Teste**

Use as credenciais padrão do `db.json`:

**Estudante:**
- Email: `kaio@example.com`
- Senha: `senha123`

**Empresa:**
- Email: `contato@techcompany.com`
- Senha: `empresa123`

---

## 7. Estrutura de Componentes e Módulos

### **Frontend - Organização por Página**

#### **1. Login (`pages/login/`)**
- `index.html` - Formulário de login
- `style.css` - Estilos da página
- Integrado com `login.js` para autenticação

#### **2. Dashboard Principal (`public/index.html`)**
- Página inicial após login
- Navegação via sidebar
- Protegido por `authGuard.js`

#### **3. Listagem de Vagas (`pages/listagem-vagas/`)**
- `index.html` - Interface de listagem
- `estilo.css` - Estilos
- `script.js` - Filtros e busca
- Funcionalidades:
  - Busca por título
  - Filtros por curso, semestre, modelo de trabalho
  - Listagem de vagas ativas
  - Candidatura

#### **4. Cadastro de Vagas (`pages/cadastro-vagas/`)**
- `index.html` - Formulário de criação
- `style.css` - Estilos
- `script.js` - Validação e envio
- Apenas para usuários do tipo "empresa"

#### **5. Perfil do Usuário (`pages/perfil/`)**
- Visualizar e editar dados pessoais
- Atualizar informações acadêmicas/empresariais

### **Frontend - Módulos Globais**

#### **`assets/js/authGuard.js`**
- Protege todas as rotas
- Verifica `sessionStorage` para `usuarioAtivo`
- Redireciona para login se não autenticado
- Verifica permissões por tipo de usuário

#### **`assets/js/login.js`**
- Processa autenticação
- Busca usuário na API
- Salva sessão no `sessionStorage`

#### **`assets/js/validation.js`**
- `validarEmail()` - Valida formato de email
- `validarSenha()` - Valida força de senha
- `validarCNPJ()` - Valida CNPJ
- `mostrarErro()` e `limparErro()` - UI de validação

#### **`assets/css/global.css`**
- Variáveis CSS globais (cores, espaçamentos, tipografia)
- Reset e estilos base
- Definições de tema

#### **`assets/css/sidebar.css`**
- Estilos da navegação lateral
- Responsividade

---

## 8. Fluxos de Funcionalidades Principais

### **Funcionalidade 1: Login**

```
1. Usuário acessa /codigo/pages/login/index.html
2. Preenche email e senha
3. JavaScript dispara processaFormLogin()
4. Busca em /estudantes ou /empresas
5. Compara senha (texto plano)
6. Salva no sessionStorage
7. Redireciona para index.html
```

### **Funcionalidade 2: Listar Vagas (Estudante)**

```
1. GET /vagas (lista todas)
2. Aplicar filtros via JavaScript:
   - Curso
   - Semestre mínimo
   - Modelo de trabalho
   - Localização
3. Renderizar cards na página
4. Opção de candidatar-se:
   - POST /candidaturas
   - Cria registro com status "em_avaliacao"
```

### **Funcionalidade 3: Publicar Vaga (Empresa)**

```
1. Empresa preenche formulário
2. Validação JavaScript
3. POST /vagas
4. Nova vaga criada no db.json
5. ID da empresa vinculado
6. Vaga aparece para estudantes
```

### **Funcionalidade 4: Acompanhar Candidatura**

```
1. GET /candidaturas?estudante_id={id}
2. Mostrar lista com status:
   - em_avaliacao
   - aceita
   - recusada
3. Empresa pode atualizar status:
   - PUT /candidaturas/{id}
4. Notificações são criadas automaticamente
```

---

## 9. Desenvolvimento e Manutenção

### **Adicionando Novas Rotas**

1. Crie nova página em `public/pages/nova-rota/index.html`
2. Adicione `authGuard.js` via `<script>`
3. Implemente lógica em arquivo JavaScript separado
4. Chame endpoints JSON Server conforme necessário

### **Adicionando Novos Dados**

1. Edite `db/db.json`
2. Adicione novo objeto à coleção desejada
3. JSON Server detecta mudança automaticamente
4. Novos IDs são gerados automaticamente pelo JSON Server

### **Testando API Localmente**

```bash
# Listar todos os estudantes
curl http://localhost:3000/estudantes

# Buscar estudante por email
curl "http://localhost:3000/estudantes?email=kaio@example.com"

# Criar nova vaga (POST)
curl -X POST http://localhost:3000/vagas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Novo Estágio", "empresa_id":1, ...}'

# Atualizar candidatura (PUT)
curl -X PUT http://localhost:3000/candidaturas/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"aceita"}'
```

---

## 10. Limitações Conhecidas e Considerações Futuras

### **Limitações Atuais**

- ⚠️ **Autenticação:** Senhas armazenadas em texto plano no JSON
- ⚠️ **Segurança:** Sem JWT ou tokens de sessão seguro
- ⚠️ **Escalabilidade:** JSON Server não é adequado para produção em larga escala
- ⚠️ **Concorrência:** Sem locking de dados no db.json

### **Sugestões para Evoluir**

1. **Migrar para Express.js + bcrypt:**
   - Criptografar senhas
   - Implementar JWT
   - Adicionar middlewares de segurança

2. **Integrar Banco de Dados Relacional:**
   - PostgreSQL com Sequelize
   - Migrations automáticas
   - Índices e constraints

3. **Adicionar Validação Completa:**
   - Backend validation (não apenas frontend)
   - Sanitização de inputs
   - Rate limiting

4. **Melhorar UX:**
   - Transições e animações
   - Notificações em tempo real
   - Paginação de resultados

---

## 11. Checklist de Entrega

- [x] Frontend funcional em HTML/CSS/JavaScript puro
- [x] Backend com JSON Server
- [x] Autenticação simples (email + senha)
- [x] CRUD de vagas
- [x] Sistema de candidaturas
- [x] Filtros e buscas
- [x] Proteção básica de rotas
- [x] Responsividade (mobile-friendly)
- [x] Código bem organizado em módulos
- [ ] (Futuro) Testes automatizados
- [ ] (Futuro) CI/CD pipeline
- [ ] (Futuro) Deploy em produção

---

## 12. Referências Técnicas

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Fetch API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [SessionStorage - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [CSS Variables - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [REST API Best Practices](https://restfulapi.net/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Última atualização:** Junho de 2026  
**Responsável:** Equipe Estagi.ON  
**Status:** Documentação refletindo a implementação atual com JSON Server
