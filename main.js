import { data } from './src/js/data.js';
import { handleImageError, getLogo, getEntityUrl } from './src/js/utils.js';
import { renderNavbar } from './src/js/renderers/navbar.js';
import { renderSidebar, renderAboutSection } from './src/js/renderers/about.js';
import { renderExperienceSection } from './src/js/renderers/experience.js';
import { renderProjectsSection } from './src/js/renderers/projects.js';
import { renderSkillsSection } from './src/js/renderers/skills.js';
import { renderProfessionalJourneySection } from './src/js/renderers/journey.js';
import { renderContactSection, renderContactModal } from './src/js/renderers/contact.js';
import { renderFooter, renderSideElements, renderImagePreviewModal } from './src/js/renderers/footer.js';
import { initializeEventListeners, setActivePage, initializeSkillsAnimations } from './src/js/events.js';

window.handleImageError = handleImageError;
window.getLogo = getLogo;
window.getEntityUrl = getEntityUrl;

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



  document.title = 'Sayed Ahmed Husain | Electrical Engineer & Full-Stack Developer';
}

loadResources();


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Render the complete app
  app.innerHTML = `
    ${renderSidebar()}
    <div class="main-content">
      ${renderNavbar()}
      <article class="about active" data-page="about">
        ${renderAboutSection() + renderProfessionalJourneySection() + renderSkillsSection()}
      </article>
      <article class="experience" data-page="journey">
        ${renderExperienceSection()}
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

  // Hide skeleton loading state
  const skeletonWrapper = document.querySelector('.skeleton-wrapper');
  if (skeletonWrapper) {
    skeletonWrapper.classList.add('hide');
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

  // Handle initial hash or default to about
  const initialPage = window.location.hash.substring(1) || 'about';
  setActivePage(initialPage);

  // Initialize skills animations
  initializeSkillsAnimations();
});
