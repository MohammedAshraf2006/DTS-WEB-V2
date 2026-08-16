# i18n, routing, and theme

## i18n (`src/i18n.js`)

- Library: vue-i18n 9, `legacy: false`
- Default locale: `ar` (from `localStorage` key `dts-locale`, fallback `en`)
- Namespaces merged per locale: `common`, `home`, `products`, `contact`, `services`, `clients`
- Usage: `t('common.nav.home')`, `t('home.hero.titlePrefix')`, `tm(...)` for arrays/objects
- Add a new page namespace as `src/locales/{ar,en}/<page>.json` and register it in `i18n.js`
- Keep `ar` and `en` key trees in parallel — no hardcoded UI copy in templates
- Example localized chrome string: `home.stats.live` → `مباشر` / `live`

## HTML lang / dir (`src/main.js`)

- Watches `i18n.global.locale`
- Sets `<html lang>` and `dir` (`rtl` for `ar`, `ltr` otherwise)
- Persists locale to `localStorage`

## Routing (`src/router/index.js`)

- History mode via `createWebHistory`
- Shell: `MainLayout` with nested home, products, services, and contact routes
- `scrollBehavior` supports saved position, hash targets (offset 90), else top

### Page routes (extra)

| Path | Status |
|------|--------|
| `/services` | Live — full services catalog |
| `/services/signature` | Live — e-signature / e-seal detail + request form |
| `/clients` | Live — 1000+ hero + 30 featured client cards |

### Hash targets (Home / footer)

| Hash | Status |
|------|--------|
| `#products` | Live — `ProductTabs` |
| `#services` | Live — `ServicesGrid` teaser (full list on `/services`) |
| `#about` | Live — `StatsCta` |
| `#contact` | Redirected to page `/contact` (form) |
| `#partners` | **Missing** — still linked from header; wave 02 remaining |
| `/services#service-{key}` | Live — scrolls to and highlights a services card (signature still uses `/services/signature`) |

## Theme (`src/composables/useTheme.js`)

- Dark mode via `dark` class on `<html>`
- Persisted as `dts-theme` in `localStorage`
- Tokens live in `src/assets/colors.css` and are mapped in `tailwind.config.js`
- Light palette unchanged (navy / blue). Dark palette: very dark royal navy `#050A18` + electric cyan `#00E8F0`
- Header controls use small icon/label transitions; full-page View Transitions are intentionally **not** used (they broke the starfield)

## Styling approach

- Prefer Tailwind utilities + semantic tokens (`bg-surface`, `primary`, …)
- Shared motion utilities in `src/style.css` (e.g. `.reveal`, ambient orbs)
- Site-wide atmosphere: `SiteBackground` (starfield); section sculpture via `useCardTilt` where needed
- Do not port legacy per-section CSS files from the reference repo
