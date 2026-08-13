# Content sources

## In-repo (canonical for V2 UI)

| Source | Role |
|--------|------|
| `src/locales/ar/*.json` | Arabic UI strings |
| `src/locales/en/*.json` | English UI strings |
| `public/images/` | Logos, clients, partners, product art |
| `src/assets/colors.css` | Brand tokens |

Namespaces today: `common`, `home`. Add one JSON pair per new page/section namespace.

## External reference (intent only)

Path: `C:\Users\PC\Desktop\DTS-WEB`

Use for:

- Section/product/service wording parity checks
- Partner/client asset inventory
- WhatsApp / contact link verification before shipping
- Legacy deploy hints (`public/CNAME`, GitHub Pages workflow)

Do **not** copy:

- Custom `useLanguage` composable
- Per-section CSS tree
- Broken paths / archive components

## Archived docs in this repo

`docs/archive/` holds old redesign guides, root build plans, and legacy locale dumps. Historical only — prefer live locales and this `docs/business` tree.
