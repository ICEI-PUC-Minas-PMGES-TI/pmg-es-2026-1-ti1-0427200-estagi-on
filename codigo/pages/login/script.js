const API_URL = "http://localhost:3000";
let tipoSelecionado = "estudante";

document.addEventListener("DOMContentLoaded", () => {
  verificarUsuarioLogado();
  configurarToggle();
  configurarFormulario();
});

function verificarUsuarioLogado() {
  const usuarioAtivo = sessionStorage.getItem("usuarioAtivo");
  if (usuarioAtivo) {
    window.location.href = "../../index.html";
  }
}

function configurarToggle() {
  const toggleButtons = document.querySelectorAll(".toggle-option");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      tipoSelecionado = btn.dataset.tipo;
    });
  });
}

function configurarFormulario() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const errorDiv = document.getElementById("login-error");

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    limparErros();
    errorDiv.style.display = "none";

    if (!validarEmail(email)) {
      mostrarErroInput(emailInput, "E-mail inválido");
      return;
    }

    if (!validarSenha(senha)) {
      mostrarErroInput(senhaInput, "Senha deve ter no mínimo 6 caracteres e 1 número");
      return;
    }

    try {
      const usuario = await autenticarUsuario(email, senha, tipoSelecionado);

      if (usuario) {
        sessionStorage.setItem("usuarioAtivo", JSON.stringify(usuario));
        window.location.href = "../../index.html";
      } else {
        mostrarErroGeral(errorDiv, "E-mail ou senha incorretos. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      mostrarErroGeral(errorDiv, "Erro ao conectar com o servidor. Tente novamente.");
    }
  });
}

async function autenticarUsuario(email, senha, tipo) {
  try {
    const endpoint = tipo === "estudante" ? "estudantes" : "empresas";
    const response = await fetch(`${API_URL}/${endpoint}?email=${encodeURIComponent(email)}`);
    const usuarios = await response.json();

    if (usuarios.length === 0) {
      return null;
    }

    const usuario = usuarios[0];

    if (usuario.senha !== senha) {
      return null;
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: tipo,
      ...(tipo === "estudante"
        ? {
            curso: usuario.curso,
            semestre: usuario.semestre,
            instituicao: usuario.instituicao,
            habilidades: usuario.habilidades || [],
          }
        : {
            cnpj: usuario.cnpj,
            area: usuario.area,
          }),
    };
  } catch (error) {
    console.error("Erro na autenticação:", error);
    throw error;
  }
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(senha);
}

function mostrarErroInput(input, mensagem) {
  input.classList.add("input-erro");
  const errorSpan = input.parentElement.querySelector(".error-message");
  if (errorSpan) {
    errorSpan.textContent = mensagem;
  }
}

function mostrarErroGeral(errorDiv, mensagem) {
  errorDiv.textContent = mensagem;
  errorDiv.style.display = "block";
}

function limparErros() {
  document.querySelectorAll(".form-input").forEach((input) => {
    input.classList.remove("input-erro");
  });
  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });
}
