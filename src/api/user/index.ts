// import { Login } from './rule'
import request from '@/utils/request'

/**
 * 获取指定用户信息
 * @params id 用户ID
 */
const getUserInfoApi = (data: { uid: number }) => {
  return request.post('/user/info', data)
}
/**
 * 获取管理员路由
 */
const getRouterMenuListApi = (data: { uid: number }) => {
  return request.post('/user/router/list', data)
}
export default {
  getUserInfoApi,
  getRouterMenuListApi,
}
