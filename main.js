document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- Data ---
    const experienceData = [
        { title: 'Public Relations In-Charge', company: 'Lichfield Fire and Safety Equipment Co., Ltd. | Bahrain/UAE', date: 'May 2024 — Present', logo: 'https://media.licdn.com/dms/image/v2/C560BAQFofK3kzPzQDA/company-logo_200_200/company-logo_200_200/0/1633352692029/lifeco_uk_logo?e=1755734400&v=beta&t=qWGiMeo6qNH0FIKrsKkJnv6vkdIMOoCGRcdO3TaerGQ', points: ["Develop sales goals and quotas for Bahrain in line with management's expectations.", "Maintain and expand customer base by building rapport with key customers and identifying new opportunities.", "Meet with customers to discuss their evolving needs and assess the quality of the company's relationship.", "Generate high-quality sales leads, negotiate prices, complete sales, and arrange deliveries.", "Analyze market trends and implement marketing strategies to enhance market share.", "Identify areas for improvement and communicate solutions to upper management.", "Build and maintain good relations with Government Ministries and Civil Defence."] },
        { title: 'General Electrical Engineer', company: 'Super Fire and Safety Services W.L.L | Bahrain', date: 'October 2022 — October 2023', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQHzLSAfVZFnAA/company-logo_200_200/B4EZZiWNzzHEAM-/0/1745406713575/super_fire_and_safety_services_logo?e=1755734400&v=beta&t=u2FYrnh57oAbVwoknqldxj8utaOC1aB3zF3af50Wzzc', points: ["Completed fire alarm designs and drawings utilizing Bahrain CDFSD, GCC fire codes, and NFPA standards.", "Installed and programmed control panels and other equipment for fire alarm systems.", "Installed wiring to connect system components, complying with all applicable safety standards.", "Showed customers how to use alarm systems, discussed any questions or concerns, and ensured customer satisfaction.", "Reviewed installation manuals, building plans, and work orders to plan optimal locations for system components.", "Identified and repaired malfunctions in system components or wiring, including ordering and replacing parts when necessary.", "Composed and submitted documentation and reports for each installation or repair visit."] },
        { title: 'Retail Sales Advisor', company: 'channels by stc | Bahrain', date: 'April 2022 — September 2022', logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQEyswtmEmB_xA/company-logo_200_200/company-logo_200_200/0/1630634068141/channels_by_stc_bahrain_logo?e=1755734400&v=beta&t=jYOn8FSJp7DFyal9H_OurQmV9MuihJlS-eA0Y2FpkZ4', points: ["Executed cross-selling and upselling strategies for telecommunications products and services.", "Managed customer inquiries and resolved complaints efficiently using Oracle CRM."] },
        { title: 'Retail Marketing and Customer Service', company: 'Zain Bahrain B.S.C | Bahrain', date: 'February 2019 — March 2022', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGm-AO8N4ouTQ/company-logo_200_200/B4DZfpA75CH4AM-/0/1751961026975?e=1755734400&v=beta&t=uhCsTQhnRGW9gjjITfIuAhfpsR_w7xyBGAwNL80Q0Ho', points: ["Managed sales teams and optimized retail shop operations as Acting Branch Manager.", "Successfully cross-sold and upselled telecommunications services and products.", "Handled customer complaints and requests, ensuring high satisfaction levels.", "Provided technical support and troubleshooted service issues.", "Conducted outbound calls to promote telecom products and services."] }
    ];
    const internshipData = [
        { title: 'Electrical Engineer Trainee', company: 'Megger Group | India (Virtual)', date: 'July 2020 — September 2020', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQEBLUHBlEKhYg/company-logo_200_200/B4DZUZoCjNHIAM-/0/1739891681887/megger_logo?e=1755734400&v=beta&t=MEMPpfzQ_44ig2f5FXcb-snXm0WUH0lsXu91H4VVvFM', points: ["Gained practical experience with electronic test equipment and various electrical testing procedures.", "Learned basics of using equipment for grounding resistivity, CT, VT, protective relays and electric motors tests."] }
    ];
    const skillsData = [
        { title: 'Engineering & Technical', icon: 'cog', skills: [{ name: 'Fire Safety Systems (NFPA)', icon: 'shield-check' }, { name: 'Solar PV Systems', icon: 'solar-panel' }, { name: 'Electrical Installation & Design', icon: 'plug-zap' }, { name: 'AutoCAD & 3D Modelling', icon: 'ruler' }, { name: 'Preventive Maintenance', icon: 'wrench' }, { name: 'CCTV & Cabling', icon: 'video' }] },
        { title: 'Programming & Software', icon: 'code-xml', skills: [{ name: 'Go, Python, JavaScript (ES6+)', icon: 'braces' }, { name: 'HTML, CSS, TailwindCSS', icon: 'layout-template' }, { name: 'React, Node.js', icon: 'atom' }, { name: 'SQL, JSON', icon: 'database' }, { name: 'Git, Docker', icon: 'git-branch' }, { name: 'Oracle CRM, MATLAB', icon: 'server' }] },
        { title: 'Business & Soft Skills', icon: 'briefcase', skills: [{ name: 'Public Relations & Comms', icon: 'megaphone' }, { name: 'Sales Strategy & Execution', icon: 'target' }, { name: 'Client Relationship Management', icon: 'users' }, { name: 'Market Analysis', icon: 'line-chart' }, { name: 'Problem-Solving & Critical Thinking', icon: 'lightbulb' }, { name: 'Leadership & Teamwork', icon: 'users-round' }] }
    ];
    const projectsData = [
        { title: 'ConRev Platform', company: 'Startup Bahrain | May 2024 — Present', description: 'Developing a platform to streamline the construction experience for clients, providing comprehensive tracking and compliance.' },
        { title: 'Smart Streetlights', company: 'University of Bahrain | Jan 2020 — May 2020', description: 'Developed an intelligent lighting system using Arduino to enhance energy efficiency and improve road safety.', links: [{ name: 'View Report', icon: 'file-text', docName: 'Smart Streetlights Report' }, { name: 'View Poster', icon: 'image', docName: 'Smart Streetlights Poster' }] },
        { title: 'This Interactive Portfolio', company: 'Personal Project | 2024', description: 'A dynamic, animated personal resume built with HTML, TailwindCSS, and JavaScript to showcase my skills and projects.', externalLink: 'https://github.com/sahmedhusain/portfolio-v1' },
    ];
    const educationData = [
        { degree: 'Full Stack Developer', institution: 'Reboot01 Coding Institute', date: 'May 2024 – April 2026', logo: 'https://media.licdn.com/dms/image/v2/C560BAQHmy1S2noq-Sg/company-logo_200_200/company-logo_200_200/0/1661754301057?e=1755734400&v=beta&t=1tA5FOqXMXthSfMwqwJBTM7y4xLzcqnCaJeFDRP7tVc', docName: 'Full Stack Program Certificate' },
        { degree: 'BSc in Electrical Engineering', institution: 'University of Bahrain', date: 'September 2015 - June 2022', logo: 'https://media.licdn.com/dms/image/v2/C510BAQFO0Z1XkWgp4Q/company-logo_200_200/company-logo_200_200/0/1631367587454?e=1755734400&v=beta&t=y5MQfsaiHpNMQDn2SjjS6zCbOjxkd3yizNY1C-4lr6c', docName: 'Bachelor\'s Degree Certificate' },
        { degree: 'High School (Secondary)', institution: 'H.E Sheikh Isa bin Ali Secondary Boys School', date: 'September 2012 - June 2015', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQESrNBNxWUIvw/company-logo_200_200/company-logo_200_200/0/1689878832049?e=1755734400&v=beta&t=qWS0jEfUsWoMbpS5O0rZasA0cW_hZBKY5guMLwzLnlE', docName: 'High School Diploma' }
    ];
    const certsData = [
        { name: 'Solar PV Installer and Operator (NOCN Level 3)', institution: 'NOCN Group', date: 'March2024', logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQEmpqaAAbSFlw/company-logo_200_200/company-logo_200_200/0/1663657525891/nocn_logo?e=1755734400&v=beta&t=5H4gYiagRKYwjHNDkH_qYHKzbOdgEiY0IqpbjVPVFoQ', docName: 'Solar PV NOCN Certificate' },
        { name: 'Solar PV Installer and Operator (NOCN Level 3)', institution: 'Ministry of Electricity and Water Affairs, Bahrain', date: 'March 2024', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHck4Z2NYT49A/company-logo_200_200/company-logo_200_200/0/1708118281993?e=1755734400&v=beta&t=xPuXlyp7qLZrgdo6Xxse_TcfKzsZ9XN1l60gAr2uLH4', docName: 'Solar PV MEWA Certificate' },
        { name: 'CRPEP (Electrical)', institution: 'The Council for Regulating the Practice of Engineering Professions (CRPEP), Bahrain', date: 'December 2022 - December 2023', logo: 'https://media.licdn.com/dms/image/v2/C560BAQG5C1694uLjbQ/company-logo_200_200/company-logo_200_200/0/1632289290867?e=1755734400&v=beta&t=lII4FacCVj8IsqDUOrSImU1yJHHxsTxRtuQgmTba1NE', docName: 'CRPEP License' },
        { name: 'Electrical Installation Wireman', institution: 'Electricity and water Authority, Bahrain', date: 'February 2024 - February 2029', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGxxZ1pDcD8Kw/company-logo_200_200/B4EZfu6Yw2HEAI-/0/1752059973679/electricity_and_water_authority_bahrain_logo?e=1755734400&v=beta&t=1eYFoyPir_Wbz5HlCSUhuXb3QjNLacaWmP0o5l4kIOM', docName: 'CRPEP License' },
        { name: 'Basic Life Support (BLS)', institution: 'American Heart Association', date: 'July 2022 - July 2024', logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQGkbfwG3S0TkQ/company-logo_200_200/company-logo_200_200/0/1631374527549/american_heart_association_logo?e=1755734400&v=beta&t=1ZZwObTfbCGS5MF00Oxxr8CGrGlnQRcXUviQ9oEujb8', docName: 'BLS Certificate' }
    ];
    const courseCertsData = [
        { name: 'B2B Sales Fundamentals', icon: 'briefcase' },
        { name: 'Emotional Intelligence', icon: 'brain-circuit' },
        { name: 'AI in Business Essentials', icon: 'bot' },
        { name: 'Leading with Innovation', icon: 'rocket' },
        { name: 'Critical Thinking', icon: 'microscope' }
    ];

    // --- Dynamic Content Injection ---
    const experienceContainer = document.querySelector('#experience .timeline');
    experienceData.forEach((job, i) => {
        const pointsHTML = job.points.map((point, index) => `<li class="text-sm ${index >= 3 ? 'hidden-item' : ''}">${point}</li>`).join('');
        const buttonHTML = job.points.length > 3 ? `<button class="text-sm font-semibold mt-4 inline-flex items-center cursor-pointer show-more-btn" style="color: var(--md-sys-color-primary-light);">Show more <i data-lucide="chevron-down" class="w-4 h-4 ml-1"></i></button>` : '';
        experienceContainer.innerHTML += `
            <div class="timeline-item mb-12 relative animatable" style="--delay: ${i*0.1}s">
                <div class="dot"></div>
                <div class="enhanced-card tilt-card">
                    <div class="flex gap-4 items-start">
                        <img src="${job.logo}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/e1e3e2/3f4948?text=LOGO';" alt="${job.company} logo" class="org-logo">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold card-title flex items-center gap-2">
                                <i data-lucide="briefcase" class="w-5 h-5"></i>
                                ${job.title}
                            </h3>
                            <p class="font-semibold text-sm mb-1" style="color: var(--md-sys-color-primary-light);">${job.company}</p>
                            <p class="text-xs mb-4 flex items-center gap-1" style="color: var(--md-sys-color-on-surface-variant-light);">
                                <i data-lucide="calendar" class="w-3 h-3"></i>
                                ${job.date}
                            </p>
                        </div>
                    </div>
                    <ul class="list-disc list-inside space-y-2 job-description mt-4">${pointsHTML}</ul>
                    ${buttonHTML}
                </div>
            </div>`;
    });

    const internshipContainer = document.querySelector('#internships .timeline');
    internshipData.forEach((job, i) => {
        const pointsHTML = job.points.map(point => `<li class="text-sm">${point}</li>`).join('');
        internshipContainer.innerHTML += `
            <div class="timeline-item mb-12 relative animatable" style="--delay: ${i*0.1}s">
                <div class="dot"></div>
                <div class="card tilt-card">
                    <div class="flex gap-4 items-start">
                         <img src="${job.logo}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/e1e3e2/3f4948?text=LOGO';" alt="${job.company} logo" class="org-logo">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold card-title">${job.title}</h3>
                            <p class="font-semibold text-sm mb-1" style="color: var(--md-sys-color-primary-light);">${job.company}</p>
                            <p class="text-xs mb-4" style="color: var(--md-sys-color-on-surface-variant-light);">${job.date}</p>
                        </div>
                    </div>
                    <ul class="list-disc list-inside space-y-2 mt-4">${pointsHTML}</ul>
                </div>
            </div>`;
    });

    const skillsContainer = document.querySelector('#skills .bento-grid');
    skillsData.forEach((cat, i) => {
        const skillsHTML = cat.skills.map(skill => `
            <div class="skill-item">
                <div class="skill-icon">
                    <i data-lucide="${skill.icon}"></i>
                </div>
                <span class="text-sm font-medium">${skill.name}</span>
            </div>
        `).join('');
        skillsContainer.innerHTML += `
            <div class="enhanced-card bento-item bento-item-${i+1} animatable" style="--delay: ${i*0.1}s">
                <h3 class="text-lg font-bold mb-4 flex items-center card-title">
                    <div class="skill-icon mr-3">
                        <i data-lucide="${cat.icon}"></i>
                    </div>
                    ${cat.title}
                </h3>
                <div class="space-y-2">${skillsHTML}</div>
            </div>`;
    });

    const projectsContainer = document.querySelector('#projects .grid');
    projectsData.forEach((proj, i) => {
        let linksHTML = '';
        if (proj.links) {
            linksHTML = `<div class="flex items-center space-x-4 mt-4">` +
                proj.links.map(link => `<a href="#" class="view-doc-link placeholder-link" data-doc-name="${link.docName}"><i data-lucide="${link.icon}" class="w-4 h-4 mr-2"></i>${link.name}</a>`).join('') +
                `</div>`;
        } else if (proj.externalLink) {
             linksHTML = `<div class="mt-4"><a href="${proj.externalLink}" target="_blank" class="view-doc-link">View Project <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i></a></div>`;
        }
         projectsContainer.innerHTML += `
            <div class="enhanced-card tilt-card animatable" style="--delay: ${i*0.1}s">
                <h3 class="text-lg font-bold card-title flex items-center gap-2 mb-3">
                    <i data-lucide="folder-open" class="w-5 h-5"></i>
                    ${proj.title}
                </h3>
                <p class="font-semibold text-sm mb-2 flex items-center gap-1" style="color: var(--md-sys-color-primary-light);">
                    <i data-lucide="building" class="w-4 h-4"></i>
                    ${proj.company}
                </p>
                <p class="text-sm mb-4">${proj.description}</p>
                ${linksHTML}
            </div>`;
    });

    const educationContainer = document.querySelector('#education .grid > div:first-child .space-y-6');
    educationData.forEach((edu, i) => {
        educationContainer.innerHTML += `
            <div class="enhanced-card tilt-card animatable" style="--delay: ${i*0.1}s">
                 <div class="flex gap-4 items-start">
                    <img src="${edu.logo}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/e1e3e2/3f4948?text=LOGO';" alt="${edu.institution} logo" class="org-logo">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold card-title flex items-center gap-2">
                            <i data-lucide="graduation-cap" class="w-5 h-5"></i>
                            ${edu.degree}
                        </h3>
                        <p class="font-semibold text-sm flex items-center gap-1 mb-1" style="color: var(--md-sys-color-primary-light);">
                            <i data-lucide="school" class="w-4 h-4"></i>
                            ${edu.institution}
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                            <i data-lucide="calendar" class="w-3 h-3"></i>
                            ${edu.date}
                        </p>
                    </div>
                </div>
                <a href="#" class="view-doc-link placeholder-link mt-4" data-doc-name="${edu.docName}">
                    <i data-lucide="award" class="w-4 h-4 mr-2"></i>View Certificate
                </a>
            </div>`;
    });
    const certsContainer = document.querySelector('#education .grid > div:last-child .space-y-6');
    certsData.forEach((cert, i) => {
        certsContainer.innerHTML += `
            <div class="enhanced-card tilt-card animatable" style="--delay: ${i*0.1}s">
                 <div class="flex gap-4 items-start">
                    <img src="${cert.logo}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/e1e3e2/3f4948?text=LOGO';" alt="${cert.name} logo" class="org-logo">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold card-title flex items-center gap-2">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                            ${cert.name}
                        </h3>
                        <p class="font-semibold text-sm flex items-center gap-1" style="color: var(--md-sys-color-primary-light);">
                            <i data-lucide="building-2" class="w-4 h-4"></i>
                            ${cert.institution}
                        </p>
                    </div>
                </div>
                <a href="#" class="view-doc-link placeholder-link mt-4" data-doc-name="${cert.docName}">
                    <i data-lucide="award" class="w-4 h-4 mr-2"></i>View Certificate/License
                </a>
            </div>`;
    });
    const courseCertsHTML = courseCertsData.map(cert => `
        <div class="skill-item">
            <div class="skill-icon">
                <i data-lucide="${cert.icon}"></i>
            </div>
            <span class="text-sm font-medium">${cert.name}</span>
        </div>
    `).join('');
    certsContainer.innerHTML += `
        <div class="enhanced-card tilt-card animatable" style="--delay: ${certsData.length * 0.1}s">
             <h3 class="text-lg font-bold card-title mb-4 flex items-center gap-2">
                <div class="skill-icon">
                    <i data-lucide="sparkles"></i>
                </div>
                Course Certificates
             </h3>
             <div class="space-y-2">${courseCertsHTML}</div>
        </div>
    `;

    // --- Enhanced Expressive Timeline ---
    const journeyData = [
        ...experienceData.map(e => ({...e, type: 'work', icon: 'briefcase', category: 'Professional Experience'})),
        ...internshipData.map(e => ({...e, type: 'internship', icon: 'users', category: 'Training & Development'})),
        ...educationData.map(e => ({...e, title: e.degree, company: e.institution, type: 'education', icon: 'graduation-cap', category: 'Academic Achievement'}))
    ];

    let currentFilter = 'all';
    let timelineVisible = false;

    const parseDate = (dateStr) => {
        if (dateStr.toLowerCase() === 'present') return new Date();
        if (!isNaN(dateStr)) return new Date(dateStr, 0, 1);
        const parts = dateStr.split(' ');
        if (parts.length >= 2) {
            const month = new Date(Date.parse(parts[0] + " 1, 2000")).getMonth();
            const year = parseInt(parts[1]);
            return new Date(year, month, 1);
        }
        return new Date(dateStr);
    };

    function getFilteredData() {
        return currentFilter === 'all' ? journeyData : journeyData.filter(item => item.type === currentFilter);
    }

    function getResponsiveDimensions() {
        const containerWidth = document.getElementById('svg-timeline-container').clientWidth;
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;

        return {
            width: Math.max(isMobile ? 800 : isTablet ? 1200 : 1400, containerWidth * 0.95),
            height: isMobile ? 350 : isTablet ? 450 : 500,
            margin: {
                top: isMobile ? 60 : isTablet ? 80 : 100,
                right: isMobile ? 40 : isTablet ? 60 : 80,
                bottom: isMobile ? 60 : isTablet ? 80 : 100,
                left: isMobile ? 40 : isTablet ? 60 : 80
            }
        };
    }

    function createStraightLineTimeline() {
        const svg = document.getElementById('timeline-svg');
        const tooltip = document.getElementById('timeline-tooltip');

        // Clear existing content
        svg.innerHTML = '';

        // Get responsive dimensions
        const dimensions = getResponsiveDimensions();
        const { width, height, margin } = dimensions;
        const chartWidth = width - margin.left - margin.right;
        const timelineY = height / 2; // Center the main timeline

        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Get filtered data and sort chronologically
        const filteredData = getFilteredData();
        const processedData = filteredData.map(item => {
            const startDate = parseDate(item.date.split('—')[0].trim());
            const endDate = parseDate(item.date.split('—')[1]?.trim() || 'Present');
            const duration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);

            return {
                ...item,
                startDate,
                endDate,
                startYear: startDate.getFullYear() + startDate.getMonth() / 12,
                endYear: endDate.getFullYear() + endDate.getMonth() / 12,
                duration: Math.max(duration, 0.1),
                impact: item.points ? item.points.length : 3,
                isPresent: item.date.toLowerCase().includes('present')
            };
        }).sort((a, b) => a.startDate - b.startDate);

        if (processedData.length === 0) return;

        // Calculate time scale
        const minYear = Math.min(...processedData.map(d => d.startYear)) - 0.2;
        const maxYear = Math.max(...processedData.map(d => d.endYear)) + 0.2;
        const timeScale = (year) => margin.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;

        // Create definitions for gradients and patterns
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Create gradient for main timeline
        const mainGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        mainGradient.setAttribute('id', 'mainTimelineGradient');
        mainGradient.setAttribute('x1', '0%');
        mainGradient.setAttribute('x2', '100%');

        const gradientStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        gradientStop1.setAttribute('offset', '0%');
        gradientStop1.setAttribute('stop-color', 'var(--md-sys-color-outline-light)');
        gradientStop1.setAttribute('stop-opacity', '0.3');

        const gradientStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        gradientStop2.setAttribute('offset', '50%');
        gradientStop2.setAttribute('stop-color', 'var(--md-sys-color-primary-light)');
        gradientStop2.setAttribute('stop-opacity', '1');

        const gradientStop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        gradientStop3.setAttribute('offset', '100%');
        gradientStop3.setAttribute('stop-color', 'var(--md-sys-color-outline-light)');
        gradientStop3.setAttribute('stop-opacity', '0.3');

        mainGradient.appendChild(gradientStop1);
        mainGradient.appendChild(gradientStop2);
        mainGradient.appendChild(gradientStop3);
        defs.appendChild(mainGradient);
        svg.appendChild(defs);

        // Draw main timeline line
        const mainLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        mainLine.setAttribute('x1', margin.left);
        mainLine.setAttribute('y1', timelineY);
        mainLine.setAttribute('x2', margin.left + chartWidth);
        mainLine.setAttribute('y2', timelineY);
        mainLine.setAttribute('stroke', 'url(#mainTimelineGradient)');
        mainLine.setAttribute('class', 'timeline-main-line');
        svg.appendChild(mainLine);

        // Create year markers - bigger and clearer
        const yearMarkersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const yearRange = maxYear - minYear;
        const yearStep = yearRange <= 8 ? 1 : Math.max(1, Math.ceil(yearRange / 8));

        for (let year = Math.ceil(minYear); year <= maxYear; year += yearStep) {
            const x = timeScale(year);

            // Year marker line - bigger
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            marker.setAttribute('x1', x);
            marker.setAttribute('y1', timelineY - 25);
            marker.setAttribute('x2', x);
            marker.setAttribute('y2', timelineY + 25);
            marker.setAttribute('class', 'timeline-year-marker');
            yearMarkersGroup.appendChild(marker);

            // Year label - bigger and clearer
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x);
            label.setAttribute('y', timelineY + 45);
            label.setAttribute('class', 'timeline-label');
            label.textContent = Math.floor(year);
            yearMarkersGroup.appendChild(label);
        }

        svg.appendChild(yearMarkersGroup);

        // Create period bars and handle overlaps
        const periodsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const tracks = []; // Track system for overlapping periods

        processedData.forEach((item, index) => {
            const startX = timeScale(item.startYear);
            const endX = timeScale(item.endYear);
            const barWidth = Math.max(endX - startX, 30); // Bigger minimum width for better visibility

            // Find available track (row) for this period
            let trackIndex = 0;
            while (trackIndex < tracks.length) {
                const track = tracks[trackIndex];
                const hasOverlap = track.some(existingItem =>
                    !(item.endYear <= existingItem.startYear || item.startYear >= existingItem.endYear)
                );
                if (!hasOverlap) break;
                trackIndex++;
            }

            // Create new track if needed
            if (trackIndex >= tracks.length) {
                tracks.push([]);
            }
            tracks[trackIndex].push(item);

            // Calculate Y position based on track - bigger spacing
            const trackOffset = (trackIndex - Math.floor(tracks.length / 2)) * 40;
            const barY = timelineY + trackOffset;

            // Create period group
            const periodGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            periodGroup.setAttribute('class', 'timeline-period-group');

            // Period bar
            const periodBar = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            periodBar.setAttribute('x1', startX);
            periodBar.setAttribute('y1', barY);
            periodBar.setAttribute('x2', endX);
            periodBar.setAttribute('y2', barY);
            periodBar.setAttribute('class', `timeline-period-bar ${item.type}`);
            periodBar.setAttribute('data-item', JSON.stringify(item));

            // Add current indicator for ongoing positions
            if (item.isPresent) {
                const currentIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                currentIndicator.setAttribute('x1', endX);
                currentIndicator.setAttribute('y1', barY - 10);
                currentIndicator.setAttribute('x2', endX);
                currentIndicator.setAttribute('y2', barY + 10);
                currentIndicator.setAttribute('class', 'timeline-current-indicator');
                periodGroup.appendChild(currentIndicator);
            }

            // Start milestone - bigger
            const startMilestone = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            startMilestone.setAttribute('cx', startX);
            startMilestone.setAttribute('cy', barY);
            startMilestone.setAttribute('r', 8);
            startMilestone.setAttribute('class', `timeline-milestone ${item.type}`);
            startMilestone.setAttribute('data-item', JSON.stringify(item));
            startMilestone.setAttribute('data-type', 'start');

            // End milestone (only if not present) - bigger
            if (!item.isPresent) {
                const endMilestone = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                endMilestone.setAttribute('cx', endX);
                endMilestone.setAttribute('cy', barY);
                endMilestone.setAttribute('r', 8);
                endMilestone.setAttribute('class', `timeline-milestone ${item.type}`);
                endMilestone.setAttribute('data-item', JSON.stringify(item));
                endMilestone.setAttribute('data-type', 'end');
                periodGroup.appendChild(endMilestone);
            }

            // Period label (shown on hover) - bigger and clearer
            const periodLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            periodLabel.setAttribute('x', startX + barWidth / 2);
            periodLabel.setAttribute('y', barY - 25);
            periodLabel.setAttribute('class', 'timeline-period-label');
            const maxLength = barWidth > 200 ? 30 : barWidth > 100 ? 20 : 15;
            periodLabel.textContent = item.title.length > maxLength ? item.title.substring(0, maxLength) + '...' : item.title;

            // Add hover events
            [periodBar, startMilestone].forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    showDetailedTooltip(e, item, svg);
                });

                element.addEventListener('mouseleave', () => {
                    hideTooltip();
                });

                element.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDetailedModal(item);
                });
            });

            periodGroup.appendChild(periodBar);
            periodGroup.appendChild(startMilestone);
            periodGroup.appendChild(periodLabel);

            // Add overlap indicator if multiple tracks
            if (tracks.length > 1 && trackIndex > 0) {
                const overlapIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                overlapIndicator.setAttribute('cx', startX - 10);
                overlapIndicator.setAttribute('cy', barY);
                overlapIndicator.setAttribute('r', 8);
                overlapIndicator.setAttribute('class', 'timeline-overlap-indicator');

                const overlapText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                overlapText.setAttribute('x', startX - 10);
                overlapText.setAttribute('y', barY + 3);
                overlapText.setAttribute('class', 'timeline-overlap-indicator');
                overlapText.textContent = trackIndex + 1;

                periodGroup.appendChild(overlapIndicator);
                periodGroup.appendChild(overlapText);
            }

            periodsGroup.appendChild(periodGroup);

            // Animate period appearance
            setTimeout(() => {
                periodBar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                periodBar.style.opacity = '1';
                startMilestone.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                startMilestone.style.opacity = '1';
                startMilestone.style.transform = 'scale(1)';
            }, index * 200 + 300);
        });

        svg.appendChild(periodsGroup);

        // Add timeline title
        const titleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', margin.left + chartWidth / 2);
        title.setAttribute('y', 30);
        title.setAttribute('class', 'timeline-axis-label');
        title.setAttribute('text-anchor', 'middle');
        title.textContent = 'Career Timeline - Chronological Journey';
        titleGroup.appendChild(title);
        svg.appendChild(titleGroup);

        // Initialize animations
        periodsGroup.style.opacity = '0';
        setTimeout(() => {
            periodsGroup.style.transition = 'opacity 0.5s ease';
            periodsGroup.style.opacity = '1';
        }, 100);
    }

    // Enhanced tooltip functionality
    function showDetailedTooltip(event, item, svg) {
        const tooltip = document.getElementById('timeline-tooltip');
        const rect = svg.getBoundingClientRect();

        // Position tooltip
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        tooltip.style.left = `${Math.min(x + 15, rect.width - 350)}px`;
        tooltip.style.top = `${Math.max(y - 10, 10)}px`;

        // Create detailed tooltip content
        const tooltipContent = `
            <div class="tooltip-header">
                <div class="tooltip-icon ${item.type}">
                    <i data-lucide="${item.icon}"></i>
                </div>
                <div>
                    <div class="tooltip-title">${item.title}</div>
                    <div class="tooltip-company">${item.company}</div>
                </div>
            </div>
            <div class="tooltip-details">
                <span class="tooltip-label">Period:</span>
                <span class="tooltip-value">${item.date}</span>
                <span class="tooltip-label">Duration:</span>
                <span class="tooltip-value">${item.duration.toFixed(1)} years</span>
                <span class="tooltip-label">Category:</span>
                <span class="tooltip-value">${item.category}</span>
                <span class="tooltip-label">Impact:</span>
                <span class="tooltip-value">${item.impact} key achievements</span>
            </div>
        `;

        tooltip.querySelector('.tooltip-content').innerHTML = tooltipContent;
        tooltip.classList.add('visible');

        // Recreate icons in tooltip
        lucide.createIcons();
    }

    function hideTooltip() {
        const tooltip = document.getElementById('timeline-tooltip');
        tooltip.classList.remove('visible');
    }

    function showDetailedModal(item) {
        // Create a detailed modal for the timeline item
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative">
                <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                <p class="text-sm text-gray-600 mb-4">${item.company} • ${item.date}</p>
                <div class="space-y-2">
                    ${item.points ? item.points.map(point => `<p class="text-sm">• ${point}</p>`).join('') : '<p class="text-sm">No additional details available.</p>'}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        lucide.createIcons();

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Timeline toggle and filter functionality
    const timelineToggle = document.getElementById('timeline-toggle');
    const svgTimelineContainer = document.getElementById('svg-timeline-container');
    const timelineControls = document.getElementById('timeline-controls');
    const filterButtons = document.querySelectorAll('.timeline-filter-btn');

    timelineVisible = false;

    timelineToggle.addEventListener('click', () => {
        timelineVisible = !timelineVisible;
        const toggleIcon = timelineToggle.querySelector('.toggle-icon');
        const toggleText = timelineToggle.querySelector('span');

        if (timelineVisible) {
            svgTimelineContainer.classList.add('active');
            timelineToggle.classList.add('active');
            timelineControls.style.display = 'flex';
            toggleIcon.setAttribute('data-lucide', 'chevron-up');
            toggleText.textContent = 'Hide Interactive Timeline';

            // Animate controls appearance
            setTimeout(() => {
                timelineControls.style.opacity = '1';
                timelineControls.style.transform = 'translateY(0)';
            }, 300);

            createStraightLineTimeline();
        } else {
            svgTimelineContainer.classList.remove('active');
            timelineToggle.classList.remove('active');
            timelineControls.style.display = 'none';
            timelineControls.style.opacity = '0';
            timelineControls.style.transform = 'translateY(-10px)';
            toggleIcon.setAttribute('data-lucide', 'chevron-down');
            toggleText.textContent = 'Show Interactive Timeline';
        }

        lucide.createIcons();
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter
            currentFilter = button.dataset.filter;

            // Recreate timeline with new filter
            if (timelineVisible) {
                createStraightLineTimeline();
            }
        });
    });

    // Initialize timeline controls styling
    timelineControls.style.opacity = '0';
    timelineControls.style.transform = 'translateY(-10px)';
    timelineControls.style.transition = 'all 0.3s ease';

    // Handle window resize for responsive timeline
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (timelineVisible) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createStraightLineTimeline();
            }, 300);
        }
    });

    // --- Animated Background ---
    const bgCanvas = document.getElementById('animated-bg');
    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];

    function setBgCanvasSize() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = document.documentElement.scrollHeight;
    }

    class BgParticle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            bgCtx.fillStyle = this.color;
            bgCtx.fill();
        }
        update() {
            if (this.x > bgCanvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > bgCanvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initBgParticles() {
        bgParticles = [];
        let numberOfParticles = (bgCanvas.height * bgCanvas.width) / 18000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5;
            let x = (Math.random() * ((bgCanvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((bgCanvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .2) - .1;
            let directionY = (Math.random() * .2) - .1;
            let color = document.documentElement.classList.contains('dark') ? 'var(--md-sys-color-plexus-dark)' : 'var(--md-sys-color-plexus-light)';
            bgParticles.push(new BgParticle(x, y, directionX, directionY, size, color));
        }
    }

    function connectBgParticles() {
        let opacityValue = 1;
        for (let a = 0; a < bgParticles.length; a++) {
            for (let b = a; b < bgParticles.length; b++) {
                let distance = ((bgParticles[a].x - bgParticles[b].x) * (bgParticles[a].x - bgParticles[b].x)) + ((bgParticles[a].y - bgParticles[b].y) * (bgParticles[a].y - bgParticles[b].y));
                if (distance < (bgCanvas.width / 10) * (bgCanvas.height / 10)) {
                    opacityValue = 1 - (distance / 20000);
                    let color = document.documentElement.classList.contains('dark') ? `rgba(128, 213, 213, ${opacityValue * 0.1})` : `rgba(0, 106, 106, ${opacityValue * 0.1})`;
                    bgCtx.strokeStyle = color;
                    bgCtx.lineWidth = 1;
                    bgCtx.beginPath();
                    bgCtx.moveTo(bgParticles[a].x, bgParticles[a].y);
                    bgCtx.lineTo(bgParticles[b].x, bgParticles[b].y);
                    bgCtx.stroke();
                }
            }
        }
    }

    function animateBg() {
        requestAnimationFrame(animateBg);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        for (let i = 0; i < bgParticles.length; i++) {
            bgParticles[i].update();
        }
        connectBgParticles();
    }

    setBgCanvasSize();
    initBgParticles();
    animateBg();
    window.addEventListener('resize', () => { setBgCanvasSize(); initBgParticles(); });

    // --- Card Tilt Effect ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15;
            const rotateY = (x / width - 0.5) * 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Staggered Animations on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animatables = entry.target.querySelectorAll('.animatable');
                anime({
                    targets: animatables,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: (el, i) => i * 100 + parseFloat(el.style.getPropertyValue("--delay") || 0) * 1000,
                    easing: 'easeOutExpo',
                    duration: 1000
                });

                // Animate timeline graph events
                const timelineEvents = entry.target.querySelectorAll('.timeline-graph-event');
                if (timelineEvents.length > 0) {
                    anime({
                        targets: timelineEvents,
                        width: (el) => `${el.dataset.width}%`,
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                        easing: 'easeInOutSine',
                        duration: 800
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.target-section, #hero .animatable').forEach(section => {
        observer.observe(section);
    });

    // --- Event Listeners ---
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    function createRipple(event) {
        const target = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        const rect = target.getBoundingClientRect();
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");
        const ripple = target.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();
        target.appendChild(circle);
    }
    document.querySelectorAll('.card, .m3-button').forEach(el => {
        el.addEventListener('click', createRipple);
    });

    const toggleSwitch = document.querySelector('#checkbox');
    const slider = toggleSwitch.nextElementSibling;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.classList.add(currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            slider.style.backgroundColor = 'var(--md-sys-color-primary-dark)';
        }
    }
    toggleSwitch.addEventListener('change', (e) => {
        document.documentElement.classList.toggle('dark', e.target.checked);
        localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
        slider.style.backgroundColor = e.target.checked ? 'var(--md-sys-color-primary-dark)' : 'var(--md-sys-color-primary-light)';
        initBgParticles(); // Re-initialize particles with new colors
    });

    document.body.addEventListener('click', function(e) {
        if (e.target.matches('.show-more-btn, .show-more-btn *')) {
            const button = e.target.closest('.show-more-btn');
            const list = button.previousElementSibling;
            const hiddenItems = list.querySelectorAll('.hidden-item');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            hiddenItems.forEach(item => item.style.display = isExpanded ? 'none' : 'list-item');
            button.setAttribute('aria-expanded', !isExpanded);
            button.innerHTML = !isExpanded ? 'Show less <i data-lucide="chevron-up" class="w-4 h-4 ml-1"></i>' : 'Show more <i data-lucide="chevron-down" class="w-4 h-4 ml-1"></i>';
            lucide.createIcons();
        }
    });

    // --- Quick Access Section ---
    const resumeQuickBtn = document.getElementById('resume-quick-btn');
    const contactQuickBtn = document.getElementById('contact-quick-btn');
    const qrDisplayModal = document.getElementById('qr-display-modal');
    const qrDisplayClose = document.getElementById('qr-display-close');
    const qrDisplayImage = document.getElementById('qr-display-image');
    const qrDisplayTitle = document.getElementById('qr-display-title');
    const qrDisplaySubtitle = document.getElementById('qr-display-subtitle');

    // Enhanced Download Modal Elements
    const openModalBtn = null; // Removed download-resume-btn
    const modalBackdrop = document.getElementById('resume-modal-backdrop');
    const modal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const qrCodeImg = document.getElementById('qr-code-img');
    const modalDownloadBtn = document.getElementById('modal-download-btn');
    const shareResumeBtn = document.getElementById('share-resume-btn');
    const downloadCountEl = document.getElementById('download-count');
    const lastUpdatedEl = document.getElementById('last-updated');


    const resumeUrl = 'https://github.com/sahmedhusain/portfolio-v1/raw/main/Sayed_Ahmed_Husain_Resume.pdf';
    const contactVCard = `BEGIN:VCARD
VERSION:3.0
FN:Sayed Ahmed Husain
ORG:Professional Engineer
TITLE:Electrical Engineer & Full Stack Developer
EMAIL:sayedahmed97.sad@gmail.com
URL:https://linkedin.com/in/97ahm
URL:https://github.com/sahmedhusain
TEL:+973-XXXXXXXX
END:VCARD`;

    // Initialize download count from localStorage or default
    let downloadCount = parseInt(localStorage.getItem('resumeDownloadCount') || '1200');

    function updateDownloadCount() {
        downloadCount++;
        localStorage.setItem('resumeDownloadCount', downloadCount.toString());
        const formattedCount = downloadCount > 1000 ? `${(downloadCount/1000).toFixed(1)}K+` : downloadCount.toString();
        if (downloadCountEl) downloadCountEl.textContent = formattedCount;
    }

    function updateLastUpdated() {
        const now = new Date();
        const formatted = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (lastUpdatedEl) lastUpdatedEl.textContent = formatted;
    }

    // Enhanced QR Code Display Functions
    function showQRCode(type, data, title, subtitle) {
        const qrDisplayIcon = document.getElementById('qr-display-icon');
        let qrApiUrl;
        let iconType;

        if (type === 'contact') {
            qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&bgcolor=ffffff&color=000000&margin=10&format=png`;
            iconType = 'user';
        } else if (type === 'resume') {
            qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&bgcolor=ffffff&color=000000&margin=10&format=png`;
            iconType = 'file-text';
        }

        // Update modal content
        qrDisplayImage.src = qrApiUrl;
        qrDisplayTitle.textContent = title;
        qrDisplaySubtitle.textContent = subtitle;

        // Update icon
        if (qrDisplayIcon) {
            qrDisplayIcon.innerHTML = `<i data-lucide="${iconType}" class="w-8 h-8"></i>`;
            lucide.createIcons();
        }

        // Show modal with enhanced animation
        qrDisplayModal.classList.add('active');

        // Staggered entrance animations
        setTimeout(() => {
            const content = qrDisplayModal.querySelector('.qr-display-content');
            content.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        }, 100);

        // Add loading state for QR image
        qrDisplayImage.style.opacity = '0.5';
        qrDisplayImage.onload = () => {
            qrDisplayImage.style.transition = 'opacity 0.5s ease';
            qrDisplayImage.style.opacity = '1';
        };
    }

    function hideQRCode() {
        const content = qrDisplayModal.querySelector('.qr-display-content');
        content.style.transform = 'scale(0.7) rotateX(20deg) rotateY(15deg)';

        setTimeout(() => {
            qrDisplayModal.classList.remove('active');
            // Reset image opacity for next use
            qrDisplayImage.style.opacity = '0.5';
        }, 400);
    }

    // Quick Access Button Event Handlers
    if (resumeQuickBtn) {
        resumeQuickBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (contactQuickBtn) {
        contactQuickBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showQRCode('contact', contactVCard, 'Contact Information', 'Scan to add my contact details to your phone');
        });
    }

    // QR Display Modal Event Handlers
    if (qrDisplayClose) {
        qrDisplayClose.addEventListener('click', hideQRCode);
    }

    if (qrDisplayModal) {
        qrDisplayModal.addEventListener('click', (e) => {
            if (e.target === qrDisplayModal) {
                hideQRCode();
            }
        });
    }

    function openResumeModal() {
        // Generate QR code
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(resumeUrl)}&bgcolor=ffffff&color=000000&margin=10`;
        qrCodeImg.src = qrApiUrl;

        // Set download link
        modalDownloadBtn.href = resumeUrl;

        // Update last updated date
        const now = new Date();
        lastUpdatedEl.textContent = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        // Show modal with animation
        modalBackdrop.classList.add('active');
        modal.classList.add('active');

        // Add entrance animation
        setTimeout(() => {
            modal.style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
        }, 50);
    }

    function closeResumeModal() {
        modal.style.transform = 'translate(-50%, -50%) scale(0.8) rotateY(15deg)';
        setTimeout(() => {
            modalBackdrop.classList.remove('active');
            modal.classList.remove('active');
        }, 300);
    }

    // Event listeners
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResumeModal();
    });

    closeModalBtn.addEventListener('click', closeResumeModal);

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeResumeModal();
        }
    });

    // Download button functionality
    modalDownloadBtn.addEventListener('click', (e) => {
        updateDownloadCount();

        // Add download animation
        const btn = e.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Downloading...</span>';

        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i><span>Downloaded!</span>';
            setTimeout(() => {
                btn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        }, 1000);
    });

    // Share functionality
    shareResumeBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const btn = e.currentTarget;
        const originalText = btn.innerHTML;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Sayed Ahmed Husain - Resume',
                    text: 'Check out my professional resume',
                    url: resumeUrl
                });

                btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i><span>Shared!</span>';
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(resumeUrl);
                btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i><span>Link Copied!</span>';
            }
        } catch (error) {
            btn.innerHTML = '<i data-lucide="x" class="w-5 h-5"></i><span>Error</span>';
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            lucide.createIcons();
        }, 2000);
    });

    // Initialize download count display
    const formattedCount = downloadCount > 1000 ? `${(downloadCount/1000).toFixed(1)}K+` : downloadCount.toString();
    if (downloadCountEl) downloadCountEl.textContent = formattedCount;

    // Initialize last updated date
    updateLastUpdated();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalBackdrop && modalBackdrop.classList.contains('active')) {
                closeResumeModal();
            }
            if (qrDisplayModal && qrDisplayModal.classList.contains('active')) {
                hideQRCode();
            }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (resumeQuickBtn) {
                resumeQuickBtn.click();
            }
        }
    });

    document.querySelectorAll('.placeholder-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                alert(`Please replace the placeholder link for "${e.currentTarget.dataset.docName}".`);
            }
        });
    });

    // --- Enhanced UX Features ---

    // Progress Indicator
    const progressBar = document.getElementById('progress-bar');

    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener('scroll', updateProgressBar);

    // Floating Action Button - Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    function toggleScrollToTopBtn() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', toggleScrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced Card Interactions
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('.enhanced-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }, 1000);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced button interactions
    setTimeout(() => {
        document.querySelectorAll('.timeline-toggle-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px) scale(1.05)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 500);



    // Initialize enhanced features
    updateProgressBar();
    toggleScrollToTopBtn();

});