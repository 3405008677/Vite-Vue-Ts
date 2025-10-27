import http from '@/service' // 引入网络请求http

/**
 * 6.1.1查询语种下拉项
 */
export function LangItemsAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/LangItems')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.2下载多语言资源文件
 */
export function DownLoadJsonAPI(): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/DownLoadJson')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.3新增多语言资源分组
 */
export function AddGroupAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/AddGroup', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.4编辑多语言资源分组
 */
export function EditGroupAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/EditGroup', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.5删除多语言资源分组
 */
export function DelGroupAPI(id: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/DelGroup', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.6查询多语言资源分组详情
 */
export function GroupInfoAPI(id: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/GroupInfo', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.1.7分页查询多语言资源分组
 */
export function GroupPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/GroupPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.8新增多语言资源
 */
export function AddSourceAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/AddSource', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.9编辑多语言资源
 */
export function EditSourceAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/EditSource', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.10删除多语言资源
 */
export function DelSourceAPI(id: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/DelSource', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.11查询多语言资源详情
 */
export function SourceInfoAPI(id: number): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/SourceInfo', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.12分页查询多语言资源
 */
export function SourcePageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/SourcePageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 切换后台国际化语言
 */
export function changeLangAPI(id: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/Language/ChangeLang', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 更新语言
 */
export function updateTranslateAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/UpdateTranslate')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  updateTranslateAPI,
  LangItemsAPI,
  DownLoadJsonAPI,
  AddGroupAPI,
  EditGroupAPI,
  DelGroupAPI,
  GroupInfoAPI,
  AddSourceAPI,
  EditSourceAPI,
  DelSourceAPI,
  SourceInfoAPI,
  SourcePageListAPI,
  GroupPageListAPI,
  changeLangAPI,
}
