export default [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('@/layouts/default/index.vue'),
    children: [
      {
        path: '404',
        name: '/404',
        meta: {
          title: '404',
          needLogin: false,
          keepAlive: false,
        },
        component: () => import('@/views/sys/error/404.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      needLogin: false,
      keepAlive: false,
    },
    component: () => import('@/views/sys/login/index.vue'),
  },
]
