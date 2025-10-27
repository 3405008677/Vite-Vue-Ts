//此页由代码生成:2025-06-18 12:02:37
import http from '@/service' // 引入网络请求http

/**
 * 查询单个详情：单据编码列表视图
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BillCodedRule/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：单据编码列表视图
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BillCodedRule/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：单据编码列表视图
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BillCodedRule/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：单据编码列表视图
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BillCodedRule/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：单据编码列表视图
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BillCodedRule/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：单据编码列表视图
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/settings/billcodingrules/loadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：单据编码列表视图
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/settings/billcodingrules/import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：单据编码列表视图
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/settings/billcodingrules/export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  detailsAPI,
  pageListAPI,
  addAPI,
  editAPI,
  delAPI,
  loadImportTempAPI,
  importAPI,
  exportAPI,
}
