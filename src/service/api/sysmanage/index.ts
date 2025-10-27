import http from '@/service' // 引入网络请求http

/**
 * 查询操作日志列表分页
 */
export function getOperationLog(params: any): Promise<object> {
  return new Promise((resolve, reject) => {
    http
      .post('/systemconfig/log/queryPageList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
