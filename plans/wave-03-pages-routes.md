# Wave 03 — Pages and routes

**Status:** pending

## Goal

Extend navigation beyond single-page hashes where needed: products, services, about, contact views and locales.

## Expected scope

- `src/router/index.js`
- `src/views/*View.vue`
- `src/components/**` (page sections)
- `src/locales/{ar,en}/*.json`, `src/i18n.js`

## Tasks

1. Decide anchor-only vs real routes (record decision here when starting)
2. Add views under `MainLayout` as required
3. Add matching locale namespaces and router entries

## Test criteria

- Routes resolve; 404 still works
- Locale keys exist for both `ar` and `en`
- Header/footer links match the chosen IA

## Post-close docs

- Update `docs/architecture/structure.md` and `docs/business/site-map.md`
- Mark wave `done` in `plans/status.md`
