import { data } from '../data.js';
import { handleImageError, getLocalLogoFor, getLogo, getEntityUrl } from '../utils.js';

export function renderSidebar() {
  return `
    <aside class="sidebar" data-sidebar>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img src="${data.avatar}" alt="${data.name}" width="80" loading="lazy" onerror="handleImageError(this)">
        </figure>
        <div class="action-buttons">
          <button class="action-btn primary">
            <ion-icon name="document-text-outline"></ion-icon>
            <span>Download Resume</span>
          </button>
          <button class="action-btn secondary">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>Contact Details</span>
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
              <p class="contact-title">Email</p>
              <a href="mailto:${data.contact.email}" class="contact-link">${data.contact.email}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Phone</p>
              <a href="tel:${data.contact.phone}" class="contact-link">${data.contact.phone}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="flag-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Nationality</p>
              <address>${data.nationality}</address>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Address</p>
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
  const mainSkills = [...data.technicalSkills.languages.slice(0, 4), ...data.technicalSkills.webTechnologies.slice(0, 4)];

  return `
    <!-- Profile Card with Avatar and Action Buttons -->
    <div class="about-profile-header">
        <div class="about-avatar-section">
        <div class="avatar-box">
          <img src="${data.avatar}" alt="${data.name}" width="140" height="140" loading="lazy" onerror="handleImageError(this)">
        </div>
        <div class="about-profile-info">
          <h1>${data.name}</h1>
          <p class="about-tagline">${data.tagline}</p>
        </div>
      </div>
      <div class="about-profile-spacer" style="flex:1 1 auto;"></div>
      <div class="action-buttons">
        <button class="action-btn primary" id="download-cv-btn">
          <ion-icon name="download-outline"></ion-icon>
          <span>Download Resume</span>
        </button>
        <button class="action-btn secondary" id="view-contact-btn">
          <ion-icon name="person-outline"></ion-icon>
          <span>Contact Card</span>
        </button>
      </div>
    </div>
    
    <header>
      <h2 class="h2 article-title">About me</h2>
    </header>
    
    <section class="about-text">
      <p><strong>Electrical Engineer transitioning to Full-Stack Development</strong> with a strong focus on building secure, scalable web applications. Proficient in <strong>Go (Golang), Next.js, React, and TypeScript</strong>, with hands-on experience developing real-time solutions using <strong>WebSockets</strong>. Also skilled in <strong>Rust</strong> for systems programming. My background in highly regulated industries—specifically Fire Safety—instills a disciplined approach to reliability and performance. While engineering documentation focuses on regulatory compliance, I apply that same rigor to software documentation, ensuring clarity in system architecture and technical workflows. Furthermore, my experience in Business Development and Administration at LIFECO, combined with my background in the telecom sector at Zain Bahrain and Channels by STC, has enhanced my understanding of market dynamics and customer-centric solutions.</p>
      <p><strong>Passionate about bridging the gap between engineering precision and modern software architecture</strong>, I am committed to driving digital transformation through innovative full-stack solutions. Leveraging dual expertise in electrical engineering and software development, I create efficient applications that address complex real-world challenges while ensuring robust performance.</p>
    </section>
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
    'customerEngagement': 'chatbubble-outline'
  };
  return icons[sectionName] || 'checkmark-circle-outline';
}