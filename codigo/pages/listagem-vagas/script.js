let vagas = [
    { id: 1, titulo: "Dev Front-end", area: "Desenvolvedor", local: "Betim" },
    { id: 2, titulo: "Analista RH", area: "RH", local: "Contagem" },
    { id: 3, titulo: "Suporte TI", area: "Desenvolvedor", local: "Belo Horizonte" },
    { id: 4, titulo: "Designer", area: "Design", local: "Betim" }
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
    aplicarFiltros();
}

function selecionarCidade(cidade) {
    if (filtroCidade == cidade){
        filtroCidade=""
    }
    else {
        filtroCidade=cidade
    }
    atualizarSelecao();
    aplicarFiltros();
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
            <div class="vaga" onclick="window.location.href='../detalhes-vaga/index.html?id=${vaga.id}'" style="cursor: pointer;">
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

    aplicarFiltros();
});


//  FILTROS
function toggleMenu(button) {
    const menu = button.nextElementSibling;
    menu.classList.toggle("show");
}

// Aplicar filtros
function aplicarFiltros() {
    const busca = document.getElementById("busca").value.toLowerCase();

    const filtradas = vagas.filter(vaga => {
        const matchBusca = vaga.titulo.toLowerCase().includes(busca);
        const matchArea = filtroArea === "" || vaga.area === filtroArea;
        const matchCidade = filtroCidade === "" || vaga.local === filtroCidade;

        return matchBusca && matchArea && matchCidade;
    });

    mostrarVagas(filtradas);
}

// LIMPAR
document.getElementById("limpar").addEventListener("click", () => {


    filtroArea = "";
    filtroCidade = "";
    
    document.getElementById("busca").value = ""
    document.querySelectorAll(".dropdown-content a").forEach(item => {
        item.classList.remove("ativo"); 
    });
    aplicarFiltros();
})

// iniciar
mostrarVagas(vagas)