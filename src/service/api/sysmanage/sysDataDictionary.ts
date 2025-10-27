import http from '@/service' // 引入网络请求http

/**
 * 6.3.5分页查询字典类型
 */
export function typePageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/TypePageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 新增数据字典类型
 */
export function addTypeAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/AddType', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.3.2编辑数据字典类型
 */
export function editTypeAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/EditType', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.3.3删除数据字典类型
 */
export function delTypeAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/DelType', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.3.4查询字典类型详情
 */
export function typeInfoAPI(id: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/TypeDetails', { id })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// --------------------------------------------------

/**
 * 6.3.11分页查询数据项
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.3.6新增数据项
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.3.7编辑数据项
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.3.8删除数据项
 */
export function delAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.3.10查询数据项详情
 */
export function detailsAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/Details', { id })
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 数据同步
 */
export function dataSyncAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/BasicDataBase/DataSync')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  typePageListAPI,
  addTypeAPI,
  editTypeAPI,
  delTypeAPI,
  typeInfoAPI,
  pageListAPI,
  addAPI,
  editAPI,
  delAPI,
  detailsAPI,
  dataSyncAPI,
}
