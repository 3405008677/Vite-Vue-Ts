/**
 * 请求管理器
 * 用于管理 HTTP 请求的生命周期，支持单个请求中断、全局请求中断（如路由切换场景）
 * 核心能力：
 * - 基于唯一 key 管理单个请求的中断与清理
 * - 提供全局中断信号（可与单个请求信号组合）
 * - 自动清理已完成/中断的请求，避免内存泄漏
 */
class RequestManager {
  // 存储待处理请求：key -> AbortController（仅管理主动添加的请求）
  private pendingRequests = new Map<string, AbortController>()
  // 全局中断控制器（用于路由切换等需要批量中断的场景）
  private globalController = new AbortController()
  // 路由跳转
  routerJump = false

  /**
   * 添加请求到管理器（自动中断同 key 的旧请求）
   * @param key 请求唯一标识（建议：`method-url-params` 组合，确保唯一性）
   * @param controller 该请求的 AbortController 实例（可选，默认自动创建）
   * @returns 被中断的旧控制器（若存在）
   */
  addRequest(key: string, controller: AbortController = new AbortController()): AbortController | undefined {
    // 中断并移除旧请求，返回旧控制器（方便调用者处理后续逻辑）
    const oldController = this.abortRequest(key)
    this.pendingRequests.set(key, controller)
    return oldController
  }

  /**
   * 移除请求（不中断，仅从管理器中清除）
   * @param key 请求唯一标识
   * @returns 被移除的控制器（若存在）
   */
  removeRequest(key: string): AbortController | undefined {
    const controller = this.pendingRequests.get(key)
    if (controller) {
      this.pendingRequests.delete(key)
    }
    return controller
  }

  /**
   * 中断特定请求（并自动从管理器中移除）
   * @param key 请求唯一标识
   * @param reason 中断原因（可选，便于调试）
   * @returns 被中断的控制器（若存在）
   */
  abortRequest(key: string, reason?: string): AbortController | undefined {
    const controller = this.pendingRequests.get(key)
    if (controller && !controller.signal.aborted) {
      controller.abort(reason) // 仅在未中断时执行，避免重复调用
      this.pendingRequests.delete(key)
      return controller
    }
    return undefined
  }

  /**
   * 中断所有已管理的请求（保留全局控制器）
   * @param reason 中断原因（可选）
   * @returns 被中断的请求数量
   */
  abortAllRequests(reason?: string): number {
    let count = 0
    this.pendingRequests.forEach((controller, key) => {
      if (!controller.signal.aborted) {
        controller.abort(reason)
        count++
      }
      this.pendingRequests.delete(key)
    })
    return count
  }

  /**
   * 中断全局信号关联的请求（如路由切换场景）
   * 注意：仅影响使用了全局信号（或与全局信号组合）的请求
   * @param reason 中断原因（默认：路由切换）
   */
  abortGlobalRequests(reason: string = 'Route changed'): void {
    console.log('中断全局请求:', reason)
    // 中断当前全局信号，已关联的请求会响应中断
    if (!this.globalController.signal.aborted) {
      this.globalController.abort(reason)
    }
    // 创建新的全局控制器（旧信号已失效，需更新）
    this.globalController = new AbortController()
  }

  /**
   * 获取全局中断信号（可与请求自身信号组合使用）
   * @returns 全局 AbortSignal
   */
  getGlobalSignal(): AbortSignal {
    return this.globalController.signal
  }

  /**
   * 工具方法：组合多个信号（当任一信号中断时，返回的信号也会中断）
   * 用于需要同时响应「自身中断」和「全局中断」的场景
   * @param signals 需组合的信号列表
   * @returns 组合后的 AbortSignal
   */
  combineSignals(...signals: AbortSignal[]): AbortSignal {
    const combinedController = new AbortController()

    // 任一信号中断时，触发组合信号中断
    const handleAbort = () => {
      if (!combinedController.signal.aborted) {
        combinedController.abort()
      }
    }

    // 监听所有信号，自动清理监听
    signals.forEach((signal) => {
      if (signal.aborted) {
        handleAbort() // 若信号已中断，直接触发
      } else {
        signal.addEventListener('abort', handleAbort, { once: true })
      }
    })

    return combinedController.signal
  }

  /**
   * 便捷方法：包裹请求并自动管理生命周期
   * 无需手动调用 add/remove，请求完成后自动清理
   * @param key 请求唯一标识
   * @param request 实际请求函数（接收 signal 参数）
   * @param options 配置项（是否关联全局信号）
   * @returns 请求结果
   */
  async wrapRequest<T>(
    key: string,
    request: (signal: AbortSignal) => Promise<T>,
    options: { useGlobalSignal?: boolean } = { useGlobalSignal: true },
  ): Promise<T> {
    const controller = new AbortController()
    this.addRequest(key, controller)

    // 组合信号：自身信号 + 全局信号（若启用）
    const signals: AbortSignal[] = [controller.signal]
    if (options.useGlobalSignal) {
      signals.push(this.getGlobalSignal())
    }
    const signal = this.combineSignals(...signals)

    try {
      return await request(signal)
    } catch (error: any) {
      // 如果是中断错误，转换为自定义中断错误
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        const abortError = new RequestAbortedError(`请求 [${key}] 已被取消`)
        console.debug(abortError.message)
        throw abortError
      }
      // 其他错误继续抛出
      throw error
    } finally {
      // 请求完成（无论成功/失败/中断），自动从管理器移除
      this.removeRequest(key)
    }
  }

  /**
   * 检查请求是否在管理中（未完成且未中断）
   * @param key 请求唯一标识
   * @returns 是否存在
   */
  hasRequest(key: string): boolean {
    const controller = this.pendingRequests.get(key)
    return !!controller && !controller.signal.aborted
  }

  /**
   * 获取当前活跃请求数量（未完成且未中断）
   * @returns 活跃请求数
   */
  getActiveCount(): number {
    // 自动清理已中断的请求，确保数量准确
    this.cleanupAborted()
    return this.pendingRequests.size
  }

  /**
   * 自动清理已中断的请求（内部维护用）
   */
  private cleanupAborted(): void {
    const abortedKeys: string[] = []
    this.pendingRequests.forEach((controller, key) => {
      if (controller.signal.aborted) {
        abortedKeys.push(key)
      }
    })
    abortedKeys.forEach((key) => this.pendingRequests.delete(key))
  }
}

// 自定义中断错误类
class RequestAbortedError extends Error {
  public isAborted: boolean = true
  public code: string = 'ABORTED'

  constructor(message: string = '请求已被取消') {
    super(message)
    this.name = 'RequestAbortedError'
  }
}

export const requestManager = new RequestManager()
export default requestManager
export type { RequestManager as REQUEST_MANAGER_TYPE }
