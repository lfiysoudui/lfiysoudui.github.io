import './styles.css';

// Smooth scrolling for in-page navigation
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = (link.getAttribute('href') || '').slice(1);
      if (!targetId) return; // e.g. the "see more" toggles
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

// Theme toggle with persistence (initial theme is applied by an inline script in index.html)
function setupThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'site-theme';
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getSaved = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const applyTheme = (theme: 'light' | 'dark') => root.setAttribute('data-theme', theme);

  // Follow the system theme until the user picks one explicitly
  systemDark.addEventListener('change', (e) => {
    if (!getSaved()) applyTheme(e.matches ? 'dark' : 'light');
  });

  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (e.g. private mode); the choice just won't persist
    }
  });
}

// Collapse long project descriptions behind a "see more" toggle
function setupProjectToggles() {
  const TRUNCATE_AT = 200;
  document.querySelectorAll<HTMLElement>('.project-info').forEach((info) => {
    const header = info.querySelector<HTMLElement>('.project-header');
    const toggleLink = info.querySelector<HTMLElement>('.toggle-text');
    const content = info.querySelector<HTMLElement>('.project-content');
    const paragraph = content?.querySelector('p');
    if (!header || !toggleLink || !content || !paragraph) return;
    if ((paragraph.textContent ?? '').length <= TRUNCATE_AT) return;

    // Without a source link there is more room, so show more lines
    if (!content.querySelector('.card-link')) content.classList.add('no-source');
    content.classList.add('truncated');
    toggleLink.style.display = 'inline';
    toggleLink.textContent = 'see more';

    // The whole header (title + link) toggles the description
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const collapsed = content.classList.toggle('truncated');
      toggleLink.textContent = collapsed ? 'see more' : 'see less';
    });
  });
}

// Hide nav links whose section has no project cards
function hideEmptySectionLinks() {
  document.querySelectorAll<HTMLAnchorElement>('.links a[href^="#"]').forEach((link) => {
    const section = document.getElementById((link.getAttribute('href') || '').slice(1));
    if (section?.querySelector('.cards') && !section.querySelector('.card')) {
      link.hidden = true;
    }
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
  setupProjectToggles();
  hideEmptySectionLinks();
  setCurrentYear();
}

init();
