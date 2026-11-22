import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

// 1. Build Astro static site
execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });

// 2. Validate expected static files exist
const routes = ['', 'juegos', 'novedades', 'nosotros', 'apoyanos'];
for (const route of routes) {
  const filePath = `dist/${route ? `${route}/` : ''}index.html`;
  assert.ok(fs.existsSync(filePath), `Missing static file: ${filePath}`);
}

// 3. Start local static HTTP server
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', 'dist'], { stdio: 'ignore' });

async function runBrowserChecks() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless=new'],
  });

  try {
    const page = await browser.newPage();

    // --- Scenario A: Desktop Viewport Navigation & Layout ---
    await page.setViewport({ width: 1280, height: 800 });

    for (const route of routes) {
      const targetUrl = `${BASE_URL}/${route ? `${route}/` : ''}`;
      await page.goto(targetUrl, { waitUntil: 'networkidle0' });

      // Title & core branding
      const title = await page.title();
      assert.ok(title.includes('Beastie Studio'), `Title missing Beastie Studio on ${route || '/'}`);

      // Nav exists and is labeled
      const navLabel = await page.$eval('#site-navigation', (el) => el.getAttribute('aria-label'));
      assert.equal(navLabel, 'Navegación principal', `Incorrect nav aria-label on ${route || '/'}`);

      // Check active navigation link
      const activeHref = await page.$eval('#site-navigation a.active', (el) => el.getAttribute('href'));
      const expectedHref = route ? `/${route}` : '/';
      assert.equal(activeHref, expectedHref, `Active route link mismatch on ${route || '/'}`);

      // Footer signature
      const footerText = await page.$eval('.site-footer', (el) => el.textContent);
      assert.ok(footerText.includes('Juegos hechos con cariño.'), `Missing signature on ${route || '/'}`);

      // CTA floating support button
      const ctaHref = await page.$eval('.support-cta', (el) => el.getAttribute('href'));
      assert.equal(ctaHref, '/apoyanos', `CTA target mismatch on ${route || '/'}`);

      // Keyboard focus visibility
      await page.keyboard.press('Tab');
      const activeElTag = await page.evaluate(() => document.activeElement?.tagName);
      assert.ok(activeElTag, `Keyboard Tab did not produce an active element on ${route || '/'}`);

      // No horizontal scrollbar/overflow
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      assert.equal(hasOverflow, false, `Horizontal overflow detected on ${route || '/'} at 1280px viewport`);
    }
    console.log(`PASS Chromium desktop: all 5 routes rendered with active nav, footer signature, focus order, and 0 horizontal overflow.`);

    // --- Scenario B: Mobile Viewport, Menu Operability & Visibility ---
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

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

    // Navigate to /apoyanos via mobile CTA
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('.support-cta'),
    ]);
    assert.ok(page.url().includes('/apoyanos'), 'Mobile CTA click must navigate to /apoyanos');

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
