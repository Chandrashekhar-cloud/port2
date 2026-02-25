'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* LOADER */
window.addEventListener('load', () => {
  const bar = $('#loaderBar');
  const pct = $('#loaderPct');
  const text = $('#loaderText');
  let p = 0;

  const iv = setInterval(() => {
    p += Math.random() * 6;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      const loader = $('#loader');
      if (loader) loader.classList.add('hidden');
    }
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = Math.floor(p) + '%';
    if (text) text.textContent = p < 70 ? 'LOADING MODULES...' : 'SYSTEM READY';
  }, 35);
});

/* CURSOR */
const cursor = $('#cursor');
const follower = $('#cursorFollower');
if (cursor && follower) {
  let fx = 0, fy = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    fx = e.clientX; fy = e.clientY;
    cursor.style.left = fx + 'px';
    cursor.style.top = fy + 'px';
  });
  const loop = () => {
    cx += (fx - cx) * 0.15;
    cy += (fy - cy) * 0.15;
    follower.style.left = cx + 'px';
    follower.style.top = cy + 'px';
    requestAnimationFrame(loop);
  };
  loop();
}

/* TERMINAL */
const term = $('#termScreen');
const lines = [
  '$ cd /home/infra',
  '$ ./deploy.sh --prod',
  'Checking health metrics...',
  'Uptime: 99.95% ✓',
  'Deploy success (5m 12s)',
  '$ curl /api/status',
  '{"ready": true}'
];
let i = 0;
function type() {
  if (!term) return;
  if (i < lines.length) {
    const d = document.createElement('div');
    d.textContent = lines[i++];
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
    setTimeout(type, 250 + Math.random() * 150);
  }
}
type();

/* REVEAL */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // Update active nav indicator
      const navLinks = $$('.nav a');
      navLinks.forEach(a => a.classList.remove('active'));
      const sectionId = e.target.id || e.target.closest('.section')?.id;
      if (sectionId) {
        const activeLink = $(`nav a[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    }
  });
}, { threshold: 0.25 });

$$('.section.reveal-up').forEach(el => io.observe(el));
$$('.reveal-up').forEach(el => io.observe(el));

/* Nav toggle + smooth scroll */
const navToggle = $('#navToggle');
const mainNav = $('#mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('show');
  });
}

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
        if (mainNav) mainNav.classList.remove('show');
        if (navToggle) navToggle.setAttribute('aria-expanded','false');
      }
    }
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mainNav && mainNav.classList.contains('show')) {
    mainNav.classList.remove('show');
    if (navToggle) navToggle.setAttribute('aria-expanded','false');
  }
});

/* FOOTER YEAR */
const yr = $('#yr');
if (yr) yr.textContent = `© ${new Date().getFullYear()} Chandrashekhar H S`;

/* Scroll effects */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const header = $('.site-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 10);
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });