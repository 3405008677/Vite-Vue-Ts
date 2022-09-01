import { createRouter, createWebHashHistory, routeLocationKey } from 'vue-router'
import staticRouter from './modules/static'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Session } from '@/utils/storage'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter
})
/**
 * 添加动态路由
 * @param routes
 */
const addRoute = routes => {
  routes.forEach(item => {
    const routeName = item.name
    // 判断路由是否存在
    if (!router.hasRoute(routeName)) router.addRoute(item)
    if (item.children) {
      const childrenRouters = item.children.map(subRoute => {
        return {
          ...subRoute,
          path: [item.path, '/', subRoute.path].join('')
        }
      })
      addRoute(childrenRouters)
    }
  })
}

/**
 * 路由前置拦截
 */
router.beforeEach((to, from, next) => {
  nProgress.configure({ showSpinner: false })
  nProgress.start()
  const token = Session.get('token')
  if (token) {
  } else {
    // 无需token的页面
    if (to.meta && to.meta.needLogin === false) {
      next()
    } else {
      next()
      Session.clear()
    }
  }
})

/**
 * 路由后置拦截
 */
router.afterEach((to, from) => {
  nProgress.done()
})

export default router
