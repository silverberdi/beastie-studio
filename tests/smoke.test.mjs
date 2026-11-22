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
    if (['novedades', 'apoyanos'].includes(route)) assert.match(source, /Placeholder/);
  }
  const layout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
  for (const route of ['/', '/juegos', '/novedades', '/nosotros', '/apoyanos']) assert.match(layout, new RegExp(`href: '${route.replace('/', '\\/')}'`));
  assert.match(layout, /aria-expanded/);
  assert.match(layout, /Juegos hechos con cariño/);
});
test('catalog data contains exactly two games without unverified URLs', () => {
  const source = fs.readFileSync(path.join(root, 'src/data/games.js'), 'utf8');
  assert.equal((source.match(/slug:/g) || []).length, 2);
  assert.equal((source.match(/publicUrl: null/g) || []).length, 2);
  assert.doesNotMatch(source, /https?:\/\//);
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
