// Robin Gautam · portfolio. No libraries; the page reads fine without this file.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Postcard: click the card or the button to turn it over
  const stack = document.querySelector('[data-postcard]');
  const turn = document.querySelector('[data-turn]');
  const label = document.querySelector('[data-turn-label]');
  const flip = () => {
    const on = !stack.classList.contains('is-flipped');
    stack.classList.toggle('is-flipped', on);
    turn.setAttribute('aria-pressed', String(on));
    label.textContent = on ? 'Turn it back' : 'Turn postcard over';
  };
  if (stack && turn) {
    stack.addEventListener('click', (e) => { if (!e.target.closest('a')) flip(); });
    turn.addEventListener('click', flip);
  }

  // Today's date on the postmark and on the morning paper
  const now = new Date();
  const mon = now.toLocaleString('en-GB', { month: 'short' });
  const day = document.querySelector('[data-postmark-day]');
  const yr = document.querySelector('[data-postmark-year]');
  if (day) day.textContent = now.getDate() + ' ' + mon.toUpperCase();
  if (yr) yr.textContent = String(now.getFullYear());
  document.querySelectorAll('[data-today]').forEach((el) => { el.textContent = now.getDate() + ' ' + mon + ' ' + now.getFullYear(); });

  // Notes under each piece of work
  document.querySelectorAll('.more__btn').forEach((btn) => btn.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
  }));

  // Reveal once on scroll
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('is-in'));

  // Numbers count up once
  const fmt = (v, d) => d ? v.toFixed(d) : Math.round(v).toLocaleString('en-IN');
  const count = (el) => {
    const to = parseFloat(el.dataset.count), d = parseInt(el.dataset.dec || '0', 10);
    if (reduce) return;
    const t0 = performance.now(), dur = 1200;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)), d); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { count(e.target); co.unobserve(e.target); }
    }, { threshold: 0.8 });
    document.querySelectorAll('[data-count]').forEach((el) => co.observe(el));
  }
})();
