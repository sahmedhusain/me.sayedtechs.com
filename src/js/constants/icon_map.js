// 1. Helper functions to keep the code extremely clean and DRY (Don't Repeat Yourself)
const img = (src) => ({ type: 'img', src });
const ion = (cls) => ({ type: 'ion', class: cls });
const fa = (cls) => ({ type: 'fa', class: cls });

// 2. Define each icon exactly once
const _go = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg');
const _js = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg');
const _ts = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg');
const _java = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg');
const _html = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg');
const _css = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg');
const _htmlcss = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg');
const _react = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg');
const _next = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg');
const _vite = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg');
const _tailwind = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg');
const _graphql = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg');
const _apollo = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apollographql/apollographql-original.svg');
const _sqlite = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg');
const _postgresql = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg');
const _mysql = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg');
const _mongodb = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg');
const _mongoose = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg');
const _express = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg');
const _mcp = img('https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/mcp.png');
const _docker = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg');
const _bootstrap = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg');
const _arduino = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg');
const _bash = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg');
const _raspberrypi = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg');
const _nodejs = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg');
const _npm = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg');
const _jest = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg');
const _eslint = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg');
const _framer = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg');
const _json = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg');
const _playwright = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg');
const _c = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg');
const _cpp = img('https://cdn.simpleicons.org/cplusplus');
const _pycharm = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg');
const _rust = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-line.svg');
const _php = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg');
const _laravel = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg');
const _oauth = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg');
const _cloudflare = img('https://cdn.simpleicons.org/cloudflare');
const _aws = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg');
const _postman = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg');
const _git = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg');
const _github = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg');
const _linux = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg');
const _vscode = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg');
const _figma = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg');
const _mermaid = img('https://mermaid.live/favicon.svg');
const _markdown = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg');
const _archicad = img('https://cdn.simpleicons.org/archicad');
const _macos = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg');
const _windows = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg');
const _android = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg');
const _xcode = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg');
const _androidstudio = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg');
const _firebase = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain-wordmark.svg');
const _python = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg');
const _flutter = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg');
const _dart = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg');
const _matlab = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg');
const _autocad = img('https://cdn.simpleicons.org/autocad');
const _solidworks = img('https://www.solidworks.com/themes/custom/sw-digital/favicon.ico');
const _fusion360 = img('https://damassets.autodesk.net/content/dam/autodesk/www/product-imagery/badge-75x75/simplified-badges/fusion-360-product-design-extension-2023-simplified-badge-75x75.png');
const _oracle = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg');
const _sap = img('https://simpleicons.org/icons/sap.svg');
const _everycircuit = img('https://everycircuit.com/website/drawable-ldpi/symbol_spin.png');
const _circuitverse = img('https://circuitverse.org/assets/favicon-2fc7f88c7d9f61d534fda46f7c4890a0c18d2c406f1f7af2e5948ebc5999e573.ico');
const _websocket = img('https://www.svgrepo.com/show/354553/websocket.svg');
const _tcpip = img('https://www.svgrepo.com/show/435305/dns.svg');
const _rest = img('https://cdn-icons-png.flaticon.com/512/9784/9784550.png');
const _jwt = img('https://cdn-icons-png.flaticon.com/128/8654/8654207.png');
const _sap_system = img('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDEyLjM4IDIwNCI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMXtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjIwNi4xOSIgeDI9IjIwNi4xOSIgeTI9IjIwNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwYjhmMSIvPjxzdG9wIG9mZnNldD0iMC4wMiIgc3RvcC1jb2xvcj0iIzAxYjZmMCIvPjxzdG9wIG9mZnNldD0iMC4zMSIgc3RvcC1jb2xvcj0iIzBkOTBkOSIvPjxzdG9wIG9mZnNldD0iMC41OCIgc3RvcC1jb2xvcj0iIzE3NzVjOCIvPjxzdG9wIG9mZnNldD0iMC44MiIgc3RvcC1jb2xvcj0iIzFjNjViZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlNWZiYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5TQVBfZ3JhZF9SX3Njcm5fWmVpY2hlbmZsw6RjaGUgMTwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIwIDIwNCAyMDguNDEgMjA0IDQxMi4zOCAwIDAgMCAwIDIwNCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI0NC43MywzOC4zNmwtNDAuNiwwdjk2LjUyTDE2OC42NywzOC4zM0gxMzMuNTFsLTMwLjI3LDgwLjcyQzEwMCw5OC43LDc5LDkxLjY3LDYyLjQsODYuNCw1MS40Niw4Mi44OSwzOS44NSw3Ny43Miw0MCw3MmMuMDktNC42OCw2LjIzLTksMTguMzgtOC4zOCw4LjE3LjQzLDE1LjM3LDEuMDksMjkuNzEsOGwxNC4xLTI0LjU1Qzg5LjA2LDQwLjQyLDcxLDM2LjIxLDU2LjE3LDM2LjE5aC0uMDljLTE3LjI4LDAtMzEuNjgsNS42LTQwLjYsMTQuODNBMzQuMjMsMzQuMjMsMCwwLDAsNS43Nyw3NC43QzUuNTQsODcuMTUsMTAuMTEsOTYsMTkuNzEsMTAzYzguMSw1Ljk0LDE4LjQ2LDkuNzksMjcuNiwxMi42MiwxMS4yNywzLjQ5LDIwLjQ3LDYuNTMsMjAuMzYsMTNBOS41Nyw5LjU3LDAsMCwxLDY1LDEzNWMtMi44MSwyLjktNy4xMyw0LTEzLjA5LDQuMS0xMS40OS4yNC0yMC0xLjU2LTMzLjYxLTkuNTlMNS43NywxNTQuNDJhOTMuNzcsOTMuNzcsMCwwLDAsNDYsMTIuMjJsMi4xMSwwYzE0LjI0LS4yNSwyNS43NC00LjMxLDM0LjkyLTExLjcxLjUzLS40MSwxLS44NCwxLjQ5LTEuMjhMODYuMTcsMTY0LjVIMTIzbDYuMTktMTguODJhNjcuNDYsNjcuNDYsMCwwLDAsMjEuNjgsMy40Myw2OC4zMyw2OC4zMywwLDAsMCwyMS4xNi0zLjI1bDYsMTguNjRoNjAuMTR2LTM5aDEzLjExYzMxLjcxLDAsNTAuNDYtMTYuMTUsNTAuNDYtNDMuMkMzMDEuNzQsNTIuMTksMjgzLjUyLDM4LjM2LDI0NC43MywzOC4zNlpNMTUwLjkxLDEyMWEzNi45MywzNi45MywwLDAsMS0xMy0yLjI4bDEyLjg3LTQwLjU5SDE1MWwxMi42NSw0MC43MUEzOC41LDM4LjUsMCwwLDEsMTUwLjkxLDEyMVptOTYuMi0yMy4zM2gtOC45NFY2NC45MWg4Ljk0YzExLjkzLDAsMjEuNDQsNCwyMS40NCwxNi4xNCwwLDEyLjYtOS41MSwxNi41Ny0yMS40NCwxNi41NyIvPjwvc3ZnPg==');

const _unix = ion('terminal-outline');
const _debian = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg');
const _qemu = img('https://cdn.simpleicons.org/qemu');
const _ssh = img('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ssh/ssh-original.svg');
const _scan = ion('scan-outline');
const _http = ion('globe-outline');
const _flame = ion('flame');
const _shield = ion('shield-checkmark-outline');
const _construct = ion('construct');
const _speedometer = ion('speedometer-outline');
const _flash = ion('flash-outline');
const _sunny = ion('sunny');
const _hardware_chip = ion('hardware-chip');
const _code_working = ion('code-working');
const _navigate = ion('navigate-outline');
const _layers = ion('layers');
const _server = ion('server');
const _sync = ion('sync');
const _fingerprint = ion('finger-print-outline');
const _shapes = ion('shapes-outline');

const _ml = fa('fas fa-project-diagram');


// 3. The Map: Multiple Definitions per line, NO Repetition!
export const iconMap = {
  // Programming Languages
  'javascript': _js, 'javascript es6': _js,
  'typescript': _ts,
  'go': _go, 'golang': _go, 'go golang': _go,
  'python': _python,
  'rust': _rust,
  'c++': _cpp, 'cplusplus': _cpp, 'c cplusplus': _cpp, 'c c++': _cpp, 'cpp': _cpp,
  'c': _c,
  'java': _java,
  'dart': _dart,
  'php': _php,

  // Web & Markup
  'html5': _html, 'html': _html,
  'css3': _css, 'css': _css,
  'html/css': _htmlcss,

  // Frameworks & Libraries
  'react': _react,
  'next.js': _next, 'nextjs': _next,
  'node.js': _nodejs, 'nodejs': _nodejs,
  'tailwind css': _tailwind,
  'graphql': _graphql,
  'apollo client': _apollo, 'apollo': _apollo,
  'vite': _vite, 'vitejs': _vite,
  'flutter': _flutter,
  'express': _express,
  'laravel': _laravel,
  'bootstrap': _bootstrap,

  // Databases
  'sqlite': _sqlite, 'sql sqlite': _sqlite,
  'mongodb': _mongodb,
  'postgresql': _postgresql,
  'mysql': _mysql,
  'mongoose': _mongoose,
  'oracle': _oracle, 'oracle db crm': _oracle,

  // Testing & Quality
  'jest': _jest,
  'eslint': _eslint,
  'playwright': _playwright,

  // Networking, Web & Protocols (With Arabic Maps)
  'rest apis': _rest, 'rest': _rest, 'apis': _rest, 'واجهات برمجة التطبيقات (rest apis)': _rest,
  'websockets': _websocket, 'websocket': _websocket,
  'http': _http,
  'json': _json,
  'tcp/ip': _tcpip, 'tcp ip': _tcpip, 'networking': _tcpip, 'شبكات': _tcpip,
  'oauth2': _oauth, 'oauth': _oauth,
  'jwt': _jwt,

  // Software, DevOps & Tools
  'git': _git,
  'github': _github,
  'vs code': _vscode,
  'pycharm': _pycharm,
  'docker': _docker,
  'cloudflare': _cloudflare,
  'aws': _aws,
  'unix': _unix,
  'bash': _bash,
  'ssh': _ssh, 'openssh': _ssh,
  'ufw': _shield, 'firewall': _shield,
  'nmap': _scan, 'arp scan': _scan, 'security auditing': _shield,
  'postman': _postman,
  'figma': _figma,
  'mermaid': _mermaid,
  'markdown': _markdown,
  'xcode': _xcode,
  'android studio': _androidstudio,
  'npm': _npm,
  'firebase': _firebase,
  'framer motion': _framer, 'framer': _framer,
  'mcp': _mcp,

  // OS & Environments
  'linux': _linux, 'wsl': _linux,
  'debian': _debian,
  'qemu': _qemu, 'utm': _qemu, 'utm qemu': _qemu,
  'macos': _macos,
  'windows': _windows,
  'android': _android,
  'raspberry pi': _raspberrypi,

  // Computer Science (With Arabic mappings based on ALL variations)
  'algorithms data structures': _code_working, 'الخوارزميات وهياكل البيانات': _code_working,
  'graph algorithms pathfinding': _navigate, 'خوارزميات البحث عن المسار pathfinding': _navigate, 'خوارزميات الرسوم البيانية والبحث عن المسار': _navigate,
  'virtual dom': _layers,
  'state management': _server, 'إدارة الحالة state management': _server, 'إدارة الحالة': _server,
  'concurrency parallelism': _sync, 'البرمجة المتزامنة concurrency': _sync, 'التزامن والتوازي': _sync,
  'authentication session management': _fingerprint, 'إدارة الجلسات وحماية الدخول auth': _fingerprint, 'المصادقة وإدارة الجلسات': _fingerprint,
  'object oriented programming': _shapes, 'البرمجة كائنية التوجه oop': _shapes, 'البرمجة كائنية التوجه': _shapes,
  'machine learning': _ml, 'machinelearning': _ml, 'machine learining': _ml, 'ml': _ml, 'تعلم الآلة machine learning': _ml, 'تعلم الآلة': _ml,

  // Engineering CAD & Simulation
  'autocad': _autocad,
  'archicad': _archicad, 'archi cad': _archicad,
  'matlab': _matlab, 'simulink': _matlab, 'matlab simulink': _matlab,
  'circuit verse': _circuitverse,
  'everycircuit': _everycircuit,
  'solidworks': _solidworks,
  'fusion 360': _fusion360,

  // Hardware & Core Engineering (With Arabic mappings based on ALL variations)
  'fire protections systems': _shield, 'fire protection systems': _shield, 'أنظمة إنذار ومكافحة الحريق': _shield, 'أنظمة الحماية من الحريق': _shield,
  'fire alarm system design': _flame,
  'electrical installation': _construct, 'التمديدات والتركيبات الكهربائية': _construct, 'التمديدات الكهربائية': _construct,
  'electrical testing equipment': _speedometer, 'معدات الفحص والاختبار الكهربائي': _speedometer, 'معدات الاختبار الكهربائية': _speedometer,
  'solar pv systems': _sunny, 'أنظمة الطاقة الشمسية': _sunny, 'أنظمة الطاقة الشمسية الكهروضوئية': _sunny, 'أنظمة شمسية': _sunny, 'solar systems': _sunny, 
  'digital circuits design arduino pi': _arduino, 'تصميم الدوائر الرقمية أردوينو و pi': _arduino, 'تصميم الدوائر الرقمية arduino pi': _arduino, 'digital circuits design': _arduino, 'electronics circuit design': _arduino,
  'power electronics': _flash, 'إلكترونيات الطاقة power electronics': _flash, 'إلكترونيات القوى': _flash,
  'arduino': _arduino,

  // Enterprise Systems
  'sap': _sap, 'sap system': _sap_system,
};