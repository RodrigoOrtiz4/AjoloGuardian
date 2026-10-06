// Parallax: los elementos con data-speed se desplazan a una fracción del scroll
const movibles = [...document.querySelectorAll('[data-speed]')];
let espera = false;

function mover() {
  movibles.forEach(el => 
    el.style.transform = `translate3d(0,${scrollY * el.dataset.speed}px,0)`
  );
  espera = false;
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('scroll', () => { 
    if (!espera) { 
      espera = true; 
      requestAnimationFrame(mover); 
    } }, {passive: true});
}