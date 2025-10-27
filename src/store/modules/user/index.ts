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
import storage from '@/utils/core/storage'
import { resetRouter, addRouterList } from '@/router/index'
import { formattingRouter } from '@/router/utils'

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
      token: storage.localStorage.get('TOKEN') || '',
      userInfo: JSON.parse(storage.localStorage.get('USER_INFO') || '{}'),
      routerList: JSON.parse(storage.localStorage.get('ROUTER_LIST') || '[]') || routerere,
    }
  },
  actions: {
    // 登录
    async login(userinfo: LoginType) {
      const { username, password } = userinfo
      let { data } = await loginApi.login({ username: username.trim(), password: password.trim() })
      this.token = data.token
      storage.localStorage.set('TOKEN', data.token)
      await this.getInfo()
      await this.getRouterList()
    },
    // 退出
    async logout() {
      this.token = ''
      storage.localStorage.clear()
      resetRouter()
      location.reload()
    },
    // 获取用户信息
    async getInfo() {
      let { data } = await userApi.getUserInfoApi()
      this.userInfo = data
      storage.localStorage.set('USER_INFO', JSON.stringify(data))
    },
    // 获取管理员路由
    async getRouterList() {
      let { data } = await userApi.getRouterMenuListApi()
      data = formattingRouter(data)
      console.log(data)
      addRouterList(data)
      storage.localStorage.set('ROUTER_LIST', JSON.stringify(data))
      this.routerList = data
    },
  },
})
