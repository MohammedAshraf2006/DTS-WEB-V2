# تحليل موقع Zapier — دليل تصميمي شامل
**آخر تحديث:** أغسطس 2026
**الغرض:** توثيق كامل بنية وتصميم موقع Zapier كمرجع لبناء موقع DTS الجديد

---

## 1️⃣ التايبوجرافي (Fonts & Typography)

### الفونتات الإنجليزية المستخدمة في Zapier:

#### Font 1: Söhne (Headings - مدفوع)
- **الاستخدام:** العناوين الكبيرة (H1, H2)
- **الأحجام:**
  - H1 (Hero Title): `48px - 56px` وزن `700-800`
  - H2 (Section Title): `36px - 42px` وزن `700`
  - H3: `24px - 28px` وزن `600`
- **الخصائص:** Grotesk عصري، خطوط نظيفة، spacing بين الحروف واسع قليلاً

#### Font 2: Inter (Body Text)
- **الاستخدام:** النصوص الأساسية والوصفات والأزرار
- **الأحجام:**
  - Body: `16px - 18px` وزن `400-500`
  - Small: `14px - 15px` وزن `400`
  - Labels: `12px - 13px` وزن `600`
- **الخصائص:** Font سانز سيريف نظيف جداً، عالي القراءة

### الفونت الموصى به للعربية:

#### الخيار الأفضل: **Tajawal** (Google Fonts)
- **الأوزان المتاحة:** 200, 300, 400, 500, 700, 800, 900
- **الاستخدام:**
  - H1 عربي: `Tajawal 700 | 48-56px`
  - H2 عربي: `Tajawal 700 | 36-42px`
  - Body عربي: `Tajawal 400 | 16-18px`
- **السبب:** تصميم حديث شبيه بـ Söhne، واضحة جداً، و geometric style

#### الخيار البديل: **Almarai** (Google Fonts)
- أكثر أنوثة قليلاً، نظيفة جداً
- مناسبة للواجهات الحديثة

#### Fallback: **Cairo** 
- للدعم في المتصفحات القديمة

---

## 2️⃣ نظام الألوان

### Dark Mode (الافتراضي في Zapier):

| العنصر | اللون | الكود |
|-------|------|------|
| Background (الخلفية الأساسية) | أسود عميق جداً | `#000000` أو `#0a0a0a` |
| Surface (الأسطح الثانوية) | رمادي غامق جداً | `#1a1a1a` - `#2a2a2a` |
| Text Primary (النص الأساسي) | أبيض خالص | `#ffffff` |
| Text Secondary (النص الثانوي) | رمادي فاتح | `#a0a0a0` - `#b0b0b0` |
| Primary Accent | برتقالي/أحمر | `#ff6b3a` أو `#ff5722` |
| Secondary Accent | رمادي فاتح | `#f5f5f5` |
| Borders | رمادي داكن جداً | `#333333` أو `#404040` |

### Light Mode:

| العنصر | اللون | الكود |
|-------|------|------|
| Background | أبيض | `#ffffff` |
| Surface | رمادي فاتح جداً | `#f9f9f9` - `#f5f5f5` |
| Text Primary | أسود | `#0a0a0a` - `#1a1a1a` |
| Text Secondary | رمادي | `#6a6a6a` - `#7a7a7a` |
| Borders | رمادي فاتح | `#e0e0e0` - `#efefef` |

---

## 3️⃣ تحليل أقسام صفحة Home

### القسم 1: Navigation Bar (الـ Header)

**البنية الأساسية:**
- Fixed header في الأعلى (position: fixed)
- Sticky background يظهر عند scroll (transparent في البداية)
- ارتفاع ~70px

**المكونات:**
1. **Logo (يسار):** 
   - حجم: ~40px عرض
   - Clickable يودّي للـ Home
   
2. **Menu الرئيسي (وسط):**
   - مقسم لـ 3 أقسام: Products | Solutions | Resources
   - Mega Dropdown menu:
     - Products: 4 عناصر (Workflows, MCP, SDK, Tables)
     - Solutions: 8 عناصر مقسمة لـ 2 column
     - Resources: روابط عادية بسيطة
   - Font: Inter 14px وزن 600
   
3. **Action Buttons (يمين):**
   - Sign In (نص فقط)
   - Contact Sales (زر)
   - CTA Button (أورانچ)

**الأنيميشن:**
- Hover على menu يظهر Dropdown بـ fade + slide down
- Background يتغير عند scroll (blur effect + background color)

---

### القسم 2: Hero Section

**البنية:**
- Full viewport height تقريباً (90vh)
- 2-column layout: يسار نص، يمين فيديو/صورة

**النص (يسار):**
- **Heading:**
  - Font: Söhne 48-56px وزن 800
  - Line height: 1.2
  - Content: "Your tools. Your rules. Any AI."
  
- **Subheading:**
  - Font: Inter 18px وزن 400
  - Color: رمادي فاتح
  - Max width: 500px
  - Line height: 1.6
  
- **Badge (فوق الـ Heading):**
  - Small text: "AI automation, governed"
  - Font: Inter 12px وزن 600
  - Background: semi-transparent
  - Border: 1px subtle
  
- **Buttons:**
  - Primary CTA: "Start free with email" (برتقالي)
  - Secondary: "Start free with Google" (رمادي)
  - Padding: 12-16px 24-32px
  - Border radius: 6-8px

**الصورة (يمين):**
- Video or Interactive Demo
- Aspect ratio: 16:9 تقريباً
- Border radius: 8-12px
- Shadow: subtle box-shadow

**الأنيميشن:**
- Fade in من الأعلى (0.8s)
- Staggered delay (0.1s بين كل عنصر)

---

### القسم 3: Trust Bar (Social Proof)

**البنية:**
- Full width bar
- أفقي centered
- Padding: 40-60px عمودي

**المحتوى:**
- **Label:** "Trusted by the world's best companies"
  - Font: Inter 12px وزن 600
  - Text transform: none
  - Color: رمادي
  
- **Logos:**
  - عدد: 5-8 شركات
  - عرض كل logo: max 130px
  - Grayscale بشكل default
  - Full color عند Hover
  - Gap بينهم: 40-60px

**الأنيميشن:**
- Transition على color عند hover: 0.3s

---

### القسم 4: Main Features Grid

**البنية:**
- Responsive grid: 
  - Desktop: 3-4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Gap: 24-32px
- Max width: 1200px centered

**كل بطاقة (Card):**
- **Header:**
  - Icon: 40-48px
  - Icon color: برتقالي (accent)
  - Icon background: شبه شفاف
  
- **Title:**
  - Font: Söhne 18px وزن 700
  
- **Description:**
  - Font: Inter 15px وزن 400
  - Color: رمادي فاتح
  - Line height: 1.6
  
- **Visual:**
  - Video صغير أو screenshot
  - Aspect ratio: 16:9
  - Border radius: 8px

**البنية الداخلية:**
- Padding: 24-32px
- Background: شبه شفاف أو solid رمادي داكن جداً
- Border: 1px subtle
- Border radius: 12px

**الأنيميشن:**
- Hover: translateY(-4px) + shadow بيزداد
- Transition: 0.3s ease

---

### القسم 5: Statistics/Numbers Section

**البنية:**
- 3-4 أرقام كبيرة متجنب بجانب بعض
- Center aligned
- Padding: 60-80px عمودي

**كل إحصائية:**
- **الرقم:**
  - Font: Söhne 48-64px وزن 800
  - Color: برتقالي أو أبيض
  
- **Label:**
  - Font: Inter 14px وزن 500
  - Color: رمادي
  - Margin top: 8-12px

---

### القسم 6: CTA Section (Call To Action)

**البنية:**
- Full width
- Center aligned
- Padding: 60-100px عمودي

**المحتوى:**
- **Heading:**
  - Font: Söhne 42-48px وزن 800
  - Content: "Go from AI experiments to real results"
  
- **Subheading:**
  - Font: Inter 18px وزن 400
  - Content: وصف قصير 1-2 جملة
  
- **Button:**
  - Primary CTA بحجم كبير
  - Padding: 16px 40px
  - Font: Inter 16px وزن 700

**الأنيميشن:**
- Fade in عند scroll

---

### القسم 7: Footer

**البنية:**
- 4-5 أعمدة
- Dark background
- Padding: 60px عمودي، 40px أفقي

**الأعمدة:**
1. **Company Info:**
   - Logo صغير
   - الوصف
   - Social links
   
2. **Products:**
   - قائمة روابط
   - Font: Inter 14px
   - Hover: color change
   
3. **Solutions:**
   - قائمة روابط
   
4. **Resources:**
   - روابط
   
5. **Contact:**
   - Email
   - Subscribe form

**Bottom Bar:**
- Copyright
- Compliance badges (SOC 2, GDPR, etc.)
- إرتفاع: 40px
- Border top: 1px subtle

---

## 4️⃣ نظام الـ Spacing

### Vertical Spacing (الفراغات العمودية):
- Between sections: 80-120px
- Within section: 40-60px
- Between elements: 16-24px
- Tight: 8px

### Horizontal Padding:
- Container: 40px على الأطراف (desktop)
- Mobile: 20px على الأطراف

---

## 5️⃣ الأنيميشنات الرئيسية

1. **Scroll Animations:**
   - Fade in من الأسفل (translateY)
   - Duration: 0.8s
   - Delay: staggered 0.1-0.2s

2. **Hover Effects:**
   - Button: translateY(-2px) + shadow
   - Card: translateY(-4px) + shadow بيزداد
   - Link: color change + underline

3. **Page Load:**
   - Hero elements: fade in من الأعلى
   - Duration: 0.6-1s

---

## 6️⃣ Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

**التغييرات:**
- Grid columns تقل
- Font sizes تصغّر قليلاً
- Padding/Margin تقل
- Hero يصير single column

---

## 7️⃣ اللوجيك والتفاعلات

### Navigation:
- عند scroll لأسفل: header يكتسب background
- Mega dropdown: hover + click (mobile)
- Smooth scroll to anchor

### Buttons:
- Primary: hover يزيد shadow
- Secondary: hover يتغير border color

### Forms:
- Input: focus بيغيّر border color
- Placeholder: رمادي فاتح
- Error state: أحمر

### Mobile Menu:
- Hamburger icon يظهر في < 768px
- Slide menu من الجنب
- Overlay dark في الخلفية

---

## 8️⃣ البنية الـ CSS الموصى بها

```
Color System → Theme Variables
├── Dark Mode
│   ├── Background: #000000
│   ├── Surface: #1a1a1a
│   └── Text: #ffffff
└── Light Mode
    ├── Background: #ffffff
    ├── Surface: #f9f9f9
    └── Text: #0a0a0a

Typography System
├── Font Families
├── Font Sizes (Scaling)
└── Line Heights

Spacing System
├── Vertical (80, 60, 40, 24, 16, 8)
└── Horizontal (40, 24, 16, 8)

Component Styles
├── Buttons
├── Cards
├── Forms
└── Navigation

Animations
├── Transitions
├── Keyframes
└── Motion Values
```

---

## الخلاصة

موقع Zapier هو **نموذج احترافي جداً** من حيث:
- **التصميم:** بسيط وعصري وواضح
- **الفونتات:** Söhne + Inter (اختيار احترافي)
- **الألوان:** Dark mode كـ default، تباين عالي، استخدام برتقالي كـ accent
- **الأنيميشنات:** موازنة كاملة بين الجاذبية والأداء
- **اللوجيك:** واضح والمستخدم يفهم ده أول لما يفتح الموقع
