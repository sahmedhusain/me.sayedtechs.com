import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { resolvePath } from '../utils/paths.js';

// LinkedIn Embed Auto-Resize Support
window.addEventListener('message', function(e) {
  if (e.origin.includes('linkedin.com')) {
    try {
      const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      if (data.type === 'resize' || data.height) {
        const iframes = document.querySelectorAll('iframe[src*="linkedin.com/embed"]');
        for (const iframe of iframes) {
          if (iframe.contentWindow === e.source) {
            const newHeight = data.height || data.scrollHeight;
            if (newHeight) {
              iframe.style.height = (newHeight + 50) + 'px';
              // Also update parent container if needed
              if (iframe.parentElement) iframe.parentElement.style.height = 'auto';
            }
            break;
          }
        }
      }
    } catch (err) {}
  }
}, false);

/**
 * Renders the main Articles list page.
 */
export function renderArticlesSection() {
  const data = getData();
  const categoryMapping = t('articles.categories') || {};
  const staticCategoryKeys = Object.keys(categoryMapping);
  const articleCategoryKeys = [...new Set(data.articles.map(article => article.category))];
  
  // Combine all unique keys, preserving order of static keys
  const categoryKeys = [...staticCategoryKeys];
  articleCategoryKeys.forEach(key => {
    if (!categoryKeys.includes(key)) {
      categoryKeys.push(key);
    }
  });

  const categoryTabs = categoryKeys.map((key, index) => {
    const label = categoryMapping[key] || key;
    return `
      <button class="article-tab ${index === 0 ? 'active' : ''}" data-filter="${index === 0 ? 'all' : key.toLowerCase()}">${label}</button>
    `;
  }).join('');

  const noArticlesMessage = `<div id="noArticlesMessage" class="no-content-message animate-entry" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary); font-style: italic; border: 1px dashed var(--card-border); border-radius: 1.5rem; ${data.articles.length > 0 ? 'display: none;' : ''}">
         <ion-icon name="document-text-outline" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></ion-icon>
         <p style="font-size: 1.1rem;">${t('articles.noArticlesFound')}</p>
       </div>`;

  const articleItems = data.articles.map(article => {
    const englishArticle = data.articles_en?.find(a => a.id === article.id) || {};
    const arabicArticle = data.articles_ar?.find(a => a.id === article.id) || {};
    return `
      <article class="article-card active animate-entry" 
               data-category="${article.category.toLowerCase()}"
               data-title-en="${(englishArticle.title || '').toLowerCase()}"
               data-desc-en="${(englishArticle.desc || '').toLowerCase()}"
               data-title-ar="${(arabicArticle.title || '').toLowerCase()}"
               data-desc-ar="${(arabicArticle.desc || '').toLowerCase()}">
        <div class="article-card-body">
          <div class="article-meta">
            <span class="article-date">${new Date(article.date).toLocaleDateString(document.documentElement.dir === 'rtl' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span class="article-dot">•</span>
            <span class="article-category">${categoryMapping[article.category] || article.category}</span>
            ${(article.embeds && article.embeds.length > 0) ? `
              <span class="article-dot">•</span>
              <span class="article-platform-inline" title="${article.embeds[0].platform || article.embeds[0].provider}">
                ${String(article.embeds[0].platform || article.embeds[0].provider).toLowerCase() === 'x' || String(article.embeds[0].platform || article.embeds[0].provider).toLowerCase() === 'twitter' 
                  ? '<span class="x-logo-inline">𝕏</span>' 
                  : `<ion-icon name="${getPlatformIcon(article.embeds[0].platform || article.embeds[0].provider)}"></ion-icon>`}
              </span>
            ` : ''}
          </div>
          <h3 class="article-title-link" data-nav-link="articles/${article.id}">${article.title}</h3>
          <p class="article-desc">${article.desc}</p>
          <div class="article-footer">
            <span class="article-read-time"><ion-icon name="time-outline"></ion-icon> ${article.readTime}</span>
            <a href="${resolvePath(`articles/${article.id}`)}" data-nav-link="articles/${article.id}" class="read-article-btn">
              ${t('articles.readFullArticle')} <ion-icon name="${document.documentElement.dir === 'rtl' ? 'arrow-back-outline' : 'arrow-forward-outline'}"></ion-icon>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  return `
    <header class="animate-entry" style="margin-bottom: 1.2rem; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('articles.title')}
      </h1>
      <p class="section-subtitle" style="font-size: 1.15rem; line-height: 1.7; color: var(--text-secondary); max-width: 850px; font-family: var(--font-sans);">
        ${t('articles.subtitle')}
      </p>
    </header>

    <nav class="article-navbar animate-entry" style="animation-delay: 0.1s;">
      <div class="article-nav-pills">
        ${categoryTabs}
      </div>
      <div class="article-search">
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="${t('articles.searchPlaceholder')}" id="articleSearch">
      </div>
    </nav>

    <div class="articles-grid animate-entry" style="animation-delay: 0.2s;">
      ${articleItems}
      ${noArticlesMessage}
    </div>
  `;
}

/**
 * Renders a single Article detail page.
 */
export function renderArticleDetail(id) {
  const data = getData();
  const ui = data.ui_extras || {};
  const articlesUi = ui.articles || {};
  const categoryMapping = t('articles.categories') || {};
  const article = data.articles.find(a => String(a.id) === String(id));
  
  if (!article) {
    return `
      <div class="error-container animate-entry">
        <h1>${t('articles.articleNotFound')}</h1>
        <button class="btn-solid-black" data-nav-link="articles">${t('articles.backToArticles')}</button>
      </div>
    `;
  }

  const articleBlocks = [
    ...(Array.isArray(article.content) ? article.content : []),
    ...(Array.isArray(article.embeds) ? article.embeds.map(embed => ({ type: 'embed', ...embed })) : [])
  ];

  return `
    <section class="project-detail-wrapper animate-entry article-detail-page">
      <header class="project-detail-header">
        <div class="project-header-main">
          <button class="back-btn-minimal" data-nav-link="articles" title="${t('articles.backToArticles')}">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          
          <div class="project-title-box">
             <div class="project-detail-category">${categoryMapping[article.category] || article.category}</div>
             <h2 class="project-detail-title">${article.title}</h2>
             <p class="project-detail-subtitle">${article.desc}</p>
          </div>
        </div>
      </header>

      <div class="project-detail-grid">
        <div class="project-info-sidebar" style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1.5rem; border-bottom: 1px solid var(--card-border); padding-bottom: 1.5rem;">
            <div class="lib-chip" style="color: var(--text-primary); font-weight: 600; padding: 0; display: flex; align-items: center;">
              <ion-icon name="calendar-outline" style="color: var(--accent); margin-right: 0.5rem;"></ion-icon>
              ${new Date(article.date).toLocaleDateString(document.documentElement.dir === 'rtl' ? 'ar-SA' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <div style="width: 1px; height: 14px; background: var(--card-border); opacity: 0.5;"></div>

            <div class="lib-chip" style="color: var(--text-primary); font-weight: 600; padding: 0; display: flex; align-items: center;">
              <ion-icon name="time-outline" style="color: var(--accent); margin-right: 0.5rem;"></ion-icon>
              ${article.readTime}
            </div>
          </div>
        </div>

        <div class="project-main-content">
          <div class="readme-container-raw">
            <div class="markdown-body-raw article-body">
              ${article.image ? `<img src="${article.image}" alt="${article.title}" class="article-featured-image">` : ''}
              ${renderArticleContent(articleBlocks)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render structured article content blocks.
 */
function renderArticleContent(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${block.text}</p>`;

      case 'heading': {
        const level = block.level || 2;
        return `<h${level}>${block.text}</h${level}>`;
      }

      case 'image': {
        const src = resolvePath(block.src || '');
        const captionHtml = block.caption
          ? `<figcaption class="article-caption">${block.caption}</figcaption>`
          : '';
        return `
          <figure class="article-figure">
            <img src="${src}" alt="${block.alt || ''}" class="article-content-image">
            ${captionHtml}
          </figure>
        `;
      }

      case 'code':
        return `
          <div class="article-code-block">
            <div class="code-header">
              <span class="code-lang">${block.lang || t('articles.code')}</span>
            </div>
            <pre><code>${block.code}</code></pre>
          </div>
        `;

      case 'embed':
        return renderEmbed(block);

      default:
        return '';
    }
  }).join('');
}

/**
 * Renders embedded content for various platforms.
 */
function renderEmbed(block) {
  if (!block || (!block.url && !block.id && !block.src)) return '';
  const platform = String(block.platform || block.provider || '').toLowerCase();
  const captionHtml = block.caption
    ? `<p class="embed-caption">${block.caption}</p>`
    : '';

  switch (platform) {
    case 'youtube':
      const youtubeId = block.id || (block.url ? extractYoutubeId(block.url) : '');
      return `
        <div class="embed-container youtube">
          <iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>
          ${captionHtml}
        </div>
      `;

    case 'linkedin':
      const linkedinUrl = block.url || block.src || '';
      return `
        <div class="embed-wrapper linkedin-wrapper">
          <div class="embed-container linkedin">
            <iframe 
              src="${linkedinUrl}" 
              style="width: 100%; height: 800px; border: none; display: block; transition: height 0.5s ease-in-out;"
              frameborder="0" 
              allowfullscreen="" 
              scrolling="yes"
              title="LinkedIn Post"></iframe>
          </div>
          ${captionHtml}
        </div>
      `;

    case 'x':
    case 'twitter':
      return `
        <div class="embed-container x">
          <blockquote class="twitter-tweet" data-theme="dark">
            <a href="${block.url}"></a>
          </blockquote>
          ${captionHtml}
        </div>
      `;

    case 'medium':
      return `
        <div class="embed-container medium">
          <iframe src="${block.url}" width="100%" height="400" frameborder="0"></iframe>
          ${captionHtml}
        </div>
      `;

    case 'reddit':
      return `
        <div class="embed-container reddit">
          <iframe src="${block.url}" width="100%" height="500" frameborder="0"></iframe>
          ${captionHtml}
        </div>
      `;

    default:
      return `
        <div class="embed-container generic">
          <a href="${block.url}" target="_blank" class="embed-link">
            <ion-icon name="link-outline"></ion-icon>
            <span>${t('articles.viewOn')} ${platform}</span>
          </a>
          ${captionHtml}
        </div>
      `;
  }
}

// --- Helpers ---

export function getPlatformIcon(platform) {
  const p = platform.toLowerCase();
  if (p.includes('youtube')) return 'logo-youtube';
  if (p.includes('linkedin')) return 'logo-linkedin';
  if (p.includes('twitter') || p === 'x') return 'logo-x';
  if (p.includes('medium')) return 'logo-medium';
  if (p.includes('reddit')) return 'logo-reddit';
  return 'document-text-outline';
}

function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
