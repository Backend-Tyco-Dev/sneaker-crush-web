/**
 * Ensures an image URL is absolute and safe for img src / CSS url().
 * - Adds https:// if URL has no protocol (so it isn't requested relative to the site).
 * - Encodes only ', (, ) so the URL doesn't break inside CSS url() or HTML attributes.
 * - Does NOT run encodeURI() on the whole URL: many CDN URLs already contain %2F etc.;
 *   encoding them again turns %2F into %252F and causes 404s (e.g. images.complex.com).
 */
export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let s = url.trim();
  if (!s) return '';
  if (!/^(https?:|\/\/)/i.test(s)) {
    s = 'https://' + s.replace(/^\/+/, '');
  }
  // Only encode chars that break CSS url() / HTML; leave existing %XX (e.g. %2F) unchanged
  return s.replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}
