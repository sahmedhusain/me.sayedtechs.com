import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { renderTechLogos, getCategoryIcon } from '../data/icons.js';
import { renderSkillsSection } from './skills.js';
import { FALLBACK_CATEGORIES, INTERNAL_CATEGORIES, CATEGORY_ICONS } from '../constants/config.js';

export function renderPortfolioPage() {
  return `
    <style>
      .portfolio-inline-link {
        transition: all 0.3s ease;
        text-decoration: none;
      }
      .portfolio-inline-link:hover {
        text-decoration: underline !important;
        text-decoration-color: var(--accent) !important;
        text-underline-offset: 4px;
      }
    </style>
    <header class="animate-entry" style="margin-bottom: 4rem; text-align: left; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('projects.title') || 'Portfolio 🎨'}
      </h1>
      <p class="section-subtitle" style="font-size: 1.15rem; line-height: 1.7; color: var(--text-secondary); max-width: 850px; font-family: var(--font-sans); margin-bottom: 1.5rem;">
        Explore my <strong><a href="#projects-section" class="portfolio-inline-link" style="color: var(--text-primary);">Projects</a></strong> – from web applications and engineering solutions to innovative tools that showcase my <strong><a href="#skills-section" class="portfolio-inline-link" style="color: var(--text-primary);">Skills & Technologies</a></strong>, technical expertise, and problem-solving skills.
      </p>
    </header>
    <div class="animate-entry" style="animation-delay: 0.1s;">
      ${renderSkillsSection()}
    </div>
    <div class="animate-entry" style="animation-delay: 0.2s;">
      ${renderProjectsSection()}
    </div>
  `;
}

export function getIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('repository')) return 'logo-github';
  if (lower.includes('thesis')) return 'school-outline';
  if (lower.includes('poster')) return 'document-outline';
  return 'open-outline';
}

export function renderProjectsSection() {
  const data = getData();
  let categories = t('projects.categories');
  if (!Array.isArray(categories)) {
    categories = FALLBACK_CATEGORIES;
  }
  
  const projects = data.projects.map(p => {
    const name = (p.name || '').toLowerCase();
    const tech = Array.isArray(p.tech) ? p.tech.map(t => String(t).toLowerCase()) : [];

    const isSpaceBlaster = /space\s*blaster/.test(name);
    const isCliAlgo = (/^(gotalk|antfinder)$/.test(name) || tech.some(t => /(cli|algorithms|dfs|graph|tcp)/.test(t)));
    const isEngineering = tech.some(t => /arduino/.test(t));
    const isWebDev = tech.some(t => /(go|react|javascript|html5|css3)/.test(t));

    // Explicit web overrides per request
    const forceWeb = (/gigabit/.test(name) || /(^|\s)01\s*dashboard/.test(name));

    let categoryKey = 'webdevelopment';
    let displayCategory = categories[1];

    if (isSpaceBlaster) {
      categoryKey = 'games';
      displayCategory = categories[3];
    }
    else if (forceWeb) {
      categoryKey = 'webdevelopment';
      displayCategory = categories[1];
    }
    else if (isCliAlgo) {
      categoryKey = 'clialgorithms';
      displayCategory = categories[4];
    }
    else if (isEngineering) {
      categoryKey = 'engineering';
      displayCategory = categories[2];
    }
    else if (isWebDev) {
      categoryKey = 'webdevelopment';
      displayCategory = categories[1];
    }

    return { ...p, categoryKey, displayCategory };
  });

  return `
    <section id="projects-section" style="margin-top: 4rem;">
      <h3 class="h3 section-title" style="margin-bottom: 2rem;">Projects</h3>
    
    <ul class="filter-list">
      ${categories.map((cat, i) => {
        const internalCat = INTERNAL_CATEGORIES[i] || 'all';
        const icon = CATEGORY_ICONS[i] || 'grid-outline';
        return `
        <li class="filter-item">
          <button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter-btn="${internalCat}">
            <ion-icon name="${icon}"></ion-icon>
            <span class="filter-text">${cat}</span>
          </button>
        </li>
      `}).join('')}
    </ul>
    <ul class="project-list">
      ${projects.map(project => `
        <li class="project-item active" data-filter-item data-category="${project.categoryKey}">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="${getCategoryIcon(project.categoryKey)}"></ion-icon>
              </div>
            </figure>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-category">${project.displayCategory}</p>
            <div class="project-meta">
              ${project.points.length > 0 ? `
                <ul class="project-description-list">
                  ${project.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
              ` : ''}
              <button class="read-more-btn"><span>Read</span> <ion-icon name="chevron-down-outline"></ion-icon></button>
              <div class="project-footer">
                <ul class="project-tech-logos" aria-label="Technology stack logos">
                  ${renderTechLogos(project.tech).logos}
                </ul>
                ${renderTechLogos(project.tech).libraries}
              </div>
            </div>
            <div class="project-links">
              ${project.links && project.links.length > 0 ? project.links.map(link => `<a href="${link.url}" target="_blank" class="project-link-btn"><ion-icon name="${getIcon(link.text)}"></ion-icon> ${link.text}</a>`).join('') : ''}
            </div>
        </li>
      `).join('')}
      <li class="project-item ui-concepts-coming-soon" data-filter-item data-category="uiconcepts">
        <div class="coming-soon-content">
          <div class="coming-soon-icon">
            <ion-icon name="color-palette-outline"></ion-icon>
          </div>
          <h3 class="coming-soon-title">UI Concepts</h3>
          <p class="coming-soon-text">Coming Soon</p>
          <div class="coming-soon-description">
            Exciting UI/UX design concepts and interactive prototypes are in development. Stay tuned for innovative user interface designs and experiences.
          </div>
        </div>
      </li>
    </ul>
    </section>
  `;
}