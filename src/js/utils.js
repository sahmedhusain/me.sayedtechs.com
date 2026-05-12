import { getData } from './constants/index.js';
import { t } from './constants/i18n.js';

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

/**
 * Get a logo path for a given entity name.
 * Uses the centralized assets.json logo_match_rules for resolution.
 */
export function getLogo(name, fallback) {
  const local = getLocalLogoFor(name);
  if (local) return local;

  // Specific fallbacks for missing local files
  const n = (name || '').toLowerCase();
  if (n.includes('linkedin')) return 'https://cdn.simpleicons.org/linkedin';

  return fallback || 'https://placehold.co/48x48/e1e3e2/3f4948?text=LOGO';
}

/**
 * Look up a local logo file for a given entity name using assets.json match rules.
 */
export function getLocalLogoFor(name) {
  const n = (name || '').toLowerCase();
  let assets;

  try {
    assets = getData().assets;
  } catch {
    return null;
  }

  if (!assets || !assets.logo_match_rules) {
    return null;
  }

  // Use the match rules from assets.json
  for (const rule of assets.logo_match_rules) {
    for (const match of rule.match) {
      if (n.includes(match)) {
        return assets.logos?.[rule.logo] || null;
      }
    }
  }

  return null;
}

/**
 * Get a sensible destination URL for a given entity name.
 * Uses the centralized assets.json entity_urls for resolution.
 */
export function getEntityUrl(name) {
  const n = (name || '').toLowerCase();

  let assets;
  try {
    assets = getData().assets;
  } catch {
    return '#';
  }

  if (!assets || !assets.logo_match_rules) {
    return '#';
  }

  // Use match rules to find URL key
  for (const rule of assets.logo_match_rules) {
    for (const match of rule.match) {
      if (n.includes(match)) {
        const urlKey = rule.url;
        if (urlKey && assets.entity_urls?.[urlKey]) {
          return assets.entity_urls[urlKey];
        }
      }
    }
  }

  // Direct lookup in entity_urls
  for (const key in assets.entity_urls) {
    if (n.includes(key.replace(/_/g, ' '))) {
      return assets.entity_urls[key];
    }
  }

  // Fallback to Google search
  if (n.trim()) return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  return '#';
}

/**
 * Calculate relative time string from a date.
 * Uses i18n strings for localization support.
 * @param {string} dateStr - ISO date string
 * @returns {string} Relative time string (e.g. "3 days ago")
 */
export function timeAgo(dateStr) {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (seconds < 0) return t('time.justNow');
  if (seconds < 60) return t('time.justNow');
  
  if (seconds < 3600) {
    const n = Math.floor(seconds / 60);
    return n === 1 ? t('time.minuteAgo') : t('time.minutesAgo', { n });
  }
  if (seconds < 86400) {
    const n = Math.floor(seconds / 3600);
    return n === 1 ? t('time.hourAgo') : t('time.hoursAgo', { n });
  }
  if (seconds < 172800) return t('time.yesterday');
  if (seconds < 604800) {
    const n = Math.floor(seconds / 86400);
    return n === 1 ? t('time.dayAgo') : t('time.daysAgo', { n });
  }
  if (seconds < 2592000) {
    const n = Math.floor(seconds / 604800);
    return n === 1 ? t('time.weekAgo') : t('time.weeksAgo', { n });
  }
  if (seconds < 31536000) {
    const n = Math.floor(seconds / 2592000);
    return n === 1 ? t('time.monthAgo') : t('time.monthsAgo', { n });
  }
  const n = Math.floor(seconds / 31536000);
  return n === 1 ? t('time.yearAgo') : t('time.yearsAgo', { n });
}