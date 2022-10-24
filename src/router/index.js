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
