const DEFAULT_SITE_URL = 'https://beastie-studio.silverman.pro';
const DEFAULT_SOCIAL_IMAGE = '/assets/brand/beastie-logo-approved.png';

export function normalizeSiteUrl(value = DEFAULT_SITE_URL) {
  const raw = String(value).trim().replace(/\/+$/, '');
  if (!/^https:\/\/[^\s/]+$/.test(raw)) throw new Error(`PUBLIC_SITE_URL must be an HTTPS origin: ${value}`);
  return raw;
}

export function canonicalUrl(pathname = '/', siteUrl = DEFAULT_SITE_URL) {
  const site = normalizeSiteUrl(siteUrl);
  const normalizedPath = String(pathname).replace(/^\/+/, '').replace(/\/index\.html\/?$/, '').replace(/\/+$/, '');
  const path = `/${normalizedPath}`.replace(/^\/$/, '');
  return `${site}${path || '/'}`;
}

export function cleanObject(value) {
  if (Array.isArray(value)) return value.map(cleanObject).filter((item) => item !== undefined);
  if (!value || typeof value !== 'object') return value === null || value === '' ? undefined : value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cleanObject(item)]).filter(([, item]) => item !== undefined));
}

export function pageSchema({ siteUrl = DEFAULT_SITE_URL, pathname = '/', breadcrumbs = [], entity }) {
  const graph = [];
  if (pathname === '/') {
    graph.push({ '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Beastie Studio', url: siteUrl, logo: `${siteUrl}${DEFAULT_SOCIAL_IMAGE}` });
    graph.push({ '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Beastie Studio', url: siteUrl, inLanguage: 'es' });
  }
  if (breadcrumbs.length) graph.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url ? canonicalUrl(crumb.url, siteUrl) : undefined })) });
  if (entity) graph.push(entity);
  return cleanObject({ '@context': 'https://schema.org', '@graph': graph });
}

export const defaultSocialImage = DEFAULT_SOCIAL_IMAGE;
