const hoje = new Date();
let cursor = new Date(hoje);
let eventoEditandoId = null;
let popupEventoId = null;

let eventos = [
  {
    id: "1",
    titulo: "Entrevista - TechSolutions",
    descricao: "Entrevista para Estágio.",
    data: formatarData(hoje),
    horaInicio: "10:00",
    horaFim: "11:00",
    tipo: "entrevista",
    modalidade: "Online",
  },
];

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const DIAS_SEMANA_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DIAS_SEMANA_LONGO = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const COR_TEXTO_TIPO = {
  entrevista: "#185FA5",
  prazo: "#9D5700",
  teste: "#7B2FBE",
  resultado: "#198754",
  inicio: "#157069",
  outro: "#C0392B",
};

function gerarId() {
  return Math.random().toString(36).slice(2);
}
function formatarData(data) {
  return data.toISOString().slice(0, 10);
}
function somarDias(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() + dias);
  return nova;
}
function converterData(texto) {
  const [ano, mes, dia] = texto.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function renderizar() {
  const elementoPeriodo = document.getElementById("topo-periodo");
  if (elementoPeriodo) {
    elementoPeriodo.textContent = `${MESES[cursor.getMonth()]} ${cursor.getFullYear()}`;
  }

  const area = document.getElementById("conteudo");
  if (!area) return; // Proteção contra a tela branca!

  const ano = cursor.getFullYear();
  const mes = cursor.getMonth();
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const inicioDaSemanaDoMes = primeiroDia.getDay();
  const hojeStr = formatarData(hoje);

  const celulas = [];
  for (let i = inicioDaSemanaDoMes - 1; i >= 0; i--)
    celulas.push({ data: somarDias(primeiroDia, -i - 1), outroMes: true });
  for (let d = 1; d <= ultimoDia.getDate(); d++)
    celulas.push({ data: new Date(ano, mes, d), outroMes: false });
  while (celulas.length < 42)
    celulas.push({
      data: somarDias(
        ultimoDia,
        celulas.length - (inicioDaSemanaDoMes + ultimoDia.getDate()) + 1,
      ),
      outroMes: true,
    });

  area.innerHTML = `
    <div class="cal-mes">
      <div class="cal-dias-semana">
        ${DIAS_SEMANA_CURTO.map((d) => `<div class="cal-dia-semana">${d}</div>`).join("")}
      </div>
      <div class="cal-grade" id="grade-mes"></div>
    </div>`;

  const grade = area.querySelector("#grade-mes");

  celulas.forEach(({ data, outroMes }) => {
    const dataStr = formatarData(data);
    const eventosNoDia = eventos.filter((e) => e.data === dataStr);
    const visiveis = eventosNoDia.slice(0, 3);
    const restantes = eventosNoDia.length - visiveis.length;

    const celula = document.createElement("div");
    celula.className =
      "cal-celula" +
      (outroMes ? " outro-mes" : "") +
      (dataStr === hojeStr ? " hoje" : "");
    celula.innerHTML = `
      <div class="cal-numero-dia">${data.getDate()}</div>
      <div class="cal-eventos-dia">
        ${visiveis.map((ev) => `<div class="cal-evento-chip tipo-${ev.tipo}" data-id="${ev.id}">${ev.titulo}</div>`).join("")}
        ${restantes > 0 ? `<div class="cal-mais-eventos">+${restantes} mais</div>` : ""}
      </div>`;

    celula.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("cal-evento-chip") ||
        e.target.classList.contains("cal-mais-eventos")
      )
        return;
      abrirModal(null, dataStr);
    });

    celula.querySelectorAll(".cal-evento-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        mostrarPopupEvento(chip.dataset.id, chip);
      });
    });

    grade.appendChild(celula);
  });
}

function abrirModal(id, dataPreenchida) {
  eventoEditandoId = id || null;
  fecharPopup();
  document.getElementById("modal-titulo").textContent = id
    ? "Editar evento"
    : "Novo evento";
  document.getElementById("campo-titulo").value = id
    ? eventos.find((e) => e.id === id).titulo
    : "";
  document.getElementById("campo-data").value = id
    ? eventos.find((e) => e.id === id).data
    : dataPreenchida || formatarData(hoje);
  document.getElementById("modal-fundo").classList.add("aberto");
}

function fecharModal() {
  document.getElementById("modal-fundo").classList.remove("aberto");
  eventoEditandoId = null;
}

function salvarEvento() {
  const titulo = document.getElementById("campo-titulo").value.trim();
  if (!titulo) return;
  const ev = {
    id: eventoEditandoId || gerarId(),
    titulo,
    data: document.getElementById("campo-data").value,
    horaInicio: document.getElementById("campo-hora-inicio").value,
    horaFim: document.getElementById("campo-hora-fim").value,
    tipo: document.getElementById("campo-tipo").value,
    modalidade: document.getElementById("campo-modalidade").value,
    descricao: document.getElementById("campo-descricao").value.trim(),
  };
  if (eventoEditandoId)
    eventos[eventos.findIndex((e) => e.id === eventoEditandoId)] = ev;
  else eventos.push(ev);
  fecharModal();
  renderizar();
}

function mostrarPopupEvento(id, ancora) {
  const ev = eventos.find((e) => e.id === id);
  if (!ev) return;
  popupEventoId = id;
  const popup = document.getElementById("popup-evento");
  document.getElementById("popup-titulo").textContent = ev.titulo;
  document.getElementById("popup-barra-cor").style.background =
    COR_TEXTO_TIPO[ev.tipo];
  popup.classList.add("aberto");

  const rect = ancora.getBoundingClientRect(); // Aqui tinha um bug no seu código original!
  let topo = rect.bottom + 8;
  let esquerda = rect.left;
  popup.style.top = `${topo}px`;
  popup.style.left = `${esquerda}px`;
}

function fecharPopup() {
  document.getElementById("popup-evento").classList.remove("aberto");
  popupEventoId = null;
}

// --- EVENTOS DE CLIQUE ---
const btnNovoEvento = document.getElementById("btn-novo-evento");
if (btnNovoEvento) btnNovoEvento.addEventListener("click", () => abrirModal());

document.getElementById("modal-fechar").addEventListener("click", fecharModal);
document.getElementById("btn-cancelar").addEventListener("click", fecharModal);
document.getElementById("btn-salvar").addEventListener("click", salvarEvento);

document.getElementById("popup-btn-editar").addEventListener("click", () => {
  if (popupEventoId) abrirModal(popupEventoId);
});
document.getElementById("popup-btn-excluir").addEventListener("click", () => {
  if (!popupEventoId) return;
  eventos = eventos.filter((e) => e.id !== popupEventoId);
  fecharPopup();
  renderizar();
});

// Inicialização
renderizar();
