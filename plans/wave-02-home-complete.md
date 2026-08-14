# Wave 02 — Home complete

**Status:** in_progress

## Goal

Align Home sections with reference product intent; fix hash targets; sync copy and assets.

## Expected scope

- `src/views/HomeView.vue`
- `src/components/home/*`
- `src/locales/{ar,en}/home.json` (+ `common.json` if nav/hashes change)
- `public/images/**`

## Partial progress

- [x] **TrustBar** — Notion-style muted logo strip; logos from `public/images/clients/1.png` and `2.png`; click opens external `http(s)` company URL in a new tab only (no in-site detail page). Empty `url` stays non-clickable until real links are filled in `TrustBar.vue`.
- [x] **ProductTabs** — Notion-like two-column layout: simple product copy + reserved media frame for image or video (`productMedia` in `ProductTabs.vue`). Drop files in `public/images/Products/media/` or `public/videos/` and set `type`/`src`.
- [x] **ServicesGrid** — Home shows only 3 services (e-invoice, ERP, e-signature) plus a top “Get your e-signature now” highlight. Remaining services deferred to `/services` (wave 03).
- [x] **StatsCta** — 3D tilt cards, count-up / count-down numbers, bouncing trend arrows, animated sparklines; CTA block with depth.

## Tasks

1. Add/align missing sections vs reference: WhyUs, Partners, Contact (Clients if distinct from TrustBar)
2. Fix hash targets (`#contact`, `#partners`, `#about`/`#home`) for nav/CTAs
3. Sync i18n copy + images from reference intent (add remaining client logos + real URLs in TrustBar)
4. Tune scroll-reveal / motion without new libraries

## Test criteria

- Every header/CTA hash lands on an existing section
- AR and EN home content render without missing keys
- Partners/clients assets display as intended

## Post-close docs

- Update `docs/business/site-map.md` to match shipped sections
- Mark this wave `done` in `plans/status.md`
