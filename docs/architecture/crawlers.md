# Crawlers and AI assistants

**Host:** GitHub Pages (`./dist` via `.github/workflows/deploy.yml`).  
**Domain:** `dts-eg.com` (`CNAME` in the repo; Pages custom domain).

Traffic to `https://dts-eg.com` is still proxied by **Cloudflare DNS** (orange-cloud). Pages serves `robots.txt` from `public/`; Cloudflare can **rewrite** that response before the crawler sees it.

Origin files in `public/` (copied into `dist/` on build):

| File | Role |
|------|------|
| `robots.txt` | Allow public crawlers, including GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, PerplexityBot |
| `sitemap.xml` | Canonical public routes on `https://dts-eg.com` |
| `llms.txt` | Short product map for AI assistants |

Live `https://dts-eg.com/robots.txt` currently prepends **Cloudflare Managed content** with `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, Bytespider, CCBot, and meta-externalagent. GitHub Pages does not add that block.

## What to change (not in this repo)

GitHub Pages settings cannot turn off that overlay. Do one of:

1. **Cloudflare dashboard** for `dts-eg.com`: disable **AI Crawl Control** / managed robots.txt / “block AI crawlers”. Recheck `https://dts-eg.com/robots.txt` until `# BEGIN Cloudflare Managed content` is gone.
2. Or set the domain DNS record to **DNS only** (grey cloud) so visitors hit GitHub Pages directly. Then origin `robots.txt` is what crawlers get.

Until then, pushing to `main` and redeploying Pages will not unblock ChatGPT or Claude fetchers.

## SPA caveat

The site is a Vue SPA. Assistants that execute JavaScript see full pages. Assistants that only fetch HTML still get `index.html` plus `noscript` links, `llms.txt`, and `sitemap.xml`. Deep links on Pages use `public/404.html` (SPA fallback); crawlers that treat HTTP 404 as final may miss those URLs even when `robots.txt` allows them.
