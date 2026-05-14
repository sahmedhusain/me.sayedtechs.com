import { getData } from '../constants/index.js';
import { t, tDual, isRTL } from '../constants/i18n.js';
import { countryCodes } from '../data/countries.js';

export function renderContactSection() {
  const data = getData();

  const countryOptions = countryCodes.map(item =>
    `<option value="${item.code}" ${item.code === '+973' ? 'selected' : ''}>${item.flag} ${item.code} (${item.country})</option>`
  ).join('');

  const activeCountry = countryCodes.find(c => c.code === '+973') || countryCodes[0];

  const countryListItems = countryCodes.map(item => {
    const localizedName = t(`countries.${item.country}`) || item.country;
    const arabicName = tDual(`countries.${item.country}`, 'ar') || '';
    return `
    <li class="country-item ${item.code === activeCountry.code ? 'active' : ''}" 
        data-country-code="${item.code}"
        data-country-flag="${item.flag}"
        data-country-name="${localizedName}"
        data-country-name-en="${item.country.toLowerCase()}"
        data-country-name-ar="${arabicName.toLowerCase()}">
      <span class="country-flag">${item.flag}</span>
      <span class="country-code-val">${item.code}</span>
      <span class="country-name-val" style="flex: 1;">${localizedName}</span>
      <ion-icon name="checkmark-outline" class="selection-tick" style="font-size: 0.9rem; opacity: ${item.code === activeCountry.code ? '1' : '0'}; color: var(--accent);"></ion-icon>
    </li>
  `;
  }).join('');


  return `
    <header class="section-header-glass">
      <div class="header-left">
        <p class="section-label">${t('contact.title')}</p>
        <p class="section-subtitle">${t('contact.subtitle')}</p>
      </div>
      <button class="action-btn-glass" id="view-contact-btn">
        <div class="btn-glass-content">
          <ion-icon name="person-outline"></ion-icon>
          <span>${t('contact.businessCard')}</span>
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
              <label>${t('contact.fullName')} <span style="color: #ff6464;">*</span></label>
              <input type="text" name="fullname" data-form-input placeholder="${t('contact.fullNamePlaceholder')}" required>
              <div class="input-focus-glow"></div>
            </div>
            
            <div class="input-glass-wrapper">
              <label>${t('contact.emailAddress')} <span style="color: #ff6464;">*</span></label>
              <input type="email" name="email" data-form-input placeholder="${t('contact.emailPlaceholder')}" required>
              <div class="input-focus-glow"></div>
            </div>

            <div class="input-glass-wrapper">
              <label>${t('contact.phoneNumber')} <span style="color: var(--text-secondary); font-weight: 500; font-size: 0.8em; text-transform: none;">${t('contact.optional')}</span></label>
              <div class="liquid-phone-input">
                <div class="custom-country-selector" id="country-selector-trigger">
                  <div class="selected-country">
                    <span class="selected-flag">${activeCountry.flag}</span>
                    <span class="selected-code">${activeCountry.code}</span>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </div>
                  <div class="country-dropdown-glass">
                    <div class="country-search-wrapper">
                      <input type="text" class="country-search-input" placeholder="${t('contact.searchCountry')}" id="countrySearch">
                    </div>
                    <div class="country-dropdown-indicator"></div>
                    <ul class="country-list-scroll">
                      ${countryListItems}
                    </ul>
                  </div>

                  <input type="hidden" name="countryCode" id="countryCodeInput" value="${activeCountry.code}">
                </div>

                <input type="tel" name="phone" id="phone" placeholder="${t('contact.phonePlaceholder')}" pattern="[0-9]*">
              </div>
              <div class="input-focus-glow"></div>
            </div>
          </div>

          <!-- Right Column: Message -->
          <div class="form-group-island">
            <div class="input-glass-wrapper full-height">
              <label>${t('contact.yourMessage')} <span style="color: #ff6464;">*</span></label>
              <textarea name="message" data-form-input placeholder="${t('contact.messagePlaceholder')}" required></textarea>
              <div class="input-focus-glow"></div>
            </div>
          </div>
        </div>

        <button type="submit" data-form-btn class="liquid-submit-btn">
          <div class="btn-text">${t('contact.sendMessage')}</div>
          <div class="btn-liquid-fill"></div>
          <ion-icon name="paper-plane-outline"></ion-icon>
        </button>
      </form>
    </section>
  `;
}

export function renderContactModal() {
  const data = getData();
  const phones = data.phones || data.contact?.phones || [];

  const phoneRows = phones.map(phone => {
    const fullNumber = `${phone.countryCode}${phone.number}`;
    const cleanNumber = fullNumber.replace(/[^0-9]/g, '');
    return `
      <div class="phone-row">
        <span style="font-size: 1.4rem;">${phone.flag}</span>
        <div style="flex: 1; min-width: 0; text-align: start;">
          <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${phone.label}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-family: var(--font-mono); direction: ltr; unicode-bidi: isolate; text-align: ${isRTL() ? 'right' : 'left'};">${phone.countryCode} ${phone.number}</div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <a href="tel:${fullNumber}" class="phone-action-btn" title="${t('contact.callMe')}">
            <ion-icon name="call-outline" style="font-size: 1.2rem;"></ion-icon>
          </a>
          ${phone.whatsapp ? `
          <a href="https://wa.me/${cleanNumber}?text=Hi%20Sayed,%20I%20saw%20your%20website%20and%20would%20like%20to%20connect!%20" target="_blank" class="phone-action-btn wa-btn" title="${t('contact.whatsappMe')}">
            <ion-icon name="logo-whatsapp" style="font-size: 1.2rem;"></ion-icon>
          </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="contact-modal" id="contact-modal" style="display: none;">
      <style>
        .phone-action-btn:hover {
          background: rgba(255, 255, 255, 0.12) !important;
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .phone-action-btn.wa-btn:hover {
          color: var(--text-primary) !important;
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
      </style>
      <div class="modal-overlay" id="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" id="modal-close">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div class="modal-header" style="text-align: center !important;">
          <h3 style="text-align: center !important;">${t('contact.saveContactCard')}</h3>
          <p style="text-align: center !important; margin: 0 auto;">${t('contact.scanQr')}</p>
        </div>
        <div class="modal-body">
          <div class="modal-columns">
            <div class="modal-left">
              <div class="contact-info" style="text-align: center;">
                <img src="${data.avatar}" alt="${data.name}" class="contact-avatar" loading="lazy">
                <h4 style="text-align: center;">${data.name}</h4>
                <p><ion-icon name="mail-outline"></ion-icon> ${data.email}</p>
                
                <div style="margin-top: 0.8rem; display: flex; flex-direction: column; gap: 0;">
                  ${phoneRows}
                </div>

                <style>
                  .phone-action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                  }
                  .wa-btn:hover {
                    background: rgba(37, 211, 102, 0.15) !important;
                    border-color: rgba(37, 211, 102, 0.4) !important;
                  }
                </style>
              </div>
            </div>
            <div class="modal-right" style="display: flex; flex-direction: column; gap: 1.5rem; flex: 1;">
              <div class="qr-code-container" id="qr-code">
                <div class="qr-placeholder">${t('contact.qrPlaceholder')}</div>
              </div>

              <div class="modal-actions" style="margin-top: 0;">
                <button class="modal-btn primary" id="download-vcard-btn">
                  <ion-icon name="download-outline"></ion-icon>
                  <span>${t('contact.download')}</span>
                </button>
                <button class="modal-btn secondary" id="copy-vcard-btn">
                  <ion-icon name="copy-outline"></ion-icon>
                  <span>${t('contact.copy')}</span>
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
  const data = getData();
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
  const data = getData();
  const qrContainer = document.getElementById('qr-code');
  if (!qrContainer) return;

  // Show loading state
  qrContainer.innerHTML = `
    <div class="qr-loading">
      <div class="loading-spinner"></div>
      <p class="loading-text">${t('contact.qrGenerating')}</p>
    </div>
  `;

  try {
    // Wait for QRCode library to load (max 3 seconds)
    let attempts = 0;
    while (typeof QRCode === 'undefined' && attempts < 30) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }

    if (typeof QRCode === 'undefined') {
      throw new Error('QRCode library failed to load from CDN.');
    }

    // Fetch the actual VCF file
    const response = await fetch(data.vCardUrl);
    const vcfContent = await response.text();

    // Cleanly strip ONLY the PHOTO property
    const lines = vcfContent.split(/\r?\n/);
    const filteredLines = [];
    let inPhoto = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (inPhoto) {
        if (line.startsWith(' ') || line.startsWith('\t')) {
          continue; // Continuation of the photo base64 string
        } else {
          inPhoto = false; // End of photo block
        }
      }

      if (!inPhoto) {
        if (line.startsWith('PHOTO')) {
          inPhoto = true;
          continue;
        }
        filteredLines.push(line);
      }
    }

    // Remove emojis and non-ASCII characters that cause qrcode.js length calculation bugs
    const vCardWithoutPhoto = filteredLines.join('\n').replace(/[^\x00-\x7F]/g, "");

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
      correctLevel: QRCode.CorrectLevel.L // Low correction allows maximum data capacity
    });

    // Add instruction text
    const instruction = document.createElement('p');
    instruction.className = 'qr-instruction';
    instruction.textContent = t('contact.qrInstruction');
    qrContainer.appendChild(instruction);

  } catch (err) {
    qrContainer.innerHTML = `
      <p class="qr-error" style="color: #ff6464; text-align: center; font-size: 0.9rem;">
        ${t('contact.qrError')}<br>
        <span style="font-size: 0.8rem; opacity: 0.8;">${err.message}</span>
      </p>
    `;
  }
}
