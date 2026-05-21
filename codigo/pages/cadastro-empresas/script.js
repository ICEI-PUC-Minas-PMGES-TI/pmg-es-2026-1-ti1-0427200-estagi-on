const formEmpresa = document.getElementById("form-empresa");

formEmpresa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const inputCnpj = document.getElementById("cnpj");
  const grupoCnpj = inputCnpj.parentElement;

  if (inputCnpj.value.trim() === "") {
    grupoCnpj.classList.add("campo-erro");

    grupoCnpj.classList.remove("shake-anim");
    setTimeout(() => {
      grupoCnpj.classList.add("shake-anim");
    }, 10);
  } else {
    grupoCnpj.classList.remove("campo-erro", "shake-anim");
    alert("Empresa cadastrada com sucesso com as diretrizes do Estagi.ON!");
    formEmpresa.reset();
  }
});

document.getElementById("cnpj").addEventListener("input", function () {
  this.parentElement.classList.remove("campo-erro", "shake-anim");
});
