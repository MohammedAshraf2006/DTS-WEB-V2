# Wave 01 — Foundation

**Status:** pending

## Goal

Stabilize technical foundation: layout, header/footer, router hash offset, i18n bootstrap, theme, tokens, and basic motion.

## Expected scope

- `src/layouts/MainLayout.vue`
- `src/components/AppHeader.vue`, `AppFooter.vue`
- `src/router/index.js`
- `src/i18n.js`, `src/main.js`
- `src/composables/useTheme.js`
- `src/assets/colors.css`, `src/style.css`, `tailwind.config.js`

## Tasks

1. Stabilize layout / header / footer / router scroll-hash offset
2. Verify i18n (`ar` default, `dir`/`lang` sync) and theme toggle
3. Align tokens and motion utilities; smoke-test Home AR/EN + dark/light

## Test criteria

- Locale switch updates `lang`/`dir` and persists
- Theme toggle persists and styles shell correctly
- Hash scroll offset does not hide headings under fixed header
- `npm run build` succeeds

## Post-close docs

- Update this file + `plans/status.md` → `done`
- Touch `docs/architecture/*` only if structure/tokens behavior changed
