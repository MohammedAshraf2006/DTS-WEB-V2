# Product

## Who

**DTS — Digital Transformation Services** (Egypt). Marketing site for tax-linked digital solutions and related services.

## What the site sells / presents

Primary product family (buyer copy taken from what the live apps do):

| Code | What it is | Who it is for |
|------|------------|----------------|
| ESS | Browser **Electronic Sales System**: e-invoices + e-receipts, master data, ETA portal view, multi-company / branches / POS / users. Legal signing via ESA on the PC. | Companies that need both invoices and receipts with tax submit/track |
| ERS | Browser **POS e-receipts** only (no invoice cycle): cashier sales/returns, POS devices, thermal print, daily sales board | Retail / cashier lanes |
| ESA | Windows **signature agent**: USB token (e-signature / e-seal), PIN in RAM only, local link to ESS, expiry alerts | Any issuer who must legally sign before ETA |

Home `#products` uses short teaser copy (`home.products.tabs`). Listing cards use `products.items.*.shortDescription`. Detail `/products/:key` uses the longer description + features.

ESA Lite: installer URL is set on `esa.liteDownloadUrl` in `src/data/products.js`. Detail page CTA: request the product; ESA also has “try the free Lite version”.

## Audience

Businesses needing compliance and digital document workflows in Egypt (sales, partners, existing clients browsing trust and product info).

## Domains / contact (from live `common` locale)

- Technical support: `support@dts-eg.com` (footer: revealed on click)
- Sales: `Info@dts-eg.com` (footer: revealed on click)
- Contact form `/contact` posts to `support@dts-eg.com`
- Phones and address live under `common.footer.*`
- WhatsApp float: `https://wa.me/201050992817` (verified from DTS-WEB)
- Public reference site/domain intent: `dts-eg.com`

## Visual / brand notes (V2)

- Palette source of truth: `src/assets/colors.css`
- Light: navy `#050D1E`, teal `#23B8C1`, deep teal `#0B5F75`, blue `#1B739F`
- Dark: very dark royal navy `#050A18` + electric cyan `#00E8F0`
- Site atmosphere: animated starfield (`SiteBackground`); light mode uses subtle brand glows
- First visit: `AppLoader` splash with DTS logo

## Reference vs V2

- **Site chrome / historic marketing:** `C:\Users\PC\Desktop\DTS-WEB`
- **Product meaning for ESS / ERS / ESA copy:** the live apps (`ESS-Legacy\ess-front-web`, `ers-web`, `ESS-Legacy\esa-agent`) — intent only, do not copy their UI
- **Implementation:** this V2 repo only
