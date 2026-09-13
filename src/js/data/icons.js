import { iconMap } from '../constants/icon_map.js';

export { iconMap };

export const normalize = (t) => {
  let s = String(t || '').toLowerCase().trim();
  // Handle C++ special-case before stripping '+'
  // Using a more aggressive match for C++
  s = s.replace(/c\+\+/g, 'cplusplus');
  s = s.replace(/[()&,\-]/g, ' ') // Replace (), &, comma, and hyphen with space
  s = s.replace(/\+/g, ' ');
  s = s.replace(/\//g, ' ');
  s = s.replace(/\./g, '');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
};

export const makeAcronym = (t) => {
  const words = String(t || '').split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const letters = words.slice(0, 3).map(w => w[0].toUpperCase());
  return letters.join('') || String(t || '').slice(0, 2).toUpperCase();
};

export const renderTechLogos = (techArr = []) => {
  // Sort tech so logoed ones come first
  const sortedTech = techArr.slice().sort((a, b) => {
    const aHasLogo = !!iconMap[normalize(a)];
    const bHasLogo = !!iconMap[normalize(b)];
    if (aHasLogo && !bHasLogo) return -1;
    if (!aHasLogo && bHasLogo) return 1;
    return 0;
  });
  const logos = sortedTech.filter(orig => iconMap[normalize(orig)]).map(orig => {
    const key = normalize(orig);
    const entry = iconMap[key];
    let iconHtml;
    if (entry.type === 'img') {
      // Uniform size for all logos
      const size = 'width: 2rem; height: 2rem;';
      // Make specific logos invert dynamically based on theme
      const whiteSrcs = ['rust', 'socketdotio', 'github', 'jsonwebtokens', 'markdown', 'apple', 'dns', 'key', 'bash', 'framermotion', 'framer', 'ssh'];
      const isWhite = whiteSrcs.some(s => entry.src.includes(s));
      const filter = isWhite ? 'filter: var(--mono-logo-filter);' : '';
      iconHtml = `<img src="${entry.src}" alt="${orig}" class="tech-logo-svg" style="${size}${filter ? ' ' + filter : ''}" loading="lazy" />`;
    } else if (entry.type === 'devicon') {
      iconHtml = `<i class="devicon ${entry.class}"></i>`;
    } else if (entry.type === 'simple') {
      iconHtml = `<i class="${entry.class}"></i>`;
    } else if (entry.type === 'ion') {
      iconHtml = `<ion-icon name="${entry.class}"></ion-icon>`;
    } else if (entry.type === 'svg') {
      iconHtml = entry.svg;
    }
    return `<li class="project-tech-logo" title="${orig}">${iconHtml}</li>`;
  });
  const textsRaw = sortedTech.filter(orig => !iconMap[normalize(orig)]);
  const texts = textsRaw.map(orig => {
    return `<li title="${orig}"><ion-icon name="${getIconForLibraryItem(orig)}"></ion-icon> ${orig}</li>`;
  });
  let logosHtml = '';
  if (logos.length > 0) {
    logosHtml = logos.join('');
  }
  let librariesHtml = '';
  if (texts.length > 0) {
    librariesHtml = `<div class="project-libraries">
      <ul>${texts.join('')}</ul>
    </div>`;
  }
  return { logos: logosHtml, libraries: librariesHtml, rawLibraries: textsRaw };
};

export function getIconForCoreItem(item) {
  const s = normalize(item);
  if (s.includes('fire') || s.includes('حريق')) return 'shield-checkmark-outline';
  if (s.includes('installation') || s.includes('تمديدات') || s.includes('تركيبات')) return 'construct';
  if (s.includes('testing') || s.includes('فحص') || s.includes('اختبار')) return 'speedometer-outline';
  if (s.includes('solar') || s.includes('طاقة شمسية') || s.includes('شمسية')) return 'sunny';
  if (s.includes('power electronics') || s.includes('إلكترونيات الطاقة') || s.includes('إلكترونيات القوى')) return 'flash-outline';
  if (s.includes('digital circuits') || s.includes('دوائر رقمية') || s.includes('أردوينو')) return 'hardware-chip';
  if (s.includes('transmission') || s.includes('نقل')) return 'pulse';
  return 'settings-outline';
}

export function getIconForLibraryItem(item) {
  const lower = item.toLowerCase();
  if (lower.includes('api') || lower.includes('rest')) return 'link-outline';
  if (lower.includes('database') || lower.includes('sql') || lower.includes('postgresql') || lower.includes('mysql')) return 'server-outline';
  if (lower.includes('authentication') || lower.includes('jwt') || lower.includes('oauth')) return 'key-outline';
  if (lower.includes('websocket') || lower.includes('socket')) return 'radio-outline';
  if (lower.includes('algorithm') || lower.includes('sorting') || lower.includes('search')) return 'calculator-outline';
  if (lower.includes('data structure') || lower.includes('array') || lower.includes('tree')) return 'list-outline';
  if (lower.includes('framework') || lower.includes('react') || lower.includes('vue')) return 'layers-outline';
  if (lower.includes('library') || lower.includes('npm')) return 'library-outline';
  if (lower.includes('protocol') || lower.includes('http') || lower.includes('tcp')) return 'swap-horizontal-outline';
  if (lower.includes('network') || lower.includes('internet')) return 'wifi-outline';
  if (lower.includes('json') || lower.includes('xml')) return 'document-outline';
  if (lower.includes('git') || lower.includes('version control')) return 'git-branch-outline';
  if (lower.includes('docker') || lower.includes('container')) return 'cube-outline';
  if (lower.includes('cloud') || lower.includes('cloudflare') || lower.includes('aws') || lower.includes('azure')) return 'cloud-outline';
  if (lower.includes('testing') || lower.includes('jest') || lower.includes('mocha')) return 'checkmark-circle-outline';
  if (lower.includes('security') || lower.includes('encryption')) return 'shield-outline';
  if (lower.includes('performance') || lower.includes('optimization')) return 'speedometer-outline';
  if (lower.includes('ui') || lower.includes('ux ') || lower.includes('design')) return 'color-palette-outline';
  if (lower.includes('timeline') || lower.includes('timeline')) return 'time-outline';
  if (lower.includes('game development') || lower.includes('game engine')) return 'game-controller-outline';
  if (lower.includes('contact integration') || lower.includes('crm')) return 'people-outline';
  if (lower.includes('animation') || lower.includes('motion')) return 'play-outline';
  if (lower.includes('goroutines') || lower.includes('concurrency')) return 'sync-outline';
  if (lower.includes('file system') || lower.includes('filesystem')) return 'folder-outline';
  if (lower.includes('svg') || lower.includes('vector graphics')) return 'image-outline';
  if (lower.includes('mux') || lower.includes('gorilla mux')) return 'share-social-outline';
  if (lower.includes('session') || lower.includes('cookie')) return 'key-outline';
  if (lower.includes('led') || lower.includes('neopixel')) return 'bulb-outline';
  if (lower.includes('iot') || lower.includes('internet of things')) return 'hardware-chip-outline';
  if (lower.includes('hash') || lower.includes('encryption')) return 'lock-closed-outline';
  if (lower.includes('zero dependencies') || lower.includes('standalone')) return 'checkmark-outline';
  if (lower.includes('bcrypt') || lower.includes('password hashing')) return 'keypad-outline';
  if (lower.includes('file') || lower.includes('upload') || lower.includes('download')) return 'cloud-download-outline';
  if (lower.includes('channels') || lower.includes('message passing')) return 'chatbubbles-outline';
  if (lower.includes('pathfinding') || lower.includes('a*')) return 'navigate-outline';
  if (lower.includes('dfs') || lower.includes('depth first search')) return 'trail-sign-outline';
  if (lower.includes('bfs') || lower.includes('breadth first search')) return 'trail-sign-outline';
  if (lower.includes('traversal') || lower.includes('graph')) return 'git-compare-outline';
  if (lower.includes('text') || lower.includes('markdown')) return 'document-text-outline';

  return 'code-outline';
}

export function getCategoryIcon(category) {
  const iconMap = {
    'all': 'grid-outline',
    'systems': 'server-outline',
    'webdevelopment': 'globe-outline',
    'uiconcepts': 'color-palette-outline',
    'clialgorithms': 'terminal-outline',
    'games': 'game-controller-outline',
    'engineering': 'hardware-chip-outline'
  };
  return iconMap[category] || 'folder-outline';
}

export function getIconForPersonalSkill(skill) {
  const s = normalize(skill);
  const icons = {
    'adaptability': 'refresh',
    'مرن وأتأقلم مع التغيير': 'refresh',
    'communication': 'chatbubble',
    'تواصل فعال': 'chatbubble',
    'fast learner': 'school',
    'أتعلم بسرعة': 'school',
    'decision making': 'options',
    'سرعة اتخاذ القرار': 'options',
    'teamwork': 'people',
    'روح الفريق': 'people',
    'problem solving': 'bulb',
    'حل المشاكل المعقدة': 'bulb',
    'time management': 'time',
    'إدارة وتنظيم الوقت': 'time',
    'leadership': 'trophy',
    'شخصية قيادية': 'trophy',
    'training and development': 'book',
    'continuous learning': 'book',
    'شغف التعلم المستمر': 'book',
    'project management': 'folder',
    'إدارة المشاريع': 'folder'
  };
  return icons[s] || 'star';
}

export function getIconForCSConcept(concept) {
  const s = normalize(concept);
  const icons = {
    'algorithms data structures': 'code-working',
    'الخوارزميات وهياكل البيانات': 'code-working',
    'concurrency parallelism': 'sync',
    'البرمجة المتزامنة concurrency': 'sync',
    'virtual dom': 'layers',
    'state management': 'server',
    'إدارة الحالة state management': 'server',
    'authentication session management': 'finger-print-outline',
    'إدارة الجلسات وحماية الدخول auth': 'finger-print-outline',
    'object oriented programming': 'shapes-outline',
    'البرمجة كائنية التوجه oop': 'shapes-outline',
    'graph algorithms pathfinding': 'navigate-outline',
    'خوارزميات البحث عن المسار pathfinding': 'navigate-outline',
    'machine learning': 'hardware-chip', // fallback icon if not in iconMap
    'تعلم الآلة machine learning': 'hardware-chip'
  };
  return icons[s] || 'hardware-chip';
}

export function renderInteractiveTechLogos(techArr = [], type) {
  // Sort tech so logoed ones come first
  const sortedTech = techArr.slice().sort((a, b) => {
    const aHasLogo = !!iconMap[normalize(a)];
    const bHasLogo = !!iconMap[normalize(b)];
    if (aHasLogo && !bHasLogo) return -1;
    if (!aHasLogo && bHasLogo) return 1;
    return 0;
  });

  const logos = sortedTech.filter(orig => iconMap[normalize(orig)]).map((orig, index) => {
    const key = normalize(orig);
    const iconDef = iconMap[key];
    let iconHtml;
    if (iconDef.type === 'img') {
      // Uniform size for all logos
      const size = 'width: 2rem; height: 2rem;';
      // Make specific logos invert dynamically based on theme
      const whiteSrcs = ['rust', 'socketdotio', 'github', 'jsonwebtokens', 'markdown', 'apple', 'dns', 'key', 'bash', 'framermotion', 'framer'];
      const isWhite = whiteSrcs.some(s => iconDef.src.includes(s));
      const filter = isWhite ? 'filter: var(--mono-logo-filter);' : '';
      iconHtml = `<img src="${iconDef.src}" alt="${orig}" class="tech-logo-svg" style="${size}${filter ? ' ' + filter : ''}" loading="lazy" />`;
    } else if (iconDef.type === 'devicon') {
      // Uniform size for all logos
      const size = 'font-size: 1.5em;';
      iconHtml = `<i class="devicon ${iconDef.class}" style="${size}"></i>`;
    } else if (iconDef.type === 'simple') {
      const size = 'font-size: 1.5em;';
      iconHtml = `<i class="${iconDef.class}" style="${size}"></i>`;
    } else if (iconDef.type === 'fa' || iconDef.type === 'font-awesome') {
      const size = 'font-size: 1.5em;';
      iconHtml = `<i class="${iconDef.class}" style="${size}"></i>`;
    } else if (iconDef.type === 'ion') {
      const whiteStyle = (key === 'rest apis' || key === 'jwt') ? 'color: white;' : '';
      const size = 'font-size: 2.5em;';
      iconHtml = `<ion-icon name="${iconDef.class}" style="${size}${whiteStyle ? ' ' + whiteStyle : ''}"></ion-icon>`;
    } else if (iconDef.type === 'svg') {
      let svg = key === 'digital coding' ? iconDef.svg.replace(/currentColor/g, 'white') : iconDef.svg;
      svg = svg.replace(/3em/g, '3.5em');
      iconHtml = svg;
    }
    return `<div class="tech-logo-item" style="animation-delay: ${index * 0.1}s" data-tech="${orig.toLowerCase()}">
              <div class="tech-logo-wrapper">
                <div class="tech-logo-glow"></div>
                ${iconHtml}
              </div>
              <span class="tech-logo-text">${orig}</span>
            </div>`;
  });

  const texts = sortedTech.filter(orig => !iconMap[normalize(orig)]).map((orig, index) => {
    return `<div class="tech-text-item" style="animation-delay: ${index * 0.1}s">${orig}</div>`;
  });

  return `<div class="interactive-tech-container" data-type="${type}">
            ${logos.length > 0 ? `<div class="tech-logos-grid">${logos.join('')}</div>` : ''}
            ${texts.length > 0 ? `<div class="tech-texts-grid">${texts.join('')}</div>` : ''}
          </div>`;
}

export function renderSkillBadges(items = [], type) {
  const bulletTypes = ['personal', 'engineering', 'concepts', 'computerScienceAndArchitecture', 'hardwareAndCoreEngineering'];
  if (bulletTypes.includes(type)) {
    const iconFunctions = {
      engineering: getIconForCoreItem,
      personal: getIconForPersonalSkill,
      concepts: getIconForCSConcept,
      computerScienceAndArchitecture: getIconForCSConcept,
      hardwareAndCoreEngineering: getIconForCoreItem
    };

    const getIcon = iconFunctions[type] || (() => 'star');

    return `<ul class="skill-bullets" data-type="${type}">
              ${items.map((item, index) => `<li style="animation-delay: ${index * 0.1}s"><ion-icon name="${getIcon(item)}"></ion-icon> ${item}</li>`).join('')}
            </ul>`;
  }

  const iconFunctions = {
    engineering: getIconForCoreItem,
    personal: getIconForPersonalSkill,
    concepts: getIconForCSConcept,
    computerScienceAndArchitecture: getIconForCSConcept
  };

  return `<div class="skill-badges-container" data-type="${type}">
            ${items.map((item, index) => {
              const normKey = normalize(item);
              const iconDef = iconMap[normKey];
              let iconHtml = '';

              if (iconDef) {
                if (iconDef.type === 'fa' || iconDef.type === 'font-awesome' || iconDef.type === 'simple') {
                  iconHtml = `<i class="${iconDef.class}"></i>`;
                } else if (iconDef.type === 'ion') {
                  iconHtml = `<ion-icon name="${iconDef.class}"></ion-icon>`;
                } else if (iconDef.type === 'img' || iconDef.type === 'devicon') {
                  iconHtml = `<img src="${iconDef.src || iconDef.url}" style="width: 1.2em; height: 1.2em; object-fit: contain;">`;
                } else if (iconDef.type === 'svg') {
                  iconHtml = iconDef.svg.replace(/width="[^"]*"/, 'width="20"').replace(/height="[^"]*"/, 'height="20"');
                }
              } else {
                const getFallback = iconFunctions[type] || (() => 'star');
                iconHtml = `<ion-icon name="${getFallback(item)}"></ion-icon>`;
              }

              return `
              <div class="skill-badge" style="animation-delay: ${index * 0.1}s">
                <div class="badge-icon">
                  ${iconHtml}
                </div>
                <span class="badge-text">${item}</span>
                <div class="badge-hover-effect"></div>
              </div>
            `}).join('')}
          </div>`;
}