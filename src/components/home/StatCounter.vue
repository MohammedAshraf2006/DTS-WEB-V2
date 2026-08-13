<script setup>
import { ref } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true }
})

const el = ref(null)
const { displayValue } = useCountUp(el, props.value)
</script>

<template>
  <div ref="el" class="text-center">
    <p class="font-heading text-4xl font-extrabold text-primary sm:text-5xl">{{ displayValue }}</p>
    <p class="mt-2 text-sm font-semibold text-text-subtle">{{ label }}</p>
  </div>
</template>
