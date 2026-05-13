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