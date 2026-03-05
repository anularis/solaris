/* ============================================================
   MAIN.JS — Navigation · Search · Canvas · Scroll Reveal
   ============================================================ */

'use strict';

/* ---- SEARCH INDEX (easily extendable) ---- */
const SEARCH_INDEX = [
  // Pages
  { type: 'Page',     title: 'Home',                         href: '../index.html' },
  { type: 'Page',     title: 'Research',                     href: '../research/index.html' },
  { type: 'Page',     title: 'Writing',                      href: '../writing/index.html' },
  { type: 'Page',     title: 'Media & Lectures',             href: '../media/index.html' },
  { type: 'Page',     title: 'About',                        href: '../about/index.html' },
  { type: 'Page',     title: 'Contact',                      href: '../contact/index.html' },
  // Research — add new papers here
  { type: 'Research', title: 'Memory, Identity & the Archive', href: '../research/index.html' },
  { type: 'Research', title: 'Decolonising the Historical Canon', href: '../research/index.html' },
  { type: 'Research', title: 'Amarna & the Heretic King',    href: '../research/index.html' },
  { type: 'Research', title: 'Grief and Political Theory',   href: '../research/index.html' },
  { type: 'Research', title: 'Diplomacy in the Ancient Near East', href: '../research/index.html' },
  // Writing
  { type: 'Writing',  title: 'On the Cartography of Loss',   href: '../writing/index.html' },
  { type: 'Writing',  title: 'The Archaeology of Silence',   href: '../writing/index.html' },
  { type: 'Writing',  title: 'Empires of Mind',              href: '../writing/index.html' },
];

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile hamburger
  const burger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Active link
  const currentPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(currentPage) || (currentPage === '' && href.includes('index.html'))) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   SEARCH OVERLAY
   ============================================================ */
function initSearch() {
  const overlay   = document.getElementById('search-overlay');
  const input     = document.getElementById('search-input');
  const results   = document.getElementById('search-results');
  const openBtns  = document.querySelectorAll('[data-search-open]');
  const closeBtns = document.querySelectorAll('[data-search-close]');

  if (!overlay || !input || !results) return;

  let selectedIndex = -1;

  function openSearch() {
    overlay.classList.add('open');
    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.style.opacity = '1';
      input.focus();
    }, 10);
    document.body.style.overflow = 'hidden';
    renderResults('');
  }

  function closeSearch() {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.remove('open');
      overlay.style.display = 'none';
      input.value = '';
      results.innerHTML = '';
    }, 280);
    document.body.style.overflow = '';
    selectedIndex = -1;
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? SEARCH_INDEX.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q))
      : SEARCH_INDEX;

    results.innerHTML = filtered.length
      ? filtered.map((item, i) => `
          <div class="search-item" data-href="${item.href}" data-index="${i}" role="option" tabindex="-1">
            <span class="search-item-tag">${item.type}</span>
            <span class="search-item-title">${highlightMatch(item.title, q)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--dust);margin-left:auto"><polyline points="9 18 15 12 9 6"/></svg>
          </div>`).join('')
      : '<p style="font-family:var(--ff-mono);font-size:0.7rem;color:var(--dust);padding:16px">No results found.</p>';

    results.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.href));
      el.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(el.dataset.index);
        updateSelected();
      });
    });
  }

  function highlightMatch(text, q) {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background:var(--gold);color:var(--ink)">$1</mark>');
  }

  function navigate(href) {
    if (href) window.location.href = href;
  }

  function updateSelected() {
    results.querySelectorAll('.search-item').forEach((el, i) => {
      el.style.background = i === selectedIndex ? 'var(--gold-pale)' : '';
    });
  }

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtns.forEach(btn => btn.addEventListener('click', closeSearch));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  input.addEventListener('input', e => {
    selectedIndex = -1;
    renderResults(e.target.value);
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); return; }
    if (!overlay.classList.contains('open')) return;

    const items = results.querySelectorAll('.search-item');
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelected();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelected();
    }
    if (e.key === 'Enter' && selectedIndex >= 0) {
      const item = items[selectedIndex];
      if (item) navigate(item.dataset.href);
    }
  });
}

/* ============================================================
   HERO CANVAS — Particle / Constellation Animation
   ============================================================ */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;
  const GOLD  = 'rgba(232,200,74,';
  const WHITE = 'rgba(250,250,247,';
  const COUNT = window.innerWidth < 768 ? 55 : 110;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      gold: Math.random() < 0.35,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          const isGoldPair = particles[i].gold && particles[j].gold;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isGoldPair
            ? `${GOLD}${alpha * 1.8})`
            : `${WHITE}${alpha})`;
          ctx.lineWidth = isGoldPair ? 0.8 : 0.4;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? `${GOLD}${p.alpha})` : `${WHITE}${p.alpha * 0.7})`;
      ctx.fill();

      // Gold glow
      if (p.gold && p.r > 1.2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${GOLD}${p.alpha * 0.08})`;
        ctx.fill();
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    animId = requestAnimationFrame(draw);
  }

  // Mouse parallax
  let mouse = { x: W / 2, y: H / 2 };
  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    particles.forEach(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        p.vx += dx * 0.00008;
        p.vy += dy * 0.00008;
        // clamp
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
      }
    });
  });

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);

  init();
  draw();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */
function boot() {
  initNavbar();
  initSearch();
  initHeroCanvas();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
