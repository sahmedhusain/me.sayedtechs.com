import { getData } from '../constants/index.js';
import { renderInteractiveTechLogos, renderSkillBadges } from '../data/icons.js';

export function renderSkillsSection() {
  const data = getData();
  const ui = data.ui_extras || {};
  const skillsUi = ui.skills || {};

  // Debug: check if technicalSkillsFull exists
  console.log('technicalSkillsFull:', data.technicalSkillsFull);

  // Map of actual property names to display titles
  const categoryMapping = {
    programmingAndMarkupLanguages: 'Programming & Markup Languages',
    frameworksAndLibraries: 'Frameworks & Libraries',
    databases: 'Databases',
    networkingWebAndProtocols: 'Networking, Web & Protocols',
    softwareDevOpsAndTools: 'Software, DevOps & Tools',
    operatingSystemsAndEnvironments: 'OS & Environments',
    testingAndCodeQuality: 'Testing & Code Quality',
    computerScienceAndArchitecture: 'Computer Science & Architecture',
    engineeringCadAndSimulation: 'Engineering CAD & Simulation',
    hardwareAndCoreEngineering: 'Hardware & Core Engineering',
    // Fallback mappings for whatever the actual structure is
    computerScienceConcepts: 'Computer Science Concepts',
    engineeringSoftware: 'Engineering Software',
    languages: 'Programming Languages',
    webTechnologies: 'Web Technologies',
    systemsAndTools: 'Systems & Tools'
  };

  const categoryIcons = {
    programmingAndMarkupLanguages: 'code-slash-outline',
    frameworksAndLibraries: 'library-outline',
    databases: 'server-outline',
    networkingWebAndProtocols: 'globe-outline',
    softwareDevOpsAndTools: 'construct-outline',
    operatingSystemsAndEnvironments: 'desktop-outline',
    testingAndCodeQuality: 'checkmark-circle-outline',
    computerScienceAndArchitecture: 'git-network-outline',
    engineeringCadAndSimulation: 'cube-outline',
    hardwareAndCoreEngineering: 'hardware-chip-outline',
    computerScienceConcepts: 'git-network-outline',
    engineeringSoftware: 'cube-outline',
    languages: 'code-slash-outline',
    webTechnologies: 'globe-outline',
    systemsAndTools: 'construct-outline'
  };

  // Build categories dynamically from technicalSkillsFull
  const categories = [];

  // Add personal skills first
  if (data.personalSkills && data.personalSkills.length > 0) {
    categories.push({
      title: skillsUi.categories?.personal || 'Personal Skills',
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
        categories.push({
          title: skillsUi.categories?.[key] || categoryMapping[key] || key,
          icon: categoryIcons[key] || 'layers-outline',
          items,
          isTech: true,
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

  return `
    <section id="skills-section" class="skills" style="margin-top: 2rem;">
      <h3 class="h3 section-title" style="margin-bottom: 2rem;">${skillsUi.title || 'Skills and Technologies'}</h3>
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
            <div class="skill-card-particles">
              ${Array.from({ length: 5 }, (_, i) => `<div class="particle" style="animation-delay: ${i * 0.2}s"></div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}