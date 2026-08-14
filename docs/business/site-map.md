# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta |
| 404 | `NotFoundView` |
| Chrome | `AppLoader` (first paint) + `MainLayout` (`SiteBackground`, `AppHeader`, `AppFooter`) |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | Product tabs (ESS / ERS / ESA) |
| `#services` | Top 3 services + e-signature highlight |
| `#about` | Stats + “trusted by” CTA band |
| `#contact` | Footer (pre-footer CTA + columns) |

Nav still exposes **Partners** → `/#partners` (section not implemented yet).

## Target map (from reference + nav labels)

| Intent | V2 status |
|--------|-----------|
| Home / hero | Live |
| Services (home strip) | Live (`#services`); full `/services` page pending wave 03 |
| Products | Live (`#products`); media placeholders until assets wired |
| About / numbers | Live as `#about` (StatsCta) |
| Clients / trust | Partial — `TrustBar` with 2 logos; more URLs/assets pending |
| Partners | Missing section (`public/images/partners` available) |
| Contact | Footer + `mailto` sales CTA; dedicated form pending wave 04 |
| WhatsApp float | Missing (wave 04) |

## Future routes (wave 03+)

Dedicated views may be added under `MainLayout` for products, services, about, contact — or remain hash sections on Home. Decision recorded in `plans/wave-03-pages-routes.md` when that wave starts. Home already links “all services” to `/services`.
