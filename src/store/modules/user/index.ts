interface UserInfo {
  [key: string]: any
}

export interface UserState {
  token: string
  userInfo: UserInfo
  routerList: Array<UserInfo>
}

import type { LoginType } from '@/api/login/rule'
import loginApi from '@/api/login'
import userApi from '@/api/user'
import { defineStore } from 'pinia'
import { Session } from '@/utils/storage'
import { resetRouter, addRouterList } from '@/router/index'
import { formattingRouter } from '@/router/utils'
import {
  getToken,
  getUserInfo,
  setToken,
  setUserInfo,
  setRouterList,
  getRouterList,
} from '@/utils/auth'
export default defineStore('user', {
  state: (): UserState => {
    return {
      token: getToken(),
      userInfo: getUserInfo(),
      routerList: getRouterList(),
    }
  },
  actions: {
    // 登录
    async login(userinfo: LoginType) {
      const { username, password } = userinfo
      let { data } = await loginApi.login({ username: username.trim(), password: password.trim() })
      this.token = data.token
      setToken(data.token)
      this.getInfo(data.uid)
      await this.getRouterList(data.uid)
    },
    // 退出
    async logout() {
      this.token = ''
      Session.clear()
      resetRouter()
    },
    // 获取用户信息
    async getInfo(uid: number) {
      let { data } = await userApi.getUserInfoApi({ uid })
      this.userInfo = data
      setUserInfo(data)
    },
    // 获取管理员路由
    async getRouterList(uid: number) {
      let { data } = await userApi.getRouterMenuListApi({ uid })
      data = formattingRouter(data)
      addRouterList(data)
      setRouterList(data)
      this.routerList = data
    },
  },
})
