document.querySelectorAll('.radio-status').forEach(radio => {
  radio.addEventListener('change', () => {
    const card = radio.closest('.candidato-card');
    const nome = card.querySelector('.candidato-nome').textContent;
    const candidaturas = JSON.parse(localStorage.getItem('candidaturas') || '[]');

    const index = candidaturas.findIndex(c => c.estudanteNome === nome);
    const status = radio.value.charAt(0).toUpperCase() + radio.value.slice(1);

    if (index !== -1) {
      candidaturas[index].status = status;
    } else {
      candidaturas.push({ estudanteNome: nome, status });
    }

    localStorage.setItem('candidaturas', JSON.stringify(candidaturas));
  });
});
