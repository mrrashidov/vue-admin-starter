import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/plugins/pinia'
import i18n from '@/plugins/i18n'
import layouts from '@/layouts'
import VueApexCharts from 'vue3-apexcharts'
import '@/shared/assets/tailwind.css'

export const app = createApp(App)

app.use(VueApexCharts)
app.use(layouts)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
