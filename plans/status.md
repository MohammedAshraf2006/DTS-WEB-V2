# Execution status

Last updated: 2026-08-26 (mobile sidebar close X + nested products/services)

| Wave | File | Status | Goal |
|------|------|--------|------|
| 00 | [wave-00-bootstrap.md](wave-00-bootstrap.md) | done | Cursor rules, inventory, docs/plans bootstrap |
| 01 | [wave-01-foundation.md](wave-01-foundation.md) | done | Shell, i18n, theme, tokens, loader, site background |
| 02 | [wave-02-home-complete.md](wave-02-home-complete.md) | in_progress | Home largely shipped; partners hash, client assets remain |
| 03 | [wave-03-pages-routes.md](wave-03-pages-routes.md) | done | Products + services + clients + partners routes shipped |
| 04 | [wave-04-forms-integrations.md](wave-04-forms-integrations.md) | done | Contact page, footer emails, WhatsApp float |
| 05 | [wave-05-quality-launch.md](wave-05-quality-launch.md) | pending | QA, SEO basics, deploy |

## Snapshot (current product)

- **Stack:** Vue 3 + Vite + Tailwind 3 + vue-i18n 9 + vue-router 4 (JS only)
- **Shell:** `MainLayout` + `AppHeader` / `AppFooter` + `SiteBackground` + `AppLoader` + `WhatsAppFloat`
- **Home sections:** Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta
- **Routes:** `/`, `/products`, `/products/ess|ers|esa`, `/services`, `/services/signature`, `/clients`, `/partners`, `/contact`, 404
- **Contact:** `/contact` → `sales@dts-eg.com`; signature form → `tawqe3y_10thoframdan@dts-eg.com`; sales email `sales@dts-eg.com`
- **Hashes live:** `#products`, `#services` (home teaser), `#about` (home stats)
- **Build:** `npm run build` passes (2026-08-16)
- **Crawlers:** GitHub Pages origin allows AI fetch; live dts-eg.com still injects Cloudflare managed `Disallow` for GPTBot/ClaudeBot — Pages deploy alone does not remove it (see `docs/architecture/crawlers.md`)

## Dependency order

```
00 → 01 → 02 → 03 → 04 → 05
```

Wave 03 may overlap late wave 02 only if Home hash/CTA targets stay consistent.

## Canonical links

- Docs: [`docs/README.md`](../docs/README.md)
- Rules: [`.cursor/rules/`](../.cursor/rules/)
- External reference: `C:\Users\PC\Desktop\DTS-WEB`
