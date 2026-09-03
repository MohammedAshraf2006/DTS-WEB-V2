# Wave 05 — Quality and launch

**Status:** pending

## Goal

Production readiness: RTL/LTR QA, performance, assets, basic SEO, deploy alignment.

## Expected scope

- Cross-cutting fixes in `src/`, `index.html`, `public/`
- Deploy config (e.g. GitHub Pages + `CNAME`) if chosen host matches reference
- Doc hygiene (canonical `docs/` + `plans/` only)

## Tasks

1. RTL/LTR, performance, assets, basic SEO pass
2. Deploy alignment vs reference host/domain
3. Confirm archive docs remain non-canonical
4. Origin crawler files on GitHub Pages (`robots.txt` allow AI, `sitemap.xml`, `llms.txt`) — **Cloudflare proxy on dts-eg.com still injects managed robots.txt**; disable that overlay or grey-cloud DNS (see `docs/architecture/crawlers.md`)

## Test criteria

- `npm run build` clean
- Spot-check AR/EN + dark/light on key pages
- Deploy preview or Pages path verified if configured

## Post-close docs

- Final pass on `plans/status.md` (all waves done)
- Note launch outcome in this file
