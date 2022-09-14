import Layout from "@/layouts/index.vue";
export default [
  {
    path: "/",
    redirect: "home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          isHide: true,
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      needLogin: false,
      keepAlive: false,
    },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    meta: {
      title: "404 Not Found!",
      needLogin: false,
      keepAlive: false,
    },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/401",
    name: "noPower",
    meta: {
      title: "无权访问",
      needLogin: false,
      keepAlive: false,
    },
    component: () => import("@/views/401.vue"),
  },
];
