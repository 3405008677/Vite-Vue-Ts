export default [{
  path: '/',
  meta: {
    title: '首页',
    isHide: true
  },
  component: () => import('@views/home.vue')
}]