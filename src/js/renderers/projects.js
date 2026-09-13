import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { resolvePath } from '../utils/paths.js';
import { renderTechLogos, getCategoryIcon, getIconForLibraryItem } from '../data/icons.js';
import { renderSkillsSection } from './skills.js';
import { FALLBACK_CATEGORIES, INTERNAL_CATEGORIES, CATEGORY_ICONS } from '../constants/config.js';

const readmeCache = new Map();

export function renderPortfolioPage() {
  return `
    <header class="animate-entry" style="margin-bottom: 1.2rem; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('projects.title')}
      </h1>
      <p class="section-subtitle" style="font-size: 1.15rem; line-height: 1.7; color: var(--text-secondary); max-width: 850px; font-family: var(--font-sans);">
        ${t('projects.subtitle')}
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
  const project = data.projects.find(p => p.id === id);
  if (!project) return `<div class="animate-entry"><p>${t('projects.notFound')}</p></div>`;

  const categoryKey = resolveCategoryKey(project.category);
  const githubLink = project.links.find(l => l.url.includes('github.com'));

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
        <div class="project-header-main">
          <button class="back-btn-minimal" data-nav-link="portfolio" title="${t('projects.backToPortfolio')}">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          <div class="project-icon-large">
            <ion-icon name="${getCategoryIcon(categoryKey)}"></ion-icon>
          </div>
          <div class="project-title-box">
             <div class="project-detail-category">${project.category}</div>
             <h2 class="h2 project-detail-title">${project.name}</h2>
             <p class="project-detail-subtitle">${project.subtitle}</p>
          </div>
          <div class="project-header-links">
             ${project.links.map(l => `
               <a href="${l.url}" target="_blank" class="btn-solid-black-inverted">
                 <ion-icon name="${getIcon(l.text)}"></ion-icon>
                 <span>${l.text}</span>
               </a>
             `).join('')}
          </div>
        </div>
      </header>

      <div class="project-detail-grid">
        <div class="project-info-sidebar">
           <div class="info-group-tech">
             <div class="tech-label">${t('projects.techStack')}</div>
             <div class="project-detail-tech-container">
               <ul class="project-tech-logos-detail">
                  ${renderTechLogos(project.tech).logos}
               </ul>
               <div class="tech-divider"></div>
               <div class="project-detail-libraries-chips">
                  ${renderTechLogos(project.tech).rawLibraries.map(lib => `
                    <span class="lib-chip">
                      <ion-icon name="${getIconForLibraryItem(lib)}"></ion-icon>
                      ${lib}
                    </span>
                  `).join('')}
               </div>
             </div>
           </div>
        </div>

        <div class="project-main-content">
           ${project.hasGithubRepo ? `
             <div id="project-readme-container" class="readme-container-raw">
                <div class="readme-loading">
                  <div class="spinner"></div>
                  <p>${t('projects.readmeFetching')}</p>
                </div>
             </div>
           ` : `
              <div class="project-summary-raw">
                 <h2 class="raw-section-title">${t('projects.overviewTitle')}</h2>
                 <ul class="raw-points-list">
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
  if (readmeCache.has(id)) {
    const cached = readmeCache.get(id);
    renderMarkdown(cached.markdown, id, cached.owner, cached.repo, cached.branch);
    return;
  }

  const cleanUrl = githubUrl.replace(/\/+$/, '');
  const urlParts = cleanUrl.split('/');
  const repo = urlParts[urlParts.length - 1];
  const owner = urlParts[urlParts.length - 2];

  const repoNames = [repo, repo.toLowerCase(), id, id.toLowerCase()];
  const uniqueRepos = [...new Set(repoNames)];

  try {
    let markdown = '';
    let success = false;
    let successfulBranch = 'main';
    let successfulRepo = repo;

    // Optimization: Try most likely Raw URLs in parallel first
    const branches = ['main', 'master', 'develop'];
    const files = ['README.md', 'readme.md'];

    const probeUrls = [];
    for (const r of uniqueRepos) {
      for (const b of branches) {
        for (const f of files) {
          probeUrls.push({
            url: `https://raw.githubusercontent.com/${owner}/${r}/${b}/${f}`,
            branch: b,
            repo: r,
            file: f
          });
        }
      }
    }

    const initialProbes = probeUrls.slice(0, 6);
    const results = await Promise.all(initialProbes.map(async (p) => {
      try {
        const resp = await fetch(p.url);
        if (resp.ok) return { ...p, content: await resp.text() };
      } catch (e) { }
      return null;
    }));

    const successfulProbe = results.find(r => r !== null);

    if (successfulProbe) {
      markdown = successfulProbe.content;
      success = true;
      successfulBranch = successfulProbe.branch;
      successfulRepo = successfulProbe.repo;
    } else {
      // Full discovery as fallback
      for (const r of uniqueRepos) {
        try {
          const repoApiUrl = `https://api.github.com/repos/${owner}/${r}`;
          const repoResp = await fetch(repoApiUrl);
          if (repoResp.ok) {
            const repoData = await repoResp.json();
            const defaultBranch = repoData.default_branch || 'main';
            const contentsApiUrl = `https://api.github.com/repos/${owner}/${r}/contents/`;
            const contentsResp = await fetch(contentsApiUrl);
            if (contentsResp.ok) {
              const contents = await contentsResp.json();
              const readmeFile = contents.find(f => ['README.md', 'readme.md', 'README.markdown', 'README.txt'].includes(f.name));
              if (readmeFile) {
                const resp = await fetch(`https://raw.githubusercontent.com/${owner}/${r}/${defaultBranch}/${readmeFile.name}`);
                if (resp.ok) {
                  markdown = await resp.text();
                  success = true;
                  successfulBranch = defaultBranch;
                  successfulRepo = r;
                  break;
                }
              }
            }
          }
        } catch (apiErr) { }
      }
    }

    if (!success) throw new Error('README not found');
    
    readmeCache.set(id, { markdown, owner, repo: successfulRepo, branch: successfulBranch });
    renderMarkdown(markdown, id, owner, successfulRepo, successfulBranch);
  } catch (err) {
    renderFallback(id);
  }
}

function renderMarkdown(markdown, id, owner, repo, branch) {
  const container = document.getElementById('project-readme-container');
  if (!container) return;

  const rawUrlBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  
  const normalizeUrl = (path) => {
    if (path.startsWith('http')) {
      if (path.includes('github.com') && path.includes('/blob/')) {
        return path.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
      }
      return path;
    }
    if (path.startsWith('/') || path.startsWith('data:')) return path;
    const cleanPath = path.replace(/^\.\//, '');
    return `${rawUrlBase}/${encodeURI(cleanPath)}`.replace(/([^:]\/)\/+/g, "$1");
  };

  let processedMarkdown = markdown.replace(/(!\[.*?\]\()(.+?)(\))/g, (match, p1, p2, p3) => `${p1}${normalizeUrl(p2)}${p3}`);
  processedMarkdown = processedMarkdown.replace(/src=["'](.+?)["']/g, (match, p1) => `src="${normalizeUrl(p1)}"`);
  processedMarkdown = processedMarkdown.replace(/href=["'](.+?)["']/g, (match, p1) => {
    if (p1.startsWith('#') || p1.startsWith('http') || p1.startsWith('mailto:')) return match;
    return `href="${normalizeUrl(p1)}"`;
  });

  let parsedHtml = '';
  if (typeof marked !== 'undefined') {
    const renderer = new marked.Renderer();
    renderer.heading = ({ text, depth }) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${depth} id="${escapedText}">${text}</h${depth}>`;
    };
    renderer.code = (token) => {
      const code = token.text;
      const lang = (token.lang || '').toLowerCase();
      if (lang.includes('mermaid')) return `<pre class="mermaid">${code}</pre>`;
      const langClass = lang ? `class="language-${lang}"` : '';
      return `<pre><code ${langClass}>${code}</code></pre>`;
    };
    parsedHtml = marked.parse(processedMarkdown, { renderer });
  } else {
    parsedHtml = `<pre>${processedMarkdown}</pre>`;
  }

  container.innerHTML = `<div class="markdown-body-raw">${parsedHtml}</div>`;

  if (window.mermaid) {
    const mermaidDivs = container.querySelectorAll('.mermaid');
    if (mermaidDivs.length > 0) {
      mermaidDivs.forEach(div => div.style.visibility = 'hidden');
      setTimeout(async () => {
        try {
          await window.mermaid.run({ nodes: mermaidDivs });
          mermaidDivs.forEach(div => {
            div.style.visibility = 'visible';
            div.classList.add('rendered');
          });
        } catch (err) {
          mermaidDivs.forEach(div => div.style.visibility = 'visible');
        }
      }, 800);
    }
  }
}


function renderFallback(id) {
  const container = document.getElementById('project-readme-container');
  if (!container) return;
  const data = getData();
  const project = data.projects.find(p => p.id === id);
  container.innerHTML = `
    <div class="project-summary-raw">
      <h2 class="raw-section-title">${t('projects.overviewTitle')}</h2>
      <ul class="raw-points-list">
        ${project ? project.points.map(p => `<li>${p}</li>`).join('') : `<li>${t('projects.readmeUnavailable')}</li>`}
      </ul>
    </div>
  `;
}

export function getIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('repository')) return 'logo-github';
  if (lower.includes('thesis') || lower.includes('report')) return 'school-outline';
  if (lower.includes('poster')) return 'document-outline';
  if (lower.includes('المستودع') || lower.includes('الكود') || lower.includes('جيت هب') || lower.includes('قت هب')) return 'logo-github';
  if (lower.includes('تقرير') || lower.includes('أطروحة') || lower.includes('البحث')) return 'school-outline';
  if (lower.includes('ملصق') || lower.includes('المنشور')) return 'document-outline';
  return 'open-outline';
}

export function resolveCategoryKey(category) {
  if (!category) return 'webdevelopment';
  const lower = category.toLowerCase().trim();
  if (lower === 'all' || lower === 'الكل') return 'all';
  if (lower.includes('system') || lower.includes('أنظمة') || lower.includes('infrastructure') || lower.includes('بنية تحتية') || lower.includes('sysadmin') || lower.includes('شبكات')) return 'systems';
  if (lower.includes('ui') || lower.includes('state') || lower.includes('واجهات') || lower.includes('إدارة الحالة') || lower.includes('تصاميم') || lower.includes('frontend')) return 'uiconcepts';
  if (lower.includes('game') || lower.includes('ألعاب') || lower.includes('simulation') || lower.includes('محاكاة')) return 'games';
  if (lower.includes('cli') || lower.includes('algorithm') || lower.includes('خوارزميات') || lower.includes('أدوات')) return 'clialgorithms';
  if (lower.includes('engineering') || lower.includes('هندسة') || lower.includes('iot') || lower.includes('إنترنت الأشياء') || lower.includes('hardware')) return 'engineering';
  if (lower.includes('web') || lower.includes('ويب')) return 'webdevelopment';
  return 'webdevelopment';
}

export function renderProjectsSection() {
  const data = getData();
  let categories = t('projects.categories');
  if (!Array.isArray(categories)) {
    categories = FALLBACK_CATEGORIES;
  }

  const projects = data.projects.map(p => {
    const primaryCat = p.category || 'Web Applications';
    const primaryKey = resolveCategoryKey(primaryCat);

    // Support multi-category: p.categories array or fallback to [p.category]
    const catList = Array.isArray(p.categories) && p.categories.length > 0
      ? p.categories
      : [primaryCat];

    const categoryKeys = [...new Set(catList.map(resolveCategoryKey))];
    if (!categoryKeys.includes(primaryKey)) {
      categoryKeys.unshift(primaryKey);
    }

    let catIndex = INTERNAL_CATEGORIES.indexOf(primaryKey);
    if (catIndex === -1) catIndex = 2; // Web Applications fallback
    const displayCategory = categories[catIndex] || primaryCat;

    return {
      ...p,
      categoryKey: primaryKey,
      categoryKeys: categoryKeys.join(' '),
      displayCategory
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  return `
    <header id="projects-section" class="animate-entry" style="margin-top: 5rem; margin-bottom: 2rem; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('projects.sectionTitle')}
      </h1>
    </header>
    <section>
    <ul class="filter-list navbar-style-pill">
      <div class="pill-indicator"></div>
      <div class="pill-indicator-hover"></div>
      ${categories.map((cat, i) => {
    const internalCat = INTERNAL_CATEGORIES[i] || 'all';
    const icon = CATEGORY_ICONS[i] || 'grid-outline';
    return `
        <li class="filter-item">
          <button class="pill-btn ${i === 0 ? 'active' : ''}" data-filter-btn="${internalCat}">
            <ion-icon name="${icon}"></ion-icon>
            <span class="filter-text">${cat}</span>
          </button>
        </li>
      `}).join('')}
    </ul>
    <ul class="project-list">
      ${projects.map(project => `
        <li class="project-item active" data-filter-item data-category="${project.categoryKeys}">
            <div class="project-item-icon-box">
              <ion-icon name="${getCategoryIcon(project.categoryKey)}"></ion-icon>
            </div>
            <div class="project-links">
              ${project.links && project.links.length > 0 ? project.links.map(link => `<a href="${link.url}" target="_blank" class="project-link-btn" title="${link.text}"><ion-icon name="${getIcon(link.text)}"></ion-icon> <span>${link.text}</span></a>`).join('') : ''}
            </div>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-category">${project.displayCategory}</p>
            <div class="project-meta">
              <p class="project-small-description">
                ${project.subtitle || (project.points && project.points.length > 0 ? project.points[0] : '')}
              </p>
              <a href="${resolvePath(`projects/${project.id}`)}" data-nav-link="projects/${project.id}" class="go-to-project-btn">
                <span>${t('projects.viewProject')}</span>
                <span class="project-btn-icon">
                  <ion-icon name="${document.documentElement.dir === 'rtl' ? 'arrow-back-outline' : 'arrow-forward-outline'}"></ion-icon>
                </span>
              </a>
            </div>
        </li>
      `).join('')}
    </ul>
    </section>
  `;
}