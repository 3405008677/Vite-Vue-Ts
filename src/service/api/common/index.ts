/**
 * 统计：
 * 获取公司数据列表
 * 获取公司员工数据列表
 * 供应商信息列表
 * 客户信息列表
 * 获取原厂品牌列表
 * 获取物料分类列表
 * 获取物料类型 多选级联组件数据
 * 获取产品线列表
 * 获取物料归属所属公司
 * 获取物料归属者
 * 获取原单类型
 */

import http from '@/service' // 引入网络请求http
import { userStore } from '@/store'

export interface RETURN_DATA_TYPE {
  label: string
  value: string | number
  [x: string]: any
}

export interface TABLE_RESOLVE {
  totalCount: number
  items: Array<any>
  [x: string]: any
}

/**
 * unitMeasure —— 计量单位
 * typeReceived —— 收货类型
 * weightUnit —— 重量单位
 * approvalStatus —— 审批状态
 * currencysType ———— 币别
 * packagingMode ———— 包装方式
 * sys_employee ———— 录入人
 * materOrigin ———— 物料属性
 * sourceType ———— 标签来源类型
 * labelState ———— 标签状态
 * closingSign ———— 结案标识
 * TaxRate —— 税率
 * deliveryMethod ———— 收货方式
 * carrier ———— 承运商
 * remotePayment ———— 运费支付
 * qualityResult ———— 质检结果
 * typeOfBad ———— 不良类型
 * typeWarehousing ———— 收货类下
 * MatLabelFields ———— 标签规则 匹配属性
 * MatLblSplitChar ———— 标签规则 切割字符串
 * outsType —— 外协类型
 * ProductLine —— 产品线
 * humSenGrade ———— 湿敏等级
 * depreciationType ———— 资产减值类型
 * timeUnit ———— 时间周期
 * periodTime ———— 有效期配置
 * substituteWay ———— 替代方式
 * alterType ———— 替代方式
 * objectType ———— 项目类型（项目列表）
 * objectType ———— 项目状态（项目列表）
 * quantityAccuracy ———— 数量精度
 * subquentPro ———— 后端工艺
 * feederType ———— 送料器类型
 * netResiValueRate ———— 净残值率
 * ProcessDocType
 */
export type QUERY_BASIC_LIST_TYPE =
  | 'timeUnit'
  | 'depreciationType'
  | 'humSenGrade'
  | 'ProductLine'
  | 'outsType'
  | 'MatLblSplitChar'
  | 'MatLabelFields'
  | 'typeWarehousing'
  | 'typeOfBad'
  | 'qualityResult'
  | 'remotePayment'
  | 'carrier'
  | 'deliveryMethod'
  | 'TaxRate'
  | 'closingSign'
  | 'purtDict'
  | 'bomType'
  | 'labelState'
  | 'sourceType'
  | 'materOrigin'
  | 'sys_employee'
  | 'packagingMode'
  | 'currencysType'
  | 'approvalStatus'
  | 'invenClass'
  | 'weightUnit'
  | 'unitMeasure'
  | 'typeReceived'
  | 'periodTime'
  | 'substituteWay'
  | 'alterType'
  | 'objectType'
  | 'objectState'
  | 'quantityAccuracy'
  | 'subquentPro'
  | 'feederType'
  | 'netResiValueRate'
  | 'ProcessDocType'

/**
 * 选人组件(查询员工填充选择器)
 * @param params
 * @returns
 */
export function employeeSelectAPI(params?: {
  compId?: string
  deptCode?: string
  keyWord?: string
  scene?: number
  includId?: string
}): Promise<RETURN_DATA_TYPE[]> {
  if (!params) params = {}
  if (params?.compId) params!.compId = userStore.userInfo.dataCompanyId
  return new Promise((resolve, reject) => {
    http
      .post('/UserManage/Employee/EmployeeItems', params)
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        if (params && params['isAll']) return resolve(result.data)

        resolve(
          result.data.map((item: any) => {
            return {
              label: item.txt,
              value: item.val,
            } as RETURN_DATA_TYPE
          }),
        )
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取公司数据列表
 */
export function companyAPI(params?: object): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/admin/company/queryList')
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        if (params && params['isAll']) return resolve(result.data)

        let newData = result.data.map((item: any) => {
          return {
            label: item.comn,
            value: item.coid,
          } as RETURN_DATA_TYPE
        })
        // console.log('物料归属所属公司', newData)

        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取公司员工数据列表
 */
export function employeeAPI(): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/Administration/Employee/EmployeeDictionary')
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          return {
            label: item.empn,
            value: item.emid,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取员工下拉组件数据
 * @returns
 */
export function getSelectionEmployeeAPI() {
  return new Promise((resolve, reject) => {
    http
      .post('/Administration/Employee/Select')
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          return {
            label: item.txt,
            value: item.val,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 供应商信息列表 包含草稿
 */
export function supplierAPI(isAll?: boolean): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    let params = { pageSize: 999, pageIndex: 1, data: { isDraft: false } }
    http
      .post('/pur/supplier/SupplierPage', params)
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data.items) return resolve([])
        if (isAll) return resolve(result.data.items)
        let newData = result.data.items?.map((item: any) => {
          return {
            label: item.supa,
            value: item.suid,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 供应商信息列表 不包含草稿
 */
export function supplierListAPI(isAll?: boolean): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    let params = { pageSize: 999, pageIndex: 1, data: { isDraft: false } }
    http
      .post('/pur/supplier/querySupplierList', params)
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        if (isAll) return resolve(result.data)
        let newData = result.data?.map((item: any) => {
          return {
            label: item.supa,
            value: item.suid,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 客户信息列表
 */
export function customerAPI(params?: object): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    params = { pageSize: 999, pageIndex: 1, data: {}, ...params }
    http
      .post('/sale/Customer/CustomerPageList', params)
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data.items) return resolve([])
        if (params && params['isAll']) return resolve(result.data.items)
        let newData = result.data.items.map((item: any) => {
          return {
            label: item.abbr,
            value: item.csid,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取原厂品牌列表
 */
export function brandListAPI(params?: object): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    if (!params) {
      params = { data: { company: userStore.userInfo.dataCompanyId }, pageIndex: 1, pageSize: 20000 }
    }
    http
      .post('/pur/brand/queryPageList', params)
      .then((result) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.items.map((item: any) => {
          return {
            label: item.brandName,
            value: item.brandNo,
            id: item.id,
            approveStatus: item.approveStatus,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取物料分类列表
 */
interface materListAPI_TYPE {
  level?: number
  parentId?: number
}
export function materListAPI(params?: materListAPI_TYPE): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    if (!params) {
      params = { level: 1 }
    }
    http
      .get('api/material/category/listByLevelAndParent', params)
      .then((result: any) => {
        if (result.code !== 200) reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

interface materialFieldListAPI_TYPE {
  data: any
  keyword: string
  pageIndex: number
  pageSize: number
}
/**
 * 获取物料分类 对应属性 特性的列表
 */
export function materialFieldListAPI(params: materialFieldListAPI_TYPE): Promise<TABLE_RESOLVE> {
  return new Promise((resolve, reject) => {
    let newParams: any = {}
    newParams['param'] = params.data
    newParams['pageSize'] = params.pageSize
    newParams['pageNo'] = params.pageIndex
    newParams['keyword'] = params.keyword
    newParams['orders'] = [
      { asc: false, column: 'update_time' },
      { asc: true, column: 'id' },
    ]

    http
      .post('/material/field/list', newParams)
      .then((result: any) => {
        if (result.code !== 200) return reject(result.message)
        if (!result.records) {
          return resolve({
            items: [],
            totalCount: 0,
          })
        }
        resolve({
          items: result.records,
          totalCount: result.total,
        })
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

interface materListAllAPI_TYPE {
  parentId: number
  keyword?: any
}
/** *
 * 获取物料类型 多选数据
 */
export function materListAllAPI(params?: materListAllAPI_TYPE): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    if (!params) {
      params = { parentId: 0 }
    }
    http
      .post('/material/category/secTreeByParents', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/** *
 * 获取物料类型 特点数据
 */
export function materialFeatureAPI(id: number): Promise<{ left: Array<any>; right: Array<any> }> {
  return new Promise((resolve, reject) => {
    http
      .get('/material/feature/getById', { categoryId: id })
      .then((result: any) => {
        if (result.code !== 200) return reject(result.msg)
        if (!result.data) return resolve({ left: [], right: [] })
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取产品线列表
 */
export function productLineListAPI(): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    let params = { bdtc: 'ProductLine' }
    http
      .post('/systemconfig/systemconfig/basicData/queryBasicList', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          return {
            label: item.badtChs,
            value: item.badv,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取计量单位列表
 */
export function unitListAPI(): Promise<RETURN_DATA_TYPE[]> {
  return queryBasicListAPI('unitMeasure')
}

/**
 * 获取物料归属所属公司
 */
export function materialCompanyAPI(params?: any): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/sale/Customer/MaterialOwners', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取物料归属者
 */
export function materialBelongerAPI(): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/sale/Customer/MaterialOwners', {})
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        result.data = result.data.filter((item: any) => !!item.name)
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 获取原单类型
 */
export function getSourceOrderListAPI(params: { flowCode: string; sourceCode: string }): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/workflow/business/querySourceOrderList', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data) return resolve([])
        let newData = result.data.map((item: any) => {
          // 麻蛋  后端不改  就这样吧 操蛋
          if (item.sourceName === '请购单') {
            return {
              label: '采购申请',
              value: item.sourceCode,
            } as RETURN_DATA_TYPE
          } else {
            return {
              label: item.sourceName,
              value: item.sourceCode,
            } as RETURN_DATA_TYPE
          }
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 *
 * 生成编码
 * @param coid 公司编码  传空 默认用户公司
 * @param type 单据类型
 * @returns
 * 导入  import { billNo } from '@/utils'
 * 返回 编码 和 null
 */
export function getBillNo(coid: string | number | null, type: string | number) {
  return new Promise((resolve: (value: string | null) => void, reject) => {
    if (!coid) coid = userStore.userInfo.dataCompanyId
    http
      .post('/SysManage/BillCodedRule/BillNo', { coid, type })
      .then((result) => {
        resolve(result.data.billNo)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 查询源单列表
 */
export function sourceListAPI(params: any): Promise<object> {
  return new Promise((resolve, reject) => {
    http
      .post('/smartshelf/sourceOrder/queryPageList', params)
      .then((result) => {
        if (result.code !== 1) reject(result.message)
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

// —————————————————————————————————— queryBasicList 数据字典 ————————————————————————————————————
/**
 * 数据字典
 * @param type 字典类型
 * @param isAll 是否返回全部数据
 * @returns Promise
 */
export function queryBasicListAPI(type: QUERY_BASIC_LIST_TYPE | any, isAll = false): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    let params = { typeCode: type, langCode: 'zh-cn' }
    http
      .post('/SysManage/BasicData/SelectDataItem', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        if (!result.data && !result.data.dataItems) return resolve([])
        if (isAll) resolve(result.data.dataItems)
        let newData = result.data.dataItems.map((item: any) => {
          return { label: item.txt, value: item.val } as RETURN_DATA_TYPE
        })
        resolve(newData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 保存数据字典
 */
export function addBasicDataAPI(params: any[]): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/systemconfig/basicData/addBasic', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        return resolve(result)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 更新数据字典
 */
export function editBasicDataAPI(params: any[]): Promise<RETURN_DATA_TYPE[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/systemconfig/basicData/saveBasic', params)
      .then((result: any) => {
        if (result.code !== 1) return reject(result.message)
        return resolve(result)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}
