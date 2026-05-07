let vagas = [
    {
        titulo: "Vaga 1",
        empresa: "Empresa K",
        bolsa: "1500",
        localizacao: "Betim",
        turno: "Manhã"
    },
    {
        titulo: "Vaga 2",
        empresa: "Empresa J",
        bolsa: "1800",
        localizacao: "Contagem",
        turno: "Tarde"
    }
]
function atualizarLista(){

    const lista = document.getElementById("listaVagas")

    lista.innerHTML = ""

    vagas.forEach((vaga, indice) => {

        lista.innerHTML += `
            <div class="item-vaga">
                <span>${vaga.titulo}</span>
                <span>${vaga.empresa}</span>
                <span>R$ ${vaga.bolsa}</span>

                <div class="acoes">
                    <button class="editar" onclick="editarVaga(${indice})">Editar</button>
                    <button class="excluir" onclick="excluirVaga(${indice})">Excluir</button>
                </div>
            </div>
        `
    })
}
function criarVaga(){

    const titulo = document.getElementById("titulo").value
    const empresa = document.getElementById("empresa").value
    const bolsa = document.getElementById("bolsa").value
    const localizacao = document.getElementById("localizacao").value
    const turno = document.getElementById("turno").value

    if(titulo === "" || empresa === ""){
        alert("Preencha os campos!")
        return
    }

    const novaVaga = {
        titulo,
        empresa,
        bolsa,
        localizacao,
        turno
    }

    vagas.push(novaVaga)

    atualizarLista()

    limparCampos()
}
function excluirVaga(indice){

    vagas.splice(indice,1)

    atualizarLista()
}

function editarVaga(indice){

    const vaga = vagas[indice]

    document.getElementById("titulo").value = vaga.titulo
    document.getElementById("empresa").value = vaga.empresa
    document.getElementById("bolsa").value = vaga.bolsa
    document.getElementById("localizacao").value = vaga.localizacao
    document.getElementById("turno").value = vaga.turno

    vagas.splice(indice,1)

    atualizarLista()
}
function limparCampos(){

    document.getElementById("titulo").value = ""
    document.getElementById("empresa").value = ""
    document.getElementById("bolsa").value = ""
    document.getElementById("localizacao").value = ""
}