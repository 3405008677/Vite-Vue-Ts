export default [
  {
    path: "/",
    name: "/",
  
    component: () => import("@/layouts/default/index.vue"),
    children: [
      {
        path: "/home",
        name: "/home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          elIcon: "House",
          isHide: true,
          keepAlive: false,
        },
      },
      {
        path: "/house",
        name: "/house",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "house",
          elIcon: "Clock",
          isHide: true,
          keepAlive: false,
        },
        children: [
          {
            path: "/h-one",
            name: "/house/h-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "h-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/h-two",
            name: "/house/h-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "h-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/h-three",
            name: "/house/h-three",
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
        path: "/cat",
        name: "/cat",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "cat",
          elIcon: "Filter",
          isHide: true,
          keepAlive: false,
        },
        children: [
          {
            path: "/c-one",
            name: "/cat/c-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "c-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/c-two",
            name: "/cat/c-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "c-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/c-three",
            name: "/cat/c-three",
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
        path: "/phone",
        name: "/phone",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "phone",
          elIcon: "Edit",
          isHide: true,
          keepAlive: false,
        },
        children: [
          {
            path: "/p-one",
            name: "/phone/p-one",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-one",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/p-two",
            name: "/phone/p-two",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-two",
              isHide: true,
              keepAlive: false,
            },
          },
          {
            path: "/p-three",
            name: "/phone/p-three",
            component: () => import("@/views/home.vue"),
            meta: {
              title: "p-three",
              isHide: true,
              keepAlive: false,
            },
            children: [
              {
                path: "/p-three-one",
                name: "/phone/p-three/p-three-one",
                component: () => import("@/views/home.vue"),
                meta: {
                  title: "p-two",
                  isHide: true,
                  keepAlive: false,
                },
              },
              {
                path: "/p-three-tow",
                name: "/phone/p-three/p-three-tow",
                component: () => import("@/views/home.vue"),
                meta: {
                  title: "p-two",
                  isHide: true,
                  keepAlive: false,
                },
              },
            ],
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
