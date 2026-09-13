/**
 * Central Data Loader
 * 
 * Loads all JSON constant files, resolves references (featured, assets),
 * and provides a unified data access layer for the entire application.
 */

import { loadLocale } from './i18n.js';
import { resolvePath } from '../utils/paths.js';

let data = null;

/**
 * Load all data from JSON constant files.
 * Must be called once before any rendering.
 * @returns {Object} The assembled data object
 */
export async function loadData() {
  // Load language preference first
  const savedLang = localStorage.getItem('lang') || 'en';
  await loadLocale(savedLang);

  const suffix = savedLang === 'ar' ? '_ar' : '';

  const [profile, assets, experience, education, certifications, skills,
    projects, articles_en, articles_ar, journey] = await Promise.all([
      fetchJSON(`src/js/constants/profile${suffix}.json`),
      fetchJSON(`src/js/constants/assets${suffix}.json`),
      fetchJSON(`src/js/constants/experience${suffix}.json`),
      fetchJSON(`src/js/constants/education${suffix}.json`),
      fetchJSON(`src/js/constants/certifications${suffix}.json`),
      fetchJSON(`src/js/constants/skills${suffix}.json`),
      fetchJSON(`src/js/constants/projects${suffix}.json`),
      fetchJSON(`src/js/constants/articles.json`),
      fetchJSON(`src/js/constants/articles_ar.json`),
      fetchJSON(`src/js/constants/journey${suffix}.json`),
    ]);

  // Sort articles by date descending (newest first)
  articles_en.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : 0;
    const dateB = b.date ? new Date(b.date) : 0;
    return dateB - dateA;
  });
  articles_ar.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : 0;
    const dateB = b.date ? new Date(b.date) : 0;
    return dateB - dateA;
  });

  // Resolve featured reference from profile config
  const currentArticles = savedLang === 'ar' ? articles_ar : articles_en;
  const allCollections = { experience, education, certifications, projects, articles: currentArticles };
  const featured = resolveFeatured(profile.featured, allCollections, assets);

  // Build primary phone convenience fields
  const primaryPhone = profile.phones?.find(p => p.primary) || profile.phones?.[0];
  const primaryFullNumber = primaryPhone
    ? `${primaryPhone.countryCode}${primaryPhone.number}`
    : '';

  // Resolve asset keys in certifications
  const resolvedCertifications = certifications.map(cert => ({
    ...cert,
    pdfUrl: cert.pdfUrl ? resolveAssetKey(cert.pdfUrl, assets) : undefined
  }));

  // Resolve asset keys in education
  const resolvedEducation = education.map(edu => ({
    ...edu,
    certificate: edu.certificate ? resolveAssetKey(edu.certificate, assets) : undefined
  }));

  // Resolve asset keys in projects
  const resolvedProjects = projects.map(proj => ({
    ...proj,
    links: (proj.links || []).map(link => ({
      ...link,
      url: resolveAssetKey(link.url, assets)
    }))
  }));

  // Assemble unified data object (backward compatible with old data.js shape)
  data = {
    // Profile fields (flat)
    name: profile.name,
    title: profile.title,
    nationality: profile.nationality,
    address: profile.address,
    qualification: profile.qualification,
    email: profile.email,
    tagline: profile.tagline,
    summary: profile.summary,
    about: profile.about || profile.summary,
    ui: profile.ui || {},
    ui_extras: profile.ui_extras || {},
    mobile: primaryFullNumber,
    linkedin: profile.social?.linkedin?.replace('https://', '') || '',
    github: profile.social?.github?.replace('https://', '') || '',

    // Multi-phone support
    phones: profile.phones || [],

    // Contact (backward compat shape)
    contact: {
      email: profile.email,
      phone: primaryFullNumber,
      phones: profile.phones || [],
      location: profile.nationality,
      website: profile.social?.website || '',
      linkedin: profile.social?.linkedin || '',
      github: profile.social?.github || '',
      twitter: profile.social?.x || '',
      discord: profile.social?.discord || '',
      medium: profile.social?.medium || '',
      reddit: profile.social?.reddit || '',
    },

    // Social links
    social: profile.social || {},

    // Assets (All resolved to absolute paths)
    assets: resolveAllAssetPaths(assets),
    avatar: resolvePath(assets.avatar),
    cvUrl: resolvePath(assets.cv),
    resumeUrl: resolvePath(assets.cv),
    vCardUrl: resolvePath(assets.vcard),
    graduationCertificate: resolvePath(assets.graduation_certificate),

    // Data collections
    experience,
    education: resolvedEducation,
    certifications: resolvedCertifications,
    technicalSkills: extractSkillNames(skills.technicalSkills),
    technicalSkillsFull: skills.technicalSkills,
    personalSkills: skills.personalSkills || [],
    personalSkillsFull: skills.personalSkills || [],
    projects: resolvedProjects,
    articles: savedLang === 'ar' ? articles_ar : articles_en,
    articles_en,
    articles_ar,
    professionalJourney: journey,
    featured: featured ? [featured] : [],
  };

  return data;
}

/**
 * Get the loaded data object.
 * @returns {Object}
 */
export function getData() {
  if (!data) throw new Error('Data not loaded yet. Call loadData() first.');
  return data;
}

/**
 * Get an asset path by key. Supports dot notation: getAsset('logos.lifeco')
 * @param {string} key - Asset key or dot-separated path
 * @returns {string} The resolved asset path, or the key itself as fallback
 */
export function getAsset(key) {
  if (!data?.assets) {
    return key;
  }
  return resolveAssetKey(key, data.assets);
}

// --- Internal helpers ---

async function fetchJSON(url) {
  try {
    const res = await fetch(resolvePath(url));
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.json();
  } catch (err) {
    // Return empty array for collection files, empty object for others
    const arrayFiles = ['articles', 'projects', 'experience', 'education', 'certifications'];
    const isArrayFile = arrayFiles.some(f => url.includes(f));
    return isArrayFile ? [] : {};
  }
}

function resolveFeatured(config, collections, assets) {
  if (!config || !config.source) return null;
  const source = collections[config.source];
  if (!source || !Array.isArray(source)) return null;

  const item = source[config.id];
  if (!item) return null;

  const overrides = config.overrides || {};

  // Resolve image asset key if present
  if (overrides.image) {
    overrides.image = resolveAssetKey(overrides.image, assets);
  }

  return {
    ...item,
    _source: config.source,
    type: config.source === 'education' ? 'achievement'
      : config.source === 'projects' ? 'project'
        : config.source === 'articles' ? 'article'
          : 'achievement',
    ...overrides
  };
}

function resolveAssetKey(key, assets) {
  if (!key || typeof key !== 'string') return key;

  // If it looks like a local file path, resolve it to absolute
  if (key.startsWith('src/') || key.startsWith('./')) {
    return resolvePath(key);
  }
  
  if (key.startsWith('http') || key.startsWith('/') || key.startsWith('data:')) {
    return key;
  }

  // Try direct top-level key
  if (assets[key]) return resolvePath(assets[key]);

  // Try dot notation
  const parts = key.split('.');
  let value = assets;
  for (const p of parts) {
    value = value?.[p];
    if (value === undefined) return key; // Not found, return original key
  }
  return (typeof value === 'string') ? resolvePath(value) : (value || key);
}

/**
 * Extract just the name strings from skill objects for backward compatibility.
 * The full objects with proficiency are available via technicalSkillsFull.
 */
function extractSkillNames(techSkills) {
  if (!techSkills) return {};
  const result = {};
  for (const [category, items] of Object.entries(techSkills)) {
    if (Array.isArray(items)) {
      result[category] = items.map(item =>
        typeof item === 'string' ? item : item.name
      );
    }
  }
  return result;
}

/**
 * Recursively resolves all relative paths in an assets object to absolute ones.
 */
function resolveAllAssetPaths(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result = Array.isArray(obj) ? [] : {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (value.startsWith('src/') || value.startsWith('./')) {
        result[key] = resolvePath(value);
      } else {
        result[key] = value;
      }
    } else if (typeof value === 'object') {
      result[key] = resolveAllAssetPaths(value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}
