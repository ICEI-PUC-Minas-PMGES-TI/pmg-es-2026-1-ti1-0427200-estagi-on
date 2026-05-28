/**
 * auth.js
 * Sistema de autenticação global usando sessionStorage
 * Este script é carregado em todas as páginas (exceto login) para exibir dados do usuário na sidebar
 */

document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarioGlobal();
  ativarSidebarGlobal();
});

/**
 * Carrega os dados do usuário ativo e atualiza a sidebar
 */
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
    // Determina o tipo de usuário baseado nos campos presentes
    if (usuarioAtivo.cnpj || usuarioAtivo.area) {
      tipoUsuario = "Empresa";
    } else if (usuarioAtivo.curso || usuarioAtivo.instituicao || usuarioAtivo.semestre) {
      tipoUsuario = "Estudante";
    } else {
      tipoUsuario = "Usuário";
    }
  } else {
    // Usuário não autenticado (visitante)
    usuarioAtivo = { nome: "Visitante", login: "visitante" };
  }

  const iniciais = gerarIniciaisGlobal(usuarioAtivo.nome);

  // Atualiza os elementos da sidebar
  const sbAvatar = document.getElementById("sb-avatar");
  const sbNome = document.getElementById("sb-nome");
  const sbTipo = document.getElementById("sb-tipo");

  if (sbAvatar) sbAvatar.textContent = iniciais;
  if (sbNome) sbNome.textContent = usuarioAtivo.nome;
  if (sbTipo) sbTipo.textContent = tipoUsuario;
}

/**
 * Gera as iniciais do nome do usuário (máximo 2 letras)
 * @param {string} nome - Nome completo do usuário
 * @returns {string} Iniciais em maiúsculas
 */
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

/**
 * Ativa o item correto da sidebar baseado na URL atual
 * e configura o logout
 */
function ativarSidebarGlobal() {
  const isLogin = window.location.href.includes("login");
  if (isLogin) return;

  // Marca o item ativo na sidebar
  document.querySelectorAll(".sb-item").forEach((item) => {
    item.classList.remove("active");

    const href = item.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.replace(/^(\.\.\/)+|^(\.\/)/, "");

    // Match exato para evitar conflitos (ex: listagem-vagas vs cadastro-vagas)
    if (
      window.location.href.endsWith(normalizedHref) ||
      (normalizedHref === "index.html" && window.location.href.endsWith("codigo/"))
    ) {
      item.classList.add("active");
    }
  });

  // Configura o botão de logout
  const logoutBtn = document.querySelector(".sb-footer");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Limpa a sessão
      sessionStorage.clear();
      // Redireciona para login
      window.location.href = logoutBtn.href || "./pages/login/index.html";
    });
  }
}

/**
 * Função auxiliar para obter o usuário ativo em outras páginas
 * @returns {Object|null} Dados do usuário ou null
 */
function obterUsuarioAtivo() {
  try {
    const json = sessionStorage.getItem("usuarioAtivo");
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Erro ao obter usuário ativo:", error);
    return null;
  }
}

/**
 * Função auxiliar para atualizar dados do usuário no sessionStorage
 * @param {Object} dadosAtualizados - Novos dados a serem mesclados
 * @returns {boolean} true se sucesso, false se falha
 */
function atualizarDadosUsuarioAtivo(dadosAtualizados) {
  try {
    const usuarioAtual = obterUsuarioAtivo();
    if (!usuarioAtual) return false;

    const usuarioAtualizado = { ...usuarioAtual, ...dadosAtualizados };
    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtualizado));

    // Recarrega a sidebar com os novos dados
    carregarUsuarioGlobal();

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário ativo:", error);
    return false;
  }
}
