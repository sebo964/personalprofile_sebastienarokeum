/**
 * Single source of truth for the public site version (semver).
 * Bump this when you ship meaningful changes; keep in sync with git tags if you use them.
 */
window.__SITE_VERSION__ = '1.0.0';
try {
  document.documentElement.setAttribute('data-site-version', window.__SITE_VERSION__);
} catch (e) {}
