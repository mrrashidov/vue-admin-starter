import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import counterRouter from '@/modules/counter/router'
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    breadcrumb?: SingleBreadcrumb[]
    isGuest?: boolean
    isPublic?: boolean
    can?: string | string[]
    layout?: 'default' | 'empty'
  }
}

const routes: readonly RouteRecordRaw[] = [...counterRouter]
export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
export default router
