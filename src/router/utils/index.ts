const _import = import.meta.glob('/src/views/**/**.vue')

/**
 * alter URL also add params
 * @param url now router address
 * @param key params of key
 * @param keyVal params of value
 */
export const changeUrl = (url: string, key: string, keyVal: string) => {
  let pattern: string = key + '=([^&]*)',
    replaceText: string = key + '=' + keyVal
  if (url.match(pattern)) {
    let tmp: string = '/(' + key + '=)([^&]*)/gi'
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText
    } else {
      return url + '?' + replaceText
    }
  }
}
// 判断是否为 HTTP || HTTPS
function isHttpOrHttps(str: string) {
  if (str) {
    return str.startsWith('http://') || str.startsWith('https://')
  }
  return false
}

/**
 * 格式化路由列表
 */
export const formattingRouter = (router: Array<MyRouterTwo>) => {
  let temp: Array<RouteRule> = []
  router.forEach((item, index) => {
    let route = {} as RouteRule
    route.path = '/' + item.url
    route.name = '/' + item.url
    route.meta = {
      menuId: item.menuId,
      title: item.name,
      isDynamic: true,
      isTab: true,
      iframeUrl: '',
    }
    // 处理是否是外连接 如 HTTP 或者是 HTTPS 则使用iframe展示
    if (isHttpOrHttps(item.url)) {
      route.path = `i-${item.menuId}`
      route.name = `i-${item.menuId}`
      route.meta.iframeUrl = item.url
    } else {
      try {
        route.component = _import[`/src/views/${item.url}.vue`] || null
      } catch (e) {
        console.log('未找到该文件', e)
      }
    }
    // 处理递归
    if (item.list.length > 0) {
      route.children = formattingRouter(item.list)
    }
    temp.push(route)
  })
  return temp
}
// export const formattingRouter = (router: Array<MyRouter>, father?: number) => {
//   let temp: Array<RouteRule> = []
//   router.forEach((item,index)=>{
//     let v = {} as RouteRule
//     v.meta = {}
//     v.path = item.path
//     v.name = item.path
//     v.meta.icon = item.icon
//     v.meta!.keepAlive = item.keepAlive ? true : false
//     v.meta!.title = item.title
//     v.meta!.needLogin = true
//     v.children = []
//     v.component = _import[`/src/views${item.component}/index.vue`]
//     if(item.father === 0 && father === undefined){
//       temp.push(v)
//     }else{
//       v.children.push(formattingRouter(router,item.pid) as unknown  as RouteRule)
//     }
//     // 递归了
//     if(!father === undefined){
//       if(father === item.father){
//       return v
//       }
//     }
//   })
//   return temp
// }
