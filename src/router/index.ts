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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
