/* ============================================================
   COMPONENTS.JS — Injects shared HTML (Navbar, Footer, Search)
   This file makes it trivially easy to update nav/footer
   across all pages from one place.
   ============================================================ */

'use strict';

/* ---- ADJUST RELATIVE PATHS PER DEPTH ---- */
// depth 0 = root (index.html), depth 1 = sub-folder pages
const ROOT = document.documentElement.dataset.depth === '1' ? '../' : './';

/* ============================================================
   NAVBAR HTML
   ============================================================ */
function injectNavbar() {
  const nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="${ROOT}index.html" class="nav-logo">
        [Scholar Portfolio]
        <span>Academic &amp; Research</span>
      </a>
      <div class="nav-links">
        <a href="${ROOT}research/index.html">Research</a>
        <a href="${ROOT}writing/index.html">Writing</a>
        <a href="${ROOT}media/index.html">Media</a>
        <a href="${ROOT}about/index.html">About</a>
        <a href="${ROOT}contact/index.html">Contact</a>
      </div>
      <button class="nav-search-btn" data-search-open aria-label="Open search">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Search
        <kbd>⌘K</kbd>
      </button>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
  document.body.prepend(nav);

  // Mobile nav
  const mobileNav = document.createElement('div');
  mobileNav.id = 'nav-mobile';
  mobileNav.className = 'nav-mobile';
  mobileNav.innerHTML = `
    <a href="${ROOT}index.html">Home</a>
    <a href="${ROOT}research/index.html">Research</a>
    <a href="${ROOT}writing/index.html">Writing</a>
    <a href="${ROOT}media/index.html">Media</a>
    <a href="${ROOT}about/index.html">About</a>
    <a href="${ROOT}contact/index.html">Contact</a>
  `;
  document.body.insertBefore(mobileNav, document.body.children[1]);
}

/* ============================================================
   SEARCH OVERLAY HTML
   ============================================================ */
function injectSearch() {
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="search-inner">
      <p class="search-label">⌕ Search everything</p>
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search-input" placeholder="Type to search…" autocomplete="off" spellcheck="false"/>
        <span class="search-esc" data-search-close>ESC</span>
      </div>
      <div id="search-results"></div>
      <div class="search-hint">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>ESC</kbd> close</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ============================================================
   FOOTER HTML  — UPDATE ONCE, REFLECTS EVERYWHERE
   ============================================================ */
function injectFooter() {
  const footer = document.createElement('footer');
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <div class="footer-logo">
          [Scholar Name]
          <small>Researcher · Writer · Academic</small>
        </div>
        <nav class="footer-links">
          <a href="${ROOT}research/index.html">Research</a>
          <a href="${ROOT}writing/index.html">Writing</a>
          <a href="${ROOT}media/index.html">Media</a>
          <a href="${ROOT}about/index.html">About</a>
          <a href="${ROOT}contact/index.html">Contact</a>
        </nav>
      </div>
      <div class="footer-copy">
        <span>© 2025 [Scholar Name] — All rights reserved</span>
        <span style="font-style:italic;font-family:var(--ff-serif)">
          "The unexamined life is not worth living."
        </span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectSearch();
  injectFooter();
});
