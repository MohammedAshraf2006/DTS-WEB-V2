Add a new article to the DTS-WEB Vue project's knowledge center (/knowledge). Follow the EXACT pattern used by the existing knowledge articles (same data file/array or markdown loader, same page component, layout, styles, RTL Arabic, breadcrumbs, related-articles behaviour). Inspect the existing articles first and mirror them; do not invent a new structure.

Article:
- Slug: `itida-websign-error-3008-fix` → URL `/knowledge/itida-websign-error-3008-fix/` (trailing slash, canonical `https://dts-eg.com/knowledge/itida-websign-error-3008-fix/`).
- Content: use the Arabic text from the attached `article.md` verbatim (headings, lists, FAQ). Date: 2026-10-27. Category consistent with existing e-invoice / digital signature articles.
- SEO title: `حل مشكلة WebSign خطأ 3008 Error in verifying License | DTS`
- Meta description: `برنامج توقيع الفاتورة الإلكترونية WebSign طلّع رسالة 3008؟ نزّل ملف الحل من DTS وشغّله وجرّب التوقيع تاني في أقل من دقيقة.`
- Add Open Graph/Twitter tags like other articles (og:image: use `/images/itida-websign-fix-cover.png`).

Assets (I will place them; reference these paths):
- `public/videos/itida-websign-fix.mp4` — embed near the top with `<video controls playsinline preload="metadata" poster="/images/itida-websign-fix-cover.png">`, responsive (max-width ~420px centered, it is vertical 9:16).
- `public/images/itida-websign-fix-cover.png` — poster/og image.
- `public/downloads/Fix-ITIDA-WebSign.bat` — add a prominent, brand-styled download button (navy #0B2A4A / cyan #22E6F2) near the top AND again after the steps: text `حمّل ملف الحل (Fix-ITIDA-WebSign)`, `<a href="/downloads/Fix-ITIDA-WebSign.bat" download>`. Fire the existing analytics helper with a new event `download_fix` (GA4) if the tracking module supports custom events; don't break existing events.
- Add a WhatsApp CTA using the site's existing WhatsApp button/component with number 01050992816 (existing `click_whatsapp` tracking).

FAQ: render the "أسئلة شائعة" section as the site's FAQ/accordion pattern if one exists, and add FAQPage JSON-LD plus Article JSON-LD (same way other pages add structured data).

Routing / build:
- Add the route to the prerender routes list and to `sitemap.xml` generation (trailing slash, lastmod 2026-10-27).
- Add the article to the /knowledge listing (newest first).
- Make sure `.bat` is served as a download (if hosting needs it, nothing else to change; just keep it in public/downloads).

Then run the build, verify the prerendered HTML exists for the new route with correct title/description/canonical, and list changed files. Don't commit; I'll review.
