import { createRouter, createWebHashHistory } from 'vue-router'
import staticRouter from './modules/static'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter
})
/**
 * 添加动态路由
 * @param router
 */
const addRouter = router => { }


export default router
