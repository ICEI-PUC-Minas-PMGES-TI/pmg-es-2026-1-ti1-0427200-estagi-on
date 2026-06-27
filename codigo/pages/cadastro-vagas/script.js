const API_URL = "http://localhost:3000/vagas";

let empresaLogada = null; 
let vagasDaEmpresa = []; 
document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPaginaParaEmpresa()) return;

  preencherCampoEmpresaFixo();
  carregarVagas();
});

function protegerPaginaParaEmpresa() {
  const usuario = obterUsuarioAtivo(); 

  if (!usuario || usuario.tipo !== "empresa") {
    alert("Acesso restrito a empresas. Faça login como empresa para continuar.");
    window.location.href = "./../../pages/login/index.html";
    return false;
  }

  empresaLogada = usuario;
  return true;
}

function preencherCampoEmpresaFixo() {
  const inputEmpresa = document.getElementById("input-empresa");
  if (inputEmpresa) {
    inputEmpresa.value = empresaLogada.nome || "";
  }
}

function exibirMensagem(texto, tipo = "sucesso") {
  const el = document.getElementById("mensagem");
  if (!el) return;

  el.textContent = texto;
  el.classList.remove("oculto", "sucesso", "erro");
  el.classList.add(tipo);

  setTimeout(() => {
    el.classList.add("oculto");
  }, 3500);
}

function obterIdEmpresaLogada() {

  return Number(empresaLogada.id);
}

async function carregarVagas() {
  try {
    const empresaId = obterIdEmpresaLogada();
    const resposta = await fetch(`${API_URL}?empresaId=${empresaId}`);

    if (!resposta.ok) throw new Error("Erro ao buscar vagas");

    vagasDaEmpresa = await resposta.json();
    renderizarTabela(vagasDaEmpresa);
  } catch (erro) {
    console.error(erro);
    exibirMensagem("Erro ao carregar vagas.", "erro");
  }
}

function renderizarTabela(vagas) {
  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = "";

  if (!vagas || vagas.length === 0) {
    corpoTabela.innerHTML = `<tr class="linha-vazia"><td colspan="8">Nenhuma vaga cadastrada.</td></tr>`;
    return;
  }

  vagas.forEach((vaga) => {
    const requisitosTexto = Array.isArray(vaga.requisitos)
      ? vaga.requisitos.join(", ")
      : (vaga.requisitos || "");

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${escapeHtml(vaga.titulo)}</td>
      <td>${vaga.bolsa != null ? "R$ " + Number(vaga.bolsa).toFixed(2) : ""}</td>
      <td>${escapeHtml(vaga.cargaHoraria || "")}</td>
      <td>${escapeHtml(vaga.modalidade || "")}</td>
      <td>${escapeHtml(vaga.local || "")}</td>
      <td>${escapeHtml(vaga.descricao || "")}</td>
      <td>${escapeHtml(requisitosTexto)}</td>
      <td>
        <button class="btn-editar" onclick="selecionarParaEdicao('${vaga.id}')">Editar</button>
        <button class="btn-excluir" onclick="excluirVaga('${vaga.id}')">Excluir</button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });
}

function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function obterDadosDoFormulario() {
  const titulo = document.getElementById("input-titulo").value.trim();
  const bolsaTexto = document.getElementById("input-bolsa").value.trim();
  const cargaHoraria = document.getElementById("input-carga-horaria").value.trim();
  const modalidade = document.getElementById("input-modalidade").value.trim();
  const local = document.getElementById("input-local").value.trim();
  const descricao = document.getElementById("input-descricao").value.trim();
  const requisitosTexto = document.getElementById("input-requisitos").value.trim();

  const requisitos = requisitosTexto
    ? requisitosTexto.split(",").map((r) => r.trim()).filter((r) => r.length > 0)
    : [];

  return {
    titulo,
    empresa: empresaLogada.nome,
    empresaId: obterIdEmpresaLogada(),
    bolsa: bolsaTexto ? Number(bolsaTexto) : null,
    cargaHoraria,
    modalidade,
    local,
    descricao,
    requisitos,
  };
}

function validarDados(dados) {
  if (!dados.titulo) {
    exibirMensagem("Informe o título da vaga.", "erro");
    return false;
  }
  return true;
}

async function criarVaga() {
  const dados = obterDadosDoFormulario();
  if (!validarDados(dados)) return;

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) throw new Error("Erro ao criar vaga");

    exibirMensagem("Vaga criada com sucesso!", "sucesso");
    limparFormulario();
    carregarVagas();
  } catch (erro) {
    console.error(erro);
    exibirMensagem("Erro ao criar vaga.", "erro");
  }
}

function selecionarParaEdicao(id) {
  const vaga = vagasDaEmpresa.find((v) => String(v.id) === String(id));
  if (!vaga) return;

  document.getElementById("vaga-id").value = vaga.id;
  document.getElementById("input-titulo").value = vaga.titulo || "";
  document.getElementById("input-bolsa").value = vaga.bolsa != null ? vaga.bolsa : "";
  document.getElementById("input-carga-horaria").value = vaga.cargaHoraria || "";
  document.getElementById("input-modalidade").value = vaga.modalidade || "";
  document.getElementById("input-local").value = vaga.local || "";
  document.getElementById("input-descricao").value = vaga.descricao || "";
  document.getElementById("input-requisitos").value = Array.isArray(vaga.requisitos)
    ? vaga.requisitos.join(", ")
    : (vaga.requisitos || "");

  document.getElementById("btn-criar").disabled = true;
  document.getElementById("btn-atualizar").disabled = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function atualizarVaga() {
  const id = document.getElementById("vaga-id").value;
  if (!id) {
    exibirMensagem("Selecione uma vaga para atualizar.", "erro");
    return;
  }

  const pertence = vagasDaEmpresa.some((v) => String(v.id) === String(id));
  if (!pertence) {
    exibirMensagem("Você não tem permissão para editar esta vaga.", "erro");
    return;
  }

  const dados = obterDadosDoFormulario();
  if (!validarDados(dados)) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...dados }),
    });

    if (!resposta.ok) throw new Error("Erro ao atualizar vaga");

    exibirMensagem("Vaga atualizada com sucesso!", "sucesso");
    limparFormulario();
    carregarVagas();
  } catch (erro) {
    console.error(erro);
    exibirMensagem("Erro ao atualizar vaga.", "erro");
  }
}

async function excluirVaga(id) {
  const pertence = vagasDaEmpresa.some((v) => String(v.id) === String(id));
  if (!pertence) {
    exibirMensagem("Você não tem permissão para excluir esta vaga.", "erro");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja excluir esta vaga?");
  if (!confirmar) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!resposta.ok) throw new Error("Erro ao excluir vaga");

    exibirMensagem("Vaga excluída com sucesso!", "sucesso");
    carregarVagas();
  } catch (erro) {
    console.error(erro);
    exibirMensagem("Erro ao excluir vaga.", "erro");
  }
}
function limparFormulario() {
  document.getElementById("vaga-id").value = "";
  document.getElementById("input-titulo").value = "";
  document.getElementById("input-bolsa").value = "";
  document.getElementById("input-carga-horaria").value = "";
  document.getElementById("input-modalidade").value = "";
  document.getElementById("input-local").value = "";
  document.getElementById("input-descricao").value = "";
  document.getElementById("input-requisitos").value = "";

  document.getElementById("btn-criar").disabled = false;
  document.getElementById("btn-atualizar").disabled = true;
}