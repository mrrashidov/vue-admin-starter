import type { RouteMeta, RouteRecordRaw } from 'vue-router'

const counterMeta = (title: string): RouteMeta => ({
  title,
  isGuest: true,
  layout: 'empty'
})

export const counterRouter: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home_module',
    component: () => import('./HomeView.vue'),
    meta: counterMeta('Home page title here')
  },
  {
    path: '/about',
    name: 'about_module',
    component: () => import('./AboutView.vue'),
    meta: counterMeta('About page title here')
  }
]
export default counterRouter
