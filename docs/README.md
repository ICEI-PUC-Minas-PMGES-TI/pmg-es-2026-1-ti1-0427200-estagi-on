# Introdução

Informações básicas do projeto.

* **Projeto:** Estagi.ON
* **Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git
* **Membros da equipe:**
  * Gustavo Albuquerque Lourenço Mattos de Castro 
  * Arthur Moraes Braga Araujo 
  * Enzo Fernandes Alcantra 
  * Juan Pedro Marques Faria
  * Arthur Gabriel de Oliveira Fonseca Santos
  * Pedro Arthur de Sena Ribeiro

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Implementação
8. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/Miro.pdf)

---

## Visão Geral do Projeto

Atualmente, há grande fragmentação e dificuldade na comunicação direta entre estudantes que buscam sua primeira oportunidade profissional e empresas que oferecem vagas de estágio. Plataformas generalistas (como LinkedIn) e portais variados dificultam a filtragem específica para estágios, resultando em candidaturas fora do perfil e em longos processos de triagem para recrutadores.

O **Estagi.ON** busca ser uma plataforma dedicada a conectar estudantes e empresas de forma eficiente, com foco em:
- **Perfil padronizado do estudante**, destacando curso, semestre e competências
- **Ferramentas de busca e filtros inteligentes** para encontrar vagas compatíveis
- **Painel de gerenciamento** para recrutadores com listas padronizadas de candidatos
- **Sistema de acompanhamento** de candidaturas e notificações

---

# Contexto

Estudantes universitários enfrentam dificuldades para encontrar vagas de estágio compatíveis com sua área, devido à dispersão de oportunidades em diferentes plataformas e a dificuldade de encontrá-las rapidamente. A aplicação será feita por meio de um aplicativo que intermediará o estagiário e a empresa.

## Problema

O problema central identificado está na **ineficiência da conexão entre estudantes universitários e empresas no processo de estágio**. Atualmente, as oportunidades estão dispersas em diversas plataformas (LinkedIn, Indeed, portais universitários, etc.), dificultando a filtragem específica para estágios. Isso resulta em:
- **Estudantes:** recebem muitas vagas inadequadas ao seu perfil; falta de feedback em processos seletivos; ansiedade ao usar plataformas genéricas
- **Empresas:** recebem currículos fora do perfil; perdem tempo com triagem manual; processos seletivos lentos e burocráticos


## Objetivos

### Objetivo Geral
Desenvolver um software capaz de **melhorar a conexão entre estudantes universitários e empresas**, buscando reduzir as dificuldades encontradas na busca e oferta de vagas de estágio.

### Objetivos Específicos
1. **Desenvolver um sistema de filtros avançado** (curso, semestre, modelo de trabalho, localização, competências) para ajudar estudantes a encontrar vagas compatíveis
2. **Criar um painel de gerenciamento** para recrutadores, simplificando a publicação de vagas e a triagem inicial dos candidatos
3. **Implementar um sistema de recomendações** que sugira vagas aos estudantes com base em perfil acadêmico e histórico de candidaturas
4. **Analisar as principais dificuldades** enfrentadas por estudantes e empresas no processo de recrutamento de estagiários
5. **Investigar como as plataformas digitais** atuais lidam com a divulgação e seleção de vagas de estágio
6. **Avaliar como a tecnologia** pode tornar o processo de busca e seleção mais eficiente e acessível

## Justificativa

A motivação para desenvolver esta aplicação está na **importância dos estágios para a formação acadêmica e profissional dos estudantes**, além das dificuldades enfrentadas na busca por oportunidades. O estágio é a principal porta de entrada para o mercado de trabalho. 

Ao reduzir o tempo gasto na busca e triagem, aumentamos as chances de:
- **Estudantes** conseguirem oportunidades compatíveis com seu perfil acadêmico
- **Empresas** receberem candidatos mais bem alinhados com suas necessidades
- **Instituições de ensino** acompanharem melhor a empregabilidade de seus alunos

## Público-Alvo

Os principais usuários são:

1. **Estudantes universitários** (18–25 anos)
   - Buscam experiências práticas e familiarizados com ferramentas digitais
   - Procuram praticidade, rapidez e acompanhamento claro do processo seletivo
   - Precisam de oportunidades alinhadas ao seu curso e semestre

2. **Recrutadores e Empresas**
   - Profissionais de recursos humanos ou gestores responsáveis por processos seletivos
   - Utilizam sistemas digitais para divulgação de vagas
   - Buscam processos de contratação rápidos e menos burocráticos, especialmente PMEs (Pequenas e Médias Empresas)
   - Procuram melhor eficiência na triagem de candidatos

3. **Instituições de Ensino**
   - Coordenadores de carreiras e empregabilidade
   - Podem usar a plataforma como canal de divulgação de vagas
   - Acompanham a inserção dos alunos no mercado de trabalho

---

# Product Discovery

## Etapa de Entendimento

![](images/matriz.csd.png)
![](images/mapa.stackeholders.png.png)

### 1. Mapa de Stakeholders
O mapa organiza os envolvidos no ecossistema do projeto em três níveis de proximidade e influência:
- **Pessoas Fundamentais (Centro):** São os usuários diretos e principais afetados pelo problema. Estudantes universitários e o empregador.
- **Pessoas Importantes (Círculo Intermediário):** São entidades que facilitam ou dificultam a viabilidade da solução. Faculdade, empresas e cursos.
- **Pessoas Influenciadoras (Círculo Externo):** São órgãos ou contextos que devem ser consultados por questões regulatórias ou de mercado. Ministério do Trabalho, opiniões públicas, indicadores econômicos.

### 2. Matriz de Alinhamento CSD

**Certezas (O que já sabemos)**
- A concorrência para vagas de entrada é extremamente alta
- Existem vagas de estágio que exigem experiência prévia irrealista
- A legislação exige vínculo ativo entre estagiário e instituição de ensino
- A maioria das empresas não fornece feedback aos candidatos reprovados
- Estudantes têm dificuldade em encontrar vagas específicas para estágio
- Empresas perdem tempo com currículos fora do perfil

**Suposições (O que achamos, mas não temos certeza)**
- Plataformas genéricas (como LinkedIn) geram ansiedade em alunos do início do curso
- Universitários têm dificuldade em criar currículos sem ter experiência profissional
- Pequenas e médias empresas (PMEs) precisam de processos de contratação rápidos e menos burocráticos
- Um currículo padronizado dentro da plataforma facilita a leitura do recrutador
- Estudantes preferem candidatar-se rapidamente (com poucos cliques)

**Dúvidas (O que ainda não sabemos)**
- Quais canais os estudantes mais usam para buscar vagas hoje?
- O que os recrutadores realmente valorizam em quem não tem experiência?
- Quais seriam os filtros essenciais para o sistema?
- As empresas estariam dispostas a migrar para uma plataforma nova e exclusiva para universitários?

## Etapa de Definição

### Personas

![](images/Persona1.png)
![](images/Persona2.png)
![](images/Persona3.png)

**PERSONA 1: Kaio Borges (Estudante Universitário)**

Kaio Borges, 21 anos, é um estudante universitário que atualmente se encontra desempregado e busca sua primeira oportunidade de estágio em Engenharia de Software. Possui perfil curioso, autodidata e proativo, além de boa comunicação.

Seu principal objetivo é ingressar no mercado de trabalho por meio de um estágio que lhe permita adquirir experiência prática e desenvolver habilidades técnicas e comportamentais. Enfrenta dificuldades em encontrar vagas alinhadas ao seu nível de experiência e sofre com a falta de feedback em processos seletivos.

**PERSONA 2: Flávia Martin (Recrutadora / Empresa)**

Flávia Martin, 34 anos, atua na área de Recursos Humanos e é responsável por processos de recrutamento e seleção em sua empresa. Possui perfil comunicador, exigente e cauteloso, prezando por eficiência.

Seu principal objetivo é atrair candidatos qualificados e estruturar programas de estágio que contribuam para o crescimento da empresa. Enfrenta dificuldades relacionadas ao alto volume de candidaturas inadequadas e à dificuldade de encontrar candidatos com o perfil desejado rapidamente.

**PERSONA 3: Ricardo Mendes (Coordenador Acadêmico)**

Ricardo Mendes, 51 anos, é coordenador de carreiras e empregabilidade, com vasta experiência no acompanhamento de estudantes em sua inserção no mercado de trabalho. Possui perfil diplomático, empático e organizador.

Seu principal objetivo é facilitar o acesso dos alunos a oportunidades de estágio de qualidade, além de acompanhar seu desenvolvimento profissional. Enfrenta desafios relacionados à falta de integração entre universidade e empresas, e à dificuldade de acompanhar o progresso dos alunos nos processos seletivos.

---

# Product Design

Nessa fase, transformamos os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada item de funcionalidade e documentando as decisões de design.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

![](images/Hist.usuario.jpg)

### 1. Perfil de Coordenação
- **Eu como:** Coordenador de carreiras universitárias
- **Preciso de:** Ter acesso a um banco de talentos com perfis completos dos alunos, incluindo projetos acadêmicos, habilidades e histórico de formação
- **Para:** Indicar estudantes mais preparados às empresas e aumentar as chances de contratação dos universitários

### 2. Perfil de Empregabilidade
- **Eu como:** Responsável pela empregabilidade dos estudantes
- **Preciso de:** Visualizar um dashboard com o progresso dos alunos nos processos seletivos de estágio
- **Para:** Entender em qual etapa os candidatos estão e oferecer orientações para melhorar suas chances de aprovação

### 3. Perfil de Integração Institucional
- **Eu como:** Coordenador de carreiras da universidade
- **Preciso de:** Uma plataforma que conecte diretamente empresas e universitários da instituição
- **Para:** Facilitar a divulgação de vagas de estágio e aproximar o mercado de trabalho dos alunos

### 4. Histórias de Usuário Adicionais
- Como **estudante**, quero criar um perfil com curso e semestre para que empresas entendam meu nível
- Como **estudante**, quero filtrar vagas por modelo de trabalho (remoto/presencial/híbrido)
- Como **estudante**, quero acompanhar o status das minhas candidaturas
- Como **recrutador**, quero publicar vagas com requisitos mínimos e filtrar candidatos por curso e semestre

## Proposta de Valor

![](images/prop.valor.1.png)
![](images/prop.valor.2.png)
![](images/prop.valor.3.png)

### 1. Kaio Borges (Estudante Universitário)

A proposta de valor para Kaio Borges consiste em oferecer uma **plataforma centralizada e intuitiva** que simplifique a busca por estágios, eliminando a dispersão de vagas em múltiplos canais. O sistema oferece:
- Filtros específicos para estágios (curso, semestre, modelo de trabalho)
- Recomendações personalizadas baseadas em seu perfil
- Acompanhamento claro do status das candidaturas
- Maior acesso a oportunidades alinhadas ao seu nível de experiência

### 2. Flávia Martin (Recrutadora / Empresa)

Para Flávia Martin, a proposta de valor está na **otimização do processo de recrutamento** por meio de uma plataforma que:
- Automatiza a triagem de candidatos com filtros inteligentes
- Melhora a precisão na seleção de perfis adequados
- Reduz o tempo investido em análise de currículos inadequados
- Oferece um painel centralizado para gerenciar todas as candidaturas

### 3. Ricardo Mendes (Coordenador Acadêmico)

A proposta de valor para Ricardo Mendes baseia-se na **integração entre universidade, estudantes e empresas**, proporcionando uma ferramenta que:
- Facilita o acompanhamento da empregabilidade dos alunos
- Conecta diretamente empresas com seus estudantes
- Oferece dashboard com métricas de sucesso nos processos seletivos
- Permite orientação direcionada aos alunos em dificuldade

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais (RF)

- **RF01:** Cadastro de usuários com perfis Estudante e Empresa
- **RF02:** Empresas podem criar, editar e excluir vagas
- **RF03:** Estudantes visualizam detalhes da vaga e podem candidatar-se
- **RF04:** Estudantes acompanham o status das candidaturas
- **RF05:** Busca com filtros por curso, semestre, modelo de trabalho e localização
- **RF06:** Sistema de notificações para atualizações de candidaturas
- **RF07:** Perfil de usuário com informações acadêmicas e competências
- **RF08:** Dashboard para visualização de progresso e estatísticas

### Requisitos Não Funcionais (RNF)

- **RNF01:** Interface responsiva para mobile e desktop
- **RNF02:** Senhas protegidas com criptografia/algoritmos seguros (ex.: bcrypt)
- **RNF03:** Tempo de resposta aceitável para buscas (meta: < 2s em condições normais)
- **RNF04:** Disponibilidade da plataforma (meta: ≥ 99%)
- **RNF05:** Escalabilidade para suportar crescimento de usuários e dados
- **RNF06:** Segurança de dados com conformidade a regulamentações aplicáveis

## Projeto de Interface

Artefatos relacionados com a interface e a interação do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

- **Login:** A porta de entrada do sistema. Possui um espaço para o logotipo, um texto motivacional à esquerda e, à direita, os campos de entrada para E-mail e Senha, além de botões para "Entrar" e "Criar Conta"

- **Home:** A página principal de navegação. Apresenta uma barra lateral (sidebar) com itens de menu, uma barra de busca ou filtro no topo e uma área central organizada em cards que listam as vagas disponíveis

- **Menu:** Uma visão detalhada da navegação lateral. Contém seções como "Meu Perfil" e links rápidos para as funções principais do sistema, facilitando o acesso direto a diferentes módulos

- **Perfil:** Área dedicada às informações do usuário. Inclui um espaço para foto de perfil, dados de contato ("Info") e campos para edição de biografia ou competências, permitindo que o aluno mantenha seus dados atualizados

- **Calendário:** Uma tela focada em organização temporal. Exibe uma visualização em grade (estilo mensal ou semanal) para que o usuário acompanhe datas importantes, como prazos de processos seletivos e entrevistas

- **Notícias:** Um feed de atualizações. Organizado com uma área de destaque para a notícia principal e uma lista lateral ou inferior com tópicos relevantes sobre o mercado de trabalho e dicas de carreira

- **Mensagens:** O canal de comunicação direta. Possui uma lista de conversas à esquerda e a janela de chat à direita, permitindo que o estudante interaja com recrutadores ou coordenadores

- **Dashboard:** Uma central de controle visual. Focada em métricas e status, utiliza elementos gráficos e resumos para mostrar o progresso das candidaturas, visualizações de perfil e outras estatísticas

![](images/wireframe1.jpeg)
![](images/wireframe2.jpeg)

### User Flow

![](images/userflow.png)

#### 1. Acesso e Autenticação
O usuário tem dois caminhos primários: realizar o **Login** (caso já possua cadastro) ou **Criar Conta**. Ambas as ações convergem para o Menu principal, que funciona como o hub central de acesso após a autenticação.

#### 2. Navegação e Interação
A partir do Menu, o usuário entra no ecossistema de funcionalidades da plataforma. O fluxo demonstra uma estrutura de Navegação entre telas altamente conectada, permitindo que o estudante transitionne livremente entre:
- **Dashboard:** Para visão geral de progresso
- **Notícias:** Para atualização de mercado
- **Calendário:** Para gestão de prazos e entrevistas
- **Mensagens:** Para comunicação
- **Perfil:** Para gestão de dados pessoais e currículo

#### 3. Encerramento
O fluxo é cíclico e seguro. Independente da tela em que o usuário esteja (Dashboard, Notícias, etc.), ele pode optar pelo **Logout**. Essa ação finaliza a sessão ativa e redireciona o usuário de volta à página de Login.

### Protótipo Interativo

![Protótipo interativo](images/Protótipo-interativo.jpeg)

Acesse o [protótipo interativo no Figma](https://figma.com/) para uma experiência de alta fidelidade da interface.

---

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

**Processo de Design Thinking:** https://miro.com/pt/
- O Miro é uma plataforma de lousa virtual (whiteboard) que permite a colaboração em tempo real. No contexto do Design Thinking, ele funciona como o espaço central para o brainstorming e a estruturação das fases de empatia, definição e ideação

**Repositório de código:** https://github.com/
- O GitHub é uma plataforma de hospedagem de código-fonte que utiliza o sistema de controle de versões Git. Ele serve como o repositório oficial do projeto, onde os arquivos de HTML, CSS e JavaScript (ou outras linguagens) são armazenados e versionados

**Protótipo Interativo:** https://figma.com/
- O Figma é uma ferramenta de design de interface (UI) e experiência do usuário (UX). Ele é utilizado para transformar aqueles esboços manuais (wireframes) em uma versão digital de alta fidelidade, permitindo testes de usabilidade e iterações rápidas

**Editor de Código:** Visual Studio Code
- Editor de código-fonte leve e poderoso, utilizado para desenvolvimento de front-end e back-end com suporte a múltiplas extensões

**Comunicação:** Discord e WhatsApp
- Canais de comunicação para alinhamento da equipe, discussão de tarefas e compartilhamento de atualizações

**Gerenciamento de Tarefas:** Trello/Notion
- Ferramentas para organização de tarefas, sprints e acompanhamento do progresso do projeto

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![Kanban](images/Gerenciamento.png)

O processo de Design Thinking foi aplicado nas etapas iniciais do projeto, com foco na compreensão do problema e das necessidades dos usuários. Foram realizadas atividades de empatia e definição do problema, seguidas por sessões de brainstorming e ideação. 

A equipe adotou **práticas ágeis com sprints semanais** e um quadro Kanban com os seguintes estados:
- **To Do:** Tarefas a serem iniciadas
- **In Progress:** Tarefas em desenvolvimento
- **Review:** Tarefas aguardando revisão
- **Done:** Tarefas concluídas

---

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Contexto Técnico

A solução proposta é uma **aplicação web com arquitetura cliente-servidor**. O repositório contém:
- Pasta `/codigo`: Código-fonte (front-end e back-end)
- Pasta `/docs`: Documentação técnica e links para protótipos

**Tecnologias previstas:**
- **Backend:** Node.js (Express) ou similar
- **Banco de dados:** PostgreSQL / MongoDB (conforme escolha de persistência)
- **Frontend:** HTML/CSS/JavaScript (ou framework como React)

Observação: Verifique os arquivos em `/codigo` para a implementação atual e instruções específicas de execução.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução.

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.

##### Funcionalidade 1 - Cadastro de Usuários e Autenticação

Permite que estudantes e empresas se registrem e façam login na plataforma, com validação de dados e segurança.

* **Estrutura de dados:** [Usuários](#ed_usuarios)
* **Instruções de acesso:**
  * Abra o site e clique em "Criar Conta"
  * Selecione o tipo de usuário (Estudante ou Empresa)
  * Preencha os dados solicitados e confirme
  * Acesse a plataforma com suas credenciais

##### Funcionalidade 2 - Publicação e Gestão de Vagas (Empresas)

Permite que empresas criem, editem e excluam vagas de estágio com descrição, requisitos e filtros.

* **Estrutura de dados:** [Vagas](#ed_vagas)
* **Instruções de acesso:**
  * Abra o site e efetue o login como Empresa
  * Acesse o menu principal e escolha "Gerenciar Vagas"
  * Clique em "Nova Vaga" e preencha os detalhes
  * Salve e a vaga será visível para estudantes

##### Funcionalidade 3 - Busca e Filtro de Vagas (Estudantes)

Permite que estudantes busquem vagas com filtros por curso, semestre, modelo de trabalho e localização.

* **Estrutura de dados:** [Vagas](#ed_vagas)
* **Instruções de acesso:**
  * Abra o site e efetue o login como Estudante
  * Na página Home, use a barra de busca e os filtros disponíveis
  * Clique em uma vaga para visualizar detalhes completos

##### Funcionalidade 4 - Candidatura e Acompanhamento

Permite que estudantes se candidatem a vagas e acompanhem o status de suas candidaturas.

* **Estrutura de dados:** [Candidaturas](#ed_candidaturas)
* **Instruções de acesso:**
  * Visualize uma vaga de seu interesse
  * Clique em "Candidatar-se"
  * Acompanhe o status no Dashboard ou na seção "Minhas Candidaturas"

##### Funcionalidade 5 - Dashboard e Notificações

Oferece uma visão centralizada do progresso das candidaturas e notificações de atualizações.

* **Estrutura de dados:** [Notificações](#ed_notificacoes)
* **Instruções de acesso:**
  * Abra o site e efetue o login
  * Acesse o Dashboard no menu principal
  * Visualize métricas, status de candidaturas e notificações recentes

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) títulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.

##### Estrutura de Dados - Usuários

Registro dos usuários do sistema utilizados para login e para o perfil do sistema.

```json
{
  "id": "eed55b91-45be-4f2c-81bc-7686135503f9",
  "email": "kaio@example.com",
  "login": "kaio.borges",
  "nome": "Kaio Borges",
  "senha": "encrypted_password",
  "tipo": "estudante",
  "perfil": {
    "curso": "Engenharia de Software",
    "semestre": 5,
    "competencias": ["JavaScript", "React", "Node.js"],
    "bio": "Apaixonado por tecnologia..."
  },
  "criado_em": "2026-01-15T10:30:00Z",
  "atualizado_em": "2026-06-20T14:45:00Z"
}
```

##### Estrutura de Dados - Vagas

Dados relacionados às vagas de estágio publicadas.

```json
{
  "id": "vaga-001",
  "titulo": "Estagiário de Desenvolvimento Backend",
  "descricao": "Buscamos estagiários para trabalhar com Node.js e PostgreSQL...",
  "empresa_id": "emp-001",
  "requisitos": ["Node.js", "JavaScript", "SQL"],
  "curso_alvo": "Engenharia de Software",
  "semestre_minimo": 3,
  "modelo_trabalho": "híbrido",
  "localizacao": "Belo Horizonte, MG",
  "salario": "R$ 1.500,00",
  "data_publicacao": "2026-06-01T09:00:00Z",
  "data_encerramento": "2026-07-01T18:00:00Z",
  "ativa": true
}
```

##### Estrutura de Dados - Candidaturas

Registro de candidaturas de estudantes a vagas.

```json
{
  "id": "cand-001",
  "vaga_id": "vaga-001",
  "estudante_id": "est-001",
  "data_candidatura": "2026-06-15T11:20:00Z",
  "status": "em_avaliacao",
  "feedback": null,
  "data_atualizacao": "2026-06-15T11:20:00Z"
}
```

##### Estrutura de Dados - Notificações

Notificações enviadas aos usuários sobre atualizações de candidaturas e vagas.

```json
{
  "id": "notif-001",
  "usuario_id": "est-001",
  "tipo": "candidatura_aceita",
  "titulo": "Parabéns!",
  "mensagem": "Sua candidatura para 'Estagiário de Desenvolvimento Backend' foi aceita!",
  "data_criacao": "2026-06-20T14:00:00Z",
  "lida": false
}
```

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação quanto outras estruturas que foram criadas para algum tipo de configuração.
>
> Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.
>
> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução.

**Frameworks e Bibliotecas:**

* Express - [http://expressjs.com/](http://expressjs.com/) - Framework Node.js para desenvolvimento de APIs REST
* React - [https://react.dev/](https://react.dev/) - Biblioteca JavaScript para construção de interfaces de usuário
* Bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/) - Framework CSS responsivo para front-end

**Ferramentas de Autenticação e Segurança:**

* bcrypt - Biblioteca para criptografia de senhas
* JWT (JSON Web Tokens) - Para autenticação e autorização

**Banco de Dados:**

* PostgreSQL - [https://www.postgresql.org/](https://www.postgresql.org/) - Banco de dados relacional
* MongoDB - [https://www.mongodb.com/](https://www.mongodb.com/) - Banco de dados NoSQL (alternativa)

**Imagens e Ícones:**

* Unsplash - [https://unsplash.com/](https://unsplash.com/) - Banco de imagens de livre uso
* Font Awesome - [https://fontawesome.com/](https://fontawesome.com/) - Biblioteca de ícones

**APIs e Serviços Externos:**

* Gmail API - Para envio de notificações por email
* Google Calendar API - Para integração com calendário (opcional)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas de terceiros.

---

# Como Executar

Considere estas etapas como um guia geral; consulte a documentação técnica em `/docs` e o arquivo README específico em `/codigo` para detalhes precisos do ambiente de desenvolvimento.

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Git
- PostgreSQL ou MongoDB (conforme configuração)

## Passos de Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git
cd pmg-es-2026-1-ti1-0427200-estagi-on
```

### 2. Instale as dependências

**Para o backend:**
```bash
cd codigo/backend
npm install
```

**Para o frontend:**
```bash
cd codigo/frontend
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `/codigo/backend` com as seguintes variáveis:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/estagi_on
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
```

### 4. Inicie o servidor de desenvolvimento

**Backend:**
```bash
cd codigo/backend
npm start
```

O servidor estará disponível em `http://localhost:5000`

**Frontend (em outro terminal):**
```bash
cd codigo/frontend
npm start
```

A aplicação estará disponível em `http://localhost:3000`

### 5. Acesse a aplicação

Abra seu navegador e navegue até `http://localhost:3000` para acessar a aplicação.

## Build para Produção

```bash
# Frontend
cd codigo/frontend
npm run build

# Backend
cd codigo/backend
npm run build
```

---

# Contribuição

Sinta-se à vontade para abrir **issues** e **pull requests**. Por favor, siga estas orientações:

1. **Crie uma branch** para sua feature ou correção: `git checkout -b feature/nome-da-feature`
2. **Faça commits claros** com mensagens descritivas
3. **Abra um Pull Request** descrevendo as mudanças realizadas
4. **Aguarde revisão** de um membro da equipe

Para mais detalhes, consulte as instruções de contribuição em `/docs` (se houver).

---

# Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

# Referências

As referências utilizadas no trabalho foram:

**LinkedIn:** [https://www.linkedin.com/](https://www.linkedin.com/)
- O LinkedIn é a rede social profissional mais popular do mundo, com diversos recursos para conectar trabalhadores que buscam emprego a empresas que anunciam vagas.

**Indeed:** [https://www.indeed.com/](https://www.indeed.com/)
- Portal de emprego que agrega vagas de diversas plataformas e oferece recursos para candidatos e recrutadores.

**Coursera - Design Thinking:** [https://www.coursera.org/](https://www.coursera.org/)
- Cursos sobre metodologia de Design Thinking e inovação em produtos.

**W3Schools - JSON:** [https://www.w3schools.com/js/js_json_intro.asp](https://www.w3schools.com/js/js_json_intro.asp)
- Introdução e documentação sobre JSON para desenvolvimento web.

**MDN Web Docs - JSON:** [https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)
- Documentação detalhada sobre trabalho com JSON em desenvolvimento web.

---

**Para mais informações**, consulte a documentação completa em `/docs` e o código-fonte em `/codigo`. Se tiver dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.
