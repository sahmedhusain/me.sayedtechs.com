/**
 * Path Utilities
 * 
 * Provides centralized logic for computing base paths and resolving
 * resource URLs correctly regardless of the current route or deployment depth.
 */

/**
 * Computes the base path of the application.
 * The custom domain serves the app from the site root.
 */
export function getBasePath() {
  const isLocal = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.');

  return '';
}

const BASE_PATH = getBasePath();

/**
 * Resolves a relative path to an absolute path from the root of the app.
 * @param {string} path - Relative path (e.g., 'src/assets/logo.png')
 * @returns {string} Resolved path (e.g., '/src/assets/logo.png')
 */
export function resolvePath(path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) {
    return path;
  }

  const cleanPath = path.startsWith('./') ? path.slice(2) : path;
  return `${BASE_PATH}/${cleanPath}`.replace(/\/+/g, '/');
}
