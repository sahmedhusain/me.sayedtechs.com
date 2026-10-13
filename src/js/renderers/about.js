import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { getLogo, timeAgo } from '../utils.js';
import { resolvePath } from '../utils/paths.js';
import { getPlatformIcon } from './articles.js';

export function renderSidebar() {
  const data = getData();
  return `
    <aside class="sidebar" data-sidebar>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img src="${data.avatar}" alt="${data.name}" width="80" fetchpriority="high" decoding="async" onerror="handleImageError(this)">
        </figure>
        <div class="action-buttons">
          <button class="action-btn primary">
            <ion-icon name="document-text-outline"></ion-icon>
            <span>${t('about.downloadResume')}</span>
          </button>
          <button class="action-btn secondary">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>${t('about.contactDetails')}</span>
          </button>
        </div>
      </div>
      <div class="sidebar-info-more">
        <div class="separator"></div>
        <ul class="contacts-list">
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">${t('about.contactLabels.email')}</p>
              <a href="mailto:${data.contact.email}" class="contact-link">${data.contact.email}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">${t('about.contactLabels.phone')}</p>
              <a href="tel:${data.contact.phone}" class="contact-link">${data.contact.phone}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="flag-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">${t('about.contactLabels.nationality')}</p>
              <address>${data.nationality}</address>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">${t('about.contactLabels.address')}</p>
              <address>${data.address}</address>
            </div>
          </li>
        </ul>
        <div class="separator"></div>
        <ul class="social-list">
          <li class="social-item">
            <a href="${data.contact.github}" class="social-link">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li class="social-item">
            <a href="${data.contact.linkedin}" class="social-link">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `;
}

export function renderAboutSection() {
  const data = getData();
  const aboutHtml = (data.about || data.summary || '')
    .split(/\n\s*\n/)
    .map(p => `<p style="margin-bottom: 1.5rem;">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');
  return `
    <div class="about-section-container">
      
      <!-- Left Column: Title and Description -->
      <div class="animate-entry" style="flex: 2; min-width: 300px; display: flex; flex-direction: column; align-items: flex-start; animation-delay: 0s;">
        <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2rem; font-family: var(--font-sans);">${t('about.greeting')}</h1>
        <section class="about-text" style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem; text-align: justify; text-justify: inter-word; max-width: none;">
          ${aboutHtml}
        </section>
      </div>

      <!-- Right Column: Socials and Email -->
      <div class="animate-entry" style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 0.5rem; animation-delay: 0.1s;">
        <style>
          .about-contact-link {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .about-contact-link:hover {
            color: var(--accent);
            transform: translateX(5px);
          }
        </style>
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          <a href="${data.contact.github}" target="_blank" class="about-contact-link">
            <ion-icon name="logo-github" style="font-size: 1.3rem;"></ion-icon> ${t('about.follow.github')}
          </a>
          <a href="${data.contact.linkedin}" target="_blank" class="about-contact-link">
            <ion-icon name="logo-linkedin" style="font-size: 1.3rem;"></ion-icon> ${t('about.follow.linkedin')}
          </a>
          <a href="${data.contact.twitter}" target="_blank" class="about-contact-link">
             <span class="x-logo-about">𝕏</span> ${t('about.follow.x')}
          </a>
          <a href="${data.contact.medium}" target="_blank" class="about-contact-link">
            <ion-icon name="logo-medium" style="font-size: 1.3rem;"></ion-icon> ${t('about.follow.medium')}
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid var(--card-border); margin: 0.5rem 0;">
        
        <a href="mailto:${data.contact.email}" class="about-contact-link">
          <ion-icon name="mail-outline" style="font-size: 1.3rem;"></ion-icon> ${data.contact.email}
        </a>
      </div>

    </div>
  `;
}


export function renderHomeFeed() {
  const data = getData();
  return `
    <style>
      .read-more-link {
        transition: all 0.3s ease;
      }
      .read-more-link:hover {
        color: var(--accent-hover) !important;
        transform: translateX(5px) !important;
      }
      .read-more-link ion-icon {
        transition: transform 0.3s ease;
      }
      .read-more-link:hover ion-icon {
        transform: translateX(3px);
      }
      .action-btn-glass {
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        cursor: pointer;
      }
      .action-btn-glass:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: var(--accent) !important;
        transform: none !important;
        box-shadow: none !important;
      }
      .action-btn-glass:hover span {
        color: var(--accent);
      }
      .action-btn-glass:hover ion-icon {
        transform: translateX(5px);
        color: var(--accent);
      }
      .action-btn-glass ion-icon {
        transition: transform 0.3s ease;
      }
    </style>
    <!-- Profile Card with Avatar and Action Buttons -->
    <div class="about-profile-header animate-entry" style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; margin-bottom: 2.5rem; width: 100%; animation-delay: 0s;">
      
      <!-- Picture -->
      <div class="about-avatar-section">
        <div id="home-main-avatar" class="home-avatar-box" style="margin: 0; width: 80px; height: 80px; min-width: 80px; min-height: 80px; flex-shrink: 0; display: block; border-radius: 50%; overflow: hidden; aspect-ratio: 1 / 1; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
          <img src="${data.avatar}" alt="${data.name}" style="width:100%; height:100%; display:block; object-fit:cover;" fetchpriority="high" decoding="async" onerror="handleImageError(this)">
        </div>
      </div>
      
      <!-- Info & Socials -->
      <div>
        <h1 class="home-welcome-title">${t('home.welcome')}</h1>
        <p class="about-tagline">${t('home.tagline')}</p>
        
        <style>
          .home-profile-socials { position: relative; z-index: 50; }
          .home-profile-socials a {
            position: relative;
            overflow: visible;
            color: var(--text-secondary);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
          }
          .home-profile-socials a:hover {
            color: var(--accent);
            transform: translateY(-3px);
            z-index: 10000;
          }
          .home-profile-socials a::before {
            content: attr(data-title);
            position: absolute;
            top: -45px;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background: #ffffff !important; /* Fully filled, non-transparent */
            border: 1px solid #e4e4e7;
            padding: 6px 14px;
            border-radius: 0.8rem;
            font-size: 0.85rem;
            font-weight: 700;
            color: #18181b;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 99999; /* Moved fully forward */
          }
          .home-profile-socials a::after {
            content: "";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            border-width: 6px;
            border-style: solid;
            border-color: #e4e4e7 transparent transparent transparent;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 99998;
          }
          .home-profile-socials a:hover::before {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
            transition-delay: 0.2s;
          }
          .home-profile-socials a:hover::after {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) scale(1);
            transition-delay: 0.2s;
          }
        </style>
        <div class="home-profile-socials" style="display: flex; gap: 1.5rem; font-size: 1.6rem; margin-bottom: 2rem;">
          <a href="${data.contact.linkedin}" target="_blank" data-title="${t('home.social.connect')}" aria-label="LinkedIn Profile">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="${data.contact.github}" target="_blank" data-title="${t('home.social.code')}" aria-label="GitHub Profile">
            <ion-icon name="logo-github"></ion-icon>
          </a>
          <a href="${data.contact.medium}" target="_blank" data-title="${t('home.social.read')}" aria-label="Medium Blog">
            <ion-icon name="logo-medium"></ion-icon>
          </a>
          <a href="${data.contact.twitter}" target="_blank" data-title="${t('home.social.follow')}" aria-label="X Profile" style="font-family: var(--font-sans); font-weight: bold; background: none;">
            <span>𝕏</span>
          </a>
        </div>
      </div>
    </div>

    <div class="home-feed-container animate-entry" style="animation-delay: 0.1s;">
      
      <section style="flex: 1.5; min-width: 300px;">
        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:2.5rem;">
          ${data.articles.length > 0 
            ? data.articles.slice(0, 5).map(post => {
                return `
                  <li class="flat-post-item" style="position: relative; display: flex; flex-direction: column;">
                    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                      ${timeAgo(post.date)} • ${post.category}
                      ${(post.embeds && post.embeds.length > 0) ? `
                        • 
                        <span class="article-platform-inline" style="color: var(--accent); font-size: 0.9rem;">
                          ${String(post.embeds[0].platform || post.embeds[0].provider).toLowerCase() === 'x' || String(post.embeds[0].platform || post.embeds[0].provider).toLowerCase() === 'twitter' 
                            ? '<span class="x-logo-inline">𝕏</span>' 
                            : `<ion-icon name="${getPlatformIcon(post.embeds[0].platform || post.embeds[0].provider)}"></ion-icon>`}
                        </span>
                      ` : ''}
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; transition: color 0.2s;">${post.title}</h3>
                    <p style="color: var(--text-secondary); margin: 0 0 1.2rem 0; font-size: 1rem; line-height: 1.6; flex-grow: 1;">${post.desc}</p>
                    <a href="${resolvePath(`articles/${post.id}`)}" data-nav-link="articles/${post.id}" class="read-more-link" style="color: var(--accent); font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; text-decoration: none; width: fit-content; margin-top: auto;">
                      ${t('home.readFullArticle')} <ion-icon name="${document.documentElement.dir === 'rtl' ? 'arrow-back-outline' : 'arrow-forward-outline'}"></ion-icon>
                    </a>
                  </li>
                `;
              }).join('')
            : `<div class="no-content-message animate-entry" style="text-align: center; padding: 3rem 2rem; color: var(--text-secondary); font-style: italic; border: 1px dashed var(--card-border); border-radius: 1.5rem; width: 100%;">
                 <ion-icon name="document-text-outline" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></ion-icon>
                 <p style="font-size: 1rem;">${t('articles.noArticlesFound')}</p>
               </div>`
          }
        </ul>
        ${data.articles.length > 0 ? `
        <button class="action-btn-glass" data-nav-link="articles" style="margin-top: 3rem; width: 100%; border-radius: 1rem; padding: 1rem;">
          <div class="btn-glass-content" style="justify-content: center; width: 100%;">
            <span>${t('home.seeAllArticles')}</span>
            <ion-icon name="${document.documentElement.dir === 'rtl' ? 'arrow-back-outline' : 'arrow-forward-outline'}"></ion-icon>
          </div>
        </button>
        ` : ''}
      </section>

      <!-- Right Column: Career & Featured (Stacked) -->
      <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 2.5rem;">
        
        <!-- Career Aside -->
        <aside style="padding: 1.8rem; border: 1px solid var(--card-border); border-radius: 1.5rem; background: rgba(255, 255, 255, 0.02); box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05); position: relative;">
          <h3 style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 2rem; color: var(--text-primary); font-size: 1.1rem; font-weight: 700; letter-spacing: 1px; opacity: 0.8; position: relative; z-index: 1;">
            <ion-icon name="briefcase-outline" style="font-size: 1.3rem; color: var(--text-secondary);"></ion-icon> ${t('home.professionalCareer')}
          </h3>
          <style>
            .career-item { position: relative; cursor: default; }
            .career-info-card {
              position: absolute;
              bottom: 125%;
              left: 0;
              width: 280px;
              background: var(--secondary);
              border: 1px solid var(--card-border);
              padding: 1rem;
              border-radius: 1rem;
              font-size: 0.85rem;
              line-height: 1.4;
              color: var(--text-primary);
              opacity: 0;
              visibility: hidden;
              transform: translateY(10px);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              transition-delay: 0s;
              box-shadow: var(--shadow-xl);
              z-index: 9999;
              pointer-events: none;
            }
            .career-info-card::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 20px;
              border-width: 8px;
              border-style: solid;
              border-color: var(--secondary) transparent transparent transparent;
            }
            .career-item:hover .career-info-card {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
              transition-delay: 0.5s;
            }
            .career-info-meta {
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
              margin-top: 0.4rem;
              color: var(--text-secondary);
              font-size: 0.8rem;
            }
          </style>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:2rem;">
            ${[...data.professionalJourney.career].reverse().map(item => {
    const formatMonthYear = (dateStr) => {
      if (!dateStr) return t('time.present');
      const d = new Date(dateStr);
      return d.toLocaleString(t('common.locale_tag') || 'en-US', { month: 'short', year: 'numeric' });
    };
    const duration = (start, end) => {
      const startDate = new Date(start);
      const endDate = end ? new Date(end) : new Date();
      let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      let res = [];
      if (years > 0) res.push(`${years} ${t(years > 1 ? 'time.yrs' : 'time.yr')}`);
      if (remMonths > 0) res.push(`${remMonths} ${t(remMonths > 1 ? 'time.mos' : 'time.mo')}`);
      return res.join(' ');
    };
    return `
              <li class="career-item" style="display: flex; align-items: flex-start; gap: 1.2rem;">
                <div class="career-info-card">
                  <strong style="color: var(--text-primary); display: block; margin-bottom: 0.2rem; font-size: 0.9rem;">${item.company}</strong>
                  <div class="career-info-meta">
                    <span>${formatMonthYear(item.startDate)} — ${item.current ? t('time.present') : formatMonthYear(item.endDate)}</span>
                    <span style="color: var(--accent); font-weight: 600;">${duration(item.startDate, item.current ? null : item.endDate)}</span>
                  </div>
                </div>
                <img src="${getLogo(item.company)}" alt="${item.company}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex-shrink: 0; background: white;" onerror="handleImageError(this)">
                <div style="flex: 1; min-width: 0;">
                  <strong style="color: var(--text-primary); font-size: 1rem; display: block; margin-bottom: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.company}</strong>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
                    <span style="color: var(--text-secondary); font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</span>
                    <span style="color: var(--text-secondary); font-size: 0.8rem; font-family: var(--font-mono); flex-shrink: 0;">${item.startDate.slice(0, 4)} — ${item.current ? t('time.present') : (item.endDate ? item.endDate.slice(0, 4) : t('time.present'))}</span>
                  </div>
                </div>
              </li>`;
  }).join('')}
          </ul>
        </aside>

        <!-- Featured Standalone Container -->
        <section style="padding: 1.8rem; border: 1px solid var(--card-border); border-radius: 1.5rem; background: rgba(255, 255, 255, 0.02); box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);">
          <h3 style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.8rem; color: var(--text-primary); font-size: 1.1rem; font-weight: 700; letter-spacing: 1px; opacity: 0.8;">
            <ion-icon name="star-outline" style="font-size: 1.3rem; color: var(--accent);"></ion-icon> ${t('home.featured')}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1.2rem;">
            ${data.featured.map(item => `
              <div class="featured-card" style="cursor: pointer; background: var(--apple-glass-bg); border: 1px solid var(--card-border); border-radius: 1.2rem; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
                ${item.image ? `<div style="height: 110px; overflow: hidden;"><img src="${item.image}" loading="lazy" decoding="async" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" onerror="this.src='${data.avatar}'"></div>` : ''}
                <div style="padding: 1.2rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem;">
                    <ion-icon name="${item.type === 'project' ? 'code-slash-outline' : item.type === 'article' ? 'document-text-outline' : 'ribbon-outline'}" style="color: var(--accent); font-size: 0.9rem;"></ion-icon>
                    <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">${item.type}</span>
                  </div>
                  <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">${item.title}</h4>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${item.subtitle}</p>
                </div>
              </div>`).join('')}
          </div>
        </section>

      </div>
    </div>
  `;
}






export function getSectionIcon(sectionName) {
  const icons = {
    'strategicSalesLeadership': 'trending-up-outline',
    'tenderAndProcurementManagement': 'document-text-outline',
    'clientRelationsAndBusinessGrowth': 'people-outline',
    'marketIntelligenceAndOperations': 'analytics-outline',
    'operationsManagement': 'settings-outline',
    'salesExcellence': 'bar-chart-outline',
    'technicalSupport': 'headset-outline',
    'customerEngagement': 'chatbubble-outline',
    'educationHighlights': 'school-outline',
    'activitiesAndSocieties': 'people-circle-outline',
    'capstoneProject': 'rocket-outline'
  };
  return icons[sectionName] || 'checkmark-circle-outline';
}