/**
 *  数组去重
 *  根据ID 去重
 */
// import {arrayNewSetData} from "@/utils/core/array/"
export function arrayNewSetData(target: string, arr: Array<any>): Array<any> {
  // 使用 Set 来存储已经出现过的 id
  let ids = new Set()
  // 使用 filter 来过滤出具有唯一 id 的对象
  return arr.filter((obj) => {
    if (!ids.has(obj[target])) {
      // 如果 id 没有在 Set 中出现过，就添加到 Set 中，并返回 true（保留这个对象）
      ids.add(obj[target])
      return true
    }
    // 如果 id 已经在 Set 中出现过了，就返回 false（不保留这个对象）
    return false
  })
}

/**
 * 提取数组中的某个值
 */
// import { getArrayObjectKey } from '@/utils/core/array'
export function getArrayObjectKey(target: string, arr: Array<any>): Array<any> {
  return arr.filter((i) => i && i[target] !== undefined).map((i) => i[target])
}

/**
 * 切换数组中的值：如果存在则移除，不存在则添加，不改变原数组
 * @param {Array} arr - 原数组
 * @param {*} value - 需要切换的值
 * @returns {Array} 新数组
 */
export function toggleValueInArray(arr: any[], value: any): any[] {

  const index = arr.indexOf(value)
  if (index > -1) {
    // 存在则移除
    return arr.slice(0, index).concat(arr.slice(index + 1))
  } else {
    // 不存在则添加
    return arr.concat([value])
  }
}
