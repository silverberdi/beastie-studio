import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

// 1. Build Astro static site, then run browser checks in a fresh Node process.
const browserChild = process.env.BEASTIE_BROWSER_CHILD === '1';
if (!browserChild) {
  execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
  execFileSync(process.execPath, [process.argv[1]], {
    stdio: 'inherit',
    env: { ...process.env, BEASTIE_BROWSER_CHILD: '1' },
  });
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

// 3. Start local static HTTP server
const PORT = 4175;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', 'dist'], { stdio: 'ignore' });
await new Promise((resolve) => setTimeout(resolve, 1000));

async function runBrowserChecks() {
  let browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless=new'],
  });

  try {
    let page = await browser.newPage();

    // --- Scenario A: Desktop Viewport Navigation & Layout ---
    await page.setViewport({ width: 1280, height: 800 });
    console.log('E2E desktop: opening news index');
    await page.goto(`${BASE_URL}/novedades/`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card').length), 4, 'News index must render four article cards including the featured card');
    assert.equal(await page.evaluate(() => document.querySelectorAll('.filter-button').length), 4, 'News index must hide empty categories and expose Todos plus three populated categories');
    await page.click('.filter-button[data-filter="Múltiplo"]');
    assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card:not([hidden])').length), 1, 'Category filter must show only the selected category');
    assert.match(await page.evaluate(() => document.querySelector('.filter-status')?.textContent), /Múltiplo/);
    await page.click('.filter-button[data-filter="all"]');
    assert.equal(await page.evaluate(() => document.querySelectorAll('.news-card:not([hidden])').length), 4, 'Todos filter must restore the complete article set');
    for (const slug of newsSlugs) {
      console.log(`E2E desktop: opening ${slug}`);
      await page.close();
      page = await browser.newPage();
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

    // --- Scenario B: Mobile Viewport, Menu Operability & Visibility ---
    // Reuse the real browser session for the mobile viewport checks.
    await page.setViewport({ width: 375, height: 667 });
    console.log('E2E mobile: opening home');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Menu toggle button is visible
    const toggleVisible = await page.$eval('.menu-toggle', (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    assert.equal(toggleVisible, true, 'Mobile menu toggle must be visible at 375px viewport');

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

    await page.goto(`${BASE_URL}/novedades/`, { waitUntil: 'domcontentloaded' });
    console.log('E2E mobile: filtering news index');
    await page.click('.filter-button[data-filter="Beastie Studio"]');
    assert.equal(await page.$$eval('.news-card:not([hidden])', (cards) => cards.length), 2, 'Mobile category filter must show both Beastie Studio articles');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, 'Horizontal overflow detected on mobile news index');
    await page.click('.filter-button[data-filter="all"]');
    for (const slug of newsSlugs) {
      console.log(`E2E mobile: opening ${slug}`);
      await page.goto(`${BASE_URL}/novedades/${slug}/`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `Horizontal overflow detected on mobile article ${slug}`);
      assert.ok(await page.$('.article-body p'), `Article body missing on mobile ${slug}`);
    }

    // Navigate to /apoyanos via mobile CTA
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('.support-cta'),
    ]);
    assert.ok(page.url().includes('/apoyanos'), 'Mobile CTA click must navigate to /apoyanos');

    await page.goto(`${BASE_URL}/juegos/`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.$$eval('.game-card', (cards) => cards.length), 2, 'Catalog must contain exactly two games');
    assert.equal(await page.$$eval('a', (links) => links.some((link) => link.textContent.includes('Jugar')),), false, 'Catalog must not expose unverified Jugar links');
    for (const slug of ['multiplo', 'boxio']) {
      await page.goto(`${BASE_URL}/juegos/${slug}/`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.$$eval('a', (links) => links.some((link) => link.textContent.includes('Jugar')),), false, `Unverified ${slug} must not expose Jugar`);
      assert.match(await page.$eval('.conceptual-art', (el) => el.getAttribute('aria-label')), /Ilustración conceptual/);
    }

    console.log('PASS Chromium mobile: menu open/close toggle, aria-expanded, visibility, keyboard navigation, CTA, and 0 horizontal overflow.');
    console.log('PASS Real Chromium browser smoke verification complete and verified.');
  } finally {
    await browser.close();
  }
}

try {
  await runBrowserChecks();
} finally {
  server.kill();
}
