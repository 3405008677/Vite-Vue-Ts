import http from '@/service' // 引入网络请求http

/**
 *  分页查询公司数据
 */
export function pageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/PageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除公司
 */
export function companyDelAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1新增公司--保存草稿
 */
export function saveDraftAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/SaveDraft', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.2编辑公司--提交保存
 */
export function submitAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/Submit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.4公司详情
 */
export function detailsAPI(id: number | string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/Details', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.6公司选择器数据项(兼容树形)
 * @param isTree 当赋值1时，输出结果为树形 默认0
 */
export function dataItemsAPI(isTree: number = 0): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      ?.post('/UserManage/Company/TreeItems', { isTree })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.8保存公司收货地址（批量）
 */
export function saveReceAddrAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/SaveReceAddr', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.8新增公司收货地址（批量）
 */
export function addReceAddrAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/AddReceAddr', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.9编辑公司收货地址（批量）
 */
export function editReceAddrAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/EditReceAddr', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.11删除公司收货地址（批量）
 */
export function delReceAddrAPI(ids: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/DelReceAddr', { ids })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 分页查询公司收货地址列表
 */
export function receAddrPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/ReceAddrPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.8保存公司收付款账号（批量）
 */
export function saveBankAccAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/SaveBankAcc', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.15新增公司收付款账号（批量）
 */
export function addBankAccAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/AddBankAcc', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.16编辑公司收付款账号（批量）
 */
export function editBankAccAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/EditBankAcc', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 6.18删除公司收付款账号（批量）
 */
export function delBankAccAPI(ids: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/DelBankAcc', { ids })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.19分页查询公司收付款账号列表
 */
export function bankAccPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/BankAccPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.8保存行政硬件设施（批量）
 */
export function saveEquipmentAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/SaveEquipment', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.22新增行政硬件设施（批量）
 */
export function addEquipmentAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/AddEquipment', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.23编辑行政硬件设施（批量）
 */
export function editEquipmentAPI(params: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/EditEquipment', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 6.24删除行政硬件设施（批量）
 */
export function delEquipmentAPI(ids: any[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/DelEquipment', { ids })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 分页查询行政硬件设施列表
 */
export function equipPageListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Company/EquipPageList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  pageListAPI,
  companyDelAPI,
  saveDraftAPI,
  submitAPI,
  saveBankAccAPI,
  saveReceAddrAPI,
  saveEquipmentAPI,
  detailsAPI,
  dataItemsAPI,
  addReceAddrAPI,
  delReceAddrAPI,
  receAddrPageListAPI,
  addBankAccAPI,
  editBankAccAPI,
  delBankAccAPI,
  bankAccPageListAPI,
  addEquipmentAPI,
  editEquipmentAPI,
  delEquipmentAPI,
  equipPageListAPI,
}
