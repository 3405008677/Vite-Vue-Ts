export default [
  {
    path: 'system',
    name: '/system',
    meta: {
      title: '系统管理',
      needLogin: true,
      keepAlive: false,
    },
    children: [
      {
        path: 'role',
        name: '/role',
        meta: {
          title: '角色管理',
          needLogin: true,
          keepAlive: false,
        },
        component: () => import('@/views/demo/system/role/index.vue'),
      },
    ],
  },
]
