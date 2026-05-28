/**
 * login.js
 * Gerencia o processo de autenticação do usuário
 * Busca os dados na API e salva no sessionStorage
 */

const API_URL = "http://localhost:3000";

/**
 * Processa o formulário de login
 * @param {Event} event - Evento do formulário
 */
async function processaFormLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("username");
  const senhaInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!email || !senha) {
    exibirMensagemErro("Por favor, preencha todos os campos.");
    return;
  }

  try {
    // Busca o usuário pelo email
    const usuario = await autenticarUsuario(email, senha);

    if (usuario) {
      // Salva no sessionStorage com a chave "usuarioAtivo"
      sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuario));

      // Redireciona para o dashboard
      window.location.href = "../../index.html";
    } else {
      exibirMensagemErro("Email ou senha incorretos.");
    }
  } catch (error) {
    console.error("Erro ao processar login:", error);
    exibirMensagemErro("Erro ao conectar com o servidor. Tente novamente.");
  }
}

/**
 * Autentica o usuário verificando email e senha
 * Procura primeiro em estudantes, depois em empresas
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<Object|null>} Dados do usuário autenticado ou null
 */
async function autenticarUsuario(email, senha) {
  try {
    // Busca em estudantes
    const estudantesResponse = await fetch(`${API_URL}/estudantes?email=${email}`);
    const estudantes = await estudantesResponse.json();

    if (estudantes.length > 0) {
      const estudante = estudantes[0];
      if (estudante.senha === senha) {
        return {
          id: estudante.id,
          nome: estudante.nome,
          email: estudante.email,
          curso: estudante.curso,
          semestre: estudante.semestre,
          instituicao: estudante.instituicao || "",
          habilidades: estudante.habilidades || [],
          tipo: "estudante",
        };
      }
    }

    // Busca em empresas
    const empresasResponse = await fetch(`${API_URL}/empresas?email=${email}`);
    const empresas = await empresasResponse.json();

    if (empresas.length > 0) {
      const empresa = empresas[0];
      if (empresa.senha === senha) {
        return {
          id: empresa.id,
          nome: empresa.nome,
          email: empresa.email,
          cnpj: empresa.cnpj,
          area: empresa.area,
          tipo: "empresa",
        };
      }
    }

    // Busca em usuários (fallback para compatibilidade)
    const usuariosResponse = await fetch(`${API_URL}/usuarios?email=${email}`);
    const usuarios = await usuariosResponse.json();

    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      if (usuario.senha === senha) {
        return {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          login: usuario.login,
          tipo: "usuario",
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    throw error;
  }
}

/**
 * Exibe uma mensagem de erro no formulário
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function exibirMensagemErro(mensagem) {
  // Remove mensagens anteriores
  const erroAnterior = document.querySelector(".alert-erro");
  if (erroAnterior) {
    erroAnterior.remove();
  }

  // Cria nova mensagem de erro
  const divErro = document.createElement("div");
  divErro.className = "alert alert-danger alert-erro";
  divErro.textContent = mensagem;
  divErro.style.marginBottom = "1rem";

  // Insere antes do formulário
  const form = document.getElementById("login-form");
  form.insertBefore(divErro, form.firstChild);

  // Remove após 5 segundos
  setTimeout(() => {
    divErro.remove();
  }, 5000);
}

/**
 * Verifica se o usuário já está logado ao carregar a página de login
 * Se estiver, redireciona para o dashboard
 */
function verificarUsuarioLogado() {
  const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");

  if (usuarioAtivo) {
    // Usuário já está logado, redireciona para o dashboard
    window.location.href = "../../index.html";
  }
}

// Verifica se já está logado ao carregar a página
document.addEventListener("DOMContentLoaded", verificarUsuarioLogado);
