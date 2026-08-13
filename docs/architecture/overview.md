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

## System boundaries

- **In scope:** public pages, locale switching, light/dark theme, marketing sections, thin `fetch` helper
- **Out of scope (today):** backend CMS, auth, admin, real contact API endpoint until wired in a later wave
- **External reference:** `C:\Users\PC\Desktop\DTS-WEB` supplies product copy, assets, and UX intent — not V2 folder layout or legacy i18n helpers

## Runtime extras

- ApexCharts loaded in `src/main.js` (used by stats/CTA visuals)
- Hero may load CDN visuals (e.g. Vanta/Three) — treat as presentation, not core architecture

## Source of truth

- Live code under `src/`
- Structural docs under `docs/architecture` and `docs/business`
- Execution waves under `plans/`
- Do not treat `docs/archive/` as canonical
