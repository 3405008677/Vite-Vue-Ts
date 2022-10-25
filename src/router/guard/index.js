import { Session } from "@/utils/storage";
import { addRoute, changeURL } from "../utils/index";
import nProgress from "nprogress";
// 进度条
nProgress.configure({ showSpinner: false });
// 加载动画
let loading;
/**
 * 路由前置拦截
 */
export function beforeEach(router) {
  router.beforeEach((to, from, next) => {
    nProgress.start();
    loading = ElLoading.service({
      text: "拼命加载中...",
      background: "rgba(178,215,173,1)",
    });
    const token = Session.get("token");
    if (token) {
      //获取权限路由
      //   if (userStore.routerList.length == 0) {
      //     PermissionStore.createRouter();
      //   }
      if (to.path === "/login") {
        ElNotification({
          title: "已经登录",
          message: "请先退出再登录！",
          type: "error",
        });
        return next(from.path);
      }
      // 判断路由是否存在
      if (!router.hasRoute(to.name)) {
        ElNotification({
          title: "路由不存在",
          message: "别瞎点了！",
          type: "error",
        });
        return next(from.path);
      }
      return next();
    } else {
      // 判断路由是否存在
      if (!router.hasRoute(to.name)) {
        ElNotification({
          title: "路由不存在",
          message: "别瞎点了，老实登录去吧！",
          type: "error",
        });
        return next("login");
      }
      console.log(from);
      console.log(to);
      //如果当前路由需要不登录
      if (to.meta.needLogin === false) {
        return next();
      } else {
        ElNotification({
          title: "token过期",
          message: "请重新登录",
          type: "error",
        });
        return next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      }
    }
  });
}

/**
 * 路由后置拦截
 */
export function afterEach(router) {
  router.afterEach((to, from) => {
    nProgress.done();
    loading.close();
  });
}
export function guard(router) {
  beforeEach(router);
  afterEach(router);
}
