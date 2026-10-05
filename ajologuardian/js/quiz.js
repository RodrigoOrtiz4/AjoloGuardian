const preguntas = [...document.querySelectorAll('.pregunta')];
const barra = document.getElementById('barra'), prog = document.getElementById('prog');
const sig = document.getElementById('sig'), num = document.getElementById('num'), res = document.getElementById('resultado');

let i = 0, pts = 0;

function barraA(n) {
  const pc = Math.round(n / preguntas.length * 100);
  barra.style.width = pc + '%';
  prog.setAttribute('aria-valuenow', pc);
}

function mostrar() {
  preguntas.forEach((p, k) => p.classList.toggle('d-none', k !== i));
  const p = preguntas[i];

  p.querySelectorAll('.opcion').forEach(b => { b.disabled = false; b.classList.remove('ok', 'mal'); });
  p.querySelector('.retro').classList.add('d-none');
  sig.classList.add('d-none');
  num.textContent = `Pregunta ${i + 1} de ${preguntas.length}`;
}

preguntas.forEach(p => {
  const ops = [...p.querySelectorAll('.opcion')];

  ops.forEach((b, k) => b.addEventListener('click', () => {
    const c = +p.dataset.correcta;
    ops.forEach((o, n) => { 
      o.disabled = true; 
      if (n === c) o.classList.add('ok'); 
      else if (n === k) o.classList.add('mal'); 
    });

    if (k === c) pts++;
    p.querySelector('.ver').textContent = k === c ? '¡Correcto!' : 'Casi.';
    p.querySelector('.retro').classList.remove('d-none');
    barraA(i + 1);
    sig.textContent = i === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente pregunta';
    sig.classList.remove('d-none'); sig.focus();
  }));
});

sig.addEventListener('click', () => { 
  i++; 
  i < preguntas.length ? mostrar() : fin(); 
});

function fin() {
  preguntas.forEach(p => p.classList.add('d-none'));
  sig.classList.add('d-none'); num.classList.add('d-none');
  document.getElementById('puntos').textContent = `${pts} de ${preguntas.length} correctas`;
  document.getElementById('mensaje').textContent = pts >= 5 ? 'Eres un verdadero AjoloGuardián.' : pts >= 3 ? 'Vas muy bien, repasa un poco más.' : 'Visita la página de inicio y vuelve a intentarlo.';
  res.classList.remove('d-none');
}

document.getElementById('otra').addEventListener('click', () => {
  i = 0; pts = 0; barraA(0); 
  res.classList.add('d-none'); 
  num.classList.remove('d-none'); 
  mostrar();
});

barraA(0); mostrar();