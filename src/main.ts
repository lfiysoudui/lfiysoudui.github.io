import './styles.css';

// Smooth scrolling for in-page navigation
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = (link.getAttribute('href') || '').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
        history.replaceState(null, '', `#${targetId}`);
      }
    });
  });
}

// Theme toggle with persistence
function setupThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'site-theme';

  const setTheme = (theme: 'light' | 'dark') => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };

  const saved = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved ?? (systemPrefersDark ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(current as 'light' | 'dark');
  });
}

// Dynamic year in footer
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
}

// Initialize all features
function init() {
  setupSmoothScroll();
  setupThemeToggle();
  setCurrentYear();
}

init();
