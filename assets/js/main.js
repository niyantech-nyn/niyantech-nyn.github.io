/* ─────────────────────────────────────────────────────────────
   Niyan Tech Developer Website — main.js
   Reads NIYAN_APPS from data/apps.js and renders:
     • Apps grid
     • Privacy policy links grid
     • Footer apps + privacy columns
     • Stats published-app count
   Also handles: sticky nav, mobile menu, scroll-reveal,
                 active nav highlighting, smooth scroll.
   ───────────────────────────────────────────────────────────── */

'use strict';

/* ── SVG for Google Play button ── */
const PLAY_SVG = `<svg class="play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/></svg>`;

/* ── Glow colour map ── */
const GLOW_CLASS = {
  green:  'app-glow-green',
  purple: 'app-glow-purple',
  blue:   'app-glow-blue',
  orange: 'app-glow-orange',
  teal:   'app-glow-teal',
  red:    'app-glow-red',
};

/* ═══════════════════════════════════════════════════════════
   1. RENDER APPS GRID
   ═══════════════════════════════════════════════════════════ */
function renderAppsGrid() {
  const grid = document.getElementById('apps-grid');
  if (!grid || typeof NIYAN_APPS === 'undefined') return;

  const visibleApps = NIYAN_APPS.filter(
    (a) => a.status === 'published' || a.status === 'coming-soon'
  );

  grid.innerHTML = visibleApps.map((app) => {
    const isComingSoon = app.status === 'coming-soon';
    const glowClass    = GLOW_CLASS[app.glowColor] || 'app-glow-blue';

    /* Play button — only when playUrl is set and app is published */
    const playBtn = isComingSoon
      ? `<span class="btn btn-play btn-play--disabled" aria-disabled="true">
           ${PLAY_SVG} Coming Soon
         </span>`
      : app.playUrl
        ? `<a href="${escHtml(app.playUrl)}"
              class="btn btn-play"
              target="_blank"
              rel="noopener noreferrer"
              id="play-${escHtml(app.id)}">
             ${PLAY_SVG} Google Play
           </a>`
        : '';

    /* Privacy link — only when privacyUrl is set */
    const privacyLink = app.privacyUrl
      ? `<a href="${escHtml(app.privacyUrl)}" class="app-privacy-link">Privacy Policy →</a>`
      : '';

    /* Description — only when provided */
    const descHtml = app.description
      ? `<p class="app-desc">${escHtml(app.description)}</p>`
      : '';

    return `
      <article class="app-card${isComingSoon ? ' app-card--coming-soon' : ''}" id="app-${escHtml(app.id)}">
        <div class="app-card-glow ${glowClass}" aria-hidden="true"></div>
        ${isComingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
        <div class="app-icon-wrap">
          <img src="${escHtml(app.icon)}"
               alt="${escHtml(app.name)} App Icon"
               class="app-icon"
               loading="lazy" />
        </div>
        <div class="app-info">
          <h3 class="app-name">${escHtml(app.name)}</h3>
          ${descHtml}
          ${playBtn}
          ${privacyLink}
        </div>
      </article>`;
  }).join('');

  grid.querySelectorAll('.app-card').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}


/* ═══════════════════════════════════════════════════════════
   2. RENDER PRIVACY LINKS GRID
   ═══════════════════════════════════════════════════════════ */
function renderPrivacyGrid() {
  const grid = document.getElementById('privacy-links-grid');
  if (!grid || typeof NIYAN_APPS === 'undefined') return;

  /* Show published apps only in privacy section */
  const publishedApps = NIYAN_APPS.filter((a) => a.status === 'published');

  grid.innerHTML = publishedApps.map((app) => `
    <a href="${escHtml(app.privacyUrl)}"
       class="privacy-card"
       id="privacy-${escHtml(app.id)}">
      <img src="${escHtml(app.icon)}"
           alt="${escHtml(app.name)}"
           class="privacy-card-icon"
           loading="lazy" />
      <div>
        <h3>${escHtml(app.name)}</h3>
        <span>View Privacy Policy →</span>
      </div>
    </a>`).join('');

  grid.querySelectorAll('.privacy-card').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}


/* ═══════════════════════════════════════════════════════════
   4. UPDATE STATS COUNT
   ═══════════════════════════════════════════════════════════ */
function updateStats() {
  const el = document.getElementById('stat-app-count');
  if (!el || typeof NIYAN_APPS === 'undefined') return;
  const count = NIYAN_APPS.filter((a) => a.status === 'published').length;
  el.textContent = count;
}

/* ═══════════════════════════════════════════════════════════
   HELPER — HTML-escape user-supplied strings
   ═══════════════════════════════════════════════════════════ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════════════════════════
   5. SCROLL-REVEAL (IntersectionObserver)
      Must be defined before renderAppsGrid / renderPrivacyGrid
      so they can call revealObserver.observe()
   ═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

/* Observe any static .reveal elements already in the HTML */
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   6. COPYRIGHT YEAR
   ═══════════════════════════════════════════════════════════ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════════
   7. STICKY NAV
   ═══════════════════════════════════════════════════════════ */
const navBar = document.getElementById('nav-bar');
if (navBar) {
  const onScroll = () => {
    navBar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════════════════════
   8. MOBILE NAV TOGGLE
   ═══════════════════════════════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (navBar && !navBar.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   9. ACTIVE NAV LINK
   ═══════════════════════════════════════════════════════════ */
const sections    = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

if (sections.length && navLinksAll.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinksAll.forEach((link) => {
            link.classList.toggle(
              'active-nav',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

/* ═══════════════════════════════════════════════════════════
   10. SMOOTH SCROLL WITH NAV OFFSET
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (href === '#') return;
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    const offset = navBar ? navBar.getBoundingClientRect().height + 12 : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ═══════════════════════════════════════════════════════════
   INIT — run all dynamic renderers
   ═══════════════════════════════════════════════════════════ */
renderAppsGrid();
renderPrivacyGrid();
updateStats();
