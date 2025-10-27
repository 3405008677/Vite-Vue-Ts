import http from '@/service' // 引入网络请求http

/**
 * 查询需求下拉数据项
 */
export function dataItemsAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/DataItems', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询详情
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询项目基本信息
 */
export function basicInfoAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('Project/ProjectList/BasicInfo', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：项目列表视图
 */
export function saveDraftAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/SaveDraft', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交
 */
export function submitAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/Submit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询需求列表 包含任务
 */
export function pageListWithTasksAPI(params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/PageListWithTasks', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
    })
  })
}

/**
 * 批量保存
 */
export function batchSaveAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Project/StroyList/BatchSave', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  dataItemsAPI,
  detailsAPI,
  basicInfoAPI,
  saveDraftAPI,
  submitAPI,
  pageListWithTasksAPI,
  batchSaveAPI,
}