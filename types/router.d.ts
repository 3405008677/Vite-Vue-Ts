export {}
declare global {
  interface RouteMeta {
    iframeUrl?: string
    isTab?: boolean
    isDynamic?: boolean
    menuId?: number
    title?: string
    icon?: string
    needLogin?: boolean
    keepAlive?: boolean
  }
  interface RouteRule extends Record<string | number | symbol, unknown> {
    path: string
    name: string
    redirect?: string
    meta?: RouteMeta
    component?: any
    children?: Array<RouteRule>
  }
  interface MyRouter {
    pid: number
    path: string
    component: string
    icon: string
    title: string
    keepAlive: boolean
    father: number
    type: 'teacher' | 'admin'
  }
  interface MyRouterTwo {
    icon: string
    list: MyRouterTwo[]
    menuId: number
    name: string
    open: any
    orderNum: number
    parentId: number
    parentName: any
    keepAlive: boolean
    perms: any
    type: number
    url: string
  }
}
