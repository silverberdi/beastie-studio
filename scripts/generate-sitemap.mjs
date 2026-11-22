import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.PUBLIC_SITE_URL?.trim()?.replace(/\/$/, '');
const validBaseUrl = baseUrl && /^https:\/\/[^\s/]+$/.test(baseUrl);

if (!validBaseUrl) {
  for (const file of ['dist/sitemap.xml', 'dist/sitemap-index.xml']) if (fs.existsSync(file)) fs.rmSync(file);
  console.log('Sitemap pendiente: PUBLIC_SITE_URL no está configurada como dominio HTTPS verificado.');
  process.exit(0);
}

const routes = ['', 'juegos', 'juegos/multiplo', 'juegos/boxio', 'novedades', 'nosotros', 'apoyanos'];
const newsDir = path.join('dist', 'novedades');
for (const entry of fs.existsSync(newsDir) ? fs.readdirSync(newsDir, { withFileTypes: true }) : []) if (entry.isDirectory() && fs.existsSync(path.join(newsDir, entry.name, 'index.html'))) routes.push(`novedades/${entry.name}`);
const urls = routes.map((route) => `  <url><loc>${baseUrl}/${route}</loc></url>`).join('\n');
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`Sitemap generado para ${routes.length} rutas con PUBLIC_SITE_URL.`);
