import { data } from '../data.js';

export function renderNavbar() {
  const navItems = [
    { label: 'About', data: 'about' },
    { label: 'Journey', data: 'journey' },
    { label: 'Portfolio', data: 'projects' },
    { label: 'Contact', data: 'contact' }
  ];

  return `
    <nav class="navbar" id="navbar">
      <div class="nav-logo">
        <img src="${data.avatar}" alt="Avatar" class="nav-avatar" loading="lazy">
        <span class="full-name">WELCOME!</span>
        <span class="short-name">SAYED</span>
      </div>
      <button class="nav-toggle" id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        ${navItems.map((item, i) => `
          <li>
            <button class="nav-link ${i === 0 ? 'active' : ''}" data-nav-link="${item.data}">
              ${item.label}
            </button>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}