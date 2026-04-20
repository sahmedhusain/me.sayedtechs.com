import { data } from '../data.js';
import { countryCodes } from '../data/countries.js';

export function renderContactSection() {

  const countryOptions = countryCodes.map(item =>
    `<option value="${item.code}" ${item.code === '+973' ? 'selected' : ''}>${item.flag} ${item.code} (${item.country})</option>`
  ).join('');

  return `
    <header>
      <h2 class="h2 article-title">Contact me</h2>
    </header>
    <section class="contact">
      <p class="contact-text">
        Let's <strong>keep in touch</strong>! Don't hesitate to contact me for any inquiry or opportunity.
      </p>

      <div id="form-message"></div>

      <form data-form id="contact-form">
        <div class="form-content-wrapper">
          <div class="form-left-col">
            <div class="input-wrapper">
              <label for="fullname">Full Name <span style="color: red;">*</span></label>
              <input type="text" name="fullname" id="fullname" data-form-input placeholder="e.g. Sayed Ahmed" required>
            </div>
            
            <div class="input-wrapper">
              <label for="email">Email Address <span style="color: red;">*</span></label>
              <input type="email" name="email" id="email" data-form-input placeholder="e.g. sayed.ahmed@gmail.com" required>
            </div>

            <div class="phone-input-wrapper">
              <label for="phone">Phone Number</label>
              <div class="phone-fields">
                <select name="countryCode" id="countryCode">
                  <option value="">Select country code</option>
                  ${countryOptions}
                </select>
                <input type="tel" name="phone" id="phone" placeholder="e.g. 3X XXX XXX" pattern="[0-9]*">
              </div>
            </div>
          </div>

          <div class="form-right-col">
            <div class="input-wrapper" style="height: 100%;">
              <label for="message">Message <span style="color: red;">*</span></label>
              <textarea name="message" id="message" data-form-input placeholder="e.g. Hello, I'd like to discuss about..." required style="height: 100%; min-height: 280px;"></textarea>
            </div>
          </div>
        </div>

        <button type="submit" data-form-btn>
          <span>Send Message</span>
        </button>
      </form>
      
      <!-- Contact Page Socials -->
      <div class="contact-page-socials">
        <a href="tel:${data.contact.phone}" data-title="Call me!" aria-label="Call me">
          <ion-icon name="call-outline"></ion-icon>
        </a>
        <a href="mailto:${data.contact.email}" data-title="Let's touch!" aria-label="Email me">
          <ion-icon name="mail-outline"></ion-icon>
        </a>
        <a href="${data.contact.linkedin}" target="_blank" data-title="Connect!" aria-label="LinkedIn Profile">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a>
        <a href="https://wa.me/${data.contact.phone.replace(/[^0-9]/g, '')}" target="_blank" data-title="Chat now!" aria-label="WhatsApp Chat">
          <ion-icon name="logo-whatsapp"></ion-icon>
        </a>
        <a href="${data.contact.github}" target="_blank" data-title="Code here!" aria-label="GitHub Profile">
          <ion-icon name="logo-github"></ion-icon>
        </a>
        <a href="https://medium.com/@s97ahm" target="_blank" data-title="Read me!" aria-label="Medium Blog">
          <ion-icon name="logo-medium"></ion-icon>
        </a>
        <a href="${data.contact.twitter}" target="_blank" data-title="Follow me!" aria-label="X Profile">
          <span>𝕏</span>
        </a>
      </div>
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
              </div>
            </div>
            <div class="modal-right">
              <div class="qr-code-container" id="qr-code">
                <div class="qr-placeholder">QR Code will appear here</div>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="modal-btn primary" id="download-vcard-btn">
              <ion-icon name="download-outline"></ion-icon>
              <span>Download vCard</span>
            </button>
            <button class="modal-btn secondary" id="copy-vcard-btn">
              <ion-icon name="copy-outline"></ion-icon>
              <span>Copy vCard</span>
            </button>
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
