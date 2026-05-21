import {

validarEmail,
validarSenha,

mostrarErro,
limparErro

}

from

"../../assets/js/validation.js";


document

.addEventListener(

"DOMContentLoaded",

()=>{

const form =
document.querySelector(
"form"
);


if(!form)
return;



form.addEventListener(

"submit",

e=>{

e.preventDefault();


const email =
document.getElementById(
"email"
);


const senha =
document.getElementById(
"senha"
);



limparErro(email);
limparErro(senha);


let valido =
true;



if(

!validarEmail(
email.value
)

){

mostrarErro(

email,

"E-mail inválido"

);

valido=false;

}



if(

!validarSenha(
senha.value
)

){

mostrarErro(

senha,

"Senha: mínimo 6 caracteres e 1 número"

);

valido=false;

}



if(valido){

form.submit();

}


});

});