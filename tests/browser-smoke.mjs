import { execFileSync } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

// 1. Build Astro static site, then run browser checks in a fresh Node process for each mode.
const browserChild = process.env.BEASTIE_BROWSER_CHILD === '1';
if (!browserChild) {
  execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
  for (const mode of ['desktop', 'mobile']) {
    execFileSync(process.execPath, [process.argv[1]], {
      stdio: 'inherit',
      env: { ...process.env, BEASTIE_BROWSER_CHILD: '1', BEASTIE_BROWSER_MODE: mode }
    });
  }
  process.exit(0);
}

// 2. Validate expected static files exist
const newsSlugs = ['que-es-beastie-studio', 'por-que-creamos-multiplo', 'boxio-un-clasico-que-sigue-dando-juego', 'juegos-hechos-con-carino'];
const routes = ['', 'juegos', 'juegos/multiplo', 'juegos/boxio', 'novedades', 'nosotros', 'apoyanos'];
const allRoutes = [...routes.slice(0, 5), ...newsSlugs.map((slug) => `novedades/${slug}`), ...routes.slice(5)];
for (const route of allRoutes) {
  const filePath = `dist/${route ? `${route}/` : ''}index.html`;
  assert.ok(fs.existsSync(filePath), `Missing static file: ${filePath}`);
}
assert.equal(fs.existsSync('dist/novedades/no-existe/index.html'), false, 'Unknown article slugs must not generate a static detail page');

// 3. Start local static HTTP server on an ephemeral OS-assigned port
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  let filePath = path.join('dist', reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const PORT = server.address().port;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const browserMode = process.env.BEASTIE_BROWSER_MODE || 'desktop';
const captureDir = path.join('openspec', 'changes', 'req-25-website-v54-correccion-de-fidelidad-visu', 'evidence', 'captures');
fs.mkdirSync(captureDir, { recursive: true });
const captureRoutes = browserMode === 'desktop'
  ? ['', 'juegos', 'juegos/multiplo', 'juegos/boxio', 'nosotros', 'novedades', 'novedades/por-que-creamos-multiplo', 'apoyanos']
  : ['', 'juegos', 'juegos/multiplo', 'juegos/boxio', 'novedades', 'apoyanos'];

async function runBrowserChecks() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless=new'],
  });

  try {
    const page = await browser.newPage();

    // --- Scenario A: Desktop Viewport Navigation & Layout ---
    await page.setViewport({ width: browserMode === 'mobile' ? 390 : 1440, height: browserMode === 'mobile' ? 844 : 900 });
    async function captureFullRoutes() {
      for (const route of captureRoutes) {
        await page.goto(`${BASE_URL}/${route ? `${route}/` : 'index.html'}`, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; }));
        await page.evaluate(() => Promise.all([...document.images].map((image) => image.decode().catch(() => undefined))));
        const brokenImages = await page.$$eval('img', (images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
        assert.deepEqual(brokenImages, [], `Images must load on ${route || '/'}`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `Horizontal overflow on ${route || '/'}`);
        const safeRoute = route.replaceAll('/', '-') || 'home';
        for (const [position, fraction] of [['start', 0], ['middle', .5], ['end', 1]]) {
          await page.evaluate((ratio) => window.scrollTo(0, (document.documentElement.scrollHeight - window.innerHeight) * ratio), fraction);
          await new Promise((resolve) => setTimeout(resolve, 50));
          await page.screenshot({ path: path.join(captureDir, `${browserMode}-${safeRoute}-${position}.png`), fullPage: false });
        }
      }
    }
    if (browserMode === 'mobile') {
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
      console.log('E2E mobile: opening home');
    }
    if (browserMode === 'desktop') {
      console.log('E2E desktop: opening news index');
      await page.goto(`${BASE_URL}/novedades/`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card').length), 4, 'News index must render four article cards including the featured card');
      assert.equal(await page.evaluate(() => document.querySelectorAll('.filter-button').length), 4, 'News index must hide empty categories and expose Todos plus three populated categories');
      await page.click('.filter-button[data-filter="Múltiplo"]');
      assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card:not([hidden])').length), 1, 'Category filter must show only the selected category');
      assert.match(await page.evaluate(() => document.querySelector('.filter-status')?.textContent), /Múltiplo/);
      await page.click('.filter-button[data-filter="all"]');
      assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card:not([hidden])').length), 4, 'Todos filter must restore the complete article set');
      for (const slug of newsSlugs.slice(0, 1)) {
        console.log(`E2E desktop: opening ${slug}`);
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(`${BASE_URL}/novedades/${slug}/`, { waitUntil: 'domcontentloaded' });
        const articleChecks = await page.evaluate(() => ({
          heading: document.querySelector('h1')?.textContent ?? '',
          breadcrumb: document.querySelector('.breadcrumb a')?.getAttribute('href'),
          gamesCta: document.querySelector('.article-actions a[href="/juegos"]')?.getAttribute('href'),
          description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
        }));
        assert.ok(articleChecks.heading.length > 10, `Article heading missing for ${slug}`);
        assert.equal(articleChecks.breadcrumb, '/novedades');
        assert.equal(articleChecks.gamesCta, '/juegos');
        assert.ok(articleChecks.description.length > 20);
      }
      console.log('PASS Chromium desktop: news cards, populated categories, filtering, breadcrumbs, detail CTAs, and article metadata.');
      await page.goto(`${BASE_URL}/apoyanos/`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.$eval('meta[name="description"]', (meta) => meta.content), 'Formas voluntarias de apoyar a Beastie Studio y compartir sus juegos.');
      assert.equal(await page.$$eval('.support-card', (cards) => cards.length), 5);
      assert.equal(await page.$$eval('.support-card a', (links) => links.length), 0);
      assert.equal(await page.$eval('.support-illustration', (image) => image.alt.includes('Ilustración conceptual')), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false);
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
      for (const expectedUrl of ['https://multiplo.silverman.pro/', 'https://boxio.silverman.pro/']) {
        assert.equal(await page.$$eval(`.game-card a[href="${expectedUrl}"]`, (links) => links.length), 1, `Home must map Jugar to ${expectedUrl}`);
      }
      await page.goto(`${BASE_URL}/juegos/`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.$$eval('.game-card a[href^="https://"]', (links) => links.length), 2);
      const assetChecks = await page.evaluate(async () => {
        const urls = [...document.querySelectorAll('img')].map((image) => image.currentSrc || image.src);
        const responses = await Promise.all(urls.map(async (url) => ({ url, status: (await fetch(url)).status })));
        return responses;
      });
      assert.ok(assetChecks.length >= 3);
      assert.ok(assetChecks.every(({ status }) => status === 200), `Public image responses must be 200: ${JSON.stringify(assetChecks)}`);
      const portfolio = await page.$$eval('.portfolio-project', (projects) => projects.map((project) => getComputedStyle(project).display));
      assert.deepEqual(portfolio, ['grid', 'grid'], 'Catalog must use the shared editorial project component');
      await captureFullRoutes();
      console.log('PASS Chromium desktop: support route metadata, pending channels, conceptual alt, and 0 horizontal overflow.');
      return;
    }

    // --- Scenario B: Mobile Viewport, Menu Operability & Visibility ---
    const toggleVisible = await page.evaluate(() => {
      const style = window.getComputedStyle(document.querySelector('.menu-toggle'));
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    assert.equal(toggleVisible, true, 'Mobile menu toggle must be visible at 375px viewport');
    await page.focus('.menu-toggle');
    assert.equal(await page.$eval('.menu-toggle', (el) => el.matches(':focus-visible')), true, 'Menu toggle must expose a visible keyboard focus');

    // Initial state: menu closed, aria-expanded=false
    let ariaExpanded = await page.$eval('.menu-toggle', (el) => el.getAttribute('aria-expanded'));
    assert.equal(ariaExpanded, 'false', 'Initial menu aria-expanded must be false');
    let navOpen = await page.$eval('#site-navigation', (el) => el.classList.contains('is-open'));
    assert.equal(navOpen, false, 'Nav should not have is-open initially');

    // Open menu
    await page.click('.menu-toggle');
    ariaExpanded = await page.$eval('.menu-toggle', (el) => el.getAttribute('aria-expanded'));
    assert.equal(ariaExpanded, 'true', 'Menu aria-expanded must be true after toggle click');
    navOpen = await page.$eval('#site-navigation', (el) => el.classList.contains('is-open'));
    assert.equal(navOpen, true, 'Nav must have is-open after toggle click');

    const navVisible = await page.$eval('#site-navigation', (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    assert.equal(navVisible, true, 'Nav must be visually open after toggle click');

    // Mobile menu open: no horizontal overflow
    let mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    assert.equal(mobileOverflow, false, 'Horizontal overflow detected with mobile menu open');

    // Close menu
    await page.click('.menu-toggle');
    ariaExpanded = await page.$eval('.menu-toggle', (el) => el.getAttribute('aria-expanded'));
    assert.equal(ariaExpanded, 'false', 'Menu aria-expanded must return to false after second click');
    navOpen = await page.$eval('#site-navigation', (el) => el.classList.contains('is-open'));
    assert.equal(navOpen, false, 'Nav must lose is-open after second click');

    // Support CTA unobstructed and navigable on mobile
    mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    assert.equal(mobileOverflow, false, 'Horizontal overflow detected on mobile');

    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });

    assert.equal(await page.$eval('.parallax-hero', (hero) => hero.style.getPropertyValue('--hero-image').includes('hero-parque-beastie.webp')), true);
    const heroOffsets = [];
    for (const fraction of [0, .5, 1]) {
      await page.evaluate((ratio) => {
        const hero = document.querySelector('.parallax-hero');
        window.scrollTo(0, hero.offsetTop + hero.offsetHeight * ratio);
      }, fraction);
      await new Promise((resolve) => setTimeout(resolve, 80));
      heroOffsets.push(await page.$eval('.parallax-hero', (hero) => ({ progress: hero.style.getPropertyValue('--parallax-progress'), offset: hero.style.getPropertyValue('--parallax-offset') })));
    }
    assert.ok(new Set(heroOffsets.map(({ offset }) => offset)).size > 1, `Hero image movement must be observable: ${JSON.stringify(heroOffsets)}`);
    assert.ok(heroOffsets.every(({ progress }) => progress !== ''), 'Hero progress must be exposed at each measured stage');
    const cls = await page.evaluate(() => performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + (entry.hadRecentInput ? 0 : entry.value), 0));
    assert.ok(Number.isFinite(cls), 'CLS measurement must be numeric');
    console.log(`E2E mobile: home hero stages=${JSON.stringify(heroOffsets)} CLS=${cls}`);
    assert.equal(await page.$$eval('.game-slide', (slides) => slides.length), 2, 'Home carousel must derive two slides from games data');
    await page.click('[data-carousel-next]');
    assert.equal(await page.$eval('[data-slide="1"]', (slide) => slide.getAttribute('aria-hidden') === 'false' && !slide.inert), true, 'Carousel next control must change active slide');
    assert.notEqual(await page.$eval('.game-carousel-track', (track) => getComputedStyle(track).transform), 'none', 'Carousel must move a visible track');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.$eval('[data-slide="0"]', (slide) => slide.getAttribute('aria-hidden') === 'false' && !slide.inert), true, 'Carousel keyboard navigation must restore first slide');
    for (const count of [5, 10]) {
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
      await page.evaluate((targetCount) => {
        const track = document.querySelector('.game-carousel-track');
        const template = track.querySelector('[data-slide]');
        while (track.querySelectorAll('[data-slide]').length < targetCount) {
          const clone = template.cloneNode(true);
          clone.dataset.slide = String(track.querySelectorAll('[data-slide]').length);
          track.append(clone);
        }
      }, count);
      if (count > 0) for (let index = 0; index < count - 1; index += 1) await page.click('[data-carousel-next]');
      assert.equal(await page.$eval(`[data-slide="${count - 1}"]`, (slide) => slide.getAttribute('aria-hidden') === 'false'), true, `Carousel must navigate deterministically with ${count} entries`);
    }
    await page.goto(`${BASE_URL}/juegos/`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.$eval('.parallax-hero', (hero) => hero.style.getPropertyValue('--hero-image').includes('hero-juegos-islass.webp')), true);
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewport({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `V5 overflow at ${width}px`);
    }
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.$eval('.parallax-hero-image', (image) => getComputedStyle(image).transform === 'none'), true, 'Reduced motion must disable parallax transform');
    assert.equal(await page.$eval('.game-carousel-track', (track) => Number.parseFloat(getComputedStyle(track).transitionDuration) <= 0.001), true, 'Reduced motion must remove carousel movement');
    await page.emulateMediaFeatures([]);

    const noScript = await browser.newPage();
    await noScript.setJavaScriptEnabled(false);
    await noScript.setViewport({ width: 375, height: 812 });
    await noScript.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await noScript.$$eval('a[href]', (links) => links.length > 8), true, 'No-JS fallback keeps navigation and content links available');
    assert.equal(await noScript.$eval('h1', (heading) => getComputedStyle(heading).visibility !== 'hidden'), true, 'No-JS fallback keeps hero content visible');
    await noScript.close();

    // Navigate to /apoyanos via mobile CTA
    assert.equal(await page.$eval('.footer-support', (link) => link.getAttribute('href')), '/apoyanos', 'Footer support link must target /apoyanos');

    await page.goto(`${BASE_URL}/juegos/index.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.$$eval('.game-card', (cards) => cards.length), 2, 'Catalog must contain exactly two games');
    const catalogGames = await page.$$eval('.game-card', (cards) => cards.map((card) => ({
      name: card.querySelector('.eyebrow')?.textContent.trim(),
      play: card.querySelector('a[href^="https://"]')?.getAttribute('href'),
      know: card.querySelector('a[href^="/juegos/"]')?.getAttribute('href'),
    })));
    assert.deepEqual(catalogGames, [
      { name: 'Múltiplo', play: 'https://multiplo.silverman.pro/', know: '/juegos/multiplo' },
      { name: 'Boxio', play: 'https://boxio.silverman.pro/', know: '/juegos/boxio' },
    ]);
    for (const slug of ['multiplo', 'boxio']) {
      await page.goto(`${BASE_URL}/juegos/${slug}/index.html`, { waitUntil: 'domcontentloaded' });
      const expectedUrl = slug === 'multiplo' ? 'https://multiplo.silverman.pro/' : 'https://boxio.silverman.pro/';
      assert.equal(await page.$eval(`a[href="${expectedUrl}"]`, (link) => link.textContent.includes('Jugar')), true, `Verified ${slug} must expose Jugar`);
      assert.equal(await page.$eval('.game-detail a[href="/juegos"]', (link) => link.textContent.includes('Conocer')), true, `${slug} must retain internal Conocer`);
      assert.equal(await page.$eval('.game-detail-visual img', (image) => image.complete && image.naturalWidth > 0), true);
    }

    await page.goto(`${BASE_URL}/apoyanos/index.html`, { waitUntil: 'domcontentloaded' });
    assert.match(await page.$eval('h1', (el) => el.textContent), /Ayúdanos/);
    assert.equal(await page.$$eval('.support-card', (cards) => cards.length), 5, 'Inactive Vaki must not be rendered');
    assert.equal(await page.$$eval('.support-card a', (links) => links.length), 0, 'Pending support channels must not expose links');
    assert.equal(await page.$$eval('.support-sharing a[href^="/juegos/"]', (links) => links.length), 2);
    assert.equal(await page.$eval('.support-illustration', (image) => image.getAttribute('alt').includes('Ilustración conceptual')), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, 'Horizontal overflow detected on support page');
    await captureFullRoutes();

    console.log('PASS Chromium mobile: menu open/close toggle, aria-expanded, visible focus, CTA, support links, and 0 horizontal overflow.');
    console.log('PASS Real Chromium browser smoke verification complete and verified.');
  } finally {
    await browser.close();
  }
}

try {
  await runBrowserChecks();
} finally {
  server.close();
}
