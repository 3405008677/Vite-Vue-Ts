import { createRouter, createWebHashHistory } from "vue-router";
import staticRouter from "./modules/static";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Session } from "@/utils/storage";
import PermissionStore from "@/router/modules/routeList";
import { userStore } from "@/store";

nProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter,
});

// 加载动画
let loading;
/**
 * 添加动态路由
 * @param routes
 */
const addRoute = (routes) => {
  routes.forEach((item) => {
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
      addRoute(childrenRouters);
    }
  });
};

/**
 * 路由前置拦截
 */
router.beforeEach((to, from, next) => {
  nProgress.start();
  loading = ElLoading.service({
    text: "拼命加载中...",
    background: "rgba(178,215,173,1)",
  });
  const token = Session.get("token");
  if (token) {
    //获取权限路由
    // if (userStore.permission_store.length == 0) {
    //   PermissionStore.createRouter();
    // }
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
      Session.clear();
      return next("login");
    }
    if (to.meta && to.meta.needLogin === false) {
      Session.clear();
      return next();
    } else {
      ElNotification({
        title: "token过期",
        message: "请重新登录",
        type: "error",
      });
      Session.clear();
      return next("login");
    }
  }
});

/**
 * 路由后置拦截
 */
router.afterEach((to, from) => {
  nProgress.done();
  loading.close();
});

export default router;
