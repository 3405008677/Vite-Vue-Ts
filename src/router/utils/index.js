// import router from "@/router";
const _import = file => () => import.meta.glob('@/views/demo' + file + '.vue')
/**
 * 修改Url添加参数
 * url：当前路由地址
 * key：参数key
 * keyVal：参数value
 */
export const changeURL = (url, key, keyVal) => {
  let pattern = key + '=([^&]*)'
  let replaceText = key + '=' + keyVal
  if (url.match(pattern)) {
    let tmp = '/(' + key + '=)([^&]*)/gi'
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
 * 格式化router
 */
export const formattingRouter = (router, father = {}) => {
  let temp = []
  for (let i = 0; i < router.length; i++) {
    let v = {}
    let meta = {}
    v.path = router[i].path
    if (Object.keys(father).length) {
      v.name = father.name + '/' + router[i].path
    } else {
      v.name = '/' + router[i].path
    }
    v.component = _import(v.name)
    meta.title = router[i].name
    meta.elIcon = router[i].icon
    meta.keepAlice = false
    v.meta = meta
    if (router[i].sysMenus != undefined && router[i].sysMenus.length) {
      v.redirect = v.name + '/' + router[i].sysMenus[0].path
      v.children = formattingRouter(router[i].sysMenus, v)
    } else {
      if (router[i].parentId == '0') v.component = _import(v.name + v.name)
    }
    temp.push(v)
  }
  return temp
}
