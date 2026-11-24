import { defineConfig } from 'astro/config';

const rawBaseUrl = process.env.PUBLIC_SITE_URL?.trim();
const verifiedBaseUrl = rawBaseUrl && /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/.test(rawBaseUrl) ? rawBaseUrl.replace(/\/$/, '') : undefined;
const configuredSite = verifiedBaseUrl || 'https://beastie-studio.silverman.pro';

export default defineConfig({ output: 'static', site: configuredSite });
