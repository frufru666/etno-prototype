import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'explore',
    component: () => import('@/views/ExploreView.vue'),
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('@/views/CollectionsListView.vue'),
  },
  {
    path: '/collections/:slug',
    name: 'collection-detail',
    component: () => import('@/views/CollectionDetailView.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/DetailView.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/InfoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
