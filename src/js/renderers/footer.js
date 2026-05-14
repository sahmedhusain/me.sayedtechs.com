import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';

export function renderFooter() {
  const data = getData();
  return `
    <footer style="text-align: center; padding: 2rem 0; width: 100%; margin-top: 2rem;">
      <style>
        .footer-copyright-link {
          color: inherit;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-copyright-link:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }
      </style>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0; font-family: var(--font-sans); font-weight: 500;">
        © 2026 <a href="${data.contact.github}" target="_blank" class="footer-copyright-link">${data.name}</a>. ${t('footer.allRightsReserved')}
      </p>
    </footer>
  `;
}



export function renderImagePreviewModal() {
  const data = getData();
  return `
    <div class="image-modal" id="image-modal">
      <div class="overlay" id="image-modal-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%;"></div>
      <button class="image-modal-close" id="image-modal-close">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <div class="image-modal-content">
        <img src="${data.avatar}" alt="${data.name}" class="image-modal-img">
      </div>
    </div>
  `;
}
