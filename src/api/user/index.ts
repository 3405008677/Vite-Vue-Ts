import request from '@/service'

/**
 * 获取指定用户信息
 * @params id 用户ID
 */
const getUserInfoApi = () => {
  return request.post('/user/info')
}
/**
 * 获取管理员路由
 */
const getRouterMenuListApi = () => {
  return request.post('/user/router/list')
}
export default {
  getUserInfoApi,
  getRouterMenuListApi,
}
