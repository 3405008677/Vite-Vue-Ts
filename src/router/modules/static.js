import Layout from "@/layouts/default/index.vue";
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
        children: [
          {
            path: "h-one",
            name: "h-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "h-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "h-two",
            name: "h-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "h-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "h-three",
            name: "h-three",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "h-three",
              isHide: true,
              keepAlive: false,
            },
          },
        ],
      },
      {
        path: "cat",
        name: "cat",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "cat",
          isHide: true,
          keepAlive: false,
        },
        children: [
          {
            path: "c-one",
            name: "c-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "c-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "c-two",
            name: "c-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "c-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "c-three",
            name: "c-three",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "c-three",
              isHide: true,
              keepAlive: false,
            },
          },
        ],
      },
      {
        path: "phone",
        name: "phone",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "phone",
          isHide: true,
          keepAlive: false,
        },
        children: [
          {
            path: "p-one",
            name: "p-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "p-two",
            name: "p-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "p-three",
            name: "p-three",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-three",
              isHide: true,
              keepAlive: false,
            },
          },
        ],
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
