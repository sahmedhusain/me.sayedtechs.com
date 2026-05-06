import { getData } from '../constants/index.js';
import { renderInteractiveTechLogos, renderSkillBadges } from '../data/icons.js';

export function renderSkillsSection() {
  const data = getData();
  const categories = [
    { title: 'Personal Skills', icon: '<ion-icon name="person-outline"></ion-icon>', items: data.personalSkills, isTech: false, type: 'personal' },
    { title: 'Computer Science Concepts', icon: '<ion-icon name="bulb-outline"></ion-icon>', items: data.technicalSkills.computerScienceConcepts, isTech: false, type: 'concepts' },
    { title: 'Engineering Software', icon: '<ion-icon name="build-outline"></ion-icon>', items: data.technicalSkills.engineeringSoftware, isTech: true, type: 'software' },
    { title: 'Languages', icon: '<ion-icon name="code-slash-outline"></ion-icon>', items: data.technicalSkills.languages, isTech: true, type: 'languages' },
    { title: 'Web Technologies', icon: '<ion-icon name="globe-outline"></ion-icon>', items: data.technicalSkills.webTechnologies, isTech: true, type: 'web' },
    { title: 'Tools', icon: '<ion-icon name="settings-outline"></ion-icon>', items: data.technicalSkills.tools, isTech: true, type: 'tools' },
    { title: 'Systems', icon: '<ion-icon name="desktop-outline"></ion-icon>', items: data.technicalSkills.systems, isTech: true, type: 'systems' },
  ];

  return `
    <section id="skills-section" class="skills" style="margin-top: 2rem;">
      <h3 class="h3 section-title" style="margin-bottom: 2rem;">Skills and Technologies</h3>
      <div class="skills-grid">
        ${categories.map((cat, index) => `
          <div class="skills-card" data-type="${cat.type}" style="animation-delay: ${index * 0.1}s">
            <div class="skill-card-header">
              <div class="skill-icon-container">
                <div class="skill-icon-glow"></div>
                <span class="skill-icon">${cat.icon}</span>
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