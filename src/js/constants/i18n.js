/**
 * i18n — Internationalization helper
 * 
 * Loads locale JSON files and provides a t() function
 * for translating UI strings throughout the application.
 */

let currentLocale = 'en';
let strings = {};
let loaded = false;

let dualStrings = { en: {}, ar: {} };

export async function loadLocale(locale) {
  try {
    // Always load both for cross-language search support
    const [enRes, arRes] = await Promise.all([
      fetch(`src/js/constants/ui/en.json`),
      fetch(`src/js/constants/ui/ar.json`)
    ]);
    
    dualStrings.en = await enRes.json();
    dualStrings.ar = await arRes.json();

    if (locale === 'en') {
      strings = dualStrings.en;
    } else {
      // Deep merge locale strings over English as base
      strings = mergeDeep(JSON.parse(JSON.stringify(dualStrings.en)), dualStrings[locale] || {});
    }

    currentLocale = locale;
    loaded = true;
  } catch (err) {
    loaded = false;
  }
}

/**
 * Get a translation specifically for a given locale (en or ar).
 */
export function tDual(key, locale) {
  const keys = key.split('.');
  let value = dualStrings[locale];
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return null;
  }
  return value;
}

function mergeDeep(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = sourceValue;
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

/**
 * Translate a key path to its localized string.
 * Supports dot notation: t('nav.about') → "About"
 * Supports placeholder replacement: t('time.daysAgo', { n: 3 }) → "3 days ago"
 * 
 * @param {string} key - Dot-separated key path
 * @param {Object} replacements - Key-value pairs for placeholder replacement
 * @returns {string|Array|Object} The translated value, or the key itself as fallback
 */
export function t(key, replacements = {}) {
  if (!loaded) {
    return key;
  }

  const keys = key.split('.');
  let value = strings;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key; // fallback to key path
  }

  // Replace {placeholder} tokens in strings
  if (typeof value === 'string') {
    return Object.entries(replacements).reduce(
      (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
      value
    );
  }

  return value;
}

/**
 * Get the current active locale code.
 * @returns {string}
 */
export function getCurrentLocale() {
  return currentLocale;
}

/**
 * Check if the current locale is RTL (right-to-left).
 * @returns {boolean}
 */
export function isRTL() {
  return ['ar', 'he', 'fa', 'ur'].includes(currentLocale);
}
