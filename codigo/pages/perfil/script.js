/**
 * Perfil do Usuário – script.js
 * Issue #8 – [CI] Perfil do Usuário (Visualização/Edição)
 */

const CHAVE_USUARIO_CORRENTE = "usuarioCorrente";
const CHAVE_ESTUDANTES       = "estudantes";
const CHAVE_EMPRESAS         = "empresas";
const CHAVE_USUARIOS         = "usuarios";

let usuarioCorrente = null;
let tipoUsuario     = "usuario";

document.addEventListener("DOMContentLoaded", () => {
  carregarUsuario();
  registrarEventos();
});

function carregarUsuario() {
  const json = sessionStorage.getItem(CHAVE_USUARIO_CORRENTE);

  if (json) {
    usuarioCorrente = JSON.parse(json);
  } else {
    // Sem sessão ativa: usar dados padrão para visualização
    usuarioCorrente = {
      id: 1,
      nome: "Ana Martins",
      login: "ana.martins",
      email: "ana@email.com",
      senha: "123456"
    };
  }

  detectarTipoUsuario();
  renderizarPerfil();
}

function detectarTipoUsuario() {
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

function renderizarPerfil() {
  const u = usuarioCorrente;

  const iniciais = gerarIniciais(u.nome || u.login || "??");
  document.getElementById("perfil-avatar-display").textContent = iniciais;
  document.getElementById("sb-avatar").textContent             = iniciais;

  document.getElementById("sb-nome").textContent      = u.nome  || u.login || "–";
  document.getElementById("sb-tipo").textContent      = labelTipo();

  document.getElementById("perfil-nome-display").textContent = u.nome  || "–";
  document.getElementById("perfil-tipo-badge").textContent    = labelTipo();
  document.getElementById("display-login").textContent        = u.login  || "–";
  document.getElementById("display-email").textContent        = u.email  || "–";

  if (tipoUsuario === "empresa") {
    mostrarCampoDisplay("info-cnpj-wrap", "display-cnpj", u.cnpj        || "–");
    mostrarCampoDisplay("info-area-wrap", "display-area", u.areaAtuacao || "–");
  }

  if (tipoUsuario === "estudante") {
    mostrarCampoDisplay("info-curso-wrap",       "display-curso",       u.curso       || "–");
    mostrarCampoDisplay("info-instituicao-wrap", "display-instituicao", u.instituicao || "–");
  }
}

function mostrarCampoDisplay(wrapId, valorId, valor) {
  const wrap = document.getElementById(wrapId);
  if (wrap) {
    wrap.style.display = "";
    document.getElementById(valorId).textContent = valor;
  }
}

function abrirModal() {
  const u = usuarioCorrente;

  document.getElementById("edit-nome").value  = u.nome  || "";
  document.getElementById("edit-email").value = u.email || "";
  document.getElementById("edit-senha").value = "";

  if (tipoUsuario === "empresa") {
    document.getElementById("campos-empresa").style.display   = "";
    document.getElementById("campos-estudante").style.display = "none";
    document.getElementById("edit-cnpj").value  = u.cnpj        || "";
    document.getElementById("edit-area").value  = u.areaAtuacao || "";
  } else if (tipoUsuario === "estudante") {
    document.getElementById("campos-estudante").style.display = "";
    document.getElementById("campos-empresa").style.display   = "none";
    document.getElementById("edit-curso").value       = u.curso       || "";
    document.getElementById("edit-instituicao").value = u.instituicao || "";
  } else {
    document.getElementById("campos-empresa").style.display   = "none";
    document.getElementById("campos-estudante").style.display = "none";
  }

  limparErros();
  document.getElementById("modal-overlay").classList.add("aberto");
  document.getElementById("edit-nome").focus();
}

function fecharModal() {
  document.getElementById("modal-overlay").classList.remove("aberto");
}

function salvarPerfil(evento) {
  evento.preventDefault();

  let valido = true;

  const nome  = document.getElementById("edit-nome").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const senha = document.getElementById("edit-senha").value;

  if (!nome) {
    marcarErro("edit-nome", "erro-nome");
    valido = false;
  }

  if (!email || !email.includes("@")) {
    marcarErro("edit-email", "erro-email");
    valido = false;
  }

  if (senha && senha.length < 6) {
    marcarErro("edit-senha", "erro-senha");
    valido = false;
  }

  if (!valido) return;

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

  salvarNoArray(atualizado);

  usuarioCorrente = atualizado;
  sessionStorage.setItem(CHAVE_USUARIO_CORRENTE, JSON.stringify(atualizado));

  fecharModal();
  renderizarPerfil();
  exibirToast();
}

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

function gerarIniciais(nome) {
  return nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function labelTipo() {
  if (tipoUsuario === "estudante") return "Estudante";
  if (tipoUsuario === "empresa")   return "Empresa";
  return "Usuário";
}

function marcarErro(inputId) {
  const grupo = document.getElementById(inputId).parentElement;
  grupo.classList.add("campo-erro");
  grupo.classList.remove("shake-anim");
  setTimeout(() => grupo.classList.add("shake-anim"), 10);
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

function registrarEventos() {
  document.getElementById("btn-abrir-modal").addEventListener("click", abrirModal);
  document.getElementById("btn-fechar-modal").addEventListener("click", fecharModal);
  document.getElementById("btn-cancelar").addEventListener("click", fecharModal);
  document.getElementById("form-perfil").addEventListener("submit", salvarPerfil);

  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) fecharModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
  });
}