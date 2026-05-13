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