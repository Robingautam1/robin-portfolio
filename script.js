// Robin Gautam · portfolio · small script, no libraries.
// Everything on the page is readable without it; this only adds the role switch,
// the work panel, the entrances and the fitted display lines.

// ---- 2. Proof by role ----
(() => {
  const buttons = document.querySelectorAll('.toggle[data-role]');
  const sets = document.querySelectorAll('.facts[data-set]');
  if (!buttons.length) return;
  sets.forEach((set) => set.querySelectorAll('.fact').forEach((f, i) => f.style.setProperty('--n', i)));
  const show = (role) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.role === role)));
    sets.forEach((s) => s.classList.toggle('is-active', s.dataset.set === role));
  };
  buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.role)));
  show('sales');
})();

// ---- 3. Work ledger: side panel on wide screens, rows open in place on small ones ----
(() => {
  const panel = document.querySelector('.work__panel');
  const section = document.querySelector('.work');
  const rows = [...document.querySelectorAll('.ledger__row')];
  if (!rows.length || !panel || !section) return;
  const wide = window.matchMedia('(min-width: 1200px)');

  const activate = (row) => {
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    document.querySelectorAll('.ledger').forEach((l) => l.classList.add('is-dim'));
    const detail = row.nextElementSibling;
    const name = row.querySelector('.ledger__name').textContent;
    panel.innerHTML = `<p class="ledger__name">${name}</p>` + detail.innerHTML;
    const top = row.getBoundingClientRect().top - section.getBoundingClientRect().top;
    const max = section.offsetHeight - panel.offsetHeight - 40;
    panel.style.top = Math.max(0, Math.min(top, max)) + 'px';
    panel.classList.add('is-on');
  };
  const clear = () => document.querySelectorAll('.ledger').forEach((l) => l.classList.remove('is-dim'));

  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => { if (wide.matches) activate(row); });
    row.addEventListener('focus', () => { if (wide.matches) activate(row); });
    row.addEventListener('click', () => {
      if (wide.matches) { activate(row); return; }
      const open = row.getAttribute('aria-expanded') === 'true';
      row.setAttribute('aria-expanded', String(!open));
    });
  });
  document.querySelector('.work__col').addEventListener('mouseleave', () => { if (wide.matches) clear(); });

  const init = () => { if (wide.matches) { activate(rows[0]); clear(); } };
  init();
  wide.addEventListener('change', init);
  window.addEventListener('load', init);
})();

// ---- 4. Entrances, once ----
(() => {
  document.querySelectorAll('.chart .bar').forEach((b, i) => b.style.setProperty('--b', i));
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();

// ---- 5. Display lines fitted margin to margin (email, footer name) ----
(() => {
  const els = document.querySelectorAll('[data-fit]');
  const textWidth = (el) => {
    const r = document.createRange(); r.selectNodeContents(el);
    const s = parseFloat(getComputedStyle(el).scale); // the footer name has a scroll-linked scale
    return r.getBoundingClientRect().width / (Number.isFinite(s) && s > 0 ? s : 1);
  };
  const fit = () => {
    const phone = window.matchMedia('(max-width: 640px)').matches;
    els.forEach((el) => {
      el.style.fontSize = '';
      el.style.whiteSpace = '';
      if (phone) return;
      const cs = getComputedStyle(el);
      const avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.whiteSpace = 'nowrap';
      el.style.fontSize = '100px';
      const w = textWidth(el);
      if (w > 0) el.style.fontSize = (100 * avail / w * 0.99).toFixed(2) + 'px';
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); else fit();
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(fit, 120); });
})();

// ---- 6. Year ----
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
