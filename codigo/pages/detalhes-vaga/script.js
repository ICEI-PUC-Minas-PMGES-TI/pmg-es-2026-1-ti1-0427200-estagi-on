function exibirVaga(vaga) {
  document.getElementById('vaga-titulo').textContent = vaga.titulo;
  document.getElementById('vaga-empresa').textContent = vaga.empresa;
  document.getElementById('vaga-local').textContent = '📍 ' + vaga.local;
  document.getElementById('vaga-modalidade').textContent = '🏠 ' + vaga.modalidade;
  document.getElementById('vaga-carga').textContent = '🕐 ' + vaga.cargaHoraria;
  document.getElementById('vaga-bolsa').textContent = 'Bolsa: R$ ' + vaga.bolsa.toFixed(2) + '/mês';
  document.getElementById('vaga-descricao').textContent = vaga.descricao;
  document.getElementById('vaga-contato').textContent = '✉️ ' + vaga.contato;

  const listaReq = document.getElementById('vaga-requisitos');
  vaga.requisitos.forEach(req => {
    const li = document.createElement('li');
    li.textContent = req;
    listaReq.appendChild(li);
  });

  atualizarBotaoFavorito(vaga.id);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('vaga-container').style.display = 'block';
}

function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos') || '[]');
}

function atualizarBotaoFavorito(vagaId) {
  const btn = document.getElementById('btn-favoritar');
  const favoritado = getFavoritos().includes(vagaId);
  btn.classList.toggle('favoritado', favoritado);
  btn.title = favoritado ? 'Remover dos favoritos' : 'Favoritar vaga';
}

function toggleFavorito() {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));
  const favoritos = getFavoritos();
  const idx = favoritos.indexOf(vaga.id);
  if (idx === -1) favoritos.push(vaga.id);
  else favoritos.splice(idx, 1);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  atualizarBotaoFavorito(vaga.id);
}

function mostrarFeedback(msg, cor) {
  const el = document.getElementById('msg-feedback');
  el.textContent = msg;
  el.style.color = cor;
  el.style.display = 'block';
}

function demonstrarInteresse() {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));
  const interesses = JSON.parse(localStorage.getItem('interesses') || '[]');
  const jaExiste = interesses.find(i => i.vagaId === vaga.id);

  if (jaExiste) {
    mostrarFeedback('Você já demonstrou interesse nesta vaga!', '#06b9fc');
    return;
  }

  interesses.push({ vagaId: vaga.id, data: new Date().toISOString() });
  localStorage.setItem('interesses', JSON.stringify(interesses));
  mostrarFeedback('Interesse registrado com sucesso!', '#0598ce');
}

document.addEventListener('DOMContentLoaded', () => {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));

  if (!vaga) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('erro').style.display = 'block';
    return;
  }

  exibirVaga(vaga);
});
