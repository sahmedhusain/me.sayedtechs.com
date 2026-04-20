import { data } from './data.js';
import { countryCodes } from './data/countries.js';
import { generateVCard, generateQRCode } from './renderers/contact.js';
import { generateTimelineSVG } from './renderers/journey.js';

// Set active page function
export function setActivePage(targetPage) {
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
      document.body.classList.add('contact-active');
      page.classList.add('contact-animate');
      // Remove animation class after animation completes
      setTimeout(() => {
        page.classList.remove('contact-animate');
      }, 800); // Match animation duration
    } else {
      document.body.classList.remove('contact-active');
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

  // Custom logic for country codes removed due to native dropdown UI issues
  // The generic rendering in contact.js has been updated instead.

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
}
