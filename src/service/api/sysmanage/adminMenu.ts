import http from '@/service' // 引入网络请求http

/**
 * 6.1.11查询系统菜单管理列表(不分页)
 */
export function dataListAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/DataList')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 新增系统菜单
 */
export function addAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 编辑系统菜单
 */
export function editAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除系统菜单(关联删除逻辑待处理)
 */
export function delAPI(params: { id: any }): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/Del', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.10查询系统菜单详情
 */
export function detailsAPI(params: { id: any }): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/Details', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 新增菜单所属视图
 */
export function addViewAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/AddView', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 6.1.23编辑菜单所属视图
 */
export function editViewAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/EditView', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.23删除菜单所属视图
 */
export function delViewAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/DelView', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.25查询菜单所属视图详情
 */
export function viewInfoAPI(id: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/ViewInfo', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.26查询菜单所属视图列表(不分页)
 */
export function viewDataListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/ViewDataList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 新增列表搜索视图
 */
export function addListSearchViewAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/CreateQueryView', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 新增列表高级搜索视图
 */
export function addAdvanceSearchViewAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/CreateAdvQueryView', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.27新增视图所属字段
 */
export function addColumnAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/AddColumn', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.28编辑视图所属字段
 */
export function editColumnAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/EditColumn', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 复制视图所属字段
 */
export function copyColumnAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/CoyFields2View', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.28批量编辑视图所属字段
 */
export function multiEditColumnAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/MultiEditColumn', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除自定义表格列配置接口
 */
export function restoreColumnConfigAPI(viewId: string): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResource/RestoreColumnConfig', { viewId })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.28编辑视图所属字段
 */
export function delColumnAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/DelColumn', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.31查询视图所属字段列表(不分页)
 */
export function columnDataListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/ColumnDataList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.34新增菜单所属附件区域
 */
export function menuAnnexAreaBaseAddAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuAnnexAreaBase/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.35编辑菜单所属附件区域
 */
export function menuAnnexAreaBaseEdittAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuAnnexAreaBase/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *6.1.36删除菜单所属附件区域
 */
export function menuAnnexAreaBaseDelAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuAnnexAreaBase/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.38查询菜单所属附件区域列表(不分页)
 */
export function menuAnnexAreaBasedataListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuAnnexAreaBase/DataList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.21批量保存菜单所属功能（可能含新增和编辑）
 */
export function menuBaseSaveMenuFunsAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/SaveMenuFuns', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.19编辑菜单所属功能(单个操作)
 */
export function menuBaseEditMenuFunAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/EditMenuFun', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.20删除菜单所属功能
 */
export function menuBaseDelMenuFunsAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/DelMenuFuns', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.18查询菜单所属功能(不分页)
 */
export function menuBaseMenuFunListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/MenuFunList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 不分页查询系统功能（用于关联菜单页面）
 */
export function sysFunctionFunDataListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/SysFunction/DataList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.39新增菜单所属打印模板
 */
export function menuPrintTempBaseAddAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuPrintTempBase/Add', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.40编辑菜单所属打印模板
 */
export function menuPrintTempBaseEditAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuPrintTempBase/Edit', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.41删除菜单所属打印模板
 */
export function menuPrintTempBaseDelAPI(id: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuPrintTempBase/Del', { id })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.43查询菜单所属打印模板列表(不分页)
 */
export function menuPrintTempBaseDataListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuPrintTempBase/DataList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 6.1.43查询菜单所属打印模板列表(不分页)
 */
export function dataSyncBusinessAPI(): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/DataSyncBusiness')
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 生成后台模型代码
 */
export function createModelsAPI(ids: string[]): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/CreateModels', { ids })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**c
 * 代码自动生成下载
 */
export function createCodesAPI(params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuBase/CreateCodes', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 视图内字段排序
 * "viewId":"2Ds9tSfMfEKM24zr9353x9F82Z_xtHeO",
 * "colSorts":[{"id":387,"sort":1},{"id":388,"sort":2}]
 */
export function sortColumnsAPI(viewId: string, colSorts: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/MenuResourceBase/SortColumns', { viewId, colSorts })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  sortColumnsAPI,
  dataListAPI,
  addAPI,
  editAPI,
  delAPI,
  detailsAPI,
  addViewAPI,
  editViewAPI,
  copyColumnAPI,
  delViewAPI,
  viewInfoAPI,
  viewDataListAPI,
  addListSearchViewAPI,
  addAdvanceSearchViewAPI,
  addColumnAPI,
  editColumnAPI,
  delColumnAPI,
  columnDataListAPI,
  menuAnnexAreaBaseAddAPI,
  menuAnnexAreaBaseEdittAPI,
  menuAnnexAreaBaseDelAPI,
  menuAnnexAreaBasedataListAPI,
  menuPrintTempBaseAddAPI,
  menuPrintTempBaseEditAPI,
  menuPrintTempBaseDelAPI,
  menuPrintTempBaseDataListAPI,
  menuBaseSaveMenuFunsAPI,
  menuBaseEditMenuFunAPI,
  menuBaseDelMenuFunsAPI,
  menuBaseMenuFunListAPI,
  sysFunctionFunDataListAPI,
  dataSyncBusinessAPI,
  multiEditColumnAPI,
  createCodesAPI,
  restoreColumnConfigAPI,
  createModelsAPI,
}
