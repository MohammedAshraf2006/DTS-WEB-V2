# Content sources

## In-repo (canonical for V2 UI)

| Source | Role |
|--------|------|
| `src/locales/ar/*.json` | Arabic UI strings |
| `src/locales/en/*.json` | English UI strings |
| `public/images/` | Logos, clients, partners, product art |
| `src/assets/colors.css` | Brand tokens |

Namespaces today: `common`, `home`, `products`, `contact`, `services`. Add one JSON pair per new page/section namespace.

### Notable asset paths

| Path | Use |
|------|-----|
| `public/images/DTS.png` | Header / loader / footer brand mark |
| `public/images/Products/{ess,ers,esa}-logo.png` | Tabs, header, listing, detail |
| `public/images/Products/media/{ess,ers,esa}/` | Product screenshots |
| `public/videos/{ess,ers,esa}/` | Product explainers |
| `public/images/clients/*.png` | TrustBar (partial fill today) |
| `public/animations/mail-box.json` | Contact form success Lottie |
| `public/images/services/*.svg` | Services page 3D-style icons |

Product media is wired in `src/data/products.js` (`gallery` items: `type`, `src`, optional `poster`). Empty `src` keeps the placeholder. ESA Lite installer URL: `productsCatalog.esa.liteDownloadUrl`.

Buyer-facing product copy comes from what the apps actually do (do not copy their UI):

| Product | Source (intent only) |
|---------|----------------------|
| ESS | `C:\Users\PC\Desktop\ESS-Legacy\ess-front-web` |
| ERS | `C:\Users\PC\Desktop\ers-web` |
| ESA | `C:\Users\PC\Desktop\ESS-Legacy\esa-agent` |

Locales: `home.products.tabs.*` (short home teaser) vs `products.items.*` (listing `shortDescription` + detail `description` / `features`).

## External reference (intent only)

Path: `C:\Users\PC\Desktop\DTS-WEB`

Use for:

- Section/product/service wording parity checks
- Partner/client asset inventory
- WhatsApp / contact link verification before shipping
- Legacy deploy hints (`public/CNAME`, GitHub Pages workflow)
- Loader / splash product intent (ported as V2 `AppLoader`)

Do **not** copy:

- Custom `useLanguage` composable
- Per-section CSS tree
- Broken paths / archive components

## Archived docs in this repo

`docs/archive/` holds old redesign guides, root build plans, and legacy locale dumps. Historical only — prefer live locales and this `docs/business` tree.
