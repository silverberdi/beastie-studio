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

async function runBrowserChecks() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless=new'],
  });

  try {
    const page = await browser.newPage();

    // --- Scenario A: Desktop Viewport Navigation & Layout ---
    await page.setViewport({ width: browserMode === 'mobile' ? 375 : 1280, height: browserMode === 'mobile' ? 667 : 800 });
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
    const ctaVisibleMobile = await page.$eval('.support-cta', (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    assert.equal(ctaVisibleMobile, true, 'Support CTA must remain visible and accessible on mobile');

    mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    assert.equal(mobileOverflow, false, 'Horizontal overflow detected on mobile with floating CTA');

    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });

    // Navigate to /apoyanos via mobile CTA
    assert.equal(await page.$eval('.support-cta', (link) => link.getAttribute('href')), '/apoyanos', 'Mobile CTA must target /apoyanos');

    await page.goto(`${BASE_URL}/juegos/index.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.$$eval('.game-card', (cards) => cards.length), 2, 'Catalog must contain exactly two games');
    assert.equal(await page.$$eval('a', (links) => links.some((link) => link.textContent.includes('Jugar'))), false, 'Catalog must not expose unverified Jugar links');
    for (const slug of ['multiplo', 'boxio']) {
      await page.goto(`${BASE_URL}/juegos/${slug}/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.$$eval('a', (links) => links.some((link) => link.textContent.includes('Jugar'))), false, `Unverified ${slug} must not expose Jugar`);
      assert.match(await page.$eval('.conceptual-art', (el) => el.getAttribute('aria-label')), /Ilustración conceptual/);
    }

    await page.goto(`${BASE_URL}/apoyanos/index.html`, { waitUntil: 'domcontentloaded' });
    assert.match(await page.$eval('h1', (el) => el.textContent), /Ayúdanos/);
    assert.equal(await page.$$eval('.support-card', (cards) => cards.length), 5, 'Inactive Vaki must not be rendered');
    assert.equal(await page.$$eval('.support-card a', (links) => links.length), 0, 'Pending support channels must not expose links');
    assert.equal(await page.$$eval('.support-sharing a[href^="/juegos/"]', (links) => links.length), 2);
    assert.equal(await page.$eval('.support-illustration', (image) => image.getAttribute('alt').includes('Ilustración conceptual')), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, 'Horizontal overflow detected on support page');

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
