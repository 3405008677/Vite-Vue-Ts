import http from '@/service' // 引入网络请求http

/**
 * 完成一组任务
 */
export function completeTaskListAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/workflow/workflow/completeTaskList', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 校验撒消
 */
export function checkCancelAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/workflow/workflow/checkCancel', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 校验反审
 */
export function checkRollbackApproveAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/workflow/workflow/checkRollbackApprove', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 校验待办 判断是否有权限
 */
export function checkTodoAPI(params: any): Promise<API_RETURN> {
  return new Promise((resolve, reject) => {
    http
      .post('/workflow/workflow/checkTodo', params)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  completeTaskListAPI,
  checkCancelAPI,
  checkRollbackApproveAPI,
  checkTodoAPI,
}
