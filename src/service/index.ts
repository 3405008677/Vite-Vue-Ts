import axios from 'axios'
import * as AES from '@/utils/tool/crypto'
import storage from '@/utils/core/storage'
import { ElMessage } from 'element-plus'
import { clearAuthStorage } from '@/router/utils'
import { appStore } from '@/store'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
})

// 定义异常信息接口
interface IException {
  code: number
  message: string
  isAborted?: boolean
}

// 定义默认异常信息对象
const DEFAULT_EXCEPTION: IException = {
  code: 0,
  message: '#Network Exception#',
}

// 提取获取认证头的逻辑
function getAuthHeaders() {
  const newToken = storage.localStorage.get('token')
  const login = storage.localStorage.get('LOGIN-CMC')
  let Authorization = ''
  let LoginMac = ''

  if (newToken) {
    const token = JSON.parse(newToken).token
    if (token.length >= 20) {
      Authorization = token
    }
  }
  if (login && login.length >= 20) {
    LoginMac = login
  }
  return { Authorization, LoginMac }
}

// 处理401状态码的特定错误
function handle401Error(response: any) {
  if (!response.data) {
    return handleError(response, 'response#401 - no data')
  }

  const { messageCode } = response.data
  console.log(response.data, ' response.data')
  let message = response.data.message

  switch (messageCode) {
    case '1001000':
      message = message ? message : 'Token参数无效或无法识别'
      clearAuthStorage()
      break
    case '1001001':
      message = message ? message : '未登录或者登录过期'
      clearAuthStorage()
      break
    case '1001002':
      message = message ? message : '账号异地登录'
      break
    case '1001003':
      message = message ? message : '账号异地登录'
      clearAuthStorage()
      break
    case '1001004':
      message = message ? message : '参数模型校验失败'
      break
    case '1001005':
      message = message ? message : '没有API权限'
      break
    default:
      message = message ? message : '未知错误'
  }
  ElMessage.error(message)
  // return handleError(response, `response#401 - ${message}`)
}

// 判断是否为中断错误
function isAbortError(error: any): boolean {
  return (
    error?.name === 'AbortError' ||
    error?.name === 'RequestAbortedError' ||
    error?.code === 'ERR_CANCELED' ||
    error?.isAborted === true ||
    error?.message?.includes('canceled') ||
    error?.message?.includes('aborted')
  )
}

// 错误处理函数
function handleError(error: any, type: string) {
  // 首先检查是否为中断错误

  console.log('请求错误处理:', error, type)

  if (isAbortError(error)) {
    console.debug('请求被中断:', error.message)
    // 返回特殊的中断错误对象，不显示错误消息
    const abortException: IException = {
      code: -1, // 使用特殊代码标识中断
      message: '请求已被取消',
      isAborted: true,
    }
    return Promise.reject(abortException)
  }

  let errorMessage = DEFAULT_EXCEPTION.message + '#' + type

  // 处理有响应的情况
  if (error.response) {
    const status = error.response.status

    if (status === 401) {
      return handle401Error(error.response)
    } else if (status === 500) {
      errorMessage = '接口响应异常'
    } else if (status === 502) {
      errorMessage = '后端发布中'
    } else {
      errorMessage = `HTTP错误: ${status}`
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    errorMessage = '网络连接错误，请检查网络'
  } else {
    // 其他错误
    errorMessage = error.message || '未知错误'
  }

  const errExp: IException = {
    code: DEFAULT_EXCEPTION.code,
    message: errorMessage,
    isAborted: false,
  }
  ElMessage.error(errorMessage)
  return Promise.reject(errExp)
}

// 处理成功函数
function handleResponse(response: any) {
  const status = response.status
  // 只处理200状态码的成功响应
  if (status !== 200) return handleError(response, `response#${status}`)

  // 如果  encryptIO === true 则表示要解密
  if (!JSON.parse(storage.localStorage.get('token') || '{}')?.encryptIO) return response.data

  try {
    // 解密操作
    response.data = JSON.parse(AES.Decrypt(response.data))
  } catch (decryptError) {
    // 解密失败
    return handleError(decryptError, 'response#decrypt-failed')
  }
}

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: any) => {
    const { Authorization, LoginMac } = getAuthHeaders()

    config.headers = {
      ...config.headers,
      Authorization,
      LoginMac,
    }

    // 如果 encryptIO === true 则表示要加密
    if (JSON.parse(storage.localStorage.get('token') || '{}')?.encryptIO) {
      config.data = AES.Encrypt(JSON.stringify(config.data))
    }

    return config
  },
  (error) => {
    return handleError(error, 'request')
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 成功响应交给handleResponse处理
    return handleResponse(response)
  },
  (error) => {
    // 错误响应交给handleError处理
    return handleError(error, 'response#general')
  },
)

// 封装请求方法
const http = {
  // GET 请求
  get(url: string, params?: any): Promise<API_RETURN> {
    return axiosInstance.get(url, { params })
  },

  // POST 请求
  post(url: string, data: any = {}, headers?: any): Promise<API_RETURN> {
    return axiosInstance.post(url, data, { headers })
  },

  // PUT 请求
  put(url: string, data: any = {}, headers?: any): Promise<API_RETURN> {
    return axiosInstance.put(url, data, { headers })
  },

  // DELETE 请求
  delete(url: string, params?: any): Promise<API_RETURN> {
    return axiosInstance.delete(url, { params })
  },

  // POST 请求，支持中断
  postAbort(url: string, data: any = {}, headers?: any): Promise<API_RETURN> {
    const requestKey = `POST-${url}-${JSON.stringify(data || {})}`
    console.log('POST 请求，支持中断', requestKey)
    return appStore.abortController.wrapRequest(requestKey, (signal: AbortSignal) => {
      return axiosInstance.post(url, data, { headers, signal })
    })
  },
}

export default http
