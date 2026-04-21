import { data } from '../data.js';

export function renderArticlesSection() {
  const categories = ['All', 'Technology', 'Engineering', 'Career', 'Life'];
  
  const articles = [
    {
      title: "Transitioning from Electrical Engineering to Software",
      date: "Yesterday",
      category: "Career",
      desc: "A reflection on how my background in highly regulated fire safety systems translates to building reliable applications.",
      readTime: "5 min read"
    },
    {
      title: "Building Real-Time Social Networks",
      date: "6 days ago",
      category: "Technology",
      desc: "Insights on using WebSockets and Go to create fast, scalable concurrent chat platforms.",
      readTime: "8 min read"
    },
    {
      title: "Complexity in Simplicity: The Art of Clean Code",
      date: "2 weeks ago",
      category: "Technology",
      desc: "Why writing less code is often much harder than writing more, and how to master the art of minimalism.",
      readTime: "4 min read"
    },
    {
      title: "Solar PV Systems: The Future of Energy",
      date: "1 month ago",
      category: "Engineering",
      desc: "An overview of solar PV installation standards and the technical challenges of grid integration.",
      readTime: "12 min read"
    }
  ];

  const categoryTabs = categories.map(cat => `
    <button class="article-tab ${cat === 'All' ? 'active' : ''}" data-filter="${cat.toLowerCase()}">${cat}</button>
  `).join('');

  const articleItems = articles.map(article => `
    <article class="article-card active" data-category="${article.category.toLowerCase()}">
      <div class="article-meta">
        <span class="article-date">${article.date}</span>
        <span class="article-dot">•</span>
        <span class="article-category">${article.category}</span>
        <span class="article-dot">•</span>
        <span class="article-read-time">${article.readTime}</span>
      </div>
      <h3 class="article-title-link">${article.title}</h3>
      <p class="article-desc">${article.desc}</p>
      <div class="article-footer">
        <a href="#" class="read-article-btn">Read full story <ion-icon name="arrow-forward-outline"></ion-icon></a>
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
