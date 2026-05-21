const vagasPadrao = [
    { titulo: "Dev Front-end", area: "Desenvolvedor", local: "Betim",modalidade:"Remoto" },
    { titulo: "Analista RH", area: "RH", local: "Contagem",modalidade:"Híbrido" },
    { titulo: "Suporte TI", area: "Desenvolvedor", local: "Belo Horizonte",modalidade:"Presencial"},
    { titulo: "Designer", area: "Design", local: "Betim" , modalidade:"Remoto"}
]
if (!localStorage.getItem("vagas")) {
    localStorage.setItem("vagas", JSON.stringify(vagasPadrao));
}
let vagas = JSON.parse(localStorage.getItem("vagas"));

let filtroArea=""
let filtroCidade=""
let filtroModalidade=""


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
function selecionarModalidade(modalidade){
    if (filtroModalidade==modalidade){
        filtroModalidade=""
    }
    else{
        filtroModalidade=modalidade
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
        document.querySelectorAll("[data-modalidade]").forEach(element=>{
        const modalidade = element.getAttribute("data-modalidade");
        if (modalidade ===filtroModalidade){
            element.classList.add("ativo")
        }
        else {
            element.classList.remove("ativo");
        }
    }
    )
}
// MOSTRAR VAGAS
function mostrarVagas(lista){
    const container = document.getElementById("listaVagas")

    container.innerHTML = "<h3>Lista de vagas</h3>"
    if (lista.length===0){
        container.innerHTML += `
            <div class="vaga-aviso" style="text-align: center; padding: 20px; color: #666; font-family: 'DM Sans', sans-serif;">
                Nenhuma vaga encontrada com os filtros selecionados.
            </div>
        `;
        return;
    }
    lista.forEach(vaga => {
        container.innerHTML += `
            <div class="vaga">
                <strong>${vaga.titulo}</strong><br>
                Área: ${vaga.area} <br>
                Local: ${vaga.local}<br>
                Modalidade: ${vaga.modalidade}
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
    document.querySelectorAll('.dropdown-content').forEach(menu => {
        if (menu !== button.nextElementSibling) {
            menu.classList.remove('show');
        }
    });

    const menu = button.nextElementSibling;
    menu.classList.toggle("show");
}
window.onclick = function(event) {
    // Adicionada a verificação para ignorar cliques dentro do menu (.dropdown-content)
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
        document.querySelectorAll('.dropdown-content').forEach(menu => {
            menu.classList.remove('show');
        });
    }
}
// Aplicar filtros
function aplicarFiltros() {
    const busca = document.getElementById("busca").value.toLowerCase();

    const filtradas = vagas.filter(vaga => {
        const matchBusca = vaga.titulo.toLowerCase().includes(busca);
        const matchArea = filtroArea === "" || vaga.area === filtroArea;
        const matchCidade = filtroCidade === "" || vaga.local === filtroCidade;
        const matchModalidade=filtroModalidade===""|| vaga.modalidade===filtroModalidade;

        return matchBusca && matchArea && matchCidade && matchModalidade;
    });

    mostrarVagas(filtradas);
}

// LIMPAR
document.getElementById("limpar").addEventListener("click", () => {


    filtroArea = "";
    filtroCidade = "";
    filtroModalidade="";
    
    document.getElementById("busca").value = ""
    document.querySelectorAll(".dropdown-content a").forEach(item => {
        item.classList.remove("ativo"); 
    });
    aplicarFiltros();
})

// iniciar
mostrarVagas(vagas)