# Architecture overview

## Product surface

DTS-WEB V2 is a marketing SPA for **Digital Transformation Services (DTS)** (`dts-eg.com` / related domains). It presents products, services, trust signals, and contact paths. It is not an authenticated product app.

## Official stack

| Layer | Choice |
|-------|--------|
| UI | Vue 3 (`<script setup>`) |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + CSS variables (`src/assets/colors.css`) |
| Routing | vue-router 4 |
| i18n | vue-i18n 9 (`legacy: false`) |
| Language | Plain JavaScript (no TypeScript) |
| State | No Pinia — composables + `localStorage` |

## Brand tokens (summary)

Source: `src/assets/colors.css`

| Role | Hex |
|------|-----|
| Navy | `#050D1E` |
| Teal / accent | `#23B8C1` |
| Deep teal | `#0B5F75` |
| Blue / light primary | `#1B739F` |

Light mode keeps this navy/blue family. Dark mode: **very dark royal navy** surfaces (`#050A18`) and **electric cyan** (`#00E8F0`) accents.

## Hosting

- **Build output:** `dist/` via `npm run build`
- **Host:** GitHub Pages, custom domain `dts-eg.com` (`CNAME` in the repo)
- **Edge:** Cloudflare proxies `dts-eg.com` (orange-cloud). Pages serves origin files; Cloudflare can still rewrite `robots.txt` (see `crawlers.md`)
- **Deep links:** `scripts/emit-route-html.mjs` writes `dist/<route>/index.html` so public routes return HTTP 200 without JavaScript. Unknown paths still use `public/404.html`
- This repo does not include `.github/workflows/deploy.yml`. Publishing `dist` is done from the GitHub Pages settings for the repository

## System boundaries

- **In scope:** public pages, locale switching, light/dark theme, marketing sections, thin `fetch` helper, first-load splash, site-wide starfield background
- **Out of scope (today):** backend CMS, auth, admin, real contact API endpoint until wave 04
- **External reference:** `C:\Users\PC\Desktop\DTS-WEB` supplies product copy, assets, and UX intent — not V2 folder layout or legacy i18n helpers

## Runtime extras

- ApexCharts available on `window` from `src/main.js` (optional charting)
- Home hero loads Vanta Globe via CDN (Three.js) — presentation only
- Procedure articles live in `content/knowledge/{ar,en}` and are compiled at build time (`scripts/build-knowledge.mjs`, `markdown-it`)

## Source of truth

- Live code under `src/`
- Structural docs under `docs/architecture` and `docs/business`
- Execution waves under `plans/`
- Do not treat `docs/archive/` as canonical
