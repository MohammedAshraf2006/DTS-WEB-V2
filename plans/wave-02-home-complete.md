# Wave 02 — Home complete

**Status:** pending

## Goal

Align Home sections with reference product intent; fix hash targets; sync copy and assets.

## Expected scope

- `src/views/HomeView.vue`
- `src/components/home/*`
- `src/locales/{ar,en}/home.json` (+ `common.json` if nav/hashes change)
- `public/images/**`

## Tasks

1. Add/align missing sections vs reference: WhyUs, Partners, Contact (Clients if distinct from TrustBar)
2. Fix hash targets (`#contact`, `#partners`, `#about`/`#home`) for nav/CTAs
3. Sync i18n copy + images from reference intent
4. Tune scroll-reveal / motion without new libraries

## Test criteria

- Every header/CTA hash lands on an existing section
- AR and EN home content render without missing keys
- Partners/clients assets display as intended

## Post-close docs

- Update `docs/business/site-map.md` to match shipped sections
- Mark this wave `done` in `plans/status.md`
