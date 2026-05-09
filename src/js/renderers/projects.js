import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { renderTechLogos, getCategoryIcon } from '../data/icons.js';
import { renderSkillsSection } from './skills.js';
import { FALLBACK_CATEGORIES, INTERNAL_CATEGORIES, CATEGORY_ICONS } from '../constants/config.js';

export function renderPortfolioPage() {
  return `
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

export function renderProjectDetail(id) {
  const data = getData();
  const ui = data.ui_extras || {};
  const projUi = ui.projects || {};
  const project = data.projects.find(p => p.id === id);
  if (!project) return `<div class="animate-entry"><p>${projUi.notFound || 'Project not found'}</p></div>`;

  // Extract category key if not present (fallback)
  const categoryKey = project.categoryKey || project.category?.toLowerCase().replace(/\s+/g, '') || 'webdevelopment';

  // Find github repo
  const githubLink = project.links.find(l => l.text.toLowerCase() === 'repository' && l.url.includes('github.com'));

  // HTML for detail page
  setTimeout(() => {
    if (githubLink) {
      loadReadme(githubLink.url, id);
    } else {
      const container = document.getElementById('project-readme-container');
      if (container) container.style.display = 'none';
    }
  }, 100);

  return `
    <section class="project-detail-wrapper animate-entry">
      <header class="project-detail-header">
        <button class="back-btn" onclick="window.history.back()">
          <ion-icon name="chevron-back-outline"></ion-icon> <span>${projUi.backToPortfolio || 'Back to Portfolio'}</span>
        </button>
        <div class="project-header-main">
          <div class="project-icon-large">
            <ion-icon name="${getCategoryIcon(categoryKey)}"></ion-icon>
          </div>
          <div class="project-title-box">
             <h2 class="h2 project-detail-title">${project.name}</h2>
             <p class="project-detail-subtitle">${project.subtitle || project.category}</p>
          </div>
        </div>
      </header>

      <div class="project-detail-grid">
        <div class="project-info-sidebar">
           <div class="info-group">
             <h4>Category</h4>
             <p style="color: var(--text-secondary);">${project.category}</p>
           </div>
           <div class="info-group">
             <h4>Tech Stack</h4>
             <div class="project-detail-tech-container">
               <ul class="project-tech-logos-detail" style="display: flex; gap: 1rem; flex-wrap: wrap; background: rgba(var(--accent-rgb), 0.05); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(var(--accent-rgb), 0.1); list-style: none; margin-bottom: 1.5rem;">
                  ${renderTechLogos(project.tech).logos}
               </ul>
               ${renderTechLogos(project.tech).libraries ? `<div class="project-detail-libraries">${renderTechLogos(project.tech).libraries}</div>` : ''}
             </div>
           </div>
           <div class="info-group">
             <h4>Links</h4>
             <div class="project-links-vertical">
                ${project.links.map(l => `<a href="${l.url}" target="_blank"><ion-icon name="${getIcon(l.text)}"></ion-icon> ${l.text}</a>`).join('')}
             </div>
           </div>
        </div>

        <div class="project-main-content">
           ${project.hasGithubRepo ? `
             <div id="project-readme-container" class="readme-container">
                <div class="readme-loading">
                  <div class="spinner"></div>
                  <p>${projUi.readmeFetching || 'Fetching technical documentation from GitHub...'}</p>
                </div>
             </div>
           ` : `
             <div class="project-summary-card">
                <h3>${projUi.overviewTitle || 'Project Overview'}</h3>
                <ul>
                  ${project.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
             </div>
           `}
        </div>
      </div>
    </section>
  `;
}

async function loadReadme(githubUrl, id) {
  console.log(`[README] Fetching for project: ${id} from URL: ${githubUrl}`);

  // Robustly extract owner and repo (handles trailing slashes)
  const cleanUrl = githubUrl.replace(/\/+$/, '');
  const urlParts = cleanUrl.split('/');
  const repo = urlParts[urlParts.length - 1];
  const owner = urlParts[urlParts.length - 2];

  const container = document.getElementById('project-readme-container');
  if (!container) {
    console.error(`[README] Container #project-readme-container not found for ${id}`);
    return;
  }

  // Common branch and filename combinations
  const branches = ['main', 'master'];
  const files = ['README.md', 'readme.md', 'README.markdown', 'README.txt'];

  try {
    let markdown = '';
    let success = false;

    // Iterate through common combinations until one works
    for (const branch of branches) {
      for (const file of files) {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
        try {
          const response = await fetch(url);
          if (response.ok) {
            markdown = await response.text();
            console.log(`[README] Successfully fetched from: ${url}`);
            success = true;
            break;
          }
        } catch (e) {
          // Individual fetch failed, continue to next
        }
      }
      if (success) break;
    }

    if (!success) {
      throw new Error(`Could not find README in main/master branches for ${owner}/${repo}`);
    }

    // Use marked library to parse markdown
    let parsedHtml = '';
    if (typeof marked !== 'undefined') {
      try {
        // Handle different marked versions (v4+ uses marked.parse, older use marked())
        parsedHtml = (typeof marked.parse === 'function') ? marked.parse(markdown) : marked(markdown);
      } catch (e) {
        console.error('[README] Marked parsing failed:', e);
        parsedHtml = `<pre style="white-space: pre-wrap;">${markdown}</pre>`;
      }
    } else {
      console.warn('[README] Marked library not found');
      parsedHtml = `<pre style="white-space: pre-wrap;">${markdown}</pre>`;
    }

    container.innerHTML = `
      <div class="readme-header">
        <ion-icon name="logo-github"></ion-icon> <span>README.md</span>
      </div>
      <div class="markdown-body">
        ${parsedHtml}
      </div>
    `;
  } catch (err) {
    console.error(`[README] Final error for ${id}:`, err);
    const data = getData();
    const project = data.projects.find(p => p.id === id);
    container.innerHTML = `
        <div class="project-summary-card" style="margin-bottom: 2rem;">
        <h3>${projUi.overviewTitle || 'Project Overview'}</h3>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-style: italic;">
          (${projUi.readmeNotice || 'Note: Unable to load live documentation from GitHub. Showing project summary instead.'})
        </p>
        <ul>
          ${project ? project.points.map(p => `<li>${p}</li>`).join('') : '<li>No project details available.</li>'}
        </ul>
      </div>
      <div class="readme-error" style="padding: 1.5rem; background: rgba(var(--accent-rgb), 0.05);">
        <ion-icon name="alert-circle-outline" style="color: var(--accent); font-size: 1.2rem; vertical-align: middle; margin-right: 0.5rem;"></ion-icon>
        <span style="font-size: 0.9rem; opacity: 0.8;">Full documentation and source code are available via the <strong>Repository</strong> link in the sidebar.</span>
      </div>
    `;
  }
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
              <a href="projects/${project.id}" data-nav-link="projects/${project.id}" class="go-to-project-btn">
                <span>Go to Project</span> <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
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