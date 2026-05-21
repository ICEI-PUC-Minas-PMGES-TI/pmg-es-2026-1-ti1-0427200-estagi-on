/**
 * Perfil do Usuário – script.js
 * Issue #8 – [CI] Perfil do Usuário (Visualização/Edição)
 *
 * Fluxo:
 * 1. Carrega o usuário logado a partir do sessionStorage (usuarioCorrente)
 * 2. Exibe os dados na tela de visualização
 * 3. Permite edição via modal com campos pré-preenchidos
 * 4. Valida campos obrigatórios antes de salvar
 * 5. Atualiza o objeto no array principal (localStorage) e no sessionStorage
 */

// ─── Chaves de armazenamento ───────────────────────────────────────────────
const CHAVE_USUARIO_CORRENTE = "usuarioCorrente";
const CHAVE_ESTUDANTES       = "estudantes";
const CHAVE_EMPRESAS         = "empresas";
const CHAVE_USUARIOS         = "usuarios";       // fallback para usuários genéricos

// ─── Estado local ─────────────────────────────────────────────────────────
let usuarioCorrente = null;
let tipoUsuario     = "usuario"; // "estudante" | "empresa" | "usuario"

// ─── Inicialização ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  carregarUsuario();
  registrarEventos();
});

// ─── 1. Carregar usuário do sessionStorage ─────────────────────────────────
function carregarUsuario() {
  const json = sessionStorage.getItem(CHAVE_USUARIO_CORRENTE);

  if (!json) {
    // Sem sessão ativa → redireciona para login
    window.location.href = "../login/index.html";
    return;
  }

  usuarioCorrente = JSON.parse(json);
  detectarTipoUsuario();
  renderizarPerfil();
}

// ─── 2. Detectar se é estudante, empresa ou usuário genérico ───────────────
function detectarTipoUsuario() {
  // Procura nos arrays de estudantes e empresas no localStorage
  const estudantes = lerArrayLocal(CHAVE_ESTUDANTES);
  const empresas   = lerArrayLocal(CHAVE_EMPRESAS);

  const encontradoEstudante = estudantes.find(
    (e) => e.id === usuarioCorrente.id || e.email === usuarioCorrente.email
  );
  const encontradoEmpresa = empresas.find(
    (e) => e.id === usuarioCorrente.id || e.email === usuarioCorrente.email
  );

  if (encontradoEstudante) {
    tipoUsuario     = "estudante";
    usuarioCorrente = { ...usuarioCorrente, ...encontradoEstudante };
  } else if (encontradoEmpresa) {
    tipoUsuario     = "empresa";
    usuarioCorrente = { ...usuarioCorrente, ...encontradoEmpresa };
  } else {
    tipoUsuario = "usuario";
  }
}

// ─── 3. Renderizar dados na tela de visualização ───────────────────────────
function renderizarPerfil() {
  const u = usuarioCorrente;

  // Gerar iniciais para o avatar
  const iniciais = gerarIniciais(u.nome || u.login || "??");
  document.getElementById("perfil-avatar-display").textContent = iniciais;
  document.getElementById("sb-avatar").textContent             = iniciais;

  // Nome e tipo na sidebar
  document.getElementById("sb-nome").textContent      = u.nome  || u.login || "–";
  document.getElementById("sb-tipo").textContent      = labelTipo();

  // Dados principais
  document.getElementById("perfil-nome-display").textContent = u.nome  || "–";
  document.getElementById("perfil-tipo-badge").textContent    = labelTipo();
  document.getElementById("display-login").textContent        = u.login  || "–";
  document.getElementById("display-email").textContent        = u.email  || "–";

  // Campos condicionais – empresa
  if (tipoUsuario === "empresa") {
    mostrarCampoDisplay("info-cnpj-wrap",  "display-cnpj",        u.cnpj          || "–");
    mostrarCampoDisplay("info-area-wrap",  "display-area",        u.areaAtuacao   || "–");
  }

  // Campos condicionais – estudante
  if (tipoUsuario === "estudante") {
    mostrarCampoDisplay("info-curso-wrap",       "display-curso",       u.curso        || "–");
    mostrarCampoDisplay("info-instituicao-wrap",  "display-instituicao", u.instituicao  || "–");
  }
}

function mostrarCampoDisplay(wrapId, valorId, valor) {
  const wrap = document.getElementById(wrapId);
  if (wrap) {
    wrap.style.display = "";
    document.getElementById(valorId).textContent = valor;
  }
}

// ─── 4. Abrir modal com dados pré-preenchidos ──────────────────────────────
function abrirModal() {
  const u = usuarioCorrente;

  // Preencher campos comuns
  document.getElementById("edit-nome").value  = u.nome  || "";
  document.getElementById("edit-email").value = u.email || "";
  document.getElementById("edit-senha").value = "";

  // Campos específicos por tipo
  if (tipoUsuario === "empresa") {
    document.getElementById("campos-empresa").style.display    = "";
    document.getElementById("campos-estudante").style.display  = "none";
    document.getElementById("edit-cnpj").value  = u.cnpj        || "";
    document.getElementById("edit-area").value  = u.areaAtuacao || "";
  } else if (tipoUsuario === "estudante") {
    document.getElementById("campos-estudante").style.display  = "";
    document.getElementById("campos-empresa").style.display    = "none";
    document.getElementById("edit-curso").value       = u.curso       || "";
    document.getElementById("edit-instituicao").value = u.instituicao || "";
  } else {
    document.getElementById("campos-empresa").style.display   = "none";
    document.getElementById("campos-estudante").style.display = "none";
  }

  // Limpar erros anteriores
  limparErros();

  document.getElementById("modal-overlay").classList.add("aberto");
  document.getElementById("edit-nome").focus();
}

function fecharModal() {
  document.getElementById("modal-overlay").classList.remove("aberto");
}

// ─── 5. Validação e salvamento ─────────────────────────────────────────────
function salvarPerfil(evento) {
  evento.preventDefault();

  let valido = true;

  const nome  = document.getElementById("edit-nome").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const senha = document.getElementById("edit-senha").value;

  // Validar nome
  if (!nome) {
    marcarErro("edit-nome", "erro-nome");
    valido = false;
  }

  // Validar e-mail
  if (!email || !email.includes("@")) {
    marcarErro("edit-email", "erro-email");
    valido = false;
  }

  // Validar senha (somente se preenchida)
  if (senha && senha.length < 6) {
    marcarErro("edit-senha", "erro-senha");
    valido = false;
  }

  if (!valido) return;

  // Montar objeto atualizado
  const atualizado = { ...usuarioCorrente, nome, email };

  if (senha) atualizado.senha = senha;

  if (tipoUsuario === "empresa") {
    atualizado.cnpj        = document.getElementById("edit-cnpj").value.trim();
    atualizado.areaAtuacao = document.getElementById("edit-area").value.trim();
  }

  if (tipoUsuario === "estudante") {
    atualizado.curso       = document.getElementById("edit-curso").value.trim();
    atualizado.instituicao = document.getElementById("edit-instituicao").value.trim();
  }

  // Salvar no array correspondente no localStorage
  salvarNoArray(atualizado);

  // Atualizar sessionStorage
  usuarioCorrente = atualizado;
  sessionStorage.setItem(
    CHAVE_USUARIO_CORRENTE,
    JSON.stringify(atualizado)
  );

  // Fechar modal, atualizar tela e exibir toast
  fecharModal();
  renderizarPerfil();
  exibirToast();
}

// ─── Persistência no localStorage ─────────────────────────────────────────
function salvarNoArray(dadosAtualizados) {
  const chave = chaveArrayPorTipo();
  const array = lerArrayLocal(chave);

  const idx = array.findIndex(
    (item) =>
      item.id === dadosAtualizados.id ||
      item.email === dadosAtualizados.email ||
      item.login === dadosAtualizados.login
  );

  if (idx !== -1) {
    array[idx] = { ...array[idx], ...dadosAtualizados };
  } else {
    // Se não existe, insere (p.ex. usuário genérico que ainda não está nos arrays)
    array.push(dadosAtualizados);
  }

  localStorage.setItem(chave, JSON.stringify(array));
}

function chaveArrayPorTipo() {
  if (tipoUsuario === "estudante") return CHAVE_ESTUDANTES;
  if (tipoUsuario === "empresa")   return CHAVE_EMPRESAS;
  return CHAVE_USUARIOS;
}

function lerArrayLocal(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch {
    return [];
  }
}

// ─── Helpers de UI ────────────────────────────────────────────────────────
function gerarIniciais(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function labelTipo() {
  if (tipoUsuario === "estudante") return "Estudante";
  if (tipoUsuario === "empresa")   return "Empresa";
  return "Usuário";
}

function marcarErro(inputId, erroId) {
  const grupo = document.getElementById(inputId).parentElement;
  grupo.classList.add("campo-erro");

  // Shake
  grupo.classList.remove("shake-anim");
  setTimeout(() => grupo.classList.add("shake-anim"), 10);

  // Remover ao digitar
  document.getElementById(inputId).addEventListener(
    "input",
    () => grupo.classList.remove("campo-erro", "shake-anim"),
    { once: true }
  );
}

function limparErros() {
  document.querySelectorAll(".campo-erro").forEach((el) => {
    el.classList.remove("campo-erro", "shake-anim");
  });
}

function exibirToast() {
  const toast = document.getElementById("toast-sucesso");
  toast.classList.add("visivel");
  setTimeout(() => toast.classList.remove("visivel"), 3000);
}

// ─── Registro de eventos ──────────────────────────────────────────────────
function registrarEventos() {
  document.getElementById("btn-abrir-modal").addEventListener("click", abrirModal);
  document.getElementById("btn-fechar-modal").addEventListener("click", fecharModal);
  document.getElementById("btn-cancelar").addEventListener("click", fecharModal);
  document.getElementById("form-perfil").addEventListener("submit", salvarPerfil);

  // Fechar ao clicar fora do card
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) fecharModal();
  });

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
  });
}