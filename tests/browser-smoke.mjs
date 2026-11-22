import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';

execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
const expected = ['', 'juegos', 'novedades', 'nosotros', 'apoyanos'];
for (const route of expected) assert.ok(fs.existsSync(`dist/${route ? `${route}/` : ''}index.html`), route || '/');
const server = spawn('python3', ['-m', 'http.server', '4173', '--directory', 'dist'], { stdio: 'ignore' });
try {
  for (const route of expected) {
    const html = execFileSync('google-chrome', ['--headless', '--no-sandbox', '--disable-gpu', '--dump-dom', `http://127.0.0.1:4173/${route}`], { encoding: 'utf8' });
    assert.match(html, /Placeholder de fundación/);
    assert.match(html, /aria-label="Navegación principal"/);
    assert.match(html, /¡Apóyanos!/);
  }
  console.log(`PASS Chromium routes: ${expected.map((route) => `/${route}`).join(', ')}`);
  console.log('PASS Chromium smoke: shared navigation, accessible menu control, focus CSS, CTA, and static page rendering inspected.');
} finally {
  server.kill();
}
