//此页由代码生成:2025-09-30 07:10:44
import http from '@/service' // 引入网络请求http

/**
 * 查询任务下拉数据项
 */
export function dataItemsAPI(id: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/DataItems', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询单个详情：任务列表视图
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：任务列表视图
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：任务列表视图
 */
export function saveDraftAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/SaveDraft', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：任务列表视图
 */
export function submitAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/Submit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存：任务列表视图
 */
export function batchSaveAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/BatchSave', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：任务列表视图
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：任务列表视图
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/LoadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：任务列表视图
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/Import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：任务列表视图
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/Export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 添加评论：任务列表视图
 */
export function addCommentsAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/AddComments', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 分页查询评论列表：任务列表视图
 */
export function commentsPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/CommentsPageList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除评论：任务列表视图
 */
export function deleteCommentsAPI(id: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/DeleteComments', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询前置任务下拉数据
 */
export function preTaskDataItemsAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/TaskList/PreTaskDataItems', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  preTaskDataItemsAPI,
  dataItemsAPI,
  detailsAPI,
  pageListAPI,
  saveDraftAPI,
  submitAPI,
  batchSaveAPI,
  delAPI,
  loadImportTempAPI,
  importAPI,
  exportAPI,
  addCommentsAPI,
  commentsPageListAPI,
  deleteCommentsAPI,
}
