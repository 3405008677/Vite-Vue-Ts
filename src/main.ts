import { createApp } from 'vue'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from '@/store'
import '../mock'
import 'virtual:uno.css'
import 'element-plus/dist/index.css'
// 引入自定义样式
import '@/style/index.scss'
async function bootstrap() {
  const app = createApp(App)
  // 配置 store
  setupStore(app)
  // 配置 router
  setupRouter(app)
  setupRouterGuard(router)
  // 配置 icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.mount('#app')
}

bootstrap()
