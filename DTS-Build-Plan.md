# خطة بناء موقع DTS الجديد من الصفر
**البدء:** أغسطس 2026
**النهاية المتوقعة:** تاريخ محدد (يعتمد على السرعة)
**التقنيات:** Vue 3 + Vite + Tailwind CSS + JavaScript

---

## 🎯 الرؤية العامة

بناء موقع DTS الجديد من الصفر بنفس **هيكل وتصميم Zapier تماماً**، لكن بـ:
- محتوى وألوان DTS الخاصة
- أقسام مخصصة لمنتجات DTS (ESS, MTS, ERS, ESA)
- دعم كامل للعربية والإنجليزية
- أداء عالي وسهولة استخدام

---

## 📋 المراحل الكبرى

```
المرحلة 1: الإعداد والبنية الأساسية
    ↓
المرحلة 2: نظام التصميم (Design System)
    ↓
المرحلة 3: بناء الصفحة الرئيسية
    ↓
المرحلة 4: صفحات المنتجات والخدمات
    ↓
المرحلة 5: الصفحات الفرعية (About, Contact, etc.)
    ↓
المرحلة 6: الاختبار والتحسينات
```

---

# 🚀 المرحلة 1: الإعداد والبنية الأساسية

## الخطوة 1.1: حذف كل شيء قديم

### ماذا تحذف:
```
src/
  ├── views/          ← حذف كل الملفات
  ├── components/     ← حذف كل الملفات
  ├── assets/styles/  ← حذف كل الملفات
  └── composables/    ← احتفظ فقط ب useLanguage.js

الملفات اللي تفضل:
src/
  ├── main.js (بدون تعديلات بتاعة routes إن وجدت)
  ├── App.vue (جديد تماماً)
  ├── locales/ (احتفظ)
  └── router/ (احتفظ بدون تعديلات)
```

## الخطوة 1.2: إعادة تنظيم المشروع

```
src/
├── main.js
├── App.vue
├── router/
│   └── index.js
├── locales/
│   ├── ar.json (محدّث)
│   └── en.json (محدّث)
├── composables/
│   ├── useLanguage.js
│   ├── useScrollAnimation.js
│   ├── useTheme.js
│   └── useRevealOnScroll.js
├── components/
│   ├── navigation/
│   │   ├── Navbar.vue
│   │   └── MobileMenu.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── TrustBar.vue
│   │   ├── FeaturesGrid.vue
│   │   ├── StatisticsSection.vue
│   │   ├── CTASection.vue
│   │   └── Footer.vue
│   ├── common/
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── Badge.vue
│   │   └── Icon.vue
│   └── shared/
│       ├── LanguageSwitcher.vue
│       └── ThemeSwitcher.vue
├── views/
│   ├── Home.vue
│   ├── Products.vue
│   ├── ProductDetail.vue
│   ├── Services.vue
│   ├── WhyUs.vue
│   ├── Clients.vue
│   ├── Partners.vue
│   └── Contact.vue
├── styles/
│   ├── variables.css (Tailwind config)
│   ├── base.css
│   ├── animations.css
│   └── utilities.css
└── assets/
    ├── images/
    ├── logos/
    └── icons/
```

## الخطوة 1.3: تحديث package.json والـ dependencies

```bash
# محتوى package.json:
{
  "name": "dts-website-new",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "vue": "^3.4.21",
    "vue-router": "^4.3.0",
    "lucide-vue-next": "^0.344.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.1.4",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.18",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

## الخطوة 1.4: إعادة بناء index.html

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DTS - Digital Transformation Services</title>
    <meta name="description" content="حلول التحول الرقمي من DTS" />
    
    <!-- Fonts: Tajawal (Arabic) + Inter (English) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

# 🎨 المرحلة 2: نظام التصميم (Design System)

## الخطوة 2.1: Tailwind Configuration

**ملف:** `tailwind.config.js`

```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Fonts
      fontFamily: {
        heading: ['Tajawal', 'sans-serif'], // Arabic heading
        sans: ['Inter', 'Tajawal', 'sans-serif'], // Body text
        mono: ['ui-monospace', 'monospace'],
      },
      
      // Font sizes (Responsive scaling)
      fontSize: {
        'h1': ['56px', { lineHeight: '1.2', fontWeight: '800' }],
        'h2': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      
      // Colors (Dark mode as default)
      colors: {
        // Background
        'bg-primary': '#000000',
        'bg-secondary': '#1a1a1a',
        'bg-tertiary': '#2a2a2a',
        
        // Text
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-muted': '#808080',
        
        // Accent
        'accent-primary': '#ff6b3a',
        'accent-secondary': '#f5f5f5',
        
        // Utility
        'border': '#333333',
        'surface': '#0a0a0a',
      },
      
      // Spacing (Tailwind default + custom)
      spacing: {
        'section-y': '80px',
        'section-x': '40px',
      },
      
      // Border radius
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      
      // Box shadow
      boxShadow: {
        'card': '0 4px 16px rgba(0,0,0,0.2)',
        'hover': '0 8px 24px rgba(0,0,0,0.3)',
        'glow': '0 0 32px rgba(255,107,58,0.3)',
      },
      
      // Transitions
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
```

## الخطوة 2.2: CSS Base & Utilities

**ملف:** `src/styles/base.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Root variables */
:root {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --accent: #ff6b3a;
  --border: #333333;
  --section-y: 80px;
  --section-x: 40px;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f9f9f9;
  --text-primary: #0a0a0a;
  --text-secondary: #6a6a6a;
  --border: #e0e0e0;
}

/* Global styles */
* {
  @apply transition-colors duration-300;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  @apply bg-bg-primary text-text-primary;
  font-family: 'Inter', 'Tajawal', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Tajawal', sans-serif;
  @apply font-bold;
}

/* Responsive container */
.container {
  @apply mx-auto px-section-x max-w-7xl;
}

/* Section spacing */
section {
  @apply py-section-y;
}
```

**ملف:** `src/styles/animations.css`

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Utility classes */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}
```

## الخطوة 2.3: Vue.js Main Setup

**ملف:** `src/main.js`

```javascript
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import styles
import './styles/base.css'
import './styles/animations.css'

// Import routes
import routes from './router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

app.use(router)
app.mount('#app')
```

**ملف:** `src/App.vue`

```vue
<template>
  <div :data-theme="theme" class="min-h-screen bg-bg-primary text-text-primary">
    <!-- Navigation -->
    <Navbar />
    
    <!-- Page Content -->
    <main class="overflow-x-hidden">
      <RouterView />
    </main>
    
    <!-- Footer -->
    <Footer />
    
    <!-- WhatsApp Button -->
    <a 
      href="https://wa.me/..." 
      target="_blank"
      class="fixed bottom-6 right-6 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14l-.46.264-1.38-.364.371-1.352c-.712-1.231-1.129-2.645-1.129-4.108 0-4.268 3.477-7.746 7.753-7.746 2.064 0 4.007.798 5.468 2.247 1.461 1.449 2.267 3.379 2.267 5.422 0 4.263-3.476 7.756-7.753 7.756z"/>
      </svg>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/navigation/Navbar.vue'
import Footer from '@/components/sections/Footer.vue'

const theme = ref('dark')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  theme.value = savedTheme
})
</script>
```

---

# 📱 المرحلة 3: بناء الصفحة الرئيسية (Home)

## الخطوة 3.1: Navigation Bar

**ملف:** `src/components/navigation/Navbar.vue`

```vue
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300" :class="{ 'bg-bg-secondary backdrop-blur-md': isScrolled }">
    <div class="container flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-2xl font-bold">DTS</RouterLink>
      
      <!-- Menu -->
      <div class="hidden lg:flex gap-8">
        <!-- Products -->
        <div class="relative group">
          <button class="hover:text-accent-primary transition-colors">
            {{ t('nav.products') }}
          </button>
          <div class="absolute left-0 top-full mt-0 w-56 bg-bg-secondary border border-border rounded-lg shadow-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <!-- Products dropdown -->
          </div>
        </div>
        
        <!-- Services -->
        <button class="hover:text-accent-primary transition-colors">{{ t('nav.services') }}</button>
        
        <!-- Company -->
        <button class="hover:text-accent-primary transition-colors">{{ t('nav.company') }}</button>
        
        <!-- Contact -->
        <RouterLink to="/contact" class="hover:text-accent-primary transition-colors">{{ t('nav.contact') }}</RouterLink>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-4 items-center">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <button class="hidden lg:block px-6 py-2 bg-accent-primary text-black rounded-lg font-semibold hover:shadow-glow transition-all">
          {{ t('nav.getStarted') }}
        </button>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/shared/ThemeSwitcher.vue'

const { t } = useLanguage()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 50
})
</script>
```

## الخطوة 3.2: Hero Section

**ملف:** `src/components/sections/HeroSection.vue`

```vue
<template>
  <section class="pt-32 pb-20 min-h-screen flex items-center">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text -->
        <div class="space-y-8 animate-fade-in-up">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-full w-fit">
            <span class="w-2 h-2 bg-accent-primary rounded-full"></span>
            <span class="text-sm font-semibold">{{ t('heroSection.badge') }}</span>
          </div>
          
          <!-- Heading -->
          <h1 class="text-h1 font-heading font-bold leading-tight">
            {{ t('heroSection.title') }}
            <span class="text-accent-primary">{{ t('heroSection.titleHighlight') }}</span>
          </h1>
          
          <!-- Description -->
          <p class="text-lg text-text-secondary max-w-md leading-relaxed">
            {{ t('heroSection.description') }}
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 py-8 border-y border-border">
            <div>
              <div class="text-3xl font-bold text-accent-primary">10,000+</div>
              <div class="text-sm text-text-muted">{{ t('stats.clients') }}</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-accent-primary">95%</div>
              <div class="text-sm text-text-muted">{{ t('stats.growth') }}</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-accent-primary">100+</div>
              <div class="text-sm text-text-muted">{{ t('stats.experts') }}</div>
            </div>
          </div>
          
          <!-- Buttons -->
          <div class="flex gap-4 flex-wrap">
            <Button variant="primary" size="lg">{{ t('heroSection.cta') }}</Button>
            <Button variant="secondary" size="lg">{{ t('nav.contact') }}</Button>
          </div>
        </div>
        
        <!-- Right: Visual -->
        <div class="relative animate-fade-in-down">
          <div class="bg-gradient-to-br from-accent-primary/20 to-transparent rounded-2xl p-12 border border-border min-h-96 flex items-center justify-center">
            <p class="text-text-muted">Visual Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage'
import Button from '@/components/common/Button.vue'

const { t } = useLanguage()
</script>
```

## الخطوة 3.3: باقي الأقسام الرئيسية

**الأقسام المطلوبة في Home:**
1. HeroSection ✅
2. TrustBar (لوجوهات الشركاء)
3. FeaturesGrid (الخدمات الرئيسية)
4. ProductsShowcase (المنتجات الأربعة)
5. StatisticsSection (الأرقام الكبيرة)
6. CTASection (نداء للعمل)
7. TestimonialsCarousel (آراء العملاء - اختياري)
8. Footer

---

# 🛣️ المرحلة 4: الصفحات الفرعية

## الخطوة 4.1: صفحات المنتجات

```
/products           → عرض كل المنتجات (ESS, MTS, ERS, ESA)
/products/ess       → صفحة تفصيلية لـ ESS
/products/mts       → صفحة تفصيلية لـ MTS
/products/ers       → صفحة تفصيلية لـ ERS
/products/esa       → صفحة تفصيلية لـ ESA
```

## الخطوة 4.2: صفحات الخدمات

```
/services           → كل الخدمات
/services/:id       → تفصيلي لكل خدمة
```

## الخطوة 4.3: صفحات الشركة

```
/why-us             → لماذا نحن
/clients            → عملاؤنا
/partners           → شركاؤنا
/about              → من نحن
/contact            → تواصل معنا
```

---

# ✅ المرحلة 5 & 6: الاختبار والنشر

### خطوات الاختبار:
1. جميع الصفحات تعمل بدون أخطاء
2. Responsive design يعمل (mobile, tablet, desktop)
3. Theme switching يعمل (dark/light)
4. Language switching يعمل (ar/en)
5. جميع الأنيميشنات سلسة
6. الأداء (Lighthouse score > 90)

### النشر:
```bash
npm run build
npm run preview
# ثم رفع على الخادم
```

---

## ملخص الملفات المطلوبة

**ملفات لـ Create من الصفر:**
- [ ] src/App.vue
- [ ] src/main.js
- [ ] tailwind.config.js
- [ ] src/styles/base.css
- [ ] src/styles/animations.css
- [ ] src/components/navigation/Navbar.vue
- [ ] src/components/navigation/MobileMenu.vue
- [ ] src/components/sections/HeroSection.vue
- [ ] src/components/sections/TrustBar.vue
- [ ] src/components/sections/FeaturesGrid.vue
- [ ] src/components/sections/StatisticsSection.vue
- [ ] src/components/sections/CTASection.vue
- [ ] src/components/sections/Footer.vue
- [ ] src/components/common/Button.vue
- [ ] src/components/common/Card.vue
- [ ] src/components/common/Badge.vue
- [ ] src/views/Home.vue
- [ ] src/views/Products.vue
- [ ] src/views/Services.vue
- [ ] src/views/Contact.vue
- [ ] src/router/index.js (تحديث)

**الملفات اللي تبقى وتحدّث:**
- [ ] src/locales/ar.json
- [ ] src/locales/en.json
- [ ] src/composables/useLanguage.js
- [ ] index.html

---

## جدول زمني متوقع

| المرحلة | الوقت المتوقع |
|-------|------------|
| المرحلة 1 (الإعداد) | 2-3 ساعات |
| المرحلة 2 (Design System) | 2-3 ساعات |
| المرحلة 3 (Home Page) | 4-6 ساعات |
| المرحلة 4 (Sub Pages) | 6-8 ساعات |
| المرحلة 5 (Testing) | 2-3 ساعات |
| المجموع | 16-23 ساعة عمل |

---

**الخطوة التالية:** الموافقة على هذه الخطة، ثم البدء بالمرحلة 1 خطوة خطوة.
