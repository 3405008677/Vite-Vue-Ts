import type { App } from 'vue'

/**
 * 点击外部
 */
export default (app: App) => {
  app.directive('click-outside', {
    mounted(el, binding) {
      // 验证绑定值是否为函数
      if (typeof binding.value !== 'function') {
        console.warn(`v-click-outside expects a function, got ${typeof binding.value}`)
        return
      }

      // 定义事件处理函数
      const handler = (e: Event) => {
        // 检查点击是否发生在元素外部
        if (!el.contains(e.target as Node)) {
          binding.value(e) // 执行回调
        }
      }
      // 存储事件处理函数，以便后续移除
      el.__click_outside__ = handler

      // 添加全局事件监听（使用 passive 模式提升性能）
      document.addEventListener('click', handler, { passive: true })
    },
    beforeUnmount(el) {
      // 移除事件监听，防止内存泄漏
      if (el.__click_outside__) {
        document.removeEventListener('click', el.__click_outside__)
        delete el.__click_outside__
      }
    },
  })
}
