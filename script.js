/* ─── CUSTOM CURSOR ─── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});
window.addEventListener('mousedown', () => { dot.classList.add('clicking'); ring.classList.add('clicking'); });
window.addEventListener('mouseup',   () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); });

// Ring lags behind with lerp
(function lerpRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(lerpRing);
})();

document.querySelectorAll('a, button, .project-card, .skill-tag, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
  el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
});

/* ─── SCROLL PROGRESS BAR ─── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
}, { passive: true });

/* ─── PROJECT CARD PREVIEWS ─── */
const previewKeys = ['stashly', 'querywise', 'answerkey'];
document.querySelectorAll('.project-card').forEach((card, i) => {
  const preview = document.createElement('div');
  preview.className = 'project-preview';
  preview.dataset.proj = previewKeys[i] ?? 'stashly';
  card.insertBefore(preview, card.firstChild);
});

/* ─── TOAST ─── */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ─── CONTACT COPY TO CLIPBOARD ─── */
document.querySelectorAll('.contact-card').forEach(card => {
  const href = card.getAttribute('href') || '';
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    card.addEventListener('click', e => {
      e.preventDefault();
      const value = href.replace('mailto:', '').replace('tel:', '').replace(/\+91/, '');
      navigator.clipboard.writeText(value.trim()).then(() => {
        showToast('Copied: ' + value.trim());
      });
    });
  }
});

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── ACTIVE NAV LINK (scroll spy) ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => spyObserver.observe(s));

/* ─── REVEAL ON SCROLL ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => setTimeout(() => el.classList.add('visible'), idx * 90));
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ─── TYPING ANIMATION ─── */
const phrases = ['backend systems.', 'full-stack products.', 'APIs that scale.', 'things that ship.'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 65);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 300); return;
    }
    setTimeout(type, 38);
  }
}
setTimeout(type, 800);

/* ─── TEXT SCRAMBLE ─── */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const old = this.el.innerText;
    const len = Math.max(old.length, newText.length);
    const promise = new Promise(res => this.resolve = res);
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * 8);
      const end   = start + Math.floor(Math.random() * 10);
      this.queue.push({ from: old[i] || '', to: newText[i] || '', start, end, char: '' });
    }
    cancelAnimationFrame(this.raf);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let out = '', done = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        done++; out += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        out += `<span class="scramble-char">${char}</span>`;
      } else { out += from; }
    }
    this.el.innerHTML = out;
    if (done === this.queue.length) { this.resolve(); }
    else { this.raf = requestAnimationFrame(this.update); this.frame++; }
  }
}


// Glitch on hero name hover
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const nameFirst = heroName.querySelector('.name-first');
  nameFirst.setAttribute('data-text', nameFirst.textContent);
  let glitchTimeout;
  heroName.addEventListener('mouseenter', () => {
    heroName.classList.add('glitching');
    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => heroName.classList.remove('glitching'), 420);
  });
}

/* ─── 3D CARD TILT ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2,       cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) *  5;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.22s ease, background 0.22s ease';
    card.style.transform = '';
    setTimeout(() => card.style.transition = '', 500);
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.22s ease, background 0.22s ease';
  });
});

/* ─── MOUSE-TRACKING GLOW (hero) ─── */
const heroSection = document.getElementById('hero');
const heroGlow    = document.querySelector('.hero-glow');
if (heroSection && heroGlow) {
  heroSection.addEventListener('mousemove', e => {
    const r = heroSection.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    heroGlow.style.background = `radial-gradient(ellipse 600px 300px at ${x}% ${y}%, rgba(181,242,61,0.1) 0%, transparent 70%)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroGlow.style.background = '';
  });
}

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease';
    btn.style.transform = '';
    setTimeout(() => btn.style.transition = '', 500);
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.1s ease';
  });
});

/* ─── SMOOTH NAV CLICK ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
