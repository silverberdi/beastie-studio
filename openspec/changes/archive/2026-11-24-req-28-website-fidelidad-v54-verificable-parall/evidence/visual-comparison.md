# Visual comparison record

The local V5 references were used as the comparison baseline: `inicio.html`, `juegos.html`, and `composiciones-capturas.html` under `docs/design/references/v5/`.

Observed implementation differences are intentional Astro adaptations: navigation and SEO are rendered by the shared `BaseLayout`, the catalog reuses `GameCard`, and the composition assets remain unchanged while their surrounding copy/CTA markup is data-driven. The two approved hero files remain separate, and the composition/card treatment uses `object-fit: contain` rather than copying reference HTML directly.

The automated comparison confirms the requested perceptible behavior and structure at 1440×900 and 375×812. A final human visual/brand review of spacing, crop perception, and typography remains pending; this record does not claim deployment, merge, or publication.
