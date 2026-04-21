import { data } from '../data.js';

export function renderFooter() {
  return `
    <footer style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 3rem; margin: 2rem auto 1.5rem; background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px; width: calc(100% - 3rem); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); flex-wrap: wrap; gap: 1.5rem;">
      <style>
        .footer-nav-btn {
          background: none !important;
          border: none;
          color: var(--text-secondary);
          font-family: inherit;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.5rem 0.8rem;
          border-radius: 999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: none !important;
        }
        .footer-nav-btn:hover,
        .footer-nav-btn.active {
          color: var(--text-primary);
          background: transparent !important;
          transform: translateY(-2px);
          box-shadow: none !important;
        }
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
      <div class="footer-nav" style="display: flex; gap: 1.8rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.95rem;">
        <button data-nav-link="home" class="footer-nav-btn">Home</button>
        <button data-nav-link="about" class="footer-nav-btn">About</button>



      </div>

      <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0; font-family: var(--font-sans); font-weight: 500;">
        © 2026 <a href="${data.contact.github}" target="_blank" class="footer-copyright-link">${data.name}</a>. All rights reserved.
      </p>
    </footer>
  `;
}

export function renderSideElements() {
  return `
    <div class="side-element side-left">
      <div class="hover-text" id="left-hover-text"></div>
      <a href="tel:${data.contact.phone}" title="Phone">
        <ion-icon name="call-outline"></ion-icon>
        <span class="sr-only">Call me!</span>
      </a>
      <a href="mailto:${data.contact.email}" title="Email">
        <ion-icon name="mail-outline"></ion-icon>
        <span class="sr-only">Let's touch!</span>
      </a>
      <a href="${data.contact.linkedin}" target="_blank" title="LinkedIn">
        <ion-icon name="logo-linkedin"></ion-icon>
        <span class="sr-only">Connect!</span>
      </a>
    </div>
    <div class="side-element side-right">
      <div class="hover-text" id="right-hover-text"></div>
      <a href="https://wa.me/${data.contact.phone.replace(/[^0-9]/g, '')}" target="_blank" title="WhatsApp">
        <ion-icon name="logo-whatsapp"></ion-icon>
        <span class="sr-only">Chat now!</span>
      </a>
      <a href="${data.contact.github}" target="_blank" title="GitHub">
        <ion-icon name="logo-github"></ion-icon>
        <span class="sr-only">Code here!</span>
      </a>
      <a href="https://medium.com/@s97ahm" target="_blank" title="Medium">
        <ion-icon name="logo-medium"></ion-icon>
        <span class="sr-only">Read me!</span>
      </a>
      <a href="${data.contact.twitter}" target="_blank" title="X" class="x-logo">
        <span>𝕏</span>
        <span class="sr-only">Follow me!</span>
      </a>
      <a href="${data.contact.discord}" target="_blank" title="Discord" class="discord-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.077.077 0 0 0-.082.038c-.357.63-.755 1.453-1.037 2.104a18.524 18.524 0 0 0-5.53 0 12.76 12.76 0 0 0-1.05-2.104.077.077 0 0 0-.082-.038A19.736 19.736 0 0 0 3.684 4.369a.069.069 0 0 0-.03.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.507 6.23 3.13a.077.077 0 0 0 .084-.027c.48-.66.908-1.356 1.273-2.084a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.57-1.938-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.073.073 0 0 1 .078.009c.124.104.254.206.384.304a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.94.936.076.076 0 0 0-.04.105c.366.728.794 1.423 1.272 2.084a.076.076 0 0 0 .084.028c2.037-.623 4.104-1.565 6.23-3.13a.077.077 0 0 0 .031-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" fill="currentColor"/>
        </svg>
        <span class="sr-only">Hello world!</span>
      </a>
    </div>
  `;
}

export function renderImagePreviewModal() {
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
