/**
 * Path Utilities
 * 
 * Provides centralized logic for computing base paths and resolving
 * resource URLs correctly regardless of the current route or deployment depth.
 */

/**
 * Computes the base path of the application.
 * e.g., "" for localhost or "/me" for GitHub Pages.
 */
export function getBasePath() {
  const isLocal = window.location.hostname === 'localhost' || 
                 window.location.hostname === '127.0.0.1' || 
                 window.location.hostname.startsWith('192.168.');
  
  // If local, use root. If on GitHub Pages, use the repository name segment.
  if (isLocal) return '';

  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  // For this specific portfolio, the first segment is usually the repo name 'me'
  if (segments[0] === 'me') return '/me';
  
  return '';
}

const BASE_PATH = getBasePath();

/**
 * Resolves a relative path to an absolute path from the root of the app.
 * @param {string} path - Relative path (e.g., 'src/assets/logo.png')
 * @returns {string} Resolved path (e.g., '/me/src/assets/logo.png')
 */
export function resolvePath(path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) {
    return path;
  }
  
  const cleanPath = path.startsWith('./') ? path.slice(2) : path;
  return `${BASE_PATH}/${cleanPath}`.replace(/\/+/g, '/');
}
