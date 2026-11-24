const siteUrl = 'https://beastie-studio.silverman.pro';

export function GET({ site }) {
  const configured = site?.origin === siteUrl && Boolean(import.meta.env.PUBLIC_SITE_URL);
  return new Response(`User-agent: *\nAllow: /\n${configured ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
