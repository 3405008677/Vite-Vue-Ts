// utils/promise.ts

/**
 * @description 接收一个 Promise，返回一个元组 [error, data]
 * @param {Promise<T>} promise - 要处理的 Promise
 * @returns {Promise<[Error | null, T | undefined]>} 包含错误和数据的元组
 */
export function to<T>(promise: Promise<T>): Promise<[Error | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data]) // 成功时返回 [null, data]
    .catch<[Error, undefined]>((err: any) => {
      // 失败时返回 [Error, undefined]
      // 确保错误为 Error 类型（若非 Error 则转换）
      if (err instanceof Error) return [err, undefined]
      return [new Error(String(err)), undefined]
    })
}

export default { to }
