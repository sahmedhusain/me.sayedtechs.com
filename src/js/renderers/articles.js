import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';

export function renderArticlesSection() {
  const data = getData();
  const categories = t('articles.categories') || ['All', 'Technology', 'Engineering', 'Career', 'Life'];
  
  const categoryTabs = categories.map(cat => `
    <button class="article-tab ${cat === 'All' ? 'active' : ''}" data-filter="${cat.toLowerCase()}">${cat}</button>
  `).join('');

  const articleItems = data.articles.map(article => `
    <article class="article-card active" data-category="${article.category.toLowerCase()}">
      <div class="article-meta">
        <span class="article-date">${new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <span class="article-dot">•</span>
        <span class="article-category">${article.category}</span>
        <span class="article-dot">•</span>
        <span class="article-read-time">${article.readTime}</span>
      </div>
      <h3 class="article-title-link">${article.title}</h3>
      <p class="article-desc">${article.desc}</p>
      <div class="article-footer">
        <a href="articles/${article.id}" data-nav-link="articles/${article.id}" class="read-article-btn">Read full story <ion-icon name="arrow-forward-outline"></ion-icon></a>
      </div>
    </article>
  `).join('');

  return `
    <header class="animate-entry" style="margin-bottom: 4rem; text-align: left; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('articles.title') || 'Articles ✍️'}
      </h1>
      <p class="section-subtitle" style="font-size: 1.15rem; line-height: 1.7; color: var(--text-secondary); max-width: 850px; font-family: var(--font-sans);">
        ${t('articles.subtitle') || 'Deep dives into engineering, code, and professional growth.'}
      </p>
    </header>

    <!-- Article Sub-Navigation Bar -->
    <nav class="article-navbar animate-entry" style="animation-delay: 0.1s;">
      <div class="article-nav-pills">
        ${categoryTabs}
      </div>
      <div class="article-search">
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="Search articles..." id="articleSearch">
      </div>
    </nav>

    <div class="articles-grid animate-entry" style="animation-delay: 0.2s;">
      ${articleItems}
    </div>
  `;
}

export function renderArticleDetail(id) {
  const data = getData();
  console.log('Rendering article with ID:', id);
  const article = data.articles.find(a => String(a.id) === String(id));
  if (!article) {
    console.error('Article not found for ID:', id);
    return `<div class="error-container"><h1>Article not found</h1><button data-nav-link="articles">Back to articles</button></div>`;
  }

  return `
    <div class="article-detail-wrapper">
      <header class="article-detail-header">
        <button class="back-btn" data-nav-link="articles">
          <ion-icon name="arrow-back-outline"></ion-icon> Back to Articles
        </button>
        <div class="article-meta">
          <span>${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span class="dot">•</span>
          <span>${article.category}</span>
          <span class="dot">•</span>
          <span>${article.readTime}</span>
        </div>
        <h1 class="article-title">${article.title}</h1>
      </header>
 
      <div class="article-content">
        <p class="article-lead">${article.desc}</p>
        ${article.content && article.content.length > 0 ? `
          <div style="margin-top: 2rem; color: var(--text-secondary); line-height: 1.8;">
            ${renderArticleContent(article.content)}
          </div>
        ` : `
          <div style="margin-top: 2rem; color: var(--text-secondary); line-height: 1.8;">
            <p>${t('articles.fullContentPlaceholder')}</p>
            <p>${t('articles.fullContentNote')}</p>
          </div>
        `}
      </div>
    </div>
  `;
}

/**
 * Render structured article content blocks.
 * Supports: paragraph, heading, image, code, embed (linkedin, twitter, youtube, gist)
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
        const src = block.src || '';
        const captionHtml = block.caption
          ? `<figcaption style="text-align: center; margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); font-style: italic;">${block.caption}</figcaption>`
          : '';
        return `
          <figure style="margin: 2rem 0;">
            <img src="${src}" alt="${block.alt || ''}" style="width: 100%; border-radius: 1rem; object-fit: cover;">
            ${captionHtml}
          </figure>
        `;
      }

      case 'code':
        return `
          <pre style="background: var(--tertiary); border: 1px solid var(--card-border); border-radius: 0.8rem; padding: 1.5rem; overflow-x: auto; margin: 1.5rem 0; font-family: var(--font-mono); font-size: 0.9rem;">
            <code>${block.code}</code>
          </pre>
        `;

      case 'embed':
        return renderEmbed(block);

      default:
        return '';
    }
  }).join('');
}

/**
 * Render a social embed block (LinkedIn, Twitter, YouTube, GitHub Gist).
 */
function renderEmbed(block) {
  const captionHtml = block.caption
    ? `<p style="text-align: center; margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); font-style: italic;">${block.caption}</p>`
    : '';

  switch (block.platform) {
    case 'linkedin':
      return `
        <div style="margin: 2rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid var(--card-border);">
          <iframe src="${block.url}" height="400" width="100%" frameborder="0" allowfullscreen style="border: none; display: block;"></iframe>
          ${captionHtml}
        </div>
      `;

    case 'twitter':
      return `
        <div style="margin: 2rem 0; display: flex; justify-content: center;">
          <blockquote class="twitter-tweet" data-dnt="true">
            <a href="https://twitter.com/i/status/${block.tweetId}"></a>
          </blockquote>
          ${captionHtml}
        </div>
      `;

    case 'youtube':
      return `
        <div style="margin: 2rem 0; border-radius: 1rem; overflow: hidden; aspect-ratio: 16/9; border: 1px solid var(--card-border);">
          <iframe src="${block.url}" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border: none; display: block;"></iframe>
          ${captionHtml}
        </div>
      `;

    case 'gist':
      return `
        <div style="margin: 2rem 0;">
          <script src="${block.url}"></script>
          ${captionHtml}
        </div>
      `;

    default:
      return `
        <div style="margin: 2rem 0; padding: 1.5rem; border: 1px solid var(--card-border); border-radius: 1rem;">
          <a href="${block.url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent);">${block.url}</a>
          ${captionHtml}
        </div>
      `;
  }
}

