# Wave 02 — Home complete

**Status:** in_progress

## Goal

Align Home sections with reference product intent; fix hash targets; sync copy and assets.

## Expected scope

- `src/views/HomeView.vue`
- `src/components/home/*`
- `src/locales/{ar,en}/home.json` (+ `common.json` if nav/hashes change)
- `public/images/**`
- Shell polish shared with Home: `AppHeader`, `AppFooter`, `AppLoader`, `SiteBackground`, tokens

## Partial progress

### Shipped on Home

- [x] **Hero** — Vanta globe; rotating product pills (blue / green / gold); light hero brightened; dark hero restored to solid navy surface; spacing tuned
- [x] **TrustBar** — Notion-style logo strip; client assets `1.png` / `2.png`; external URL open-in-new-tab; dark-mode 3D bevel without white edges
- [x] **ProductTabs** — Notion two-column layout; logo-only tabs; soft panel transition on tab change; media slot ready (`productMedia`)
- [x] **ServicesGrid** — 3 home services + sculpted “Get your e-signature now” highlight; link to `/services`
- [x] **StatsCta** — 3D tilt StatCards, count-up/down, trend arrows, sparklines; i18n “live” / “مباشر”; light-mode green growth badges; plain stats headline; sculpted bottom CTA
- [x] **SiteBackground** — animated starfield for light + dark; light-mode soft brand glows; wired in `MainLayout`
- [x] **AppLoader** — first-open splash (logo pulse ~1s + fade), reference intent with V2 tokens
- [x] **Shell polish** — shorter header, larger DTS logo, compact Contact CTA; theme/locale control micro-animations; footer CTA separator color for dark mode; brand palette refresh in `colors.css`

### Still open (wave 02 / 03)

- [ ] Hash targets that lack sections: `#partners`, full `#contact` form page behavior as needed
- [ ] Remaining client logos + real URLs in TrustBar
- [ ] WhyUs / Partners sections if still required vs TrustBar
- [ ] Product media files dropped into `public/` and wired in `productMedia`

## Tasks

1. Add/align missing sections vs reference: WhyUs, Partners, Contact (Clients if distinct from TrustBar)
2. Fix hash targets (`#contact`, `#partners`, `#about`/`#home`) for nav/CTAs
3. Sync i18n copy + images from reference intent (add remaining client logos + real URLs in TrustBar)
4. Tune scroll-reveal / motion without new libraries

## Test criteria

- Every header/CTA hash lands on an existing section
- AR and EN home content render without missing keys
- Partners/clients assets display as intended
- Light/dark + AR/EN smoke check on Home

## Post-close docs

- Update `docs/business/site-map.md` to match shipped sections
- Mark this wave `done` in `plans/status.md`
