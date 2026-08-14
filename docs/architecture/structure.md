# Source structure

```
src/
  main.js                 # app bootstrap, locale dir sync, ApexCharts
  App.vue                 # AppLoader + RouterView
  i18n.js                 # vue-i18n messages merge
  style.css               # Tailwind + shared utilities / motion
  assets/colors.css       # design tokens (CSS variables)
  router/index.js         # routes + hash scroll offset
  layouts/MainLayout.vue  # SiteBackground + header + main + footer
  views/
    HomeView.vue
    ProductsView.vue
    ProductDetailView.vue
    NotFoundView.vue
  components/
    AppHeader.vue
    AppFooter.vue
    AppLoader.vue         # first-open splash
    SiteBackground.vue    # fixed starfield (light + dark)
    home/                 # home page sections
    products/             # listing cards, header menu cards, media stage
    icons/AppIcon.vue
  data/
    products.js           # ESS / ERS / ESA catalog + gallery paths
  composables/
    useTheme.js
    useScrolledHeader.js
    useScrollReveal.js
    useCountUp.js
    useCardTilt.js
    runViewTransition.js  # thin theme/locale update helper
  locales/{ar,en}/        # namespaced JSON (common, home, products)
  services/api.js         # thin fetch wrapper (VITE_API_BASE_URL)
public/images/            # logos, clients, partners, products
```

## Conventions

| Kind | Pattern |
|------|---------|
| Pages | `views/*View.vue` |
| Layout | `layouts/*Layout.vue` |
| Home sections | `components/home/*.vue` |
| Composables | `composables/use*.js` |
| Import alias | `@` → `src` |

## Current home composition (`HomeView`)

1. `HeroSection` — Vanta + rotating product pills
2. `TrustBar` — client logo strip
3. `ProductTabs` — ESS / ERS / ESA (`#products`)
4. `ServicesGrid` — 3 services + e-signature highlight (`#services`)
5. `StatsCta` — stats + CTA (`#about`)

Ambient orbs on Home are **dark mode only**.

## Routes (today)

- `/` → `MainLayout` → `HomeView` (`name: home`)
- `/products` → `ProductsView` (`name: products`)
- `/products/:key` → `ProductDetailView` (`name: product-detail`; `key` = ess | ers | esa)
- catch-all → lazy `NotFoundView` (`name: not-found`)
- Hash scroll uses top offset `90` for the fixed header
- `/services` is linked from Home but **not routed yet**
