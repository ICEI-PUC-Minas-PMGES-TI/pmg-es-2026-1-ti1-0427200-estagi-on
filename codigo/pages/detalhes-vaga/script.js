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
  atualizarBotaoInteresse(vaga.id);
  atualizarBotaoCurriculo();

  document.getElementById('loading').style.display = 'none';
  document.getElementById('vaga-container').style.display = 'block';
}

function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos') || '[]');
}

function getVagasFavoritas() {
  return JSON.parse(localStorage.getItem('vagasFavoritas') || '[]');
}

function atualizarBotaoFavorito(vagaId) {
  const btn = document.getElementById('btn-favoritar');
  const favoritado = getFavoritos().includes(vagaId);
  btn.classList.toggle('favoritado', favoritado);
  btn.title = favoritado ? 'Remover dos favoritos' : 'Favoritar vaga';
}

function mostrarToast(msg) {
  const toast = document.getElementById('toast-favorito');
  toast.textContent = msg;
  toast.classList.add('visivel');
  setTimeout(() => toast.classList.remove('visivel'), 3000);
}

function toggleFavorito() {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));
  const favoritos = getFavoritos();
  const vagasFavoritas = getVagasFavoritas();
  const idx = favoritos.indexOf(vaga.id);
  if (idx === -1) {
    favoritos.push(vaga.id);
    vagasFavoritas.push(vaga);
    mostrarToast('❤️ "' + vaga.titulo + '" adicionada aos favoritos!');
  } else {
    favoritos.splice(idx, 1);
    const idxVaga = vagasFavoritas.findIndex(v => v.id === vaga.id);
    if (idxVaga !== -1) vagasFavoritas.splice(idxVaga, 1);
    mostrarToast('🤍 "' + vaga.titulo + '" removida dos favoritos.');
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  localStorage.setItem('vagasFavoritas', JSON.stringify(vagasFavoritas));
  atualizarBotaoFavorito(vaga.id);
}

function getCurriculo() {
  return localStorage.getItem('curriculo') || null;
}

function atualizarBotaoCurriculo() {
  const btn = document.getElementById('btn-curriculo');
  const curriculo = getCurriculo();
  btn.textContent = curriculo ? '📄 Ver Currículo' : '📄 Anexar Currículo';
}

function acaoCurriculo() {
  const curriculo = getCurriculo();
  if (curriculo) {
    const base64 = localStorage.getItem('curriculoBase64');
    if (base64) {
      const a = document.createElement('a');
      a.href = base64;
      a.target = '_blank';
      a.click();
    }
  } else {
    document.getElementById('input-curriculo-vaga').click();
  }
}

function atualizarBotaoInteresse(vagaId) {
  const interesses = JSON.parse(localStorage.getItem('interesses') || '[]');
  const temInteresse = interesses.some(i => i.vagaId === vagaId);
  const btn = document.getElementById('btn-interesse');
  btn.textContent = temInteresse ? 'Não tenho interesse' : 'Tenho interesse';
  btn.classList.toggle('btn-sem-interesse', temInteresse);
  btn.disabled = !temInteresse && !getCurriculo();
  btn.title = (!temInteresse && !getCurriculo()) ? 'Anexe um currículo antes de demonstrar interesse' : '';
}

function demonstrarInteresse() {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));
  const interesses = JSON.parse(localStorage.getItem('interesses') || '[]');
  const vagasInteresse = JSON.parse(localStorage.getItem('vagasInteresse') || '[]');
  const idx = interesses.findIndex(i => i.vagaId === vaga.id);

  if (idx === -1) {
    interesses.push({ vagaId: vaga.id, data: new Date().toISOString() });
    vagasInteresse.push(vaga);
    mostrarToast('💼 Interesse registrado em "' + vaga.titulo + '"!');
  } else {
    interesses.splice(idx, 1);
    const idxVaga = vagasInteresse.findIndex(v => v.id === vaga.id);
    if (idxVaga !== -1) vagasInteresse.splice(idxVaga, 1);
    mostrarToast('🚫 Interesse removido de "' + vaga.titulo + '".');
  }

  localStorage.setItem('interesses', JSON.stringify(interesses));
  localStorage.setItem('vagasInteresse', JSON.stringify(vagasInteresse));
  atualizarBotaoInteresse(vaga.id);
}

document.addEventListener('DOMContentLoaded', () => {
  const vaga = JSON.parse(localStorage.getItem('vagaSelecionada'));

  if (!vaga) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('erro').style.display = 'block';
    return;
  }

  exibirVaga(vaga);

  document.getElementById('input-curriculo-vaga').addEventListener('change', function () {
    if (this.files[0]) {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        localStorage.setItem('curriculo', file.name);
        localStorage.setItem('curriculoBase64', e.target.result);
        atualizarBotaoCurriculo();
        atualizarBotaoInteresse(vaga.id);
        mostrarToast('✅ Currículo "' + file.name + '" anexado com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  });
});
