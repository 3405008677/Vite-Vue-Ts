// 引入文件
import http from '@/service' // 引入网络请求http

interface OPER_LOG_LIST_TYPE {
  pageSize: number
  pageIndex: number
  compId: string // 公司id
  sourceCode: string // 资源编码
  startTime: string // 开始时间
  endTime: string //结束时间
  opUser: string //操作用户
  opAction: string //操作类型
}

/**
 * 1. 操作日志 查询
 * @returns
 */
// import {getOperLogListAPI} from "@/service/api/common/operateBar.ts"
export function getOperLogListAPI(params: OPER_LOG_LIST_TYPE): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/FileManage/OperLog/GetOperLogList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 2. 数据变更日志
 * @returns
 */
// import {getChangeLogListAPI} from "@/service/api/common/operateBar.ts"
export function getChangeLogListAPI(params: OPER_LOG_LIST_TYPE): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/FileManage/DataChangeLog/GetChangeLogList', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

export default { getOperLogListAPI, getChangeLogListAPI }
