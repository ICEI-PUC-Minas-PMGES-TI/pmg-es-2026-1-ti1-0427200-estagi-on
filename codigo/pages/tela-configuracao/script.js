const API_URL = "http://localhost:3000";

var inputNome             = document.getElementById('nome');
var inputEmail            = document.getElementById('email');
var inputEmailConfirmacao = document.getElementById('email-confirmacao');
var btnVerificarEmail     = document.getElementById('verificar-email');
var areaSenha             = document.getElementById('area-senha');
var inputNovaSenha        = document.getElementById('nova-senha');
var inputConfirmarSenha   = document.getElementById('confirmar-senha');
var btnSalvarSenha        = document.getElementById('salvar-senha');
var btnCancelar           = document.getElementById('cancelar');
var formConfiguracao      = document.getElementById('form-configuracao');
var divMensagem           = document.getElementById('mensagem');
var previewNome           = document.getElementById('preview-nome');
var previewEmail          = document.getElementById('preview-email');
var fotoPreview           = document.getElementById('foto-preview');

function exibirMensagem(texto) {
  divMensagem.textContent = texto;
  divMensagem.style.display = 'block';
  setTimeout(function() {
    divMensagem.style.display = 'none';
  }, 3000);
}

function obterRota(tipo) {
  if (tipo === 'estudante') return 'estudantes';
  if (tipo === 'empresa')   return 'empresas';
  return null;
}

function criarCampoExtra(id, label, valor, tipo) {
  var div = document.createElement('div');
  div.className = 'campo';
  div.id = 'wrap-' + id;

  var lbl = document.createElement('label');
  lbl.setAttribute('for', id);
  lbl.textContent = label;

  var input = document.createElement('input');
  input.type = tipo || 'text';
  input.id = id;
  input.value = valor || '';

  div.appendChild(lbl);
  div.appendChild(input);
  return div;
}

function renderizarCamposExtras(dados, tipo) {
  var areaExtras = document.getElementById('campos-extras');
  if (!areaExtras) return;

  areaExtras.innerHTML = '';

  if (tipo === 'estudante') {
    areaExtras.appendChild(criarCampoExtra('campo-curso',       'Curso',       dados.curso       || ''));
    areaExtras.appendChild(criarCampoExtra('campo-instituicao', 'Instituição', dados.instituicao || ''));
    areaExtras.appendChild(criarCampoExtra('campo-semestre',    'Semestre',    dados.semestre    || '', 'number'));
    areaExtras.appendChild(criarCampoExtra('campo-habilidades', 'Habilidades (separadas por vírgula)', Array.isArray(dados.habilidades) ? dados.habilidades.join(', ') : ''));
  }

  if (tipo === 'empresa') {
    areaExtras.appendChild(criarCampoExtra('campo-cnpj', 'CNPJ', dados.cnpj || ''));
    areaExtras.appendChild(criarCampoExtra('campo-area', 'Área de Atuação', dados.area || ''));
  }
}

function coletarCamposExtras(tipo) {
  var extras = {};

  if (tipo === 'estudante') {
    var curso       = document.getElementById('campo-curso');
    var instituicao = document.getElementById('campo-instituicao');
    var semestre    = document.getElementById('campo-semestre');
    var habilidades = document.getElementById('campo-habilidades');

    if (curso)       extras.curso       = curso.value.trim();
    if (instituicao) extras.instituicao = instituicao.value.trim();
    if (semestre)    extras.semestre    = parseInt(semestre.value) || 1;
    if (habilidades) {
      extras.habilidades = habilidades.value
        .split(',')
        .map(function(h) { return h.trim(); })
        .filter(function(h) { return h !== ''; });
    }
  }

  if (tipo === 'empresa') {
    var cnpj = document.getElementById('campo-cnpj');
    var area = document.getElementById('campo-area');

    if (cnpj) extras.cnpj = cnpj.value.trim();
    if (area) extras.area = area.value.trim();
  }

  return extras;
}

async function carregarDadosUsuario() {
  var usuarioAtivo = obterUsuarioAtivo();
  if (!usuarioAtivo) return;

  var rota = obterRota(usuarioAtivo.tipo);
  if (!rota) return;

  try {
    var resposta = await fetch(API_URL + '/' + rota + '/' + usuarioAtivo.id);
    if (!resposta.ok) throw new Error();

    var dados = await resposta.json();

    if (inputNome)  inputNome.value  = dados.nome  || '';
    if (inputEmail) inputEmail.value = dados.email || '';

    if (previewNome)  previewNome.textContent  = dados.nome  || '';
    if (previewEmail) previewEmail.textContent = dados.email || '';

    if (fotoPreview) {
      fotoPreview.onerror = function() { fotoPreview.style.display = 'none'; };
      fotoPreview.src = dados.foto || '';
    }

    renderizarCamposExtras(dados, usuarioAtivo.tipo);

  } catch {
    exibirMensagem('Erro ao carregar dados. Verifique se o servidor está rodando.');
  }
}

carregarDadosUsuario();

if (formConfiguracao) {
  formConfiguracao.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    var novoNome  = inputNome.value.trim();
    var novoEmail = inputEmail.value.trim();

    if (novoNome === '' || novoEmail === '') {
      exibirMensagem('Nome e e-mail não podem ficar vazios.');
      return;
    }

    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail);
    if (!emailValido) {
      exibirMensagem('Digite um e-mail válido.');
      return;
    }

    var usuarioAtivo = obterUsuarioAtivo();
    if (!usuarioAtivo) return;

    var rota = obterRota(usuarioAtivo.tipo);
    if (!rota) return;

    var camposExtras = coletarCamposExtras(usuarioAtivo.tipo);

    var dadosParaSalvar = Object.assign({ nome: novoNome, email: novoEmail }, camposExtras);

    try {
      var resposta = await fetch(API_URL + '/' + rota + '/' + usuarioAtivo.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaSalvar),
      });

      if (!resposta.ok) throw new Error();

      atualizarDadosUsuarioAtivo(dadosParaSalvar);
      carregarDadosUsuario();
      exibirMensagem('Configurações salvas com sucesso!');
    } catch {
      exibirMensagem('Erro ao salvar. Verifique se o servidor está rodando.');
    }
  });
}

if (btnVerificarEmail) {
  btnVerificarEmail.addEventListener('click', async function() {
    var emailDigitado = inputEmailConfirmacao.value.trim();

    if (emailDigitado === '') {
      exibirMensagem('Digite o e-mail de confirmação.');
      return;
    }

    var usuarioAtivo = obterUsuarioAtivo();
    if (!usuarioAtivo) return;

    var rota = obterRota(usuarioAtivo.tipo);
    if (!rota) return;

    try {
      var resposta = await fetch(API_URL + '/' + rota + '/' + usuarioAtivo.id);
      if (!resposta.ok) throw new Error();

      var dados = await resposta.json();

      if (emailDigitado.toLowerCase() === dados.email.toLowerCase()) {
        exibirMensagem('E-mail verificado! Defina sua nova senha abaixo.');
        areaSenha.style.display = 'block';
      } else {
        exibirMensagem('E-mail incorreto. Tente novamente.');
        areaSenha.style.display = 'none';
      }
    } catch {
      exibirMensagem('Erro ao verificar e-mail. Verifique se o servidor está rodando.');
    }
  });
}

if (btnSalvarSenha) {
  btnSalvarSenha.addEventListener('click', async function() {
    var novaSenha      = inputNovaSenha.value;
    var confirmarSenha = inputConfirmarSenha.value;

    if (novaSenha === '' || confirmarSenha === '') {
      exibirMensagem('Preencha os dois campos de senha.');
      return;
    }

    if (novaSenha.length < 6) {
      exibirMensagem('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      exibirMensagem('As senhas não coincidem.');
      return;
    }

    var usuarioAtivo = obterUsuarioAtivo();
    if (!usuarioAtivo) return;

    var rota = obterRota(usuarioAtivo.tipo);
    if (!rota) return;

    try {
      var resposta = await fetch(API_URL + '/' + rota + '/' + usuarioAtivo.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: novaSenha }),
      });

      if (!resposta.ok) throw new Error();

      inputNovaSenha.value        = '';
      inputConfirmarSenha.value   = '';
      inputEmailConfirmacao.value = '';
      areaSenha.style.display     = 'none';

      exibirMensagem('Senha alterada com sucesso!');
    } catch {
      exibirMensagem('Erro ao alterar senha. Verifique se o servidor está rodando.');
    }
  });
}

if (btnCancelar) {
  btnCancelar.addEventListener('click', function() {
    inputEmailConfirmacao.value = '';
    inputNovaSenha.value        = '';
    inputConfirmarSenha.value   = '';

    if (areaSenha) areaSenha.style.display = 'none';

    carregarDadosUsuario();
    exibirMensagem('Alterações canceladas.');
  });
}