# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta |
| Products `/products` | `ProductsView` — three sculpted cards (ESS / ERS / ESA) |
| Product detail `/products/:key` | `ProductDetailView` — hero, media gallery, features, ESA Lite CTA |
| 404 | `NotFoundView` |
| Chrome | `AppLoader` (first paint) + `MainLayout` (`SiteBackground`, `AppHeader`, `AppFooter`) |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | Product tabs teaser (links through to `/products/:key`) |
| `#services` | Top 3 services + e-signature highlight |
| `#about` | Stats + “trusted by” CTA band |
| `#contact` | Footer (pre-footer CTA + columns) |

Nav **Products** → `/products`. Partners still → `/#partners` (section not implemented yet).

## Target map (from reference + nav labels)

| Intent | V2 status |
|--------|-----------|
| Home / hero | Live |
| Services (home strip) | Live (`#services`); full `/services` page pending wave 03 |
| Products listing | Live `/products` |
| Product detail | Live `/products/ess`, `/products/ers`, `/products/esa` (media placeholders until files are dropped) |
| About / numbers | Live as `#about` (StatsCta) |
| Clients / trust | Partial — `TrustBar` with 2 logos; more URLs/assets pending |
| Partners | Missing section (`public/images/partners` available) |
| Contact | Footer + `mailto` sales CTA; dedicated form pending wave 04 |
| WhatsApp float | Missing (wave 04) |

## Media drop paths

- `public/images/Products/media/{ess,ers,esa}/`
- `public/videos/{ess,ers,esa}/`
- Wire paths in `src/data/products.js` (`gallery` + ESA `liteDownloadUrl`)

## Future routes (wave 03 remainder)

`/services` (Home already CTAs here). About/contact may stay hashes.
