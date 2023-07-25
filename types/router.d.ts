export {}
declare global {
  interface RouteMeta {
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
    menuId: string
    roleId: number
    parentId: string
    name: string
    type: number
    icon: string
    path: string
    children: Array<MyRouter>
  }
}
