import { getData } from './constants/index.js';
import { t } from './constants/i18n.js';
import { resolvePath } from './utils/paths.js';
import { generateVCard, generateQRCode } from './renderers/contact.js';
import { renderArticleDetail } from './renderers/articles.js';
import { ROUTE_PAGE_SET } from './routes.js';
import { FORM_CONFIG } from './constants/config.js';

const VALID_PAGES = ROUTE_PAGE_SET;

function getResumeUrl() {
  return resolvePath('src/assets/resume.html');
}

function waitForResumeWindowToBeReady(resumeWindow) {
  return new Promise(resolve => {
    const poll = () => {
      if (!resumeWindow || resumeWindow.closed) {
        resolve(false);
        return;
      }

      try {
        const resumeDocument = resumeWindow.document;
        const resumeName = resumeDocument.querySelector('.name')?.textContent.trim() || '';
        const resumeItems = resumeDocument.querySelectorAll('.item').length;
        const summaryText = resumeDocument.querySelector('.summary-text')?.textContent.trim() || '';
        const contentReady = resumeDocument.readyState === 'complete' && resumeName.length > 0 && (resumeItems > 0 || summaryText.length > 0);

        if (contentReady) {
          resolve(true);
          return;
        }
      } catch (error) {
        // same-origin access can lag until the page is fully loaded
      }

      setTimeout(poll, 150);
    };

    poll();
  });
}

async function openResumePrintWindow() {
  const resumeWindow = window.open(getResumeUrl(), '_blank');

  if (!resumeWindow) {
    return;
  }

  const ready = await waitForResumeWindowToBeReady(resumeWindow);
  if (!ready) {
    return;
  }

  try {
    resumeWindow.focus();

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && resumeWindow.html2pdf) {
      // Use html2pdf for mobile devices
      setTimeout(() => {
        const element = resumeWindow.document.querySelector('.resume-wrapper');
        const opt = {
          margin: 0,
          filename: 'Resume — Sayed Ahmed Husain.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { format: 'a4', orientation: 'portrait' }
        };
        resumeWindow.html2pdf().set(opt).from(element).save();
        setTimeout(() => {
          if (!resumeWindow.closed) {
            resumeWindow.close();
          }
        }, 1000);
      }, 500);
    } else {
      // Use print dialog for desktop
      resumeWindow.onafterprint = () => {
        if (!resumeWindow.closed) {
          resumeWindow.close();
        }
      };
      resumeWindow.print();
    }
  } catch (error) {
  }
}

function normalizePathname(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function computeBasePathname() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.');
  return isLocal ? '' : '/me';
}

const BASE_PATHNAME = computeBasePathname();

function getPathForPage(page) {
  if (page === 'home') {
    return BASE_PATHNAME || '/';
  }
  if (page.startsWith('articles/') || page.startsWith('projects/')) {
    return `${BASE_PATHNAME}/${page}`;
  }
  return `${BASE_PATHNAME}/${page}`;
}

export function getPageFromLocation() {
  const normalized = normalizePathname(window.location.pathname);
  const segments = normalized.split('/').filter(Boolean);

  // Check for articles/:id
  const articlesIndex = segments.indexOf('articles');
  if (articlesIndex !== -1 && segments[articlesIndex + 1]) {
    return `articles/${segments[articlesIndex + 1]}`;
  }

  // Check for projects/:id
  const projectsIndex = segments.indexOf('projects');
  if (projectsIndex !== -1 && segments[projectsIndex + 1]) {
    return `projects/${segments[projectsIndex + 1]}`;
  }

  const lastSegment = segments[segments.length - 1];

  if (lastSegment && VALID_PAGES.has(lastSegment)) {
    return lastSegment;
  }

  return 'home';
}

// Set active page function
export function setActivePage(targetPage, options = {}) {
  const { updateHistory = true, replaceHistory = false } = options;
  const navLinkButtons = document.querySelectorAll('.nav-pill-container [data-nav-link]'); // Target only top bar
  const footerLinkButtons = document.querySelectorAll('.footer [data-nav-link]'); // For content sync only
  const pages = document.querySelectorAll('[data-page]');

  let pageId = targetPage;
  let subId = null;

  if (targetPage.includes('/')) {
    const parts = targetPage.split('/');
    if (parts[0] === 'articles') {
      pageId = 'article';
      subId = parts[1];
    } else if (parts[0] === 'projects') {
      pageId = 'project';
      subId = parts[1];
    }
  }

  if (!VALID_PAGES.has(pageId)) {
    pageId = 'home';
  }

  // Overflow is now handled via CSS classes and media queries

  // If it's an article, render it
  if (pageId === 'article' && subId) {
    const content = document.getElementById('article-detail-content');
    if (content) {
      import('./renderers/articles.js').then(m => {
        content.innerHTML = m.renderArticleDetail(subId);
      });
    }
  }

  // If it's a project, render it
  if (pageId === 'project' && subId) {
    const content = document.getElementById('project-detail-content');
    if (content) {
      import('./renderers/projects.js').then(m => {
        content.innerHTML = m.renderProjectDetail(subId);
      });
    }
  }

  // Navbar avatar logic
  const navAvatar = document.getElementById('nav-avatar-container');
  const homeMainAvatar = document.getElementById('home-main-avatar');

  const updateNavAvatar = (currentPage = targetPage) => {
    if (!navAvatar) return;
    const isHome = currentPage === 'home';

    if (isHome) {
      const scrollThreshold = 10;
      if (window.scrollY > scrollThreshold) {
        navAvatar.style.opacity = '1';
        navAvatar.style.pointerEvents = 'auto';
        navAvatar.style.transform = 'scale(1)';
        if (homeMainAvatar) {
          homeMainAvatar.style.opacity = '0';
          homeMainAvatar.style.transform = 'scale(0.8) translateY(-20px)';
          homeMainAvatar.style.pointerEvents = 'none';
        }
      } else {
        navAvatar.style.opacity = '0';
        navAvatar.style.pointerEvents = 'none';
        navAvatar.style.transform = 'scale(0.8)';
        if (homeMainAvatar) {
          homeMainAvatar.style.opacity = '1';
          homeMainAvatar.style.transform = 'scale(1) translateY(0)';
          homeMainAvatar.style.pointerEvents = 'auto';
        }
      }
    } else {
      navAvatar.style.opacity = '1';
      navAvatar.style.pointerEvents = 'auto';
      navAvatar.style.transform = 'scale(1)';
    }
  };

  updateNavAvatar(pageId);
  if (!window.hasNavScrollListener) {
    window.addEventListener('scroll', () => {
      const currentActive = document.querySelector('[data-page].active');
      const activeId = currentActive ? currentActive.getAttribute('data-page') : 'home';
      updateNavAvatar(activeId);
    });
    window.hasNavScrollListener = true;
  }

  // Handle Active Classes
  document.querySelectorAll('[data-nav-link]').forEach(l => l.classList.remove('active'));
  pages.forEach(p => p.classList.remove('active'));

  // For individual articles, we highlight the 'articles' nav link
  const navLinkId = pageId === 'article' ? 'articles' : pageId;
  const activeTopBarLink = document.querySelector(`.nav-pill-container [data-nav-link="${navLinkId}"]`);
  if (activeTopBarLink) {
    activeTopBarLink.classList.add('active');
  }

  const activeFooterLink = document.querySelector(`.footer [data-nav-link="${navLinkId}"]`);
  if (activeFooterLink) activeFooterLink.classList.add('active');

  const page = document.querySelector(`[data-page="${pageId}"]`);
  if (page) {
    page.classList.add('active');
    if (pageId === 'contact') {
      document.body.classList.add('contact-active');
      page.classList.add('contact-animate');
      setTimeout(() => page.classList.remove('contact-animate'), 800);
    } else {
      document.body.classList.remove('contact-active');
    }

    // Handle Resume Button Visibility
    const resumeBtn = document.getElementById('nav-resume-btn');
    if (resumeBtn) {
      if (pageId === 'journey') {
        resumeBtn.style.display = 'flex';
        // Force reflow for transition
        resumeBtn.offsetHeight;
        resumeBtn.style.opacity = '1';
        resumeBtn.style.transform = 'translateX(0)';
      } else {
        resumeBtn.style.opacity = '0';
        resumeBtn.style.transform = 'translateX(10px)';
        setTimeout(() => {
          // Check if we didn't switch back to journey during timeout
          const currentPage = document.querySelector('[data-page].active');
          if (!currentPage || currentPage.getAttribute('data-page') !== 'journey') {
            resumeBtn.style.display = 'none';
          }
        }, 400);
      }
    }
  } else {
  }

  // Update URL using pathname routes
  if (updateHistory) {
    const newPath = getPathForPage(targetPage);
    const currentPath = normalizePathname(window.location.pathname);
    const normalizedNewPath = normalizePathname(newPath);

    if (currentPath !== normalizedNewPath) {
      if (replaceHistory) {
        history.replaceState({ page: targetPage }, '', newPath);
      } else {
        history.pushState({ page: targetPage }, '', newPath);
      }
    }
  }

  // Sync Logo State
  const nl = document.querySelector('.nav-logo');
  if (nl) {
    if (targetPage === 'home' || targetPage === 'about') nl.classList.remove('other-route');
    else nl.classList.add('other-route');
  }

  // --- Sync Indicators ---
  const activeIndicator = document.getElementById('nav-indicator-active');
  if (activeIndicator && activeTopBarLink) {
    const isMobileNav = window.matchMedia('(max-width: 850px)').matches;
    const fixedWidth = isMobileNav ? 280 : activeTopBarLink.offsetWidth;
    
    activeIndicator.style.width = `${fixedWidth}px`;
    activeIndicator.style.height = `${activeTopBarLink.offsetHeight}px`;
    activeIndicator.style.left = `${activeTopBarLink.offsetLeft + (activeTopBarLink.offsetWidth - fixedWidth) / 2}px`;
    activeIndicator.style.top = `${activeTopBarLink.offsetTop}px`;
    activeIndicator.style.opacity = targetPage === 'home' ? '0' : '1';
  } else if (activeIndicator) {
    activeIndicator.style.opacity = '0';
  }

  // Update Document Title
  const data = getData();
  const pageKey = (pageId === 'project' || pageId === 'portfolio') ? 'projects' : (pageId === 'article' ? 'articles' : pageId);
  let pageName = t('nav.' + pageKey);

  if (pageId === 'article' && subId) {
    pageName = subId;
  } else if (pageId === 'project' && subId) {
    pageName = subId;
  }

  document.title = `${data.name} | ${pageName}`;
}


// Skills Animation Functions
export function initializeSkillsAnimations() {
  // Animate stats counters
  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const targetStr = stat.getAttribute('data-target');
      const hasPlus = targetStr.includes('+');
      const target = parseInt(targetStr);
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = targetStr; // Use the original string (with + if present)
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
      }, 20);
    });
  };

  // Intersection Observer for skills section
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateStats();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe skills section
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

}


export function initializeEventListeners() {
  // Language Dropdown Logic
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langMenu = document.getElementById('lang-menu');
  const langOptions = document.querySelectorAll('.lang-option');
  const langText = document.getElementById('lang-text');

  if (langToggleBtn && langMenu) {
    const langIndicator = document.getElementById('lang-indicator-liquid');

    const moveLangIndicator = (btn) => {
      if (!langIndicator || !btn) return;
      const rect = btn.getBoundingClientRect();
      const parentRect = langMenu.getBoundingClientRect();
      langIndicator.style.width = `${rect.width}px`;
      langIndicator.style.height = `${rect.height}px`;
      langIndicator.style.left = `${rect.left - parentRect.left}px`;
      langIndicator.style.top = `${rect.top - parentRect.top}px`;
      langIndicator.style.opacity = '1';
    };

    // Initialize UI from localStorage
    const savedLang = localStorage.getItem('lang') || 'en';
    if (langText) {
      langText.textContent = savedLang === 'ar' ? 'Language' : 'اللغة';
    }
    
    // Apply direction on load
    if (savedLang === 'ar') {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }

    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === savedLang) {
        opt.classList.add('active');
        opt.querySelector('ion-icon').style.opacity = '1';
      } else {
        opt.classList.remove('active');
        opt.querySelector('ion-icon').style.opacity = '0';
      }
    });

    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = langMenu.style.display === 'flex';

      if (!isVisible) {
        langMenu.style.display = 'flex';
        // Position indicator on active initially
        const activeOption = langMenu.querySelector('.lang-option.active');
        if (activeOption) moveLangIndicator(activeOption);

        setTimeout(() => {
          langMenu.style.opacity = '1';
          langMenu.style.transform = 'translateY(0)';
        }, 10);
      } else {
        langMenu.style.opacity = '0';
        langMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          langMenu.style.display = 'none';
        }, 400);
      }
    });

    langOptions.forEach(option => {
      option.addEventListener('mouseenter', () => moveLangIndicator(option));

      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');

        // 1. Show premium loader immediately
        const showLoader = () => {
          let loader = document.getElementById('lang-loader');
          if (!loader) {
            loader = document.createElement('div');
            loader.id = 'lang-loader';
            loader.className = 'lang-loader-overlay';
            loader.innerHTML = `
              <div class="lang-loader-content">
                <div class="lang-loader-spinner"></div>
                <div class="lang-loader-text" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">${lang === 'ar' ? 'جاري تغيير اللغة...' : 'Changing language...'}</div>
              </div>
            `;
            document.body.appendChild(loader);
          }

          // Trigger layout changes only AFTER loader starts appearing to prevent flicker
          setTimeout(() => {
            loader.classList.add('active');
            
            // Hide menu
            langMenu.style.opacity = '0';
            langMenu.style.transform = 'translateY(-10px)';

            // Trigger exit animation on app
            const app = document.getElementById('app');
            if (app) app.classList.add('page-exit-active');

            setTimeout(() => {
              // Update storage and reload
              localStorage.setItem('lang', lang);
              window.location.reload();
            }, 800);
          }, 10);
        };

        showLoader();
      });
    });

    langMenu.addEventListener('mouseleave', () => {
      const activeOption = langMenu.querySelector('.lang-option.active');
      if (activeOption) moveLangIndicator(activeOption);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (langToggleBtn && !langToggleBtn.contains(e.target) && langMenu && !langMenu.contains(e.target)) {
        langMenu.style.opacity = '0';
        langMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          langMenu.style.display = 'none';
        }, 400);
      }
    });
  }

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const icon = themeToggleBtn?.querySelector('ion-icon');

  // Helper to apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (icon) icon.setAttribute('name', 'sunny-outline');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (icon) icon.setAttribute('name', 'moon-outline');
    }
  };

  // 1. Initial Theme Detection with 'light' as absolute default
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Detect System Preference, fallback to light
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // Listen for system theme changes if no manual override exists
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- Automatic Language & Location Detection ---
  const detectPreferences = async () => {
    try {
      // Helper for safe storage
      const safeSetItem = (key, val) => {
        try { localStorage.setItem(key, val); } catch (e) { return false; }
        return true;
      };

      // 1. Language Detection (Default: English)
      if (!localStorage.getItem('lang')) {
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.startsWith('ar')) {
          if (safeSetItem('lang', 'ar')) {
            window.location.reload(); 
            return;
          }
        }
        safeSetItem('lang', 'en');
      }

      // 2. Location & Country Code Detection (Waterfall Strategy)
      const updateCountryUI = (code) => {
        if (!code) return false;
        const cleanCode = code.startsWith('+') ? code : `+${code}`;
        
        const applyToDOM = () => {
          const countrySelector = document.getElementById('countryCodeInput');
          const countryItem = document.querySelector(`.country-item[data-country-code="${cleanCode}"]`);
          
          if (countrySelector && countryItem) {
            const flag = countryItem.getAttribute('data-country-flag');
            const selectedFlag = document.querySelector('.selected-flag');
            const selectedCode = document.querySelector('.selected-code');
            
            if (selectedFlag) selectedFlag.textContent = flag;
            if (selectedCode) selectedCode.textContent = cleanCode;
            countrySelector.value = cleanCode;
            
            document.querySelectorAll('.country-item').forEach(li => {
              li.classList.remove('active');
              const tick = li.querySelector('.selection-tick');
              if (tick) tick.style.opacity = '0';
            });
            countryItem.classList.add('active');
            const activeTick = countryItem.querySelector('.selection-tick');
            if (activeTick) activeTick.style.opacity = '1';
            return true;
          }
          return false;
        };

        // Try immediately, then retry a few times
        if (!applyToDOM()) {
          let attempts = 0;
          const interval = setInterval(() => {
            if (applyToDOM() || attempts > 15) clearInterval(interval);
            attempts++;
          }, 200);
        }
        return true;
      };

      const providers = [
        { url: 'https://ipinfo.io/json', key: 'country' }, // Most reliable
        { url: 'https://ipapi.co/json/', key: 'country_calling_code' },
        { url: 'https://ipwho.is/', key: 'calling_code' },
        { url: 'https://freeipapi.com/api/json', key: 'callingCode' }
      ];

      for (const provider of providers) {
        try {
          let fetchOptions = {};
          if (window.AbortController) {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 3000);
            fetchOptions.signal = controller.signal;
          }
          
          const response = await fetch(provider.url, fetchOptions);
          if (response.ok) {
            const data = await response.json();
            // Handle different provider keys
            let code = data[provider.key];
            if (provider.url.includes('ipinfo.io')) {
                // ipinfo returns country code, we need to map it or just use it as is if updateCountryUI handles it
                // Actually updateCountryUI expects a calling code like +973
                // I'll skip ipinfo if I don't have a mapping, or just use the others.
                // Wait, I'll stick to calling code providers or fix mapping.
            }
            if (code && updateCountryUI(code)) break;
          }
        } catch (e) {
          // Continue to next provider on fail
        }
      }
    } catch (globalErr) {
      // Silent fail to ensure app stays up
    }
  };

  // Run detection asynchronously so it never blocks the main UI thread
  setTimeout(() => {
    try {
      detectPreferences();
    } catch (e) {}
  }, 100);

  // --- Generic View Toggle Logic (List vs Grid) ---
  const updatePillIndicator = (btn, indicatorClass = '.pill-indicator', opacity = 1) => {
    const container = btn.closest('.navbar-style-pill');
    if (!container) return;
    const indicator = container.querySelector(indicatorClass);
    if (indicator) {
      indicator.style.width = `${btn.offsetWidth}px`;
      indicator.style.height = `${btn.offsetHeight}px`;
      indicator.style.left = `${btn.offsetLeft}px`;
      indicator.style.top = `${btn.offsetTop}px`;
      indicator.style.opacity = opacity;
    }
  };

  const updateSidebarIndicator = (btn, indicatorClass = '.sidebar-indicator-active', opacity = 1) => {
    const container = btn.closest('.section-sidebar-list');
    if (!container) return;
    const indicator = container.querySelector(indicatorClass);
    if (indicator) {
      const isMobile = window.innerWidth <= 768;
      const fixedWidth = isMobile ? 220 : 270;
      
      indicator.style.width = `${fixedWidth}px`;
      indicator.style.height = `${btn.offsetHeight}px`;
      indicator.style.left = `${btn.offsetLeft + (btn.offsetWidth - fixedWidth) / 2}px`;
      indicator.style.top = `${btn.offsetTop}px`;
      indicator.style.opacity = opacity;
    }
  };

  const pillBtns = document.querySelectorAll('.pill-btn');
  pillBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
      if (!this.classList.contains('active')) {
        updatePillIndicator(this, '.pill-indicator-hover', 1);
      }
    });

    btn.addEventListener('mouseleave', function () {
      const container = this.closest('.navbar-style-pill');
      const hoverIndicator = container ? container.querySelector('.pill-indicator-hover') : null;
      if (hoverIndicator) hoverIndicator.style.opacity = '0';
    });
  });


  // --- Generic Sidebar Tab Logic ---
  const sidebarBtns = document.querySelectorAll('.section-sidebar-btn');

  if (sidebarBtns.length > 0) {
    sidebarBtns.forEach(btn => {
      btn.addEventListener('mouseenter', function () {
        if (!this.classList.contains('active')) {
          updateSidebarIndicator(this, '.sidebar-indicator-hover', 1);
        }
      });

      btn.addEventListener('mouseleave', function () {
        const container = this.closest('.section-sidebar-list');
        const hoverIndicator = container ? container.querySelector('.sidebar-indicator-hover') : null;
        if (hoverIndicator) hoverIndicator.style.opacity = '0';
      });

      btn.addEventListener('click', () => {
        const group = btn.getAttribute('data-tab-group'); // e.g., 'exp', 'edu'
        const index = btn.getAttribute('data-tab-index'); // e.g., '0', '1'

        // 1. Deactivate all buttons in this specific sidebar group
        const groupSidebarBtns = document.querySelectorAll(`.section-sidebar-btn[data-tab-group="${group}"]`);
        groupSidebarBtns.forEach(b => b.classList.remove('active'));

        // 2. Activate clicked button
        btn.classList.add('active');
        updateSidebarIndicator(btn);

        // Hide hover indicator on click
        const hoverIndicator = btn.closest('.section-sidebar-list').querySelector('.sidebar-indicator-hover');
        if (hoverIndicator) hoverIndicator.style.opacity = '0';

        // 3. Switch Panel
        // First hide all panels in this group
        // We find the parent wrapper's content area, then the panels
        const container = document.getElementById(`${group}-grid-view`);
        const panels = container.querySelectorAll('.section-tab-panel');
        panels.forEach(p => p.classList.remove('active'));

        // Show target panel
        const targetPanel = document.getElementById(`${group}-panel-${index}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
  // Define allItems to match the rendering order
  const data = getData();
  const allItems = [
    ...data.professionalJourney.education.map(item => ({ ...item, category: 'education' })),
    ...data.professionalJourney.internships.map(item => ({ ...item, category: 'internships' })),
    ...data.professionalJourney.career.map(item => ({ ...item, category: 'career' })),
    ...data.professionalJourney.certifications.map(item => ({ ...item, category: 'certifications', startDate: item.date, endDate: null }))
  ];
  // Download CV button
  const downloadCVBtn = document.getElementById('download-cv-btn');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
      window.open(data.cvUrl, '_blank');
    });
  }

  // View Contact button - show modal
  const viewContactBtn = document.getElementById('view-contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  if (viewContactBtn && contactModal) {
    viewContactBtn.addEventListener('click', () => {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      generateQRCode();
    });
  }

  // Image Preview Modal Logic
  // Image Preview Modal Logic
  const avatars = document.querySelectorAll('.avatar-box, .contact-avatar, .nav-avatar img');
  const imageModal = document.getElementById('image-modal');
  const imageModalClose = document.getElementById('image-modal-close');
  const imageModalOverlay = document.getElementById('image-modal-overlay');

  if (avatars.length > 0 && imageModal) {
    avatars.forEach(avatar => {
      // Add cursor pointer
      avatar.style.cursor = 'zoom-in';

      avatar.addEventListener('click', (e) => {
        // Stop propagation if inside another clickable element
        e.stopPropagation();

        // Update modal image source to match clicked image
        const imgSource = avatar.tagName === 'IMG' ? avatar.src : avatar.querySelector('img').src;
        const modalImg = imageModal.querySelector('.image-modal-img');
        if (modalImg) modalImg.src = imgSource;

        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeImageModal = () => {
      imageModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
    if (imageModalOverlay) imageModalOverlay.addEventListener('click', closeImageModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
      }
    });
  }

  // Close modal
  [modalOverlay, modalClose].forEach(element => {
    if (element) {
      element.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // Download vCard
  const downloadVCardBtn = document.getElementById('download-vcard-btn');
  if (downloadVCardBtn) {
    downloadVCardBtn.addEventListener('click', async () => {
      const vCard = await generateVCard();
      const blob = new Blob([vCard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getData().vCardUrl.split('/').pop() || 'contact.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  const resumeBtn = document.getElementById('nav-resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await openResumePrintWindow();
    });
  }

  // Copy vCard
  const copyVCardBtn = document.getElementById('copy-vcard-btn');
  if (copyVCardBtn) {
    copyVCardBtn.addEventListener('click', async () => {
      try {
        const vCard = await generateVCard();
        await navigator.clipboard.writeText(vCard);
        const originalText = copyVCardBtn.querySelector('span').textContent;
        copyVCardBtn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => {
          copyVCardBtn.querySelector('span').textContent = originalText;
        }, 2000);
      } catch (err) {
      }
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Navbar navigation and internal links with event delegation
  document.addEventListener('click', (e) => {
    // Intercept internal jump links (e.g., Portfolio skills/projects)
    const anchorLink = e.target.closest('a[href^="#"]');
    if (anchorLink) {
      e.preventDefault();
      const targetId = anchorLink.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 120;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      return;
    }

    const link = e.target.closest('[data-nav-link]');
    if (!link) return;

    e.preventDefault();
    const targetPage = link.getAttribute('data-nav-link');
    const isHome = document.querySelector('[data-page="home"].active');

    if (targetPage === 'home' && isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Reset scroll position before switching page to ensure avatar logic triggers correctly
      window.scrollTo(0, 0);
      setActivePage(targetPage, { updateHistory: true });
    }

    if (navToggle && navLinks) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // --- Liquid Nav Movement (Dual Layer: Active & Hover) ---
  const activeIndicator = document.getElementById('nav-indicator-active');
  const hoverIndicator = document.getElementById('nav-indicator-hover');
  const navContainer = document.querySelector('.nav-pill-container');

  if (navContainer) {
    const moveIndicator = (indicator, target, opacity = 1) => {
      if (!indicator || !target) return;
      
      const isMobileNav = window.matchMedia('(max-width: 850px)').matches;
      const fixedWidth = isMobileNav ? 280 : target.offsetWidth;
      
      indicator.style.width = `${fixedWidth}px`;
      indicator.style.height = `${target.offsetHeight}px`;
      indicator.style.left = `${target.offsetLeft + (target.offsetWidth - fixedWidth) / 2}px`;
      indicator.style.top = `${target.offsetTop}px`;
      indicator.style.opacity = opacity;
    };

    // Initialize Active Indicator
    const activeLink = document.querySelector('.nav-link.active') || document.querySelector('[data-nav-link="about"]');
    if (activeLink) moveIndicator(activeIndicator, activeLink);

    const topNavButtons = document.querySelectorAll('.nav-pill-container [data-nav-link]');
    topNavButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const isHome = btn.getAttribute('data-nav-link') === 'home';
        const isActive = btn.classList.contains('active');

        if (!isHome && !isActive) {
          moveIndicator(hoverIndicator, btn, 1);
        } else {
          hoverIndicator.style.opacity = '0';
        }
      });

      btn.addEventListener('click', () => {
        const isHome = btn.getAttribute('data-nav-link') === 'home';
        if (!isHome) {
          moveIndicator(activeIndicator, btn, 1);
          hoverIndicator.style.opacity = '0';
        } else {
          activeIndicator.style.opacity = '0';
        }
      });
    });

    navContainer.addEventListener('mouseleave', () => {
      hoverIndicator.style.opacity = '0';
    });
  }

  // Backward compatibility: convert old hash URLs (e.g. #about) to pathname routes.
  const legacyHashPage = window.location.hash.substring(1);
  if (VALID_PAGES.has(legacyHashPage)) {
    history.replaceState({ page: legacyHashPage }, '', getPathForPage(legacyHashPage));
  }

  // Handle initial pathname route.
  setActivePage(getPageFromLocation(), { updateHistory: false });

  // Click on nav-logo to go to Home
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      setActivePage('home', { updateHistory: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Close mobile menu
      if (navToggle && navLinks) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Handle browser back/forward buttons (pathname-based)
  window.addEventListener('popstate', () => {
    setActivePage(getPageFromLocation(), { updateHistory: false });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabIndex = this.getAttribute('data-tab');

      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      this.classList.add('active');
      const panel = document.getElementById(`panel-${tabIndex}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Project filters - Using event delegation for robustness
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-filter-btn]');
    if (!btn) return;

    const filter = btn.getAttribute('data-filter-btn');
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    const filterItems = document.querySelectorAll('[data-filter-item]');

    // Remove active from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update liquid indicator
    if (typeof updatePillIndicator === 'function') {
      updatePillIndicator(btn);
    }
    
    // Hide hover indicator on click
    const container = btn.closest('.navbar-style-pill');
    if (container) {
      const hoverIndicator = container.querySelector('.pill-indicator-hover');
      if (hoverIndicator) hoverIndicator.style.opacity = '0';
    }

    // Filter items with a smooth fade effect
    filterItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (filter === 'all' || itemCategory === filter) {
        item.style.display = 'flex';
        setTimeout(() => {
          item.classList.add('active');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 10);
      } else {
        item.classList.remove('active');
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });

  // Journey Timeline filters
  const journeyFilterBtns = document.querySelectorAll('.journey-filters .pill-btn');
  const timelineChartContainer = document.querySelector('.timeline-chart-container');

  if (journeyFilterBtns.length > 0 && timelineChartContainer) {
    journeyFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        journeyFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        updatePillIndicator(this);

        // Hide hover indicator on click
        const hoverIndicator = this.closest('.navbar-style-pill').querySelector('.pill-indicator-hover');
        if (hoverIndicator) hoverIndicator.style.opacity = '0';

        if (window.generateTimelineSVG) {
          timelineChartContainer.innerHTML = window.generateTimelineSVG(filter);
        }

        // Global page filtering for experience sections
        const expSections = document.querySelectorAll('.journey-section-wrapper');
        const filterMap = {
          'career': 'exp',
          'internships': 'intern',
          'education': 'edu',
          'certifications': 'cert'
        };

        expSections.forEach(section => {
          if (filter === 'all') {
            section.style.display = 'block';
            section.style.opacity = '0';
            setTimeout(() => {
              section.style.transition = 'opacity 0.4s ease';
              section.style.opacity = '1';
            }, 10);
          } else {
            const sectionType = section.getAttribute('data-journey-section');
            if (sectionType === filterMap[filter]) {
              section.style.display = 'block';
              section.style.opacity = '0';
              setTimeout(() => {
                section.style.transition = 'opacity 0.4s ease';
                section.style.opacity = '1';
              }, 10);
            } else {
              section.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Global initial pill positioner
  setTimeout(() => {
    document.querySelectorAll('.navbar-style-pill').forEach(pill => {
      const activeBtn = pill.querySelector('.pill-btn.active');
      if (activeBtn) updatePillIndicator(activeBtn);
    });

    document.querySelectorAll('.section-sidebar-list').forEach(sidebar => {
      const activeBtn = sidebar.querySelector('.section-sidebar-btn.active');
      if (activeBtn) updateSidebarIndicator(activeBtn);
    });
  }, 500);

  // Handle anchor links in README (Table of Contents) smoothly without breaking SPA
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Read more button for projects
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more-btn') || e.target.closest('.read-more-btn')) {
      const btn = e.target.classList.contains('read-more-btn') ? e.target : e.target.closest('.read-more-btn');
      const projectItem = btn.closest('.project-item');
      if (projectItem) {
        projectItem.classList.toggle('expanded');
        const icon = btn.querySelector('ion-icon');
        const text = btn.textContent.trim();
        if (projectItem.classList.contains('expanded')) {
          icon.name = 'chevron-up-outline';
          btn.innerHTML = '<span>Hide</span> <ion-icon name="chevron-up-outline"></ion-icon>';
        } else {
          icon.name = 'chevron-down-outline';
          btn.innerHTML = '<span>Read</span> <ion-icon name="chevron-down-outline"></ion-icon>';
        }
      }
    }
  });

  // Form validation and submission
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  if (form && formBtn) {
    // Form validation
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute('disabled');
        } else {
          formBtn.setAttribute('disabled', '');
        }
      });
    });

    // Form submission with EmailJS
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formMessage = document.getElementById('form-message');
      const submitBtn = formBtn.querySelector('.btn-text');
      const originalBtnText = submitBtn.textContent;

      // Show loading state
      submitBtn.innerHTML = 'Sending... <span class="loading-spinner"></span>';
      formBtn.setAttribute('disabled', '');

      // Get form data
      const formData = new FormData(form);

      // Create timestamp
      const now = new Date();
      const timestamp = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const data = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        countryCode: formData.get('countryCode') || '',
        phone: formData.get('phone') || 'Not provided',
        message: formData.get('message'),
        time: timestamp
      };

      try {
        const { emailjs: emailConfig, web3forms: web3Config } = FORM_CONFIG;

        // Send email using EmailJS
        const emailPromise = emailjs.send(emailConfig.serviceID, emailConfig.templateID, data, emailConfig.publicKey);

        // Send to Web3Forms for data logging
        const web3FormData = new FormData(form);
        web3FormData.append("access_key", web3Config.accessKey);
        web3FormData.append("subject", `New Contact from Portfolio: ${data.fullname}`);
        
        const web3Promise = fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: web3FormData
        });

        // Wait for both to complete
        const [emailResponse] = await Promise.all([emailPromise, web3Promise]);

        // Success
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        form.reset();
        formBtn.setAttribute('disabled', '');

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = '';
        }, 5000);

      } catch (error) {
        // Error
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = '';
        }, 5000);
      } finally {
        // Reset button
        submitBtn.textContent = originalBtnText;
        formBtn.removeAttribute('disabled');
      }
    });
  }

  // Custom Country Selector Logic
  const countryTrigger = document.getElementById('country-selector-trigger');
  if (countryTrigger) {
    const dropdown = countryTrigger.querySelector('.country-dropdown-glass');
    const indicator = countryTrigger.querySelector('.country-dropdown-indicator');
    const items = countryTrigger.querySelectorAll('.country-item');
    const flagEl = countryTrigger.querySelector('.selected-flag');
    const codeEl = countryTrigger.querySelector('.selected-code');
    const hiddenInput = document.getElementById('countryCodeInput');

    const moveIndicator = (target) => {
      if (!indicator || !target) return;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();
      indicator.style.height = `${rect.height}px`;
      indicator.style.top = `${target.offsetTop}px`;
      indicator.style.opacity = '1';
    };

    countryTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = countryTrigger.classList.toggle('active');
      const wrapper = countryTrigger.closest('.input-glass-wrapper');

      // Clear other active wrappers/dropdowns first
      document.querySelectorAll('.input-glass-wrapper').forEach(w => w.classList.remove('active-dropdown'));
      document.querySelectorAll('.custom-country-selector').forEach(s => {
        if (s !== countryTrigger) s.classList.remove('active');
      });

      if (isActive) {
        if (wrapper) wrapper.classList.add('active-dropdown');
        const activeItem = countryTrigger.querySelector('.country-item.active');
        if (activeItem) {
          moveIndicator(activeItem);
          activeItem.scrollIntoView({ block: 'nearest' });
        }
      }
    });


    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = item.getAttribute('data-country-code');
        const flag = item.querySelector('.country-flag').textContent;

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        flagEl.textContent = flag;
        codeEl.textContent = code;
        hiddenInput.value = code;

        // Update tick visibility
        items.forEach(i => {
          const tick = i.querySelector('.selection-tick');
          if (tick) tick.style.opacity = i === item ? '1' : '0';
        });

        moveIndicator(item);

        setTimeout(() => countryTrigger.classList.remove('active'), 150);
      });

      item.addEventListener('mouseenter', () => moveIndicator(item));
    });

    const listScroll = countryTrigger.querySelector('.country-list-scroll');
    
    document.addEventListener('click', (e) => {
      if (!countryTrigger.contains(e.target)) {
        countryTrigger.classList.remove('active');
        const wrapper = countryTrigger.closest('.input-glass-wrapper');
        if (wrapper) wrapper.classList.remove('active-dropdown');
      }
    });

    listScroll.addEventListener('mouseleave', () => {
      const activeItem = countryTrigger.querySelector('.country-item.active');
      if (activeItem) moveIndicator(activeItem);
    });

    const searchInput = document.getElementById('countrySearch');
    if (searchInput) {
      searchInput.addEventListener('click', (e) => e.stopPropagation());
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        items.forEach(item => {
          const name = item.querySelector('.country-name-val').textContent.toLowerCase();
          const nameEn = item.getAttribute('data-country-name-en') || '';
          const nameAr = item.getAttribute('data-country-name-ar') || '';
          const code = item.getAttribute('data-country-code').toLowerCase();
          if (name.includes(term) || nameEn.includes(term) || nameAr.includes(term) || code.includes(term)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
        // Reset indicator on search
        indicator.style.opacity = '0';
      });
    }
  }

  // Project item expansion
  // Removed

  // Sidebar contact buttons hover effect
  const leftHoverText = document.getElementById('left-hover-text');
  const rightHoverText = document.getElementById('right-hover-text');
  const sideElements = document.querySelectorAll('.side-element a');
  sideElements.forEach(a => {
    const text = a.querySelector('.sr-only').textContent;
    const isLeft = a.closest('.side-left');
    const hoverText = isLeft ? leftHoverText : rightHoverText;
    a.addEventListener('mouseenter', () => {
      hoverText.textContent = text;
      hoverText.style.opacity = '1';
      // Move previous siblings up
      let sibling = a.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === 'A') {
          sibling.style.transform = 'translateY(-10px)';
        }
        sibling = sibling.previousElementSibling;
      }
      // Move hovered button up
      a.style.transform = 'translateY(-10px)';
    });
    a.addEventListener('mouseleave', () => {
      hoverText.style.opacity = '0';
      // Reset all transforms
      const allSiblings = a.parentElement.querySelectorAll('a');
      allSiblings.forEach(sib => {
        sib.style.transform = '';
      });
    });
  });

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Articles Filtering Logic ---
  const articleTabs = document.querySelectorAll('.article-tab');
  const articleCards = document.querySelectorAll('.article-card');

  if (articleTabs.length > 0) {
    articleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Update active tab
        articleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards with animation
        let visibleCount = 0;
        articleCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            visibleCount++;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        // Show/hide no articles message
        const noArticlesMsg = document.getElementById('noArticlesMessage');
        if (noArticlesMsg) {
          noArticlesMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  // --- Articles Search Logic ---
  const articleSearch = document.getElementById('articleSearch');
  if (articleSearch) {
    articleSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      let visibleCount = 0;
      articleCards.forEach(card => {
        const titleText = card.querySelector('.article-title-link').textContent.toLowerCase();
        const descText = card.querySelector('.article-desc').textContent.toLowerCase();
        const titleEn = card.getAttribute('data-title-en') || '';
        const descEn = card.getAttribute('data-desc-en') || '';
        const titleAr = card.getAttribute('data-title-ar') || '';
        const descAr = card.getAttribute('data-desc-ar') || '';

        if (titleText.includes(query) || descText.includes(query) || 
            titleEn.includes(query) || descEn.includes(query) ||
            titleAr.includes(query) || descAr.includes(query)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          visibleCount++;
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });

      // Show/hide no articles message
      const noArticlesMsg = document.getElementById('noArticlesMessage');
      if (noArticlesMsg) {
        noArticlesMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // --- Timeline Click-to-View Logic ---
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.timeline-item-trigger');

    // Remove existing tooltips first
    const existingTooltip = document.querySelector('.timeline-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
      if (trigger && trigger._hasTooltip) {
        trigger._hasTooltip = false;
        return;
      }
    }

    document.querySelectorAll('.timeline-item-trigger').forEach(el => el._hasTooltip = false);

    if (trigger) {
      const title = trigger.getAttribute('data-title');
      const subtitle = trigger.getAttribute('data-subtitle');
      const date = trigger.getAttribute('data-date');

      const tooltip = document.createElement('div');
      tooltip.className = 'timeline-tooltip';
      tooltip.dir = document.documentElement.dir || 'ltr';
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const separatorColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

      tooltip.innerHTML = `
        <div class="tooltip-content" style="pointer-events: none;">
          <h4 class="tooltip-title" style="margin: 0; font-size: 1.1rem; color: var(--text-primary); font-weight: 800; letter-spacing: -0.01em;">${title}</h4>
          <p class="tooltip-subtitle" style="margin: 0.4rem 0 0.8rem; font-size: 0.95rem; color: var(--text-secondary); opacity: 0.9; font-weight: 500; line-height: 1.4;">${subtitle}</p>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.5rem; padding-top: 0.8rem; border-top: 1px solid ${separatorColor};">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent);"></span>
            <span class="tooltip-date" style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); opacity: 0.8; font-family: var(--font-mono);">${date}</span>
          </div>
        </div>
      `;

      document.body.appendChild(tooltip);

      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      let top = rect.top + window.scrollY - tooltipRect.height - 15;

      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.pointerEvents = 'none';

      trigger._hasTooltip = true;
    }
  });
}

