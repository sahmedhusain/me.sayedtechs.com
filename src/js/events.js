import { data } from './data.js';
import { countryCodes } from './data/countries.js';
import { generateVCard, generateQRCode } from './renderers/contact.js';
import { generateTimelineSVG } from './renderers/journey.js';

// Set active page function
export function setActivePage(targetPage) {
  const navLinkButtons = document.querySelectorAll('.nav-pill-container [data-nav-link]'); // Target only top bar
  const footerLinkButtons = document.querySelectorAll('.footer [data-nav-link]'); // For content sync only
  const pages = document.querySelectorAll('[data-page]');

  // Navbar avatar logic
  const navAvatar = document.getElementById('nav-avatar-container');
  const homeMainAvatar = document.getElementById('home-main-avatar');
  
  const updateNavAvatar = (currentPage = targetPage) => {
    if (!navAvatar) return;
    const isHome = currentPage === 'home';
    
    if (isHome) {
      const scrollThreshold = 10;
      if (window.scrollY > scrollThreshold) {
        navAvatar.style.opacity = '1';
        navAvatar.style.pointerEvents = 'auto';
        navAvatar.style.transform = 'scale(1)';
        if (homeMainAvatar) {
          homeMainAvatar.style.opacity = '0';
          homeMainAvatar.style.transform = 'scale(0.8) translateY(-20px)';
          homeMainAvatar.style.pointerEvents = 'none';
        }
      } else {
        navAvatar.style.opacity = '0';
        navAvatar.style.pointerEvents = 'none';
        navAvatar.style.transform = 'scale(0.8)';
        if (homeMainAvatar) {
          homeMainAvatar.style.opacity = '1';
          homeMainAvatar.style.transform = 'scale(1) translateY(0)';
          homeMainAvatar.style.pointerEvents = 'auto';
        }
      }
    } else {
      navAvatar.style.opacity = '1';
      navAvatar.style.pointerEvents = 'auto';
      navAvatar.style.transform = 'scale(1)';
    }
  };

  updateNavAvatar(targetPage);
  if (!window.hasNavScrollListener) {
    window.addEventListener('scroll', () => {
      const currentActive = document.querySelector('[data-page].active');
      const activeId = currentActive ? currentActive.getAttribute('data-page') : 'home';
      updateNavAvatar(activeId);
    });
    window.hasNavScrollListener = true;
  }

  // Handle Active Classes
  document.querySelectorAll('[data-nav-link]').forEach(l => l.classList.remove('active'));
  pages.forEach(p => p.classList.remove('active'));

  const activeTopBarLink = document.querySelector(`.nav-pill-container [data-nav-link="${targetPage}"]`);
  if (activeTopBarLink) activeTopBarLink.classList.add('active');
  
  const activeFooterLink = document.querySelector(`.footer [data-nav-link="${targetPage}"]`);
  if (activeFooterLink) activeFooterLink.classList.add('active');

  const page = document.querySelector(`[data-page="${targetPage}"]`);
  if (page) {
    page.classList.add('active');
    if (targetPage === 'contact') {
      document.body.classList.add('contact-active');
      page.classList.add('contact-animate');
      setTimeout(() => page.classList.remove('contact-animate'), 800);
    } else {
      document.body.classList.remove('contact-active');
    }
  }

  // Update URL
  if (targetPage === 'home') {
    history.replaceState({ page: 'home' }, '', window.location.pathname); 
  } else {
    window.location.hash = targetPage;
  }

  // Sync Logo State
  const nl = document.querySelector('.nav-logo');
  if (nl) {
    if (targetPage === 'home' || targetPage === 'about') nl.classList.remove('other-route');
    else nl.classList.add('other-route');
  }

  // --- Sync Indicators ---
  const activeIndicator = document.getElementById('nav-indicator-active');
  if (activeIndicator && activeTopBarLink) {
    const rect = activeTopBarLink.getBoundingClientRect();
    const parentRect = document.querySelector('.nav-pill-container').getBoundingClientRect();
    activeIndicator.style.width = `${rect.width}px`;
    activeIndicator.style.left = `${rect.left - parentRect.left}px`;
    activeIndicator.style.top = `${rect.top - parentRect.top}px`;
    activeIndicator.style.opacity = targetPage === 'home' ? '0' : '1';
  } else if (activeIndicator) {
    activeIndicator.style.opacity = '0';
  }
}


// Skills Animation Functions
export function initializeSkillsAnimations() {
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


export function initializeEventListeners() {
  // Language Dropdown Logic
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langMenu = document.getElementById('lang-menu');
  const langOptions = document.querySelectorAll('.lang-option');
  const langText = document.getElementById('lang-text');
  
  if (langToggleBtn && langMenu) {
    const langIndicator = document.getElementById('lang-indicator-liquid');

    const moveLangIndicator = (btn) => {
      if (!langIndicator || !btn) return;
      const rect = btn.getBoundingClientRect();
      const parentRect = langMenu.getBoundingClientRect();
      langIndicator.style.height = `${rect.height}px`;
      langIndicator.style.top = `${rect.top - parentRect.top}px`;
      langIndicator.style.opacity = '1';
    };

    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = langMenu.style.display === 'flex';
      
      if (!isVisible) {
        langMenu.style.display = 'flex';
        // Position indicator on active initially
        const activeOption = langMenu.querySelector('.lang-option.active');
        if (activeOption) moveLangIndicator(activeOption);

        setTimeout(() => {
          langMenu.style.opacity = '1';
          langMenu.style.transform = 'translateY(0)';
        }, 10);
      } else {
        langMenu.style.opacity = '0';
        langMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          langMenu.style.display = 'none';
        }, 400);
      }
    });

    langOptions.forEach(option => {
      option.addEventListener('mouseenter', () => moveLangIndicator(option));
      
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        
        // Update UI
        langText.textContent = lang.toUpperCase();
        langOptions.forEach(opt => {
          opt.classList.remove('active');
          opt.querySelector('ion-icon').style.opacity = '0';
        });
        option.classList.add('active');
        option.querySelector('ion-icon').style.opacity = '1';
        moveLangIndicator(option);

        // Apply Language
        if (lang === 'ar') {
          document.documentElement.setAttribute('lang', 'ar');
          document.body.classList.add('rtl');
        } else {
          document.documentElement.setAttribute('lang', 'en');
          document.body.classList.remove('rtl');
        }

        // Close Menu
        setTimeout(() => {
          langMenu.style.opacity = '0';
          langMenu.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            langMenu.style.display = 'none';
          }, 400);
        }, 200);
      });
    });

    langMenu.addEventListener('mouseleave', () => {
      const activeOption = langMenu.querySelector('.lang-option.active');
      if (activeOption) moveLangIndicator(activeOption);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (langToggleBtn && !langToggleBtn.contains(e.target) && langMenu && !langMenu.contains(e.target)) {
        langMenu.style.opacity = '0';
        langMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          langMenu.style.display = 'none';
        }, 400);
      }
    });
  }

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const icon = themeToggleBtn?.querySelector('ion-icon');
  
  // Check local storage for theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if(icon) icon.setAttribute('name', 'sunny-outline');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if(icon) icon.setAttribute('name', 'moon-outline');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(icon) icon.setAttribute('name', 'sunny-outline');
      }
    });
  }

  // --- Generic View Toggle Logic (List vs Grid) ---
  const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');

  if (viewToggleBtns.length > 0) {
    viewToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.getAttribute('data-target-group'); // e.g., 'exp', 'edu', 'experience-all'
        const viewType = btn.getAttribute('data-view');      // 'list' or 'grid'

        // 1. Find all buttons in this specific control group
        const groupBtns = document.querySelectorAll(`.view-toggle-btn[data-target-group="${group}"]`);
        groupBtns.forEach(b => b.classList.remove('active'));

        // 2. Activate clicked button
        btn.classList.add('active');

        // 3. Toggle Containers for this group or all experience groups
        const groupsToToggle = group === 'experience-all' ? ['exp', 'intern', 'edu', 'cert'] : [group];

        groupsToToggle.forEach(g => {
          const listView = document.getElementById(`${g}-list-view`);
          const gridView = document.getElementById(`${g}-grid-view`);

          if (viewType === 'list') {
            listView.classList.add('active');
            gridView.classList.remove('active');
          } else {
            listView.classList.remove('active');
            gridView.classList.add('active');
          }
        });

        // Save preference to localStorage
        if (group === 'experience-all') {
          localStorage.setItem('viewPreference', viewType);
        }
      });
    });
  }

  // --- Load View Preference from localStorage ---
  const savedView = localStorage.getItem('viewPreference');
  if (savedView) {
    const groups = ['exp', 'intern', 'edu', 'cert'];
    groups.forEach(g => {
      const listView = document.getElementById(`${g}-list-view`);
      const gridView = document.getElementById(`${g}-grid-view`);
      if (savedView === 'list') {
        listView.classList.add('active');
        gridView.classList.remove('active');
      } else {
        listView.classList.remove('active');
        gridView.classList.add('active');
      }
    });
    // Update button states
    const groupBtns = document.querySelectorAll('.view-toggle-btn[data-target-group="experience-all"]');
    groupBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === savedView) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- Generic Sidebar Tab Logic ---
  const sidebarBtns = document.querySelectorAll('.section-sidebar-btn');

  if (sidebarBtns.length > 0) {
    sidebarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.getAttribute('data-tab-group'); // e.g., 'exp', 'edu'
        const index = btn.getAttribute('data-tab-index'); // e.g., '0', '1'

        // 1. Deactivate all buttons in this specific sidebar group
        const groupSidebarBtns = document.querySelectorAll(`.section-sidebar-btn[data-tab-group="${group}"]`);
        groupSidebarBtns.forEach(b => b.classList.remove('active'));

        // 2. Activate clicked button
        btn.classList.add('active');

        // 3. Switch Panel
        // First hide all panels in this group
        // We find the parent wrapper's content area, then the panels
        const container = document.getElementById(`${group}-grid-view`);
        const panels = container.querySelectorAll('.section-tab-panel');
        panels.forEach(p => p.classList.remove('active'));

        // Show target panel
        const targetPanel = document.getElementById(`${group}-panel-${index}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
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

  // Image Preview Modal Logic
  // Image Preview Modal Logic
  const avatars = document.querySelectorAll('.avatar-box, .contact-avatar, .nav-avatar img');
  const imageModal = document.getElementById('image-modal');
  const imageModalClose = document.getElementById('image-modal-close');
  const imageModalOverlay = document.getElementById('image-modal-overlay');

  if (avatars.length > 0 && imageModal) {
    avatars.forEach(avatar => {
      // Add cursor pointer
      avatar.style.cursor = 'zoom-in';

      avatar.addEventListener('click', (e) => {
        // Stop propagation if inside another clickable element
        e.stopPropagation();

        // Update modal image source to match clicked image
        const imgSource = avatar.tagName === 'IMG' ? avatar.src : avatar.querySelector('img').src;
        const modalImg = imageModal.querySelector('.image-modal-img');
        if (modalImg) modalImg.src = imgSource;

        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeImageModal = () => {
      imageModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
    if (imageModalOverlay) imageModalOverlay.addEventListener('click', closeImageModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
      }
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
    downloadVCardBtn.addEventListener('click', async () => {
      const vCard = await generateVCard();
      const blob = new Blob([vCard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'src/assets/Sayed Ahmed Husain.vcf';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Copy vCard
  const copyVCardBtn = document.getElementById('copy-vcard-btn');
  if (copyVCardBtn) {
    copyVCardBtn.addEventListener('click', async () => {
      try {
        const vCard = await generateVCard();
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
      const isHome = document.querySelector('[data-page="home"].active');

      if (targetPage === 'home' && isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Reset scroll position before switching page to ensure avatar logic triggers correctly
        window.scrollTo(0, 0);
        setActivePage(targetPage);
      }
      
      if (navToggle && navLinks) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // --- Liquid Nav Movement (Dual Layer: Active & Hover) ---
  const activeIndicator = document.getElementById('nav-indicator-active');
  const hoverIndicator = document.getElementById('nav-indicator-hover');
  const navContainer = document.querySelector('.nav-pill-container');
  
  if (navContainer) {
    const moveIndicator = (indicator, target, opacity = 1) => {
      if (!indicator || !target) return;
      const rect = target.getBoundingClientRect();
      const parentRect = navContainer.getBoundingClientRect();
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.top = `${rect.top - parentRect.top}px`;
      indicator.style.opacity = opacity;
    };

    // Initialize Active Indicator
    const activeLink = document.querySelector('.nav-link.active') || document.querySelector('[data-nav-link="about"]');
    if (activeLink) moveIndicator(activeIndicator, activeLink);

    const topNavButtons = document.querySelectorAll('.nav-pill-container [data-nav-link]');
    topNavButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const isHome = btn.getAttribute('data-nav-link') === 'home';
        const isActive = btn.classList.contains('active');
        
        if (!isHome && !isActive) {
          moveIndicator(hoverIndicator, btn, 1);
        } else {
          hoverIndicator.style.opacity = '0';
        }
      });

      btn.addEventListener('click', () => {
        const isHome = btn.getAttribute('data-nav-link') === 'home';
        if (!isHome) {
          moveIndicator(activeIndicator, btn, 1);
          hoverIndicator.style.opacity = '0';
        } else {
          activeIndicator.style.opacity = '0';
        }
      });
    });

    navContainer.addEventListener('mouseleave', () => {
      hoverIndicator.style.opacity = '0';
    });
  }

  // Handle initial hash or default to home
  const initialPage = window.location.hash.substring(1) || 'home';
  setActivePage(initialPage);

  // Click on nav-logo to go to Home
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Close mobile menu
      if (navToggle && navLinks) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Handle browser back/forward buttons (hash-based)
  window.addEventListener('hashchange', () => {
    const page = window.location.hash.substring(1) || 'home';
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

  // Journey Timeline filters
  const journeyFilterBtns = document.querySelectorAll('.journey-filters .filter-btn');
  const timelineChartContainer = document.querySelector('.timeline-chart-container');
  
  if (journeyFilterBtns.length > 0 && timelineChartContainer) {
    journeyFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        journeyFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        if (window.generateTimelineSVG) {
          timelineChartContainer.innerHTML = window.generateTimelineSVG(filter);
        }
      });
    });
  }

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
          btn.innerHTML = '<span>Hide</span> <ion-icon name="chevron-up-outline"></ion-icon>';
        } else {
          icon.name = 'chevron-down-outline';
          btn.innerHTML = '<span>Read</span> <ion-icon name="chevron-down-outline"></ion-icon>';
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
      const submitBtn = formBtn.querySelector('.btn-text');
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

  // Custom Country Selector Logic
  const countryTrigger = document.getElementById('country-selector-trigger');
  if (countryTrigger) {
    const dropdown = countryTrigger.querySelector('.country-dropdown-glass');
    const indicator = countryTrigger.querySelector('.country-dropdown-indicator');
    const items = countryTrigger.querySelectorAll('.country-item');
    const flagEl = countryTrigger.querySelector('.selected-flag');
    const codeEl = countryTrigger.querySelector('.selected-code');
    const hiddenInput = document.getElementById('countryCodeInput');

    const moveIndicator = (target) => {
      if (!indicator || !target) return;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();
      indicator.style.height = `${rect.height}px`;
      indicator.style.top = `${target.offsetTop}px`;
      indicator.style.opacity = '1';
    };

    countryTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      countryTrigger.classList.toggle('active');
      if (countryTrigger.classList.contains('active')) {
        const activeItem = countryTrigger.querySelector('.country-item.active');
        if (activeItem) {
          moveIndicator(activeItem);
          activeItem.scrollIntoView({ block: 'nearest' });
        }
      }
    });


    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = item.getAttribute('data-country-code');
        const flag = item.querySelector('.country-flag').textContent;

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        flagEl.textContent = flag;
        codeEl.textContent = code;
        hiddenInput.value = code;

        // Update tick visibility
        items.forEach(i => {
          const tick = i.querySelector('.selection-tick');
          if (tick) tick.style.opacity = i === item ? '1' : '0';
        });

        moveIndicator(item);

        setTimeout(() => countryTrigger.classList.remove('active'), 150);
      });

      item.addEventListener('mouseenter', () => moveIndicator(item));
    });

    const listScroll = countryTrigger.querySelector('.country-list-scroll');
    listScroll.addEventListener('mouseleave', () => {
      const activeItem = countryTrigger.querySelector('.country-item.active');
      if (activeItem) moveIndicator(activeItem);
    });

    document.addEventListener('click', () => countryTrigger.classList.remove('active'));

    const searchInput = document.getElementById('countrySearch');
    if (searchInput) {
      searchInput.addEventListener('click', (e) => e.stopPropagation());
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        items.forEach(item => {
          const name = item.querySelector('.country-name-val').textContent.toLowerCase();
          const code = item.getAttribute('data-country-code').toLowerCase();
          if (name.includes(term) || code.includes(term)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
        // Reset indicator on search
        indicator.style.opacity = '0';
      });
    }
  }

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

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Articles Filtering Logic ---
  const articleTabs = document.querySelectorAll('.article-tab');
  const articleCards = document.querySelectorAll('.article-card');

  if (articleTabs.length > 0) {
    articleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        
        // Update active tab
        articleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards with animation
        articleCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- Articles Search Logic ---
  const articleSearch = document.getElementById('articleSearch');
  if (articleSearch) {
    articleSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      articleCards.forEach(card => {
        const titleText = card.querySelector('.article-title-link').textContent.toLowerCase();
        const descText = card.querySelector('.article-desc').textContent.toLowerCase();
        
        if (titleText.includes(query) || descText.includes(query)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  }
}

