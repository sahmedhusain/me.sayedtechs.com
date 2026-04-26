import { data } from './src/js/data.js';
import { handleImageError, getLogo, getEntityUrl } from './src/js/utils.js';
import { renderNavbar } from './src/js/renderers/navbar.js';
import { renderSidebar, renderAboutSection, renderHomeFeed } from './src/js/renderers/about.js';
import { renderExperienceSection } from './src/js/renderers/experience.js';
import { renderProjectsSection } from './src/js/renderers/projects.js';
import { renderArticlesSection } from './src/js/renderers/articles.js';
import { renderSkillsSection } from './src/js/renderers/skills.js';

import { renderProfessionalJourneySection } from './src/js/renderers/journey.js';
import { renderContactSection, renderContactModal } from './src/js/renderers/contact.js';
import { renderFooter, renderSideElements, renderImagePreviewModal } from './src/js/renderers/footer.js';
import { initializeEventListeners, initializeSkillsAnimations } from './src/js/events.js';
import { ROUTE_PAGE_SET } from './src/js/routes.js';

window.handleImageError = handleImageError;
window.getLogo = getLogo;
window.getEntityUrl = getEntityUrl;

function normalizePathname(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function computeBasePathname() {
  const normalized = normalizePathname(window.location.pathname);
  const segments = normalized.split('/').filter(Boolean);
  let lastSegment = segments[segments.length - 1] || '';

  if (lastSegment === 'index.html') {
    segments.pop();
    lastSegment = segments[segments.length - 1] || '';
  }

  if (ROUTE_PAGE_SET.has(lastSegment)) {
    segments.pop();
  }

  return segments.length ? `/${segments.join('/')}` : '';
}

function restorePathFromFallbackQuery() {
  const redirected = window.location.search.match(/[?&]p=([^&]+)/);
  if (!redirected || !redirected[1]) return;

  const basePath = computeBasePathname();
  const restoredPath = decodeURIComponent(redirected[1]);
  const cleanUrl = `${basePath}${restoredPath}` + window.location.hash;
  window.history.replaceState(null, '', cleanUrl);
}

function loadExternalScript(src, attrs = {}) {
  const script = document.createElement('script');
  script.src = src;

  if (attrs.type) script.type = attrs.type;
  if (attrs.async) script.async = true;
  if (attrs.defer) script.defer = true;

  document.head.appendChild(script);
}

restorePathFromFallbackQuery();

function loadResources() {
  // Google Fonts
  const fonts = document.createElement('link');
  fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap';
  fonts.rel = 'stylesheet';
  document.head.appendChild(fonts);

  // IonIcons
  const ionicons = document.createElement('script');
  ionicons.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
  ionicons.type = 'module';
  document.head.appendChild(ionicons);

  // Devicon for tech logos
  const devicon = document.createElement('link');
  devicon.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
  devicon.rel = 'stylesheet';
  devicon.type = 'text/css';
  document.head.appendChild(devicon);

  // Simple Icons for brand logos
  const simpleIcons = document.createElement('link');
  simpleIcons.href = 'https://cdn.jsdelivr.net/npm/simple-icons@v10/font/simple-icons.min.css';
  simpleIcons.rel = 'stylesheet';
  document.head.appendChild(simpleIcons);

  // Vis.js Timeline CSS
  const visCss = document.createElement('link');
  visCss.href = 'https://visjs.github.io/vis-timeline/styles/vis-timeline-graph2d.min.css';
  visCss.rel = 'stylesheet';
  visCss.type = 'text/css';
  document.head.appendChild(visCss);

  // EmailJS, QRCode.js and Vis.js Timeline runtime
  loadExternalScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
  loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');
  loadExternalScript('https://visjs.github.io/vis-timeline/standalone/umd/vis-timeline-graph2d.min.js');



  document.title = 'Sayed Ahmed Husain | Electrical Engineer & Full-Stack Developer';
}

loadResources();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Render the complete app
  app.innerHTML = `
    <div class="main-content" style="max-width: 1024px; margin: 0 auto; padding-top: 10rem;">
      ${renderNavbar()}
      <article class="home active" data-page="home">
        ${renderHomeFeed()}
      </article>
      <article class="about" data-page="about">
        ${renderAboutSection()}
      </article>
      <article class="articles" data-page="articles">
        ${renderArticlesSection()}
      </article>
      <article class="experience" data-page="journey">
        ${renderProfessionalJourneySection() + renderExperienceSection() + renderSkillsSection()}
      </article>
      <article class="projects" data-page="projects">
        ${renderProjectsSection()}
      </article>
      <article class="contact" data-page="contact">

        ${renderContactSection()}
      </article>
    </div>
    ${renderFooter()}
    ${renderContactModal()}
    ${renderImagePreviewModal()}
  `;

  if (!document.getElementById('back-to-top')) {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<button id="back-to-top" class="back-to-top-btn" aria-label="Back to top"><ion-icon name="arrow-up-outline"></ion-icon></button>'
    );
  }

  // After rendering: attach any missing logos (uses workspace local assets when available)
  try {
    // Add images to certification headers (anchor + image) and remove placeholder icon
    document.querySelectorAll('.cert-header').forEach(header => {
      if (header.querySelector('a.logo-link') || header.querySelector('img.org-logo')) return; // already handled
      const authorityEl = header.querySelector('.cert-authority');
      const authority = authorityEl ? authorityEl.textContent.trim() : '';
      const logoSrc = getLogo(authority, '');
      if (logoSrc) {
        const a = document.createElement('a');
        a.href = getEntityUrl(authority);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'logo-link';
        a.title = authority;
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = `${authority} logo`;
        img.className = 'org-logo small cert-icon';
        img.onerror = function () { handleImageError(this); };
        a.appendChild(img);
        header.insertBefore(a, header.firstChild);
      }
      // Remove fallback ribbon icon if present
      const ribbon = header.querySelector('ion-icon[name="ribbon-outline"]');
      if (ribbon) ribbon.remove();
    });

    // Ensure timeline items (list entries) show logos if missing (anchor + image)
    document.querySelectorAll('.timeline-item').forEach(item => {
      if (item.querySelector('.org-logo') || item.querySelector('a.logo-link')) return;
      const span = item.querySelector('span') || item.querySelector('.timeline-item-title');
      const name = span ? span.textContent.trim() : '';
      const logoSrc = getLogo(name, '');
      if (logoSrc) {
        const a = document.createElement('a');
        a.href = getEntityUrl(name);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'logo-link';
        a.title = name;
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = `${name} logo`;
        img.className = 'org-logo small';
        img.onerror = function () { handleImageError(this); };
        a.appendChild(img);
        item.insertBefore(a, item.firstChild);
      }
    });
  } catch (e) {
    console.warn('Logo injection helper failed:', e);
  }

  // Initialize event listeners
  initializeEventListeners();

  // Initialize skills animations
  initializeSkillsAnimations();
});
