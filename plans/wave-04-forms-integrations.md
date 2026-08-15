# Wave 04 — Forms and integrations

**Status:** done

## Goal

Ship a real contact page (not footer-hash only) and verified support/sales emails.

## Expected scope

- `/contact` view + form
- Send to `sales@dts-eg.com`
- Success Lottie (`public/animations/mail-box.json` from `social proof/Mail Box.json`)
- Footer Support / Sales reveal emails on click
- Locale strings for form validation/success
- WhatsApp float (same number as DTS-WEB)

## Shipped (this slice)

- [x] `/contact` with name, phone, email, message (same fields as DTS-WEB footer form)
- [x] Submit via FormSubmit → `sales@dts-eg.com` (mailto fallback)
- [x] Mail Box Lottie after successful send
- [x] Header / product / home CTAs point to `/contact`
- [x] Footer: Technical support reveals `support@dts-eg.com`; Sales reveals `sales@dts-eg.com`; E-signature reveals `tawqe3y_10thoframdan@dts-eg.com`
- [x] WhatsApp float → `https://wa.me/201050992817` (verified from DTS-WEB)

## Remaining

- None for this wave

## Test criteria

- Validation messages localized (ar / en)
- Submit success shows Lottie; error path is visible
- Support/Sales emails hidden until click
- WhatsApp float matches DTS-WEB (number + look)
- `npm run build` succeeds
