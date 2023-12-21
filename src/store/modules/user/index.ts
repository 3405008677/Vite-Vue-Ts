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
let routerere = [
  {
    icon: 'system',
    list: [
      {
        icon: 'admin',
        list: [],
        menuId: 2,
        name: '管理员管理',
        open: null,
        orderNum: 0,
        parentId: 0,
        parentName: null,
        perms: null,
        type: 1,
        url: 'sys/user',
      },
    ],
    menuId: 1,
    name: '系统管理',
    open: null,
    orderNum: 0,
    parentId: 0,
    parentName: null,
    perms: null,
    type: 0,
    url: null,
  },
]
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
      await this.getInfo()
      await this.getRouterList()
    },
    // 退出
    async logout() {
      this.token = ''
      Session.clear()
      resetRouter()
      location.reload()
    },
    // 获取用户信息
    async getInfo() {
      let { data } = await userApi.getUserInfoApi()
      this.userInfo = data
      setUserInfo(data)
    },
    // 获取管理员路由
    async getRouterList() {
      let { data } = await userApi.getRouterMenuListApi()
      data = formattingRouter(data)
      console.log(data)
      addRouterList(data)
      setRouterList(data)
      this.routerList = data
    },
  },
})
