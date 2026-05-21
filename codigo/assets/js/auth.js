document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarioGlobal();
  ativarSidebarGlobal();
});

function carregarUsuarioGlobal() {
  let json = localStorage.getItem("usuarioCorrente");
  let usuarioCorrente = null;
  let tipoUsuario = "Visitante";

  try {
    usuarioCorrente = json ? JSON.parse(json) : null;
  } catch {
    usuarioCorrente = null;
  }

  if (usuarioCorrente) {
    try {
      const estudantes = JSON.parse(localStorage.getItem("estudantes") || "[]");
      const empresas = JSON.parse(localStorage.getItem("empresas") || "[]");

      const estudante = estudantes.find((e) => e.id === usuarioCorrente.id);
      const empresa = empresas.find((e) => e.id === usuarioCorrente.id);

      if (estudante) {
        tipoUsuario = "Estudante";
        usuarioCorrente = { ...usuarioCorrente, ...estudante };
      } else if (empresa) {
        tipoUsuario = "Empresa";
        usuarioCorrente = { ...usuarioCorrente, ...empresa };
      } else {
        tipoUsuario = "Usuário";
      }
    } catch (e) {
      tipoUsuario = "Usuário";
    }
  } else {
    usuarioCorrente = { nome: "Visitante", login: "visitante" };
  }

  const iniciais = gerarIniciaisGlobal(usuarioCorrente.nome);

  // Atualiza a sidebar de qualquer página!
  const sbAvatar = document.getElementById("sb-avatar");
  const sbNome = document.getElementById("sb-nome");
  const sbTipo = document.getElementById("sb-tipo");

  // Na página de perfil, vamos deixar o script de lá (perfil/script.js) rodar também, em paralelo. Mas
  // a gente atualiza do mesmo jeito para padronização.
  if (sbAvatar) sbAvatar.textContent = iniciais;
  if (sbNome) sbNome.textContent = usuarioCorrente.nome;
  if (sbTipo) sbTipo.textContent = tipoUsuario;
}

function gerarIniciaisGlobal(nome) {
  if (!nome) return "??";
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function ativarSidebarGlobal() {
  const isLogin = window.location.href.includes("login");
  if (isLogin) return;

  // Ajustamos o link ativo da sidebar
  document.querySelectorAll(".sb-item").forEach((item) => {
    item.classList.remove("active");

    const href = item.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.replace(/^(\.\.\/)+|^(\.\/)/, "");

    // Match exato para evitar que a página "listagem-vagas" se confunda com "cadastro-vagas"
    if (
      window.location.href.endsWith(normalizedHref) ||
      (normalizedHref === "index.html" &&
        window.location.href.endsWith("codigo/"))
    ) {
      item.classList.add("active");
    }
  });

  const logoutBtn = document.querySelector(".sb-footer");
  if (logoutBtn && logoutBtn.href && logoutBtn.href.includes("login")) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioCorrente");
    });
  }
}
