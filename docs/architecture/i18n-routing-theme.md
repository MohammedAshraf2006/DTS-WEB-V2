# i18n, routing, and theme

## i18n (`src/i18n.js`)

- Library: vue-i18n 9, `legacy: false`
- Default locale: `ar` (from `localStorage` key `dts-locale`, fallback `en`)
- Namespaces merged per locale, e.g. `common`, `home`
- Usage: `t('common.nav.home')`, `t('home.hero.titlePrefix')`
- Add a new page namespace as `src/locales/{ar,en}/<page>.json` and register it in `i18n.js`
- Keep `ar` and `en` key trees in parallel — no hardcoded UI copy in templates

## HTML lang / dir (`src/main.js`)

- Watches `i18n.global.locale`
- Sets `<html lang>` and `dir` (`rtl` for `ar`, `ltr` otherwise)
- Persists locale to `localStorage`

## Routing (`src/router/index.js`)

- History mode via `createWebHistory`
- Shell: `MainLayout` with nested home route
- `scrollBehavior` supports saved position, hash targets (offset 90), else top

Known gap: nav/CTAs may link to hashes such as `/#contact` before matching section ids exist — tracked under `plans/`.

## Theme (`src/composables/useTheme.js`)

- Dark mode via `dark` class on `<html>`
- Persisted as `dts-theme` in `localStorage`
- Tokens live in `src/assets/colors.css` and are mapped in `tailwind.config.js`

## Styling approach

- Prefer Tailwind utilities + semantic tokens (`bg-surface`, `primary`, …)
- Shared motion utilities in `src/style.css` (e.g. `.reveal`)
- Do not port legacy per-section CSS files from the reference repo
