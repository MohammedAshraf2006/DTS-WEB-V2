<script setup>
// مجموعة أيقونات موحّدة (line-icons بستايل نظيف شبيه بستايل Zapier) —
// مركزية في مكان واحد عشان أي إضافة/تعديل يبقى سهل. استايل: outline، stroke-width 1.8
const props = defineProps({
  name: { type: String, required: true },
  class: { type: String, default: 'w-6 h-6' }
})

const paths = {
  invoice:
    'M9 12h6m-6 4h6m-9 5h12a2 2 0 002-2V7.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0013.586 2H6a2 2 0 00-2 2v14a2 2 0 002 2z',
  layers:
    'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  signature:
    'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM14.06 6.19l3.75 3.75 2.34-2.34a1.5 1.5 0 000-2.12l-1.63-1.63a1.5 1.5 0 00-2.12 0l-2.34 2.34z',
  chart:
    'M3 3v18h18M7 15l3.5-4.5 3 3L18 8',
  link:
    'M9 15l6-6m-5-1.5 1.06-1.06a4 4 0 115.66 5.66L15.5 13m-8 1 1.06 1.06a4 4 0 105.66-5.66L13 9',
  clipboard:
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2m-7 8h6m-6 4h6',
  academic:
    'M12 3 2 8l10 5 10-5-10-5zM6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5',
  support:
    'M12 3a9 9 0 00-9 9v3.5A2.5 2.5 0 005.5 18H6a1 1 0 001-1v-4a1 1 0 00-1-1h-1.94M12 3a9 9 0 019 9v3.5a2.5 2.5 0 01-2.5 2.5H18a1 1 0 01-1-1v-4a1 1 0 011-1h1.94M9 20a3 3 0 006 0',
  mail:
    'M4 7.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-11zm0 0 8 6 8-6',
  shield:
    'M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z',
  cloud:
    'M7 18a4.5 4.5 0 01-.4-8.98A5.5 5.5 0 0117 9.5a4 4 0 01-1 7.87M7 18h10',
  pos:
    'M3 9h18M3 9v9a2 2 0 002 2h14a2 2 0 002-2V9M3 9l1.5-4.5A2 2 0 016.4 3h11.2a2 2 0 011.9 1.5L21 9M8 14h2m4 0h2',
  arrowLeft: 'M19 12H5m0 0 7 7m-7-7 7-7',
  arrowRight: 'M5 12h14m0 0-7-7m7 7-7 7',
  chevronDown: 'm6 9 6 6 6-6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 18 18 6M6 6l12 12',
  sun: 'M12 3v2m0 14v2m9-9h-2M5 12H3m15.4 6.4-1.4-1.4M6.6 6.6 5.2 5.2m12.2 0-1.4 1.4M6.6 17.4l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  moon: 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M5 21h14',
  mapPin:
    'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z M12 13a3 3 0 100-6 3 3 0 000 6z',
  usbFlash:
    'M9 2h6v5H9z M8 7h8v12.5a2.5 2.5 0 01-2.5 2.5h-3A2.5 2.5 0 018 19.5V7z M10.5 11h3 M10.5 14.5h3'
}
</script>

<template>
  <svg
    :class="props.class"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path :d="paths[name] || paths.invoice" />
  </svg>
</template>
