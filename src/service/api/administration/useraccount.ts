//此页由代码生成:2025-06-06 18:24:57
import http from '@/service' // 引入网络请求http

/**
 * 7.17修改账号状态（激活/休眠）
 *　userIds　账号id数组
 *　cypher　SHA1加密后的密文，为空时默认
 */
export function resetPassWordAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/ResetPassWord', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 7.17修改账号状态（激活/休眠）
 *　userIds　账号id数组
 *　opType　1激活账号，2账号休眠
 */
export function activationOpAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/ActivationOp', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 7.17 账号延期
 *　userIds 账号id数组
 *　validDate 账号有效期
 */
 export function extendValidityAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/ExtendValidity', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 7.15申请扩展账号
 */
export function extendAccountAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/ExtendAccount', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询单个详情：账号列表
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：账号列表
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：账号列表
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：账号列表
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：账号列表
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：账号列表
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/LoadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：账号列表
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：账号列表
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/UserAccount/Export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  resetPassWordAPI,
  activationOpAPI,
  extendValidityAPI,
  extendAccountAPI,
  detailsAPI,
  pageListAPI,
  addAPI,
  editAPI,
  delAPI,
  loadImportTempAPI,
  importAPI,
  exportAPI,
}
