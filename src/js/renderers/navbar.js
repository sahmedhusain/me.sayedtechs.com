import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';

export function renderNavbar() {
  const data = getData();
  const navItems = [
    { label: t('nav.about'), data: 'about' },
    { label: t('nav.journey'), data: 'journey' },
    { label: t('nav.projects'), data: 'portfolio' },
    { label: t('nav.contact'), data: 'contact' }
  ];

  return `
    <nav class="navbar" id="navbar" style="position:fixed; top: 0; left: 0; right: 0; height: 100px; display:flex; justify-content:center; align-items:center; z-index: 9999; padding: 0 3rem; pointer-events: none; transition: var(--transition-smooth);">
      
      <!-- Left Side Profile Picture Toggle -->
      <div id="nav-mobile-toggle-wrapper" style="position:absolute; left: 1rem; display:flex; align-items:center; gap: 0.75rem; margin-top: 1.5rem; pointer-events: auto;">
        <button
          id="nav-mobile-toggle"
          class="nav-mobile-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="nav-mobile-tabs"
          aria-expanded="false"
          style="display:none; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border:1px solid rgba(255, 255, 255, 0.1); cursor:pointer; color:var(--text-primary); height: 52px; width: 52px; align-items:center; justify-content:center; border-radius:50%; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; padding: 0;">
          <ion-icon id="nav-mobile-toggle-icon" name="menu-outline" style="font-size: 1.45rem;"></ion-icon>
        </button>
      </div>

      <div id="nav-avatar-container" style="position:absolute; left: 3rem; display:flex; align-items:center; opacity:0; pointer-events:none; transform: scale(0.8); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 1.5rem;">
        <button data-nav-link="home" style="background: transparent; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; pointer-events: auto;">
          <img src="${data.avatar}" alt="Return Home" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: none !important; box-shadow: none !important;">
        </button>
      </div>

      <!-- Center: Liquid Glass Pill Container -->
      <div id="nav-center-wrapper" style="display: flex; align-items: center; justify-content: center; position: relative; margin-top: 1.5rem; pointer-events: auto;">
        
        <!-- Navigation Pill -->
        <div class="nav-pill-container nav-tabs-container" id="nav-mobile-tabs" style="display: flex; gap: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.5rem; border-radius: 999px; position: relative; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto;">
          <!-- Active Selection Indicator (Pinned) -->
          <div id="nav-indicator-active" style="position: absolute; height: calc(100% - 1rem); background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 999px; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);"></div>
          
          <!-- Hover Indicator (Fluid) -->
          <div id="nav-indicator-hover" style="position: absolute; height: calc(100% - 1rem); background: rgba(255, 255, 255, 0.06); border-radius: 999px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; opacity: 0;"></div>

          <!-- Mobile Modal Header -->
          <div class="nav-modal-header" style="padding: 1rem 0 0.5rem 0; margin-bottom: 0.5rem; text-align: center; display: flex; justify-content: center;">
            <h2 style="font-family: var(--font-sans); font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.3; text-align: center;">${data.name}</h2>
          </div>

          <div class="nav-tabs-list">
            <button class="nav-link" data-nav-link="about" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;"><span>${t('nav.about')}</span></button>
            <button class="nav-link" data-nav-link="articles" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;"><span>${t('nav.articles')}</span></button>
            <button class="nav-link" data-nav-link="journey" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;"><span>${t('nav.journey')}</span></button>
            <button class="nav-link" data-nav-link="portfolio" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;"><span>${t('nav.projects')}</span></button>
            <button class="nav-link" data-nav-link="contact" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;"><span>${t('nav.contact')}</span></button>
          </div>

          <!-- Mobile Modal Footer -->
          <div class="nav-modal-footer" style="margin-top: auto; padding: 1rem 0 0; display: flex; gap: 1.2rem; justify-content: center; align-items: center;">
            <a href="${data.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" style="display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; transition: color 0.3s; font-size: 1.4rem;">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a href="${data.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" style="display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; transition: color 0.3s; font-size: 1.4rem;">
              <ion-icon name="logo-github"></ion-icon>
            </a>
            <a href="${data.social.medium}" target="_blank" rel="noopener noreferrer" aria-label="Medium Blog" style="display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; transition: color 0.3s; font-size: 1.4rem;">
              <ion-icon name="logo-medium"></ion-icon>
            </a>
            <a href="${data.social.x}" target="_blank" rel="noopener noreferrer" aria-label="X Profile" style="display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; transition: color 0.3s; font-family: var(--font-sans); font-weight: bold; font-size: 1.1rem;">
              <span>𝕏</span>
            </a>
          </div>
        </div>

        <!-- Resume Button (Positioned absolutely so it doesn't affect the pill's centering) -->
        <div id="nav-resume-wrapper" style="position: absolute; left: calc(100% + 1rem); display: flex; align-items: center; white-space: nowrap;">
          <a href="${data.resumeUrl || '#'}" download="Sayed_Ahmed_Husain_CV_Solutions_Engineer.pdf" target="_blank" class="nav-resume-btn" id="nav-resume-btn" style="display:none; align-items:center; gap:0.6rem; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.8rem 1.4rem; border-radius: 999px; color: var(--text-primary); text-decoration:none; font-family: var(--font-sans); font-weight: 700; font-size: 0.85rem; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0; transform: translateX(10px);">
            <ion-icon name="download-outline" style="font-size: 1.1rem; color: var(--accent);"></ion-icon>
            <span>${t('nav.resume')}</span>
          </a>
        </div>
      </div>

      <div class="nav-controls" style="position:absolute; right: 3rem; display:flex; align-items:center; gap: 0.75rem; margin-top: 1.5rem; pointer-events: auto;">
        <!-- Language Dropdown -->
        <div id="lang-dropdown-wrapper" style="position:static; display:flex; flex-direction:column; align-items: flex-end; margin-top: 0; pointer-events: auto;">
          <button id="lang-toggle-btn" style="background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border:1px solid rgba(255, 255, 255, 0.1); cursor:pointer; color:var(--text-primary); height: 52px; width: 52px; display:flex; align-items:center; justify-content:center; border-radius:50%; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; font-family: var(--font-sans); font-weight: 700; font-size: 0.9rem;">
            <ion-icon name="globe-outline" style="font-size: 1.4rem;"></ion-icon>
          </button>
          
          <div id="lang-menu" style="position:absolute; top: calc(52px + 0.5rem); right: 0; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(30px) saturate(200%); -webkit-backdrop-filter: blur(30px) saturate(200%); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.6rem; border-radius: 1.2rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25); display:none; flex-direction:column; gap: 0.4rem; min-width: 160px; z-index: 10001; opacity: 0; transform: translateY(-10px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: auto;">
            
            <!-- Liquid Indicator for Dropdown -->
            <div id="lang-indicator-liquid" style="position: absolute; top: 0.6rem; left: 0.6rem; width: calc(100% - 1.2rem); height: 42px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.8rem; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);"></div>

            <button class="lang-option active" data-lang="en" style="background:transparent; border:none; padding: 0.8rem 1rem; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap: 0.8rem; border-radius: 0.8rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; transition: all 0.3s; width: 100%; position: relative; z-index: 1;">
              <span style="font-size: 1.2rem;">🇺🇸</span>
              <span style="flex: 1;">English</span>
              <ion-icon name="checkmark-outline" style="font-size: 1rem; opacity: 1; color: var(--accent);"></ion-icon>
            </button>
            <button class="lang-option" data-lang="ar" style="background:transparent; border:none; padding: 0.8rem 1rem; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap: 0.8rem; border-radius: 0.8rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; transition: all 0.3s; width: 100%; position: relative; z-index: 1;">
              <span style="font-size: 1.2rem;">🇸🇦</span>
              <span style="flex: 1;">العربية</span>
              <ion-icon name="checkmark-outline" style="font-size: 1rem; opacity: 0; color: var(--accent);"></ion-icon>
            </button>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button id="theme-toggle-btn" style="position: static; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border:1px solid rgba(255, 255, 255, 0.1); cursor:pointer; font-size:1.4rem; color:var(--text-primary); width: 52px; height: 52px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; margin-top: 0;">
          <ion-icon name="moon-outline" class="dark-icon"></ion-icon>
        </button>

      </div>

      <div class="nav-mobile-overlay" id="nav-mobile-overlay" aria-hidden="true"></div>
    </nav>
  `;
}

const MOBILE_NAV_BREAKPOINT_QUERY = '(max-width: 850px)';

function isMobileNavbarViewport() {
  return window.matchMedia(MOBILE_NAV_BREAKPOINT_QUERY).matches;
}

function getMobileNavbarNodes() {
  return {
    navTabsContainer: document.getElementById('nav-mobile-tabs'),
    navOverlay: document.getElementById('nav-mobile-overlay'),
    navToggleBtn: document.getElementById('nav-mobile-toggle'),
    navToggleIcon: document.getElementById('nav-mobile-toggle-icon')
  };
}

function setMobileNavbarOpenState(open) {
  const { navTabsContainer, navOverlay, navToggleBtn, navToggleIcon } = getMobileNavbarNodes();
  if (!navTabsContainer || !navOverlay || !navToggleBtn || !navToggleIcon) return;

  const isOpen = Boolean(open) && isMobileNavbarViewport();
  const navbar = document.getElementById('navbar');
  navTabsContainer.classList.toggle('is-mobile-open', isOpen);
  navOverlay.classList.toggle('is-mobile-open', isOpen);
  navToggleBtn.classList.toggle('is-mobile-open', isOpen);
  navbar?.classList.toggle('is-mobile-menu-open', isOpen);
  document.body.classList.toggle('mobile-nav-open', isOpen);
  navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggleIcon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline');
  navOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

function closeMobileNavbarMenu() {
  setMobileNavbarOpenState(false);
}

let mobileNavbarInitialized = false;

export function initializeNavbarMobileMenu() {
  if (mobileNavbarInitialized) return;
  mobileNavbarInitialized = true;

  document.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('#nav-mobile-toggle');
    if (toggleBtn) {
      const willOpen = !toggleBtn.classList.contains('is-mobile-open');
      setMobileNavbarOpenState(willOpen);
      return;
    }

    if (event.target.closest('#nav-mobile-overlay')) {
      closeMobileNavbarMenu();
      return;
    }

    if (event.target.closest('.nav-tabs-container [data-nav-link]')) {
      closeMobileNavbarMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileNavbarViewport()) {
      closeMobileNavbarMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileNavbarMenu();
    }
  });
}

initializeNavbarMobileMenu();
