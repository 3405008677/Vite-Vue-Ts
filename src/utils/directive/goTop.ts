import type { App } from 'vue'

/**
 * 回到顶部
 * 使用案例
 * v-go-top="'.anchor-box .el-scrollbar__wrap--hidden-default'"
 * 参数 —— 制定某个需要滚动的DIV
 */

export default (app: App) => {
  app.directive('go-top', {
    mounted(el, binding) {
      // console.log(el, binding, 'el')
      el.style.display = 'none'
      el.style.position = 'fixed'
      el.style.right = '100px'
      el.style.bottom = '100px'

      let dom = document.querySelector(binding.value)

      let speed = 100

      el.addEventListener('click', () => {
        render()
      })

      dom?.addEventListener('scroll', setScroll)
      el.__vueGoTopHandler__ = setScroll

      function setScroll(event: Event) {
        let scrollTop = (event.target as HTMLDivElement)?.scrollTop || 10
        if (scrollTop > 300) {
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      }

      function render() {
        if (dom!.scrollTop >= speed) {
          dom!.scrollTop -= speed
          requestAnimationFrame(() => render())
        } else if (dom!.scrollTop < speed) {
          dom!.scrollTop = 0
        }
      }
    },
    beforeUnmount(el, binding) {
      document.querySelector(binding.value)?.removeEventListener('scroll', el.__vueGoTopHandler__)
    },
  })
}
