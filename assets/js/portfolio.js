(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyTheme(theme) {
    const isLight = theme === 'light';
    root.classList.toggle('light-theme', isLight);
    toggle?.setAttribute('aria-pressed', String(isLight));
    toggle?.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  }

  applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));
  toggle?.addEventListener('click', () => {
    const next = root.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
