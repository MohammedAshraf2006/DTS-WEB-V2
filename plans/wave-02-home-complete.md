# Wave 02 — Home complete

**Status:** in_progress

## Goal

Align Home sections with reference product intent; fix hash targets; sync copy and assets.

## Expected scope

- `src/views/HomeView.vue`
- `src/components/home/*`
- `src/locales/{ar,en}/home.json` (+ `common.json` if nav/hashes change)
- `public/images/**`
- Shared polish already used by Home: header/footer/loader/background/tokens

## Shipped

- [x] **Hero** — Vanta globe; rotating pills (invoice blue / receipt green / signature gold) + logo cards link to `/products/ess|ers|esa`; light hero brightened; dark hero solid navy; spacing tuned
- [x] **TrustBar** — logo strip; `clients/1.png`, `2.png`; external `http(s)` only; dark bevel without white edges
- [x] **ProductTabs** — Notion two-column; logo-only tabs; soft tab transition; media slot via `productMedia` (src empty until assets drop)
- [x] **ServicesGrid** — 3 home services + sculpted e-signature highlight; “all services” → `/services` (page still wave 03)
- [x] **StatsCta** — 3D StatCards (`useCardTilt` / `useCountUp`); sparklines; i18n live label; green growth badges in light mode; `#about`; sculpted CTA band
- [x] **Background / atmosphere** — starfield light+dark; subtle light-mode glows; Home orbs dark-only
- [x] **Copy / i18n** — home + common AR/EN in sync for shipped sections

## Still open

- [x] `/partners` page (nav no longer uses missing `#partners`)
- [x] Client names and industries in `src/locales/{ar,en}/clients.json` (SAVCO oils, Orman foundation, El Hana, Abdelmaksoud Market, Class Solutions, Seaharvest oil & gas)
- [ ] Optional WhyUs if still distinct from `#about` / stats
- [ ] Product media files under `public/` wired in `ProductTabs` `productMedia`
- [ ] Dedicated `/services` page content (owned by wave 03; Home CTA already points there)

## Tasks (remaining)

1. Optional Home partners teaser (full list is `/partners`)
2. Optional extra client stories when copy arrives
3. Drop product media and set `productMedia` srcs
4. Final Home AR/EN + dark/light smoke pass before marking done

## Test criteria

- Every header/CTA hash lands on an existing section (`#partners` replaced by `/partners`)
- AR and EN home content render without missing keys
- Partners/clients assets display as intended
- Light/dark + AR/EN smoke check on Home
- `npm run build` succeeds

## Post-close docs

- Update `docs/business/site-map.md` when partners/media land
- Mark this wave `done` in `plans/status.md`
