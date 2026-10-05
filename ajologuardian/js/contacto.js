const form = document.getElementById('form'), tema = document.getElementById('tema');
const campos = document.getElementById('camposReporte');
const reqs = campos.querySelectorAll('[data-req]');
const esReporte = () => tema.selectedOptions[0].parentElement.label == 'Reportar un problema';

function ajustar() {
  const r = esReporte();
  campos.classList.toggle('d-none', !r);
  reqs.forEach(i => i.required = r);
  document.getElementById('msgLabel').textContent = r ? 'Describe lo que viste' : 'Escribe tu pregunta';
}

tema.addEventListener('change', ajustar); 
ajustar();
document.getElementById('fecha').max = new Date().toISOString().split('T')[0];

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) { 
    form.classList.add('was-validated'); 
    return; 
  }

  const r = esReporte(), folio = (r ? 'AJ-' : 'DU-') + Math.floor(1000 + Math.random() * 9000);
  const ok = document.getElementById('ok');
  ok.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i>${r ? 'Reporte enviado.' : 'Pregunta enviada. Te responderemos por correo.'} Tu folio es <strong>${folio}</strong>. Gracias por cuidar al ajolote.`;
  ok.classList.remove('d-none'); ok.scrollIntoView({behavior:'smooth', block:'center'});
  form.reset(); form.classList.remove('was-validated'); ajustar();
});