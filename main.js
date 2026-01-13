// --- Professional Portfolio Website ---
// Vanilla JavaScript - No Framework

// Load External Resources
function loadResources() {
  // Google Fonts
  const fonts = document.createElement('link');
  fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap';
  fonts.rel = 'stylesheet';
  document.head.appendChild(fonts);

  // IonIcons
  const ionicons = document.createElement('script');
  ionicons.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
  ionicons.type = 'module';
  document.head.appendChild(ionicons);

  // Devicon for tech logos
  const devicon = document.createElement('link');
  devicon.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
  devicon.rel = 'stylesheet';
  devicon.type = 'text/css';
  document.head.appendChild(devicon);

  // Simple Icons for brand logos
  const simpleIcons = document.createElement('link');
  simpleIcons.href = 'https://cdn.jsdelivr.net/npm/simple-icons@v10/font/simple-icons.min.css';
  simpleIcons.rel = 'stylesheet';
  document.head.appendChild(simpleIcons);

  // Stylesheet
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'style.css';
  document.head.appendChild(style);

  document.title = 'Sayed Ahmed Husain | Electrical Engineer & Full-Stack Developer';
}

loadResources();

// --- Portfolio Data ---
const data = {
  // Profile Information
  name: 'SAYED AHMED HUSAIN',
  title: 'Electrical Engineer | Full-stack Developer | "Solar PV - CRPEP – Wireman" Licensed',
  nationality: 'Bahrain',
  address: 'Northen Governorate, Kingdom of Bahrain',
  qualification: 'Bachelor Degree',
  mobile: '+97333115351',
  email: 'sayedahmed97.sad@gmail.com',
  linkedin: 'linkedin.com/in/97ahm',
  github: 'github.com/sahmedhusain',
  avatar: 'Personal_picture.JPG',

  // Summary
  summary: `Electrical Engineer and Sales Strategist with specialized expertise in Electrical Engineering for Fire Safety Systems. I bridge the gap between complex technical requirements and business growth, leveraging deep knowledge of NFPA standards and fire alarm system design to secure high-value contracts and manage government tenders across Bahrain.

Currently advancing into Full-Stack Development, I apply this same engineering precision to build robust, scalable software solutions using Go and JavaScript. My goal is to leverage this dual-competency—industrial engineering insight combined with modern software architecture—to develop efficient tools that solve complex real-world challenges.`,

  // Professional Tagline
  tagline: 'Electrical Engineer | Full-stack Developer',

  // Contact Information
  contact: {
    email: 'sayedahmed97.sad@gmail.com',
    phone: '+97333115351',
    location: 'Bahrain',
    linkedin: 'https://linkedin.com/in/97ahm',
    github: 'https://github.com/sahmedhusain',
    twitter: 'https://x.com/_97ahm',
    discord: 'https://discord.com/users/s_97ahm'
  },

  // Technical Skills
  technicalSkills: {
    coreEngineering: ['Fire Protections Systems', 'Electrical Installation', 'Solar PV Systems', 'Power Electronics', 'Digital Circuits Design (Arduino, Pi)', 'Electrical Transmission Systems', 'Electrical Testing Equipment'],
    engineeringSoftware: ['AutoCAD', 'MATLAB', 'Circuit Verse', 'SolidWorks', 'Fusion 360', 'Everycircuit', 'Oracle DB/CRM', 'SAP System'],
    languages: ['JavaScript', 'TypeScript', 'Python', 'Golang', 'Rust', 'C', 'Cpp', 'SQLite', 'HTML5', 'CSS3', 'Dart', 'Flutter'],
    webTechnologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Apollo Client', 'WebSockets', 'PostgreSQL', 'MySQL', 'Firebase', 'NPM', 'MCP', 'Vite', 'Jest', 'ESLint'],
    systemsAndTools: ['Git', 'GitHub', 'VS Code', 'Docker', 'AWS', 'Postman', 'Figma', 'Mermaid', 'Markdown', 'Linux', 'WSL', 'macOS', 'Windows', 'Android', 'Xcode', 'Android Studio', 'TCP/IP', 'JSON', 'REST APIs', 'OAuth2', 'JWT'],
    systems: ['Linux', 'Raspberry Pi', 'macOS', 'Windows', 'Android'],
    tools: ['Git', 'GitHub', 'VS Code', 'Docker', 'AWS', 'Postman', 'Figma', 'Mermaid', 'Markdown', 'Bash', 'Xcode', 'Android Studio', 'TCP/IP', 'JSON', 'REST APIs', 'OAuth2', 'JWT'],
    computerScienceConcepts: ['Algorithms & Data Structures', 'Concurrency & Parallelism', 'Virtual DOM', 'State Management', 'Machine Learning']
  },

  // Personal Skills
  personalSkills: ['Adaptability', 'Communication', 'Fast Learner', 'Decision Making', 'Teamwork', 'Problem-solving', 'Time Management', 'Leadership', 'Training and Development', 'Project Management'],

  // Professional Experience
  experience: [
    {
      title: 'Public Relations In-Charge',
      company: 'Lichfield Fire and Safety Equipment Co., Ltd. (LIFECO)',
      location: 'Bahrain/UAE',
      date: 'May 2024 — February 2026',
      sections: {
        strategicSalesLeadership: [
          'Formulate and execute comprehensive Strategic Sales plans and quotas for the Bahrain market, ensuring strict alignment with corporate management objectives.',
          'Drive profitability by analyzing market dynamics, tracking competitor activities, and identifying new opportunities to increase revenue and market share.',
          'Lead and mentor sales teams, setting clear targets and monitoring performance to ensure sales goals are consistently met or exceeded.'
        ],
        tenderAndProcurementManagement: [
          'Secure high-value deals with public and private sectors by actively managing bids on the Bahrain Tender Board and Procural (Tenders & Auctions Platform).',
          'Oversee the end-to-end Vendor Management process, obtaining and maintaining industrial vendor pre-qualifications with key government and private entities.',
          'Identify and pursue public and private Government Tenders, managing the submission process to ensure compliance and competitiveness.'
        ],
        clientRelationsAndBusinessGrowth: [
          'Cultivate robust relationships with key accounts and expand the customer base by identifying and counseling district sales representatives.',
          'Conduct regular client visits to diagnose evolving needs, assess relationship quality, and negotiate pricing to close and renew orders.',
          'Establish and nurture critical relationships with Civil Defense and government ministries to facilitate smooth project execution and compliance.'
        ],
        marketIntelligenceAndOperations: [
          'Monitor key economic indicators, emerging market trends, and supply and demand shifts to optimize product mix and sales volume.',
          'Recommend new product lines and service improvements based on comprehensive market analysis and consumer needs surveys.',
          'Maintain technical expertise by participating in professional networks and reviewing industry publications to stay ahead of the curve.'
        ]
      }
    },
    {
      title: 'Electrical Engineer',
      company: 'Super Fire and Safety Services W.L.L',
      location: 'Bahrain',
      date: 'October 2022 — October 2023',
      points: [
        'System Design & Engineering: Completed detailed Fire Alarm System Designs and technical drawings utilizing current Bahrain CDFSD, GCC Fire Codes, NFPA standards, and project specifications.',
        'Installation & Commissioning: Directed electrical teams in the installation, programming, maintenance, testing, and commissioning of fire alarm control panels and suppression systems, ensuring full compliance with NFPA and EWA regulations.',
        'Quality Assurance: Conducted rigorous inspections and system tests to ensure all components met Electrical Engineering safety requirements and performance standards.'
      ],
      keyProjects: [
        'Bahrain Aluminium Company (ALBA): Deluge fire fighting system.',
        'Bahrain Steel Company: Fire suppression systems.',
        'Ministry of Education: Fire alarm systems.',
        'MCSIX: Fire alarm and firefighting systems for the Ministry of Works STP.'
      ]
    },
    {
      title: 'Retail Sales Specialist',
      company: 'Channels by STC',
      location: 'Bahrain',
      date: 'April 2022 — September 2022',
      sections: {
        salesStrategy: [
          'Served as a Retail Sales Advisor, expertly executing cross-selling and upselling strategies for a wide range of telecommunications products and services.'
        ],
        customerManagement: [
          'Managed complex customer inquiries and resolved complaints efficiently using the Oracle CRM enterprise system, ensuring high levels of customer satisfaction and retention.'
        ]
      }
    },
    {
      title: 'Retail Marketing and Customer Service',
      company: 'Zain Bahrain B.S.C',
      location: 'Bahrain',
      date: 'February 2019 — March 2022',
      sections: {
        operationsManagement: [
          'Served as Acting Branch Manager, overseeing sales team performance and optimizing retail shop operations to meet company standards.'
        ],
        salesExcellence: [
          'Consistently exceeded targets by cross-selling and upselling telecommunication services and products as a frontline agent.'
        ],
        technicalSupport: [
          'Acted as a Service Center Representative, troubleshooting service issues and resolving technical claims to minimize downtime for customers.'
        ],
        customerEngagement: [
          'Resolved high-volume customer complaints and requests with a focus on problem resolution and conducted outbound tele-sales calls to drive promotion uptake.'
        ]
      }
    }
  ],

  // Education
  education: [
    {
      degree: 'Full Stack Development Specialized Program (High Diploma)',
      institution: 'Reboot01 Coding Institute, Bahrain',
      date: 'March 2024 — March 2026'
    },
    {
      degree: 'Bachelor of Science in Electrical Engineering',
      institution: 'University of Bahrain, Bahrain',
      date: 'June 2022',
      certificate: 'Graduation_certificate.jpg'
    },
    {
      degree: 'High School (Physics and Mathematics)',
      institution: 'H.E Sheikh Isa bin Ali Secondary School, Bahrain',
      date: 'May 2015'
    }
  ],

  // Licenses & Certifications
  certifications: [
    {
      name: 'NOCN Level 3 Award for Solar PV Installer and Operator',
      type: 'Certificate',
      issuingAuthority: 'NOCN',
      id: '48282023',
      issued: 'Apr 2024',
      pdfUrl: 'SolarPV-NOCN.pdf'
    },
    {
      name: 'Certificate of Acknowledgement (Solar PV)',
      type: 'Certificate',
      issuingAuthority: 'Ministry of Electricity and Water Affairs (Bahrain)',
      id: 'MEWA Certificate No: 2024-21',
      issued: 'Jul 2024',
      expires: 'Jul 2029',
      pdfUrl: 'solar-pv-mewa.pdf'
    },
    {
      name: 'CRPEP License (Electrical)',
      type: 'License',
      issuingAuthority: 'The Council for Regulating the Practice of Engineering Professions (Bahrain)',
      id: 'EPP/C4597/EL/01-D',
      issued: 'Dec 2022',
      expires: 'Dec 2023',
      pdfUrl: 'crpep.pdf'
    },
    {
      name: 'Electrical Installation License',
      type: 'License',
      issuingAuthority: 'Electricity and Water Authority (Bahrain)',
      id: 'W2402010',
      issued: 'Feb 2024',
      expires: 'Feb 2029'
    },
    {
      name: 'Basic Life Support (BLS)',
      type: 'License',
      issuingAuthority: 'American Heart Association (AHA)',
      id: '225607015422',
      issued: 'Jul 2022',
      expires: 'Jul 2024',
      pdfUrl: 'BLS.pdf'
    },
    {
      name: 'B2B Sales Fundamentals',
      type: 'Course Certificate',
      issuingAuthority: 'Golden Trust Institute (Bahrain)',
      issued: 'Nov 2019'
    },
    {
      name: 'Emotional Intelligence',
      type: 'Course Certificate',
      issuingAuthority: 'Golden Trust Institute (Bahrain)',
      issued: 'Aug 2019'
    },
    {
      name: 'Online Learning Courses',
      type: 'Course Certificates',
      issuingAuthority: 'LinkedIn Learning',
      courses: [
        'AI in Business Essentials',
        'Leading with Innovation',
        'Critical Thinking'
      ]
    }
  ],

  // Professional Journey Data for Timeline
  professionalJourney: {
    education: [
      {
        title: 'High School (Physics and Mathematics)',
        institution: 'H.E Sheikh Isa bin Ali Secondary School, Bahrain',
        location: 'Bahrain',
        startDate: '2012-09-01',
        endDate: '2015-06-30',
        description: 'Completed high school with a focus on Physics and Mathematics.',
        icon: 'school-outline'
      },
      {
        title: 'Bachelor of Science in Electrical Engineering',
        institution: 'University of Bahrain',
        location: 'Bahrain',
        startDate: '2015-09-01',
        endDate: '2022-06-30',
        description: 'Completed Bachelor\'s degree in Electrical Engineering.',
        icon: 'school-outline'
      },
      {
        title: 'Full-Stack Development Program',
        institution: 'Reboot Coding Institute',
        location: 'Bahrain',
        startDate: '2024-03-01',
        endDate: '2026-03-31',
        description: 'Specialized program in full-stack development.',
        icon: 'code-slash-outline',
        current: true
      }
    ],
    internships: [
      {
        title: 'Electrical Test Equipment Internship',
        company: 'Megger',
        location: 'Virtual / India',
        startDate: '2020-07-01',
        endDate: '2020-09-30',
        description: 'Understanding the basics of using electronics test equipments in several tests such as grounding resistivity, CT, VT, protective relays and electric motors tests.',
        icon: 'construct-outline'
      }
    ],
    career: [
      {
        title: 'Retail Marketing and Customer Service',
        company: 'Zain Bahrain B.S.C',
        location: 'Bahrain',
        startDate: '2019-02-01',
        endDate: '2022-03-31',
        description: 'Served as Acting Branch Manager, overseeing sales team performance and optimizing retail shop operations to meet company standards. Consistently exceeded targets by cross-selling and upselling telecommunication services and products as a frontline agent. Acted as a Service Center Representative, troubleshooting service issues and resolving technical claims to minimize downtime for customers. Resolved high-volume customer complaints and requests with a focus on problem resolution and conducted outbound tele-sales calls to drive promotion uptake.',
        icon: 'storefront-outline'
      },
      {
        title: 'Retail Sales Specialist',
        company: 'Channels by STC',
        location: 'Bahrain',
        startDate: '2022-04-01',
        endDate: '2022-09-30',
        description: 'Served as a Retail Sales Advisor, expertly executing cross-selling and upselling strategies for a wide range of telecommunications products and services. Managed complex customer inquiries and resolved complaints efficiently using the Oracle CRM enterprise system, ensuring high levels of customer satisfaction and retention.',
        icon: 'storefront-outline'
      },
      {
        title: 'Electrical Engineer',
        company: 'Super Fire and Safety Services W.L.L',
        location: 'Bahrain',
        startDate: '2022-10-01',
        endDate: '2023-10-31',
        description: 'Completed detailed Fire Alarm System Designs and technical drawings utilizing current Bahrain CDFSD, GCC Fire Codes, NFPA standards, and project specifications. Directed electrical teams in the installation, programming, maintenance, testing, and commissioning of fire alarm control panels and suppression systems, ensuring full compliance with NFPA and EWA regulations. Conducted rigorous inspections and system tests to ensure all components met Electrical Engineering safety requirements and performance standards.',
        icon: 'flash-outline'
      },
      {
        title: 'Public Relations In-Charge',
        company: 'Lichfield Fire and Safety Equipment Co., Ltd. (LIFECO)',
        location: 'Bahrain/UAE',
        startDate: '2024-05-01',
        endDate: '2026-02-28',
        description: 'Formulate and execute comprehensive Strategic Sales plans and quotas for the Bahrain market, ensuring strict alignment with corporate management objectives. Drive profitability by analyzing market dynamics, tracking competitor activities, and identifying new opportunities to increase revenue and market share. Lead and mentor sales teams, setting clear targets and monitoring performance to ensure sales goals are consistently met or exceeded. Secure high-value deals with public and private sectors by actively managing bids on the Bahrain Tender Board and Procural (Tenders & Auctions Platform). Oversee the end-to-end Vendor Management process, obtaining and maintaining industrial vendor pre-qualifications with key government and private entities. Identify and pursue public and private Government Tenders, managing the submission process to ensure compliance and competitiveness. Cultivate robust relationships with key accounts and expand the customer base by identifying and counseling district sales representatives. Conduct regular client visits to diagnose evolving needs, assess relationship quality, and negotiate pricing to close and renew orders. Establish and nurture critical relationships with Civil Defense and government ministries to facilitate smooth project execution and compliance. Monitor key economic indicators, emerging market trends, and supply and demand shifts to optimize product mix and sales volume. Recommend new product lines and service improvements based on comprehensive market analysis and consumer needs surveys. Maintain technical expertise by participating in professional networks and reviewing industry publications to stay ahead of the curve.',
        icon: 'business-outline',
        current: true
      }
    ],
    certifications: [
      {
        title: 'Corporate Sales Fundamentals',
        issuer: 'Golden Trust',
        date: '2019-11-01',
        description: 'Certification in Corporate Sales Fundamentals',
        icon: 'ribbon-outline'
      },
      {
        title: 'Emotional Intelligence',
        issuer: 'Golden Trust',
        date: '2019-08-01',
        description: 'Certification in Emotional Intelligence',
        icon: 'ribbon-outline'
      },
      {
        title: 'Basic Life Support (BLS)',
        issuer: 'American Heart Association',
        date: '2022-07-01',
        description: 'Certification in Basic Life Support (BLS)',
        icon: 'ribbon-outline'
      },
      {
        title: 'Engineering License (Electrical)',
        issuer: 'CRPEP',
        date: '2022-12-01',
        description: 'Engineering License (Electrical)',
        icon: 'ribbon-outline'
      },
      {
        title: 'Electrical Installation Wireman',
        issuer: 'EWA Bahrain',
        date: '2024-02-01',
        description: 'Electrical Installation Wireman License',
        icon: 'ribbon-outline'
      },
      {
        title: 'NOCN Level 3 Award — Solar PV Installer and Operator',
        issuer: 'NOCN Group',
        date: '2024-03-01',
        description: 'NOCN Level 3 Award for Solar PV Installer and Operator',
        icon: 'ribbon-outline'
      },
      {
        title: 'NOCN Level 3 Award — Solar PV Installer and Operator',
        issuer: 'EWA Acknowledgment',
        date: '2024-07-01',
        description: 'NOCN Level 3 Award for Solar PV Installer and Operator (EWA Acknowledgment)',
        icon: 'ribbon-outline'
      }
    ]
  },

  // Projects
  projects: [
    {
      name: 'Smart Streetlights',
      type: 'University Graduation Project',
      links: [
        { text: 'Thesis', url: 'Smart_Street_Lights_-_Final_Report.pdf' },
        { text: 'Poster', url: 'Smart_streetligts_poster.pdf' }
      ],
      date: 'January 2020 — May 2020',
      points: [
        'The current streetlight control methods in Bahrain lack precision and environmental sensing, prompting engineers to reassess the standard to find cost-effective solutions for smart road lighting.',
        'The project aims to develop an intelligent lighting system that improves the existing streetlight functionality.',
        'To address this, an Arduino controller and motion detection sensors will be used to activate streetlights based on traffic conditions.',
        'Additionally, the project will compare energy consumption between high-pressure sodium lights and LEDs.',
        'Implementing an intelligent street lighting system saves energy, extends lighting lifespan, and reduces maintenance costs.',
        'It optimizes lighting by avoiding unnecessary usage when no vehicles or pedestrians are present.'
      ],
      tech: ['Arduino', 'cpp', 'Java', 'IoT', 'Motion Sensors', 'LED Technology']
    },
    {
      name: 'GigaBit',
      subtitle: 'Real-Time Social Network (Go + Next.js)',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/GigaBit' }
      ],
      points: [
        'Built GigaBit, a Full-Stack Development project featuring a real-time social networking platform that covers the complete surface area of a modern community application, from authentication and privacy controls to live communication and group collaboration.',
        'Profiles with public/private visibility, follow requests, and approval flows.',
        'Content system including posts with media, threaded comments, reactions, bookmarks, shares, and polls.',
        'Community features such as groups with roles and permissions, invitations, gated membership, group posts, and events with RSVP handling.',
        'Real-time capabilities using WebSockets for private and group messaging, typing indicators, notifications, online status, and live feed updates.',
        'Relational data model using SQLite to support the social graph and interaction workflows.'
      ],
      tech: ['Go', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Apollo Client', 'Framer Motion', 'SQLite', 'WebSocket', 'Gorilla Mux', 'Docker'],
      featured: true
    },
    {
      name: '01 Dashboard',
      subtitle: 'Personal Learning Analytics Platform (React + Typescript + GraphQL)',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/01-Dashboard' }
      ],
      points: [
        '01 Dashboard is a web-based analytics dashboard built to visualize and analyze learning progress on the reboot01 platform.',
        'The project aggregates data related to XP, projects, audits, and timelines, presenting it in a clear and structured way to help users better understand their learning patterns over time.',
        'The dashboard consumes real data through a GraphQL API and uses Apollo Client for efficient querying, caching, and request batching.',
        'Authentication is secured using JWT, with token refresh logic to maintain stable user sessions.',
        'From a front-end perspective, the project focuses on clarity and usability.',
        'Interactive charts and visual summaries are used to represent progress, audit performance, and project distribution, while a responsive layout ensures the dashboard works well across devices.'
      ],
      tech: ['React', 'TypeScript', 'Vite', 'GraphQL', 'Apollo Client', 'Tailwind CSS', 'Framer Motion', 'JWT', 'SVG Charts'],
      featured: true
    },
    {
      name: 'Connecthub RT',
      subtitle: 'Real-Time Forum & Chat Application',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/Connecthub-RT' }
      ],
      points: [
        'Connecthub RT is a real-time web application built with Go that combines a traditional discussion forum with live communication features.',
        'The platform supports posts, comments, categories, and private messaging, allowing users to interact without the delays typically found in standard forum systems.',
        'The backend is structured around Go\'s concurrency model and WebSocket communication, enabling instant updates for comments, online status, and private chats.',
        'Persistent data such as users, posts, and messages is managed using SQLite, keeping the architecture simple while still reflecting real-world application design.',
        'The project focuses on practical backend concepts, including session handling, secure password hashing, and real-time connection management.',
        'The frontend uses HTML, CSS, and JavaScript to deliver a responsive interface that works smoothly across devices.'
      ],
      tech: ['Go', 'JavaScript', 'HTML5', 'CSS3', 'SQLite', 'WebSocket', 'Gorilla Mux', 'Docker', 'Jest', 'Playwright']
    },
    {
      name: 'PicoJS Framework',
      subtitle: 'Reactive UI Framework (JavaScript)',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/PicoJS-Framework' }
      ],
      points: [
        'Built PicoJS Framework, a lightweight JavaScript framework created to explore and implement the core mechanics behind modern UI libraries in a clean and readable codebase.',
        'The project focuses on understanding how reactive state, Virtual DOM rendering, and event handling work together to keep user interfaces predictable and efficient.',
        'Virtual DOM diffing with minimal DOM patching.',
        'Reactive state management with automatic re-renders.',
        'Centralized event delegation for better performance and cleanup.',
        'Hash-based routing that stays in sync with application state.',
        'Includes a complete TodoMVC demo demonstrating real-world usage.'
      ],
      tech: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Virtual DOM', 'Reactive State', 'Hash Routing', 'Zero Dependencies'],
      featured: true
    },
    {
      name: '01 ConnectHub',
      subtitle: 'Full-Stack Web Forum Application',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/01-ConnectHub' }
      ],
      points: [
        '01 ConnectHub is a full-stack web forum application built with Go, tailored to support structured community discussions and meaningful user interaction.',
        'The platform allows users to register, create posts, participate in discussions through comments, and engage with content using likes and dislikes, all within a moderated and secure environment.',
        'The application implements a complete authentication system, including secure password hashing and OAuth2 social login using Google and GitHub.',
        'Role-based access control enables administrators and moderators to manage users and content effectively.',
        'From a technical perspective, the project focuses heavily on backend architecture, session management, and data persistence.',
        'Server-side rendering is powered by Go, while the frontend is built with HTML, CSS, and JavaScript.'
      ],
      tech: ['Go', 'HTML5', 'CSS3', 'JavaScript', 'SQLite', 'OAuth2', 'Gorilla Sessions', 'bcrypt', 'Docker']
    },
    {
      name: 'HarmonyHub',
      subtitle: 'Music & Concert Discovery Platform',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/HarmonyHub' }
      ],
      points: [
        'HarmonyHub is a web application engineered in Go that brings together music artists and their concert information in a single, structured platform.',
        'The application aggregates artist profiles, band members, formation details, and performance schedules using data retrieved from an external REST API.',
        'The project focuses on clean server-side architecture, structured data handling, and clear presentation of API-driven content.',
        'Artist and concert data are processed using Go structs and rendered through server-side templates, ensuring reliability, performance, and maintainability.'
      ],
      tech: ['Go', 'HTML5', 'CSS3', 'JavaScript', 'REST API', 'HTML Templates', 'JSON']
    },
    {
      name: 'AntFinder',
      subtitle: 'Graph Pathfinding Simulation in Go',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/AntFinder' }
      ],
      points: [
        'AntFinder is a terminal-based application programmed in Go that simulates efficient pathfinding for ant colonies moving through a graph.',
        'The project focuses on discovering optimal routes and coordinating the movement of multiple ants from a start node to an end node while minimizing the total number of turns.',
        'The application applies classic graph algorithms, including Depth-First Search (DFS), to explore and evaluate possible paths.',
        'Ant movement is simulated step by step, ensuring conflict-free traversal and balanced path assignment.'
      ],
      tech: ['Go', 'Algorithms', 'DFS', 'Graph Traversal', 'Pathfinding']
    },
    {
      name: 'GoTalk',
      subtitle: 'Concurrent TCP Chat Server',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/GoTalk' }
      ],
      points: [
        'GoTalk is a TCP-based chat server architected in Go, optimized to support real-time communication between multiple terminal clients.',
        'The application allows users to connect concurrently, exchange messages instantly, and interact within a shared chat environment.',
        'The project focuses on core systems programming concepts, including concurrent client handling using goroutines, message broadcasting through shared channels, and reliable network communication via TCP sockets.',
        'Each message is timestamped, users are uniquely identified, and chat activity is persisted through server-side logging.'
      ],
      tech: ['Go', 'TCP/IP', 'Goroutines', 'Channels', 'Networking', 'File I/O']
    },
    {
      name: 'Space Blaster',
      subtitle: 'Browser-Based Arcade Game',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/SpaceBlaster' }
      ],
      points: [
        'Space Blaster is a browser-based space shooter built using HTML, CSS, and JavaScript, inspired by classic arcade games.',
        'Players control a spaceship to navigate enemy waves, fire lasers, and build their score in real time.',
        'The project emphasizes smooth gameplay, responsive keyboard controls, and clear game-state management.',
        'Enemy movement, collision detection, scoring, and lives are orchestrated through structured JavaScript logic and DOM manipulation.',
        'Audio effects are integrated to enhance immersion without relying on external libraries.'
      ],
      tech: ['JavaScript ES6', 'HTML5', 'CSS3', 'DOM Manipulation', 'Audio API', 'Game Development']
    },
    {
      name: 'ASCII Forge',
      subtitle: 'ASCII Art Generator Web Application',
      links: [
        { text: 'Repository', url: 'https://github.com/sahmedhusain/ASCIIForge' }
      ],
      points: [
        'ASCII Forge is a web-based application implemented in Go that converts plain text into stylized ASCII art using multiple banner formats, including standard, shadow, and thinkertoy.',
        'The application provides a clean and intuitive interface that allows users to generate creative text representations directly from the browser.',
        'The project focuses on server-side text processing and dynamic content generation, handling banner parsing and rendering logic efficiently.',
        'Users can export the generated ASCII output as text files, making it easy to reuse or share across different platforms.'
      ],
      tech: ['Go', 'HTML5', 'CSS3', 'Bootstrap', 'Docker', 'Text Processing', 'File I/O']
    },
    {
      name: 'This personal Website',
      subtitle: 'Interactive Portfolio & Resume Website',
      points: [
        'Built this comprehensive personal portfolio website showcasing professional experience, technical skills, and project work as an Electrical Engineer and Full-Stack Developer.',
        'The website features an interactive timeline visualization of career progression, detailed project showcases, and a responsive design that works seamlessly across all devices.',
        'Implemented modern web technologies including dynamic content rendering, smooth animations, and interactive elements to create an engaging user experience.',
        'Integrated contact forms, downloadable resume, and vCard functionality for easy professional networking.',
        'The site serves as both a professional showcase and a demonstration of web development capabilities, built entirely with vanilla JavaScript, HTML5, and CSS3.'
      ],
      tech: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Responsive Design', 'Interactive Timeline', 'Web Animations', 'Contact Integration'],
      featured: true
    }
  ],

  // Avatar
  avatar: 'Personal_picture.JPG',

  // Graduation Certificate
  graduationCertificate: 'Graduation_certificate.jpg',

  // CV URL
  cvUrl: 'Sayed_Ahmed_Resume.pdf',

  // vCard URL
  vCardUrl: 'Sayed Ahmed Husain.vcf',

  // Services
  services: [
    {
      title: 'Web Development',
      description: 'High-quality development of sites at the professional level.',
      icon: '💻'
    },
    {
      title: 'Electrical Engineering',
      description: 'Design and installation of fire safety and electrical systems.',
      icon: '⚡'
    },
    {
      title: 'Full-Stack Development',
      description: 'Building robust, scalable software solutions using modern technologies.',
      icon: '🚀'
    }
  ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Render the complete app
  app.innerHTML = `
    ${renderSidebar()}
    <div class="main-content">
      ${renderNavbar()}
      <article class="about active" data-page="about">
        ${renderAboutSection() + renderProfessionalJourneySection() + renderSkillsSection()}
      </article>
      <article class="experience" data-page="journey">
        ${renderExperienceSection()}
      </article>
      <article class="projects" data-page="projects">
        ${renderProjectsSection()}
      </article>
      <article class="contact" data-page="contact">
        ${renderContactSection()}
      </article>
    </div>
    ${renderFooter()}
    ${renderSideElements()}
    ${renderContactModal()}
  `;

  // After rendering: attach any missing logos (uses workspace local assets when available)
  try {
    // Add images to certification headers (anchor + image) and remove placeholder icon
    document.querySelectorAll('.cert-header').forEach(header => {
      if (header.querySelector('a.logo-link') || header.querySelector('img.org-logo')) return; // already handled
      const authorityEl = header.querySelector('.cert-authority');
      const authority = authorityEl ? authorityEl.textContent.trim() : '';
      const logoSrc = getLogo(authority, '');
      if (logoSrc) {
        const a = document.createElement('a');
        a.href = getEntityUrl(authority);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'logo-link';
        a.title = authority;
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = `${authority} logo`;
        img.className = 'org-logo small cert-icon';
        img.onerror = function () { this.style.display = 'none'; };
        a.appendChild(img);
        header.insertBefore(a, header.firstChild);
      }
      // Remove fallback ribbon icon if present
      const ribbon = header.querySelector('ion-icon[name="ribbon-outline"]');
      if (ribbon) ribbon.remove();
    });

    // Ensure timeline items (list entries) show logos if missing (anchor + image)
    document.querySelectorAll('.timeline-item').forEach(item => {
      if (item.querySelector('.org-logo') || item.querySelector('a.logo-link')) return;
      const span = item.querySelector('span') || item.querySelector('.timeline-item-title');
      const name = span ? span.textContent.trim() : '';
      const logoSrc = getLogo(name, '');
      if (logoSrc) {
        const a = document.createElement('a');
        a.href = getEntityUrl(name);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'logo-link';
        a.title = name;
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = `${name} logo`;
        img.className = 'org-logo small';
        img.onerror = function () { this.style.display = 'none'; };
        a.appendChild(img);
        item.insertBefore(a, item.firstChild);
      }
    });
  } catch (e) {
    console.warn('Logo injection helper failed:', e);
  }

  // Initialize event listeners
  initializeEventListeners();

  // Handle initial hash or default to about
  const initialPage = window.location.hash.substring(1) || 'about';
  setActivePage(initialPage);

  // Initialize skills animations
  initializeSkillsAnimations();
});

// Skills Animation Functions
function initializeSkillsAnimations() {
  // Animate stats counters
  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const targetStr = stat.getAttribute('data-target');
      const hasPlus = targetStr.includes('+');
      const target = parseInt(targetStr);
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = targetStr; // Use the original string (with + if present)
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
      }, 20);
    });
  };

  // Intersection Observer for skills section
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateStats();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe skills section
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Add hover effects for skill cards
  const skillCards = document.querySelectorAll('.skills-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const particles = card.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.animationPlayState = 'running';
      });
    });

    card.addEventListener('mouseleave', (e) => {
      const particles = card.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.animationPlayState = 'paused';
      });
    });
  });

  // Add click effects for tech logos - DISABLED
  // const techLogoItems = document.querySelectorAll('.tech-logo-item');
  // techLogoItems.forEach(item => {
  //   item.addEventListener('click', () => {
  //     item.classList.add('tech-logo-clicked');
  //     setTimeout(() => {
  //       item.classList.remove('tech-logo-clicked');
  //     }, 300);
  //   });
  // });

  // Add skill badge interactions - DISABLED
  // const skillBadges = document.querySelectorAll('.skill-badge');
  // skillBadges.forEach(badge => {
  //   badge.addEventListener('click', () => {
  //     badge.classList.add('badge-active');
  //     setTimeout(() => {
  //       badge.classList.remove('badge-active');
  //     }, 500);
  //   });
  // });
}

// Set active page function
function setActivePage(targetPage) {
  const navLinkButtons = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  // Remove active from all
  navLinkButtons.forEach(l => l.classList.remove('active'));
  pages.forEach(p => p.classList.remove('active'));

  // Add active to target
  const link = document.querySelector(`[data-nav-link="${targetPage}"]`);
  if (link) link.classList.add('active');
  const page = document.querySelector(`[data-page="${targetPage}"]`);
  if (page) {
    page.classList.add('active');

    // Add special animation for contact page
    if (targetPage === 'contact') {
      page.classList.add('contact-animate');
      // Remove animation class after animation completes
      setTimeout(() => {
        page.classList.remove('contact-animate');
      }, 800); // Match animation duration
    }
  }

  // Update hash
  window.location.hash = targetPage;

  // Update nav-logo based on page
  const navLogo = document.querySelector('.nav-logo');
  if (targetPage === 'about') {
    navLogo.classList.remove('other-route');
  } else {
    navLogo.classList.add('other-route');
  }
}

// Render Functions
function renderSidebar() {
  return `
    <aside class="sidebar" data-sidebar>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img src="${data.avatar}" alt="${data.name}" width="80" onerror="this.onerror=null;">
        </figure>
        <div class="action-buttons">
          <button class="action-btn primary">
            <ion-icon name="document-text-outline"></ion-icon>
            <span>Download Resume</span>
          </button>
          <button class="action-btn secondary">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>Contact Details</span>
          </button>
        </div>
      </div>
      <div class="sidebar-info-more">
        <div class="separator"></div>
        <ul class="contacts-list">
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Email</p>
              <a href="mailto:${data.contact.email}" class="contact-link">${data.contact.email}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Phone</p>
              <a href="tel:${data.contact.phone}" class="contact-link">${data.contact.phone}</a>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="flag-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Nationality</p>
              <address>${data.nationality}</address>
            </div>
          </li>
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Address</p>
              <address>${data.address}</address>
            </div>
          </li>
        </ul>
        <div class="separator"></div>
        <ul class="social-list">
          <li class="social-item">
            <a href="${data.contact.github}" class="social-link">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li class="social-item">
            <a href="${data.contact.linkedin}" class="social-link">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `;
}

const iconMap = {
  'everycircuit': { type: 'img', src: 'https://everycircuit.com/website/drawable-ldpi/symbol_spin.png' },
  'go': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  'golang': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  'go golang': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  'javascript': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  'javascript es6': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  'typescript': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  'java': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg' },
  'html5': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg' },
  'html': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg' },
  'css3': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg' },
  'css': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg' },
  'react': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg' },
  'nextjs': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  'next.js': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  'vite': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  'vitejs': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  'tailwind css': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  'graphql': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
  'apollo client': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apollographql/apollographql-original.svg' },
  'apollo': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apollographql/apollographql-original.svg' },
  'sqlite': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  'postgresql': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  'mysql': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  'mcp': { type: 'img', src: 'https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/mcp.png' },
  'docker': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  'bootstrap': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
  'arduino': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
  'bash': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
  'raspberry pi': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg' },
  'node.js': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  'nodejs': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  'npm': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg' },
  'jest': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg' },
  'eslint': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg' },
  'framer motion': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
  'framer': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
  'json': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
  'playwright': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
  'c': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  'cplusplus': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  'c++': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  'cpp': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  'rust': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-line.svg' },
  'php': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  'laravel': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  'oauth': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg' },
  'oauth2': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg' },
  'aws': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  'postman': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  'git': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  'github': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  'linux': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  'vs code': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  'figma': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  'mermaid': { type: 'img', src: 'https://mermaid.live/favicon.svg' },
  'markdown': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg' },
  'wsl': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  'macos': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg' },
  'windows': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg' },
  'android': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
  'xcode': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg' },
  'android studio': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg' },
  'firebase': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain-wordmark.svg' },
  'python': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  'flutter': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  'matlab': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg' },
  'simulink': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg' },
  'matlab simulink': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg' },
  'autocad': { type: 'img', src: 'https://web.autocad.com/favicon.ico' },
  'solidworks': { type: 'img', src: 'https://www.solidworks.com/themes/custom/sw-digital/favicon.ico' },
  'fusion 360': { type: 'img', src: 'https://damassets.autodesk.net/content/dam/autodesk/www/product-imagery/badge-75x75/simplified-badges/fusion-360-product-design-extension-2023-simplified-badge-75x75.png' },
  'oracle': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  'oracle db crm': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  'sap': { type: 'img', src: 'https://simpleicons.org/icons/sap.svg' },
  'sap system': { type: 'img', src: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDEyLjM4IDIwNCI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMXtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjIwNi4xOSIgeDI9IjIwNi4xOSIgeTI9IjIwNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwYjhmMSIvPjxzdG9wIG9mZnNldD0iMC4wMiIgc3RvcC1jb2xvcj0iIzAxYjZmMCIvPjxzdG9wIG9mZnNldD0iMC4zMSIgc3RvcC1jb2xvcj0iIzBkOTBkOSIvPjxzdG9wIG9mZnNldD0iMC41OCIgc3RvcC1jb2xvcj0iIzE3NzVjOCIvPjxzdG9wIG9mZnNldD0iMC44MiIgc3RvcC1jb2xvcj0iIzFjNjViZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlNWZiYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5TQVBfZ3JhZF9SX3Njcm5fWmVpY2hlbmZsw6RjaGUgMTwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIwIDIwNCAyMDguNDEgMjA0IDQxMi4zOCAwIDAgMCAwIDIwNCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI0NC43MywzOC4zNmwtNDAuNiwwdjk2LjUyTDE2OC42NywzOC4zM0gxMzMuNTFsLTMwLjI3LDgwLjcyQzEwMCw5OC43LDc5LDkxLjY3LDYyLjQsODYuNCw1MS40Niw4Mi44OSwzOS44NSw3Ny43Miw0MCw3MmMuMDktNC42OCw2LjIzLTksMTguMzgtOC4zOCw4LjE3LjQzLDE1LjM3LDEuMDksMjkuNzEsOGwxNC4xLTI0LjU1Qzg5LjA2LDQwLjQyLDcxLDM2LjIxLDU2LjE3LDM2LjE5aC0uMDljLTE3LjI4LDAtMzEuNjgsNS42LTQwLjYsMTQuODNBMzQuMjMsMzQuMjMsMCwwLDAsNS43Nyw3NC43QzUuNTQsODcuMTUsMTAuMTEsOTYsMTkuNzEsMTAzYzguMSw1Ljk0LDE4LjQ2LDkuNzksMjcuNiwxMi42MiwxMS4yNywzLjQ5LDIwLjQ3LDYuNTMsMjAuMzYsMTNBOS41Nyw5LjU3LDAsMCwxLDY1LDEzNWMtMi44MSwyLjktNy4xMyw0LTEzLjA5LDQuMS0xMS40OS4yNC0yMC0xLjU2LTMzLjYxLTkuNTlMNS43NywxNTQuNDJhOTMuNzcsOTMuNzcsMCwwLDAsNDYsMTIuMjJsMi4xMSwwYzE0LjI0LS4yNSwyNS43NC00LjMxLDM0LjkyLTExLjcxLjUzLS40MSwxLS44NCwxLjQ5LTEuMjhMODYuMTcsMTY0LjVIMTIzbDYuMTktMTguODJhNjcuNDYsNjcuNDYsMCwwLDAsMjEuNjgsMy40Myw2OC4zMyw2OC4zMywwLDAsMCwyMS4xNi0zLjI1bDYsMTguNjRoNjAuMTR2LTM5aDEzLjExYzMxLjcxLDAsNTAuNDYtMTYuMTUsNTAuNDYtNDMuMkMzMDEuNzQsNTIuMTksMjgzLjUyLDM4LjM2LDI0NC43MywzOC4zNlpNMTUwLjkxLDEyMWEzNi45MywzNi45MywwLDAsMS0xMy0yLjI4bDEyLjg3LTQwLjU5SDE1MWwxMi42NSw0MC43MUEzOC41LDM4LjUsMCwwLDEsMTUwLjkxLDEyMVptOTYuMi0yMy4zM2gtOC45NFY2NC45MWg4Ljk0YzExLjkzLDAsMjEuNDQsNCwyMS40NCwxNi4xNCwwLDEyLjYtOS41MSwxNi41Ny0yMS40NCwxNi41NyIvPjwvc3ZnPg==' },
  'websockets': { type: 'img', src: 'https://www.svgrepo.com/show/354553/websocket.svg' },
  'tcp ip': { type: 'img', src: 'https://www.svgrepo.com/show/435305/dns.svg' },
  'rest': { type: 'img', src: 'https://cdn-icons-png.flaticon.com/512/9784/9784550.png' },
  'apis': { type: 'img', src: 'https://cdn-icons-png.flaticon.com/512/9784/9784550.png' },
  'rest apis': { type: 'img', src: 'https://cdn-icons-png.flaticon.com/512/9784/9784550.png' },
  'jwt': { type: 'img', src: 'https://cdn-icons-png.flaticon.com/128/8654/8654207.png' },
  'go golang': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  'sql sqlite': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  'html/css': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  'fire alarm system design': { type: 'ion', class: 'flame' },
  'electrical installation': { type: 'ion', class: 'construct' },
  'solar pv systems': { type: 'ion', class: 'sunny' },
  'dart': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
  'flutter': { type: 'img', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  'electronics circuit design': { type: 'ion', class: 'hardware-chip' },
  'circuit verse': { type: 'img', src: 'https://circuitverse.org/assets/favicon-2fc7f88c7d9f61d534fda46f7c4890a0c18d2c406f1f7af2e5948ebc5999e573.ico' }
};

const normalize = (t) => {
  let s = String(t || '').toLowerCase().trim();
  // Handle C++ special-case before stripping '+'
  s = s.replace(/\bc\+\+\b/g, 'cplusplus');
  s = s.replace(/[()]/g, '')
    .replace(/\+/g, ' ')
    .replace(/\//g, ' ')
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return s;
};

const makeAcronym = (t) => {
  const words = String(t || '').split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const letters = words.slice(0, 3).map(w => w[0].toUpperCase());
  return letters.join('') || String(t || '').slice(0, 2).toUpperCase();
};

const renderTechLogos = (techArr = []) => {
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
      iconHtml = `<img src="${entry.src}" alt="${orig}" class="tech-logo-svg" />`;
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
  const texts = sortedTech.filter(orig => !iconMap[normalize(orig)]).map(orig => {
    return `<li class="project-tech-text" title="${orig}">${orig}</li>`;
  });
  let html = '';
  if (logos.length > 0) {
    html += `<ul class="project-tech-logos">${logos.join('')}</ul>`;
  }
  if (texts.length > 0) {
    html += `<ul class="project-tech-badges">${texts.join('')}</ul>`;
  }
  return html;
};

function renderNavbar() {
  const navItems = [
    { label: 'About', data: 'about' },
    { label: 'Journey', data: 'journey' },
    { label: 'Portfolio', data: 'projects' },
    { label: 'Contact', data: 'contact' }
  ];

  return `
    <nav class="navbar" id="navbar">
      <div class="nav-logo">
        <img src="${data.avatar}" alt="Avatar" class="nav-avatar">
        <span class="full-name">WELCOME!</span>
        <span class="short-name">SAYED</span>
      </div>
      <button class="nav-toggle" id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        ${navItems.map((item, i) => `
          <li>
            <button class="nav-link ${i === 0 ? 'active' : ''}" data-nav-link="${item.data}">
              ${item.label}
            </button>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

function renderAboutSection() {
  const mainSkills = [...data.technicalSkills.languages.slice(0, 4), ...data.technicalSkills.webTechnologies.slice(0, 4)];

  return `
    <!-- Profile Card with Avatar and Action Buttons -->
    <div class="about-profile-header">
        <div class="about-avatar-section">
        <div class="avatar-box">
          <img src="${data.avatar}" alt="${data.name}" width="140" height="140" onerror="this.onerror=null;">
        </div>
        <div class="about-profile-info">
          <h1>${data.name}</h1>
          <p class="about-tagline">${data.tagline}</p>
        </div>
      </div>
      <div class="about-profile-spacer" style="flex:1 1 auto;"></div>
      <div class="action-buttons">
        <button class="action-btn primary" id="download-cv-btn">
          <ion-icon name="download-outline"></ion-icon>
          <span>Download Resume</span>
        </button>
        <button class="action-btn secondary" id="view-contact-btn">
          <ion-icon name="person-outline"></ion-icon>
          <span>Contact Card</span>
        </button>
      </div>
    </div>
    
    <header>
      <h2 class="h2 article-title">About me</h2>
    </header>
    
    <section class="about-text">
      <p><strong>Electrical Engineer and Sales Strategist</strong> with specialized expertise in Electrical Engineering for Fire Safety Systems. I bridge the gap between complex technical requirements and business growth, leveraging deep knowledge of <strong>NFPA standards</strong> and fire alarm system design to secure high-value contracts and manage government tenders across Bahrain.</p>
      <p><strong>Currently advancing into Full-Stack Development</strong>, I apply this same engineering precision to build robust, scalable software solutions using <strong>Go and JavaScript</strong>. My goal is to leverage this dual-competency—industrial engineering insight combined with modern software architecture—to develop efficient tools that solve complex real-world challenges.</p>
    </section>
  `;
}

function getSectionIcon(sectionName) {
  const icons = {
    'strategicSalesLeadership': 'trending-up-outline',
    'tenderAndProcurementManagement': 'document-text-outline',
    'clientRelationsAndBusinessGrowth': 'people-outline',
    'marketIntelligenceAndOperations': 'analytics-outline',
    'operationsManagement': 'settings-outline',
    'salesExcellence': 'bar-chart-outline',
    'technicalSupport': 'headset-outline',
    'customerEngagement': 'chatbubble-outline'
  };
  return icons[sectionName] || 'checkmark-circle-outline';
}

function renderExperienceSection() {
  return `
    <header>
      <h2 class="h2 article-title">Professional Experience</h2>
      <p class="section-subtitle">Discover my <strong>career journey</strong> – from innovative projects and leadership roles to the achievements that have shaped my professional path. Let's explore the experiences that drive my passion for excellence!</p>
    </header>

    <div class="experience-container">
      ${data.experience.map((job, i) => `
        <div class="experience-card" data-job="${i}">
          <div class="experience-card-header">
            <div class="experience-company-info">
              <div class="experience-company-logo">
                <a href="${getEntityUrl(job.company)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${job.company}">
                  <img src="${getLogo(job.company, '')}" alt="${job.company} logo" class="org-logo" onerror="this.onerror=null;this.style.display='none';" />
                </a>
              </div>
              <div class="experience-company-details">
                <h3 class="experience-job-title">${job.title}</h3>
                <p class="experience-company-name">${job.company}</p>
                <div class="experience-meta">
                  <span class="experience-date">
                    <ion-icon name="calendar-outline"></ion-icon>
                    ${job.date}
                  </span>
                  <span class="experience-location">
                    <ion-icon name="location-outline"></ion-icon>
                    ${job.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="experience-card-content">
            ${job.sections ? Object.entries(job.sections).map(([sectionName, points]) => {
    const sectionTitle = sectionName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const sectionIcon = getSectionIcon(sectionName);
    return `
                <div class="experience-section">
                  <h4 class="experience-section-title">
                    <ion-icon name="${sectionIcon}"></ion-icon>
                    ${sectionTitle}
                  </h4>
                  <ul class="experience-points">
                    ${points.map(point => `<li class="experience-point">${point}</li>`).join('')}
                  </ul>
                </div>
              `;
  }).join('') : job.points ? `
              <div class="experience-section">
                <h4 class="experience-section-title">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  Key Responsibilities
                </h4>
                <ul class="experience-points">
                  ${job.points.map(point => `<li class="experience-point">${point}</li>`).join('')}
                </ul>
              </div>
              ${job.keyProjects ? `
                <div class="experience-section">
                  <h4 class="experience-section-title">
                    <ion-icon name="build-outline"></ion-icon>
                    Key Projects
                  </h4>
                  <ul class="experience-points">
                    ${job.keyProjects.map(project => `<li class="experience-point">${project}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    
    <header style="margin-top: 3rem;">
      <h2 class="h2 article-title">Internships</h2>
    </header>
    <p class="section-subtitle">Early career experiences – internships that provided <strong>practical skills</strong> and industry insights to launch my professional journey.</p>
    <ul class="timeline-list">
      ${data.professionalJourney.internships.map(intern => `
        <li class="timeline-item cert-item">
          <div class="cert-header">
            <ion-icon name="construct-outline" class="cert-icon"></ion-icon>
            <a href="${getEntityUrl(intern.company)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${intern.company}">
              <img src="${getLogo(intern.company, '')}" alt="${intern.company} logo" class="org-logo small" onerror="this.onerror=null;this.style.display='none';" />
            </a>
            <div class="cert-content">
              <h4 class="h4 timeline-item-title">${intern.title}</h4>
              <span class="cert-authority">${intern.company}</span>
            </div>
          </div>
          
          <div class="cert-meta">
            <span class="cert-meta-item">${intern.startDate} - ${intern.endDate}</span>
            <span class="cert-meta-item">${intern.location}</span>
          </div>
          
          <div class="experience-section">
            <p class="experience-point">${intern.description}</p>
          </div>
        </li>
      `).join('')}
    </ul>
    
    <header style="margin-top: 3rem;">
      <h2 class="h2 article-title">Education</h2>
    </header>
    <p class="section-subtitle">My educational foundation – from high school to university degrees that built my <strong>knowledge base</strong> and technical expertise.</p>
    <ul class="timeline-list">
      ${data.education.map(edu => `
        <li class="timeline-item cert-item">
          <div class="cert-header">
            <ion-icon name="school-outline" class="cert-icon"></ion-icon>
            <a href="${getEntityUrl(edu.institution || edu.degree)}" target="_blank" rel="noopener noreferrer" class="logo-link" title="${edu.institution}">
              <img src="${getLogo(edu.institution || edu.degree, '')}" alt="${edu.institution} logo" class="org-logo small" onerror="this.onerror=null;this.style.display='none';" />
            </a>
            <div class="cert-content">
              <h4 class="h4 timeline-item-title">${edu.degree}</h4>
              <span class="cert-authority">${edu.institution}</span>
            </div>
          </div>
          
          <div class="cert-meta">
            <span class="cert-meta-item">${edu.date}</span>
          </div>
          
          ${edu.certificate ? `<a href="${edu.certificate}" target="_blank" class="certificate-link">
            <ion-icon name="document-outline"></ion-icon> View Certificate
          </a>` : ''}
        </li>
      `).join('')}
    </ul>
    
    <header style="margin-top: 3rem;">
      <h2 class="h2 article-title">Licenses & Certifications</h2>
    </header>
    <p class="section-subtitle">Professional credentials – <strong>licenses</strong> and certifications that validate my expertise and commitment to industry standards.</p>
    <ul class="timeline-list">
      ${data.certifications.map(cert => {
    const isExpired = cert.expires && new Date(cert.expires) < new Date();
    const iconName = cert.type === 'License' ? 'card-outline' : 'ribbon-outline';
    const viewText = `View ${cert.type}`;
    return `
        <li class="timeline-item cert-item">
          <div class="cert-header">
            <ion-icon name="${iconName}" class="cert-icon"></ion-icon>
            <a href="${getEntityUrl(cert.issuingAuthority)}" target="_blank" class="logo-link">
              <img src="${getLogo(cert.issuingAuthority, '')}" alt="${cert.issuingAuthority} logo" class="org-logo small" onerror="this.onerror=null;this.style.display='none';" />
            </a>
            <div class="cert-content">
              <h4 class="h4 timeline-item-title">${cert.name}</h4>
              <span class="cert-authority">${cert.issuingAuthority}</span>
              ${cert.courses ? `
                <div class="cert-courses">
                  ${cert.courses.map(course => `<span class="cert-course-item">${course}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="cert-meta">
            ${cert.id ? `<span class="cert-meta-item">ID: ${cert.id}</span>` : ''}
            ${cert.issued ? `<span class="cert-meta-item">Issued: ${cert.issued}</span>` : ''}
            ${cert.expires ? `<span class="cert-meta-item ${isExpired ? 'expired' : ''}">${isExpired ? 'Expired' : 'Expires: ' + cert.expires}</span>` : ''}
          </div>
          
          ${cert.pdfUrl ? `<a href="${cert.pdfUrl}" target="_blank" class="certificate-link">
            <ion-icon name="document-outline"></ion-icon> ${viewText}
          </a>` : ''}
        </li>
        `;
  }).join('')}
    </ul>
  `;
}

function getIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('repository')) return 'logo-github';
  if (lower.includes('thesis')) return 'school-outline';
  if (lower.includes('poster')) return 'document-outline';
  return 'open-outline';
}

function renderProjectsSection() {
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
            ${cat}
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
              <button class="read-more-btn"><span>Show Description</span> <ion-icon name="chevron-down-outline"></ion-icon></button>
              <ul class="project-tech-logos" aria-label="Technology stack logos">
                ${renderTechLogos(project.tech)}
              </ul>
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

function getIconForCoreItem(item) {
  if (item.includes('Fire')) return 'flame';
  if (item.includes('Electrical Installation')) return 'flash';
  if (item.includes('Solar')) return 'sunny';
  if (item.includes('Power Electronics')) return 'battery-full';
  if (item.includes('Digital Circuits')) return 'hardware-chip';
  if (item.includes('Transmission')) return 'pulse';
  return 'cog';
}

function getCategoryIcon(category) {
  const iconMap = {
    'Web Development': 'globe-outline',
    'Engineering': 'construct-outline',
    'Games': 'game-controller-outline',
    'CLI/Algorithms': 'terminal-outline',
    'UI concepts': 'color-palette-outline'
  };
  return iconMap[category] || 'folder-outline';
}

function getIconForPersonalSkill(skill) {
  const icons = {
    'Adaptability': 'refresh',
    'Communication': 'chatbubble',
    'Fast Learner': 'school',
    'Decision Making': 'options',
    'Teamwork': 'people',
    'Problem-solving': 'bulb',
    'Time Management': 'time',
    'Leadership': 'trophy',
    'Training and Development': 'book',
    'Project Management': 'folder'
  };
  return icons[skill] || 'star';
}

function getIconForCSConcept(concept) {
  const icons = {
    'Algorithms & Data Structures': 'code',
    'Concurrency & Parallelism': 'sync',
    'Virtual DOM': 'browsers',
    'State Management': 'server'
  };
  return icons[concept] || 'hardware-chip';
}

function renderInteractiveTechLogos(techArr = [], type) {
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
      const size = 'width: 1.5em; height: 1.5em;';
      // Make specific logos white
      const whiteSrcs = ['rust', 'socketdotio', 'github', 'jsonwebtokens', 'markdown', 'apple', 'dns', 'key', 'websocket', 'apollographql', '1822940', '9784550', '8654207', 'bash'];
      const isWhite = whiteSrcs.some(s => iconDef.src.includes(s));
      const filter = isWhite ? 'filter: brightness(0) invert(1);' : '';
      iconHtml = `<img src="${iconDef.src}" alt="${orig}" class="tech-logo-svg" style="${size}${filter ? ' ' + filter : ''}" />`;
    } else if (iconDef.type === 'devicon') {
      // Uniform size for all logos
      const size = 'font-size: 1.5em;';
      iconHtml = `<i class="devicon ${iconDef.class}" style="${size}"></i>`;
    } else if (iconDef.type === 'simple') {
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

function renderSkillBadges(items = [], type) {
  const bulletTypes = ['personal', 'engineering', 'concepts'];
  if (bulletTypes.includes(type)) {
    const iconFunctions = {
      engineering: getIconForCoreItem,
      personal: getIconForPersonalSkill,
      concepts: getIconForCSConcept
    };

    const getIcon = iconFunctions[type] || (() => 'star');

    return `<ul class="skill-bullets" data-type="${type}">
              ${items.map((item, index) => `<li style="animation-delay: ${index * 0.1}s"><ion-icon name="${getIcon(item)}"></ion-icon> ${item}</li>`).join('')}
            </ul>`;
  }

  const iconFunctions = {
    engineering: getIconForCoreItem,
    personal: getIconForPersonalSkill,
    concepts: getIconForCSConcept
  };

  const getIcon = iconFunctions[type] || (() => 'star');

  return `<div class="skill-badges-container" data-type="${type}">
            ${items.map((item, index) => `
              <div class="skill-badge" style="animation-delay: ${index * 0.1}s">
                <div class="badge-icon">
                  <ion-icon name="${getIcon(item)}"></ion-icon>
                </div>
                <span class="badge-text">${item}</span>
                <div class="badge-hover-effect"></div>
              </div>
            `).join('')}
          </div>`;
}

// Helper: prefer local workspace logo files where available
function getLocalLogoFor(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('lichfield') || n.includes('lifeco')) return 'lifeco_uk_logo.jpeg';
  if (n.includes('super fire')) return 'super_fire_and_safety_services_logo.jpeg';
  if (n.includes('channels by stc') || n.includes('channels')) return 'channels_by_stc_bahrain_logo.jpeg';
  if (n.includes('zain')) return 'zain_logo.jpeg';
  if (n.includes('megger')) return 'megger_logo.jpeg';
  if (n.includes('university of bahrain')) return 'university_of_bahrain_logo.jpeg';
  if (n.includes('reboot')) return 'reboot_logo.jpeg';
  if (n.includes('nocn')) return 'nocn_logo.jpeg';
  if (n.includes('american heart')) return 'american_heart_association_logo.jpeg';
  if (n.includes('linkedin')) return 'LinkedIn_icon.svg';
  if (n.includes('golden trust')) return 'golden_trust_logo.jpeg';
  if (n.includes('crpep')) return 'crpep_logo.jpeg';
  if (n.includes('council') || n.includes('engineering professions')) return 'crpep_logo.jpeg';
  if (n.includes('electricity and water') || n.includes('ministry of electricity')) return 'mewa.jpeg';
  if (n.includes('sheikh isa') || n.includes('secondary school')) return 'moe_highschool.jpeg';
  // Add more mappings here as you add image files to the repo
  return null;
}

function getLogo(name, fallback) {
  const local = getLocalLogoFor(name);
  if (local) return local;

  // Specific fallbacks for missing local files
  const n = (name || '').toLowerCase();
  if (n.includes('linkedin')) return 'https://cdn.simpleicons.org/linkedin'; // Use SVG icon as fallback

  return fallback || 'https://placehold.co/48x48/e1e3e2/3f4948?text=LOGO';
}

// Get a sensible destination for a given entity (company, institution, certificate issuer).
// If you prefer specific URLs for some entities, add them to `entityUrlMap` below.
function getEntityUrl(name) {
  const n = (name || '').toLowerCase();
  const entityUrlMap = {
    'lichfield': 'https://www.lifeco-uk.com',
    'lifeco': 'https://www.lifeco-uk.com',
    'super fire': 'https://www.linkedin.com/company/super-fire-and-safety-services/',
    'channels by stc': 'https://channels.com.sa/home',
    'channels': 'https://channels.com.sa/home',
    'zain': 'https://eshop.bh.zain.com/',
    'megger': 'https://www.megger.com',
    'university of bahrain': 'https://www.uob.edu.bh',
    'reboot': 'https://reboot01.com',
    'nocn': 'https://www.nocn.org.uk',
    'american heart': 'https://www.heart.org',
    'crpep': 'https://www.crpep.bh/',
    'ministry of electricity': 'https://www.linkedin.com/company/mewa-bah/',
    'electricity and water': 'https://www.ewa.bh/',
    'golden trust': 'https://www.linkedin.com/company/golden-trust-group/',
    'linkedin learning': 'https://www.linkedin.com/learning/'
  };

  for (const key in entityUrlMap) {
    if (n.includes(key)) return entityUrlMap[key];
  }

  // Fallback to a safe Google search for the entity name
  if (n.trim()) return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  return '#';
}

function renderProfessionalJourneySection() {
  const journey = data.professionalJourney;

  // Function to calculate duration in years and months
  function calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }

  // Combine all timeline items in the requested order: education, internships, career, certifications
  const allItems = [
    ...journey.education.map(item => ({ ...item, category: 'education' })),
    ...journey.internships.map(item => ({ ...item, category: 'internships' })),
    ...journey.career.map(item => ({ ...item, category: 'career' })),
    ...journey.certifications.map(item => ({ ...item, category: 'certifications', startDate: item.date, endDate: null }))
  ];

  // Calculate timeline dimensions
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 1; // Dynamic end year with 1 year buffer
  const totalYears = endYear - startYear;
  const totalIntervals = totalYears * 2; // 6-month intervals
  const svgWidth = 1800; // Further increased width for wider chart
  const svgHeight = 650; // Increased height for better layout
  const margin = { top: 80, right: 200, bottom: 80, left: 120 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Calculate positions
  const getXPosition = (dateStr) => {
    if (!dateStr) {
      console.error('No date provided');
      return margin.left; // fallback position
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateStr);
      return margin.left; // fallback position
    }
    const startDate = new Date(startYear, 0, 1); // January 1st of start year
    const endDate = new Date(endYear, 0, 1); // January 1st of end year
    const totalTime = endDate.getTime() - startDate.getTime();
    const currentTime = date.getTime() - startDate.getTime();
    const progress = Math.max(0, Math.min(1, currentTime / totalTime)); // Clamp between 0 and 1
    const x = margin.left + (progress * chartWidth);
    if (isNaN(x)) {
      console.error('NaN x position for date:', dateStr, 'progress:', progress);
      return margin.left; // fallback
    }
    return x;
  };

  // Assign each item to its own horizontal grid line, with custom offset for high school
  const getYPosition = (index, total, item) => {
    // High school stays at its current offset (extra 32px)
    if (item.category === 'education' && item.title && item.title.toLowerCase().includes('high school')) {
      return margin.top + (index * (chartHeight / Math.max(total - 1, 1))) + 32;
    }
    // All other items: one grid step lower for each subsequent item
    return margin.top + ((index + 1) * (chartHeight / Math.max(total, 1)));
  };

  // Generate SVG timeline
  const svgContent = `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" class="timeline-svg">


      <!-- Background gradient -->
      <rect width="${svgWidth}" height="${svgHeight}" fill="url(#timelineGradient)" rx="15" ry="15" opacity="0.1"/>

      <!-- Main timeline line -->
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left + chartWidth}" y2="${margin.top}"
            stroke="url(#mainTimelineGradient)" stroke-width="4" opacity="0.8" filter="url(#shadow)">
        <animate attributeName="stroke-dasharray" values="0,${chartWidth};${chartWidth},0" dur="2s" fill="freeze"/>
      </line>


      <!-- Grid lines (4 quarters per year) -->
      ${Array.from({ length: totalIntervals * 2 + 1 }, (_, i) => {
    const year = startYear + Math.floor(i / 4);
    const quarter = i % 4;
    const month = ['01', '04', '07', '10'][quarter]; // Jan, Apr, Jul, Oct
    const x = getXPosition(`${year}-${month}-01`);
    const isYearStart = quarter === 0;
    return `
          <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}"
            stroke="var(--text-secondary)" stroke-width="${isYearStart ? '2' : '1'}"
            opacity="${isYearStart ? '0.25' : '0.15'}" class="grid-line-vertical"/>
        `;
  }).join('')}

      <!-- Horizontal grid lines -->
      ${Array.from({ length: allItems.length + 1 }, (_, i) => {
    const y = margin.top + (i * (chartHeight / Math.max(allItems.length, 1)));
    return `
          <line x1="${margin.left}" y1="${y}" x2="${margin.left + chartWidth}" y2="${y}"
                stroke="var(--text-secondary)" stroke-width="1" opacity="0.1" class="grid-line-horizontal"/>
        `;
  }).join('')}


      <!-- Year markers (at Q1 only) -->
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

      <!-- Timeline items -->
      ${allItems.map((item, index) => {
    const dateToUse = item.startDate || item.date;
    const x = getXPosition(dateToUse);
    let y = getYPosition(index, allItems.length, item);
    const isCurrent = item.current || (!item.endDate && new Date() < new Date(item.endDate));
    const categoryColors = {
      education: '#64ffda',
      internships: '#ffab91',
      career: '#81c784',
      certifications: '#ffb74d'
    };
    const color = categoryColors[item.category] || '#64ffda';

    // Determine if this should be a bar (education, internships, career) or dot (certifications)
    const isBarItem = ['education', 'internships', 'career'].includes(item.category);
    const endX = isBarItem && item.endDate ? getXPosition(item.endDate) : x;
    const logoHref = getLogo(item.company || item.institution || item.issuer || item.title || item.name || '', '');
    const logoX = x - 16;
    const logoY = isBarItem ? (y - 26) : (y - 36);

    return `
          <!-- Logos removed from timeline -->
          <!-- Timeline bar (for education, internships, career) -->
          ${isBarItem ? `
          <rect x="${x}" y="${y - 6}" width="${endX - x}" height="12" rx="6"
                fill="${color}" stroke="var(--primary)" stroke-width="2"
                class="timeline-bar ${item.category} ${isCurrent ? 'current' : ''}"
                data-category="${item.category}" data-item-index="${index}" filter="url(#glow)" opacity="0.8">
            <animate attributeName="width" values="0;${endX - x}" dur="1s" begin="${index * 0.1 + 0.3}s" fill="freeze" />
          </rect>
          ` : ''}

          <!-- Timeline dot (for certifications) -->
          ${!isBarItem ? `
          <circle cx="${x}" cy="${y}" r="${isCurrent ? '10' : '8'}"
                  fill="${color}" stroke="var(--primary)" stroke-width="3"
                  class="timeline-dot ${item.category} ${isCurrent ? 'current' : ''}"
                  data-category="${item.category}" data-item-index="${index}" filter="url(#glow)">
            <animate attributeName="r" values="${isCurrent ? '10;12;10' : '8;10;8'}" dur="2.5s" repeatCount="indefinite" />
          </circle>
          ` : ''}

        `;
  }).join('')}


      <!-- Current Date Line (drawn last for visibility) -->
      ${(() => {
      const now = new Date();
      const currentX = getXPosition(now.toISOString().split('T')[0]);
      console.log('Current date line - Date:', now.toISOString().split('T')[0], 'X position:', currentX, 'SVG width:', svgWidth);
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
            <!-- Current date vertical line (debug: thick, fully opaque) -->
            <line x1="${currentX}" y1="${margin.top}" x2="${currentX}" y2="${margin.top + chartHeight}"
              stroke="#64ffda" stroke-width="1" filter="url(#currentDateGlow)"
              opacity="0.55" class="current-date-indicator" />
          </g>
        `;
    })()}

    </svg>
  `;

  return `
    <header>
      <h2 class="h2 article-title">Professional Journey</h2>
      <p class="section-subtitle">Explore my professional timeline – from <strong>education</strong> and internships to career milestones and certifications that shaped my expertise. <a href="#journey" class="journey-link">View Full Journey Details</a></p>
    </header>
    <section class="professional-journey" id="professional-journey">
      <div class="journey-filters">
        <button class="filter-btn active" data-filter="all">
          <ion-icon name="apps-outline" style="font-size: 1.2em; vertical-align: middle; color: var(--accent);"></ion-icon>
          <span style="margin-left: 0.4em;">All</span>
        </button>
        <button class="filter-btn" data-filter="education">
          <ion-icon name="school-outline" style="font-size: 1.2em; vertical-align: middle; color: #64ffda;"></ion-icon>
          <span style="margin-left: 0.4em;">Education</span>
        </button>
        <button class="filter-btn" data-filter="career">
          <ion-icon name="business-outline" style="font-size: 1.2em; vertical-align: middle; color: #81c784;"></ion-icon>
          <span style="margin-left: 0.4em;">Career</span>
        </button>
        <button class="filter-btn" data-filter="internships">
          <ion-icon name="briefcase-outline" style="font-size: 1.2em; vertical-align: middle; color: #ffab91;"></ion-icon>
          <span style="margin-left: 0.4em;">Internships</span>
        </button>
        <button class="filter-btn" data-filter="certifications">
          <ion-icon name="ribbon-outline" style="font-size: 1.2em; vertical-align: middle; color: #ffb74d;"></ion-icon>
          <span style="margin-left: 0.4em;">Certifications</span>
        </button>
      </div>
      <div class="timeline-chart-container">
        ${svgContent}
      </div>
    </section>
  `;
}

function renderSkillsSection() {
  const categories = [
    { title: 'Personal Skills', icon: '<ion-icon name="person-outline"></ion-icon>', items: data.personalSkills, isTech: false, type: 'personal' },
    { title: 'Core Engineering', icon: '<ion-icon name="construct-outline"></ion-icon>', items: data.technicalSkills.coreEngineering, isTech: false, type: 'engineering' },
    { title: 'Engineering Software', icon: '<ion-icon name="build-outline"></ion-icon>', items: data.technicalSkills.engineeringSoftware, isTech: true, type: 'software' },
    { title: 'Languages', icon: '<ion-icon name="code-slash-outline"></ion-icon>', items: data.technicalSkills.languages, isTech: true, type: 'languages' },
    { title: 'Web Technologies', icon: '<ion-icon name="globe-outline"></ion-icon>', items: data.technicalSkills.webTechnologies, isTech: true, type: 'web' },
    { title: 'Tools', icon: '<ion-icon name="settings-outline"></ion-icon>', items: data.technicalSkills.tools, isTech: true, type: 'tools' },
    { title: 'Systems', icon: '<ion-icon name="desktop-outline"></ion-icon>', items: data.technicalSkills.systems, isTech: true, type: 'systems' },
    { title: 'Computer Science Concepts', icon: '<ion-icon name="school-outline"></ion-icon>', items: data.technicalSkills.computerScienceConcepts, isTech: false, type: 'concepts' }
  ];

  // Dynamic stats
  const numLanguages = data.technicalSkills.languages.length;
  const numWebTech = data.technicalSkills.webTechnologies.length;
  const numEngTools = data.technicalSkills.engineeringSoftware.length;

  // Calculate total months of professional experience and convert to years (rounded to 1 decimal)
  function parseDate(str, fallbackToStart) {
    // Accepts formats like 'Month YYYY', 'YYYY', or 'Month YYYY — Month YYYY'
    if (!str) return null;
    const parts = str.split('—').map(s => s.trim());
    let dateStr = fallbackToStart ? parts[0] : (parts[1] || parts[0]);
    // Try to parse 'Month YYYY' or 'YYYY'
    let d = new Date(dateStr);
    if (isNaN(d)) {
      // Try just the year
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
        const end = parseDate(exp.date, false) || new Date();
        if (start && end && end > start) {
          const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
          totalMonths += months;
        }
      }
    });
  }
  const yearsExp = totalMonths > 0 ? Math.floor(totalMonths / 12) + (totalMonths % 12 > 0 ? '+' : '') : '1';

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
          <div class="stat-number" data-target="${yearsExp}">0</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </section>
  `;
}

function renderEducationSection() {
  return `
    <header>
      <h2 class="h2 article-title">Education</h2>
    </header>
    <ul class="timeline-list">
      ${data.education.map(edu => `
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">${edu.degree}</h4>
          <span>${edu.institution}</span>
          <span class="timeline-item-duration">${edu.date}</span>
          ${edu.certificate ? `<a href="${edu.certificate}" target="_blank" class="certificate-link">
            <ion-icon name="document-outline"></ion-icon> View Certificate
          </a>` : ''}
        </li>
      `).join('')}
    </ul>
    
    <header style="margin-top: 3rem;">
      <h2 class="h2 article-title">Licenses & Certifications</h2>
    </header>
    <ul class="timeline-list">
      ${data.certifications.map(cert => {
    const isExpired = cert.expires && new Date(cert.expires) < new Date();
    const iconName = cert.type === 'License' ? 'card-outline' : 'ribbon-outline';
    const viewText = `View ${cert.type}`;
    return `
        <li class="timeline-item cert-item">
          <div class="cert-header">
            <ion-icon name="${iconName}" class="cert-icon"></ion-icon>
            <a href="${getEntityUrl(cert.issuingAuthority)}" target="_blank" class="logo-link">
              <img src="${getLogo(cert.issuingAuthority, '')}" alt="${cert.issuingAuthority} logo" class="org-logo small" onerror="this.onerror=null;this.style.display='none';" />
            </a>
            <div class="cert-content">
              <h4 class="h4 timeline-item-title">${cert.name}</h4>
              <span class="cert-authority">${cert.issuingAuthority}</span>
              ${cert.courses ? `
                <div class="cert-courses">
                  ${cert.courses.map(course => `<span class="cert-course-item">${course}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="cert-meta">
            ${cert.id ? `<span class="cert-meta-item">ID: ${cert.id}</span>` : ''}
            ${cert.issued ? `<span class="cert-meta-item">Issued: ${cert.issued}</span>` : ''}
            ${cert.expires ? `<span class="cert-meta-item ${isExpired ? 'expired' : ''}">${isExpired ? 'Expired' : 'Expires: ' + cert.expires}</span>` : ''}
          </div>
          
          ${cert.pdfUrl ? `<a href="${cert.pdfUrl}" target="_blank" class="certificate-link">
            <ion-icon name="document-outline"></ion-icon> ${viewText}
          </a>` : ''}
        </li>
        `;
  }).join('')}
    </ul>
  `;
}

function renderContactSection() {
  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+242', country: 'Republic of the Congo', flag: '🇨🇬' },
    { code: '+243', country: 'Democratic Republic of the Congo', flag: '🇨🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+246', country: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { code: '+247', country: 'Ascension Island', flag: '🇦🇨' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+262', country: 'Réunion', flag: '🇷🇪' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+290', country: 'Saint Helena', flag: '🇸🇭' },
    { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
    { code: '+297', country: 'Aruba', flag: '🇦🇼' },
    { code: '+298', country: 'Faroe Islands', flag: '🇫🇴' },
    { code: '+299', country: 'Greenland', flag: '🇬🇱' },
    { code: '+350', country: 'Gibraltar', flag: '🇬🇮' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+378', country: 'San Marino', flag: '🇸🇲' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+500', country: 'Falkland Islands', flag: '🇫🇰' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    { code: '+509', country: 'Haiti', flag: '🇭🇹' },
    { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+596', country: 'Martinique', flag: '🇲🇶' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+599', country: 'Curaçao', flag: '🇨🇼' },
    { code: '+670', country: 'East Timor', flag: '🇹🇱' },
    { code: '+672', country: 'Antarctica', flag: '🇦🇶' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+674', country: 'Nauru', flag: '🇳🇷' },
    { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+676', country: 'Tonga', flag: '🇹🇴' },
    { code: '+677', country: 'Solomon Islands', flag: '🇸🇧' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+680', country: 'Palau', flag: '🇵🇼' },
    { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫' },
    { code: '+682', country: 'Cook Islands', flag: '🇨🇰' },
    { code: '+683', country: 'Niue', flag: '🇳🇺' },
    { code: '+684', country: 'American Samoa', flag: '🇦🇸' },
    { code: '+685', country: 'Samoa', flag: '🇼🇸' },
    { code: '+686', country: 'Kiribati', flag: '🇰🇮' },
    { code: '+687', country: 'New Caledonia', flag: '🇳🇨' },
    { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
    { code: '+689', country: 'French Polynesia', flag: '🇵🇫' },
    { code: '+690', country: 'Tokelau', flag: '🇹🇰' },
    { code: '+691', country: 'Micronesia', flag: '🇫🇲' },
    { code: '+692', country: 'Marshall Islands', flag: '🇲🇭' },
    { code: '+850', country: 'North Korea', flag: '🇰🇵' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' }
  ];

  const countryOptions = countryCodes.map(item =>
    `<option value="${item.code}" ${item.code === '+973' ? 'selected' : ''}>${item.flag} ${item.code}</option>`
  ).join('');

  return `
    <header>
      <h2 class="h2 article-title">Contact me</h2>
    </header>
    <section class="contact">
      <p class="contact-text">
        Let's <strong>keep in touch</strong>! Don't hesitate to contact me for any inquiry or opportunity.
      </p>

      <div id="form-message"></div>

      <form data-form id="contact-form">
        <div class="input-wrapper">
          <label for="fullname">Full Name <span style="color: red;">*</span></label>
          <input type="text" name="fullname" id="fullname" data-form-input placeholder="e.g. Sayed Ahmed" required>
          <label for="email">Email Address <span style="color: red;">*</span></label>
          <input type="email" name="email" id="email" data-form-input placeholder="e.g. sayed.ahmed@gmail.com" required>
        </div>

        <div class="phone-input-wrapper">
          <label for="phone">Phone Number</label>
          <div class="phone-fields">
            <select name="countryCode" id="countryCode">
              <option value="">Select country code</option>
              ${countryOptions}
            </select>
            <input type="tel" name="phone" id="phone" placeholder="e.g. 3X XXX XXX" pattern="[0-9]*">
          </div>
        </div>

        <div class="input-wrapper">
          <label for="message">Message <span style="color: red;">*</span></label>
          <textarea name="message" id="message" data-form-input placeholder="e.g. Hello, I'd like to discuss about..." required></textarea>
        </div>

        <button type="submit" data-form-btn>
          <span>Send Message</span>
        </button>
      </form>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <p class="footer-credit">
        © 2026 <a href="${data.contact.github}" target="_blank">${data.name}</a>. All rights reserved.
      </p>
    </footer>
  `;
}

function renderSideElements() {
  return `
    <div class="side-element side-left">
      <div class="hover-text" id="left-hover-text"></div>
      <a href="tel:${data.contact.phone}" title="Phone">
        <ion-icon name="call-outline"></ion-icon>
        <span class="sr-only">Call me!</span>
      </a>
      <a href="mailto:${data.contact.email}" title="Email">
        <ion-icon name="mail-outline"></ion-icon>
        <span class="sr-only">Let's touch!</span>
      </a>
      <a href="${data.contact.linkedin}" target="_blank" title="LinkedIn">
        <ion-icon name="logo-linkedin"></ion-icon>
        <span class="sr-only">Connect!</span>
      </a>
    </div>
    <div class="side-element side-right">
      <div class="hover-text" id="right-hover-text"></div>
      <a href="https://wa.me/${data.contact.phone.replace(/[^0-9]/g, '')}" target="_blank" title="WhatsApp">
        <ion-icon name="logo-whatsapp"></ion-icon>
        <span class="sr-only">Chat now!</span>
      </a>
      <a href="${data.contact.github}" target="_blank" title="GitHub">
        <ion-icon name="logo-github"></ion-icon>
        <span class="sr-only">Code here!</span>
      </a>
      <a href="https://medium.com/@s97ahm" target="_blank" title="Medium">
        <ion-icon name="logo-medium"></ion-icon>
        <span class="sr-only">Read me!</span>
      </a>
      <a href="${data.contact.twitter}" target="_blank" title="X" class="x-logo">
        <span>𝕏</span>
        <span class="sr-only">Follow me!</span>
      </a>
      <a href="${data.contact.discord}" target="_blank" title="Discord" class="discord-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.077.077 0 0 0-.082.038c-.357.63-.755 1.453-1.037 2.104a18.524 18.524 0 0 0-5.53 0 12.76 12.76 0 0 0-1.05-2.104.077.077 0 0 0-.082-.038A19.736 19.736 0 0 0 3.684 4.369a.069.069 0 0 0-.03.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.507 6.23 3.13a.077.077 0 0 0 .084-.027c.48-.66.908-1.356 1.273-2.084a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.57-1.938-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.073.073 0 0 1 .078.009c.124.104.254.206.384.304a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.94.936.076.076 0 0 0-.04.105c.366.728.794 1.423 1.272 2.084a.076.076 0 0 0 .084.028c2.037-.623 4.104-1.565 6.23-3.13a.077.077 0 0 0 .031-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" fill="currentColor"/>
        </svg>
        <span class="sr-only">Hello world!</span>
      </a>
    </div>
  `;
}

function initializeTimeline() {
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
      const logoHtml = item.logo ? `<img src="${item.logo}" class="timeline-logo" onerror="this.style.display='none'">` : '';
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

function renderContactModal() {
  return `
    <div class="contact-modal" id="contact-modal" style="display: none;">
      <div class="modal-overlay" id="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" id="modal-close">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div class="modal-header">
          <h3>Save Contact Card</h3>
          <p>Scan the QR code or download the vCard</p>
        </div>
        <div class="modal-body">
          <div class="modal-columns">
            <div class="modal-left">
              <div class="contact-info">
                <img src="${data.avatar}" alt="${data.name}" class="contact-avatar">
                <h4>${data.name}</h4>
                <p><ion-icon name="mail-outline"></ion-icon> ${data.email}</p>
                <p><ion-icon name="call-outline"></ion-icon> ${data.mobile}</p>
              </div>
            </div>
            <div class="modal-right">
              <div class="qr-code-container" id="qr-code">
                <div class="qr-placeholder">QR Code will appear here</div>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="modal-btn primary" id="download-vcard-btn">
              <ion-icon name="download-outline"></ion-icon>
              <span>Download vCard</span>
            </button>
            <button class="modal-btn secondary" id="copy-vcard-btn">
              <ion-icon name="copy-outline"></ion-icon>
              <span>Copy vCard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generate vCard
function generateVCard() {
  return `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
N:HUSAIN;SAYED;AHMED;;
TEL;TYPE=CELL:${data.mobile}
EMAIL:${data.email}
ADR;TYPE=HOME:;;${data.address};;;${data.nationality}
URL:${data.contact.linkedin}
URL:${data.contact.github}
NOTE:${data.title}
END:VCARD`;
}

// Generate QR Code
async function generateQRCode() {
  const qrContainer = document.getElementById('qr-code');
  if (!qrContainer) return;

  // Show loading state
  qrContainer.innerHTML = `
    <div class="qr-loading">
      <div class="loading-spinner"></div>
      <p class="loading-text">Generating QR Code...</p>
    </div>
  `;

  try {
    // Add a small delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Fetch the actual VCF file and extract text without photo
    const response = await fetch(data.vCardUrl);
    const vcfContent = await response.text();

    // Split into lines and remove the PHOTO field
    const lines = vcfContent.split('\n');
    const filteredLines = [];
    let inPhotoBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Start of photo block
      if (line.startsWith('PHOTO;ENCODING=')) {
        inPhotoBlock = true;
        continue;
      }

      // End of vCard or next field means photo block ended
      if (inPhotoBlock && (line.startsWith('END:VCARD') || (line.match(/^[A-Z]/) && !line.startsWith(' ')))) {
        inPhotoBlock = false;
      }

      // Skip lines that are part of photo block
      if (inPhotoBlock) {
        continue;
      }

      filteredLines.push(line);
    }

    const vCardWithoutPhoto = filteredLines.join('\n');

    // Clear loading state
    qrContainer.innerHTML = '';

    // Create QR code using QRCode.js
    const qrCodeDiv = document.createElement('div');
    qrCodeDiv.id = 'qrcode-canvas';
    qrContainer.appendChild(qrCodeDiv);

    new QRCode(qrCodeDiv, {
      text: vCardWithoutPhoto,
      width: 250,
      height: 250,
      colorDark: "#0a192f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });

    // Add instruction text
    const instruction = document.createElement('p');
    instruction.className = 'qr-instruction';
    instruction.textContent = 'Scan with your phone camera';
    qrContainer.appendChild(instruction);

  } catch (err) {
    console.error('Failed to generate QR code:', err);
    qrContainer.innerHTML = `
      <p class="qr-error" style="color: #ff6464; text-align: center;">Unable to generate QR code</p>
    `;
  }
}

// Event Listeners
function initializeEventListeners() {
  // Define allItems to match the rendering order
  const allItems = [
    ...data.professionalJourney.education.map(item => ({ ...item, category: 'education' })),
    ...data.professionalJourney.internships.map(item => ({ ...item, category: 'internships' })),
    ...data.professionalJourney.career.map(item => ({ ...item, category: 'career' })),
    ...data.professionalJourney.certifications.map(item => ({ ...item, category: 'certifications', startDate: item.date, endDate: null }))
  ];
  // Download CV button
  const downloadCVBtn = document.getElementById('download-cv-btn');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
      window.open(data.cvUrl, '_blank');
    });
  }

  // View Contact button - show modal
  const viewContactBtn = document.getElementById('view-contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  if (viewContactBtn && contactModal) {
    viewContactBtn.addEventListener('click', () => {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      generateQRCode();
    });
  }

  // Close modal
  [modalOverlay, modalClose].forEach(element => {
    if (element) {
      element.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // Download vCard
  const downloadVCardBtn = document.getElementById('download-vcard-btn');
  if (downloadVCardBtn) {
    downloadVCardBtn.addEventListener('click', () => {
      // Use the actual vCard file
      const a = document.createElement('a');
      a.href = data.vCardUrl;
      a.download = data.vCardUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Copy vCard
  const copyVCardBtn = document.getElementById('copy-vcard-btn');
  if (copyVCardBtn) {
    copyVCardBtn.addEventListener('click', async () => {
      try {
        // Fetch the actual vCard file content
        const response = await fetch(data.vCardUrl);
        const vCard = await response.text();

        await navigator.clipboard.writeText(vCard);
        const originalText = copyVCardBtn.querySelector('span').textContent;
        copyVCardBtn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => {
          copyVCardBtn.querySelector('span').textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Navbar navigation
  const navLinkButtons = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navLinkButtons.forEach(link => {
    link.addEventListener('click', function () {
      const targetPage = this.getAttribute('data-nav-link');

      setActivePage(targetPage);

      // Close mobile menu
      if (navToggle && navLinks) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }

      window.scrollTo(0, 0);
    });
  });

  // Click on nav-logo to go to About
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      setActivePage('about');
      // Close mobile menu
      if (navToggle && navLinks) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
      window.scrollTo(0, 0);
    });
  }

  // Handle hash changes (back/forward buttons)
  window.addEventListener('hashchange', () => {
    const page = window.location.hash.substring(1) || 'about';
    setActivePage(page);
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabIndex = this.getAttribute('data-tab');

      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      this.classList.add('active');
      const panel = document.getElementById(`panel-${tabIndex}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Project filters
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter-btn');

      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      filterItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter.replace(' ', '')) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });

  // Read more button for projects
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more-btn') || e.target.closest('.read-more-btn')) {
      const btn = e.target.classList.contains('read-more-btn') ? e.target : e.target.closest('.read-more-btn');
      const projectItem = btn.closest('.project-item');
      if (projectItem) {
        projectItem.classList.toggle('expanded');
        const icon = btn.querySelector('ion-icon');
        const text = btn.textContent.trim();
        if (projectItem.classList.contains('expanded')) {
          icon.name = 'chevron-up-outline';
          btn.innerHTML = '<span>Hide Description</span> <ion-icon name="chevron-up-outline"></ion-icon>';
        } else {
          icon.name = 'chevron-down-outline';
          btn.innerHTML = '<span>Show Description</span> <ion-icon name="chevron-down-outline"></ion-icon>';
        }
      }
    }
  });

  // Form validation and submission
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  if (form && formBtn) {
    // Form validation
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute('disabled');
        } else {
          formBtn.setAttribute('disabled', '');
        }
      });
    });

    // Form submission with EmailJS
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formMessage = document.getElementById('form-message');
      const submitBtn = formBtn.querySelector('span');
      const originalBtnText = submitBtn.textContent;

      // Show loading state
      submitBtn.innerHTML = 'Sending... <span class="loading-spinner"></span>';
      formBtn.setAttribute('disabled', '');

      // Get form data
      const formData = new FormData(form);

      // Create timestamp
      const now = new Date();
      const timestamp = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const data = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        countryCode: formData.get('countryCode') || '',
        phone: formData.get('phone') || 'Not provided',
        message: formData.get('message'),
        time: timestamp
      };

      try {
        // EmailJS configuration
        const serviceID = 'service_ewyv34a'; // Replace with your EmailJS service ID
        const templateID = 'template_t785tqm'; // Replace with your EmailJS template ID
        const publicKey = 'oa96Vl-iEwg8B57p1'; // Replace with your EmailJS public key

        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, data, publicKey);

        // Success
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        form.reset();
        formBtn.setAttribute('disabled', '');

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = '';
        }, 5000);

      } catch (error) {
        // Error
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = '';
        }, 5000);
      } finally {
        // Reset button
        submitBtn.textContent = originalBtnText;
        formBtn.removeAttribute('disabled');
      }
    });
  }

  // Country code select display customization
  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+242', country: 'Republic of the Congo', flag: '🇨🇬' },
    { code: '+243', country: 'Democratic Republic of the Congo', flag: '🇨🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+246', country: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { code: '+247', country: 'Ascension Island', flag: '🇦🇨' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+262', country: 'Réunion', flag: '🇷🇪' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+290', country: 'Saint Helena', flag: '🇸🇭' },
    { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
    { code: '+297', country: 'Aruba', flag: '🇦🇼' },
    { code: '+298', country: 'Faroe Islands', flag: '🇫🇴' },
    { code: '+299', country: 'Greenland', flag: '🇬🇱' },
    { code: '+350', country: 'Gibraltar', flag: '🇬🇮' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+378', country: 'San Marino', flag: '🇸🇲' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+500', country: 'Falkland Islands', flag: '🇫🇰' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    { code: '+509', country: 'Haiti', flag: '🇭🇹' },
    { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+596', country: 'Martinique', flag: '🇲🇶' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+599', country: 'Curaçao', flag: '🇨🇼' },
    { code: '+670', country: 'East Timor', flag: '🇹🇱' },
    { code: '+672', country: 'Antarctica', flag: '🇦🇶' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+674', country: 'Nauru', flag: '🇳🇷' },
    { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+676', country: 'Tonga', flag: '🇹🇴' },
    { code: '+677', country: 'Solomon Islands', flag: '🇸🇧' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+680', country: 'Palau', flag: '🇵🇼' },
    { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫' },
    { code: '+682', country: 'Cook Islands', flag: '🇨🇰' },
    { code: '+683', country: 'Niue', flag: '🇳🇺' },
    { code: '+684', country: 'American Samoa', flag: '🇦🇸' },
    { code: '+685', country: 'Samoa', flag: '🇼🇸' },
    { code: '+686', country: 'Kiribati', flag: '🇰🇮' },
    { code: '+687', country: 'New Caledonia', flag: '🇳🇨' },
    { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
    { code: '+689', country: 'French Polynesia', flag: '🇵🇫' },
    { code: '+690', country: 'Tokelau', flag: '🇹🇰' },
    { code: '+691', country: 'Micronesia', flag: '🇫🇲' },
    { code: '+692', country: 'Marshall Islands', flag: '🇲🇭' },
    { code: '+850', country: 'North Korea', flag: '🇰🇵' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' }
  ];
  const countryCodeSelect = document.getElementById('countryCode');
  if (countryCodeSelect) {
    const updateSelectedDisplay = () => {
      const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
      if (selectedOption.value) {
        const country = countryCodes.find(c => c.code === selectedOption.value);
        if (country) {
          selectedOption.textContent = `${country.flag} ${country.code}`;
        }
      }
    };

    const updateDropdownDisplay = () => {
      const selectedIndex = countryCodeSelect.selectedIndex;
      countryCodes.forEach((country, index) => {
        const option = countryCodeSelect.options[index];
        if (option) {
          if (index === selectedIndex) {
            option.textContent = `${country.flag} ${country.code}`;
          } else {
            option.textContent = `${country.flag} ${country.code} ${country.country}`;
          }
        }
      });
    };

    countryCodeSelect.addEventListener('focus', updateDropdownDisplay);
    countryCodeSelect.addEventListener('blur', updateSelectedDisplay);
    countryCodeSelect.addEventListener('change', updateSelectedDisplay);

    // Initial setup
    updateSelectedDisplay();
  }

  // Professional Journey Filters
  const journeyFilterBtns = document.querySelectorAll('.filter-btn');
  const timelineDots = document.querySelectorAll('.timeline-dot');
  const timelineBars = document.querySelectorAll('.timeline-bar');

  journeyFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Remove active from all buttons
      journeyFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter timeline elements
      timelineDots.forEach(dot => {
        const category = dot.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          dot.classList.remove('filtered-out');
          dot.style.opacity = '1';
        } else {
          dot.classList.add('filtered-out');
          dot.style.opacity = '0.2';
        }
      });

      timelineBars.forEach(bar => {
        const category = bar.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          bar.classList.remove('filtered-out');
          bar.style.opacity = '1';
        } else {
          bar.classList.add('filtered-out');
          bar.style.opacity = '0.2';
        }
      });
    });
  });

  // Timeline dot click handlers for detailed view
  timelineDots.forEach((dot) => {
    // Tooltip functionality
    const tooltip = document.createElement('div');
    tooltip.className = 'timeline-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    dot.addEventListener('mouseenter', function (e) {
      const itemIndex = parseInt(this.getAttribute('data-item-index'));
      const item = allItems[itemIndex];
      const dateToUse = item.startDate || item.date;

      tooltip.innerHTML = `
        <div class="tooltip-title">${item.title}</div>
        <div class="tooltip-subtitle">${item.company || item.institution || item.issuer}</div>
        <div class="tooltip-date">${new Date(dateToUse).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - ${item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}</div>
      `;

      tooltip.style.display = 'block';
    });

    dot.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });

    dot.addEventListener('mousemove', function (e) {
      tooltip.style.left = e.pageX + 15 + 'px';
      tooltip.style.top = e.pageY - 50 + 'px';
    });
  });

  // Timeline bar click handlers for detailed view
  timelineBars.forEach((bar) => {
    // Tooltip functionality
    const tooltip = document.createElement('div');
    tooltip.className = 'timeline-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    bar.addEventListener('mouseenter', function (e) {
      const itemIndex = parseInt(this.getAttribute('data-item-index'));
      const item = allItems[itemIndex];
      const dateToUse = item.startDate || item.date;

      tooltip.innerHTML = `
        <div class="tooltip-title">${item.title}</div>
        <div class="tooltip-subtitle">${item.company || item.institution || item.issuer}</div>
        <div class="tooltip-date">${new Date(dateToUse).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - ${item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}</div>
      `;

      tooltip.style.display = 'block';
    });

    bar.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });

    bar.addEventListener('mousemove', function (e) {
      tooltip.style.left = e.pageX + 15 + 'px';
      tooltip.style.top = e.pageY - 50 + 'px';
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // Project item expansion
  // Removed

  // Sidebar contact buttons hover effect
  const leftHoverText = document.getElementById('left-hover-text');
  const rightHoverText = document.getElementById('right-hover-text');
  const sideElements = document.querySelectorAll('.side-element a');
  sideElements.forEach(a => {
    const text = a.querySelector('.sr-only').textContent;
    const isLeft = a.closest('.side-left');
    const hoverText = isLeft ? leftHoverText : rightHoverText;
    a.addEventListener('mouseenter', () => {
      hoverText.textContent = text;
      hoverText.style.opacity = '1';
      // Move previous siblings up
      let sibling = a.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === 'A') {
          sibling.style.transform = 'translateY(-10px)';
        }
        sibling = sibling.previousElementSibling;
      }
      // Move hovered button up
      a.style.transform = 'translateY(-10px)';
    });
    a.addEventListener('mouseleave', () => {
      hoverText.style.opacity = '0';
      // Reset all transforms
      const allSiblings = a.parentElement.querySelectorAll('a');
      allSiblings.forEach(sib => {
        sib.style.transform = '';
      });
    });
  });
}
