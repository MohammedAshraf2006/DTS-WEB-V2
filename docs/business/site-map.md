# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta |
| Products `/products` | `ProductsView` — three sculpted cards (ESS / ERS / ESA) |
| Product detail `/products/:key` | `ProductDetailView` — hero, media gallery, features, ESA Lite CTA |
| 404 | `NotFoundView` |
| Contact `/contact` | `ContactView` — form to support@dts-eg.com + Mail Box Lottie on success |
| Chrome | `AppLoader` + `MainLayout` (`SiteBackground`, `AppHeader`, `AppFooter`) + `WhatsAppFloat` |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | Product tabs teaser (links through to `/products/:key`) |
| `#services` | Top 3 services + e-signature highlight |
| `#about` | Stats + “trusted by” CTA band |
| `#contact` | Replaced by `/contact` |

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
| Contact | Live `/contact` form; footer Support/Sales emails reveal on click |
| WhatsApp float | Live — `https://wa.me/201050992817` (same as DTS-WEB) |

## Media drop paths

- `public/images/Products/media/{ess,ers,esa}/`
- `public/videos/{ess,ers,esa}/`
- Wire paths in `src/data/products.js` (`gallery` + ESA `liteDownloadUrl`)

## Future routes (wave 03 remainder)

`/services` (Home already CTAs here). About may stay a hash.
