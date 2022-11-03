import { createRouter, createWebHashHistory } from "vue-router";
import staticRouter from "./modules/static";
import { guard } from "./guard";

import "nprogress/nprogress.css";

// 白名单
const WHITE_NAME_LIST = [];
const getRouteNames = (array = []) => {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
  return array;
};
getRouteNames(staticRouter);
// app router
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
/**
 * 添加动态路由
 * @param routeList
 */
export const addRouteList = (routerList, father = "/") => {
  // const addrouter = {
  //   path: "/",
  //   name: "/",
  //   redirect: "/home",
  //   meta: {},
  //   children: routerList,
  //   component: () => import("@/layouts/default/index.vue"),
  // };
  // router.addRoute(father, addrouter);
  routerList.forEach((item) => {
    let routeName = item.name;
    // 判断路由是否存在
    if (!router.hasRoute(routeName) || item.path == "home") {
      router.addRoute(father, item);
    }
  });
};
/**
 * 清空路由
 * 并且保存白名单里面的路由
 */
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

guard(router);
export default router;
