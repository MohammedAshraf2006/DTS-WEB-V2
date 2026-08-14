# Wave 03 — Pages and routes

**Status:** done

## Goal

Extend navigation beyond single-page hashes where needed: products, services, about, contact views and locales.

## Expected scope

- `src/router/index.js`
- `src/views/*View.vue`
- `src/components/**` (page sections)
- `src/locales/{ar,en}/*.json`, `src/i18n.js`
- `src/data/products.js`, `src/data/services.js`

## Decision

- **Products:** real routes (not hash-only). Home `#products` strip remains as a teaser.
- **Services:** `/services` listing + dedicated `/services/signature` (توقيع/ختم split). Home `#services` stays a teaser.
- **Contact:** shipped in wave 04 as `/contact`.

## Shipped (products slice)

- [x] `/products` listing + `/products/:key` (ess | ers | esa, else 404)
- [x] Shared catalog `src/data/products.js` (gallery + ESA `liteDownloadUrl` placeholder)
- [x] Locales `products.json` (ar/en)
- [x] Home ProductTabs media from catalog; Learn more → detail; view all → `/products`
- [x] Header mega menu: sculpted brand-tint cards → detail; discover → `/products`
- [x] Footer product links → `/products/:key`
- [x] ESA Lite download CTA (`liteDownloadUrl` → GitHub release MSI v2.1.1)
- [x] Buyer-facing copy from live ESS / ERS / ESA apps (home teaser vs detail)
- [x] Detail features as expandable lines; sculpted panel drops with the explanation

## Shipped (services slice)

- [x] `/services` — full catalog (8 services) with long `detail` copy + 3D SVG icons
- [x] `/services/signature` — signature + seal panels, benefits, contact/WhatsApp CTAs
- [x] Catalog `src/data/services.js` + locales `services.json` (ar/en)
- [x] Header / footer / Home CTAs point to `/services` and `/services/signature`

## Remaining (optional later)

- Dedicated about route (hash `#about` may stay)

## Drop media here

- Images: `public/images/Products/media/{ess,ers,esa}/`
- Videos: `public/videos/{ess,ers,esa}/`
- Then set `src` / `poster` in `src/data/products.js`
- ESA Lite: set `liteDownloadUrl` on the `esa` catalog entry
- Service icons: `public/images/services/*.svg`

## Test criteria

- Routes resolve; unknown product `:key` → 404
- Locale keys exist for both `ar` and `en`
- Header/footer links match IA
- Empty gallery still shows placeholder
- `/services` and `/services/signature` resolve
- `npm run build` succeeds

## Post-close docs

- [x] Update `docs/architecture/structure.md` and `docs/business/site-map.md`
- [x] Mark wave `done` in `plans/status.md`
