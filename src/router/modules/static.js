export default [
  {
    path: "/",
    name: "/",
    redirect: { name: "home" },
    component: () => import("@/layouts/default/index.vue"),
    children: [
      {
        path: "/home",
        name: "/home",
        component: () => import("@/views/login.vue"),
        meta: {
          title: "爱山东",
          elIcon: "House",
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
