# Wave 01 — Foundation

**Status:** done

## Goal

Stabilize technical foundation: layout, header/footer, router hash offset, i18n bootstrap, theme, tokens, and basic motion.

## Expected scope

- `src/layouts/MainLayout.vue`
- `src/components/AppHeader.vue`, `AppFooter.vue`, `AppLoader.vue`, `SiteBackground.vue`
- `src/router/index.js`
- `src/i18n.js`, `src/main.js`, `src/App.vue`
- `src/composables/useTheme.js`, `useScrolledHeader.js`, `useScrollReveal.js`
- `src/assets/colors.css`, `src/style.css`, `tailwind.config.js`

## Delivered

- [x] `MainLayout` shell with header, transparent main, footer, and fixed `SiteBackground`
- [x] `AppHeader` — compact height, theme + locale controls, products mega menu, hash nav
- [x] `AppFooter` — multi-column Notion-like footer, pre-footer CTA (`mailto` sales), `id="contact"`
- [x] `AppLoader` — first-open splash (~1s pulse + fade)
- [x] i18n default `ar`, `lang`/`dir` sync, `dts-locale` persistence
- [x] Theme via `html.dark` + `dts-theme`; brand tokens in `colors.css` (navy / teal / deep teal / blue)
- [x] Router hash scroll offset for fixed header
- [x] Shared motion utilities (`.reveal`, ambient orbs, theme/locale control micro-animations)

## Test criteria

- [x] Locale switch updates `lang`/`dir` and persists
- [x] Theme toggle persists and styles shell correctly
- [x] Hash scroll offset does not hide headings under fixed header
- [x] `npm run build` succeeds

## Post-close docs

- [x] This file + `plans/status.md` → `done`
- [x] Architecture docs updated for shell / tokens / theme behavior
