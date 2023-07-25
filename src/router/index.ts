import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import staticRoutes from './modules/index'

//white list include basic static routers
const WHITE_STATIC_ROUTERS: string[] = []
const getWhiteStaticRouters = (array: any[]) => {
  array.forEach((item) => {
    WHITE_STATIC_ROUTERS.push(item.name)
    getWhiteStaticRouters(item.children || [])
  })
}
getWhiteStaticRouters(staticRoutes)
// create a router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  strict: true,
})
/**
 * addition router list
 */
export function addRouterList(routerList: Array<RouteRule>, father: string = '/') {
  // export function addRouterList(routerList: Array<RouteRule>) {
  routerList.forEach((item: RouteRule) => {
    if (!router.hasRoute(item.name)) {
      router.addRoute(father, item as RouteRecordRaw)
    }
  })
}

/**
 * reset router list
 */
export function resetRouter() {
  router.getRoutes().forEach((item: RouteRecordRaw) => {
    const { name } = item
    if (name && !WHITE_STATIC_ROUTERS.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// set router in app
export function setupRouter(app: App<Element>) {
  app.use(router)
}
