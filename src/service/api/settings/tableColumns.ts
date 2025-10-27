import http from '@/service' // 引入网络请求http

/**
 *用户端资源管理（设置管理模块）
 */
export function menusAPI(params?: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/Menus', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.4.2查询菜单页面顶部功能按钮
 */
export function powerFuncListAPI(mcode: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/PowerFuncList', { mcode })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.3查询菜单信息详情（含多语言，用于编辑）
 */
export function menuDetailsAPI(id: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/MenuDetails', { id })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.4保存用户菜单(上级、排序、多语言)配置
 */
export function editMenuAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/EditMenu', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.5查询列表设置页面菜单树
 */
export function resourceMenusAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/ResourceMenus')
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.4.6查询角色授权页面一级菜单列表
 */
export function authMenusAPI(id = ''): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Menu/AuthMenus', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.7查询菜单页面下所有视图及视图属性
 */
export function powerViewColumnListAPI(resCode: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .postAbort('/SysManage/MenuResource/PowerViewColumnList', { resCode })
      .then((result) => {
        resolve(result?.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.8查询菜单所属视图列表(不分页)
 */
export function resourcesViewsAPI(resCode: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/ResourcesViews', { resCode })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.9查询单视图所属字段列表(不分页)
 */
export function viewColumnListAPI(resCode: string, viewId: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/ViewColumnList', { resCode, viewId })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4.10保存视图所属字段配置（支持批量）
 */
export function multiEditColumnAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/MultiEditColumn', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 视图开启授权
 */
export function viewNeedAuthAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/ViewNeedAuth', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  menusAPI,
  powerFuncListAPI,
  menuDetailsAPI,
  editMenuAPI,
  resourceMenusAPI,
  authMenusAPI,
  powerViewColumnListAPI,
  resourcesViewsAPI,
  multiEditColumnAPI,
  viewColumnListAPI,
  viewNeedAuthAPI,
}
