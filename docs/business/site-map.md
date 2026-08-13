# Site map

## Live in V2 today

| Surface | Implementation |
|---------|----------------|
| Home `/` | `HomeView` sections: Hero, TrustBar, ProductTabs, ServicesGrid, StatsCta |
| 404 | `NotFoundView` |
| Chrome | `AppHeader`, `AppFooter` inside `MainLayout` |

Partial section ids: `#services`, `#products`. Nav still references about/partners/contact style targets.

## Target map (from reference + nav labels)

Align over later waves; not all exist as sections/routes yet.

| Intent | Reference pattern | V2 target |
|--------|-------------------|-----------|
| Home / hero | `#home` | Hero + `#home` if needed |
| Services | `#services` | `ServicesGrid` (exists) |
| Products | `#products` | `ProductTabs` (exists) |
| Why us / about | WhyUs / `#about` | Missing section or route |
| Clients | Clients section | Partially covered by `TrustBar` |
| Partners | `#partners` | Missing section (assets exist under `public/images/partners`) |
| Contact | Footer / `#contact` / form | Footer contact info exists; dedicated `#contact` / form missing |
| WhatsApp | Floating `wa.me` link | Missing |

## Future routes (wave 03+)

Dedicated views may be added under `MainLayout` for products, services, about, contact — or remain hash sections on Home. Decision recorded in `plans/wave-03-pages-routes.md` when that wave starts.
