let vagas = [
    { titulo: "Dev Front-end", area: "Desenvolvedor", local: "Betim" },
    { titulo: "Analista RH", area: "RH", local: "Contagem" },
    { titulo: "Suporte TI", area: "Desenvolvedor", local: "Belo Horizonte" },
    { titulo: "Designer", area: "Design", local: "Betim" }
]
let filtroArea=""
let filtroCidade=""

function selecionarArea(area) {
    if (filtroArea == area){
        filtroArea= "";
    }
    else{
        filtroArea= area;
    }
    atualizarSelecao();
}

function selecionarCidade(cidade) {
    if (filtroCidade == cidade){
        filtroCidade=""
    }
    else {
        filtroCidade=cidade
    }
    atualizarSelecao();
}
function atualizarSelecao(){
    document.querySelectorAll("[data-area]").forEach(element=>{
        const area = element.getAttribute("data-area");
        if (area ===filtroArea){
            element.classList.add("ativo")
        }
        else {
            element.classList.remove("ativo");
        }
    }
    )
    document.querySelectorAll("[data-cidade]").forEach(element=>{
        const cidade = element.getAttribute("data-cidade");
        if (cidade===filtroCidade){
            element.classList.add("ativo")
        }
        else {
            element.classList.remove("ativo")
        }
    })
}
// MOSTRAR VAGAS
function mostrarVagas(lista){
    const container = document.getElementById("listaVagas")

    container.innerHTML = "<h3>Lista de vagas</h3>"

    lista.forEach(vaga => {
        container.innerHTML += `
            <div class="vaga">
                <strong>${vaga.titulo}</strong><br>
                Área: ${vaga.area} <br>
                Local: ${vaga.local}
            </div>
        `
    })
}

// BUSCA
document.getElementById("busca").addEventListener("input", function(){

    const valor = this.value.toLowerCase()

    const filtradas = vagas.filter(vaga =>
        vaga.titulo.toLowerCase().includes(valor)
    )

    mostrarVagas(filtradas)
})

// 🎯 FILTROS
function toggleMenu(button) {
    const menu = button.nextElementSibling;
    menu.classList.toggle("show");
}

// Aplicar filtros
document.getElementById("aplicar").addEventListener("click", () =>{
    const filtradas= vagas.filter(vaga=>{
        const matchArea = filtroArea === "" || vaga.area ===filtroArea;
        const matchCidade = filtroCidade === "" || vaga.local ===filtroCidade;
        return matchArea && matchCidade;
    });
    mostrarVagas(filtradas)
})

// 🧹 LIMPAR
document.getElementById("limpar").addEventListener("click", () => {


    filtroArea = "";
    filtroCidade = "";

    document.getElementById("busca").value = ""

    mostrarVagas(vagas)
})

// iniciar
mostrarVagas(vagas)