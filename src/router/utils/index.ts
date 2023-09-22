import { setRouterNameList } from '@/utils/auth'
const _import = import.meta.glob('/src/views/demo/**/**.vue')

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

/**
 * 格式化路由列表
 */
export const formattingRouter = (router: Array<RouteRule>, father?: RouteRule) => {
  let temp: Array<RouteRule> = []
  let localRouter: Array<string> = []
  for (let i = 0; i < router.length; i++) {
    let v: RouteRule = { path: '', name: '' }
    // if (father ? Object.keys(father).length : false) {
    //   v.name = father.name + router[i].path
    //   // v.name = father.name + '/' + router[i].path
    // } else {
    //   v.name = router[i].path
    // }
    v.path = router[i].path
    v.name = router[i].name
    v.meta = router[i].meta
    // 有children
    if (router[i].children != undefined && router[i].children!.length) {
      v.redirect = router[i].redirect
      v.children = formattingRouter(router[i].children!, v)
    } else {
      v.component = _import[`/src/views${router[i].component}/index.vue`]
    }
    localRouter.push(v.name)
    temp.push(v)
  }
  setRouterNameList(localRouter)
  return temp
}
