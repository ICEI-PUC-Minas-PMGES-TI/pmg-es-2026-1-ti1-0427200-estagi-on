let vagas = [
    { id: 1, titulo: "Estágio em Desenvolvimento Web", empresa: "TechSolutions Ltda", area: "Desenvolvedor", local: "Belo Horizonte - MG", modalidade: "Híbrido", cargaHoraria: "20h semanais", bolsa: 1200, descricao: "Buscamos estudante de TI para atuar no desenvolvimento de interfaces web modernas, participando de projetos reais com equipe ágil.", requisitos: ["HTML/CSS", "JavaScript", "Git"] },
    { id: 2, titulo: "Estágio em Análise de Dados", empresa: "DataMind S.A.", area: "Dados", local: "Remoto", modalidade: "Remoto", cargaHoraria: "30h semanais", bolsa: 1500, descricao: "Oportunidade para estudantes de Ciência da Computação, Estatística ou áreas afins para atuar com análise e visualização de dados.", requisitos: ["Python", "Excel", "SQL"] },
    { id: 3, titulo: "Estágio em UX/UI Design", empresa: "Criativa Agency", area: "Design", local: "São Paulo - SP", modalidade: "Presencial", cargaHoraria: "20h semanais", bolsa: 1000, descricao: "Vaga para estudante com interesse em design de experiência do usuário, criação de protótipos e pesquisa com usuários.", requisitos: ["Figma", "Noções de UX", "Criatividade"] }
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
            <div class="vaga" onclick="abrirVaga(${vaga.id})" style="cursor: pointer;">
                <strong>${vaga.titulo}</strong><br>
                Área: ${vaga.area} <br>
                Local: ${vaga.local}
            </div>
        `
    })
}

function abrirVaga(id) {
    const vaga = vagas.find(v => v.id === id);
    localStorage.setItem('vagaSelecionada', JSON.stringify(vaga));
    window.location.href = '../detalhes-vaga/index.html';
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