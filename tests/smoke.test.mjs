import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const routes = ['', 'juegos', 'novedades', 'nosotros', 'apoyanos'];
test('approved brand assets match manifest', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/assets/brand/manifest.json')));
  for (const [file, data] of Object.entries(manifest.files)) {
    const bytes = fs.readFileSync(path.join(root, 'public', file.includes('beastie-') ? `assets/brand/${file}` : file));
    assert.equal(bytes.length, data.bytes, file);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), data.sha256, file);
  }
});
test('all base pages use shared layout and local routes', () => {
  for (const route of routes) {
    const file = route ? `src/pages/${route}.astro` : 'src/pages/index.astro';
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(source, /BaseLayout/);
    if (route === 'apoyanos') assert.match(source, /visibleSupportChannels/);
  }
  const layout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
  for (const route of ['/', '/juegos', '/novedades', '/nosotros', '/apoyanos']) assert.match(layout, new RegExp(`href: '${route.replace('/', '\\/')}'`));
  assert.match(layout, /aria-expanded/);
  assert.match(layout, /Juegos hechos con cariño/);
});

test('shared visual classes have imported global rules', () => {
  const layout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
  const globalStyles = fs.readFileSync(path.join(root, 'src/styles/global.css'), 'utf8');
  assert.match(layout, /import ['"]\.\.\/styles\/global\.css['"]/);
  for (const selector of ['hero-grid', 'hero-accent', 'hero-art', 'pills', 'pill', 'section-warm', 'principles', 'principle-card', 'news-home-grid', 'news-card-art']) {
    assert.match(globalStyles, new RegExp(`\\.${selector}\\s*\\{`), `Missing global rule for .${selector}`);
  }
});

test('support channels are declarative and pending channels are not actionable', async () => {
  const support = await import('../src/data/support.js');
  assert.deepEqual(support.visibleSupportChannels().map((channel) => channel.name), ['Patreon', 'Ko-fi', 'PayPal', 'Nequi', 'Daviplata']);
  assert.equal(support.visibleSupportChannels().some(support.isActionable), false);
  const enabled = { name: 'Test', status: 'verificado', destinationType: 'url', approvedValue: 'https://example.test/support' };
  assert.equal(support.isActionable(enabled), true);
  assert.deepEqual(support.visibleSupportChannels([enabled]), [enabled]);
  const page = fs.readFileSync(path.join(root, 'src/pages/apoyanos.astro'), 'utf8');
  assert.match(page, /Tu aporte es completamente voluntario/);
  assert.match(page, /También puedes ayudar compartiendo/);
  assert.match(page, /assets\/illustrations\/illustration-apoyanos\.png/);
  assert.doesNotMatch(page, /https?:\/\/|href=["']#/);
});

test('publication configuration never creates a fictional sitemap domain', () => {
  const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'scripts/generate-sitemap.mjs'), 'utf8');
  assert.match(config, /PUBLIC_SITE_URL/);
  assert.match(config, /https:/);
  assert.match(sitemap, /Sitemap pendiente/);
  assert.match(sitemap, /dist\/sitemap\.xml/);
  assert.doesNotMatch(sitemap, /beastie.*\.com/i);
});
test('catalog data maps each game to one canonical public URL', async () => {
  const { games } = await import('../src/data/games.js');
  assert.equal(games.length, 2);
  assert.deepEqual(Object.fromEntries(games.map(({ slug, publicUrl }) => [slug, publicUrl])), {
    multiplo: 'https://multiplo.silverman.pro/',
    boxio: 'https://boxio.silverman.pro/',
  });
  assert.equal(new Set(games.map((game) => game.publicUrl)).size, games.length);
  assert.ok(games.every((game) => new URL(game.publicUrl).protocol === 'https:'));
  assert.deepEqual(games.map(({ slug, primaryScreenshot }) => [slug, primaryScreenshot]), [
    ['multiplo', '/assets/v5/screenshots/multiplo/multiplo-pregunta-1.webp'],
    ['boxio', '/assets/v5/screenshots/boxio/boxio-partida-local.webp'],
  ]);
  assert.ok(games.every((game) => game.gallery?.length));
  assert.deepEqual(games.map(({ slug, composition, compositionOrientation }) => [slug, composition, compositionOrientation]), [
    ['multiplo', '/assets/v5/compositions/multiplo-composicion.webp', 'portrait'],
    ['boxio', '/assets/v5/compositions/boxio-composicion.webp', 'landscape'],
  ]);
  assert.ok(games.every((game) => game.compositionWidth === 1600 && game.compositionHeight === 900));
});
test('game surfaces derive external Jugar and internal Conocer links from the registry', () => {
  const card = fs.readFileSync(path.join(root, 'src/components/GameCard.astro'), 'utf8');
  const detail = fs.readFileSync(path.join(root, 'src/components/GameDetail.astro'), 'utf8');
  assert.match(card, /game\.publicUrl/);
  assert.match(card, /href=\{`\/juegos\/\$\{game\.slug\}`\}/);
  assert.match(detail, /href=\{game\.publicUrl\}/);
  assert.match(detail, /href="\/juegos"/);
  assert.doesNotMatch(card, /multiplo\.silverman|boxio\.silverman/);
  assert.doesNotMatch(detail, /multiplo\.silverman|boxio\.silverman/);
  assert.doesNotMatch(card, /illustration-.*concept\.png/);
  assert.doesNotMatch(detail, /Ilustración conceptual/);
  assert.match(card, /game\.composition/);
  const styles = fs.readFileSync(path.join(root, 'src/styles/global.css'), 'utf8');
  assert.match(styles, /\.game-card-visual img[^}]*object-fit:contain/);
});

test('V5 heroes and screenshot manifest are copied without changing immutable assets', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/design/references/v5/assets/screenshots/manifest.json')));
  const assets = [
    ['assets/v5/hero-parque-beastie.webp', '106eacf7b7b937a47135aa7d67fa4c666546a87534c3ad850f23f26d30a84678'],
    ['assets/v5/hero-juegos-islass.webp', '3b9ca7e217a431e3bd9608b0e8b2153cdb4c01f5837b634938a8a48c37ace6b4'],
    ['assets/v5/compositions/multiplo-composicion.webp', '2255d7735b6186a0ab2260f15ac2908e26fe0604c3eeb6d69083fa9285ffc1f4'],
    ['assets/v5/compositions/boxio-composicion.webp', '3a36c353078cff9e52ae03268397a22b775c20dde91164415ff835c3df4655d8'],
  ];
  for (const [file, hash] of assets) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'public', file))).digest('hex'), hash, file);
  for (const game of Object.values(manifest.games)) for (const image of game) {
    const file = path.join(root, 'public/assets/v5/screenshots', image.file);
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), image.sha256, image.file);
  }
});

test('V5 pages use distinct heroes, accessible carousel, and no floating support action', () => {
  const home = fs.readFileSync(path.join(root, 'src/pages/index.astro'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'src/pages/juegos.astro'), 'utf8');
  const layout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
  const carousel = fs.readFileSync(path.join(root, 'src/components/GameCarousel.astro'), 'utf8');
  assert.match(home, /hero-parque-beastie\.webp/);
  assert.match(catalog, /hero-juegos-islass\.webp/);
  assert.match(carousel, /data-carousel-next/);
  assert.match(carousel, /touchstart/);
  assert.match(carousel, /ArrowRight/);
  assert.doesNotMatch(layout, /class="support-cta"/);
});
test('editorial routes replace foundation placeholders and use real internal CTAs', () => {
  for (const route of ['', 'juegos', 'nosotros']) {
    const file = route ? `src/pages/${route}.astro` : 'src/pages/index.astro';
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.doesNotMatch(source, /Placeholder/);
    assert.doesNotMatch(source, /href=["']#["']/);
  }
  const detail = fs.readFileSync(path.join(root, 'src/pages/juegos/[slug].astro'), 'utf8');
  assert.match(detail, /getStaticPaths/);
  assert.match(detail, /GameDetail/);
});

test('news collection contains the four approved articles and typed fields', () => {
  const contentRoot = path.join(root, 'src/content/news');
  const expected = new Map([
    ['que-es-beastie-studio', 'Beastie Studio'],
    ['por-que-creamos-multiplo', 'Múltiplo'],
    ['boxio-un-clasico-que-sigue-dando-juego', 'Boxio'],
    ['juegos-hechos-con-carino', 'Beastie Studio'],
  ]);
  const files = fs.readdirSync(contentRoot).filter((file) => file.endsWith('.md'));
  assert.equal(files.length, expected.size);
  for (const file of files) {
    const source = fs.readFileSync(path.join(contentRoot, file), 'utf8');
    const slug = source.match(/^slug:\s*(.+)$/m)?.[1];
    const category = source.match(/^category:\s*(.+)$/m)?.[1];
    assert.ok(slug && expected.has(slug), `unexpected article slug: ${slug}`);
    assert.equal(category, expected.get(slug));
    for (const field of ['title', 'summary', 'category']) assert.match(source, new RegExp(`^${field}:\\s*.+$`, 'm'));
    assert.doesNotMatch(source, /^(publishedAt|author|readingTime):/m);
    assert.match(source, /\n\S/);
  }
});

test('news schema validates required fields, safe slugs, categories, and local images', () => {
  const schema = fs.readFileSync(path.join(root, 'src/content.config.ts'), 'utf8');
  assert.match(schema, /slug: z\.string\(\)\.regex/);
  assert.match(schema, /title: z\.string\(\)\.min/);
  assert.match(schema, /summary: z\.string\(\)\.min/);
  assert.match(schema, /category: z\.enum/);
  assert.match(schema, /heroImage: z\.string\(\)\.startsWith\('\/'\)\.optional/);
  assert.match(schema, /publishedAt: z\.coerce\.date\(\)\.optional/);
});

test('news index and details use generated internal slugs and article metadata', () => {
  const index = fs.readFileSync(path.join(root, 'src/pages/novedades.astro'), 'utf8');
  const detail = fs.readFileSync(path.join(root, 'src/pages/novedades/[slug].astro'), 'utf8');
  assert.match(index, /getCollection\('news'\)/);
  assert.match(index, /data-filter/);
  assert.match(index, /aria-pressed/);
  assert.match(detail, /getStaticPaths/);
  assert.match(detail, /render\(article\)/);
  assert.match(detail, /href="\/juegos"/);
  assert.match(detail, /description=\{data\.summary\}/);
});

test('SEO model normalizes canonicals and omits unknown structured-data fields', async () => {
  const { canonicalUrl, cleanObject, pageSchema } = await import('../src/data/seo.js');
  assert.equal(canonicalUrl('/juegos/index.html/'), 'https://beastie-studio.silverman.pro/juegos');
  assert.equal(canonicalUrl('/'), 'https://beastie-studio.silverman.pro/');
  assert.doesNotThrow(() => canonicalUrl('/juegos', 'https://example.test'));
  assert.throws(() => canonicalUrl('/juegos', 'http://localhost:4321'));
  const schema = pageSchema({ pathname: '/juegos/multiplo', breadcrumbs: [{ name: 'Inicio', url: '/' }, { name: 'Múltiplo' }], entity: { '@type': 'VideoGame', name: 'Múltiplo', author: undefined } });
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@graph'][0]['@type'], 'BreadcrumbList');
  assert.equal('author' in schema['@graph'][1], false);
  assert.equal(cleanObject({ known: 'yes', unknown: undefined }).unknown, undefined);
});

test('generated publication output has one complete SEO and semantic contract per route', () => {
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(dist)) return;
  const newsSlugs = ['que-es-beastie-studio', 'por-que-creamos-multiplo', 'boxio-un-clasico-que-sigue-dando-juego', 'juegos-hechos-con-carino'];
  const generatedRoutes = ['', 'juegos', 'juegos/multiplo', 'juegos/boxio', 'novedades', ...newsSlugs.map((slug) => `novedades/${slug}`), 'nosotros', 'apoyanos'];
  for (const route of generatedRoutes) {
    const html = fs.readFileSync(path.join(dist, route, 'index.html'), 'utf8');
    for (const marker of ['lang="es"', 'name="description"', 'rel="canonical"', 'property="og:url"', 'property="og:image"', 'name="twitter:card"', 'application/ld+json']) assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${route || '/'} missing ${marker}`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${route || '/'} main count`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route || '/'} h1 count`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${route || '/'} title count`);
    assert.doesNotMatch(html, /localhost|file:\/\/|https:\/\/.*stitch/i);
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="noopener noreferrer"/);
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(match[0], /\balt="[^"]+"/);
      assert.match(match[0], /\bwidth="\d+"/);
      assert.match(match[0], /\bheight="\d+"/);
    }
  }
  const sitemapPath = path.join(dist, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    assert.equal((sitemap.match(/<loc>/g) || []).length, generatedRoutes.length);
    assert.doesNotMatch(sitemap, /index\.html|localhost|https:\/\/[^\s<]+\/\//);
  }
  const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
  if (fs.existsSync(sitemapPath)) assert.match(robots, /Sitemap: https:\/\/beastie-studio\.silverman\.pro\/sitemap\.xml/);
  else assert.doesNotMatch(robots, /Sitemap:\s*https?:\/\//, 'Unverified publication must not invent a sitemap URL');
});
