const currentUserId = 1;
const targetUserId = 2;

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

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

  if (!textoDigitado) {
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

sendButton.addEventListener("click", enviarMensagem);

messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    enviarMensagem();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  carregarMensagens();
});
