import type { Router } from 'vue-router'
import { getToken, getRouterList } from '@/utils/auth'
import nProgress from 'nprogress'
import { addRouterList } from '../index'
import { userStore } from '@/store'
import { ElNotification, ElLoading } from 'element-plus'

// loading
let loading: any
nProgress.configure({ showSpinner: false })
/**
 * beforeEach
 */
export function beforeEach(router: Router) {
  router.beforeEach((to, from, next) => {
    nProgress.start()
    loading = ElLoading.service({
      text: '拼命加载中...',
    })
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        ElNotification({
          title: '已经登录',
          message: '请先退出再登录！',
          type: 'error',
        })
        return next(from.path)
      }
      // 判断路由是否存在
      if (router.hasRoute(to.name!)) return next()
      // 判断本地是否有路由，如果有路由则是因为刷新导致路由丢失，重新渲染
      let localRouter = getRouterList() as RouteRule[]
      let isRouter: boolean = false
      localRouter.forEach((item) => {
        if (item.name === to.path) isRouter = true
      })
      if (isRouter) {
        userStore.getRouterList().then((res) => {
          addRouterList(localRouter)
          return next({ path: to.fullPath, replace: true, query: to.query })
        })
      } else {
        ElNotification({
          title: '路由不存在',
          message: '别瞎点了！',
          type: 'error',
        })
        return next(from.path)
      }
    } else {
      // 判断路由是否存在
      if (!router.hasRoute(to.name!)) {
        ElNotification({
          title: '路由不存在',
          message: '别瞎点了，老实登录去吧！',
          type: 'error',
        })
        return next('login')
      }
      //如果当前路由需要不登录
      if (to.meta.needLogin === false) {
        return next()
      } else {
        ElNotification({
          title: 'token过期',
          message: '请重新登录',
          type: 'error',
        })
        return next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  })
}

/**
 * afterEach
 */
export function afterEach(router: Router) {
  router.afterEach((to, from) => {
    nProgress.done()
    loading.close()
  })
}

export function setupRouterGuard(router: Router) {
  beforeEach(router)
  afterEach(router)
}
