(function () {
  const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");

  if (!usuarioAtivo) {
    window.location.replace("/codigo/pages/login/index.html");
    return;
  }

  try {
    const usuario = JSON.parse(usuarioAtivo);
    verificarPermissoes(usuario);
  } catch (error) {
    console.error("Erro ao verificar permissões:", error);
    sessionStorage.clear();
    window.location.replace("/codigo/pages/login/index.html");
  }
})();

function verificarPermissoes(usuario) {
  const pathname = window.location.pathname;

  const rotasEmpresa = ["/cadastro-vagas/"];

  const rotasEstudante = [];

  if (usuario.tipo === "estudante") {
    rotasEmpresa.forEach((rota) => {
      if (pathname.includes(rota)) {
        alert("Acesso negado! Esta página é exclusiva para empresas.");
        window.location.replace("/codigo/pages/listagem-vagas/index.html");
      }
    });
  }

  if (usuario.tipo === "empresa") {
    rotasEstudante.forEach((rota) => {
      if (pathname.includes(rota)) {
        alert("Acesso negado! Esta página é exclusiva para estudantes.");
        window.location.replace("/codigo/index.html");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarNavbar();
  configurarLogout();
  ocultarMenusPorPermissao();
});

function atualizarNavbar() {
  try {
    const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");

    if (!usuarioAtivo) {
      return;
    }

    const usuario = JSON.parse(usuarioAtivo);

    let tipoUsuario = "Usuário";
    if (usuario.tipo === "empresa") {
      tipoUsuario = "Empresa";
    } else if (usuario.tipo === "estudante") {
      tipoUsuario = "Estudante";
    }

    const iniciais = gerarIniciais(usuario.nome || "Usuário");

    const sbAvatar = document.getElementById("sb-avatar");
    const sbNome = document.getElementById("sb-nome");
    const sbTipo = document.getElementById("sb-tipo");

    if (sbAvatar) sbAvatar.textContent = iniciais;
    if (sbNome) sbNome.textContent = usuario.nome || "Usuário";
    if (sbTipo) sbTipo.textContent = tipoUsuario;
  } catch (error) {
    console.error("Erro ao atualizar navbar:", error);
    realizarLogout();
  }
}

function gerarIniciais(nome) {
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

function configurarLogout() {
  const btnLogout = document.querySelector(".sb-footer");

  if (btnLogout) {
    btnLogout.onclick = null;

    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      realizarLogout();
    });
  }
}

function realizarLogout() {
  sessionStorage.clear();
  window.location.replace("/codigo/pages/login/index.html");
}

function obterUsuarioAtivo() {
  try {
    const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");
    return usuarioAtivo ? JSON.parse(usuarioAtivo) : null;
  } catch (error) {
    console.error("Erro ao obter usuário ativo:", error);
    return null;
  }
}

function atualizarUsuarioAtivo(dadosAtualizados) {
  try {
    const usuarioAtual = obterUsuarioAtivo();

    if (!usuarioAtual) {
      console.error("Nenhum usuário ativo para atualizar");
      return false;
    }

    const usuarioAtualizado = { ...usuarioAtual, ...dadosAtualizados };

    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtualizado));

    atualizarNavbar();

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário ativo:", error);
    return false;
  }
}

function ocultarMenusPorPermissao() {
  const usuario = obterUsuarioAtivo();
  if (!usuario) return;

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
