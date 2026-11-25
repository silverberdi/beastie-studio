# Apply inventory

## Superseded presentation

- `GameCard.astro` previously rendered each game's individual `primaryScreenshot` as the portfolio/card art. The approved V5.4 composition is now the active card and catalog art through `game.composition`; individual screenshots remain owned by `GameDetail.astro` galleries.
- The previous conceptual-card path is not an active consumer in the catalog. Historical reference files under `docs/design/references/` and the individual screenshot assets remain unchanged.
- Only this repository worktree was inspected and modified; no Múltiplo or Boxio repository was accessed or changed.

## Immutable assets

- Heroes and individual screenshots retain their existing manifest SHA-256 checks.
- Composition assets are served unchanged from `public/assets/v5/compositions/` and are checked by `tests/smoke.test.mjs` with their expected SHA-256 values.

## Evidence boundary

`npm run test:browser` writes screenshots and JSON measurements under this change's `evidence/` directory. The executor verified the local 1440×900 and 375×812 matrices, including hero movement, composition loading, interaction timing, reduced motion, no-JS, overflow, CLS, and asset responses. Final brand review, PR, merge, deployment, and publication remain human-controlled.
