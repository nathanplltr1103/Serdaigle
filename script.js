// NAVIGATION ET MENU
function toggleMobileMenu() {
  const menu = document.getElementById('nav-mobile');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}
function closeMobileMenu() {
  const menu = document.getElementById('nav-mobile');
  menu.style.display = 'none';
}

function showPage(pageId, clickedLink) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const selectedPage = document.getElementById('page-' + pageId);
  if (selectedPage) selectedPage.classList.add('active');
  // Desktop nav
  document.querySelectorAll('#nav-links a').forEach(link => link.classList.remove('active'));
  // Mobile nav
  document.querySelectorAll('#nav-mobile a').forEach(link => link.classList.remove('active'));
  if (clickedLink) clickedLink.classList.add('active');
  closeMobileMenu();
  window.scrollTo(0, 0);
}

// DARK MODE
document.addEventListener('DOMContentLoaded', () => {
  showPage('accueil', document.querySelector('#nav-links a[onclick*=\'accueil\']'));
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('darkModeBtn').onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('serdaigleDark', document.body.classList.contains('dark') ? '1' : '0');
  };
  if (localStorage.getItem('serdaigleDark') === '1') {
    document.body.classList.add('dark');
  }
  // Lance les particules sur la page accueil
  startParticles();
});

// --- ENIGME SERDAIGLE ---
function normalize(txt) {
  return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function checkEnigme() {
  const reponse = normalize(document.getElementById('enigme-input').value.trim());
  const bonnesReponses = [
    "aigle", "l'aigle", "aigle bleu", "un aigle", "l aigle"
  ];
  const ok = bonnesReponses.some(r => reponse === normalize(r));
  document.getElementById('enigme-feedback').innerText = ok
    ? "Bravo, c’est bien l’Aigle ! 🦅"
    : "Essaie encore... (Indice : ce n’est PAS le corbeau !)";
}

// --- PARTICULES MAGIQUES EN ACCUEIL ---
function startParticles() {
  // Crée le canvas si pas présent déjà
  let bg = document.querySelector('.hero-bg');
  if (!bg) return;
  let canvas = document.createElement('canvas');
  canvas.id = "serdaigle-particles";
  canvas.width = bg.offsetWidth || 900;
  canvas.height = 160;
  canvas.style.position = 'absolute';
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.width = "100%";
  canvas.style.height = "160px";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "2";
  bg.insertBefore(canvas, bg.firstChild);

  let ctx = canvas.getContext('2d');
  let w = canvas.width, h = canvas.height;
  let particles = [];
  for (let i = 0; i < 36; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 1.1,
      dx: Math.random() * 0.7 - 0.35,
      dy: Math.random() * 0.6 - 0.1,
      c: (Math.random() < 0.6 ? '#b08d57' : '#5d8aa8')
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.78;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
        p.x = Math.random() * w;
        p.y = -5;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
