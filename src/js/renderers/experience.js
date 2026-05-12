import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { handleImageError, getLocalLogoFor, getLogo, getEntityUrl } from '../utils.js';
import { getSectionIcon } from './about.js';
import { SECTION_ICONS, MONTHS_SHORT } from '../constants/config.js';

// --- Helper: Section Icons Map ---
// --- UTILS ---
function shortenDate(dateStr) {
  if (!dateStr) return '';
  let result = dateStr;
  Object.keys(MONTHS_SHORT).forEach(m => {
    const reg = new RegExp(m, 'g');
    result = result.replace(reg, MONTHS_SHORT[m]);
  });
  return result;
}

// --- Helper: Get Duration for Cards ---
export function renderExperienceCardContent(job) {
  // Helper to calculate duration
  const getDuration = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('—').map(s => s.trim());
    if (parts.length < 2) return '';

    const parseDate = (str) => {
      if (!str || str.toLowerCase() === 'present') return new Date();
      return new Date(str);
    };

    const start = parseDate(parts[0]);
    const end = parseDate(parts[1]);

    if (isNaN(start) || isNaN(end)) return '';

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    if (months < 1) months = 1;

    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    let res = [];
    if (years > 0) res.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (remMonths > 0) res.push(`${remMonths} mo${remMonths > 1 ? 's' : ''}`);

    return res.length > 0 ? ` · ${res.join(' ')}` : '';
  };

  const duration = getDuration(job.date);

  return `
    <div class="experience-card-header">
      <div class="experience-company-info">
        <div class="experience-company-logo">
          <img src="${getLogo(job.company, '')}" alt="${job.company} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
        </div>
        <div class="experience-header-main">
          <h3 class="experience-job-title">${job.title}</h3>
          <p class="experience-company-name">
            <a href="${getEntityUrl(job.company)}" target="_blank" rel="noopener noreferrer" class="company-link">${job.company}</a>
          </p>
          <div class="experience-meta-row">
            <div class="meta-pill date-pill">
              <ion-icon name="calendar-outline"></ion-icon>
              <span class="date-text">${shortenDate(job.date)}</span>
              ${duration ? `
                <span class="meta-separator"></span>
                <span class="duration-text">${duration.replace(' · ', '')}</span>
              ` : ''}
            </div>
            <div class="meta-pill location-pill">
              <ion-icon name="location-outline"></ion-icon>
              <span>${job.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="experience-card-content">
      ${job.roleOverview ? `
        <div class="experience-overview" style="margin: 0 0 1.5rem 0;">
          <div class="overview-header">
            <ion-icon name="information-circle-outline"></ion-icon>
            <span>Role Overview</span>
          </div>
          <p class="overview-text">${job.roleOverview}</p>
        </div>
      ` : ''}

      ${job.sections ? Object.entries(job.sections).map(([sectionName, points]) => {
    const sectionTitle = sectionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const sectionIcon = getSectionIcon(sectionName);
    return `
          <div class="experience-section">
            <h4 class="experience-section-title">
              <ion-icon name="${sectionIcon}"></ion-icon>
              ${sectionTitle}
            </h4>
            <ul class="experience-points">
              ${points.map(point => `<li class="experience-point">${point}</li>`).join('')}
            </ul>
          </div>
        `;
  }).join('') : job.points ? `
        <div class="experience-section">
          <h4 class="experience-section-title">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            ${getData().ui_extras?.experience?.keyResponsibilities}
          </h4>
          <ul class="experience-points">
            ${job.points.map(point => `<li class="experience-point">${point}</li>`).join('')}
          </ul>
        </div>
        ${job.keyProjects ? `
          <div class="experience-section">
            <h4 class="experience-section-title">
              <ion-icon name="build-outline"></ion-icon>
              ${getData().ui_extras?.experience?.keyProjects}
            </h4>
            <ul class="experience-points">
              ${job.keyProjects.map(project => `<li class="experience-point">${project}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      ` : ''}
    </div>
  `;
}

// --- MAIN EXPERIENCE SECTION ENTRY ---
export function renderExperienceSection() {
  const data = getData();
  // 1. Experience Section
  const experienceHTML = generateSectionHTML({
    idPrefix: 'exp',
    title: 'Career',
    subtitle: '',
    items: data.experience,
    isFirst: true,
    hideHeader: false,
    getItemTitle: (item) => item.title,
    getItemSubtitle: (item) => item.company,
    renderCard: renderExperienceCardContent
  });

  // 2. Internships Section
  const internshipsHTML = generateSectionHTML({
    idPrefix: 'intern',
    title: 'Internships',
    subtitle: '',
    items: data.professionalJourney.internships,
    isFirst: false,
    getItemTitle: (item) => item.title,
    getItemSubtitle: (item) => item.company,
    renderCard: renderInternshipCardContent
  });

  // 3. Education Section
  const educationHTML = generateSectionHTML({
    idPrefix: 'edu',
    title: 'Education',
    subtitle: '',
    items: data.education,
    isFirst: false,
    getItemTitle: (item) => item.degree,
    getItemSubtitle: (item) => item.institution,
    renderCard: renderEducationCardContent
  });

  // 4. Certifications Section
  const certificationsHTML = generateSectionHTML({
    idPrefix: 'cert',
    title: 'Certifications & Licenses',
    subtitle: '',
    items: data.certifications,
    isFirst: false,
    getItemTitle: (item) => item.name,
    getItemSubtitle: (item) => item.issuingAuthority,
    renderCard: renderCertificationCardContent
  });

  return experienceHTML + internshipsHTML + educationHTML + certificationsHTML;
}

// --- Helper: Render Card Content for Internships ---
export function renderInternshipCardContent(intern) {
  // Reusing the experience card style for consistency
  return `
    <div class="experience-card-header">
      <div class="experience-company-info">
        <div class="experience-company-logo">
          <img src="${getLogo(intern.company, '')}" alt="${intern.company} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
        </div>
        <div class="experience-header-main">
          <h3 class="experience-job-title">${intern.title}</h3>
          <p class="experience-company-name">
            <a href="${getEntityUrl(intern.company)}" target="_blank" rel="noopener noreferrer" class="company-link">${intern.company}</a>
          </p>
          <div class="experience-meta-row">
            <div class="meta-pill date-pill">
              <ion-icon name="calendar-outline"></ion-icon>
              <span>${shortenDate(intern.startDate)} - ${shortenDate(intern.endDate)}</span>
            </div>
            <div class="meta-pill location-pill">
              <ion-icon name="location-outline"></ion-icon>
              <span>${intern.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="experience-card-content">
      ${intern.roleOverview ? `
        <div class="experience-overview" style="margin: 0 0 1.5rem 0;">
          <div class="overview-header">
            <ion-icon name="information-circle-outline"></ion-icon>
            <span>Role Overview</span>
          </div>
          <p class="overview-text">${intern.roleOverview}</p>
        </div>
      ` : ''}

      <div class="experience-section">
        <p class="experience-point">${intern.description}</p>
      </div>
    </div>
  `;
}

// --- Helper: Render Card Content for Education ---
export function renderEducationCardContent(edu) {
  return `
    <div class="experience-card-header">
      <div class="experience-company-info">
        <div class="experience-company-logo">
          <img src="${getLogo(edu.institution || edu.degree, '')}" alt="${edu.institution} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
        </div>
        <div class="experience-header-main">
          <h3 class="experience-job-title">${edu.degree}</h3>
          <p class="experience-company-name">
            <a href="${getEntityUrl(edu.institution)}" target="_blank" rel="noopener noreferrer" class="company-link">${edu.institution}</a>
          </p>
          <div class="experience-meta-row">
            <div class="meta-pill date-pill">
              <ion-icon name="calendar-outline"></ion-icon>
              <span>${shortenDate(edu.date)}</span>
            </div>
            <div class="meta-pill location-pill">
              <ion-icon name="location-outline"></ion-icon>
              <span>${edu.location}</span>
            </div>
          </div>
        </div>
      </div>
      ${edu.certificate ? `
          <a href="${edu.certificate}" target="_blank" class="header-action-btn">
          <ion-icon name="document-text-outline"></ion-icon>
          <span>${getData().ui_extras?.experience?.view}</span>
        </a>` : ''}
    </div>

    <div class="experience-card-content">
      ${edu.sections ? Object.entries(edu.sections).map(([sectionName, points]) => {
    const sectionTitle = sectionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const sectionIcon = getSectionIcon(sectionName);
    return `
          <div class="experience-section">
            <h4 class="experience-section-title">
              <ion-icon name="${sectionIcon}"></ion-icon>
              ${sectionTitle}
            </h4>
            <ul class="experience-points">
              ${points.map(point => `<li class="experience-point">${point}</li>`).join('')}
            </ul>
          </div>
        `;
  }).join('') : edu.description ? `
        <div class="experience-section">
          <h4 class="experience-section-title">
            <ion-icon name="school-outline"></ion-icon>
            ${getData().ui_extras?.experience?.educationHighlights}
          </h4>
          <ul class="experience-points">
            ${edu.description.map(point => `<li class="experience-point">${point}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

// --- Helper: Render Card Content for Certifications ---
export function renderCertificationCardContent(cert) {
  const isExpired = cert.expires && new Date(cert.expires) < new Date();
  return `
    <div class="experience-card-header">
      <div class="experience-company-info">
        <div class="experience-company-logo">
          <img src="${getLogo(cert.issuingAuthority, '')}" alt="${cert.issuingAuthority} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
        </div>
        <div class="experience-header-main">
          <h3 class="experience-job-title">${cert.name}</h3>
          <p class="experience-company-name">
            <a href="${getEntityUrl(cert.issuingAuthority)}" target="_blank" rel="noopener noreferrer" class="company-link">${cert.issuingAuthority}</a>
          </p>
          <div class="experience-meta-row">
             ${cert.id ? `<div class="meta-pill"><ion-icon name="${cert.type === 'License' ? 'document-text-outline' : 'ribbon-outline'}"></ion-icon> ID: ${cert.id}</div>` : ''}
             ${cert.issued ? `<div class="meta-pill"><ion-icon name="calendar-outline"></ion-icon> Issued: ${shortenDate(cert.issued)}</div>` : ''}
             ${cert.expires ? `<div class="meta-pill" style="${isExpired ? 'color: #ef4444;' : ''}"><ion-icon name="time-outline" style="${isExpired ? 'color: #ef4444;' : ''}"></ion-icon> ${isExpired ? (getData().ui_extras?.experience?.expired) + ' ' + shortenDate(cert.expires) : (getData().ui_extras?.experience?.expires) + ' ' + shortenDate(cert.expires)}</div>` : ''}
          </div>
        </div>
      </div>
      ${cert.pdfUrl ? `
        <a href="${cert.pdfUrl}" target="_blank" class="header-action-btn">
          <ion-icon name="document-text-outline"></ion-icon>
          <span>View</span>
        </a>` : ''}
    </div>
    ${cert.description ? `
    <div class="experience-card-content">
      <div class="experience-section">
        <h4 class="experience-section-title">
          <ion-icon name="information-circle-outline"></ion-icon>
          About This Credential
        </h4>
        <ul class="experience-points">
          ${cert.description.map(point => `<li class="experience-point">${point}</li>`).join('')}
        </ul>
      </div>
    </div>` : ''}
    ${cert.courses ? `
      <div class="experience-card-content" style="margin-top: 1rem;">
         <div class="experience-section">
            <h4 class="experience-section-title"><ion-icon name="book-outline"></ion-icon> Courses</h4>
            <div class="cert-courses" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${cert.courses.map(course => `<span class="cert-course-item">${course}</span>`).join('')}
            </div>
         </div>
      </div>
    ` : ''}
  `;
}

// --- MASTER FUNCTION: Generate Toggleable Section HTML ---
export function generateSectionHTML({
  idPrefix,       // e.g., 'exp', 'intern', 'edu', 'cert'
  title,          // e.g., 'Professional Experience'
  subtitle,       // e.g., 'My career journey...'
  items,          // Array of data items
  isFirst,        // Boolean: is this the first section on the page?
  getItemTitle,   // Function(item) -> string (for sidebar)
  getItemSubtitle,// Function(item) -> string (for sidebar)
  renderCard,      // Function(item) -> html string (for content)
  hideHeader = false
}) {
  const iconName = SECTION_ICONS[title] || 'layers-outline';
  const ui = getData().ui_extras || {};
  const expUi = ui.experience || {};
  const displayTitle = title === 'Career' ? (expUi.career || title)
    : title === 'Internships' ? (expUi.internships || title)
      : title === 'Education' ? (expUi.education || title)
        : title === 'Certifications & Licenses' ? (expUi.certifications || title)
          : title;

  // 1. Grid View (Sidebar) - ACTIVE by default
  const gridViewHtml = `
    <div class="section-view-container active" id="${idPrefix}-grid-view" data-journey-section="${idPrefix}">
      <div class="section-tabs-wrapper ${idPrefix}-wrapper">
        <div class="section-sidebar-list">
          <div class="sidebar-section-header">
            <ion-icon name="${iconName}"></ion-icon>
            <span>${displayTitle}</span>
          </div>
          <div class="sidebar-separator"></div>
          
          <div class="sidebar-items-container">
            <div class="sidebar-indicator-active"></div>
            <div class="sidebar-indicator-hover"></div>
            ${items.map((item, i) => `
              <button class="section-sidebar-btn ${i === 0 ? 'active' : ''}" 
                      data-tab-group="${idPrefix}" 
                      data-tab-index="${i}">
                <span class="sidebar-btn-title">${getItemTitle(item)}</span>
                <span class="sidebar-btn-subtitle">${getItemSubtitle(item)}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="section-tab-content-area">
          ${items.map((item, i) => `
            <div class="section-tab-panel ${i === 0 ? 'active' : ''}" id="${idPrefix}-panel-${i}">
              <div class="experience-card">
                ${renderCard(item)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  return `
    <div class="journey-section-wrapper animate-entry" data-journey-section="${idPrefix}" style="animation-delay: 0.3s;">
      ${hideHeader ? '' : `
      <header class="experience-header">
        <div class="section-header-flex ${isFirst ? 'first-section' : ''}">
        </div>
      </header>
      `}
      ${gridViewHtml}
    </div>
  `;
}