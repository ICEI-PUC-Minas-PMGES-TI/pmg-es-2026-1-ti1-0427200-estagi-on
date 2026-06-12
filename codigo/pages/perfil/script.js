/**
 * Perfil do Usuário – script.js
 * Atualizado para usar sessionStorage e API
 */

const API_URL = "http://localhost:3000";
let usuarioAtivo = null;
let tipoUsuario = "usuario";

document.addEventListener("DOMContentLoaded", () => {
  carregarUsuario();
  registrarEventos();
  ativarSidebar();
  renderizarCurriculo();
  renderizarVagasSalvas();
  renderizarInteresses();
});

function carregarUsuario() {
  try {
    const json = sessionStorage.getItem("usuarioAtivo");
    usuarioAtivo = json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    usuarioAtivo = null;
  }

  if (!usuarioAtivo) {
    window.location.href = "../../pages/login/index.html";
    return;
  }

  detectarTipoUsuario();
  renderizarPerfil();
}

function detectarTipoUsuario() {
  if (usuarioAtivo.cnpj || usuarioAtivo.area) {
    tipoUsuario = "empresa";
  } else if (usuarioAtivo.curso || usuarioAtivo.semestre) {
    tipoUsuario = "estudante";
  } else {
    tipoUsuario = "usuario";
  }
}

function renderizarPerfil() {
  const u = usuarioAtivo;
  const iniciais = gerarIniciais(u.nome || "??");

  document.getElementById("perfil-avatar-display").textContent = iniciais;
  document.getElementById("sb-avatar").textContent = iniciais;

  document.getElementById("sb-nome").textContent = u.nome;
  document.getElementById("sb-tipo").textContent = labelTipo();
  document.getElementById("perfil-nome-display").textContent = u.nome;
  document.getElementById("perfil-tipo-badge").textContent = labelTipo();

  document.getElementById("display-login").textContent =
    u.login || u.email || "-";
  document.getElementById("display-email").textContent = u.email || "-";

  if (tipoUsuario === "empresa") {
    mostrarCampoDisplay("info-cnpj-wrap", "display-cnpj", u.cnpj || "-");
    mostrarCampoDisplay("info-area-wrap", "display-area", u.area || "-");
    const secaoFavoritos = document.getElementById("secao-favoritos");
    if (secaoFavoritos) secaoFavoritos.style.display = "none";
  }

  if (tipoUsuario === "estudante") {
    mostrarCampoDisplay("info-curso-wrap", "display-curso", u.curso || "-");
    mostrarCampoDisplay(
      "info-instituicao-wrap",
      "display-instituicao",
      u.instituicao || "-",
    );
  }

  document.getElementById("edit-nome").value = u.nome || "";
  document.getElementById("edit-email").value = u.email || "";

  if (tipoUsuario === "empresa") {
    document.getElementById("campos-empresa").style.display = "block";
    document.getElementById("campos-estudante").style.display = "none";
    document.getElementById("edit-cnpj").value = u.cnpj || "";
    document.getElementById("edit-area").value = u.area || "";
  } else if (tipoUsuario === "estudante") {
    document.getElementById("campos-empresa").style.display = "none";
    document.getElementById("campos-estudante").style.display = "block";
    document.getElementById("edit-curso").value = u.curso || "";
    document.getElementById("edit-instituicao").value = u.instituicao || "";
  }
}

function mostrarCampoDisplay(wrapId, valorId, valor) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;

  wrap.style.display = "block";
  document.getElementById(valorId).textContent = valor;
}

function abrirModal() {
  document.getElementById("modal-overlay").classList.add("aberto");
}

/**
 * Fecha o modal de edição
 */
function fecharModal() {
  document.getElementById("modal-overlay").classList.remove("aberto");
}

/**
 * Salva as alterações do perfil
 */
async function salvarPerfil(e) {
  e.preventDefault();

  const nome = document.getElementById("edit-nome").value;
  const email = document.getElementById("edit-email").value;
  const senha = document.getElementById("edit-senha").value;

  // Validação básica
  if (!nome || !email) {
    alert("Nome e e-mail são obrigatórios.");
    return;
  }

  // Atualiza dados do usuário
  usuarioAtivo.nome = nome;
  usuarioAtivo.email = email;

  // Atualiza campos específicos
  if (tipoUsuario === "empresa") {
    usuarioAtivo.cnpj = document.getElementById("edit-cnpj").value;
    usuarioAtivo.area = document.getElementById("edit-area").value;
  } else if (tipoUsuario === "estudante") {
    usuarioAtivo.curso = document.getElementById("edit-curso").value;
    usuarioAtivo.instituicao =
      document.getElementById("edit-instituicao").value;
  }

  // Se senha foi preenchida, atualiza
  if (senha && senha.length >= 6) {
    usuarioAtivo.senha = senha;
  }

  try {
    // Atualiza na API
    const endpoint = tipoUsuario === "empresa" ? "empresas" : "estudantes";
    await fetch(`${API_URL}/${endpoint}/${usuarioAtivo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioAtivo),
    });

    // Atualiza sessionStorage
    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));

    renderizarPerfil();
    fecharModal();
    exibirToast();
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    alert("Erro ao salvar alterações. Tente novamente.");
  }
}

/**
 * Exibe notificação de sucesso
 */
function exibirToast() {
  const toast = document.getElementById("toast-sucesso");
  toast.classList.add("visivel");
  setTimeout(() => {
    toast.classList.remove("visivel");
  }, 3000);
}

/**
 * Gera iniciais do nome
 */
function gerarIniciais(nome) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

/**
 * Retorna label do tipo de usuário
 */
function labelTipo() {
  if (tipoUsuario === "empresa") return "Empresa";
  if (tipoUsuario === "estudante") return "Estudante";
  return "Usuário";
}

/**
 * Registra eventos dos botões
 */
function registrarEventos() {
  document
    .getElementById("btn-abrir-modal")
    .addEventListener("click", abrirModal);
  document
    .getElementById("btn-fechar-modal")
    .addEventListener("click", fecharModal);
  document
    .getElementById("btn-cancelar")
    .addEventListener("click", fecharModal);
  document
    .getElementById("form-perfil")
    .addEventListener("submit", salvarPerfil);
}

/**
 * Ativa item da sidebar
 */
function ativarSidebar() {
  document.querySelectorAll(".sb-item").forEach((item) => {
    if (item.href === window.location.href) {
      item.classList.add("active");
    }
  });
}

/**
 * Gerencia upload e exibição de currículo
 */
function renderizarCurriculo() {
  const display = document.getElementById("display-curriculo");
  const btnRemover = document.getElementById("btn-remover-curriculo");
  const inputCurriculo = document.getElementById("input-curriculo");

  function atualizar() {
    const nomeCurriculo = usuarioAtivo.curriculo || null;

    if (nomeCurriculo) {
      display.innerHTML = `<a href="#" id="link-curriculo" style="color: var(--color-primary); text-decoration: underline; cursor: pointer;">${nomeCurriculo}</a>`;
      btnRemover.style.display = "inline-flex";

      // Adiciona evento para abrir o currículo
      document
        .getElementById("link-curriculo")
        ?.addEventListener("click", (e) => {
          e.preventDefault();
          const base64 = usuarioAtivo.curriculoBase64;
          if (base64) {
            const win = window.open();
            win.document.write(
              `<iframe src="${base64}" style="width:100%; height:100%; border:none;"></iframe>`,
            );
          }
        });
    } else {
      display.textContent = "Nenhum arquivo anexado";
      btnRemover.style.display = "none";
    }
  }

  atualizar();

  inputCurriculo.addEventListener("change", function () {
    if (this.files[0]) {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        usuarioAtivo.curriculo = file.name;
        usuarioAtivo.curriculoBase64 = e.target.result;
        sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));
        atualizar();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemover.addEventListener("click", function () {
    delete usuarioAtivo.curriculo;
    delete usuarioAtivo.curriculoBase64;
    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));
    inputCurriculo.value = "";
    atualizar();
  });
}

/**
 * Renderiza vagas salvas (favoritas) do estudante
 */
async function renderizarVagasSalvas() {
  const lista = document.getElementById("lista-favoritos");

  if (tipoUsuario !== "estudante" || !usuarioAtivo.id) {
    lista.innerHTML =
      '<p class="favoritos-vazio">Disponível apenas para estudantes.</p>';
    return;
  }

  try {
    // Busca vagas salvas do estudante
    const response = await fetch(
      `${API_URL}/vagasSalvas?estudanteId=${usuarioAtivo.id}`,
    );
    const vagasSalvas = await response.json();

    if (vagasSalvas.length === 0) {
      lista.innerHTML =
        '<p class="favoritos-vazio">Nenhuma vaga favoritada ainda.</p>';
      return;
    }

    // Busca detalhes de cada vaga
    const vagasPromises = vagasSalvas.map((vs) =>
      fetch(`${API_URL}/vagas/${vs.vagaId}`).then((r) => r.json()),
    );
    const vagas = await Promise.all(vagasPromises);

    lista.innerHTML = vagas
      .map(
        (v) => `
        <div class="favorito-item">
            <div>
                <div class="favorito-titulo">${v.titulo}</div>
                <div class="favorito-empresa">${v.empresa} • ${v.modalidade}</div>
            </div>
            <a href="../detalhes-vaga/index.html?id=${v.id}" class="favorito-link">Ver vaga</a>
        </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Erro ao carregar vagas salvas:", error);
    lista.innerHTML =
      '<p class="favoritos-vazio">Erro ao carregar vagas salvas.</p>';
  }
}

/**
 * Renderiza vagas com interesse do estudante
 */
async function renderizarInteresses() {
  const lista = document.getElementById("lista-interesses");

  if (tipoUsuario !== "estudante" || !usuarioAtivo.id) {
    lista.innerHTML =
      '<p class="favoritos-vazio">Disponível apenas para estudantes.</p>';
    return;
  }

  try {
    // Busca candidaturas do estudante
    const response = await fetch(
      `${API_URL}/candidaturas?estudanteId=${usuarioAtivo.id}`,
    );
    const candidaturas = await response.json();

    if (candidaturas.length === 0) {
      lista.innerHTML =
        '<p class="favoritos-vazio">Nenhum interesse registrado ainda.</p>';
      return;
    }

    // Busca detalhes de cada vaga
    const vagasPromises = candidaturas.map((c) =>
      fetch(`${API_URL}/vagas/${c.vagaId}`).then((r) => r.json()),
    );
    const vagas = await Promise.all(vagasPromises);

    lista.innerHTML = vagas
      .map(
        (v, idx) => `
        <div class="favorito-item">
            <div>
                <div class="favorito-titulo">${v.titulo}</div>
                <div class="favorito-empresa">${v.empresa} • Status: ${candidaturas[idx].status}</div>
            </div>
            <a href="../detalhes-vaga/index.html?id=${v.id}" class="favorito-link">Ver vaga</a>
        </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Erro ao carregar vagas com interesse:", error);
    lista.innerHTML =
      '<p class="favoritos-vazio">Erro ao carregar vagas com interesse.</p>';
  }
}
