# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → StatsCta. Hero rotating pills and product logos link to `/products/ess`, `/products/ers`, `/products/esa`. |
| Products `/products` | `ProductsView` — three sculpted cards (ESS / ERS / ESA) |
| Product detail `/products/:key` | `ProductDetailView` — hero, media gallery, features, ESA Lite CTA |
| Services `/services` | `ServicesView` — 8 services with detail copy + 3D icons |
| Signature `/services/signature` | `SignatureServiceView` — توقيع/ختم panels + benefits + request form to `tawqe3y_10thoframdan@dts-eg.com` (WhatsApp `201050992816`) |
| Clients `/clients` | `ClientsView` — 10000+ highlight + 30 cards (logo, name, industry). Names/industries live in locale JSON. Stories later. |
| Partners `/partners` | `PartnersView` — stacked cards (FEDIS, Tawqe3y, MTS, plus certified accountant offices). Visit-site CTA only when a partner has a URL. |
| 404 | `NotFoundView` |
| Contact `/contact` | `ContactView` — form to `sales@dts-eg.com` + Mail Box Lottie on success |
| Chrome | `AppLoader` + `MainLayout` (`SiteBackground`, `AppHeader` with mobile menu at header end and side drawer from the same side, `AppFooter`) + `WhatsAppFloat` |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | Product tabs teaser (links through to `/products/:key`) |
| `#services` | Top 3 services + e-signature highlight |
| `#about` | Stats + “trusted by” CTA band |
| `#contact` | Replaced by `/contact` |

Nav **Products** → `/products` (mega menu). Nav **Services** → `/services` (mega menu). Nav **Clients** → `/clients` (no mega menu). Nav **Partners** → `/partners` (no mega menu).

## Target map (from reference + nav labels)

| Intent | V2 status |
|--------|-----------|
| Home / hero | Live |
| Services (home strip) | Live (`#services` teaser); full `/services` + `/services/signature` |
| Products listing | Live `/products` |
| Product detail | Live `/products/ess`, `/products/ers`, `/products/esa` (media placeholders until files are dropped) |
| About / numbers | Live as home `#about` (StatsCta); former About nav label is now **Clients** |
| Clients / trust | Live `/clients` (30 featured cards); Home `TrustBar` uses curated logos |
| Partners | Live `/partners` (tech partners + legal accountant offices; visit-site only if URL exists) |
| Contact | Live `/contact` form to `sales@dts-eg.com`; footer Support/Sales/E-signature emails reveal on click |
| WhatsApp float | Live — `https://wa.me/201050992817`; sits under the mobile sidebar when the menu is open |

## Media drop paths

- `public/images/Products/media/{ess,ers,esa}/`
- `public/videos/{ess,ers,esa}/`
- `public/images/services/*.svg` (service icons)
- Wire paths in `src/data/products.js` (`gallery` + ESA `liteDownloadUrl`)
- Services catalog: `src/data/services.js`
- Clients catalog: `src/data/clients.js` (logos under `public/images/clients/`)
- Partners catalog: `src/data/partners.js` (logos under `public/images/partners/`)

## Future routes

About may stay a hash (`#about`) on Home. Clients live at `/clients`. Client story routes are deferred.
