# Wave 06 — Public trust and product spine

**Status:** done

## Goal

Ship the email changes on the current stack: freeze unlocked marketing numbers, order ESS then ESA then a quiet ERS, publish NAP hours, return HTTP 200 for public routes, then three hero doors, a Markdown knowledge center, basic SEO, and honest form delivery.

## Tasks

- [x] Remove the home stats band, the clients count-up, and the unused Mezo badge strings
- [x] Home, listing, and header show ESS first, ESA as the signing complement, ERS as a quiet link
- [x] Footer hours: Sunday–Thursday, 9:00 AM to 5:00 PM
- [x] `scripts/emit-route-html.mjs` writes a shell per public route with title, description, and canonical
- [x] README and architecture docs name GitHub Pages + Cloudflare, and the contact form inbox `sales@dts-eg.com`
- [x] Hero doors: signature, procedures (`/knowledge`), quiet ESS
- [x] `content/knowledge/{ar,en}` compiled with `markdown-it` into `/knowledge` and `/knowledge/:slug` (six articles, card grid, covers)
- [x] Per-route SEO plus LocalBusiness hours; forms name the inbox and expose mailto only when FormSubmit fails

## Test criteria

- `npm run build` writes `dist/<route>/index.html` for public routes
- Arabic and English, light and dark, on home, products, knowledge, and contact
- Static file server returns 200 for `/products` and `/contact`, and 404 for an unknown path

## Follow-on (19 Oct 2026)

Hero is the two original CTAs. Knowledge is a news-style hub plus standalone articles. Developer audit items in repo: trailing-slash canonical/sitemap, crawler H1, OG/schema, hreflang ar + x-default, receipt articles, env-gated analytics + `.env.example`, short loader, 404 noindex, partners/clients, contact `?service=`, WhatsApp text. Owner still holds: analytics IDs, Meta .net URL, `/en` routes, signature inbox rename, ESA SHA-256 after code-sign, Cloudflare managed robots.
