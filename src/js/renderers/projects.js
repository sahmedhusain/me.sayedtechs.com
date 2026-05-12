import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { renderTechLogos, getCategoryIcon, getIconForLibraryItem } from '../data/icons.js';
import { renderSkillsSection } from './skills.js';
import { FALLBACK_CATEGORIES, INTERNAL_CATEGORIES, CATEGORY_ICONS } from '../constants/config.js';

export function renderPortfolioPage() {
  return `
    <header class="animate-entry" style="margin-bottom: 1.2rem; text-align: left; animation-delay: 0s;">
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
  const ui = data.ui_extras || {};
  const projUi = ui.projects || {};
  const project = data.projects.find(p => p.id === id);
  if (!project) return `<div class="animate-entry"><p>${projUi.notFound}</p></div>`;

  const categoryKey = project.categoryKey || project.category?.toLowerCase().replace(/\s+/g, '') || 'webdevelopment';
  const githubLink = project.links.find(l => l.text.toLowerCase() === 'repository' && l.url.includes('github.com'));

  setTimeout(() => {
    if (githubLink) {
      loadReadme(githubLink.url, id, projUi);
    } else {
      const container = document.getElementById('project-readme-container');
      if (container) container.style.display = 'none';
    }
  }, 100);

  return `
    <section class="project-detail-wrapper animate-entry">
      <header class="project-detail-header">
        <div class="project-header-main">
          <button class="back-btn-minimal" onclick="window.history.back()" title="${projUi.backToPortfolio}">
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
             <div class="tech-label">Tech Stack</div>
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
                  <p>${projUi.readmeFetching}</p>
                </div>
             </div>
           ` : `
              <div class="project-summary-raw">
                 <h2 class="raw-section-title">${projUi.overviewTitle}</h2>
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

async function loadReadme(githubUrl, id, projUi) {
  const cleanUrl = githubUrl.replace(/\/+$/, '');
  const urlParts = cleanUrl.split('/');
  const repo = urlParts[urlParts.length - 1];
  const owner = urlParts[urlParts.length - 2];

  const container = document.getElementById('project-readme-container');
  if (!container) return;

  const branches = ['main', 'master', 'develop', 'gh-pages'];
  const files = ['README.md', 'readme.md', 'README.markdown', 'README.txt'];

  try {
    let markdown = '';
    let success = false;
    let successfulBranch = 'main';
    let successfulRepo = repo;
    let foundReadmeFile = 'README.md';

    // Discovery logic: Try to get repo info from API first to avoid 404s in console
    const repoNames = [repo, repo.toLowerCase(), id, id.toLowerCase()];
    const uniqueRepos = [...new Set(repoNames)];

    for (const r of uniqueRepos) {
      try {
        const repoApiUrl = `https://api.github.com/repos/${owner}/${r}`;
        const repoResp = await fetch(repoApiUrl);
        
        if (repoResp.ok) {
          const repoData = await repoResp.json();
          const defaultBranch = repoData.default_branch || 'main';
          
          // Now check for the README in the file list
          const contentsApiUrl = `https://api.github.com/repos/${owner}/${r}/contents/`;
          const contentsResp = await fetch(contentsApiUrl);
          
          if (contentsResp.ok) {
            const contents = await contentsResp.json();
            const readmeFile = contents.find(f => 
              ['README.md', 'readme.md', 'README.markdown', 'README.txt'].includes(f.name)
            );

            if (readmeFile) {
              const rawUrl = `https://raw.githubusercontent.com/${owner}/${r}/${defaultBranch}/${readmeFile.name}`;
              const resp = await fetch(rawUrl);
              if (resp.ok) {
                markdown = await resp.text();
                success = true;
                successfulBranch = defaultBranch;
                successfulRepo = r;
                foundReadmeFile = readmeFile.name;

                // Check for License in the same contents list
                const licenseFile = contents.find(f => 
                  ['LICENSE', 'LICENSE.md', 'license.md'].includes(f.name)
                );
                if (licenseFile) {
                  renderLicenseLink(owner, r, defaultBranch, licenseFile.name);
                }
                break;
              }
            }
          }
        }
      } catch (apiErr) {
        // GitHub API discovery failed
      }
    }

    // Fallback to the old probing method only if API discovery didn't succeed
    if (!success) {
      const branches = ['main', 'master', 'develop', 'gh-pages'];
      const files = ['README.md', 'readme.md', 'README.markdown', 'README.txt'];
      
      for (const r of uniqueRepos) {
        for (const branch of branches) {
          for (const file of files) {
            const url = `https://raw.githubusercontent.com/${owner}/${r}/${branch}/${file}`;
            try {
              const response = await fetch(url);
              if (response.ok) {
                markdown = await response.text();
                success = true;
                successfulBranch = branch;
                successfulRepo = r;
                
                // Quick license probe
                const licFiles = ['LICENSE', 'LICENSE.md'];
                for (const lf of licFiles) {
                  const lResp = await fetch(`https://raw.githubusercontent.com/${owner}/${r}/${branch}/${lf}`, { method: 'HEAD' });
                  if (lResp.ok) {
                    renderLicenseLink(owner, r, branch, lf);
                    break;
                  }
                }
                break;
              }
            } catch (e) {}
          }
          if (success) break;
        }
        if (success) break;
      }
    }

    function renderLicenseLink(owner, repo, branch, filename) {
      const headerLinks = document.querySelector('.project-header-links');
      if (headerLinks && !headerLinks.querySelector('[data-license-link]')) {
        const licLink = document.createElement('a');
        licLink.href = `https://github.com/${owner}/${repo}/blob/${branch}/${filename}`;
        licLink.target = '_blank';
        licLink.className = 'btn-solid-black-inverted';
        licLink.setAttribute('data-license-link', 'true');
        licLink.innerHTML = `<ion-icon name="document-text-outline"></ion-icon><span>${t('projects.license')}</span>`;
        headerLinks.appendChild(licLink);
      }
    }

    if (!success) throw new Error('README not found');

    const rawUrlBase = `https://raw.githubusercontent.com/${owner}/${successfulRepo}/${successfulBranch}`;
    
    // Helper to normalize URLs and handle ./ relative paths
    const normalizeUrl = (path) => {
      // If it's already an absolute URL, check if it's a GitHub blob link that should be raw
      if (path.startsWith('http')) {
        if (path.includes('github.com') && path.includes('/blob/')) {
          return path.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }
        return path;
      }
      
      if (path.startsWith('/') || path.startsWith('data:')) return path;
      
      const cleanPath = path.replace(/^\.\//, '');
      // Encode URI to handle spaces in filenames
      const encodedPath = encodeURI(cleanPath);
      return `${rawUrlBase}/${encodedPath}`.replace(/([^:]\/)\/+/g, "$1");
    };

    // Fix relative image and link paths
    markdown = markdown.replace(/(!\[.*?\]\()(.+?)(\))/g, (match, p1, p2, p3) => {
      return `${p1}${normalizeUrl(p2)}${p3}`;
    });
    
    markdown = markdown.replace(/src=["'](.+?)["']/g, (match, p1) => {
      return `src="${normalizeUrl(p1)}"`;
    });

    markdown = markdown.replace(/href=["'](.+?)["']/g, (match, p1) => {
      // Only rewrite relative internal links, not #anchors or absolute URLs
      if (p1.startsWith('#') || p1.startsWith('http') || p1.startsWith('mailto:')) return match;
      return `href="${normalizeUrl(p1)}"`;
    });

    let parsedHtml = '';
    if (typeof marked !== 'undefined') {
      const renderer = new marked.Renderer();
      
      // Auto-generate IDs for headings to support Table of Contents
      renderer.heading = ({ text, depth }) => {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${depth} id="${escapedText}">${text}</h${depth}>`;
      };

      renderer.code = (token) => {
        const code = token.text;
        const lang = (token.lang || '').toLowerCase();
        
        if (lang.includes('mermaid')) {
          return `<pre class="mermaid">${code}</pre>`;
        }
        
        const langClass = lang ? `class="language-${lang}"` : '';
        return `<pre><code ${langClass}>${code}</code></pre>`;
      };


      parsedHtml = marked.parse(markdown, { renderer });
    } else {
      parsedHtml = `<pre>${markdown}</pre>`;
    }

    container.innerHTML = `
      <div class="markdown-body-raw">
        ${parsedHtml}
      </div>
    `;

    if (window.mermaid) {
      try {
        // Find and hide immediately to prevent flash
        const initialDivs = container.querySelectorAll('.mermaid');
        initialDivs.forEach(div => div.style.visibility = 'hidden');

        setTimeout(async () => {
          const mermaidDivs = container.querySelectorAll('.mermaid');
          if (mermaidDivs.length > 0) {
            try {
              // mermaid.run is more robust for pre tags
              await window.mermaid.run({
                nodes: mermaidDivs
              });
              
              mermaidDivs.forEach(div => {
                div.style.visibility = 'visible';
                div.classList.add('rendered');
              });
            } catch (err) {
              mermaidDivs.forEach(div => div.style.visibility = 'visible');
            }
          }
        }, 800);
      } catch (e) {
      }
    }
  } catch (err) {
    const data = getData();
    const project = data.projects.find(p => p.id === id);
    container.innerHTML = `
      <div class="project-summary-raw">
        <h2 class="raw-section-title">${projUi.overviewTitle}</h2>
        <ul class="raw-points-list">
          ${project ? project.points.map(p => `<li>${p}</li>`).join('') : `<li>${projUi.detailsInRepo}</li>`}
        </ul>
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
    const jsonCategory = p.category || 'Web Development';
    
    // Find index in FALLBACK_CATEGORIES to get the correct internal key and display label
    let catIndex = FALLBACK_CATEGORIES.indexOf(jsonCategory);
    if (catIndex === -1) {
       // Robust fallback if the category string in JSON doesn't exactly match
       const lowerCat = jsonCategory.toLowerCase();
       if (lowerCat.includes('game')) catIndex = 3;
       else if (lowerCat.includes('engineering')) catIndex = 2;
       else if (lowerCat.includes('cli') || lowerCat.includes('algorithm')) catIndex = 4;
       else if (lowerCat.includes('ui')) catIndex = 5;
       else catIndex = 1; // Default to Web Dev
    }

    const categoryKey = INTERNAL_CATEGORIES[catIndex];
    const displayCategory = categories[catIndex];

    return { ...p, categoryKey, displayCategory };
  }).sort((a, b) => a.name.localeCompare(b.name));

  return `
    <header id="projects-section" class="animate-entry" style="margin-top: 5rem; margin-bottom: 2rem; text-align: left; animation-delay: 0s;">
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
        <li class="project-item active" data-filter-item data-category="${project.categoryKey}">
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
              <a href="projects/${project.id}" data-nav-link="projects/${project.id}" class="go-to-project-btn">
                <span>${t('projects.viewProject')}</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </div>
        </li>
      `).join('')}
      <li class="project-item ui-concepts-coming-soon" data-filter-item data-category="uiconcepts">
        <div class="coming-soon-content">
          <div class="coming-soon-icon">
            <ion-icon name="color-palette-outline"></ion-icon>
          </div>
          <h3 class="coming-soon-title">${t('projects.categories')[5]}</h3>
          <p class="coming-soon-text">${t('projects.comingSoon')}</p>
          <div class="coming-soon-description">
            ${t('projects.comingSoonDesc')}
          </div>
        </div>
      </li>
    </ul>
    </section>
  `;
}