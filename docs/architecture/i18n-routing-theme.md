# i18n, routing, and theme

## i18n (`src/i18n.js`)

- Library: vue-i18n 9, `legacy: false`
- Default locale: `ar` (from `localStorage` key `dts-locale`, fallback `en`)
- Namespaces merged per locale: `common`, `home`, `products`, `contact`, `services`, `clients`, `partners`, `knowledge`
- Usage: `t('common.nav.home')`, `t('home.hero.titlePrefix')`, `tm(...)` for arrays/objects
- Add a new page namespace as `src/locales/{ar,en}/<page>.json` and register it in `i18n.js`
- Keep `ar` and `en` key trees in parallel — no hardcoded UI copy in templates
- Example localized chrome string: `common.footer.hours` → `الأحد–الخميس، 9:00 صباحًا إلى 5:00 مساءً` / `Sunday–Thursday, 9:00 AM to 5:00 PM`

## HTML lang / dir (`src/main.js`)

- Watches `i18n.global.locale`
- Sets `<html lang>` and `dir` (`rtl` for `ar`, `ltr` otherwise)
- Persists locale to `localStorage`

## Routing (`src/router/index.js`)

- History mode via `createWebHistory`
- Shell: `MainLayout` with nested home, products, services, and contact routes
- `scrollBehavior` supports saved position, hash targets (offset 90), keeps window scroll on knowledge article switches, else top
- Canonical, sitemap, in-app links, and emitted shells use trailing slashes (`/products/`). Home is `https://dts-eg.com/`. Vue Router redirects a missing slash with `replace` so clicks match canonical.
- Indexable language is Arabic. Each URL has `hreflang="ar"` and `hreflang="x-default"` pointing at the same canonical. There is no `/en` prefix until the owner asks for English search URLs.
- Build injects crawler-visible `h1` + article HTML into `#app`; Vue replaces it on mount
- Analytics: GA4 `G-EY2GF14XJ0` and Meta Pixel `1763152844965514` (env override via `.env.example`). Direct inject unless `VITE_GTM_ID` is set. Events: `click_whatsapp`, `click_call`, `generate_lead`, `signature_lead`.

### Page routes (extra)

| Path | Status |
|------|--------|
| `/services` | Live — full services catalog |
| `/services/signature` | Live — e-signature / e-seal detail + request form |
| `/clients` | Live — featured client cards, no public count claim |
| `/partners` | Live — partner cards; visit-site only when a URL exists; accountant offices prefixed مكتب محاسب قانوني |
| `/knowledge` | Live — topic bar, featured story, article stream |
| `/knowledge/:slug` | Live — standalone article (signature, receipts, token, ESS, contact) |
| `/fix-error-3008-itida-websign` | Live — ITIDA WebSign error 3008 article, video, and batch download |

### Hash targets (Home / footer)

| Hash | Status |
|------|--------|
| `#products` | Live — ESS panel, ESA complement, ERS cashier-receipts link |
| `#services` | Live — `ServicesGrid` teaser (full list on `/services`) |
| `#contact` | Redirected to page `/contact` (form) |
| `#partners` | Replaced by page `/partners` |
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
