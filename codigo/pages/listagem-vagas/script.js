let vagasPadrao = [
    { id: 1, titulo: "Estágio em Desenvolvimento Web", empresa: "TechSolutions Ltda", area: "Desenvolvedor", local: "Belo Horizonte - MG", modalidade: "Híbrido", cargaHoraria: "20h semanais", bolsa: 1200, descricao: "Buscamos estudante de TI para atuar no desenvolvimento de interfaces web modernas, participando de projetos reais com equipe ágil.", requisitos: ["HTML/CSS", "JavaScript", "Git"], contato: "rh@techsolutions.com.br" },
    { id: 2, titulo: "Estágio em Análise de Dados", empresa: "DataMind S.A.", area: "Dados", local: "Contagem-MG", modalidade: "Remoto", cargaHoraria: "30h semanais", bolsa: 1500, descricao: "Oportunidade para estudantes de Ciência da Computação, Estatística ou áreas afins para atuar com análise e visualização de dados.", requisitos: ["Python", "Excel", "SQL"], contato: "vagas@datamind.com.br" },
    { id: 3, titulo: "Estágio em UX/UI Design", empresa: "Criativa Agency", area: "Design", local: "São Paulo - SP", modalidade: "Presencial", cargaHoraria: "20h semanais", bolsa: 1000, descricao: "Vaga para estudante com interesse em design de experiência do usuário, criação de protótipos e pesquisa com usuários.", requisitos: ["Figma", "Noções de UX", "Criatividade"], contato: "design@criativaagency.com.br", novo: true },
    { id: 4, titulo: "Dev Front-end", empresa: "InovaTech Sistemas", area: "Desenvolvedor", local: "Betim - MG", modalidade: "Presencial", cargaHoraria: "20h semanais", bolsa: 1100, descricao: "Vaga para estudante de TI com interesse em desenvolvimento front-end, atuando na criação de interfaces responsivas e modernas.", requisitos: ["HTML", "CSS", "JavaScript"], contato: "rh@inovatech.com.br" },
    { id: 5, titulo: "Analista RH", empresa: "Grupo Conecta", area: "RH", local: "Contagem - MG", modalidade: "Presencial", cargaHoraria: "30h semanais", bolsa: 900, descricao: "Oportunidade para estudantes de Administração ou Psicologia para atuar no setor de Recursos Humanos, apoiando processos seletivos e integração de colaboradores.", requisitos: ["Comunicação", "Excel", "Organização"], contato: "pessoas@grupoconecta.com.br", },
    { id: 6, titulo: "Suporte TI", empresa: "NetBase Soluções", area: "Desenvolvedor", local: "Belo Horizonte - MG", modalidade: "Híbrido", cargaHoraria: "20h semanais", bolsa: 950, descricao: "Vaga para estudante de TI para atuar no suporte técnico interno, auxiliando na manutenção de equipamentos e resolução de chamados.", requisitos: ["Windows", "Redes", "Lógica"], contato: "ti@netbase.com.br", novo:true },
    { id: 7, titulo: "Designer", empresa: "Pixel Studio", area: "Design", local: "Betim - MG", modalidade: "Remoto", cargaHoraria: "20h semanais", bolsa: 1050, descricao: "Buscamos estudante de Design ou áreas criativas para atuar na produção de peças gráficas digitais e materiais de marketing.", requisitos: ["Photoshop", "Illustrator", "Criatividade"], contato: "contato@pixelstudio.com.br", novo:true }
]
localStorage.setItem("vagas", JSON.stringify(vagasPadrao));
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
    const container = document.getElementById("listaVagas");
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

  // Ordena alfabeticamente pelo título SEM mexer nos IDs originais
    const listaOrdenada = [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));

    container.innerHTML = "<h3>Lista de vagas</h3>";

    if (listaOrdenada.length === 0) {
    container.innerHTML += `
        <div class="vaga-aviso" style="text-align: center; padding: 20px; color: #666; font-family: 'DM Sans', sans-serif;">
            Nenhuma vaga encontrada com os filtros selecionados.
        </div>
    `;
    return;
    }

    listaOrdenada.forEach(vaga => {
    const isFavorito = favoritos.includes(vaga.id);
    const novoBadge = vaga.novo ? `<span class="badge-novo">Novo</span>` : "";

    container.innerHTML += `
        <div class="vaga" onclick="abrirVaga(${vaga.id})" style="cursor: pointer; position: relative;">
        ${novoBadge}
        <button
            class="btn-favorito ${isFavorito ? "favoritado" : ""}"
            onclick="toggleFavorito(event, ${vaga.id})"
            title="${isFavorito ? "Remover dos favoritos" : "Favoritar vaga"}"
        >&#9829;</button>
        <strong>${vaga.titulo}</strong><br>
        Área: ${vaga.area} <br>
        Local: ${vaga.local}<br>
        Modalidade: ${vaga.modalidade}
        </div>
    `;
    });
}
function toggleFavorito(event, id) {
    event.stopPropagation();
    let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

    if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    mostrarToast("Vaga removida dos favoritos.");
    } else {
    favoritos.push(id);
    mostrarToast("Vaga favoritada com sucesso! ❤️");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    aplicarFiltros();
}
function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.classList.add("visivel");

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
    toast.classList.remove("visivel");
    }, 2500); 
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