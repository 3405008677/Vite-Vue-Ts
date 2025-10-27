import http from '@/service' // 引入网络请求http

/**
 * 物料分类三级   克隆
 * @returns
 */
export function categoryCloneAPI(params: { fromCategoryId: number; newName: string; newCode: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/material/category/clone', params)
      .then((result) => {
        resolve(result)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 物料一级分类排序
 * @param params 数组
 * @returns
 */
export function updateSortBatchAPI(params: any[]): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/updateSortBatch', params).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 分类分层 删除数据
 */
export function levManageDeleteAPI(id: any): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/delete', { id: id }).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 分类分层 检查名称和编号
 */
export function checkaddCategoryAPI(name: string, code: string, notes: string): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/check', { name: name, code: code, notes: notes }).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 获取全部树状结构
 */
export function secTreeByParentsAPI(parentId: string | number, keyword: string): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/secTreeByParents', { parentId, keyword }).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 分类分层 保存更新
 */
export function levManageSaveUpAPI(datacate: any): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/updateBatch', datacate).then((result) => {
      resolve(result)
    })
  })
}

/**
 *  导出
 * @param categoryCode
 * @returns
 */
export function exportFileAPI(params: any): Promise<any> {
  return new Promise((resolve) => {
    http.post(`/material/feature/exportCategory`, params).then((result) => {
      resolve(result)
    })
  })
}

/**
 *  更新子类的基础属性和排序
 */
export function syncParentAttrAPI(params: any): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/category/syncParentAttr', params).then((result) => {
      resolve(result)
    })
  })
}

/**
 *  物料分类导入
 */
export function categoryReadFileAPI(params: any): Promise<any> {
  return new Promise((resolve) => {
    http.post('/material/feature/importCategory', params).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 获取分类备份数据列表
 */
export function getBackupDataAPI(): Promise<any> {
  return new Promise((resolve) => {
    http.post('/smartshelf/bak/getBakList?opt=category').then((result) => {
      resolve(result)
    })
  })
}

/**
 * 备份分类相关数据
 */
export function backupDataAPI(params: string): Promise<any> {
  return new Promise((resolve) => {
    http.post('/smartshelf/bak/bakData', { opt: 'category', description: params }).then((result) => {
      resolve(result)
    })
  })
}

/**
 * 还原备份 启用此备份
 */
export function restoreBackupDataAPI(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/smartshelf/bak/restore?id=' + id)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 删除此条备份数据
 */
export function deleteBackupDataAPI(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http
      .post('/smartshelf/bak/remove?id=' + id)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
