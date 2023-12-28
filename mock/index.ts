import Mock from 'mockjs'

const proxy = import.meta.env.VITE_BASE_URL

console.log(import.meta.env.VITE_USE_MOCK)
// 根据.env中的VITE_USE_MOCK判断是否开启mock
if (import.meta.env.VITE_USE_MOCK === 'true') {
  Mock.mock(proxy + '/login', 'post', (options) => {
    return {
      code: 200,
      data: {
        token: 'admin',
        uid: 123456,
      },
    }
  })

  Mock.mock(proxy + '/user/info', 'post', (options) => {
    return {
      code: 200,
      data: {
        uid: 123456,
        name: '我是你爹',
        phone: '110',
        address: '火星',
      },
    }
  })

  Mock.mock(proxy + '/user/router/list', 'post', (options) => {
    return {
      code: 200,
      data: [
        {
          menuId: 1,
          name: '主页', // 左边导航对应名称
          list: [], // 有list则表示二级路由  没有则表示一级路由
          open: null,
          orderNum: 0,
          parentId: 0,
          parentName: null,
          perms: null,
          keepAlive: false, // 页面是否支持keepAlive缓存
          type: 0,
          icon: 'system', // 菜单图标
          url: 'demo/home/index', // 对应文件路径
        },
        {
          icon: 'system',
          list: [
            {
              icon: 'admin',
              list: [],
              menuId: 2,
              name: '管理员管理',
              keepAlive: false,
              open: null,
              orderNum: 0,
              parentId: 0,
              parentName: null,
              perms: null,
              type: 1,
              url: 'demo/user/registerUser',
            },
          ],
          menuId: 1,
          name: '系统管理',
          open: null,
          orderNum: 0,
          parentId: 0,
          keepAlive: false,
          parentName: null,
          perms: null,
          type: 0,
          url: 'demo/',
        },
      ],
    }
  })
  // Mock.mock(proxy + '/user/router/list', 'post', (options) => {
  //   return {
  //     code: 200,
  //     data: [
  //       {
  //         path: '/home',
  //         name: '/home',
  //         component: '/demo/home',
  //         meta: {
  //           title: '首页',
  //           needLogin: true,
  //           keepAlive: false,
  //           icon: 'Menu',
  //         },
  //       },
  //       {
  //         path: '/system',
  //         name: '/system',
  //         redirect: '/system/role',
  //         meta: {
  //           title: '系统管理',
  //           needLogin: true,
  //           keepAlive: false,
  //           icon: 'Setting',
  //         },
  //         children: [
  //           {
  //             path: '/role',
  //             name: '/role',
  //             component: '/demo/system/role',
  //             meta: {
  //               title: '角色管理',
  //               needLogin: true,
  //               keepAlive: false,
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         path: '/jurisdiction',
  //         name: '/jurisdiction',
  //         component: '/demo/jurisdiction',
  //         meta: {
  //           title: '权限管理',
  //           needLogin: true,
  //           keepAlive: false,
  //           icon: 'Location',
  //         },
  //       },
  //       {
  //         path: '/permission',
  //         name: '/permission',
  //         component: '/demo/permission',
  //         meta: {
  //           title: '注册用户',
  //           needLogin: true,
  //           keepAlive: false,
  //           icon: 'Location',
  //         },
  //       },
  //     ],
  //   }
  // })
}
