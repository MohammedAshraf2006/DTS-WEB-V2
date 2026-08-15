# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta |
| Products `/products` | `ProductsView` — three sculpted cards (ESS / ERS / ESA) |
| Product detail `/products/:key` | `ProductDetailView` — hero, media gallery, features, ESA Lite CTA |
| Services `/services` | `ServicesView` — 8 services with detail copy + 3D icons |
| Signature `/services/signature` | `SignatureServiceView` — توقيع/ختم panels + benefits + request form to `tawqe3y_10thoframdan@dts-eg.com` (WhatsApp `201050992816`) |
| 404 | `NotFoundView` |
| Contact `/contact` | `ContactView` — form to `sales@dts-eg.com` + Mail Box Lottie on success |
| Chrome | `AppLoader` + `MainLayout` (`SiteBackground`, `AppHeader`, `AppFooter`) + `WhatsAppFloat` |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | Product tabs teaser (links through to `/products/:key`) |
| `#services` | Top 3 services + e-signature highlight |
| `#about` | Stats + “trusted by” CTA band |
| `#contact` | Replaced by `/contact` |

Nav **Products** → `/products`. Nav **Services** → `/services`. Partners still → `/#partners` (section not implemented yet).

## Target map (from reference + nav labels)

| Intent | V2 status |
|--------|-----------|
| Home / hero | Live |
| Services (home strip) | Live (`#services` teaser); full `/services` + `/services/signature` |
| Products listing | Live `/products` |
| Product detail | Live `/products/ess`, `/products/ers`, `/products/esa` (media placeholders until files are dropped) |
| About / numbers | Live as `#about` (StatsCta) |
| Clients / trust | Partial — `TrustBar` with 2 logos; more URLs/assets pending |
| Partners | Missing section (`public/images/partners` available) |
| Contact | Live `/contact` form to `sales@dts-eg.com`; footer Support/Sales emails reveal on click |
| WhatsApp float | Live — `https://wa.me/201050992817` (same as DTS-WEB) |

## Media drop paths

- `public/images/Products/media/{ess,ers,esa}/`
- `public/videos/{ess,ers,esa}/`
- `public/images/services/*.svg` (service icons)
- Wire paths in `src/data/products.js` (`gallery` + ESA `liteDownloadUrl`)
- Services catalog: `src/data/services.js`

## Future routes

About may stay a hash (`#about`).
