# Wave 00 — Bootstrap

**Status:** done

## Goal

Establish agent rules, structural inventory, and documentation/plans layout so later waves have a single source of truth.

## Done

- [x] Initial `.cursor/rules` for stack, structure, i18n, design, legacy reference
- [x] Gap inventory vs `C:\Users\PC\Desktop\DTS-WEB` (migrated below)
- [x] Reorganize `docs/` (architecture, business, archive)
- [x] Create `plans/` + `status.md`
- [x] Add workflow, docs-and-plans, and language Cursor rules

## Inventory snapshot (V2 vs reference)

### Already in place

Stack Vue 3 + Vite + Tailwind + vue-i18n + vue-router; shell layout; home sections Hero/TrustBar/ProductTabs/ServicesGrid/StatsCta; theme + motion composables; `api.js` stub; public images; Cursor rules.

### Gaps

| Area | Gap |
|------|-----|
| Sections | WhyUs, Partners, Contact/`#contact`, `#partners`, `#about` incomplete |
| Hashes | Nav/CTAs point to missing targets |
| WhatsApp | Not present |
| Contact form | No UI; API stub only |
| Routes | Only `/` + 404 |
| Deploy | No V2 Pages/CNAME yet |

## Test criteria

- `docs/` and `plans/` paths resolve; archive not treated as canonical
- Rules present under `.cursor/rules/`

## Post-close docs

- [x] `docs/README.md` + architecture/business
- [x] `plans/status.md` marks wave 00 done
