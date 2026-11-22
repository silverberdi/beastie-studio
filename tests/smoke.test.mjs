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
    if (route === 'apoyanos') assert.match(source, /Placeholder/);
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
