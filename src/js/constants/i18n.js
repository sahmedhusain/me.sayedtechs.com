/**
 * i18n — Internationalization helper
 * 
 * Loads locale JSON files and provides a t() function
 * for translating UI strings throughout the application.
 */

let currentLocale = 'en';
let strings = {};
let loaded = false;

/**
 * Load a locale file and set it as the active locale.
 * @param {string} locale - Locale code (e.g. 'en', 'ar')
 */
export async function loadLocale(locale) {
  try {
    const res = await fetch(`src/js/constants/ui/${locale}.json`);
    if (!res.ok) throw new Error(`Locale file not found: ${locale}`);
    strings = await res.json();
    currentLocale = locale;
    loaded = true;
  } catch (err) {
    console.warn(`Failed to load locale '${locale}', falling back to 'en':`, err);
    if (locale !== 'en') {
      await loadLocale('en');
    }
  }
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
    console.warn('i18n not loaded yet, returning key:', key);
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
