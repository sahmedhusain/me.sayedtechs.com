import { data } from '../data.js';

export function generateTimelineSVG(filter = 'all') {
  const journey = data.professionalJourney;
  const allItems = [
    ...journey.education.map(item => ({ ...item, category: 'education' })),
    ...journey.internships.map(item => ({ ...item, category: 'internships' })),
    ...journey.career.map(item => ({ ...item, category: 'career' })),
    ...journey.certifications.map(item => ({ ...item, category: 'certifications', startDate: item.date, endDate: null }))
  ];

  const filteredItems = filter === 'all' ? allItems : allItems.filter(item => item.category === filter);

  if (filteredItems.length === 0) return '';

  let startYear = 2012;
  if (filter !== 'all' && filteredItems.length > 0) {
    const dates = filteredItems.map(item => new Date(item.startDate || item.date).getTime()).filter(d => !isNaN(d));
    if (dates.length > 0) {
      startYear = new Date(Math.min(...dates)).getFullYear();
    }
  }

  const currentYear = new Date().getFullYear();
  let endYear = currentYear + 1;

  if (filter !== 'all' && filter !== 'career' && filteredItems.length > 0) {
    const hasCurrent = filteredItems.some(item => item.current || (item.endDate && new Date(item.endDate) >= new Date()));
    if (!hasCurrent) {
      const dates = filteredItems.map(item => {
        const d = item.endDate || item.startDate || item.date;
        return d ? new Date(d).getTime() : 0;
      }).filter(d => d > 0 && !isNaN(d));

      if (dates.length > 0) {
        endYear = new Date(Math.max(...dates)).getFullYear() + 1;
      }
    }
  }

  const totalYears = endYear - startYear;
  const totalIntervals = totalYears * 2;
  const svgWidth = 1800;
  let svgHeight = 450;
  if (filter !== 'all') {
    svgHeight = 300;
  }
  const margin = { top: 100, right: 120, bottom: 40, left: 160 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const getXPosition = (dateStr) => {
    if (!dateStr) return margin.left;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return margin.left;
    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 0, 1);
    const totalTime = endDate.getTime() - startDate.getTime();
    const currentTime = date.getTime() - startDate.getTime();
    const progress = Math.max(0, Math.min(1, currentTime / totalTime));
    return margin.left + (progress * chartWidth);
  };

  const getYPosition = (index, total, item) => {
    if (filter !== 'all') {
      return margin.top + (chartHeight / 2);
    }
    const categoryOrder = ['education', 'internships', 'career', 'certifications'];
    const categoryIndex = categoryOrder.indexOf(item.category) + 1;
    return margin.top + (categoryIndex * (chartHeight / 5));
  };

  return `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" class="timeline-svg">
      <rect width="${svgWidth}" height="${svgHeight}" fill="url(#timelineGradient)" rx="15" ry="15" opacity="0.1"/>
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left + chartWidth}" y2="${margin.top}"
            stroke="url(#mainTimelineGradient)" stroke-width="4" opacity="0.8" filter="url(#shadow)">
        <animate attributeName="stroke-dasharray" values="0,${chartWidth};${chartWidth},0" dur="2s" fill="freeze"/>
      </line>
      ${Array.from({ length: totalIntervals * 2 + 1 }, (_, i) => {
    const year = startYear + Math.floor(i / 4);
    const quarter = i % 4;
    const month = ['01', '04', '07', '10'][quarter];
    const x = getXPosition(`${year}-${month}-01`);
    const isYearStart = quarter === 0;
    return `
          <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}"
            stroke="var(--text-secondary)" stroke-width="${isYearStart ? '2' : '1'}"
            opacity="${isYearStart ? '0.25' : '0.15'}" class="grid-line-vertical"/>
        `;
  }).join('')}
      ${filter === 'all' ? Array.from({ length: 6 }, (_, i) => {
    const y = margin.top + (i * (chartHeight / 5));
    return `
          <line x1="${margin.left}" y1="${y}" x2="${margin.left + chartWidth}" y2="${y}"
                stroke="var(--text-secondary)" stroke-width="1" opacity="0.1" class="grid-line-horizontal"/>
        `;
  }).join('') : `
          <line x1="${margin.left}" y1="${margin.top + chartHeight / 2}" x2="${margin.left + chartWidth}" y2="${margin.top + chartHeight / 2}"
                stroke="var(--text-secondary)" stroke-width="1" opacity="0.1" class="grid-line-horizontal"/>
  `} 
      ${filter === 'all' ? ['Education', 'Internships', 'Career', 'Certifications'].map((cat, i) => {
    const y = margin.top + ((i + 1) * (chartHeight / 5));
    return `<text x="${margin.left - 15}" y="${y}" text-anchor="end" dominant-baseline="middle" fill="var(--text-secondary)" font-size="14" font-family="var(--font-sans)" font-weight="500">${cat}</text>`;
  }).join('') :
      `<text x="${margin.left - 15}" y="${margin.top + chartHeight / 2}" text-anchor="end" dominant-baseline="middle" fill="var(--text-secondary)" font-size="14" font-family="var(--font-sans)" font-weight="500">${filter.charAt(0).toUpperCase() + filter.slice(1)}</text>`
    }
      ${Array.from({ length: totalIntervals * 2 + 1 }, (_, i) => {
      const year = startYear + Math.floor(i / 4);
      const quarter = i % 4;
      const month = ['01', '04', '07', '10'][quarter];
      const x = getXPosition(`${year}-${month}-01`);
      const isYearStart = quarter === 0;
      return isYearStart ? `
          <g class="year-marker">
            <line x1="${x}" y1="${margin.top - 15}" x2="${x}" y2="${margin.top + 15}" stroke="var(--text-secondary)" stroke-width="2" opacity="0.5"/>
            <circle cx="${x}" cy="${margin.top}" r="4" fill="var(--accent)" opacity="0.7"/>
            <text x="${x}" y="${margin.top - 25}" text-anchor="middle" fill="var(--text-primary)" font-size="14" font-weight="700" font-family="var(--font-mono)">${year}</text>
          </g>
        ` : '';
    }).join('')}
      ${filteredItems.map((item, index) => {
      const dateToUse = item.startDate || item.date;
      const x = getXPosition(dateToUse);
      let y = getYPosition(index, filteredItems.length, item);
      const isCurrent = item.current || (!item.endDate && new Date() < new Date(item.endDate));
      const categoryColors = {
        education: '#ffffff',
        internships: '#ffab91',
        career: '#81c784',
        certifications: '#ffb74d'
      };
      const color = categoryColors[item.category] || '#ffffff';
      const isBarItem = ['education', 'internships', 'career'].includes(item.category);
      const endX = isBarItem && item.endDate ? getXPosition(item.endDate) : x;

      return `
          ${isBarItem ? `
          <rect x="${x}" y="${y - 8}" width="${endX - x}" height="16" rx="12"
                fill="${color}" stroke="var(--primary)" stroke-width="2"
                class="timeline-bar ${item.category} ${isCurrent ? 'current' : ''}"
                data-category="${item.category}" 
                data-title="${item.title}"
                data-subtitle="${item.company || item.institution || item.issuer || ''}"
                data-start-date="${item.startDate || item.date}"
                data-end-date="${item.endDate || ''}"
                filter="url(#glow)" opacity="0.8">
            <animate attributeName="width" values="0;${endX - x}" dur="1s" begin="${index * 0.1 + 0.3}s" fill="freeze" />
          </rect>
          ` : ''}
          ${!isBarItem ? `
          <circle cx="${x}" cy="${y}" r="${isCurrent ? '12' : '10'}"
                  fill="${color}" stroke="var(--primary)" stroke-width="3"
                  class="timeline-dot ${item.category} ${isCurrent ? 'current' : ''}"
                  data-category="${item.category}" 
                data-title="${item.title}"
                data-subtitle="${item.company || item.institution || item.issuer || ''}"
                data-start-date="${item.startDate || item.date}"
                data-end-date="${item.endDate || ''}"
                filter="url(#glow)">
            <animate attributeName="r" values="${isCurrent ? '12;14;12' : '10;12;10'}" dur="2.5s" repeatCount="indefinite" />
          </circle>
          ` : ''}
        `;
    }).join('')}
      ${(() => {
      const now = new Date();
      const currentX = getXPosition(now.toISOString().split('T')[0]);
      return `
          <g class="current-date-line-debug">
            <defs>
              <filter id="currentDateGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <line x1="${currentX}" y1="${margin.top}" x2="${currentX}" y2="${margin.top + chartHeight}"
              stroke="#ffffff" stroke-width="1" filter="url(#currentDateGlow)"
              opacity="0.55" class="current-date-indicator" />
          </g>
        `;
    })()}
      <text x="${svgWidth / 2}" y="20" text-anchor="middle" fill="var(--text-primary)" font-size="16" font-family="var(--font-sans)" font-weight="bold" class="timeline-title">Professional Timeline</text>
    </svg>
  `;
}

window.generateTimelineSVG = generateTimelineSVG;

export function renderProfessionalJourneySection() {
  const journey = data.professionalJourney;
  const svgContent = window.generateTimelineSVG('all');

  return `
    <header style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
      <div>
        <h2 class="h2 article-title">Professional Journey</h2>
        <p class="section-subtitle">Explore my professional timeline – from <strong>education</strong> and internships to career milestones and certifications that shaped my expertise. <a href="/journey" data-nav-link="journey" class="journey-link">View Full Journey Details</a></p>
      </div>
      <button class="action-btn primary" id="download-cv-btn" style="padding: 0.6rem 1.2rem; border-radius: var(--radius-md); background: var(--accent); color: white; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-weight: 500; font-size: 0.95rem;">
        <ion-icon name="download-outline" style="font-size: 1.2rem;"></ion-icon>
        <span>Download Resume</span>
      </button>
    </header>
    <section class="professional-journey" id="professional-journey">
      <div class="journey-filters">
        <button class="filter-btn active" data-filter="all">
          <ion-icon name="apps-outline" style="font-size: 1.2em; vertical-align: middle; color: var(--accent);"></ion-icon>
          <span class="filter-text" style="margin-left: 0.4em;">All</span>
        </button>
        <button class="filter-btn" data-filter="education">
          <ion-icon name="school-outline" style="font-size: 1.2em; vertical-align: middle; color: #ffffff;"></ion-icon>
          <span class="filter-text" style="margin-left: 0.4em;">Education</span>
        </button>
        <button class="filter-btn" data-filter="career">
          <ion-icon name="business-outline" style="font-size: 1.2em; vertical-align: middle; color: #81c784;"></ion-icon>
          <span class="filter-text" style="margin-left: 0.4em;">Career</span>
        </button>
        <button class="filter-btn" data-filter="internships">
          <ion-icon name="briefcase-outline" style="font-size: 1.2em; vertical-align: middle; color: #ffab91;"></ion-icon>
          <span class="filter-text" style="margin-left: 0.4em;">Internships</span>
        </button>
        <button class="filter-btn" data-filter="certifications">
          <ion-icon name="ribbon-outline" style="font-size: 1.2em; vertical-align: middle; color: #ffb74d;"></ion-icon>
          <span class="filter-text" style="margin-left: 0.4em;">Certifications</span>
        </button>
      </div>
      <div class="timeline-chart-container">
        ${svgContent}
      </div>
    </section>
  `;
}

export function initializeTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) {
    console.error('Timeline container not found!');
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
    console.log('Timeline initialized with dynamic data');
  } catch (err) {
    console.error('Error initializing timeline:', err);
  }
}