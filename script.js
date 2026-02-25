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
const lines = ['$ whoami','chandrashekhar_hs','','$ role','DevOps Engineer | SRE Aspirant','','$ uptime_target','99.9%'];
let i = 0;
function type() {
  if (!term) return;
  if (i < lines.length) {
    const d = document.createElement('div');
    d.textContent = lines[i++];
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
    setTimeout(type, 260 + Math.random() * 120);
  }
}
type();

/* REVEAL */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

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
    if (href && href.startsWith('#')) {
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

/* FOOTER YEAR */
const yr = $('#yr');
if (yr) yr.textContent = `© ${new Date().getFullYear()} Chandrashekhar H S`;