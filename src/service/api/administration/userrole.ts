//此页由代码生成:2025-06-20 14:59:45
import http from '@/service' // 引入网络请求http

/**
 * 查询单个详情：角色列表
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：角色列表
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：角色列表
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：角色列表
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：角色列表
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 7.8查询角色业务功能权限
 */
export function rolePowerAPI(roleId: any, resCode: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/RolePower', { roleId, resCode })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 保存角色权限
 */
export function saveRolePowerAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/SaveRolePower', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：角色列表
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/LoadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：角色列表
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：角色列表
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/Export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询右侧树形 数据
 */
export function roleDicPowerAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserRole/RoleDicPower', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  查询用户账号对应的角色列表
 */
export function RoleListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/RoleList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  切换数据公司
 */
export function changeCompanyAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/ChangeCompany', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  保存用户分配结果
 */
export function saveUserInfo(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/UserAccount/SaveUserInfo', params)
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
  saveRolePowerAPI,
  rolePowerAPI,
  importAPI,
  exportAPI,
  roleDicPowerAPI,
  RoleListAPI,
  changeCompanyAPI,
  saveUserInfo,
}
