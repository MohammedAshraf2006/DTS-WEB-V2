# DTS Web

موقع تسويقي (Marketing SPA) لشركة **DTS (Digital Transformation Services)** — بيعرض المنتجات (ESS / ERS / ESA)، الخدمات (فوترة، إيصالات، توقيع/ختم إلكتروني)، العملاء، الشركاء، وصفحة تواصل.

## التقنيات

| الطبقة | الاختيار |
|---|---|
| UI | Vue 3 (`<script setup>`) |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + CSS variables (`src/assets/colors.css`) |
| Routing | vue-router 4 |
| i18n | vue-i18n 9 (عربي/إنجليزي، RTL/LTR تلقائي) |
| اللغة | JavaScript (من غير TypeScript) |
| الحالة | من غير Pinia — composables + `localStorage` |
| النشر | GitHub Pages (ملفات `dist` الثابتة) خلف Cloudflare على `dts-eg.com` |

## التشغيل

```bash
npm install
npm run dev      # localhost:5173
npm run build    # ينتج dist/ للنشر
npm run preview  # يعاين نسخة الـ build محليًا
```

القياس المباشر (من غير GTM):

- GA4: `G-EY2GF14XJ0` (`VITE_GA4_MEASUREMENT_ID`)
- Meta Pixel: `1763152844965514` (`VITE_META_PIXEL_ID`)
- `VITE_GTM_ID` فاضي — لو اتحط، GTM بيمسك التاجز وما فيش حقن مباشر لـ GA4/Pixel
- `VITE_GSC_VERIFICATION` اختياري

أحداث التحويل: `click_whatsapp`، `click_call`، `generate_lead` (فورم التواصل)، `signature_lead` (فورم التوقيع). Pixel: `Contact` للواتساب/الاتصال و `Lead` للفورم. مقال خطأ 3008: `article_view_3008` (Pixel `ViewContent`)، `file_download_3008` (Pixel `DownloadFix` فقط)، `copy_code_3008`. أيقونات التواصل: `click_social`.

## هيكل المشروع

راجع `docs/architecture/structure.md` للتفاصيل الكاملة. باختصار:

- `src/views/` — صفحات كل route
- `src/components/` — عناصر مشتركة + مجلدات لكل قسم (home/, services/, products/, contact/...)
- `src/composables/` — منطق قابل لإعادة الاستخدام (theme, scroll reveal, card tilt...)
- `src/services/contact.js` — إرسال الفورمات (FormSubmit + fallback mailto)
- `src/locales/{ar,en}/` — ملفات الترجمة، ملف منفصل لكل قسم
- `src/router/index.js` — كل الـ routes بتتحمّل lazy (`() => import(...)`) ما عدا الهوم

## نقاط تواصل مهمة (Emails)

| الاستخدام | الإيميل |
|---|---|
| فورم صفحة "تواصل معنا" (`/contact`) | `sales@dts-eg.com` |
| فورم "اطلب توقيعك الإلكتروني" (`/services/signature`) | `tawqe3y_10thoframdan@dts-eg.com` |
| المبيعات (فوتر) | `sales@dts-eg.com` |
| الدعم الفني (فوتر) | `support@dts-eg.com` |

كل الفورمات بتحاول الإرسال أول حاجة عبر FormSubmit، ولو فشلت بترجع لـ `mailto:` كـ fallback.

## الأداء وتحمّل عدد الزوار

الموقع **Static SPA** بالكامل (مفيش سيرفر بيرندر أو يعالج كل request) — بعد الـ build، الناتج ملفات ثابتة (HTML/CSS/JS) بتتنشر على GitHub Pages، والدومين `dts-eg.com` بيمر من Cloudflare. بعد البناء، سكربت `scripts/emit-route-html.mjs` ينسخ `index.html` لكل مسار عام عشان الرابط يرجع HTTP 200 من غير JavaScript. ده مهم لأن:

- **قدرة التحمل مش مرتبطة بكود الموقع** — GitHub Pages و Cloudflare بيوزّعوا الملفات عبر CDN، فكل زائر بياخد نسخة من أقرب نقطة ليه، والعدد اللي الموقع يقدر يستحمله في نفس الوقت بيبقى كبير جدًا افتراضيًا (آلاف الزوار المتزامنين من غير أي تعديل) — مفيش قاعدة بيانات أو backend بيتلامس مع كل request.
- الحاجة الوحيدة اللي فيها اعتماد على خدمة خارجية هي **FormSubmit** (بترسل الفورمات) — دي بتاخد حمل الإرسال بره الموقع، فمش بتأثر على سرعة تصفح باقي الصفحات حتى لو فيه زحمة إرسال فورمات.
- الكود بالفعل معمول بيه **code splitting على مستوى الصفحات** (`router/index.js`) — كل صفحة (services, contact, products...) بتتحمّل بس وقت ما حد يزورها، مش كلها مع بعض من أول تحميل.
- فيه `manualChunks` في `vite.config.js` بيفصل مكتبات Vue الأساسية في bundle منفصل عن كود الموقع، يحسّن الكاش للزيارات المتكررة.

**خلاصة:** بالنسبة للعدد المتوقع حاليًا (مش كبير)، مفيش أي تعديل مطلوب على مستوى الكود أو الاستضافة — البنية الحالية (Static + CDN على GitHub Pages خلف Cloudflare) قادرة تستحمل عدد أكبر بكتير من غير أي تغيير. لو الترافيك زاد بشكل كبير مستقبلًا، النقاط اللي ممكن نراجعها وقتها:
1. حجم الصور في `public/images/` (تحويلها لـ WebP لو لسه مش كله محول)
2. مراجعة استخدام Vanta.js/Three.js في الهيرو (بيتحمّل من CDN خارجي لكل زائر — ممكن نستبدله بخلفية أخف لو أثّر على سرعة أول تحميل)
3. Rate limit بتاع FormSubmit لو حجم الفورمات زاد جدًا (وقتها ممكن نحتاج backend endpoint خاص بينا بدل الاعتماد على خدمة مجانية)

## التوثيق التفصيلي

- `docs/architecture/overview.md` — الـ stack والـ system boundaries
- `docs/architecture/structure.md` — هيكل الملفات والـ routes بالتفصيل
- `docs/architecture/i18n-routing-theme.md` — تفاصيل الترجمة والراوتنج والثيم
- `plans/status.md` — حالة تنفيذ المشروع الحالية (Waves)
