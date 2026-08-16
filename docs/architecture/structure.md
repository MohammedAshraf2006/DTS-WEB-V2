# Source structure

```
src/
  main.js                 # app bootstrap, locale dir sync, ApexCharts
  App.vue                 # AppLoader + RouterView + WhatsAppFloat
  i18n.js                 # vue-i18n messages merge
  style.css               # Tailwind + shared utilities / motion
  assets/colors.css       # design tokens (CSS variables)
  router/index.js         # routes + hash scroll offset
  layouts/MainLayout.vue  # SiteBackground + header + main + footer
  views/
    HomeView.vue
    ProductsView.vue
    ServicesView.vue
    SignatureServiceView.vue
    ClientsView.vue
    PartnersView.vue
    ContactView.vue
    ProductDetailView.vue
    NotFoundView.vue
  components/
    AppHeader.vue
    AppFooter.vue
    AppLoader.vue         # first-open splash
    WhatsAppFloat.vue     # site-wide WhatsApp FAB
    SiteBackground.vue    # fixed starfield (light + dark)
    home/                 # home page sections
    products/             # listing cards, header menu cards, media stage
    services/             # services listing cards + signature panels + header menu cards
    clients/              # client logo cards
    partners/             # stacked partner feature cards
    contact/              # contact form + success Lottie
    icons/AppIcon.vue
  data/
    products.js           # ESS / ERS / ESA catalog + gallery paths
    services.js           # services catalog + icon paths
    clients.js            # featured clients catalog + logo paths
    partners.js           # MTS / FEDIS / Tawqe3y + website URLs
  composables/
    useTheme.js
    useScrolledHeader.js
    useScrollReveal.js
    useCountUp.js
    useCardTilt.js
    useContactForm.js
    runViewTransition.js  # thin theme/locale update helper
  locales/{ar,en}/        # namespaced JSON (common, home, products, contact, services, clients, partners)
  services/
    api.js
    contact.js            # FormSubmit → sales@dts-eg.com (signature form → tawqe3y_10thoframdan@dts-eg.com)
public/images/            # logos, clients, partners, products, services icons
public/animations/        # Lottie (mail-box.json)
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
- `/services` → `ServicesView` (`name: services`); header menu hashes `#service-{key}` scroll to the matching card
- `/services/signature` → `SignatureServiceView` (`name: services-signature`)
- `/contact` → `ContactView` (`name: contact`)
- `/clients` → `ClientsView` (`name: clients`)
- `/partners` → `PartnersView` (`name: partners`)
- `/products/:key` → `ProductDetailView` (`name: product-detail`; `key` = ess | ers | esa)
- catch-all → lazy `NotFoundView` (`name: not-found`)
- Hash scroll uses top offset `90` for the fixed header
- Home `#services` remains a teaser; full catalog is `/services`
