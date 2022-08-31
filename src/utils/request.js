import axios from 'axios'
import { user } from '@/store'


const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {}
})

// 请求拦截器
request.interceptors.request.use(() => {
  const userStore = user()
  if (userStore.token) {
    
  }
})

request.get = (url, params, headers = {}) => {
  return request({
    url,
    method: "GEt",
    params,
    headers
  })
}

request.post = (url, data) => {
  return request({
    url,
    method: "POST",
    data
  })
}

request.put = (url, data) => {
  return request({
    url,
    method: "GEt",
    data
  })
}

request.delete = (url, params) => {
  return request({
    url,
    method: "DELETE",
    params
  })
}



export default request;