<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-surface-alt border-t border-border">
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-10">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Company -->
        <div class="sm:col-span-2 lg:col-span-1">
          <img src="/images/DTS.png" alt="DTS" class="h-9 w-auto" />
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-text-subtle">
            {{ t('common.footer.description') }}
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-sm font-bold text-text-base">{{ t('common.footer.quickLinksTitle') }}</h4>
          <ul class="mt-4 space-y-3">
            <li>
              <RouterLink to="/#about" class="text-sm text-text-subtle transition-colors hover:text-primary">
                {{ t('common.footer.quickLinks.about') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/#services" class="text-sm text-text-subtle transition-colors hover:text-primary">
                {{ t('common.footer.quickLinks.services') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/#partners" class="text-sm text-text-subtle transition-colors hover:text-primary">
                {{ t('common.footer.quickLinks.partners') }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Need help -->
        <div>
          <h4 class="text-sm font-bold text-text-base">{{ t('common.footer.helpTitle') }}</h4>
          <ul class="mt-4 space-y-3 text-sm text-text-subtle">
            <li class="flex items-center justify-between gap-3">
              <span>{{ t('common.footer.support') }}</span>
              <a :href="`tel:${t('common.footer.supportPhone').replace(/[^\d+]/g, '')}`" class="font-semibold text-text-base transition-colors hover:text-primary">
                {{ t('common.footer.supportPhone') }}
              </a>
            </li>
            <li>
              <a :href="`mailto:${t('common.footer.supportEmail')}`" class="transition-colors hover:text-primary">
                {{ t('common.footer.supportEmail') }}
              </a>
            </li>
            <li class="flex items-center justify-between gap-3">
              <span>{{ t('common.footer.sales') }}</span>
              <a :href="`mailto:${t('common.footer.salesEmail')}`" class="font-semibold text-text-base transition-colors hover:text-primary">
                {{ t('common.footer.salesEmail') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact numbers / address -->
        <div>
          <h4 class="text-sm font-bold text-text-base">{{ t('common.footer.contactNumbersTitle') }}</h4>
          <ul class="mt-4 space-y-2">
            <li v-for="(num, i) in tm('common.footer.numbers')" :key="i">
              <a :href="`tel:${String(num).replace(/[^\d+]/g, '')}`" class="text-sm text-text-subtle transition-colors hover:text-primary">
                {{ num }}
              </a>
            </li>
          </ul>
          <a :href="`mailto:${t('common.footer.email')}`" class="mt-3 block text-sm font-semibold text-text-base transition-colors hover:text-primary">
            {{ t('common.footer.email') }}
          </a>
          <p class="mt-3 flex items-start gap-2 text-xs leading-relaxed text-text-subtle">
            <AppIcon name="shield" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {{ t('common.footer.address') }}
          </p>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p class="text-xs text-text-subtle">© {{ year }} DTS — {{ t('common.footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
