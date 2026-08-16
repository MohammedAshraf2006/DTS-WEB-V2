import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import { isProductKey } from '@/data/products'

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

export default router
