/**
 * Perfil do Usuário – script.js
 * Corrigido:
 * - persistência com localStorage
 * - evita tela branca
 * - sidebar ativa
 * - perfil continua após navegar
 */

const CHAVE_USUARIO_CORRENTE = "usuarioCorrente";
const CHAVE_ESTUDANTES = "estudantes";
const CHAVE_EMPRESAS = "empresas";
const CHAVE_USUARIOS = "usuarios";

let usuarioCorrente = null;
let tipoUsuario = "usuario";


document.addEventListener("DOMContentLoaded", () => {

    carregarUsuario();
    registrarEventos();
    ativarSidebar();
    renderizarFavoritos();
    renderizarInteresses();
    renderizarCurriculo();

});


function carregarUsuario() {

    let json =
        localStorage.getItem(
            CHAVE_USUARIO_CORRENTE
        );

    try {

        usuarioCorrente =
            json
                ? JSON.parse(json)
                : null;

    } catch {

        usuarioCorrente = null;

    }


    if (!usuarioCorrente) {

        usuarioCorrente = {

            id: 1,
            nome: "Usuário",
            login: "usuario",
            email: "",
            senha: ""

        };

    }


    detectarTipoUsuario();
    renderizarPerfil();

}



function detectarTipoUsuario() {

    const estudantes =
        lerArrayLocal(
            CHAVE_ESTUDANTES
        );

    const empresas =
        lerArrayLocal(
            CHAVE_EMPRESAS
        );


    const estudante =
        estudantes.find(
            e =>
                e.id === usuarioCorrente.id
        );


    const empresa =
        empresas.find(
            e =>
                e.id === usuarioCorrente.id
        );


    if (estudante) {

        tipoUsuario =
            "estudante";

        usuarioCorrente = {

            ...usuarioCorrente,
            ...estudante

        };

    }

    else if (empresa) {

        tipoUsuario =
            "empresa";

        usuarioCorrente = {

            ...usuarioCorrente,
            ...empresa

        };

    }

}



function renderizarPerfil() {

    const u =
        usuarioCorrente;

    const iniciais =
        gerarIniciais(
            u.nome ||
            "??"
        );


    document.getElementById(
        "perfil-avatar-display"
    ).textContent =
        iniciais;


    document.getElementById(
        "sb-avatar"
    ).textContent =
        iniciais;


    document.getElementById(
        "sb-nome"
    ).textContent =
        u.nome;


    document.getElementById(
        "sb-tipo"
    ).textContent =
        labelTipo();


    document.getElementById(
        "perfil-nome-display"
    ).textContent =
        u.nome;


    document.getElementById(
        "perfil-tipo-badge"
    ).textContent =
        labelTipo();


    document.getElementById(
        "display-login"
    ).textContent =
        u.login || "-";


    document.getElementById(
        "display-email"
    ).textContent =
        u.email || "-";



    if (tipoUsuario === "empresa") {

        mostrarCampoDisplay(
            "info-cnpj-wrap",
            "display-cnpj",
            u.cnpj || "-"
        );

    }



    if (tipoUsuario === "estudante") {

        mostrarCampoDisplay(
            "info-curso-wrap",
            "display-curso",
            u.curso || "-"
        );

        mostrarCampoDisplay(
            "info-instituicao-wrap",
            "display-instituicao",
            u.instituicao || "-"
        );

    }

}



function mostrarCampoDisplay(
    wrapId,
    valorId,
    valor
) {

    const wrap =
        document.getElementById(
            wrapId
        );

    if (!wrap) return;

    wrap.style.display =
        "block";

    document.getElementById(
        valorId
    ).textContent =
        valor;

}



function abrirModal() {

    const u =
        usuarioCorrente;

    document.getElementById(
        "edit-nome"
    ).value =
        u.nome || "";


    document.getElementById(
        "edit-email"
    ).value =
        u.email || "";


    document.getElementById(
        "modal-overlay"
    ).classList.add(
        "aberto"
    );

}



function fecharModal() {

    document.getElementById(
        "modal-overlay"
    ).classList.remove(
        "aberto"
    );

}



function salvarPerfil(e) {

    e.preventDefault();


    usuarioCorrente.nome =
        document.getElementById(
            "edit-nome"
        ).value;


    usuarioCorrente.email =
        document.getElementById(
            "edit-email"
        ).value;



    localStorage.setItem(

        CHAVE_USUARIO_CORRENTE,

        JSON.stringify(
            usuarioCorrente
        )

    );


    renderizarPerfil();

    fecharModal();

    exibirToast();

}



function exibirToast() {

    const toast =
        document.getElementById(
            "toast-sucesso"
        );


    toast.classList.add(
        "visivel"
    );


    setTimeout(() => {

        toast.classList.remove(
            "visivel"
        );

    }, 3000);

}



function gerarIniciais(nome) {

    return nome

        .split(" ")

        .map(
            n => n[0]
        )

        .join("")

        .substring(0, 2)

        .toUpperCase();

}



function labelTipo() {

    if (
        tipoUsuario ===
        "empresa"
    )
        return "Empresa";


    if (
        tipoUsuario ===
        "estudante"
    )
        return "Estudante";


    return "Usuário";

}



function lerArrayLocal(chave) {

    try {

        return JSON.parse(
            localStorage.getItem(
                chave
            )
        ) || [];

    }

    catch {

        return [];

    }

}



function registrarEventos() {

    document
        .getElementById(
            "btn-abrir-modal"
        )
        .addEventListener(
            "click",
            abrirModal
        );


    document
        .getElementById(
            "btn-fechar-modal"
        )
        .addEventListener(
            "click",
            fecharModal
        );


    document
        .getElementById(
            "btn-cancelar"
        )
        .addEventListener(
            "click",
            fecharModal
        );


    document
        .getElementById(
            "form-perfil"
        )
        .addEventListener(
            "submit",
            salvarPerfil
        );

}



function ativarSidebar() {

    document

        .querySelectorAll(
            ".sb-item"
        )

        .forEach(item => {

            if (

                item.href ===
                window.location.href

            ) {

                item.classList.add(
                    "active"
                );

            }

        });

}

function renderizarCurriculo() {
    const curriculo = localStorage.getItem('curriculo');
    const display = document.getElementById('display-curriculo');
    const btnRemover = document.getElementById('btn-remover-curriculo');

    function atualizar() {
        const nome = localStorage.getItem('curriculo');
        display.textContent = nome || 'Nenhum arquivo anexado';
        btnRemover.style.display = nome ? 'inline-flex' : 'none';
    }

    atualizar();

    document.getElementById('input-curriculo').addEventListener('change', function () {
        if (this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem('curriculo', file.name);
                localStorage.setItem('curriculoBase64', e.target.result);
                atualizar();
            };
            reader.readAsDataURL(file);
        }
    });

    btnRemover.addEventListener('click', function () {
        localStorage.removeItem('curriculo');
        localStorage.removeItem('curriculoBase64');
        document.getElementById('input-curriculo').value = '';
        atualizar();
    });
}

function renderizarFavoritos() {
    const vagas = JSON.parse(localStorage.getItem('vagasFavoritas') || '[]');
    const lista = document.getElementById('lista-favoritos');
    if (!vagas.length) return;
    lista.innerHTML = vagas.map(v => `
        <div class="favorito-item">
            <div>
                <div class="favorito-titulo">${v.titulo}</div>
                <div class="favorito-empresa">${v.empresa}</div>
            </div>
            <a href="../detalhes-vaga/index.html" class="favorito-link" data-vaga='${JSON.stringify(v)}'>Ver vaga</a>
        </div>
    `).join('');

    lista.querySelectorAll('.favorito-link').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('vagaSelecionada', link.dataset.vaga);
        });
    });
}

function renderizarInteresses() {
    const vagas = JSON.parse(localStorage.getItem('vagasInteresse') || '[]');
    const lista = document.getElementById('lista-interesses');
    if (!vagas.length) return;
    lista.innerHTML = vagas.map(v => `
        <div class="favorito-item">
            <div>
                <div class="favorito-titulo">${v.titulo}</div>
                <div class="favorito-empresa">${v.empresa}</div>
            </div>
            <a href="../detalhes-vaga/index.html" class="favorito-link" data-vaga='${JSON.stringify(v)}'>Ver vaga</a>
        </div>
    `).join('');

    lista.querySelectorAll('.favorito-link').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('vagaSelecionada', link.dataset.vaga);
        });
    });
}