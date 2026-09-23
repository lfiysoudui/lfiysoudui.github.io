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

  const applyTheme = (theme: 'light' | 'dark') => {
    root.setAttribute('data-theme', theme);
    // Icon swap is handled in CSS; keep the tooltip/label describing the action
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    toggle?.setAttribute('title', label);
    toggle?.setAttribute('aria-label', label);
  };
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

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

// Collapse long project descriptions behind a "see more" toggle.
// A collapsed card is as tall as its square thumbnail: the description gets
// whatever lines the title (and any link buttons) leave free.
function setupProjectToggles() {
  const STACKED_LINES = 3; // phones: image sits above the text, so use a fixed preview

  const cards = [...document.querySelectorAll<HTMLElement>('.card')].flatMap((card) => {
    const thumb = card.querySelector<HTMLElement>('.project-image, .project-image-placeholder');
    const info = card.querySelector<HTMLElement>('.project-info');
    const header = info?.querySelector<HTMLElement>('.project-header');
    const toggleLink = info?.querySelector<HTMLElement>('.toggle-text');
    const content = info?.querySelector<HTMLElement>('.project-content');
    const paragraph = content?.querySelector<HTMLElement>('p');
    if (!info || !header || !toggleLink || !content || !paragraph) return [];
    return [{ card, thumb, info, header, toggleLink, content, paragraph, expanded: false, overflows: false }];
  });

  const layout = () => {
    cards.forEach((c) => {
      const lineHeight = parseFloat(getComputedStyle(c.paragraph).lineHeight);
      let lines = STACKED_LINES;
      if (c.thumb && getComputedStyle(c.card).flexDirection !== 'column') {
        let used = c.header.offsetHeight + parseFloat(getComputedStyle(c.header).marginBottom);
        c.info.querySelectorAll<HTMLElement>(':scope > :not(.project-header, .project-content)').forEach((el) => {
          used += el.offsetHeight + parseFloat(getComputedStyle(el).marginTop);
        });
        lines = Math.max(1, Math.floor((c.thumb.offsetHeight - used) / lineHeight));
      }
      c.content.style.setProperty('--clamp', String(lines));

      // scrollHeight is the full text height whether or not it is clamped
      c.overflows = c.paragraph.scrollHeight > lines * lineHeight + 1;
      if (!c.overflows) c.expanded = false;
      c.content.classList.toggle('truncated', c.overflows && !c.expanded);
      c.toggleLink.style.display = c.overflows ? 'inline' : 'none';
      c.toggleLink.textContent = c.expanded ? 'see less' : 'see more';
    });
  };

  cards.forEach((c) => {
    // The whole header (title + link) toggles the description
    c.header.addEventListener('click', (e) => {
      e.preventDefault();
      if (!c.overflows) return;
      c.expanded = !c.expanded;
      c.content.classList.toggle('truncated', !c.expanded);
      c.toggleLink.textContent = c.expanded ? 'see less' : 'see more';
    });
  });

  layout();
  // Title wrapping changes with width and once web fonts/images settle
  let frame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  });
  window.addEventListener('load', layout);
}

// Drop research link buttons that have no URL yet (and the row if none are left)
function hideEmptyPaperLinks() {
  document.querySelectorAll<HTMLElement>('.paper-links').forEach((row) => {
    row.querySelectorAll('a').forEach((link) => {
      if (!(link.getAttribute('href') || '').trim()) link.remove();
    });
    if (!row.querySelector('a')) row.remove();
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
  hideEmptyPaperLinks(); // before measuring cards
  setupProjectToggles();
  hideEmptySectionLinks();
  setCurrentYear();
}

init();
