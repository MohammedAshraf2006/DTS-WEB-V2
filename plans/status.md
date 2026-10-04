# Execution status

Last updated: 2026-09-26 (public trust: frozen counts, product spine, hours, HTTP 200 shells, knowledge)

| Wave | File | Status | Goal |
|------|------|--------|------|
| 00 | [wave-00-bootstrap.md](wave-00-bootstrap.md) | done | Cursor rules, inventory, docs/plans bootstrap |
| 01 | [wave-01-foundation.md](wave-01-foundation.md) | done | Shell, i18n, theme, tokens, loader, site background |
| 02 | [wave-02-home-complete.md](wave-02-home-complete.md) | in_progress | Home largely shipped; partners hash, client assets remain |
| 03 | [wave-03-pages-routes.md](wave-03-pages-routes.md) | done | Products + services + clients + partners routes shipped |
| 04 | [wave-04-forms-integrations.md](wave-04-forms-integrations.md) | done | Contact page, footer emails, WhatsApp float |
| 05 | [wave-05-quality-launch.md](wave-05-quality-launch.md) | pending | QA, SEO basics, deploy |
| 06 | [wave-06-public-trust.md](wave-06-public-trust.md) | done | Frozen claims, product spine, hours, HTTP 200, knowledge |

## Snapshot (current product)

- **Stack:** Vue 3 + Vite + Tailwind 3 + vue-i18n 9 + vue-router 4 (JS only)
- **Shell:** `MainLayout` + `AppHeader` / `AppFooter` + `SiteBackground` + `AppLoader` + `WhatsAppFloat`
- **Home sections:** Hero (three doors) → TrustBar → ProductTabs (ESS, ESA complement, quiet ERS) → ServicesGrid
- **Routes:** `/`, `/products`, `/products/ess|esa|ers`, `/services`, `/services/signature`, `/knowledge`, `/knowledge/:slug`, `/clients`, `/partners`, `/contact`, 404
- **Contact:** `/contact` → `sales@dts-eg.com`; signature form → `tawqe3y_10thoframdan@dts-eg.com`; hours Sunday–Thursday, 9:00 AM to 5:00 PM in the footer
- **Hashes live:** `#products`, `#services` (home teaser)
- **Build:** `npm run build` emits per-route HTML shells (HTTP 200) after Vite
- **Host:** GitHub Pages + Cloudflare (`dts-eg.com`). No deploy workflow file in this repo
- **Crawlers:** GitHub Pages origin allows AI fetch; live dts-eg.com still injects Cloudflare managed `Disallow` for GPTBot/ClaudeBot — Pages deploy alone does not remove it (see `docs/architecture/crawlers.md`)

## Dependency order

```
00 → 01 → 02 → 03 → 04 → 05
06 sits on the shipped site (trust, spine, knowledge) and can land before wave 05 QA closes
```

Wave 03 may overlap late wave 02 only if Home hash/CTA targets stay consistent.

## Canonical links

- Docs: [`docs/README.md`](../docs/README.md)
- Rules: [`.cursor/rules/`](../.cursor/rules/)
- External reference: `C:\Users\PC\Desktop\DTS-WEB`
