/**
 * localStorage
 */
class LocalStorageAdapter {
  /**********************************
   * 变量s
   ***********************************/

  /**********************************
   * 方法s
   ***********************************/
  constructor() {
    this.init()
  }

  /**
   * 初始化
   */
  public init() {
    console.log('LocalStorageAdapter init!!')
  }
  /**
   * 设置本地存储
   * @param key 键
   * @param val 值
   */
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  /**
   * 获取本地存储
   * @param key 键
   * @returns 返回对应键的值
   */
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }
  /**
   * 删除对应的键值
   * @param key 键
   */
  remove(key: string) {
    window.localStorage.removeItem(key)
  }
  /**
   * 清空本地存储
   */
  clear() {
    window.localStorage.clear()
  }
}

export { LocalStorageAdapter }
