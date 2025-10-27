import http from '@/service' // 引入网络请求http

/**
 * 分类物料分页接口
 */
export function materialCategoryPageAPI(params: object) {
  return new Promise((resolve, reject) => {
    http
      .post('/engineer/material/categoryPage', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 分类物料  获取全部树状结构
 */
export function secTreeByParentsAPI(parentId: string | number, keyword: string) {
  return new Promise((resolve, reject) => {
    http
      .post('/material/category/secTreeByParents', { parentId, keyword })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 分类物料接口
 */
export function materialCategoryAPI(params: object) {
  return new Promise((resolve, reject) => {
    http
      .post('/engineer/material/category', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
