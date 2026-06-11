import {
  validarEmail,
  validarSenha,
  mostrarErro,
  limparErro,
} from "../../assets/js/validation.js";

const API = "http://localhost:3000/estudantes";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-estudante");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome        = document.getElementById("nome");
    const email       = document.getElementById("email");
    const curso       = document.getElementById("curso");
    const instituicao = document.getElementById("instituicao");
    const semestre    = document.getElementById("semestre");
    const senha       = document.getElementById("senha");

    [nome, email, curso, instituicao, semestre, senha].forEach(limparErro);

    let valido = true;

    if (nome.value.trim().length < 3) {
      mostrarErro(nome, "Nome muito curto");
      valido = false;
    }
    if (!validarEmail(email.value)) {
      mostrarErro(email, "E-mail inválido");
      valido = false;
    }
    if (curso.value.trim().length < 3) {
      mostrarErro(curso, "Informe o curso");
      valido = false;
    }
    if (instituicao.value.trim().length < 3) {
      mostrarErro(instituicao, "Informe a instituição");
      valido = false;
    }
    const sem = parseInt(semestre.value);
    if (!sem || sem < 1 || sem > 12) {
      mostrarErro(semestre, "Semestre inválido (1 a 12)");
      valido = false;
    }
    if (!validarSenha(senha.value)) {
      mostrarErro(senha, "Senha fraca (mín. 6 caracteres com letras e números)");
      valido = false;
    }

    if (!valido) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.value.trim(),
          email: email.value.trim(),
          curso: curso.value.trim(),
          instituicao: instituicao.value.trim(),
          semestre: sem,
          senha: senha.value,
          habilidades: [],
        }),
      });

      if (!res.ok) throw new Error();

      const criado = await res.json();
      sessionStorage.setItem("usuarioAtivo", JSON.stringify({
        id: criado.id,
        nome: criado.nome,
        email: criado.email,
        tipo: "estudante",
        curso: criado.curso,
        semestre: criado.semestre,
        instituicao: criado.instituicao,
        habilidades: criado.habilidades || [],
      }));
      window.location.href = "../../index.html";
    } catch {
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  });
});
