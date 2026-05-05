import { data } from '../data.js';

export function renderArticlesSection() {
  const categories = ['All', 'Technology', 'Engineering', 'Career', 'Life'];
  
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
    <header class="section-header-glass">
      <div class="header-left">
        <p class="section-label">Articles ✍️</p>
        <p class="section-subtitle">Deep dives into engineering, code, and professional growth.</p>
      </div>
    </header>

    <!-- Article Sub-Navigation Bar -->
    <nav class="article-navbar">
      <div class="article-nav-pills">
        ${categoryTabs}
      </div>
      <div class="article-search">
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="Search articles..." id="articleSearch">
      </div>
    </nav>

    <div class="articles-grid">
      ${articleItems}
    </div>
  `;
}

export function renderArticleDetail(id) {
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
        <!-- Placeholder for full article content -->
        <div style="margin-top: 2rem; color: var(--text-secondary); line-height: 1.8;">
          <p>Full article content would go here. Currently, each article has a title, date, category, and description.</p>
          <p>As I continue to share my journey at the intersection of electrical engineering and software development, I will be adding more detailed technical write-ups and reflections here.</p>
        </div>
      </div>
    </div>
  `;
}
