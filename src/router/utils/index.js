// import router from "@/router";
import { setRouterNameList } from "@/utils/auth";

const _import = import.meta.glob("/src/views/demo/**/**.vue");
// const _import = (file) => () => import(/* @vite-ignore */ "/src/views/demo" + file + ".vue");
/**
 * 修改Url添加参数
 * url：当前路由地址
 * key：参数key
 * keyVal：参数value
 */
export const changeURL = (url, key, keyVal) => {
  let pattern = key + "=([^&]*)";
  let replaceText = key + "=" + keyVal;
  if (url.match(pattern)) {
    let tmp = "/(" + key + "=)([^&]*)/gi";
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match("[?]")) {
      return url + "&" + replaceText;
    } else {
      return url + "?" + replaceText;
    }
  }
};

/**
 * 格式化router
 */
export const formattingRouter = (router, father = {}) => {
  let temp = [];
  let localRouter = [];
  for (let i = 0; i < router.length; i++) {
    let v = {};
    let meta = {};
    v.path = router[i].path;
    if (Object.keys(father).length) {
      v.name = father.name + "/" + router[i].path;
    } else {
      v.name = "/" + router[i].path;
    }
    v.component = _import[`/src/views/demo${v.name}.vue`];
    meta.title = router[i].name;
    meta.elIcon = router[i].icon;
    meta.url = v.name;
    meta.keepAlice = false;
    v.meta = meta;
    // 有children
    if (router[i].sysMenus != undefined && router[i].sysMenus.length) {
      v.redirect = v.name + "/" + router[i].sysMenus[0].path;
      v.children = formattingRouter(router[i].sysMenus, v);
      v.component = () => {};
    }
    // 针对一级路由
    if (router[i].parentId == "0") {
      v.path = "/" + router[i].path;
    }
    // 针对home
    if (router[i].parentId == "0" && router[i].path == "home") {
      meta.url = v.name + v.name;
      v.component = _import[`/src/views/demo${v.name + v.name}.vue`];
    }
    localRouter.push(v.name);
    temp.push(v);
  }
  setRouterNameList(localRouter);
  return temp;
};
