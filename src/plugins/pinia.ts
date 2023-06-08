import { type App, markRaw } from 'vue'
import type { Router } from 'vue-router'
import { createPinia } from 'pinia'
import router from '@/router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}

export default {
  install(app: App) {
    const pinia = createPinia()
    pinia.use(({ store }) => {
      store.router = markRaw(router)
    })
    app.use(pinia)
  }
}
