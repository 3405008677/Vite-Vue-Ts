// 通用基础数据

import http from '@/service' // 引入网络请求http

/**
 * 6.6.1分页查询字典类型
 */
export function typePageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/TypePageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.2新增数据项
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.3编辑数据项
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.4删除数据项*
 */
export function delAPI(id: any, realdel?: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/Del', { id, realdel })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.5修改数据项使用状态
 */
export function setStateAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/SetState', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.6查询数据项详情
 */
export function detailsAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/Details', { id })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6.7分页查询数据项
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 查询基础数据分页  针对弹窗
export function queryBasicPageListAPI(params: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicData/PopPageList', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

export default {
  typePageListAPI,
  addAPI,
  editAPI,
  delAPI,
  setStateAPI,
  detailsAPI,
  pageListAPI,
  queryBasicPageListAPI,
}
