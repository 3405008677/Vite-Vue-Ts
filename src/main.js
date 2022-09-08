import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/style/index.scss'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载全局
// app.config.globalProperties.$store =

app.use(ElementPlus).use(router).use(createPinia()).mount('#app')
