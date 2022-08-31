import axios from 'axios'
import { user as userStore } from '@store'


const service = axios.create({
  baseURL: '',
  timeout: 90000 * 10,
  headers: {}
})
// 接口错误时 开始重试3次



// 加载动画
let loading = false
let hasPermission = false


// 请求拦截器
service.interceptors.request.use((config) =>{
  const userInfo = userStore && userStore.getState()
  // if ()
})
