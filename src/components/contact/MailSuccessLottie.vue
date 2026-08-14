<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import lottie from 'lottie-web'

const root = ref(null)
let anim = null

onMounted(() => {
  if (!root.value) return
  anim = lottie.loadAnimation({
    container: root.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/animations/mail-box.json'
  })
})

onBeforeUnmount(() => {
  anim?.destroy()
  anim = null
})
</script>

<template>
  <div ref="root" class="mx-auto h-52 w-52 sm:h-64 sm:w-64" aria-hidden="true" />
</template>
