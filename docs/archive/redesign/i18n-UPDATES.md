# i18n Translation Updates for DTS-WEB V2 Redesign

## 📋 Overview

This document outlines all translation keys that need to be added or modified in your i18n files for the redesigned components.

---

## 📁 File Locations

Typically found in: `src/locales/`
- English: `en.json` or `en/index.json`
- Arabic: `ar.json` or `ar/index.json`

---

## 🔄 Required i18n Additions

### 1. Product Features (ProductTabs.vue)

**Location in JSON:** `home.products.tabs`

**Current Structure:**
```json
{
  "home": {
    "products": {
      "title": "...",
      "subtitle": "...",
      "tabs": {
        "ess": {
          "title": "...",
          "description": "...",
          "features": [
            // ⚠️ THIS MUST BE AN ARRAY!
          ]
        }
      }
    }
  }
}
```

**What's Needed:**
Each product tab (ess, ers, esa) must have a `features` array with 3-4 key features.

**Example for ESS:**
```json
{
  "home": {
    "products": {
      "tabs": {
        "ess": {
          "title": "Enterprise System Suite",
          "description": "Comprehensive cloud-based system for managing your entire enterprise...",
          "features": [
            "Real-time data synchronization across all departments",
            "Advanced security with end-to-end encryption",
            "Scalable infrastructure for growing businesses",
            "24/7 support and regular updates"
          ]
        }
      }
    }
  }
}
```

**English Translation (en.json):**
```json
{
  "home": {
    "products": {
      "tabs": {
        "ess": {
          "title": "Enterprise System Suite",
          "description": "A complete cloud-based solution designed for enterprise-level operations and scalability.",
          "features": [
            "Real-time data synchronization across all departments",
            "Advanced security with end-to-end encryption",
            "Scalable infrastructure for growing businesses",
            "24/7 dedicated support and regular updates"
          ]
        },
        "ers": {
          "title": "Integrated Reporting System",
          "description": "Powerful reporting and analytics platform to track performance and make data-driven decisions.",
          "features": [
            "Customizable dashboards and reports",
            "Real-time analytics and insights",
            "Multi-format export capabilities",
            "Collaborative reporting features"
          ]
        },
        "esa": {
          "title": "Signature Authentication",
          "description": "Secure digital signature solution for documents, contracts, and important agreements.",
          "features": [
            "Legally compliant digital signatures",
            "Multi-factor authentication support",
            "Audit trail and compliance reporting",
            "Integration with existing workflows"
          ]
        }
      },
      "cta": "Explore Products",
      "viewAll": "View All Products"
    }
  }
}
```

**Arabic Translation (ar.json):**
```json
{
  "home": {
    "products": {
      "tabs": {
        "ess": {
          "title": "مجموعة النظام الشاملة",
          "description": "حل سحابي متكامل مصمم لعمليات المستوى الخاص بالمؤسسات والقابلية للتوسع.",
          "features": [
            "مزامنة البيانات في الوقت الفعلي عبر جميع الأقسام",
            "أمان متقدم مع التشفير من طرف إلى طرف",
            "بنية أساسية قابلة للتوسع للشركات المتنامية",
            "دعم 24/7 وتحديثات منتظمة"
          ]
        },
        "ers": {
          "title": "نظام التقارير المتكامل",
          "description": "منصة قوية للتقارير والتحليلات لتتبع الأداء واتخاذ قرارات تستند إلى البيانات.",
          "features": [
            "لوحات معلومات وتقارير قابلة للتخصيص",
            "تحليلات ورؤى في الوقت الفعلي",
            "إمكانيات التصدير بتنسيقات متعددة",
            "ميزات التقارير التعاونية"
          ]
        },
        "esa": {
          "title": "مصادقة التوقيع الرقمي",
          "description": "حل توقيع رقمي آمن للمستندات والعقود والاتفاقيات المهمة.",
          "features": [
            "توقيعات رقمية متوافقة قانونًا",
            "دعم المصادقة متعددة العوامل",
            "تقارير سجل التدقيق والامتثال",
            "التكامل مع سير العمل الموجود"
          ]
        }
      },
      "cta": "استكشف المنتجات",
      "viewAll": "عرض جميع المنتجات"
    }
  }
}
```

---

### 2. Statistics Section (StatsCta.vue)

**Location in JSON:** `home.stats.items`

**Structure Needed:**
```json
{
  "home": {
    "stats": {
      "items": [
        {
          "value": "32.4k",
          "label": "Active Users",
          "growth": "12%"
        },
        {
          "value": "98%",
          "label": "Satisfaction Rate",
          "growth": "5%"
        },
        {
          "value": "500+",
          "label": "Integrations",
          "growth": "25%"
        }
      ]
    }
  }
}
```

**English Translation:**
```json
{
  "home": {
    "stats": {
      "items": [
        {
          "value": "50K+",
          "label": "Active Users Worldwide",
          "growth": "18%"
        },
        {
          "value": "99.9%",
          "label": "System Uptime",
          "growth": "2%"
        },
        {
          "value": "98%",
          "label": "Customer Satisfaction",
          "growth": "8%"
        }
      ]
    }
  }
}
```

**Arabic Translation:**
```json
{
  "home": {
    "stats": {
      "items": [
        {
          "value": "50K+",
          "label": "مستخدم نشط في جميع أنحاء العالم",
          "growth": "18%"
        },
        {
          "value": "99.9%",
          "label": "وقت التشغيل",
          "growth": "2%"
        },
        {
          "value": "98%",
          "label": "رضا العملاء",
          "growth": "8%"
        }
      ]
    }
  }
}
```

---

### 3. Hero Section Enhancement (HeroSection.vue)

**Optional Enhancement:** Add more descriptive trust badge

**Current (Keep As Is):**
```json
{
  "home": {
    "hero": {
      "trustBadge": "✓ Trusted by leading organizations"
    }
  }
}
```

**Enhanced Version (Optional):**
```json
{
  "home": {
    "hero": {
      "trustBadge": "✓ Used by leading organizations worldwide"
    }
  }
}
```

---

### 4. Services Section (ServicesGrid.vue)

**Existing Structure (Verify):**
```json
{
  "home": {
    "services": {
      "title": "Our Services",
      "subtitle": "...",
      "items": [
        {
          "title": "Service Name",
          "description": "Service description"
        }
      ],
      "cta": "View All Services"
    }
  }
}
```

**What to Check:**
- Ensure all service descriptions are clear and concise
- Add "Learn more" link text if not present

**Add to i18n (Optional):**
```json
{
  "home": {
    "services": {
      "learnMore": "Learn more"
    }
  }
}
```

---

### 5. Trust Bar / Clients Section (TrustBar.vue)

**Current Structure (Keep):**
```json
{
  "home": {
    "trustBar": {
      "label": "Trusted by leading organizations"
    }
  }
}
```

**Optional Enhancements:**
```json
{
  "home": {
    "trustBar": {
      "label": "Trusted by 98% of our clients",
      "viewClient": "View client"
    }
  }
}
```

---

### 6. CTA Section (StatsCta.vue)

**Existing (Verify):**
```json
{
  "home": {
    "cta": {
      "title": "Ready to get started?",
      "subtitle": "Join hundreds of organizations...",
      "button": "Get In Touch"
    }
  }
}
```

**Verify These Exist:**
- `home.cta.title`
- `home.cta.subtitle`
- `home.cta.button`

---

## 🔍 Complete Example i18n Structure

Here's a complete example showing where all these keys should go:

**en.json:**
```json
{
  "common": {
    "nav": {
      "home": "Home",
      "products": "Products",
      "services": "Services",
      "about": "About",
      "partners": "Partners",
      "cta": "Get Started"
    },
    "products": {
      "ess": {
        "name": "Enterprise System",
        "tagline": "For large organizations"
      },
      "ers": {
        "name": "Reporting Suite",
        "tagline": "Advanced analytics"
      },
      "esa": {
        "name": "Digital Signatures",
        "tagline": "Secure agreements"
      }
    }
  },
  "home": {
    "hero": {
      "title": "Your Enterprise Solution",
      "subtitle": "Build, manage, and scale...",
      "ctaPrimary": "Get Started",
      "ctaSecondary": "Learn More",
      "trustBadge": "✓ Trusted by leading organizations"
    },
    "trustBar": {
      "label": "Trusted by"
    },
    "products": {
      "title": "Our Products",
      "subtitle": "Complete solutions for...",
      "tabs": {
        "ess": {
          "title": "Enterprise System Suite",
          "description": "...",
          "features": [
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4"
          ]
        },
        "ers": {
          "title": "Reporting Suite",
          "description": "...",
          "features": [
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4"
          ]
        },
        "esa": {
          "title": "Signature Authentication",
          "description": "...",
          "features": [
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4"
          ]
        }
      },
      "cta": "Explore Product",
      "viewAll": "View All Products"
    },
    "services": {
      "title": "Our Services",
      "subtitle": "Everything you need...",
      "items": [
        {
          "title": "Service Name",
          "description": "Service description"
        }
      ],
      "cta": "View All Services",
      "learnMore": "Learn more"
    },
    "stats": {
      "items": [
        {
          "value": "50K+",
          "label": "Active Users",
          "growth": "18%"
        },
        {
          "value": "99.9%",
          "label": "System Uptime",
          "growth": "2%"
        },
        {
          "value": "98%",
          "label": "Satisfaction",
          "growth": "8%"
        }
      ]
    },
    "cta": {
      "title": "Ready to transform your business?",
      "subtitle": "Get started with our platform today...",
      "button": "Get In Touch"
    }
  }
}
```

**ar.json:**
```json
{
  "common": {
    "nav": {
      "home": "الرئيسية",
      "products": "المنتجات",
      "services": "الخدمات",
      "about": "حول",
      "partners": "الشركاء",
      "cta": "ابدأ الآن"
    },
    "products": {
      "ess": {
        "name": "النظام الشامل",
        "tagline": "للمؤسسات الكبيرة"
      },
      "ers": {
        "name": "مجموعة التقارير",
        "tagline": "تحليلات متقدمة"
      },
      "esa": {
        "name": "التوقيعات الرقمية",
        "tagline": "اتفاقيات آمنة"
      }
    }
  },
  "home": {
    "hero": {
      "title": "حلك الشامل للمؤسسات",
      "subtitle": "بناء وإدارة ونمو...",
      "ctaPrimary": "ابدأ الآن",
      "ctaSecondary": "تعرف أكثر",
      "trustBadge": "✓ موثوق من قبل المؤسسات الرائدة"
    },
    "trustBar": {
      "label": "موثوق من قبل"
    },
    "products": {
      "title": "منتجاتنا",
      "subtitle": "حلول شاملة لـ...",
      "tabs": {
        "ess": {
          "title": "مجموعة النظام الشاملة",
          "description": "...",
          "features": [
            "الميزة 1",
            "الميزة 2",
            "الميزة 3",
            "الميزة 4"
          ]
        },
        "ers": {
          "title": "مجموعة التقارير",
          "description": "...",
          "features": [
            "الميزة 1",
            "الميزة 2",
            "الميزة 3",
            "الميزة 4"
          ]
        },
        "esa": {
          "title": "التوقيع الرقمي",
          "description": "...",
          "features": [
            "الميزة 1",
            "الميزة 2",
            "الميزة 3",
            "الميزة 4"
          ]
        }
      },
      "cta": "استكشف المنتج",
      "viewAll": "عرض جميع المنتجات"
    },
    "services": {
      "title": "خدماتنا",
      "subtitle": "كل ما تحتاجه...",
      "items": [
        {
          "title": "اسم الخدمة",
          "description": "وصف الخدمة"
        }
      ],
      "cta": "عرض جميع الخدمات",
      "learnMore": "تعرف أكثر"
    },
    "stats": {
      "items": [
        {
          "value": "50K+",
          "label": "مستخدم نشط",
          "growth": "18%"
        },
        {
          "value": "99.9%",
          "label": "وقت التشغيل",
          "growth": "2%"
        },
        {
          "value": "98%",
          "label": "الرضا",
          "growth": "8%"
        }
      ]
    },
    "cta": {
      "title": "هل أنت مستعد لتحويل عملك؟",
      "subtitle": "ابدأ مع منصتنا اليوم...",
      "button": "تواصل معنا"
    }
  }
}
```

---

## ✅ i18n Implementation Checklist

Before deploying, verify:
- [ ] All `features` arrays have 3-4 items for each product
- [ ] Stats section has correct values and growth percentages
- [ ] All text is translated to both EN and AR
- [ ] No missing translation keys (check console for i18n warnings)
- [ ] Punctuation and capitalization are consistent
- [ ] Numbers and special characters are correct
- [ ] Text length is reasonable for UI (not too long)
- [ ] Arabic text direction is correct (RTL)
- [ ] Quotes and apostrophes are properly escaped in JSON

---

## 🔧 How to Update i18n Files

### Option 1: Direct JSON Edit
```json
// In src/locales/en.json or src/locales/home.json
{
  "home": {
    "products": {
      "tabs": {
        "ess": {
          "features": [
            "Add your features here",
            "One per line",
            "Keep them short and clear"
          ]
        }
      }
    }
  }
}
```

### Option 2: Module Structure
If using separate files:
```
src/locales/
├── en/
│   ├── index.json
│   ├── home.json
│   └── common.json
├── ar/
│   ├── index.json
│   ├── home.json
│   └── common.json
```

Update `src/locales/en/home.json` and `src/locales/ar/home.json`

---

## 🧪 Testing i18n Changes

After updating, test:
1. [ ] Switch between EN and AR - everything displays correctly
2. [ ] No console warnings about missing i18n keys
3. [ ] Text displays properly with the correct length
4. [ ] Arabic text is properly RTL formatted
5. [ ] All special characters display correctly
6. [ ] Links and formatting are preserved

---

## 📝 Example: Adding Features to ESS Product

**Before:**
```json
{
  "ess": {
    "title": "Enterprise System Suite",
    "description": "Complete enterprise solution"
  }
}
```

**After:**
```json
{
  "ess": {
    "title": "Enterprise System Suite",
    "description": "A complete cloud-based solution designed for enterprise-level operations and scalability.",
    "features": [
      "Real-time data synchronization across all departments",
      "Advanced security with end-to-end encryption",
      "Scalable infrastructure for growing businesses",
      "24/7 dedicated support and regular updates"
    ]
  }
}
```

---

## 🚀 Common Mistakes to Avoid

❌ **Don't:**
- Forget the comma after array items
- Use different text lengths (EN vs AR)
- Leave empty translation keys
- Use unsupported characters
- Forget to translate both languages

✅ **Do:**
- Keep translations consistent
- Use proper JSON formatting
- Test both languages thoroughly
- Keep text concise and clear
- Add comments for clarity

---

## 📞 Troubleshooting

**Issue:** "i18n key not found" warning in console
**Solution:** Check JSON syntax and ensure key path matches exactly

**Issue:** Arabic text appears LTR instead of RTL
**Solution:** Ensure `dir="rtl"` is set on html element for Arabic

**Issue:** Long text breaks layout
**Solution:** Shorten text or use ellipsis (...) in CSS

**Issue:** Special characters display incorrectly
**Solution:** Ensure JSON is UTF-8 encoded and use proper escaping

---

**Last Updated:** 2026-08-13
**Version:** 1.0
