import { data } from '../data.js';
import { iconMap, normalize, makeAcronym, renderTechLogos, getIconForCoreItem, getIconForLibraryItem, getCategoryIcon, getIconForPersonalSkill, getIconForCSConcept, renderInteractiveTechLogos, renderSkillBadges } from '../icons.js';

export function renderSkillsSection() {
  const categories = [
    { title: 'Personal Skills', icon: '<ion-icon name="person-outline"></ion-icon>', items: data.personalSkills, isTech: false, type: 'personal' },
    { title: 'Computer Science Concepts', icon: '<ion-icon name="bulb-outline"></ion-icon>', items: data.technicalSkills.computerScienceConcepts, isTech: false, type: 'concepts' },
    { title: 'Engineering Software', icon: '<ion-icon name="build-outline"></ion-icon>', items: data.technicalSkills.engineeringSoftware, isTech: true, type: 'software' },
    { title: 'Languages', icon: '<ion-icon name="code-slash-outline"></ion-icon>', items: data.technicalSkills.languages, isTech: true, type: 'languages' },
    { title: 'Web Technologies', icon: '<ion-icon name="globe-outline"></ion-icon>', items: data.technicalSkills.webTechnologies, isTech: true, type: 'web' },
    { title: 'Tools', icon: '<ion-icon name="settings-outline"></ion-icon>', items: data.technicalSkills.tools, isTech: true, type: 'tools' },
    { title: 'Systems', icon: '<ion-icon name="desktop-outline"></ion-icon>', items: data.technicalSkills.systems, isTech: true, type: 'systems' },
    // { title: 'Core Engineering', icon: '<ion-icon name="construct-outline"></ion-icon>', items: data.technicalSkills.coreEngineering, isTech: false, type: 'engineering' }
  ];

  // Dynamic stats
  const numLanguages = data.technicalSkills.languages.length;
  const numWebTech = data.technicalSkills.webTechnologies.length;
  const numEngTools = data.technicalSkills.engineeringSoftware.length;

  // Calculate total months of professional experience and convert to years (rounded to 1 decimal)
  function parseDate(str, fallbackToStart) {
    if (!str) return null;
    const parts = str.split('—').map(s => s.trim());
    let dateStr = fallbackToStart ? parts[0] : (parts[1] || parts[0]);

    // Manual parsing for "Month YYYY" to support all browsers/mobile
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11,
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const partsDate = dateStr.split(' ');
    if (partsDate.length === 2) {
      const monthStr = partsDate[0];
      const yearStr = partsDate[1];
      if (months[monthStr] !== undefined && !isNaN(yearStr)) {
        return new Date(parseInt(yearStr), months[monthStr], 1);
      }
    }

    // Fallback for just Year or other formats
    let d = new Date(dateStr);
    if (isNaN(d)) {
      const yearMatch = dateStr.match(/\d{4}/);
      if (yearMatch) d = new Date(parseInt(yearMatch[0], 10), fallbackToStart ? 0 : 11, 1);
    }
    return isNaN(d) ? null : d;
  }

  let totalMonths = 0;
  if (Array.isArray(data.experience)) {
    data.experience.forEach(exp => {
      if (exp.date) {
        const start = parseDate(exp.date, true);

        let end;
        // Check if end date is "Present"
        const dateParts = exp.date.split('—').map(s => s.trim());
        if (dateParts[1] && dateParts[1].toLowerCase() === 'present') {
          end = new Date();
        } else {
          end = parseDate(exp.date, false) || new Date(); // Fallback to now if parse fails but logic handled in parseDate usually
        }

        if (start && end && end > start) {
          const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
          totalMonths += months;
        }
      }
    });
  }

  // Calculate distinct total years (overlap handling is complex, but simple sum might be desired if roles are concurrent)
  // Given the resume, roles seem sequential. 
  // 6.5 years is correct sum.

  const yearsExp = totalMonths > 0 ? (totalMonths / 12).toFixed(1) + '+' : '1+'; // Changed to 1 decimal for accuracy? Or just floor?
  // User wants "Years", usually integer. Let's stick to Math.floor or toFixed(1) if they want precision.
  // The original code was: (totalMonths / 12) + (mod > 0 ? '+' : '')
  // Let's keep it but ensure calculation is correct.

  // Let's use Math.floor(years) but the bug was the input data.
  const yearsDisplay = totalMonths > 0 ? Math.floor(totalMonths / 12) : 0;
  const showPlus = (totalMonths % 12) > 0;
  const finalDisplay = yearsDisplay + (showPlus ? '+' : '');

  return `
    <header>
      <h2 class="h2 article-title">Skills & Technologies</h2>
      <p class="section-subtitle">Explore my <strong>technical expertise</strong> – from programming languages and engineering tools to the skills that power my innovative solutions.</p>
    </header>
    <section class="skills">
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
      <div class="skills-stats">
        <div class="stat-item">
          <div class="stat-number" data-target="${numLanguages}">0</div>
          <div class="stat-label">Programming Languages</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="${numWebTech}">0</div>
          <div class="stat-label">Web Technologies</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="${numEngTools}">0</div>
          <div class="stat-label">Engineering Tools</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="${yearsDisplay}">${finalDisplay}</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </section>
  `;
}