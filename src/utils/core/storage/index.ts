/**
 * 自定义Cache公共函数，主要操作cookie，localStorage，sessionStorage
 * @author jackfull
 * @since 2025-01-20
 */
const storage = {
  /**
   * 针对 cookie 操作
   */
  cookie: {
    /**
     * 设置 Cookie
     * @param name Cookie 名称
     * @param value Cookie 值
     * @param days 过期时间（天数）
     */
    set(name: string, value: string, days: number): void {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // 计算过期时间
      const expires = `expires=${date.toUTCString()}`
      document.cookie = `${name}=${value};${expires};path=/`
    },

    /**
     * 获取 Cookie
     * @param name Cookie 名称
     * @returns Cookie 值（如果不存在则返回 null）
     */
    get(name: string): string | null {
      const cookieName = `${name}=`
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim()
        if (cookie.startsWith(cookieName)) {
          return cookie.substring(cookieName.length, cookie.length)
        }
      }
      return null
    },

    /**
     * 删除 Cookie
     * @param name Cookie 名称
     */
    del(name: string): void {
      this.set(name, '', -1) // 设置过期时间为过去的时间
    },
  },
  /**
   * 操作localStorage，本地持久化存储，5M存储空间
   */
  localStorage: {
    /**
     * @name: 设置localStorage值
     * @param:  key   string  cache-key名称
     * @param:  value  string cache值
     */
    set: (key: string, value: string) => {
      window.localStorage.setItem(key, value)
    },

    /**
     * @name: 获取localStorage值
     * @param:  key   string  cache-key名称
     */
    get(key: string) {
      const value = window.localStorage.getItem(key)
      return value || ''
    },

    /**
     * @name: 删除localStorage值
     * @param:  key   string  cache-key名称
     */
    del(key: string) {
      window.localStorage.removeItem(key)
    },

    /**
     * @name: 清空localStorage所有的值
     * @param:  null
     */
    clear() {
      window.localStorage.clear()
    },
  },

  /**
   * 操作sessionStorage，浏览器内存存储，5M存储空间
   */
  sessionStorage: {
    /**
     * @name: 设置sessionStorage值
     * @param:  key   string  cache名称
     * @param:  value  string cache-key名称
     */
    set(key: string, value: string) {
      window.sessionStorage.setItem(key, value)
    },

    /**
     * @name: 获取sessionStorage值
     * @param:  key   string  cache-key名称
     */
    get(key: string) {
      const value = window.sessionStorage.getItem(key)
      return value || ''
    },

    /**
     * @name: 删除sessionStorage值
     * @date: 2025-01-20
     * @param:  key   string  cache-key名称
     */
    del(key: string) {
      window.sessionStorage.removeItem(key)
    },

    /**
     * @name: 清除sessionStorage所有的值
     * @date: 2025-01-20
     * @param:  null
     */
    clear() {
      window.sessionStorage.clear()
    },
  },
}
export default storage
