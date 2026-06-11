import {
  validarEmail,
  validarSenha,
  validarCNPJ,
  mostrarErro,
  limparErro,
} from "../../assets/js/validation.js";

document.addEventListener(
  "DOMContentLoaded",

  () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener(
      "submit",

      (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome");

        const email = document.getElementById("email");

        const senha = document.getElementById("senha");

        const cnpj = document.getElementById("cnpj");

        [nome, email, senha, cnpj].forEach(limparErro);

        let valido = true;

        if (nome.value.trim().length < 3) {
          mostrarErro(
            nome,

            "Nome muito curto",
          );

          valido = false;
        }

        if (!validarEmail(email.value)) {
          mostrarErro(
            email,

            "E-mail inválido",
          );

          valido = false;
        }

        if (!validarSenha(senha.value)) {
          mostrarErro(
            senha,

            "Senha fraca",
          );

          valido = false;
        }

        if (!validarCNPJ(cnpj.value)) {
          mostrarErro(
            cnpj,

            "CNPJ inválido",
          );

          valido = false;
        }

        if (valido) {
          form.submit();
        }
      },
    );
  },
);
