# Apply evidence

## Automated checks

- `python3 docs/design/references/restore-home-desktop.py` — PASS; rebuilt `docs/design/references/home-desktop.png` at 2560×8710.
- `sha256sum` against `public/assets/brand/manifest.json` — PASS for every listed binary; full hashes are checked by `tests/smoke.test.mjs`.
- `npm test` — PASS, 2/2 tests.
- `npm run build` — PASS, Astro `output: "static"`, 5 pages generated in `dist/`.
- `npm run test:browser` — PASS; installed Chromium rendered `/`, `/juegos`, `/novedades`, `/nosotros`, `/apoyanos` through a local static server and inspected shared navigation, menu control, focus CSS, CTA and placeholder output. The menu transition is additionally covered by the generated client script and source smoke assertions; CDP interaction is environment-limited here.

## Scope and review limits

The implementation contains only Astro SSG pages, native Astro components, CSS, tests and the approved brand assets. It adds no CMS, backend, authentication, database, analytics, tracking cookies, actionable payment channel or deployment configuration. The merge/PR and publication remain human-controlled. The local reference PNG is intentionally a restored design reference, not a production asset.

## Candidate note

This is Apply evidence from the active worktree. No published-version evidence is used.
