# Estagi.ON

O objetivo geral deste trabalho é desenvolver um software capaz de melhorar a conexão entre estudantes universitários e empresas, buscando reduzir as dificuldades encontradas na busca e oferta de vagas de estágio.

**Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-estagi-on.git

## Alunos integrantes da equipe

* Gustavo Albuquerque Lourenço Mattos de Castro
* Arthur Moraes Braga Araujo
* Enzo Fernandes Alcantra
* Juan Pedro Marques Faria
* Arthur Gabriel de Oliveira Fonseca Santos
* Pedro Arthur de Sena Ribeiro

## Professores responsáveis

* Caroline Rhaian da Silva Jandre
* Danilo de Quadros Maia Filho
* Diego Augusto de Faria Barros

---

## 2. Contexto do projeto

### Problema
Atualmente, existe uma grande fragmentação e dificuldade na comunicação direta entre estudantes universitários que buscam a primeira oportunidade de mercado e as empresas que oferecem vagas de estágio. As oportunidades encontram-se dispersas em diversas plataformas genéricas, e tanto estudantes quanto recrutadores enfrentam desafios significativos neste processo.

### Objetivo do projeto
O objetivo geral deste trabalho é desenvolver o software **Estagi.ON**, uma plataforma web dedicada a melhorar a conexão entre estudantes e empresas, centralizando a busca e oferta de vagas de estágio.

Objetivos específicos:
1. Desenvolver um sistema de filtros inteligente para que estudantes encontrem vagas compatíveis com seus cursos e nível de conhecimento.
2. Criar um painel de gerenciamento para recrutadores, simplificando a publicação de anúncios e a triagem inicial dos perfis.
3. Implementar um sistema de recomendações baseado no perfil acadêmico do estudante.

### Justificativa
O estágio é a principal porta de entrada para o mercado de trabalho. A motivação para o Estagi.ON nasce da necessidade de reduzir o atrito nesse processo. Ao otimizar o tempo de busca dos alunos e facilitar a triagem dos recrutadores, a plataforma contribui para uma melhor inserção profissional dos estudantes e maior eficiência nos processos de recrutamento das empresas.

### Público-alvo
O Estagi.ON atende a dois públicos principais:
* **Estudantes Universitários:** Jovens adultos (18 a 25 anos), familiarizados com tecnologia, que possuem conhecimentos teóricos em suas áreas, mas buscam oportunidades práticas. Precisam de facilidade na busca por vagas e clareza nas oportunidades disponíveis.
* **Recrutadores e Empresas:** Profissionais de RH ou gestores de empresas. Buscam ferramentas que otimizem o tempo de seleção, exigindo funcionalidades de fácil gestão de vagas e visualização de candidatos qualificados.

---

## 3. Processo de Product Discovery

### Matriz CSD
* **Certezas:** Estudantes têm dificuldade em encontrar vagas focadas apenas em estágio; Empresas perdem muito tempo triando currículos fora do perfil.
* **Suposições:** Acreditamos que um currículo padronizado dentro da plataforma agiliza a leitura do recrutador; Estudantes preferem se candidatar com um clique a preencher formulários longos.
* **Dúvidas:** As empresas estão dispostas a usar uma plataforma nova em vez do LinkedIn? Quais informações são indispensáveis para o recrutador em um estagiário?

### Mapa de stakeholders
* **Primários:** Estudantes universitários em busca de estágio; Profissionais de Recursos Humanos e Recrutadores.
* **Secundários:** Instituições de ensino superior (como facilitadoras ou divulgadoras); Gestores técnicos das empresas.

### Entrevistas qualitativas
Realizamos entrevistas com estudantes e recrutadores. O foco com os estudantes foi entender os canais atuais que utilizam para buscar vagas e suas maiores dificuldades. Com recrutadores, investigamos os critérios de seleção e os desafios na triagem de candidatos.

### Highlights de pesquisa
* 80% dos estudantes reclamam da falta de feedback nos processos seletivos.
* Recrutadores apontam que a maioria dos currículos recebidos não possui aderência com a vaga (ex: alunos de cursos diferentes do exigido).
* A simplicidade no cadastro é fator determinante para o engajamento na plataforma.
* Estudantes utilizam principalmente LinkedIn, Indeed e portais universitários para buscar vagas.

### Personas
1. **Kaio, o Estudante:** 21 anos, cursa Engenharia de Software. Tem facilidade com tecnologia, mas sente dificuldade em montar um currículo atrativo por não ter experiência. Seu maior desejo é encontrar um estágio que combine com seu currículo e sua disponibilidade.
2. **Flávia, a Recrutadora:** 34 anos, analista de RH em uma empresa de tecnologia. Recebe centenas de currículos por e-mail e perde dias lendo PDFs. Deseja um sistema que filtre automaticamente candidatos e facilite a triagem.
3. **Ricardo, o Coordenador:** 51 anos, coordenador de carreiras na universidade. Acompanha alunos em sua trajetória profissional. Busca uma plataforma que facilite a conexão entre universidade, alunos e empresas.

---

## 4. Processo de Product Design

### Histórias de usuários
**Contexto: Perfil e Candidatura (Estudantes)**
* Como estudante, quero criar um perfil destacando meu curso e semestre, para que as empresas saibam meu nível acadêmico.
* Como estudante, quero filtrar vagas por modelo de trabalho (remoto, presencial), para encontrar oportunidades viáveis com minha rotina de estudos.
* Como estudante, quero acompanhar o status de minhas candidaturas em um dashboard, para saber em qual etapa estou em cada processo.

**Contexto: Gestão de Vagas (Recrutadores)**
* Como recrutador, quero publicar uma vaga definindo requisitos mínimos, para evitar candidaturas fora do perfil.
* Como recrutador, quero visualizar uma lista padronizada dos candidatos aplicados, para agilizar a etapa de triagem.
* Como recrutador, quero filtrar candidatos por curso e semestre, para encontrar os perfis mais relevantes.

### Proposta de Valor
Para o estudante, o Estagi.ON oferece a democratização do acesso às vagas de estágio com uma vitrine clara de oportunidades. Para a empresa, oferece eficiência de tempo e assertividade na contratação de talentos adequados.

### Requisitos do projeto
**Requisitos Funcionais (RF):**
* RF01: O sistema deve permitir o cadastro de usuários com perfis distintos (Estudante e Empresa).
* RF02: O sistema deve permitir que empresas criem, editem e excluam anúncios de vagas.
* RF03: O sistema deve permitir que estudantes visualizem detalhes das vagas e cliquem em "Candidatar-se".
* RF04: O sistema deve permitir que estudantes acompanhem o status de suas candidaturas.
* RF05: O sistema deve implementar filtros de busca por curso, semestre, modelo de trabalho e localização.

**Requisitos Não Funcionais (RNF):**
* RNF01: A interface deve ser responsiva, adaptando-se a dispositivos móveis e desktops.
* RNF02: O sistema deve garantir a proteção das senhas utilizando criptografia no banco de dados.
* RNF03: O sistema deve ter tempo de resposta inferior a 2 segundos para operações de busca.
* RNF04: A plataforma deve estar disponível pelo menos 99% do tempo.

---

## 5. Projeto de Interface

### Fluxo do usuário
O fluxo principal consiste no estudante acessando a home, realizando o login, navegando pelo painel de vagas recomendadas, acessando os detalhes de uma vaga específica e confirmando a candidatura. Para recrutadores, o fluxo inclui login, publicação de vagas e visualização de candidatos.

### Wireframes
Os wireframes foram construídos focando no minimalismo, priorizando a barra de busca e os cards de vagas na tela principal. A navegação é intuitiva e segue padrões web modernos.

### Protótipo Interativo
O protótipo navegável de alta fidelidade foi desenvolvido no Figma e pode ser acessado através do link do projeto de design.

---

## 6. Metodologia

### Ferramentas
* **Editor de código:** Visual Studio Code (leve e com amplo suporte a extensões).
* **Versionamento e Repositório:** Git e GitHub (para controle de versões e trabalho colaborativo).
* **Design e Prototipagem:** Figma (permite edição simultânea e fácil compartilhamento).
* **Comunicação:** Discord e WhatsApp (para reuniões diárias e alinhamentos rápidos).
* **Gerenciamento do Projeto:** Trello/Notion (para organização do Kanban).

### Organização da equipe e divisão de papéis
O grupo adotou práticas ágeis baseadas no framework Scrum, com Sprints semanais. 
* **Product Owner / Scrum Master:** Coordenação geral do projeto
* **Desenvolvimento Front-end:** Design e implementação da interface
* **Desenvolvimento Back-end / Banco de dados:** API e persistência de dados
* **Design de Interface:** Prototipagem e UX/UI

### Quadro de controle de tarefas (Kanban)
Utilizamos o modelo tradicional de Kanban (To Do, In Progress, Review, Done) para organizar e acompanhar o progresso das tarefas durante cada Sprint.

---

## 7. Solução Implementada

A solução será uma aplicação web construída com tecnologias modernas, utilizando Node.js e JSON Server para o backend, e HTML/CSS/JavaScript para o frontend. A plataforma oferecerá uma experiência intuitiva e responsiva para ambos os públicos (estudantes e recrutadores).

---

**Para mais informações sobre a implementação, consulte a documentação técnica em `/docs` e o código-fonte em `/codigo`.**
