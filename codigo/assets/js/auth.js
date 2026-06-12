document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarioGlobal();
  ativarSidebarGlobal();
  ocultarMenusPorPermissao();
});

function carregarUsuarioGlobal() {
  let usuarioAtivo = null;
  let tipoUsuario = "Visitante";

  try {
    const json = sessionStorage.getItem("usuarioAtivo");
    usuarioAtivo = json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Erro ao carregar usuário ativo:", error);
    usuarioAtivo = null;
  }

  if (usuarioAtivo) {
    if (usuarioAtivo.tipo === "empresa") {
      tipoUsuario = "Empresa";
    } else if (usuarioAtivo.tipo === "estudante") {
      tipoUsuario = "Estudante";
    } else {
      tipoUsuario = "Usuário";
    }
  } else {
    usuarioAtivo = { nome: "Visitante", login: "visitante" };
  }

  const iniciais = gerarIniciaisGlobal(usuarioAtivo.nome);

  const sbAvatar = document.getElementById("sb-avatar");
  const sbNome = document.getElementById("sb-nome");
  const sbTipo = document.getElementById("sb-tipo");

  if (sbAvatar) sbAvatar.textContent = iniciais;
  if (sbNome) sbNome.textContent = usuarioAtivo.nome;
  if (sbTipo) sbTipo.textContent = tipoUsuario;
}

function gerarIniciaisGlobal(nome) {
  if (!nome) return "??";

  return nome
    .trim()
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function ativarSidebarGlobal() {
  const isLogin = window.location.href.includes("login");
  if (isLogin) return;

  document.querySelectorAll(".sb-item").forEach((item) => {
    item.classList.remove("active");

    const href = item.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.replace(/^(\.\.\/)+|^(\.\/)/, "");

    if (
      window.location.href.endsWith(normalizedHref) ||
      (normalizedHref === "index.html" && window.location.href.endsWith("codigo/"))
    ) {
      item.classList.add("active");
    }
  });

  const logoutBtn = document.querySelector(".sb-footer");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = logoutBtn.href || "./pages/login/index.html";
    });
  }
}

function obterUsuarioAtivo() {
  try {
    const json = sessionStorage.getItem("usuarioAtivo");
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Erro ao obter usuário ativo:", error);
    return null;
  }
}

function atualizarDadosUsuarioAtivo(dadosAtualizados) {
  try {
    const usuarioAtual = obterUsuarioAtivo();
    if (!usuarioAtual) return false;

    const usuarioAtualizado = { ...usuarioAtual, ...dadosAtualizados };
    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtualizado));

    carregarUsuarioGlobal();

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário ativo:", error);
    return false;
  }
}

function ocultarMenusPorPermissao() {
  const usuario = obterUsuarioAtivo();
  if (!usuario || !usuario.tipo) return;

  const menuCadastroVagas = document.querySelector('a[href*="cadastro-vagas"]');

  if (usuario.tipo === "estudante") {
    if (menuCadastroVagas) {
      const parentCard = menuCadastroVagas.closest(".module-card");
      const parentItem = menuCadastroVagas.closest(".sb-item");

      if (parentCard) parentCard.style.display = "none";
      if (parentItem) parentItem.style.display = "none";
      if (!parentCard && !parentItem) menuCadastroVagas.style.display = "none";
    }
  }

  if (usuario.tipo === "empresa") {
  }
}
