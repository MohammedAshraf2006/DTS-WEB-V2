# Content sources

## In-repo (canonical for V2 UI)

| Source | Role |
|--------|------|
| `src/locales/ar/*.json` | Arabic UI strings |
| `src/locales/en/*.json` | English UI strings |
| `public/images/` | Logos, clients, partners, product art |
| `src/assets/colors.css` | Brand tokens |

Namespaces today: `common`, `home`. Add one JSON pair per new page/section namespace.

### Notable asset paths

| Path | Use |
|------|-----|
| `public/images/DTS.png` | Header / loader / footer brand mark |
| `public/images/Products/{ess,ers,esa}-logo.png` | Product tabs + hero floating cards |
| `public/images/clients/*.png` | TrustBar (partial fill today) |
| `public/images/partners/` | Reserved for partners section (not wired) |

Product media for `ProductTabs` is configured in-component (`productMedia`); drop files under `public/images/Products/media/` or `public/videos/` then set `type` + `src`.

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
