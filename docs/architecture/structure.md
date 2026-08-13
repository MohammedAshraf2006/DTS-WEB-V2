# Source structure

```
src/
  main.js                 # app bootstrap, locale dir sync, ApexCharts
  App.vue                 # root RouterView
  i18n.js                 # vue-i18n messages merge
  style.css               # Tailwind + shared utilities
  assets/colors.css       # design tokens (CSS variables)
  router/index.js         # routes + hash scroll offset
  layouts/MainLayout.vue  # header + main + footer
  views/
    HomeView.vue
    NotFoundView.vue
  components/
    AppHeader.vue
    AppFooter.vue
    home/                 # home page sections
    icons/AppIcon.vue
  composables/            # useTheme, useScrollReveal, useCountUp, ...
  locales/{ar,en}/        # namespaced JSON (common, home, ...)
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

1. `HeroSection`
2. `TrustBar`
3. `ProductTabs`
4. `ServicesGrid`
5. `StatsCta`

## Routes (today)

- `/` → `MainLayout` → `HomeView` (`name: home`)
- catch-all → lazy `NotFoundView` (`name: not-found`)
- Hash scroll uses top offset `90` for the fixed header
