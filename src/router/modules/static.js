export default [{
  path: '/',
  meta: {
    title: '首页',
    isHide: true
  },
  component: () => import('@/views/home.vue')
},
{
  path: '/404',
  name: 'notFound',
  meta: {
    title: '404 Not Found!'
  }
}]