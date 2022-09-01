
import { getRouters } from '@/api/login'

const state = {
  routerList: [],
  permissions: []
}

class PermissionStore {
  // 生成路由
  public createRouter () {
    return Promise((resolve) => {
      getRouters()
        .then(({ data }) => {
          resolve(data)
        })
    })
  }
  // 获取我的按钮权限数据
  public getButton () {
    return new Promise((resolve) => {
      getQueryButtonByToken()
        .then(({ data }) => {
          resolve(data)
          this.setButtonList(data)
        })
    })
  }

  // 设置路由
  public setButtonList (button) {
    state.permissions = button
  }

  // 
  public getId (mydata) {
    const p = [],
      v = {},
      meta = {};
    // 理由循环去遍历里面的每一个对象
    mydata.forEach((item) => {
      meta.title = item.name
      meta.isHide = item.isHide
      v.push = item.url
      v.meta = meta
      v.children = item.chiMenu
      if (item.chiMenu) this.getId(item.chiMenu)
      p.push(v)
    })
    return p
  }

  // 私有属性
  protected data () {
    return state
  }

}

export default new PermissionStore()