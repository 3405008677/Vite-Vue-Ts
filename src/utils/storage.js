import { get, remove } from 'lodash'

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Loacl = {
  // 设置
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  // 获取
  get(key) {
    return JSON.parse(window.localStorage.getItem(ket))
  },
  // 删除
  remove(ket) {
    window.localStorage.removeItem(ket)
  },
  // 移出全部
  clear() {
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  // 设置临时缓存
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // 获取临时缓存
  get(key) {
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  // 移除临时缓存
  remove(key) {
    window.sessionStorage.removeItem(key)
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear()
  }
}
