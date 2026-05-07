const API_VAGAS = '/vagas';

// Resgata o ID da vaga via query string (?id=1)
const params = new URLSearchParams(window.location.search);
const vagaId = parseInt(params.get('id'));

function exibirVaga(vaga) {
  document.getElementById('vaga-titulo').textContent = vaga.titulo;
  document.getElementById('vaga-empresa').textContent = vaga.empresa;
  document.getElementById('vaga-local').textContent = '📍 ' + vaga.local;
  document.getElementById('vaga-modalidade').textContent = '🏠 ' + vaga.modalidade;
  document.getElementById('vaga-carga').textContent = '🕐 ' + vaga.cargaHoraria;
  document.getElementById('vaga-bolsa').textContent = 'Bolsa: R$ ' + vaga.bolsa.toFixed(2) + '/mês';
  document.getElementById('vaga-descricao').textContent = vaga.descricao;

  const listaReq = document.getElementById('vaga-requisitos');
  vaga.requisitos.forEach(req => {
    const li = document.createElement('li');
    li.textContent = req;
    listaReq.appendChild(li);
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('vaga-container').style.display = 'block';
}

function mostrarFeedback(msg, cor) {
  const el = document.getElementById('msg-feedback');
  el.textContent = msg;
  el.style.color = cor;
  el.style.display = 'block';
}

function demonstrarInteresse() {
  const usuarioJSON = sessionStorage.getItem('usuarioCorrente');
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : { id: 'anonimo' };

  const interesses = JSON.parse(localStorage.getItem('interesses') || '[]');
  const jaExiste = interesses.find(i => i.vagaId === vagaId && i.usuarioId === usuario.id);

  if (jaExiste) {
    mostrarFeedback('Você já demonstrou interesse nesta vaga!', '#ff7645');
    return;
  }

  interesses.push({ vagaId, usuarioId: usuario.id, data: new Date().toISOString() });
  localStorage.setItem('interesses', JSON.stringify(interesses));
  mostrarFeedback('Interesse registrado com sucesso!', '#198754');
}

function denunciarVaga() {
  const usuarioJSON = sessionStorage.getItem('usuarioCorrente');
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : { id: 'anonimo' };

  const denuncias = JSON.parse(localStorage.getItem('denuncias') || '[]');
  const jaExiste = denuncias.find(d => d.vagaId === vagaId && d.usuarioId === usuario.id);

  if (jaExiste) {
    mostrarFeedback('Você já denunciou esta vaga.', '#ff7645');
    return;
  }

  denuncias.push({ vagaId, usuarioId: usuario.id, data: new Date().toISOString() });
  localStorage.setItem('denuncias', JSON.stringify(denuncias));
  mostrarFeedback('Vaga denunciada. Obrigado pelo aviso!', '#dc3545');
}

// Carrega as vagas e encontra pelo ID
document.addEventListener('DOMContentLoaded', () => {
  if (!vagaId) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('erro').style.display = 'block';
    return;
  }

  fetch(API_VAGAS)
    .then(res => res.json())
    .then(vagas => {
      const vaga = vagas.find(v => v.id === vagaId);
      if (!vaga) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('erro').style.display = 'block';
        return;
      }
      exibirVaga(vaga);
    })
    .catch(() => {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('erro').textContent = 'Erro ao carregar a vaga.';
      document.getElementById('erro').style.display = 'block';
    });
});
