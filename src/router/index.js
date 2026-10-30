import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import { isProductKey } from '@/data/products'
import { initAnalytics, trackPageView } from '@/analytics/track.js'
import { withTrailingSlash } from '@/utils/trailingSlash.js'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/views/ProductsView.vue')
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/ServicesView.vue')
      },
      {
        path: 'services/signature',
        name: 'services-signature',
        component: () => import('@/views/SignatureServiceView.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue')
      },
      {
        path: 'clients',
        name: 'clients',
        component: () => import('@/views/ClientsView.vue')
      },
      {
        path: 'partners',
        name: 'partners',
        component: () => import('@/views/PartnersView.vue')
      },
      {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/KnowledgeHubView.vue')
      },
      {
        path: 'knowledge/:slug',
        name: 'knowledge-article',
        component: () => import('@/views/KnowledgeArticleView.vue'),
        beforeEnter(to) {
          if (to.params.slug === 'fix-error-3008-itida-websign') {
            return { path: '/fix-error-3008-itida-websign/', replace: true }
          }
        }
      },
      {
        path: 'fix-error-3008-itida-websign',
        name: 'fix-error-3008',
        component: () => import('@/views/KnowledgeArticleView.vue'),
        meta: { articleSlug: 'fix-error-3008-itida-websign' }
      },
      {
        path: 'products/:key',
        name: 'product-detail',
        component: () => import('@/views/ProductDetailView.vue'),
        beforeEnter(to) {
          if (!isProductKey(to.params.key)) {
            return { name: 'not-found' }
          }
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    const knowledgeNames = new Set(['knowledge', 'knowledge-article', 'fix-error-3008'])
    if (knowledgeNames.has(to.name) && knowledgeNames.has(from.name)) {
      return false
    }
    if (to.hash) {
      if (to.hash.startsWith('#service-')) {
        return false
      }
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (!el) {
            resolve(false)
            return
          }
          const headerOffset = 112
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
          resolve({ top: Math.max(0, top), behavior: 'smooth' })
        })
      })
    }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.name === 'not-found') return
  if (to.path !== '/' && !to.path.endsWith('/')) {
    return {
      path: withTrailingSlash(to.path),
      query: to.query,
      hash: to.hash,
      replace: true
    }
  }
})

router.afterEach((to) => {
  initAnalytics()
  trackPageView(to.fullPath)
})

export default router
