export const routerList = [
  {
    path: "/home",
    name: "/home",
    component: () => import("/src/views/login.vue"),
    meta: {
      title: "首页",
      elIcon: "House",
      keepAlive: false,
    },
  },
  {
    path: "/house",
    name: "/house",
    redirect: "/home",
    meta: {
      title: "house",
      elIcon: "Clock",
      keepAlive: false,
    },
    children: [
      {
        path: "h-one",
        name: "/house/h-one",
        component: () => import("@/views/login.vue"),
        meta: {
          title: "h-one",
          keepAlive: false,
        },
      },
      {
        path: "h-two",
        name: "/house/h-two",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "h-two",
          keepAlive: false,
        },
      },
      {
        path: "h-three",
        name: "/house/h-three",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "h-three",
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/cat",
    name: "/cat",
    redirect: "/home",
    meta: {
      title: "cat",
      elIcon: "Filter",
      keepAlive: false,
    },
    children: [
      {
        path: "c-one",
        name: "/cat/c-one",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "c-one",
          keepAlive: false,
        },
      },
      {
        path: "c-two",
        name: "/cat/c-two",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "c-two",
          keepAlive: false,
        },
      },
      {
        path: "c-three",
        name: "/cat/c-three",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "c-three",
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/phone",
    name: "/phone",
    redirect: "/home",
    meta: {
      title: "phone",
      elIcon: "Edit",
      keepAlive: false,
    },
    children: [
      {
        path: "p-one",
        name: "/phone/p-one",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "p-one",
          keepAlive: false,
        },
      },
      {
        path: "p-two",
        name: "/phone/p-two",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "p-two",
          keepAlive: false,
        },
      },
      {
        path: "p-three",
        name: "/phone/p-three",
        component: () => import("@/views/login.vue"),

        meta: {
          title: "p-three",
          keepAlive: false,
        },
        children: [
          {
            path: "p-three-one",
            name: "/phone/p-three/p-three-one",
            component: () => import("@/views/login.vue"),

            meta: {
              title: "p-two",
              keepAlive: false,
            },
          },
          {
            path: "p-three-tow",
            name: "/phone/p-three/p-three-tow",
            component: () => import("@/views/login.vue"),

            meta: {
              title: "p-two",
              keepAlive: false,
            },
          },
        ],
      },
    ],
  },
];
