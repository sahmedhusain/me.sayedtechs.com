import { getData } from '../constants/index.js';
import { t, isRTL as checkRTL } from '../constants/i18n.js';

export function generateTimelineSVG(filter = 'all') {
  const data = getData();
  const isRTL = checkRTL();
  const journey = data.professionalJourney;
  const allItems = [
    ...journey.education.map(item => ({ ...item, category: 'education' })),
    ...journey.internships.map(item => ({ ...item, category: 'internships' })),
    ...journey.career.map(item => ({ ...item, category: 'career' })),
    ...journey.certifications.map(item => ({ ...item, category: 'certifications', startDate: item.date, endDate: null }))
  ];

  const filteredItems = filter === 'all' ? allItems : allItems.filter(item => item.category === filter);
  if (filteredItems.length === 0) return '';

  // Dynamic year calculation based on filtered items
  let startYear = 2012;
  let endYear = 2027;

  if (filter !== 'all' && filteredItems.length > 0) {
    const years = filteredItems.map(item => new Date(item.startDate || item.date).getFullYear());
    const endYears = filteredItems.map(item => {
      if (item.current || !item.endDate) return new Date().getFullYear();
      return new Date(item.endDate).getFullYear();
    });

    startYear = Math.min(...years);
    endYear = Math.max(...endYears) + 1;

    if (startYear === endYear) {
      startYear -= 1;
      endYear += 1;
    }
  }
  const svgWidth = 1800;
  const svgHeight = 750;
  const margin = isRTL
    ? { top: 150, right: 350, bottom: 50, left: 100 }
    : { top: 150, right: 100, bottom: 50, left: 280 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const getXPosition = (dateStr) => {
    if (!dateStr) return isRTL ? margin.left + chartWidth : margin.left;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return isRTL ? margin.left + chartWidth : margin.left;
    const totalTime = new Date(endYear, 0, 1).getTime() - new Date(startYear, 0, 1).getTime();
    const currentTime = date.getTime() - new Date(startYear, 0, 1).getTime();
    const progress = Math.max(0, Math.min(1, currentTime / totalTime));

    // In RTL, 0 progress (start date) is on the RIGHT (margin.left + chartWidth)
    // 1 progress (end date) is on the LEFT (margin.left)
    return isRTL
      ? margin.left + ((1 - progress) * chartWidth)
      : margin.left + (progress * chartWidth);
  };

  const getYPosition = (item) => {
    if (filter !== 'all') return margin.top + (chartHeight / 2);
    const categories = ['education', 'internships', 'career', 'certifications'];
    const index = categories.indexOf(item.category);
    return margin.top + ((index + 1) * (chartHeight / 5));
  };

  return `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" class="timeline-svg" overflow="visible">
      <defs>
        <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Time Grid -->
      ${Array.from({ length: (endYear - startYear) + 1 }, (_, i) => {
    const year = startYear + i;
    const x = getXPosition(`${year}-01-01`);
    const xHalf = getXPosition(`${year}-07-01`);
    return `
          <!-- Full Year Line -->
          <line x1="${x}" y1="${margin.top - 40}" x2="${x}" y2="${margin.top + chartHeight + 40}" 
                stroke="var(--accent)" stroke-width="1.2" opacity="0.2" />
          <text x="${x}" y="${margin.top - 60}" text-anchor="middle" fill="var(--text-primary)" 
                font-size="22" font-weight="800" font-family="var(--font-mono)" opacity="0.9">${year}</text>
          
          <!-- Mid-Year Line -->
          ${(() => {
        if (year >= endYear) return '';
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const midLineColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.25)';
        return `<line x1="${xHalf}" y1="${margin.top - 40}" x2="${xHalf}" y2="${margin.top + chartHeight + 40}" 
                          stroke="${midLineColor}" stroke-width="1.5" stroke-dasharray="2,4" />`;
      })()}
        `;
  }).join('')}

      <!-- Category Tracks -->
      ${(() => {
      const categories = [
        { key: 'education', label: t('journey.filters.education') },
        { key: 'internships', label: t('journey.filters.internships') },
        { key: 'career', label: t('journey.filters.career') },
        { key: 'certifications', label: t('journey.filters.certifications') }
      ];

      if (filter === 'all') {
        return categories.map((cat, i) => {
          const y = margin.top + ((i + 1) * (chartHeight / 5));
          const lineX1 = 60;
          const lineX2 = svgWidth - 60;
          const labelX = isRTL ? svgWidth - 60 : 60;
          const labelAnchor = 'start';
          return `
                <line x1="${lineX1}" y1="${y}" x2="${lineX2}" y2="${y}" 
                      stroke="var(--text-secondary)" stroke-width="1.5" opacity="0.3" />
                <text x="${labelX}" y="${y - 15}" text-anchor="${labelAnchor}" dominant-baseline="middle" 
                      fill="var(--text-primary)" font-size="20" font-weight="800" opacity="1">${cat.label}</text>
              `;
        }).join('');
      } else {
        const activeCat = categories.find(c => c.key === filter);
        const label = activeCat ? activeCat.label : filter;
        const y = margin.top + chartHeight / 2;
        const lineX1 = 60;
        const lineX2 = svgWidth - 60;
        const labelX = isRTL ? svgWidth - 60 : 60;
        const labelAnchor = 'start';
        return `
              <line x1="${lineX1}" y1="${y}" x2="${lineX2}" y2="${y}" 
                    stroke="var(--text-secondary)" stroke-width="1.5" opacity="0.3" />
              <text x="${labelX}" y="${y - 15}" text-anchor="${labelAnchor}" dominant-baseline="middle" 
                    fill="var(--text-primary)" font-size="20" font-weight="800" opacity="1">${label}</text>
            `;
      }
    })()}

      <!-- Data Layer -->
      ${filteredItems.map(item => {
      const startX = getXPosition(item.startDate || item.date);
      const y = getYPosition(item);
      const isCurrent = item.current || (!item.endDate && new Date() < new Date(item.endDate));
      const colorMap = {
        education: '#2980b9',
        internships: '#e67e22',
        career: '#27ae60',
        certifications: '#d63031'
      };
      const color = colorMap[item.category] || 'var(--accent)';
      const isBar = ['education', 'internships', 'career'].includes(item.category);
      const endX = isBar && item.endDate ? getXPosition(item.endDate) : (isCurrent ? getXPosition(new Date()) : startX);

      const formatShortDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { month: 'short', year: 'numeric' });
      };

      if (isBar) {
        // In RTL, startX > endX if startDate < endDate
        const x = isRTL ? endX : startX;
        const barWidth = Math.abs(endX - startX);
        const barHeight = 22;
        const start = formatShortDate(item.startDate || item.date);
        const end = isCurrent ? (isRTL ? 'للحين' : 'Present') : formatShortDate(item.endDate);
        const dateRange = `${start} — ${end}`;

        return `
              <g class="timeline-bar-group timeline-item-trigger" 
                 data-title="${item.title}" 
                 data-subtitle="${item.company || item.institution || item.issuer || ''}" 
                 data-date="${dateRange}"
                 style="cursor: pointer;">
                <rect x="${x}" y="${y - (barHeight / 2)}" width="${Math.max(40, barWidth)}" height="${barHeight}" rx="${barHeight / 2}"
                      fill="${color}" opacity="${isCurrent ? '1' : '0.8'}" />
              </g>
            `;
      } else {
        return `
              <circle cx="${startX}" cy="${y}" r="11" fill="${color}" opacity="0.9" 
                      class="timeline-item-trigger"
                      data-title="${item.title}" 
                      data-subtitle="${item.company || item.institution || item.issuer || ''}" 
                      data-date="${formatShortDate(item.date)}"
                      style="cursor: pointer;" />
            `;
      }
    }).join('')}

      <!-- Vertical Current Date Marker -->
      ${(() => {
      const currentX = getXPosition(new Date().toISOString().split('T')[0]);
      return `<line x1="${currentX}" y1="${margin.top - 40}" x2="${currentX}" y2="${margin.top + chartHeight + 40}" 
                      stroke="#ff4d4d" stroke-width="3" stroke-dasharray="8,4" opacity="0.8" />`;
    })()}
    </svg>
`;
}

window.generateTimelineSVG = generateTimelineSVG;

export function renderProfessionalJourneySection() {
  const data = getData();
  const isRTL = checkRTL();
  const journey = data.professionalJourney;
  const svgContent = window.generateTimelineSVG('all');

  return `
    <header class="animate-entry" style="margin-bottom: 1.2rem; text-align: ${isRTL ? 'right' : 'left'}; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('journey.title')}
      </h1>
      <p class="section-subtitle" style="font-size: 1.15rem; line-height: 1.7; color: var(--text-secondary); max-width: 850px; font-family: var(--font-sans); margin-left: ${isRTL ? 'auto' : '0'};">
        ${t('journey.subtitle')}
      </p>
    </header>
    <section class="professional-journey" id="professional-journey">
      <div class="journey-filters navbar-style-pill animate-entry" style="width: fit-content; margin: 0 auto 2.5rem; animation-delay: 0.1s;">
        <div class="pill-indicator"></div>
        <div class="pill-indicator-hover"></div>
        <button class="pill-btn active" data-filter="all">
          <ion-icon name="apps-outline"></ion-icon>
          <span class="filter-text">${t('journey.filters.all')}</span>
        </button>
        <button class="pill-btn" data-filter="education">
          <ion-icon name="school-outline"></ion-icon>
          <span class="filter-text">${t('journey.filters.education')}</span>
        </button>
        <button class="pill-btn" data-filter="career">
          <ion-icon name="business-outline"></ion-icon>
          <span class="filter-text">${t('journey.filters.career')}</span>
        </button>
        <button class="pill-btn" data-filter="internships">
          <ion-icon name="briefcase-outline"></ion-icon>
          <span class="filter-text">${t('journey.filters.internships')}</span>
        </button>
        <button class="pill-btn" data-filter="certifications">
          <ion-icon name="ribbon-outline"></ion-icon>
          <span class="filter-text">${t('journey.filters.certifications')}</span>
        </button>
      </div>
      <div class="timeline-title-fixed animate-entry" style="animation-delay: 0.2s;">
        ${t('journey.timelineTitle')}
      </div>
      <div class="timeline-chart-container animate-entry" style="animation-delay: 0.25s;">
        ${svgContent}
      </div>
    </section>
  `;
}

export function initializeTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) {
    return;
  }

  // Clear the container before initializing
  container.innerHTML = '';

  try {
    const allItems = [
      ...(data.professionalJourney.education || []).map(item => ({ ...item, category: 'education', type: 'box' })),
      ...(data.professionalJourney.career || []).map(item => ({ ...item, category: 'career', type: 'box' })),
      ...(data.professionalJourney.internships || []).map(item => ({ ...item, category: 'internships', type: 'box' })),
      ...(data.professionalJourney.certifications || []).map(item => ({
        ...item,
        category: 'certifications',
        startDate: item.date, // Normalize 'date' to 'startDate'
        type: 'point'
      }))
    ];

    const items = new vis.DataSet(allItems.map((item, index) => {
      const logoHtml = item.logo ? `<img src="${item.logo}" class="timeline-logo" loading="lazy" onerror="handleImageError(this)">` : '';
      const subtitle = item.institution || item.company || item.issuer || '';
      const content = `<div class="tl-item">${logoHtml}<div class="tl-meta"><div class="tl-title">${item.title}</div>${subtitle ? `<div class="tl-sub">${subtitle}</div>` : ''}</div></div>`;
      return {
        id: index,
        content,
        start: item.startDate,
        end: item.endDate,
        className: item.category,
        group: item.category,
      };
    }));

    const groups = new vis.DataSet([
      { id: 'career', content: 'Career' },
      { id: 'education', content: 'Education' },
      { id: 'internships', content: 'Internships' },
      { id: 'certifications', content: 'Certifications' },
    ]);

    const options = {
      stack: false,
      orientation: 'top',
      zoomMin: 1000 * 60 * 60 * 24 * 30 * 6, // 6 months
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 20, // 20 years
      min: new Date(2014, 0, 1),
      max: new Date(2027, 0, 1),
    };

    const timeline = new vis.Timeline(container, items, groups, options);
  } catch (err) {
  }
}