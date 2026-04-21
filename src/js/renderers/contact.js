import { data } from '../data.js';
import { countryCodes } from '../data/countries.js';

export function renderContactSection() {

  const countryOptions = countryCodes.map(item =>
    `<option value="${item.code}" ${item.code === '+973' ? 'selected' : ''}>${item.flag} ${item.code} (${item.country})</option>`
  ).join('');

  const activeCountry = countryCodes.find(c => c.code === '+973') || countryCodes[0];
  
  const countryListItems = countryCodes.map(item => `
    <li class="country-item ${item.code === activeCountry.code ? 'active' : ''}" 
        data-country-code="${item.code}"
        data-country-flag="${item.flag}"
        data-country-name="${item.country}">
      <span class="country-flag">${item.flag}</span>
      <span class="country-code-val">${item.code}</span>
      <span class="country-name-val" style="flex: 1;">${item.country}</span>
      <ion-icon name="checkmark-outline" class="selection-tick" style="font-size: 0.9rem; opacity: ${item.code === activeCountry.code ? '1' : '0'}; color: var(--accent);"></ion-icon>
    </li>
  `).join('');


  return `
    <header class="section-header-glass">
      <div class="header-left">
        <p class="section-label">Reach out 🕊️</p>
        <p class="section-subtitle">Let's build something beautiful together.</p>
      </div>
      <button class="action-btn-glass" id="view-contact-btn">
        <div class="btn-glass-content">
          <ion-icon name="person-outline"></ion-icon>
          <span>Business Card</span>
        </div>
      </button>
    </header>

    <section class="contact-section-glass">
      <div id="form-message"></div>

      <form data-form id="contact-form" class="liquid-form">
        <div class="form-grid">
          <!-- Left Column: Primary Info -->
          <div class="form-group-island">
            <div class="input-glass-wrapper">
              <label>Full Name</label>
              <input type="text" name="fullname" data-form-input placeholder="Sayed Ahmed" required>
              <div class="input-focus-glow"></div>
            </div>
            
            <div class="input-glass-wrapper">
              <label>Email Address</label>
              <input type="email" name="email" data-form-input placeholder="Sayed@example.com" required>
              <div class="input-focus-glow"></div>
            </div>

            <div class="input-glass-wrapper">
              <label>Phone Number</label>
              <div class="liquid-phone-input">
                <div class="custom-country-selector" id="country-selector-trigger">
                  <div class="selected-country">
                    <span class="selected-flag">${activeCountry.flag}</span>
                    <span class="selected-code">${activeCountry.code}</span>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </div>
                  <div class="country-dropdown-glass">
                    <div class="country-search-wrapper">
                      <input type="text" class="country-search-input" placeholder="Search..." id="countrySearch">
                    </div>
                    <div class="country-dropdown-indicator"></div>
                    <ul class="country-list-scroll">
                      ${countryListItems}
                    </ul>
                  </div>

                  <input type="hidden" name="countryCode" id="countryCodeInput" value="${activeCountry.code}">
                </div>

                <input type="tel" name="phone" id="phone" placeholder="3XXXXXXX" pattern="[0-9]*">
              </div>
              <div class="input-focus-glow"></div>
            </div>
          </div>

          <!-- Right Column: Message -->
          <div class="form-group-island">
            <div class="input-glass-wrapper full-height">
              <label>Your Message</label>
              <textarea name="message" data-form-input placeholder="Enter your message..." required></textarea>
              <div class="input-focus-glow"></div>
            </div>
          </div>
        </div>

        <button type="submit" data-form-btn class="liquid-submit-btn">
          <div class="btn-text">Send Message</div>
          <div class="btn-liquid-fill"></div>
          <ion-icon name="paper-plane-outline"></ion-icon>
        </button>
      </form>
    </section>
  `;
}

export function renderContactModal() {
  return `
    <div class="contact-modal" id="contact-modal" style="display: none;">
      <div class="modal-overlay" id="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" id="modal-close">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div class="modal-header">
          <h3>Save Contact Card</h3>
          <p>Scan the QR code or download the vCard</p>
        </div>
        <div class="modal-body">
          <div class="modal-columns">
            <div class="modal-left">
              <div class="contact-info">
                <img src="${data.avatar}" alt="${data.name}" class="contact-avatar" loading="lazy">
                <h4>${data.name}</h4>
                <p><ion-icon name="mail-outline"></ion-icon> ${data.email}</p>
                <p><ion-icon name="call-outline"></ion-icon> ${data.mobile}</p>
                
                <a href="https://wa.me/${data.mobile.replace(/[^0-9]/g, '')}" target="_blank" class="wa-gloss-btn" style="display:inline-flex; align-items:center; gap:0.5rem; color: #25D366; font-weight:700; text-decoration:none; margin-top:1.2rem; padding:0.9rem 1.4rem; border-radius:999px; background:rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.2); font-size:0.9rem; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); width: fit-content; align-self: center;">
                  <ion-icon name="logo-whatsapp" style="font-size: 1.2rem; color: #25D366 !important; opacity: 1 !important;"></ion-icon>
                  WhatsApp Me
                </a>
                <style>
                  .wa-gloss-btn:hover {
                    background: rgba(37, 211, 102, 0.15) !important;
                    transform: translateY(-3px) scale(1.05);
                    border-color: rgba(37, 211, 102, 0.4) !important;
                    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.1);
                  }
                </style>
              </div>
            </div>
            <div class="modal-right" style="display: flex; flex-direction: column; gap: 1.5rem; flex: 1;">
              <div class="qr-code-container" id="qr-code">
                <div class="qr-placeholder">QR Code will appear here</div>
              </div>

              <div class="modal-actions" style="margin-top: 0;">
                <button class="modal-btn primary" id="download-vcard-btn">
                  <ion-icon name="download-outline"></ion-icon>
                  <span>Download</span>
                </button>
                <button class="modal-btn secondary" id="copy-vcard-btn">
                  <ion-icon name="copy-outline"></ion-icon>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function generateVCard() {
  try {
    const response = await fetch(data.vCardUrl);
    const vcfContent = await response.text();

    // Split into lines and remove the PHOTO field
    const lines = vcfContent.split('\n');
    const filteredLines = [];
    let inPhotoBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('PHOTO;')) {
        inPhotoBlock = true;
        continue;
      }
      if (inPhotoBlock) {
        if (line.trim() === '' || line.startsWith(' ')) {
          continue;
        } else {
          inPhotoBlock = false;
        }
      }
      if (!inPhotoBlock) {
        filteredLines.push(line);
      }
    }

    return filteredLines.join('\n');
  } catch (err) {
    console.error('Error fetching vCard:', err);
    // Fallback to old method
    return `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
N:HUSAIN;SAYED;AHMED;;
TEL;TYPE=CELL:${data.mobile}
EMAIL:${data.email}
ADR;TYPE=HOME:;;${data.address};;;${data.nationality}
URL:${data.contact.website}
URL:${data.contact.linkedin}
URL:${data.contact.github}
NOTE:${data.title}
END:VCARD`;
  }
}


export async function generateQRCode() {
  const qrContainer = document.getElementById('qr-code');
  if (!qrContainer) return;

  // Show loading state
  qrContainer.innerHTML = `
    <div class="qr-loading">
      <div class="loading-spinner"></div>
      <p class="loading-text">Generating QR Code...</p>
    </div>
  `;

  try {
    // Add a small delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Fetch the actual VCF file and extract text without photo
    const response = await fetch(data.vCardUrl);
    const vcfContent = await response.text();

    // Split into lines and remove the PHOTO field
    const lines = vcfContent.split('\n');
    const filteredLines = [];
    let inPhotoBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Start of photo block
      if (line.startsWith('PHOTO;ENCODING=')) {
        inPhotoBlock = true;
        continue;
      }

      // End of vCard or next field means photo block ended
      if (inPhotoBlock && (line.startsWith('END:VCARD') || (line.match(/^[A-Z]/) && !line.startsWith(' ')))) {
        inPhotoBlock = false;
      }

      // Skip lines that are part of photo block
      if (inPhotoBlock) {
        continue;
      }

      filteredLines.push(line);
    }

    const vCardWithoutPhoto = filteredLines.join('\n');

    // Clear loading state
    qrContainer.innerHTML = '';

    // Create QR code using QRCode.js
    const qrCodeDiv = document.createElement('div');
    qrCodeDiv.id = 'qrcode-canvas';
    qrContainer.appendChild(qrCodeDiv);

    new QRCode(qrCodeDiv, {
      text: vCardWithoutPhoto,
      width: 250,
      height: 250,
      colorDark: "#0a192f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });

    // Add instruction text
    const instruction = document.createElement('p');
    instruction.className = 'qr-instruction';
    instruction.textContent = 'Scan with your phone camera';
    qrContainer.appendChild(instruction);

  } catch (err) {
    console.error('Failed to generate QR code:', err);
    qrContainer.innerHTML = `
      <p class="qr-error" style="color: #ff6464; text-align: center;">Unable to generate QR code</p>
    `;
  }
}
