# Crawlers and AI assistants

**Host:** GitHub Pages (`dist/` published for `dts-eg.com`; `CNAME` in the repo).  
Deploy: `.github/workflows/deploy.yml` builds `dist/` and publishes GitHub Pages.  
**Domain:** `dts-eg.com` (`CNAME` in the repo and `public/CNAME`; Pages custom domain).

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

## Googlebot HTTP 403 (Search Console)

Origin checks with a Googlebot user-agent from outside Cloudflare’s bot IP lists return **200** for `/`, `/contact/`, `/robots.txt`, and `/sitemap.xml`. The site has no consent wall and `robots.txt` does not disallow Googlebot. A 403 that only Search Console sees is applied at **Cloudflare** (Bot Fight Mode, Super Bot Fight Mode, or a WAF rule), not by the GitHub Pages files.

On the Cloudflare dashboard for `dts-eg.com`:

1. Security → Bots: turn off Bot Fight Mode, or set Super Bot Fight Mode so **verified bots** (Googlebot) are allowed.
2. Security → WAF: remove any challenge/block that matches Googlebot or Google’s published IP ranges.
3. Recheck the affected URLs with URL Inspection, then resubmit `https://dts-eg.com/sitemap.xml`.

Redeploying this repo does not change that Cloudflare setting.

## Deep links

Public routes are emitted as real files (`dist/products/index.html`, `dist/contact/index.html`, and the same for the other sitemap URLs) with a per-route title, description, canonical link, and Arabic body copy (home, products, services, partners, clients, contact, knowledge index, plus full article HTML). A crawler that does not run JavaScript still receives HTTP 200 and that text. Unknown paths keep using `public/404.html`, which is an HTTP 404.
