# Estagi.ON

Estagi.ON é uma plataforma web cuja finalidade é aproximar estudantes universitários de empresas que oferecem vagas de estágio e oportunidades iniciais de trabalho. O objetivo é reduzir o atrito no processo seletivo, centralizando anúncios, padronizando perfis e facilitando a comunicação entre candidatos e recrutadores.

**Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git

---

## Alunos integrantes da equipe

- Gustavo Albuquerque Lourenço Mattos de Castro
- Arthur Moraes Braga Araujo
- Enzo Fernandes Alcantra
- Juan Pedro Marques Faria
- Arthur Gabriel de Oliveira Fonseca Santos
- Pedro Arthur de Sena Ribeiro

## Professores responsáveis

- Caroline Rhaian da Silva Jandre
- Danilo de Quadros Maia Filho
- Diego Augusto de Faria Barros

---

## 1. Visão geral do projeto

Atualmente, há grande fragmentação e dificuldade na comunicação direta entre estudantes que buscam sua primeira oportunidade profissional e empresas que oferecem vagas de estágio. Plataformas generalistas (como LinkedIn) e portais variados dificultam a filtragem específica para estágios, resultando em candidaturas fora do perfil e em longos processos de triagem para recrutadores.

O Estagi.ON busca ser uma plataforma dedicada a conectar estudantes e empresas de forma eficiente, com foco em:
- Perfil padronizado do estudante, destacando curso, semestre e competências;
- Ferramentas de busca e filtros inteligentes para encontrar vagas compatíveis;
- Painel de gerenciamento para recrutadores com listas padronizadas de candidatos;
- Sistema de acompanhamento de candidaturas e notificações.

---

## 2. Contexto do projeto

### Problema

Há dificuldade em encontrar vagas de estágio específicas e em comunicar claramente as exigências das empresas. Recrutadores recebem muitos currículos fora do perfil e estudantes têm pouca visibilidade sobre o status de suas candidaturas e feedback.

### Objetivo do projeto

Desenvolver a plataforma Estagi.ON para melhorar a conexão entre estudantes e empresas, centralizando a oferta e busca de vagas e oferecendo funcionalidades que aumentem a assertividade do processo seletivo.

Objetivos específicos:
1. Desenvolver um sistema de filtros avançado (curso, semestre, modelo de trabalho, localização, competências) para ajudar estudantes a encontrar vagas compatíveis.
2. Criar um painel de gerenciamento para recrutadores, simplificando a publicação de vagas e a triagem inicial dos candidatos.
3. Implementar um sistema de recomendações que sugira vagas aos estudantes com base em perfil acadêmico e histórico de candidaturas.

### Justificativa

O estágio é a principal porta de entrada para o mercado de trabalho. Ao reduzir o tempo gasto na busca e triagem, aumentamos as chances de estudantes conseguirem oportunidades e reduzimos custos operacionais para empresas.

### Público-alvo

- Estudantes universitários (18–25 anos), buscando experiências práticas e familiarizados com ferramentas digitais.
- Recrutadores e empresas que precisam otimizar a triagem de candidatos para vagas de estágio.
- Instituições de ensino, que podem usar a plataforma como canal de divulgação de vagas e acompanhamento de alunos.

---

## 3. Product Discovery

### Matriz CSD
- Certezas: estudantes têm dificuldade em encontrar vagas específicas para estágio; empresas perdem tempo com currículos fora do perfil.
- Suposições: um currículo padronizado dentro da plataforma facilita a leitura do recrutador; estudantes preferem candidatar-se rapidamente (com poucos cliques).
- Dúvidas: empresas migrariam para uma plataforma nova em vez de usar serviços já consolidados? Quais campos são realmente indispensáveis para o recrutador ao selecionar estagiários?

### Stakeholders
- Primários: estudantes e recrutadores.
- Secundários: instituições de ensino e gestores técnicos.

### Pesquisa qualitativa (resumo)
Realizamos entrevistas com estudantes e recrutadores para entender canais atuais de busca, dificuldades e necessidades. Entre os principais achados:
- 80% dos estudantes relatam falta de feedback em processos seletivos.
- Recrutadores recebem muitos currículos sem aderência à vaga.
- Simplicidade no cadastro é fator determinante para engajamento.
- Estudantes usam principalmente LinkedIn, Indeed e portais universitários para buscar vagas.

### Personas (resumo)
1. Kaio — estudante de Engenharia de Software, 21 anos, pouco experiência prática; quer oportunidades alinhadas ao curso.
2. Flávia — recrutadora, 34 anos, busca filtros que reduzam triagem manual.
3. Ricardo — coordenador de carreiras, 51 anos, busca integração entre universidade e empresas.

---

## 4. Product Design

### Histórias de usuário
- Como estudante, quero criar um perfil com curso e semestre para que empresas entendam meu nível.
- Como estudante, quero filtrar vagas por modelo de trabalho (remoto/presencial/híbrido).
- Como estudante, quero acompanhar o status das minhas candidaturas.
- Como recrutador, quero publicar vagas com requisitos mínimos e filtrar candidatos por curso e semestre.

### Proposta de valor
Para estudantes: democratização do acesso a vagas de estágio com uma vitrine organizada de oportunidades. Para empresas: maior eficiência na triagem e melhor aderência dos candidatos.

### Requisitos
Requisitos Funcionais (RF):
- RF01: Cadastro de usuários com perfis Estudante e Empresa.
- RF02: Empresas podem criar, editar e excluir vagas.
- RF03: Estudantes visualizam detalhes da vaga e podem candidatar-se.
- RF04: Estudantes acompanham o status das candidaturas.
- RF05: Busca com filtros por curso, semestre, modelo de trabalho e localização.

Requisitos Não Funcionais (RNF):
- RNF01: Interface responsiva para mobile e desktop.
- RNF02: Senhas protegidas com criptografia/algoritmos seguros (ex.: bcrypt).
- RNF03: Tempo de resposta aceitável para buscas (meta: < 2s em condições normais).
- RNF04: Disponibilidade da plataforma (meta: ≥ 99%).

---

## 5. Interface e Experiência

### Fluxo do usuário
Fluxo típico: página inicial → login → painel com vagas recomendadas → detalhes da vaga → candidatura → acompanhamento do status.

### Wireframes e protótipo
Wireframes foram desenhados com foco no minimalismo e na priorização da busca e dos cards de vaga. O protótipo de alta fidelidade foi criado no Figma (link interno nos documentos de design).

---

## 6. Metodologia e Ferramentas

- Editor: Visual Studio Code
- Versionamento: Git e GitHub
- Prototipagem: Figma
- Comunicação: Discord e WhatsApp
- Gerenciamento: Trello/Notion

A equipe adotou práticas ágeis com sprints semanais e um quadro Kanban (To Do, In Progress, Review, Done).

---

## 7. Implementação

A solução proposta é uma aplicação web com arquitetura cliente-servidor. Neste repositório, a pasta `/codigo` contém o código-fonte (front-end e back-end) e a pasta `/docs` contém documentação técnica e links para protótipos.

Tecnologias previstas (exemplo):
- Backend: Node.js (Express) ou similar
- Banco de dados: PostgreSQL / MongoDB (conforme escolha de persistência)
- Frontend: HTML/CSS/JavaScript (ou framework como React)

Observação: verifique os arquivos em `/codigo` para a implementação atual e instruções específicas de execução.

---

## Como executar (exemplo rápido)
Considere estas etapas como um guia geral; consulte a documentação técnica em `/docs` para detalhes precisos do ambiente de desenvolvimento presente neste repositório.

1. Clone o repositório:
```bash
git clone https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git
cd pmg-es-2026-1-ti1-0427200-estagi-on/codigo
```
2. Instale dependências (exemplo Node.js):
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm start
```
4. Acesse a aplicação em http://localhost:3000 (ou conforme instruções em /docs).

---

## Contribuição

Sinta-se à vontade para abrir issues e pull requests. Use o padrão de commits e siga as instruções de contribuição descritas em `/docs` (se houver).

---

## Licença

Defina a licença do projeto no arquivo LICENSE (recomendado: MIT ou outra licença compatível com a instituição).

---

Para mais informações, consulte a documentação em `/docs` e o código-fonte em `/codigo`. Se quiser, eu também posso revisar os arquivos dentro de `/codigo` e ajudar a corrigir eventuais erros no código — quer que eu faça essa verificação agora?