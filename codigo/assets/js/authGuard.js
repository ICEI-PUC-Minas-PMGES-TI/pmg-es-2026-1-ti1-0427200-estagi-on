/**
 * authGuard.js
 * Sistema de proteção de rotas e autenticação usando sessionStorage
 * Importar no <head> de páginas privadas
 */

// ===== PROTEÇÃO DE ROTA =====
// Executa IMEDIATAMENTE para evitar flash de conteúdo não autorizado
(function () {
  const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");

  // Se não há usuário logado, redireciona para login
  if (!usuarioAtivo) {
    // Usa replace() para impedir que o usuário volte usando botão "voltar" do navegador
    window.location.replace("/codigo/pages/login/index.html");
  }
})();

// ===== ATUALIZAÇÃO DA NAVBAR =====
document.addEventListener("DOMContentLoaded", () => {
  atualizarNavbar();
  configurarLogout();
});

/**
 * Atualiza os elementos da navbar/sidebar com dados do usuário logado
 */
function atualizarNavbar() {
  try {
    const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");

    if (!usuarioAtivo) {
      // Se não há usuário, já foi redirecionado acima, mas por segurança:
      return;
    }

    const usuario = JSON.parse(usuarioAtivo);

    // Determina o tipo de usuário
    let tipoUsuario = "Usuário";
    if (usuario.cnpj) {
      tipoUsuario = "Empresa";
    } else if (usuario.curso || usuario.instituicao) {
      tipoUsuario = "Estudante";
    }

    // Gera iniciais do nome para o avatar
    const iniciais = gerarIniciais(usuario.nome || "Usuário");

    // Atualiza elementos da sidebar
    const sbAvatar = document.getElementById("sb-avatar");
    const sbNome = document.getElementById("sb-nome");
    const sbTipo = document.getElementById("sb-tipo");

    if (sbAvatar) sbAvatar.textContent = iniciais;
    if (sbNome) sbNome.textContent = usuario.nome || "Usuário";
    if (sbTipo) sbTipo.textContent = tipoUsuario;
  } catch (error) {
    console.error("Erro ao atualizar navbar:", error);
    // Em caso de erro ao parsear dados, faz logout por segurança
    realizarLogout();
  }
}

/**
 * Gera as iniciais do nome do usuário (máximo 2 caracteres)
 * @param {string} nome - Nome completo do usuário
 * @returns {string} Iniciais em maiúsculas
 */
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

/**
 * Configura o evento de clique no botão de logout
 */
function configurarLogout() {
  const btnLogout = document.querySelector(".sb-footer");

  if (btnLogout) {
    // Remove qualquer listener anterior para evitar duplicatas
    btnLogout.onclick = null;

    // Adiciona novo listener
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      realizarLogout();
    });
  }
}

/**
 * Realiza o processo de logout
 * Limpa o sessionStorage e redireciona para a página de login
 */
function realizarLogout() {
  // Limpa TODOS os dados da sessão
  sessionStorage.clear();

  // Redireciona para login (usando replace para evitar volta com botão "voltar")
  window.location.replace("/codigo/pages/login/index.html");
}

// ===== FUNÇÕES AUXILIARES PÚBLICAS =====

/**
 * Retorna os dados do usuário logado
 * @returns {Object|null} Objeto com dados do usuário ou null se não logado
 */
function obterUsuarioAtivo() {
  try {
    const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");
    return usuarioAtivo ? JSON.parse(usuarioAtivo) : null;
  } catch (error) {
    console.error("Erro ao obter usuário ativo:", error);
    return null;
  }
}

/**
 * Atualiza os dados do usuário logado no sessionStorage
 * @param {Object} dadosAtualizados - Novos dados do usuário
 * @returns {boolean} true se atualizado com sucesso, false caso contrário
 */
function atualizarUsuarioAtivo(dadosAtualizados) {
  try {
    const usuarioAtual = obterUsuarioAtivo();

    if (!usuarioAtual) {
      console.error("Nenhum usuário ativo para atualizar");
      return false;
    }

    // Mescla dados antigos com novos (novos sobrescrevem antigos)
    const usuarioAtualizado = { ...usuarioAtual, ...dadosAtualizados };

    sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtualizado));

    // Atualiza a navbar com os novos dados
    atualizarNavbar();

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário ativo:", error);
    return false;
  }
}
