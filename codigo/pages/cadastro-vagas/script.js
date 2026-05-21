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


let valido =
true;


document

.querySelectorAll(
"[required]"
)

.forEach(campo=>{

campo.classList.remove(
"input-erro"
);


if(

!campo.value.trim()

){

campo.classList.add(
"input-erro"
);

valido=false;

}

});


if(valido){

form.submit();

}


});


});