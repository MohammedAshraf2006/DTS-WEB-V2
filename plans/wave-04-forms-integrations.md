# Wave 04 — Forms and integrations

**Status:** pending

## Goal

Ship contact submission path and verified external links (e.g. WhatsApp).

## Expected scope

- Contact form component(s)
- `src/services/api.js` and env usage
- Layout/chrome for WhatsApp or similar floats
- Locale strings for form validation/success

## Tasks

1. Contact form UI + wire `api.js` (or chosen channel)
2. WhatsApp / external links from reference after verification
3. Replace legacy simulated-only submit behavior

## Test criteria

- Form validation messages localized
- Submit success/error paths behave predictably
- External links open correct destinations

## Post-close docs

- Update `docs/business/content-sources.md` / `product.md` if contacts change
- Mark wave `done` in `plans/status.md`
