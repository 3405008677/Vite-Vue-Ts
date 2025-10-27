/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 封装登录/登出/验证码/token等
 * @author jackfull
 * @since 2025-01-18
 */
// 引入文件
import http from '@/service' // 引入网络请求http
// 导入 store的存储模块
import { settingStore, userStore } from '@/store'
// 导入cache模块
import { guid } from '@/utils/core/common'
import storage from '@/utils/core/storage'

/**
 * 账号登录
 * @param params object
 * @returns json object
 */
export function login(params: any): Promise<API_RETURN> {
  let LoginMac = guid().replaceAll('-', '')
  params.LoginMac = LoginMac
  storage.localStorage.set('LOGIN-CMC', LoginMac)

  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Authentication/Login', params)
      .then((result) => {
        if (result.code !== 1) return resolve(result)

        const newToken = {
          time: params.CachePeriod,
          date: new Date(),
          token: result.data.token || '',
          encryptIO: result.data.encryptIO, // 表示 接口的输入对象要加密，输出是加密的
        }

        // Pinia 保存一份
        settingStore.setToken(newToken.token)
        // LocalStorage原始也保存一份
        storage.localStorage.set('token', JSON.stringify(newToken))
        // 把重新登录弹窗是否弹出设置为true
        settingStore.$patch((store) => {
          store.isReLogin = true
        })

        // 设置用户基本信息
        storage.localStorage.set('USER-INFO', JSON.stringify(result.data))
        userStore.$patch((store) => {
          store.userInfo = result.data
        })

        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 用户登出（需要清理相关的数据和缓存，已经初始化某些数据）
 * @param params object
 * @returns json object
 * DeviceType: 1=web,2=桌面程序|11=手机App,12=小程序|21=手持机(pda)
 */
export function logout(params: any = {}): Promise<API_RETURN> {
  params['DeviceType'] = 1
  params['LoginMac'] = storage.localStorage.get('LOGIN-CMC')
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Authentication/Logout', params)
      .then((result) => {
        // 退出登录要清理相关的localstrage和session缓存
        // 清理session
        // 清除localStorage所有的值

        storage.localStorage.set('token', '')
        storage.localStorage.set('USER-INFO', '')
        storage.localStorage.set('LOGIN-CMC', '')
        userStore.$patch((store) => {
          store.userInfo = {} as any
        })
        settingStore.setToken('')
        settingStore.$patch((store) => {
          // 清空菜单
          store.menuList = []
          // 清空所有tags
          store.breadcrumb = []
        })

        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 修改密码
 * @param params object
 * @returns json object
 */
export function updateCypher(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/UpdateCypher', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// token登录接口
export const loginForm = async (params: any) => {
  let data: any
  await http
    .post('/UserManage/Authentication/LoginForm', params)
    .then((result: any) => {
      let LoginMac = params.Cmc
      params.LoginMac = LoginMac
      if (result.type !== 1) {
        // 设置token，并写入到store中
        let token = result.data.token || ''

        const newToken = {
          time: params?.CachePeriod || 1,
          date: new Date(),
          token,
        }

        // Pinia 保存一份
        settingStore.setToken(token)

        // LocalStorage原始也保存一份
        storage.localStorage.set('token', JSON.stringify(newToken))

        // LocalStorage原始也保存一份
        storage.localStorage.set('LOGIN-CMC', LoginMac)
        // 设置用户基本信息
        let userInfo = result.data

        if (userInfo) {
          storage.localStorage.set('userInfo', JSON.stringify(userInfo))
          userStore.$patch((store) => {
            store.userInfo = userInfo
          })
        }
      }

      data = result
    })
    .catch((err: any) => {
      return err
    })
  return data
}

export const cefSharpTohome = (data: any) => {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    try {
      // 设置token，并写入到store中
      let token = data.token || ''

      const time = data.tKPeriod / 24
      const newToken = {
        time,
        date: new Date(),
        token,
      }

      // Pinia 保存一份
      settingStore.setToken(token)
      // 把重新登录弹窗是否弹出设置为true
      settingStore.$patch((store) => {
        store.isReLogin = true
      })
      // LocalStorage原始也保存一份
      storage.localStorage.set('token', JSON.stringify(newToken))

      // LocalStorage原始也保存一份
      storage.localStorage.set('LOGIN-CMC', data.loginMac)
      storage.localStorage.set('userInfo', JSON.stringify(data))
      userStore.$patch((store) => {
        store.userInfo = data
      })

      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}

/**
 *  查询资源版本
 */
export function querySystemVersion(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/systemconfig/resource/querySystemVersion', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
