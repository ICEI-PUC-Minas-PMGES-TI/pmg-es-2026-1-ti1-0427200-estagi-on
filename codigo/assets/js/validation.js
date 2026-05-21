export function validarEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email.trim());

}



export function validarSenha(senha){

return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
.test(senha);

}



export function validarCNPJ(cnpj){

const numeros =
cnpj.replace(/\D/g,'');

return numeros.length === 14;

}



export function limparErro(input){

input.classList.remove(
"input-erro"
);

const erro =
input.parentElement
.querySelector(
".erro-texto"
);

if(erro)
erro.remove();

}



export function mostrarErro(
input,
mensagem
){

limparErro(input);

input.classList.add(
"input-erro"
);

const span =
document.createElement(
"span"
);

span.className =
"erro-texto";

span.innerText =
mensagem;

input.parentElement
.appendChild(
span
);

}