const API_URL = 'http://localhost:3001/vagas';
const EMPRESA_ID = 1;

function limparFormulario() {
    document.getElementById('vaga-id').value = '';
    document.getElementById('input-vaga').value = '';
    document.getElementById('input-salario').value = '';
    document.getElementById('input-empresa').value = '';
    document.getElementById('input-turno').value = '';
    document.getElementById('input-localizacao').value = '';
    document.getElementById('input-descricao').value = '';
    document.getElementById('input-requisitos').value = '';
}

function renderizarTabela(vagas) {
    const corpo = document.getElementById('corpo-tabela');
    corpo.innerHTML = '';

    if (vagas.length == 0) {
        corpo.innerHTML = '<tr><td colspan="8">Nenhuma vaga cadastrada.</td></tr>';
        return;
    }

    for (let i = 0; i < vagas.length; i++) {
        const v = vagas[i];

        let linha = "<tr>";
        linha += "<td>" + (v.vaga || "") + "</td>";
        linha += "<td>" + (v.empresa || "") + "</td>";
        linha += "<td>" + (v.salario || "") + "</td>";
        linha += "<td>" + (v.turno || "") + "</td>";
        linha += "<td>" + (v.localizacao || "") + "</td>";
        linha += "<td>" + (v.descricao || "") + "</td>";
        linha += "<td>" + (v.requisitos || "") + "</td>";
        linha += "<td>";
        linha += "<button class='btn-editar' onclick=\"editarVaga('" + v.id + "')\">Editar</button>";
        linha += "<button class='btn-excluir' onclick=\"excluirVaga('" + v.id + "')\">Excluir</button>";
        linha += "</td>";
        linha += "</tr>";

        corpo.innerHTML += linha;
    }
}

function listarVagas() {
    fetch(API_URL)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(vagas) {
            renderizarTabela(vagas);
        })
        .catch(function() {
            alert("Erro ao carregar vagas");
        });
}

function criarVaga() {
    const vaga = document.getElementById('input-vaga').value;
    const salario = document.getElementById('input-salario').value;
    const empresa = document.getElementById('input-empresa').value;
    const turno = document.getElementById('input-turno').value;
    const localizacao = document.getElementById('input-localizacao').value;
    const descricao = document.getElementById('input-descricao').value;
    const requisitos = document.getElementById('input-requisitos').value;

    if (vaga == '' || empresa == '') {
        alert("Preencha Vaga e Empresa");
        return;
    }

    const dados = {
        vaga: vaga,
        salario: salario,
        empresa: empresa,
        turno: turno,
        localizacao: localizacao,
        descricao: descricao,
        requisitos: requisitos,
        empresaId: EMPRESA_ID
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(function() {
        alert("Vaga criada com sucesso!");
        limparFormulario();
        listarVagas();
    });
}

function editarVaga(id) {
    fetch(API_URL + "/" + id)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(vaga) {
            document.getElementById('vaga-id').value = vaga.id;
            document.getElementById('input-vaga').value = vaga.vaga;
            document.getElementById('input-salario').value = vaga.salario;
            document.getElementById('input-empresa').value = vaga.empresa;
            document.getElementById('input-turno').value = vaga.turno;
            document.getElementById('input-localizacao').value = vaga.localizacao;
            document.getElementById('input-descricao').value = vaga.descricao;
            document.getElementById('input-requisitos').value = vaga.requisitos;
        })
        .catch(function() {
            alert("Erro ao carregar vaga");
        });
}

function atualizarVaga() {
    const id = document.getElementById('vaga-id').value;

    if (id == '') {
        alert("Clique em editar primeiro");
        return;
    }

    const vaga = document.getElementById('input-vaga').value;
    const salario = document.getElementById('input-salario').value;
    const empresa = document.getElementById('input-empresa').value;
    const turno = document.getElementById('input-turno').value;
    const localizacao = document.getElementById('input-localizacao').value;
    const descricao = document.getElementById('input-descricao').value;
    const requisitos = document.getElementById('input-requisitos').value;

    const dados = {
        vaga: vaga,
        salario: salario,
        empresa: empresa,
        turno: turno,
        localizacao: localizacao,
        descricao: descricao,
        requisitos: requisitos,
        empresaId: EMPRESA_ID
    };

    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(function() {
        alert("Vaga atualizada com sucesso!");
        limparFormulario();
        listarVagas();
    });
}

function excluirVaga(id) {
    const confirmado = confirm("Deseja excluir esta vaga?");
    if (!confirmado) return;

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(function() {
        alert("Vaga excluída com sucesso!");
        listarVagas();
    });
}
listarVagas();