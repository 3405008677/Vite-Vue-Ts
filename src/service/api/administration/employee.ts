//此页由代码生成:2025-06-06 16:56:39
import http from '@/service' // 引入网络请求http
import { userStore } from '@/store'

/**
 * 部门分层形式选择员工
 * comID —— 公司ID
 * deptCode —— 部门编码
 * keyWord —— 关键词
 * scene —— 因为场景标记 1 = 未绑定账号的员工 ; 0 = 默认
 */
// import {deptEmployeeItemsAPI} from "@/service/api/administration/employee"
export function deptEmployeeItemsAPI(params: any = {}): Promise<API_RETURN> {
  if (!params['compId']) params['compId'] = userStore.userInfo?.dataCompanyId
  if (!params['scene']) params['scene'] = 0

  return new Promise((resolve, reject) => {
    http
      ?.post('/UserManage/Employee/DeptEmployeeItems', params)
      .then((result) => {
        if (!result) result = {} as any
        if (!result.data) result.data = []
        result.data.forEach((item) => {
          // 1 不是叶子节点 |  2 叶子节点
          item['leaf'] = item.deFlag === 2
        })
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询单个详情：员工列表
 */
export function chinese2PinyinAPI(id: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/Chinese2Pinyin', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询单个详情：员工列表
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：员工列表
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：员工列表
 */
export function saveDraftAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/SaveDraft', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：员工列表
 */
export function submitAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/Submit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：员工列表
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：员工列表
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/employee/loadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：员工列表
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/employee/import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：员工列表
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/administration/employee/export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  查询列表数据 账号
 */
export function bankaccPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/BankAccPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  9.22编辑账号（批量）
 */
export function saveBankAccAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/SaveBankAcc', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  9.24删除账号（批量）
 */
export function delBankAccAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/DelBankAcc', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  9.12分页查询员工紧急联系人列表
 */
export function contactsPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/EmerContactPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  9.9新增 && 编辑员工紧急联系人（批量）
 */
export function saveEmerContactAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/SaveEmerContact', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 9.11删除员工紧急联系人（批量）
 */
export function delEmerContactAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/DelEmerContact', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  9.12分页查询员工保险信息（批量）
 */
export function insurancePageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/InsurePageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 9.15新增员工保险信息（批量）
 */
export function saveInsuranceAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/SaveInsurance', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除员工保险信息（批量）
 */
export function delInsuranceAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/DelInsurance', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  chinese2PinyinAPI,
  detailsAPI,
  pageListAPI,
  saveDraftAPI,
  submitAPI,
  delAPI,
  loadImportTempAPI,
  importAPI,
  exportAPI,
  bankaccPageListAPI,
  saveBankAccAPI,
  delBankAccAPI,
  contactsPageListAPI,
  saveEmerContactAPI,
  deptEmployeeItemsAPI,
  delEmerContactAPI,
  insurancePageListAPI,
  saveInsuranceAPI,
  delInsuranceAPI,
}
