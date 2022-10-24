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
