import PermissionStore from "../modules/routeList";
/**
 * 添加动态路由
 * @param routeList
 */
export const addRouteList = (router, routeList) => {
  routeList.forEach((item) => {
    const routeName = item.name;
    // 判断路由是否存在
    if (!router.hasRoute(routeName)) router.addRoute(item);
    if (item.children) {
      const childrenRouters = item.children.map((subRoute) => {
        return {
          ...subRoute,
          path: [item.path, "/", subRoute.path].join(""),
        };
      });
      addRouteList(childrenRouters);
    }
  });
};
export const addRoute = (router) => {
  router.addRoute(PermissionStore.createRouter());
};

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

