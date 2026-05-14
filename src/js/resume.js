import { iconMap, normalize, getIconForCoreItem, getIconForPersonalSkill, getIconForCSConcept, getIconForLibraryItem } from './data/icons.js';

async function loadResumeJSON() {
    try {
        const [res, skillsRes] = await Promise.all([
            fetch('../js/constants/resume.json'),
            fetch('../js/constants/skills.json').catch(() => null)
        ]);
        
        const c = await res.json();
        const skillsData = skillsRes ? await skillsRes.json() : null;

        // SVG icons used for meta (dates / location)
        const calendarSVG = '<i data-feather="calendar"></i>';
        const locationSVG = '<i data-feather="map-pin"></i>';
        // per-section text-related icons using Feather (data-feather attributes)
        const sectionIcons = {
            summary: '<i data-feather="file-text"></i>',
            experience: '<i data-feather="briefcase"></i>',
            internships: '<i data-feather="flag"></i>',
            education: '<i data-feather="book"></i>',
            certifications: '<i data-feather="award"></i>',
            projects: '<i data-feather="layers"></i>',
            technicalSkills: '<i data-feather="code"></i>'
        };
        // tag/list icon for skill categories (text-related)
        const tagSVG = '<i data-feather="tag"></i>';
        const subtitleSVG = '<i data-feather="hash"></i>';

        function renderVisual(skill, type) {
            const key = normalize(skill);
            const iconDef = iconMap[key];
            
            if (iconDef) {
                if (iconDef.type === 'img' || iconDef.type === 'devicon') {
                    const src = iconDef.src || iconDef.url;
                    return `<img src="${src}" class="skill-logo" style="width: 14px; height: 14px; object-fit: contain;">`;
                } else if (iconDef.type === 'ion') {
                    return `<ion-icon name="${iconDef.class}" style="font-size: 14px;"></ion-icon>`;
                } else if (iconDef.type === 'fa' || iconDef.type === 'font-awesome' || iconDef.type === 'simple') {
                    return `<i class="${iconDef.class}" style="font-size: 12px; width: 14px; text-align: center;"></i>`;
                } else if (iconDef.type === 'svg') {
                    return iconDef.svg.replace(/width="[^"]*"/, 'width="14"').replace(/height="[^"]*"/, 'height="14"');
                }
            }

            // Fallback based on type
            if (type === 'personal') {
                return `<ion-icon name="${getIconForPersonalSkill(skill)}" style="font-size: 14px;"></ion-icon>`;
            } else if (type === 'engineering' || type === 'hardwareAndCoreEngineering') {
                return `<ion-icon name="${getIconForCoreItem(skill)}" style="font-size: 14px;"></ion-icon>`;
            } else if (type === 'concepts' || type === 'computerScienceAndArchitecture') {
                return `<ion-icon name="${getIconForCSConcept(skill)}" style="font-size: 14px;"></ion-icon>`;
            }

            return `<i class="fas fa-layer-group" style="font-size: 12px; width: 14px; text-align: center;"></i>`;
        }

        // Populate headings and sidebar titles from labels
        if (c.labels && c.labels.sections) {
            Object.keys(c.labels.sections).forEach(key => {
                const h = document.querySelector(`[data-section-heading="${key}"]`);
                if (h) h.innerHTML = (sectionIcons[key] || '') + '<span>' + c.labels.sections[key] + '</span>';
            });
        }
        if (c.labels && c.labels.sidebar) {
            const topH = document.querySelector('[data-sidebar="topSkills"]'); if (topH) topH.innerHTML = `<i data-feather="star"></i><span>${c.labels.sidebar.topSkills}</span>`;
            const langH = document.querySelector('[data-sidebar="languages"]'); if (langH) langH.innerHTML = `<i data-feather="globe"></i><span>${c.labels.sidebar.languages}</span>`;
        }

        // Profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && c.profileImage) {
            profileImg.src = c.profileImage.web || profileImg.src;
            profileImg.onerror = function () { this.onerror = null; this.src = c.profileImage.local || this.src; };
            if (c.profileImage.alt) profileImg.alt = c.profileImage.alt;
            else if (c.name) profileImg.alt = c.name;
        }

        // Name & Titles
        const nameEl = document.querySelector('.name'); if (nameEl && c.name) nameEl.textContent = c.name;
        const titleList = document.querySelector('.title-list');
        if (titleList && Array.isArray(c.titles)) titleList.innerHTML = c.titles.map(t => `<li><span>${t}</span></li>`).join('');

        // Contacts: rebuild contact-list
        const contactList = document.querySelector('.contact-list');
        const contactTitleEl = document.querySelector('[data-contact-title]');
        if (contactTitleEl && c.labels && c.labels.contact && c.labels.contact.title) {
            contactTitleEl.innerHTML = `<i data-feather="user"></i><span>${c.labels.contact.title}</span>`;
        }
        if (contactList && c.contacts) {
            contactList.innerHTML = '';

            // Mobile Numbers
            if (Array.isArray(c.contacts.numbers) && c.contacts.numbers.length) {
                (c.contacts.numbers || []).forEach((num, idx) => {
                    const numbersBlock = document.createElement('div'); numbersBlock.className = 'contact-item';
                    if (idx === 0) {
                        const b = document.createElement('b'); b.innerHTML = `<i data-feather="phone"></i>${(c.labels && c.labels.contact && c.labels.contact.numbers) ? c.labels.contact.numbers : 'Mobile Numbers'}`; numbersBlock.appendChild(b);
                    }
                    const row = document.createElement('div'); row.className = 'contact-row';
                    const span = document.createElement('span'); span.textContent = num.display; row.appendChild(span);
                    const action = document.createElement('div'); action.className = 'action-btns';
                    const call = document.createElement('a'); call.className = 'btn-icon call'; call.title = 'Call'; call.href = 'tel:' + num.telLink; call.innerHTML = '<i class="fas fa-phone"></i>';
                    const wa = document.createElement('a'); wa.className = 'btn-icon whatsapp'; wa.title = 'WhatsApp'; wa.href = num.waLink; wa.target = '_blank'; wa.rel = 'noopener noreferrer'; wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
                    action.appendChild(call); action.appendChild(wa); row.appendChild(action); numbersBlock.appendChild(row);
                    contactList.appendChild(numbersBlock);
                });
            }

            // Email
            if (c.contacts.email) {
                const emailBlock = document.createElement('div'); emailBlock.className = 'contact-item';
                const eb = document.createElement('b'); eb.innerHTML = `<i data-feather="mail"></i>${(c.labels && c.labels.contact && c.labels.contact.email) ? c.labels.contact.email : 'Email'}`; emailBlock.appendChild(eb);
                const ea = document.createElement('a'); ea.href = 'mailto:' + c.contacts.email; ea.textContent = c.contacts.email; emailBlock.appendChild(ea); contactList.appendChild(emailBlock);
            }

            // Location
            if (c.contacts.location) {
                const locBlock = document.createElement('div'); locBlock.className = 'contact-item'; const lb = document.createElement('b'); lb.innerHTML = `<i data-feather="map-pin"></i>${(c.labels && c.labels.contact && c.labels.contact.location) ? c.labels.contact.location : 'Location'}`; locBlock.appendChild(lb); const lspan = document.createElement('span'); lspan.textContent = c.contacts.location; locBlock.appendChild(lspan); contactList.appendChild(locBlock);
            }

            // Nationality
            if (c.contacts.nationality) {
                const natBlock = document.createElement('div'); natBlock.className = 'contact-item'; const nb = document.createElement('b'); nb.innerHTML = `<i data-feather="flag"></i>${(c.labels && c.labels.contact && c.labels.contact.nationality) ? c.labels.contact.nationality : 'Nationality'}`; natBlock.appendChild(nb); const nspan = document.createElement('span'); nspan.textContent = c.contacts.nationality; natBlock.appendChild(nspan); contactList.appendChild(natBlock);
            }

            // LinkedIn
            if (c.contacts.linkedin) {
                const liBlock = document.createElement('div'); liBlock.className = 'contact-item'; const lib = document.createElement('b'); lib.innerHTML = `<i data-feather="external-link"></i>${(c.labels && c.labels.contact && c.labels.contact.linkedin) ? c.labels.contact.linkedin : 'LinkedIn'}`; liBlock.appendChild(lib); const lia = document.createElement('a'); lia.href = c.contacts.linkedin; lia.target = '_blank'; lia.rel = 'noopener noreferrer'; lia.textContent = c.contacts.linkedin.replace(/^https?:\/\//, ''); liBlock.appendChild(lia); contactList.appendChild(liBlock);
            }

            // Website
            if (c.contacts.website) {
                const webBlock = document.createElement('div'); webBlock.className = 'contact-item'; const wb = document.createElement('b'); wb.innerHTML = `<i data-feather="globe"></i>${(c.labels && c.labels.contact && c.labels.contact.website) ? c.labels.contact.website : 'Website'}`; webBlock.appendChild(wb); const wa = document.createElement('a'); wa.href = c.contacts.website; wa.target = '_blank'; wa.rel = 'noopener noreferrer'; wa.textContent = c.contacts.website.replace(/^https?:\/\//, ''); webBlock.appendChild(wa); contactList.appendChild(webBlock);
            }
        }
        // Summary - handle structured object (intro, bullets, outro)
        const summary = document.querySelector('.summary-text');
        if (summary && c.summary) {
            const formatInline = (text) => (text || '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            let html = '';

            if (typeof c.summary === 'string') {
                // Fallback for string summary (parse bullets)
                const lines = c.summary.split(/\n/);
                let inBulletList = false;
                lines.forEach(rawLine => {
                    const line = rawLine.trim();
                    if (!line) { if (inBulletList) { html += '</ul>'; inBulletList = false; } return; }
                    if (line.startsWith('•') || line.startsWith('↳') || line.startsWith('-')) {
                        if (!inBulletList) { html += '<ul class="summary-bullets">'; inBulletList = true; }
                        html += `<li>${formatInline(line.replace(/^[•↳-]\s*/, ''))}</li>`;
                        return;
                    }
                    if (inBulletList) { html += '</ul>'; inBulletList = false; }
                    html += `<p>${formatInline(line)}</p>`;
                });
                if (inBulletList) html += '</ul>';
            } else if (typeof c.summary === 'object') {
                // New structured format
                if (c.summary.intro) {
                    c.summary.intro.split('\n').filter(Boolean).forEach(p => {
                        html += `<p>${formatInline(p)}</p>`;
                    });
                }
                if (Array.isArray(c.summary.bullets) && c.summary.bullets.length) {
                    html += '<ul class="summary-bullets">';
                    c.summary.bullets.forEach(b => {
                        html += `<li><span>${formatInline(b)}</span></li>`;
                    });
                    html += '</ul>';
                }
                if (c.summary.outro) {
                    c.summary.outro.split('\n').filter(Boolean).forEach(p => {
                        html += `<p>${formatInline(p)}</p>`;
                    });
                }
            }
            summary.innerHTML = html;
        }

        // Render Experience
        const expSection = document.querySelector('[data-section="experience"]');
        if (expSection) {
            const container = expSection.querySelector('.item-group') || expSection.parentElement.querySelector('.item-group');
            if (container) {
                container.innerHTML = (c.experience || []).map(e => `
              <div class="item">
                <div class="item-header">
                  <div class="item-header-left">
                    <img src="${e.logoWeb}" alt="${e.logoAlt}" class="company-logo" onerror="this.outerHTML='<div class=\'company-logo-fallback\'>${e.company.split(' ').slice(0, 3).map(w => w[0]).join('')}'</div>'">
                    <div>
                      <h3 class="item-title"><a href="${e.link}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${e.company}</a></h3>
                      <p class="item-subtitle">${e.title}</p>
                      ${(e.meta || '').split('\n').map(m => m.trim()).filter(Boolean).map((m, idx) => `<div class="item-meta-block"><div class="meta-item">${idx === 0 ? calendarSVG : locationSVG}<span>${m}</span></div></div>`).join('')}
                    </div>
                  </div>
                </div>
                ${e.context ? `<p class="item-context">${(c.labels && c.labels.contextPrefix) ? c.labels.contextPrefix : 'Context: '}${e.context}</p>` : ''}
                ${Array.isArray(e.bullets) ? `<ul class="item-bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
              </div>
            `).join('');
            }
        }

        // Internships & Training
        const intSection = document.querySelector('[data-section="internships"]');
        if (intSection) {
            const container = intSection.querySelector('.item-group') || intSection.parentElement.querySelector('.item-group');
            if (container) {
                container.innerHTML = (c.internships || []).map(e => `
              <div class="item">
                <div class="item-header">
                  <div class="item-header-left">
                    <img src="${e.logoWeb}" alt="${e.logoAlt}" class="company-logo" onerror="this.outerHTML='<div class=\'company-logo-fallback\'>${e.company.split(' ').slice(0, 3).map(w => w[0]).join('')}'</div>'">
                    <div>
                      <h3 class="item-title"><a href="${e.link}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${e.company}</a></h3>
                      <p class="item-subtitle">${e.title}</p>
                      ${(e.meta || '').split('\n').map(m => m.trim()).filter(Boolean).map((m, idx) => `<div class="item-meta-block"><div class="meta-item">${idx === 0 ? calendarSVG : locationSVG}<span>${m}</span></div></div>`).join('')}
                    </div>
                  </div>
                </div>
                ${e.context ? `<p class="item-context">${(c.labels && c.labels.contextPrefix) ? c.labels.contextPrefix : 'Context: '}${e.context}</p>` : ''}
                ${Array.isArray(e.bullets) ? `<ul class="item-bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
              </div>
            `).join('');
            }
        }

        // Education
        const eduSection = document.querySelector('[data-section="education"]');
        if (eduSection) {
            const container = eduSection.querySelector('.item-group');
            if (container) {
                container.innerHTML = (c.education || []).map(e => `
              <div class="item">
                <div class="item-header">
                  <div class="item-header-left">
                    <img src="${e.logoLocal || e.logoWeb}" alt="${e.institution || ''}" class="company-logo" onerror="this.outerHTML='<div class=\'company-logo-fallback\'>${(e.institution || '').split(' ').slice(0, 3).map(w => w[0]).join('')}'</div>'">
                    <div>
                      <h3 class="item-title"><a href="${e.link || '#'}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${e.institution}</a></h3>
                      <p class="item-subtitle">${e.title || ''}</p>
                      ${(e.meta || '').split('\n').map(m => m.trim()).filter(Boolean).map((m, idx) => `<div class="item-meta-block"><div class="meta-item">${idx === 0 ? calendarSVG : locationSVG}<span>${m}</span></div></div>`).join('')}
                    </div>
                  </div>
                </div>
                ${e.context ? `<div class="item-context">${e.context}</div>` : ''}
                ${e.bullets && e.bullets.length ? `<ul class="item-bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
              </div>
            `).join('');
            }
        }

        // Certifications
        const certSection = document.querySelector('[data-section="certifications"]');
        if (certSection) {
            const container = certSection.querySelector('.item-group');
            if (container) {
                const formatCertText = (text) => {
                    const parts = (text || '').split(' — ').map(p => p.trim()).filter(Boolean);
                    if (parts.length >= 2) return `<b>${parts[0]}</b> — ${parts.slice(1).join(' — ')}`;
                    return `<b>${text}</b>`;
                };
                container.innerHTML = `<ul class="item-bullets" style="padding-left: 18px;">${(c.certifications || []).map(cert => `
              <li style="margin-bottom: 8px;">
                <div class="project-inline" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                  <span class="item-title" style="font-size: 11pt; margin-bottom: 0;">${formatCertText(cert.text)}</span>
                  ${cert.link ? `<div class="project-links" style="margin-left: 12px;"><a class="project-link" href="${cert.link}" target="_blank" rel="noopener noreferrer" title="View Certificate"><i class="fas fa-award"></i></a></div>` : ''}
                </div>
              </li>
            `).join('')}</ul>`;
            }
        }

        // Projects
        const projSection = document.querySelector('[data-section="projects"]');
        if (projSection) {
            const container = projSection.querySelector('.item-group') || projSection.parentElement.querySelector('.item-group');
            if (container) {
                const projectLinkIcon = (label) => {
                    const text = (label || '').toLowerCase();
                    if (text.includes('repo')) return '<i class="fab fa-github"></i>';
                    if (text.includes('thesis')) return '<i class="fas fa-file-alt"></i>';
                    if (text.includes('poster')) return '<i class="fas fa-image"></i>';
                    if (text.includes('website')) return '<i class="fas fa-link"></i>';
                    return '<i class="fas fa-external-link-alt"></i>';
                };
                const formatProjectTitle = (title) => {
                    const pipeParts = (title || '').split('|').map(part => part.trim()).filter(Boolean);
                    if (pipeParts.length >= 2) {
                        return `<b>${pipeParts[0]}</b> - ${pipeParts.slice(1).join(' - ')}`;
                    }
                    const dashParts = (title || '').split(' - ').map(part => part.trim()).filter(Boolean);
                    if (dashParts.length >= 2) {
                        return `<b>${dashParts[0]}</b> - ${dashParts.slice(1).join(' - ')}`;
                    }
                    return `<b>${title || ''}</b>`;
                };
                container.innerHTML = `<ul class="item-bullets" style="padding-left: 18px;">${(c.projects || []).map(p => `
              <li style="margin-bottom: 8px;">
                <div class="project-inline" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                  <span class="item-title" style="font-size: 11pt; margin-bottom: 0;">${formatProjectTitle(p.title)}</span>
                  ${Array.isArray(p.links) && p.links.length ? `<div class="project-links" style="margin-left: 12px; display: flex; gap: 8px;">${p.links.map(l => `<a class="project-link" href="${l.url || '#'}" target="_blank" rel="noopener noreferrer" title="${l.text}">${projectLinkIcon(l.text)}</a>`).join('')}</div>` : ''}
                </div>
              </li>
            `).join('')}</ul>`;
            }
        }

        // Technical Skills
        const techSection = document.querySelector('[data-section="technicalSkills"]');
        if (techSection) {
            const container = techSection.querySelector('.item-group') || techSection.parentElement.querySelector('.item-group');
            if (container) {
                // map skill category names to unique feather icons
                const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const skillIconMap = {
                    [norm('Personal Skills')]: 'user',
                    [norm('Web Architecture & Frameworks')]: 'layers',
                    [norm('Programming & Markup Languages')]: 'code',
                    [norm('Programming Languages')]: 'code',
                    [norm('Frameworks & Libraries')]: 'layers',
                    [norm('Databases')]: 'database',
                    [norm('Networking, Web & Protocols')]: 'globe',
                    [norm('Software, DevOps & Tools')]: 'tool',
                    [norm('Systems, Development & Tools')]: 'server',
                    [norm('Computer Science Concepts')]: 'book-open',
                    [norm('Computer Science & Architecture')]: 'cpu',
                    [norm('Core Engineering & Software')]: 'settings',
                    [norm('Engineering CAD & Simulation')]: 'box',
                    [norm('Hardware & Core Engineering')]: 'cpu',
                    [norm('Operating Systems & Environments')]: 'monitor',
                    [norm('OS & Environments')]: 'monitor',
                    [norm('Testing & Code Quality')]: 'check-circle'
                };

                // Category Mapping for skills.json keys
                const categoryLabelMapping = {
                    programmingAndMarkupLanguages: 'Programming & Markup Languages',
                    frameworksAndLibraries: 'Frameworks & Libraries',
                    databases: 'Databases',
                    networkingWebAndProtocols: 'Networking, Web & Protocols',
                    softwareDevOpsAndTools: 'Software, DevOps & Tools',
                    operatingSystemsAndEnvironments: 'Operating Systems & Environments',
                    testingAndCodeQuality: 'Testing & Code Quality',
                    computerScienceAndArchitecture: 'Computer Science & Architecture',
                    engineeringCadAndSimulation: 'Engineering CAD & Simulation',
                    hardwareAndCoreEngineering: 'Hardware & Core Engineering'
                };


                let displaySkills = c.technicalSkills || [];

                // If skillsData exists, use it to override/populate
                if (skillsData) {
                    displaySkills = [];
                    // Add personal skills first (matches website behavior)
                    if (Array.isArray(skillsData.personalSkills) && skillsData.personalSkills.length > 0) {
                        displaySkills.push({
                            category: 'Personal Skills',
                            type: 'personal',
                            items: skillsData.personalSkills
                        });
                    }
                    // Add technical skills
                    if (skillsData.technicalSkills) {
                        for (const [key, items] of Object.entries(skillsData.technicalSkills)) {
                            if (Array.isArray(items) && items.length > 0) {
                                displaySkills.push({
                                    category: categoryLabelMapping[key] || key,
                                    type: key,
                                    items: items.map(item => typeof item === 'string' ? item : item.name)
                                });
                            }
                        }
                    }
                }

                const filteredSkills = displaySkills.filter(cat => cat.category !== 'Testing & Code Quality');
                container.innerHTML = filteredSkills.map(cat => {
                    const key = norm(cat.category);
                    const icon = skillIconMap[key] || 'hash';
                    const iconHtml = `<i data-feather="${icon}"></i>`;
                    
                    return `
                    <div class="skill-category">
                        <h3>${iconHtml}<span>${cat.category}</span></h3>
                        <div class="project-tags">
                            ${(cat.items || []).map(i => {
                            return `<span class="tag">${renderVisual(i, cat.type)}${i}</span>`;
                        }).join('')}
                        </div>
                    </div>
                    `;
                }).join('');

            }
        }
        // Sidebar Top Skills & Languages (use data-sidebar-container)
        // Sidebar Top Skills & Languages (rendered as bullet points)
        const topContainer = document.querySelector('[data-sidebar-container="topSkills"]'); 
        if (topContainer) {
            topContainer.innerHTML = `<ul style="list-style: none; padding: 0; margin: 0;">
                ${(c.topSkills || []).map(s => `<li style="font-size: 9.5pt; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: flex-start; gap: 8px;">
                    <span style="color: var(--accent); font-weight: bold;">•</span> ${s}
                </li>`).join('')}
            </ul>`;
        }
        
        const langContainer = document.querySelector('[data-sidebar-container="languages"]'); 
        if (langContainer) {
            langContainer.innerHTML = `<ul style="list-style: none; padding: 0; margin: 0;">
                ${(c.languages || []).map(s => `<li style="font-size: 9.5pt; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: flex-start; gap: 8px;">
                    <span style="color: var(--accent); font-weight: bold;">•</span> ${s}
                </li>`).join('')}
            </ul>`;
        }

        // Replace Feather icons (if loaded) with a slight delay to ensure DOM is ready
        const triggerFeather = () => {
            if (window.feather && typeof window.feather.replace === 'function') {
                try { window.feather.replace({ 'stroke-width': 1.5 }); } catch (e) { }
            }
        };

        triggerFeather();
        setTimeout(triggerFeather, 100);
        setTimeout(triggerFeather, 500);

    } catch (err) { }
}
document.addEventListener('DOMContentLoaded', loadResumeJSON);