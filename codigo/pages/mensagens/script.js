const currentUserId = 1;

const contatos = [
  {
    id: 2,
    nome: "TechCorp",
    tipo: "Empresa",
    ultimaMensagem: "Olá! Temos interesse em sua candidatura.",
    iniciais: "TC",
    cor: "#6366f1",
  },
  {
    id: 3,
    nome: "Maria Santos",
    tipo: "Estudante",
    ultimaMensagem: "Obrigado pela oportunidade!",
    iniciais: "MS",
    cor: "#06b6d4",
  },
  {
    id: 4,
    nome: "StartUp XYZ",
    tipo: "Empresa",
    ultimaMensagem: "Você pode se apresentar?",
    iniciais: "SX",
    cor: "#8b5cf6",
  },
  {
    id: 5,
    nome: "João Silva",
    tipo: "Estudante",
    ultimaMensagem: "Ótima vaga, vou me candidatar!",
    iniciais: "JS",
    cor: "#ec4899",
  },
  {
    id: 6,
    nome: "Consulting Plus",
    tipo: "Empresa",
    ultimaMensagem: "Entrevista agendada para amanhã",
    iniciais: "CP",
    cor: "#f59e0b",
  },
];

let targetUserId = null;

const contactsList = document.getElementById("contacts-list");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const contactName = document.getElementById("contact-name");
const contactType = document.getElementById("contact-type");
const searchInput = document.getElementById("search-contacts");

function renderizarContatos() {
  contactsList.innerHTML = "";

  contatos.forEach((contato) => {
    const li = document.createElement("li");
    li.classList.add("contact-item");
    li.setAttribute("data-contact-id", contato.id);

    li.innerHTML = `
      <div class="contact-avatar" style="background: linear-gradient(135deg, ${contato.cor}, ${contato.cor}dd);">
        ${contato.iniciais}
      </div>
      <div class="contact-info">
        <p class="contact-name">${contato.nome}</p>
        <p class="contact-preview">${contato.ultimaMensagem}</p>
        <p class="contact-type-badge">${contato.tipo}</p>
      </div>
    `;

    li.addEventListener("click", () => selecionarContato(contato.id, contato));
    contactsList.appendChild(li);
  });
}

function selecionarContato(contatoId, contatoData) {
  targetUserId = contatoId;

  document.querySelectorAll(".contact-item").forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelector(`[data-contact-id="${contatoId}"]`)
    .classList.add("active");

  const chatHeader = document.querySelector(".chat-header");
  if (chatHeader) {
    chatHeader.style.display = "block";
  }

  if (contactName) {
    contactName.textContent = contatoData.nome;
  }

  if (contactType) {
    contactType.textContent = `${contatoData.tipo}`;
  }

  messageInput.disabled = false;
  sendButton.disabled = false;

  carregarMensagens();
}

function carregarMensagens() {
  const db_mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

  const conversa = db_mensagens.filter((msg) => {
    const fromMeToTarget =
      msg.remetenteId === currentUserId && msg.destinatarioId === targetUserId;
    const fromTargetToMe =
      msg.remetenteId === targetUserId && msg.destinatarioId === currentUserId;
    return fromMeToTarget || fromTargetToMe;
  });

  chatBox.innerHTML = "";

  if (conversa.length === 0) {
    chatBox.innerHTML =
      '<div class="empty-state"><p>Nenhuma mensagem ainda. Comece a conversa!</p></div>';
    return;
  }

  conversa.forEach((msg) => {
    const balloon = document.createElement("div");
    balloon.classList.add("message");

    if (msg.remetenteId === currentUserId) {
      balloon.classList.add("message-sent");
    } else {
      balloon.classList.add("message-received");
    }

    balloon.textContent = msg.texto;
    chatBox.appendChild(balloon);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function enviarMensagem() {
  const textoDigitado = messageInput.value.trim();

  if (!textoDigitado || !targetUserId) {
    return;
  }

  const db_mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

  const novaMensagem = {
    id: Date.now(),
    remetenteId: currentUserId,
    destinatarioId: targetUserId,
    texto: textoDigitado,
    timestamp: new Date().toISOString(),
  };

  db_mensagens.push(novaMensagem);
  localStorage.setItem("mensagens", JSON.stringify(db_mensagens));

  messageInput.value = "";
  messageInput.focus();

  carregarMensagens();
}

function filtrarContatos(termo) {
  const items = document.querySelectorAll(".contact-item");

  items.forEach((item) => {
    const nome = item.querySelector(".contact-name").textContent.toLowerCase();
    const tipo = item
      .querySelector(".contact-type-badge")
      .textContent.toLowerCase();

    if (
      nome.includes(termo.toLowerCase()) ||
      tipo.includes(termo.toLowerCase())
    ) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

sendButton.addEventListener("click", enviarMensagem);

messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    enviarMensagem();
  }
});

searchInput.addEventListener("input", function (e) {
  filtrarContatos(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("mensagens")) {
    localStorage.setItem("mensagens", JSON.stringify([]));
  }

  renderizarContatos();
});
