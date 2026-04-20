import { data } from '../data.js';
import { iconMap, makeAcronym, renderTechLogos, getIconForCoreItem, getIconForLibraryItem, getCategoryIcon, getIconForPersonalSkill, getIconForCSConcept, renderInteractiveTechLogos, renderSkillBadges } from '../icons.js';

export function getIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('repository')) return 'logo-github';
  if (lower.includes('thesis')) return 'school-outline';
  if (lower.includes('poster')) return 'document-outline';
  return 'open-outline';
}

export function renderProjectsSection() {
  // Map common tech names to Devicon classes
  const categories = ['All', 'Web Development', 'Engineering', 'Games', 'CLI/Algorithms', 'UI concepts'];
  const projects = data.projects.map(p => {
    const name = (p.name || '').toLowerCase();
    const tech = Array.isArray(p.tech) ? p.tech.map(t => String(t).toLowerCase()) : [];

    const isSpaceBlaster = /space\s*blaster/.test(name);
    const isCliAlgo = (/^(gotalk|antfinder)$/.test(name) || tech.some(t => /(cli|algorithms|dfs|graph|tcp)/.test(t)));
    const isEngineering = tech.some(t => /arduino/.test(t));
    const isWebDev = tech.some(t => /(go|react|javascript|html5|css3)/.test(t));

    // Explicit web overrides per request
    const forceWeb = (/gigabit/.test(name) || /(^|\s)01\s*dashboard/.test(name));

    let category = 'Web Development';
    if (isSpaceBlaster) category = 'Games';
    else if (forceWeb) category = 'Web Development';
    else if (isCliAlgo) category = 'CLI/Algorithms';
    else if (isEngineering) category = 'Engineering';
    else if (isWebDev) category = 'Web Development';

    return { ...p, category };
  });

  return `
    <header>
      <h2 class="h2 article-title">Project Showcase</h2>
    </header>
    
    <p class="section-subtitle">Explore my portfolio – from <strong>web applications</strong> and engineering solutions to innovative tools that showcase my technical expertise and problem-solving skills.</p>
    
    <ul class="filter-list">
      ${categories.map((cat, i) => {
    const iconMap = {
      'All': 'grid-outline',
      'Web Development': 'globe-outline',
      'Engineering': 'construct-outline',
      'Games': 'game-controller-outline',
      'CLI/Algorithms': 'terminal-outline',
      'UI concepts': 'color-palette-outline'
    };
    return `
        <li class="filter-item">
          <button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter-btn="${cat.toLowerCase()}">
            <ion-icon name="${iconMap[cat] || 'grid-outline'}"></ion-icon>
            <span class="filter-text">${cat}</span>
          </button>
        </li>
      `}).join('')}
    </ul>
    <ul class="project-list">
      ${projects.map(project => `
        <li class="project-item active" data-filter-item data-category="${project.category.toLowerCase().replace(' ', '')}">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="${getCategoryIcon(project.category)}"></ion-icon>
              </div>
            </figure>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-category">${project.category}</p>
            <div class="project-meta">
              ${project.points.length > 0 ? `
                <ul class="project-description-list">
                  ${project.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
              ` : ''}
              <button class="read-more-btn"><span>Read</span> <ion-icon name="chevron-down-outline"></ion-icon></button>
              <div class="project-footer">
                <ul class="project-tech-logos" aria-label="Technology stack logos">
                  ${renderTechLogos(project.tech).logos}
                </ul>
                ${renderTechLogos(project.tech).libraries}
              </div>
            </div>
            <div class="project-links">
              ${project.links && project.links.length > 0 ? project.links.map(link => `<a href="${link.url}" target="_blank" class="project-link-btn"><ion-icon name="${getIcon(link.text)}"></ion-icon> ${link.text}</a>`).join('') : ''}
            </div>
        </li>
      `).join('')}
      <li class="project-item ui-concepts-coming-soon" data-filter-item data-category="uiconcepts">
        <div class="coming-soon-content">
          <div class="coming-soon-icon">
            <ion-icon name="color-palette-outline"></ion-icon>
          </div>
          <h3 class="coming-soon-title">UI Concepts</h3>
          <p class="coming-soon-text">Coming Soon</p>
          <div class="coming-soon-description">
            Exciting UI/UX design concepts and interactive prototypes are in development. Stay tuned for innovative user interface designs and experiences.
          </div>
        </div>
      </li>
    </ul>
  `;
}