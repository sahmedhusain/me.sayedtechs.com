import { data } from '../data.js';
import { handleImageError, getLocalLogoFor, getLogo, getEntityUrl } from '../utils.js';
import { getSectionIcon } from './about.js';

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
          <a href="${getEntityUrl(job.company)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${job.company}">
            <img src="${getLogo(job.company, '')}" alt="${job.company} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
          </a>
        </div>
        <div class="experience-company-details">
          <h3 class="experience-job-title">${job.title}</h3>
          <p class="experience-company-name">${job.company}</p>
          <div class="experience-meta">
            <span class="experience-date">
              <ion-icon name="calendar-outline"></ion-icon>
              ${job.date} <span style="opacity: 0.8; font-size: 0.9em;">${duration}</span>
            </span>
            <span class="experience-location">
              <ion-icon name="location-outline"></ion-icon>
              ${job.location}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="experience-card-content">
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
            Key Responsibilities
          </h4>
          <ul class="experience-points">
            ${job.points.map(point => `<li class="experience-point">${point}</li>`).join('')}
          </ul>
        </div>
        ${job.keyProjects ? `
          <div class="experience-section">
            <h4 class="experience-section-title">
              <ion-icon name="build-outline"></ion-icon>
              Key Projects
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
  // 1. Experience Section
  const experienceHTML = generateSectionHTML({
    idPrefix: 'exp',
    title: 'Professional Experience',
    subtitle: 'Discover my <strong>career journey</strong> – from innovative projects and leadership roles to the achievements that have shaped my professional path.',
    items: data.experience,
    isFirst: true,
    getItemTitle: (item) => item.title,
    getItemSubtitle: (item) => item.company,
    renderCard: renderExperienceCardContent
  });

  // 2. Internships Section
  const internshipsHTML = generateSectionHTML({
    idPrefix: 'intern',
    title: 'Internships',
    subtitle: 'Early career experiences – internships that provided <strong>practical skills</strong> and industry insights.',
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
    subtitle: 'My <strong>educational foundation</strong> – from high school to university degrees.',
    items: data.education,
    isFirst: false,
    getItemTitle: (item) => item.degree,
    getItemSubtitle: (item) => item.institution,
    renderCard: renderEducationCardContent
  });

  // 4. Certifications Section
  const certificationsHTML = generateSectionHTML({
    idPrefix: 'cert',
    title: 'Licenses & Certifications',
    subtitle: 'Professional <strong>credentials</strong> validating expertise and commitment to industry standards.',
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
          <a href="${getEntityUrl(intern.company)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${intern.company}">
            <img src="${getLogo(intern.company, '')}" alt="${intern.company} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
          </a>
        </div>
        <div class="experience-company-details">
          <h3 class="experience-job-title">${intern.title}</h3>
          <p class="experience-company-name">${intern.company}</p>
          <div class="experience-meta">
            <span class="experience-date">
              <ion-icon name="calendar-outline"></ion-icon>
              ${intern.startDate} - ${intern.endDate}
            </span>
            <span class="experience-location">
              <ion-icon name="location-outline"></ion-icon>
              ${intern.location}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="experience-card-content">
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
          <a href="${getEntityUrl(edu.institution)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${edu.institution}">
            <img src="${getLogo(edu.institution || edu.degree, '')}" alt="${edu.institution} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
          </a>
        </div>
        <div class="experience-company-details">
          <h3 class="experience-job-title">${edu.degree}</h3>
          <p class="experience-company-name">${edu.institution}</p>
          <div class="experience-meta">
            <span class="experience-date">
              <ion-icon name="calendar-outline"></ion-icon>
              ${edu.date}
            </span>
            <span class="experience-location">
              <ion-icon name="location-outline"></ion-icon>
              ${edu.location}
            </span>
          </div>
          ${edu.certificate ? `
            <div style="margin-top: 0.5rem;">
              <a href="${edu.certificate}" target="_blank" class="certificate-link">
                <ion-icon name="document-outline"></ion-icon> View Certificate
              </a>
            </div>` : ''}
        </div>
      </div>
    </div>

    ${edu.description ? `
    <div class="experience-card-content">
      <div class="experience-section">
        <h4 class="experience-section-title">
          <ion-icon name="school-outline"></ion-icon>
          Education Highlights
        </h4>
        <ul class="experience-points">
          ${edu.description.map(point => `<li class="experience-point">${point}</li>`).join('')}
        </ul>
      </div>
    </div>` : ''}
  `;
}

// --- Helper: Render Card Content for Certifications ---
export function renderCertificationCardContent(cert) {
  const isExpired = cert.expires && new Date(cert.expires) < new Date();
  return `
    <div class="experience-card-header">
      <div class="experience-company-info">
        <div class="experience-company-logo">
          <a href="${getEntityUrl(cert.issuingAuthority)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${cert.issuingAuthority}">
            <img src="${getLogo(cert.issuingAuthority, '')}" alt="${cert.issuingAuthority} logo" class="org-logo" loading="lazy" onerror="handleImageError(this)" />
          </a>
        </div>
        <div class="experience-company-details">
          <h3 class="experience-job-title">${cert.name}</h3>
          <p class="experience-company-name">${cert.issuingAuthority}</p>
          <div class="experience-meta">
             ${cert.id ? `<span class="experience-id"><ion-icon name="${cert.type === 'License' ? 'document-text-outline' : 'ribbon-outline'}"></ion-icon> ID: ${cert.id}</span>` : ''}
             ${cert.issued ? `<span class="experience-date"><ion-icon name="calendar-outline"></ion-icon> Issued: ${cert.issued}</span>` : ''}
             ${cert.expires ? `<span class="experience-date" style="${isExpired ? 'color: #ef4444;' : ''}"><ion-icon name="time-outline" style="${isExpired ? 'color: #ef4444;' : ''}"></ion-icon> ${isExpired ? 'Expired: ' + cert.expires : 'Expires: ' + cert.expires}</span>` : ''}
             ${cert.location ? `<span class="experience-location"><ion-icon name="location-outline"></ion-icon> ${cert.location}</span>` : ''}
          </div>
           ${cert.pdfUrl ? `
            <div style="margin-top: 0.5rem;">
              <a href="${cert.pdfUrl}" target="_blank" class="certificate-link">
                <ion-icon name="document-outline"></ion-icon> View Credential
              </a>
            </div>` : ''}
        </div>
      </div>
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
  renderCard      // Function(item) -> html string (for content)
}) {

  // 1. Grid View (Sidebar) - ACTIVE by default
  const gridViewHtml = `
    <div class="section-view-container active" id="${idPrefix}-grid-view">
      <div class="section-tabs-wrapper">
        <div class="section-sidebar-list">
          ${items.map((item, i) => `
            <button class="section-sidebar-btn ${i === 0 ? 'active' : ''}" 
                    data-tab-group="${idPrefix}" 
                    data-tab-index="${i}">
              <span class="sidebar-btn-title">${getItemTitle(item)}</span>
              <span class="sidebar-btn-subtitle">${getItemSubtitle(item)}</span>
            </button>
          `).join('')}
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

  // 2. List View - Hidden by default
  const listViewHtml = `
    <div class="section-view-container" id="${idPrefix}-list-view">
      <div class="experience-container">
        ${items.map((item) => `
          <div class="experience-card">
            ${renderCard(item)}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return `
    <header>
      <div class="section-header-flex ${isFirst ? 'first-section' : ''}">
        <h2 class="h2 article-title">${title}</h2>
        ${isFirst ? `
        <div class="section-view-controls">
          <button class="view-toggle-btn" data-target-group="experience-all" data-view="list">
            <ion-icon name="list-outline"></ion-icon> <span class="view-text">List</span>
          </button>
          <button class="view-toggle-btn active" data-target-group="experience-all" data-view="grid">
            <ion-icon name="grid-outline"></ion-icon> <span class="view-text">Grid</span>
          </button>
        </div>
        ` : ''}
      </div>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </header>
    ${gridViewHtml}
    ${listViewHtml}
  `;
}