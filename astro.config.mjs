import { defineConfig } from 'astro/config';

const rawBaseUrl = process.env.PUBLIC_SITE_URL?.trim();
const verifiedBaseUrl = rawBaseUrl && /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/.test(rawBaseUrl) ? rawBaseUrl.replace(/\/$/, '') : undefined;

export default defineConfig({ output: 'static', ...(verifiedBaseUrl ? { site: verifiedBaseUrl } : {}) });
