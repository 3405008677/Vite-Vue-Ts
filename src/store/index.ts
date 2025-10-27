import type { App } from 'vue'
import { createPinia } from 'pinia'

import app from './modules/app'
import user from './modules/user'

const pinia = createPinia()

const appStore = app(pinia)
const userStore = user(pinia)

/**
 * 重置多个Pinia store的状态到初始值
 * 该函数会依次调用以下store的$reset方法：
 * 注意：此操作会清除store中所有已修改的状态，恢复为初始状态
 */
export function resetPinia() {
  appStore.$reset()
  userStore.$reset()
}

export { appStore, userStore }

export function setupStore(app: App<Element>) {
  app.use(pinia)
}
