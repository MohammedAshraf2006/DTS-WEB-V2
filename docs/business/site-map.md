# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView`: Hero → TrustBar → ProductTabs → ServicesGrid → ArticlesTeaser. |
| Products `/products` | `ProductsView` — ESS featured + ESA complement; ERS stays on its detail route |
| Product detail `/products/:key` | `ProductDetailView` — hero, media gallery, features, ESA Lite CTA |
| Services `/services` | `ServicesView` — 8 services with detail copy + 3D icons |
| Signature `/services/signature` | `SignatureServiceView` — signature/seal panels + request form to `tawqe3y_10thoframdan@dts-eg.com` |
| Knowledge `/knowledge` | `KnowledgeHubView` — category tabs + article cards |
| Knowledge article `/knowledge/:slug` | `KnowledgeArticleView` — article body, dates, related cards (no sidebar) |
| ITIDA 3008 fix `/fix-error-3008-itida-websign` | Same article layout, plus the step video and `Fix-ITIDA-WebSign.bat` download. Featured on the home articles block and the knowledge hub. |
| Clients `/clients` | `ClientsView` — featured client cards (logo, name, industry). No public client-count claim. |
| Partners `/partners` | `PartnersView` — stacked cards (FEDIS, Tawqe3y, MTS, TAXES WORLD, plus certified accountant offices). Visit-site CTA only when a partner has a URL. |
| 404 | `NotFoundView` |
| Contact `/contact` | `ContactView` — form to `sales@dts-eg.com`; mailto is shown only if FormSubmit fails |
| Chrome | `AppLoader` + `MainLayout` (`SiteBackground`, `AppHeader` with mobile menu at header end and side drawer from the same side, `AppFooter`) + `WhatsAppFloat` |

### Home / footer anchors

| Id | Section |
|----|---------|
| `#products` | ESS panel, ESA complement, ERS cashier-receipts link |
| `#services` | Top 3 services + e-signature highlight |
| `#articles` | Home knowledge teaser (three stacked cards). An article published within the last 7 days uses the featured treatment and the New label, then returns to a plain card. |
| `#contact` | Replaced by `/contact` |

Nav **Products** → `/products` (mega menu). Nav **Services** → `/services` (mega menu). Nav **Clients** → `/clients` (no mega menu). Nav **Partners** → `/partners` (no mega menu).

## Target map (from reference + nav labels)

| Intent | V2 status |
|--------|-----------|
| Home / hero | Live |
| Services (home strip) | Live (`#services` teaser); full `/services` + `/services/signature` |
| Products listing | Live `/products` |
| Product detail | Live `/products/ess`, `/products/ers`, `/products/esa` (media placeholders until files are dropped) |
| About / numbers | Unpublished marketing counts stay off the site until wording is locked. Footer hours: Sunday–Thursday, 9:00 AM to 5:00 PM |
| Clients / trust | Live `/clients` (featured cards); Home `TrustBar` uses curated logos |
| Partners | Live `/partners` (tech partners + legal accountant offices; visit-site only if URL exists) |
| Contact | Live `/contact` form to `sales@dts-eg.com`; footer Support/Sales/E-signature emails reveal on click. Contact and footer also link WhatsApp, Facebook, LinkedIn, and Instagram |
| Social profiles | Footer strip and contact “Follow us”: `https://wa.me/201050992816`, `https://www.facebook.com/DTS.EGYPT22`, `https://www.linkedin.com/company/dtsegypt22`, `https://www.instagram.com/dts.egypt/` |
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
