let vagas = [
    { titulo: "Dev Front-end", area: "TI", local: "Betim" },
    { titulo: "Analista RH", area: "RH", local: "Contagem" },
    { titulo: "Suporte TI", area: "TI", local: "Belo Horizonte" },
    { titulo: "Designer", area: "Design", local: "Betim" }
]

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

// 🔍 BUSCA
document.getElementById("busca").addEventListener("input", function(){

    const valor = this.value.toLowerCase()

    const filtradas = vagas.filter(vaga =>
        vaga.titulo.toLowerCase().includes(valor)
    )

    mostrarVagas(filtradas)
})

// 🎯 FILTROS
document.getElementById("aplicar").addEventListener("click", () => {

    const checkboxes = document.querySelectorAll(".filtros input:checked")

    let filtros = []
    checkboxes.forEach(c => filtros.push(c.value))
    const filtradas = vagas.filter(vaga =>
        filtros.length === 0 ||
        filtros.includes(vaga.area) ||
        filtros.includes(vaga.local)
    )

    mostrarVagas(filtradas)
})

// 🧹 LIMPAR
document.getElementById("limpar").addEventListener("click", () => {

    document.querySelectorAll(".filtros input").forEach(c => c.checked = false)

    document.getElementById("busca").value = ""

    mostrarVagas(vagas)
})

// iniciar
mostrarVagas(vagas)