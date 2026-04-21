import { data } from '../data.js';

export function renderNavbar() {
  const navItems = [
    { label: 'About', data: 'about' },
    { label: 'Journey', data: 'journey' },
    { label: 'Portfolio', data: 'projects' },
    { label: 'Contact', data: 'contact' }
  ];

  return `
    <nav class="navbar" id="navbar" style="position:fixed; top: 0; left: 0; right: 0; height: 100px; display:flex; justify-content:center; align-items:center; z-index: 9999; padding: 0 3rem; pointer-events: none; transition: var(--transition-smooth);">
      
      <!-- Small Profile Picture Toggle -->
      <div id="nav-avatar-container" style="position:absolute; left: 3rem; display:flex; align-items:center; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); opacity:0; pointer-events:none; transform: scale(0.8); margin-top: 1.5rem;">
        <button data-nav-link="home" style="background: transparent; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; pointer-events: auto;">
          <img src="${data.avatar}" alt="Return Home" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: none !important; box-shadow: none !important;">
        </button>
      </div>

      <!-- Liquid Glass Pill Container -->
        <div class="nav-pill-container" style="display: flex; gap: 0.5rem; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.5rem; border-radius: 999px; position: relative; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; margin-top: 1.5rem;">
          <!-- Active Selection Indicator (Pinned) -->
          <div id="nav-indicator-active" style="position: absolute; height: calc(100% - 1rem); background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 999px; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);"></div>
          
          <!-- Hover Indicator (Fluid) -->
          <div id="nav-indicator-hover" style="position: absolute; height: calc(100% - 1rem); background: rgba(255, 255, 255, 0.06); border-radius: 999px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; opacity: 0;"></div>

          <button class="nav-link" data-nav-link="about" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;">About</button>
          <button class="nav-link" data-nav-link="articles" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;">Articles</button>
          <button class="nav-link" data-nav-link="journey" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;">Journey</button>
          <button class="nav-link" data-nav-link="projects" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;">Projects</button>
          <button class="nav-link" data-nav-link="contact" style="padding: 0.8rem 1.6rem; border-radius: 999px; background:transparent; border:none; cursor:pointer; font-family:var(--font-sans); font-weight:600; font-size:0.92rem; color:var(--text-primary); transition: color 0.2s; position: relative; z-index: 1;">Contact</button>


        </div>

      <!-- Theme Toggle -->
      <button id="theme-toggle-btn" style="position:absolute; right: 3rem; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border:1px solid rgba(255, 255, 255, 0.1); cursor:pointer; font-size:1.4rem; color:var(--text-primary); width: 52px; height: 52px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; margin-top: 1.5rem;">
        <ion-icon name="moon-outline" class="dark-icon"></ion-icon>
      </button>

      <!-- Language Dropdown -->
      <div id="lang-dropdown-wrapper" style="display:flex; flex-direction:column; align-items: flex-end;">
        <button id="lang-toggle-btn" style="background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border:1px solid rgba(255, 255, 255, 0.1); cursor:pointer; color:var(--text-primary); height: 52px; padding: 0 1.2rem; display:flex; align-items:center; gap: 0.6rem; border-radius:999px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); pointer-events: auto; font-family: var(--font-sans); font-weight: 700; font-size: 0.9rem;">
          <ion-icon name="globe-outline" style="font-size: 1.2rem;"></ion-icon>
          <span id="lang-text">EN</span>
          <ion-icon name="chevron-down-outline" style="font-size: 0.8rem; opacity: 0.5;"></ion-icon>
        </button>
        
        <div id="lang-menu" style="position:absolute; top: calc(52px + 0.5rem); right: 0; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(30px) saturate(200%); -webkit-backdrop-filter: blur(30px) saturate(200%); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.6rem; border-radius: 1.2rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25); display:none; flex-direction:column; gap: 0.4rem; min-width: 160px; z-index: 10001; opacity: 0; transform: translateY(-10px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: auto;">
          
          <!-- Liquid Indicator for Dropdown -->
          <div id="lang-indicator-liquid" style="position: absolute; top: 0.6rem; left: 0.6rem; width: calc(100% - 1.2rem); height: 42px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.8rem; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; z-index: 0; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);"></div>

          <button class="lang-option active" data-lang="en" style="background:transparent; border:none; padding: 0.8rem 1rem; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap: 0.8rem; border-radius: 0.8rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; transition: all 0.3s; width: 100%; text-align: left; position: relative; z-index: 1;">
            <span style="font-size: 1.2rem;">🇺🇸</span>
            <span style="flex: 1;">English</span>
            <ion-icon name="checkmark-outline" style="font-size: 1rem; opacity: 1; color: var(--accent);"></ion-icon>
          </button>
          <button class="lang-option" data-lang="ar" style="background:transparent; border:none; padding: 0.8rem 1rem; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap: 0.8rem; border-radius: 0.8rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; transition: all 0.3s; width: 100%; text-align: left; position: relative; z-index: 1;">
            <span style="font-size: 1.2rem;">🇸🇦</span>
            <span style="flex: 1;">العربية</span>
            <ion-icon name="checkmark-outline" style="font-size: 1rem; opacity: 0; color: var(--accent);"></ion-icon>
          </button>
        </div>
      </div>
    </nav>
  `;
}