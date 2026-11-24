// Robin Gautam · portfolio. Small and dependency-free; the page reads fine without it.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // 1. Pointer light (desktop pointers only)
  if (window.matchMedia('(hover: hover)').matches) {
    let raf = 0, x = 0, y = 0;
    window.addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { root.style.setProperty('--x', x + 'px'); root.style.setProperty('--y', y + 'px'); raf = 0; });
    }, { passive: true });
    // gold edge that tracks the pointer on the highlight cards
    document.querySelectorAll('.stat').forEach((el) => el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }));
  }

  // 2. Entrances, once
  const items = document.querySelectorAll('[data-reveal]');
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }) : null;
  items.forEach((el) => io ? io.observe(el) : el.classList.add('is-in'));
  window.addEventListener('load', () => setTimeout(() => items.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); }), 1800));

  // 3. Numbers count up when the highlights come into view
  const counters = document.querySelectorAll('[data-count]');
  const fmt = (v, d) => d ? v.toFixed(d) : Math.round(v).toLocaleString('en-IN');
  const run = (el) => {
    const to = parseFloat(el.dataset.count), d = parseInt(el.dataset.decimals || '0', 10);
    if (reduce) { el.textContent = fmt(to, d); return; }
    const t0 = performance.now(), dur = 1100;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e, d); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => { for (const e of entries) if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  // 4. The side menu follows the section being read
  const links = [...document.querySelectorAll('.toc a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach((s) => so.observe(s));
  }
})();

// 5. "Hiring for": highlight the work that fits the reader's role, dim the rest (nothing is hidden)
(() => {
  const chips = document.querySelectorAll('.fit__chips button');
  const note = document.querySelector('.fit__note');
  const items = document.querySelectorAll('[data-fit]');
  const lines = {
    sales: 'Start with <a href="#experience">StaplerLabs</a>: Rs. 3.5L+ closed, from first call to signed deal.',
    marketing: 'Start with the <a href="#experience">StaplerLabs campaigns</a>, then the Finlatics research.',
    product: 'Start with <a href="#projects">Role Radar and WorkHub</a>, two tools I designed and use daily.',
    strategy: 'Start with <a href="#experience">Finlatics and Udyogini</a>, then the <a href="#projects">WorkHub cost cut</a>.'
  };
  chips.forEach((btn) => btn.addEventListener('click', () => {
    const role = btn.dataset.role;
    chips.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((el) => {
      const hit = role !== 'all' && el.dataset.fit.split(' ').includes(role);
      el.classList.toggle('is-match', hit);
      el.classList.toggle('is-dim', role !== 'all' && !hit);
    });
    note.innerHTML = role === 'all' ? '' : lines[role];
  }));
})();
