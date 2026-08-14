# Wave 03 — Pages and routes

**Status:** in_progress

## Goal

Extend navigation beyond single-page hashes where needed: products, services, about, contact views and locales.

## Expected scope

- `src/router/index.js`
- `src/views/*View.vue`
- `src/components/**` (page sections)
- `src/locales/{ar,en}/*.json`, `src/i18n.js`
- `src/data/products.js`

## Decision

- **Products:** real routes (not hash-only). Home `#products` strip remains as a teaser.
- **Services / partners / contact form:** still later (this slice is products only).

## Shipped (products slice)

- [x] `/products` listing + `/products/:key` (ess | ers | esa, else 404)
- [x] Shared catalog `src/data/products.js` (gallery + ESA `liteDownloadUrl` placeholder)
- [x] Locales `products.json` (ar/en)
- [x] Home ProductTabs media from catalog; Learn more → detail; view all → `/products`
- [x] Header mega menu: sculpted brand-tint cards → detail; discover → `/products`
- [x] Footer product links → `/products/:key`
- [x] ESA Lite download CTA when `liteDownloadUrl` is set
- [x] Buyer-facing copy from live ESS / ERS / ESA apps (home teaser vs detail)

## Remaining (wave 03)

- [ ] `/services` page (Home already CTAs here)
- [ ] Optional dedicated about/contact routes

## Drop media here

- Images: `public/images/Products/media/{ess,ers,esa}/`
- Videos: `public/videos/{ess,ers,esa}/`
- Then set `src` / `poster` in `src/data/products.js`
- ESA Lite: set `liteDownloadUrl` on the `esa` catalog entry

## Test criteria

- Routes resolve; unknown `:key` → 404
- Locale keys exist for both `ar` and `en`
- Header/footer links match IA
- Empty gallery still shows placeholder
- `npm run build` succeeds

## Post-close docs

- Update `docs/architecture/structure.md` and `docs/business/site-map.md` as remaining routes land
- Mark wave `done` in `plans/status.md` when `/services` (and any remaining IA) ships
