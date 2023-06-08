import type { App } from 'vue'
import DefaultLayout from './DefaultLayout.vue'
import EmptyLayout from './EmptyLayout.vue'

export default {
  install(app: App) {
    app.component('DefaultLayout', DefaultLayout)
    app.component('EmptyLayout', EmptyLayout)
  }
}
