// Image Error Handling Function
export function handleImageError(img) {
  // Prevent infinite loops
  img.onerror = null;

  // Create placeholder icon based on image class
  if (img.classList.contains('org-logo') || img.classList.contains('timeline-logo')) {
    // Company/organization logos - use building icon
    img.outerHTML = '<ion-icon name="business-outline" class="' + img.className + ' placeholder-icon"></ion-icon>';
  } else if (img.classList.contains('contact-avatar') || img.alt.includes('avatar') || img.alt.includes('Avatar')) {
    // Avatar images - use person icon
    img.outerHTML = '<ion-icon name="person-circle-outline" class="' + img.className + ' placeholder-icon"></ion-icon>';
  } else {
    // Generic fallback - use image icon
    img.outerHTML = '<ion-icon name="image-outline" class="' + img.className + ' placeholder-icon"></ion-icon>';
  }
}


// Helper: prefer local workspace logo files where available
export function getLocalLogoFor(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('lichfield') || n.includes('lifeco')) return 'src/assets/lifeco_uk_logo.jpeg';
  if (n.includes('super fire')) return 'src/assets/super_fire_and_safety_services_logo.jpeg';
  if (n.includes('channels by stc') || n.includes('channels')) return 'src/assets/channels_by_stc_bahrain_logo.jpeg';
  if (n.includes('zain')) return 'src/assets/zain_logo.jpeg';
  if (n.includes('megger')) return 'src/assets/megger_logo.jpeg';
  if (n.includes('university of bahrain')) return 'src/assets/university_of_bahrain_logo.jpeg';
  if (n.includes('reboot')) return 'src/assets/reboot_logo.jpeg';
  if (n.includes('nocn')) return 'src/assets/nocn_logo.jpeg';
  if (n.includes('american heart')) return 'src/assets/american_heart_association_logo.jpeg';
  if (n.includes('linkedin')) return 'src/assets/LinkedIn_icon.svg';
  if (n.includes('golden trust')) return 'src/assets/golden_trust_logo.jpeg';
  if (n.includes('crpep')) return 'src/assets/crpep_logo.jpeg';
  if (n.includes('council') || n.includes('engineering professions')) return 'src/assets/crpep_logo.jpeg';
  if (n.includes('electricity and water') || n.includes('ministry of electricity')) return 'src/assets/mewa.jpeg';
  if (n.includes('sheikh isa') || n.includes('secondary school')) return 'src/assets/moe_highschool.jpeg';
  // Add more mappings here as you add image files to the repo
  return null;
}

export function getLogo(name, fallback) {
  const local = getLocalLogoFor(name);
  if (local) return local;

  // Specific fallbacks for missing local files
  const n = (name || '').toLowerCase();
  if (n.includes('linkedin')) return 'https://cdn.simpleicons.org/linkedin'; // Use SVG icon as fallback

  return fallback || 'https://placehold.co/48x48/e1e3e2/3f4948?text=LOGO';
}

// Get a sensible destination for a given entity (company, institution, certificate issuer).
// If you prefer specific URLs for some entities, add them to `entityUrlMap` below.
export function getEntityUrl(name) {
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