export default [{
  path: '/',
  meta: {
    title: '首页',
    isHide: true,
    keepAlive: false
  },
  component: () => import('@/views/home.vue')
},
{
  path: '/login',
  meta: {
    title: '登录',
    keepAlive: false

  },
  component: () => import('@/views/login.vue')
},
{
  path: '/404',
  name: 'notFound',
  meta: {
    title: '404 Not Found!',
    keepAlive: false

  },
  component: () => import('@/views/404.vue')
}]