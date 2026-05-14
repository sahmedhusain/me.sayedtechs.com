import { getData } from '../constants/index.js';
import { t } from '../constants/i18n.js';
import { renderInteractiveTechLogos, renderSkillBadges } from '../data/icons.js';
import { SKILLS_CATEGORY_MAPPING, SKILLS_CATEGORY_ICONS, SKILLS_PRIORITY_ORDER } from '../constants/config.js';

export function renderSkillsSection() {
  const data = getData();

  // Build categories dynamically from technicalSkillsFull
  const categories = [];

  // Add personal skills first
  if (data.personalSkills && data.personalSkills.length > 0) {
    categories.push({
      title: t('skills.categories.personal'),
      icon: 'person-outline',
      items: data.personalSkills,
      isTech: false,
      type: 'personal'
    });
  }

  // Add technical skill categories dynamically
  if (data.technicalSkillsFull && typeof data.technicalSkillsFull === 'object') {
    for (const [key, items] of Object.entries(data.technicalSkillsFull)) {
      if (Array.isArray(items) && items.length > 0) {
        const isNonTechCategory = SKILLS_PRIORITY_ORDER.includes(key) && key !== 'personal';
        categories.push({
          title: t(`skills.categories.${key}`),
          icon: SKILLS_CATEGORY_ICONS[key],
          items,
          isTech: !isNonTechCategory,
          type: key
        });
      }
    }
  }

  // Filter out empty categories
  const validCategories = categories.filter(cat => cat.items && cat.items.length > 0).map(cat => {
    // Extract skill names from objects if they have a 'name' property
    const items = cat.items.map(item =>
      typeof item === 'string' ? item : item.name
    );
    return { ...cat, items };
  });

  // Sort categories: Personal, Hardware, and CS first, then others
  validCategories.sort((a, b) => {
    const aIndex = SKILLS_PRIORITY_ORDER.indexOf(a.type);
    const bIndex = SKILLS_PRIORITY_ORDER.indexOf(b.type);
    
    // If both are in priority list, sort by their order in list
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // If only a is in priority list, it comes first
    if (aIndex !== -1) return -1;
    // If only b is in priority list, it comes first
    if (bIndex !== -1) return 1;
    
    return 0; // Maintain original relative order for others
  });

  return `
    <header id="skills-section" class="animate-entry" style="margin-bottom: 2rem; animation-delay: 0s;">
      <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; font-family: var(--font-sans); position: relative; letter-spacing: -0.02em;">
        ${t('skills.title')}
      </h1>
    </header>
    <section class="skills">
      <div class="skills-grid">
        ${validCategories.map((cat, index) => `
          <div class="skills-card" data-type="${cat.type}" style="animation-delay: ${index * 0.1}s">
            <div class="skill-card-header">
              <div class="skill-icon-container">
                <div class="skill-icon-glow"></div>
                <span class="skill-icon"><ion-icon name="${cat.icon}"></ion-icon></span>
              </div>
              <h4 class="skill-card-title">${cat.title}</h4>
            </div>
            <div class="skill-card-content">
              ${cat.isTech ? renderInteractiveTechLogos(cat.items, cat.type) : renderSkillBadges(cat.items, cat.type)}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}