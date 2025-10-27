//此页由代码生成:2025-08-19 14:18:18
import http from '@/service' // 引入网络请求http
import { userStore } from '@/store'

/**
 * 查询单个详情：客户列表
 */
export function selectItemsAPI(data?: any): Promise<API_RETURN> {
  let params = {
    compId: userStore.userInfo.dataCompanyId,
    keyWord: data?.keyWord || '',
  }
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/SelectItems', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询单个详情：客户列表
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询列表数据：客户列表
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  新增或存草稿：客户列表
 */
export function saveDraftAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/SaveDraft', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑或提交：客户列表
 */
export function submitAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/Submit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除：客户列表
 */
export function delAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 下载数据导入模板(Excel文件)：客户列表
 */
export function loadImportTempAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/LoadImportTemp')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导入数据(Excel文件)：客户列表
 */
export function importAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/Import')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 导出数据(Excel文件)：客户列表
 */
export function exportAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/Customer/Export', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：股东信息
 */
export function sublistShareholderPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerShareholder/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：股东信息
 */
export function sublistShareholderSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerShareholder/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：股东信息
 */
export function sublistShareholderDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerShareholder/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：关联公司
 */
export function sublistRelateOrgPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerRelateOrg/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：关联公司
 */
export function sublistRelateOrgSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerRelateOrg/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：关联公司
 */
export function sublistRelateOrgDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerRelateOrg/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


/**
 *  查询客户联系人填充下拉选项，根据筛选条件查询，最多100项
 */
export function sublistConcatsSelectItemstAPI(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!data?.custId) return resolve([])
    let params = {
      "custId": data?.custId || '',
      "keyWord": data?.keyWord || '',
    }
    http
      .post('/Sales/SaleCustomerContacts/SelectItems', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：客户联系人
 */
export function sublistConcatsPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerContacts/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：客户联系人
 */
export function sublistConcatsSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerContacts/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：客户联系人
 */
export function sublistConcatsDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerContacts/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：客户收货地址
 */
export function sublistReceiveaddrPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerReceiveaddr/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：客户收货地址
 */
export function sublistReceiveaddrSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerReceiveaddr/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：客户收货地址
 */
export function sublistReceiveaddrDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerReceiveaddr/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：收付款账号
 */
export function sublistPayAccountPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerPayAccount/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：收付款账号
 */
export function sublistPayAccountSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerPayAccount/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：收付款账号
 */
export function sublistPayAccountDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerPayAccount/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：对外投资
 */
export function sublistOutinvestPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerOutboundInvest/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：对外投资
 */
export function sublistOutinvestSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerOutboundInvest/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：对外投资
 */
export function sublistOutinvestDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerOutboundInvest/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *  分页查询子表：知识产权
 */
export function sublistIntellectPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerIntellectProp/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 批量保存子表：知识产权
 */
export function sublistIntellectSaveAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerIntellectProp/Save', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除子表：知识产权
 */
export function sublistIntellectDelAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/Sales/SaleCustomerIntellectProp/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  selectItemsAPI,
  detailsAPI,
  pageListAPI,
  saveDraftAPI,
  submitAPI,
  delAPI,
  loadImportTempAPI,
  importAPI,
  exportAPI,
  sublistShareholderPageListAPI,
  sublistShareholderSaveAPI,
  sublistShareholderDelAPI,
  sublistRelateOrgPageListAPI,
  sublistRelateOrgSaveAPI,
  sublistRelateOrgDelAPI,
  sublistConcatsPageListAPI,
  sublistConcatsSaveAPI,
  sublistConcatsDelAPI,
  sublistReceiveaddrPageListAPI,
  sublistReceiveaddrSaveAPI,
  sublistReceiveaddrDelAPI,
  sublistPayAccountPageListAPI,
  sublistPayAccountSaveAPI,
  sublistPayAccountDelAPI,
  sublistOutinvestPageListAPI,
  sublistOutinvestSaveAPI,
  sublistOutinvestDelAPI,
  sublistIntellectPageListAPI,
  sublistIntellectSaveAPI,
  sublistConcatsSelectItemstAPI,
  sublistIntellectDelAPI,
}
