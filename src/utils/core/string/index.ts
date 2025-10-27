import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

/**
 * 转换为字符串（false null function undefined NaN 0 空对象 空数组 统一转为空字符串）
 * @param value any
 * @return String 转换后的字符串
 */
export const toStr = (value: any) => {
  let str = ''
  if (typeof value === 'undefined') {
    str = ''
  } else if (!value || value === null || typeof value === 'function' || value.isNaN || JSON.stringify(value) === '{}') {
    str = ''
  } else {
    str = value.toString()
  }
  return str
}

/**
 * 拼接成字符串
 * @param str string
 * @param str... string
 * @return string str
 */
export const concatStr = (str: string, str1: string) => {
  return str + str1
}

/**
 * 物料分类 用于创建 编码的  0 - 99 - a
 * @param input
 * @returns
 */
export function customIncrement(input: string) {
  let num = Number(input)
  if (num > 0 && num < 99) {
    if (num >= 9) {
      return String(num + 1)
    } else {
      return '0' + (num + 1)
    }
  } else if (num == 0) {
    return '01'
  } else if (num == 99) {
    return '0A'
  }

  // 将输入转换为字符串
  let str = input.toString()

  // 分离数字部分和字母部分
  let numPart = parseInt(str.slice(0, -1), 10) // 获取除最后一个字符外的所有字符，并转换为数字
  let letterPart = str.slice(-1).toUpperCase() // 获取最后一个字符，并转换为大写字母

  // 验证输入格式
  if (isNaN(numPart) || letterPart < 'A' || letterPart > 'Z') {
    throw new Error('Invalid input format. Should be like "2b", "5s", etc.')
  }

  // 字母部分递增
  let letterCode = letterPart.charCodeAt(0)
  letterCode++
  if (letterCode > 'Z'.charCodeAt(0)) {
    letterCode = 'A'.charCodeAt(0) // 如果超过'Z'，则回到'A'
  }
  let newLetterPart = String.fromCharCode(letterCode)

  // 构造并返回结果字符串
  return numPart.toString() + newLetterPart
}

/**
 * 模糊查找
 * @param query {string} 输入的值
 * @param target {string} 需要匹配的值
 */
export function fuzzySearch(query: string, target: string) {
  // 将查询和目标字符串都转换为小写，以使匹配不区分大小写
  const lowerCaseQuery = query.toLowerCase()
  const lowerCaseTarget = target.toLowerCase()

  // 在目标字符串中查找匹配项
  return lowerCaseTarget.includes(lowerCaseQuery)
}

/**
 *  匹配 欧姆 用 R 替换 Ω
 */
export function replaceOhm(str: string): string {
  // 匹配数字+R的组合，但不包括后面紧跟的数字
  // const regex = /(\d+)R/g
  const regex = /(\d+)[Rr]/g
  let matches = str.match(regex)
  if (!matches) return str
  let newStr = str

  matches.forEach((item) => {
    const index = str.indexOf(item)
    const nextChar = str.charAt(index + item.length)

    // 如果R后面不是数字，则进行替换
    if (!/\d/.test(nextChar)) {
      // 假设你想替换为"Ω"，并且保持前面的数字不变
      newStr = newStr.replace(item, `${item.slice(0, -1)}Ω`)
    }
  })
  return newStr
}

/**
 *  去除字符串首尾 空白字符 回车字符 Tab字符
 */
export function replaceFirstLastBlank(str: string): string {
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 *  字符串转数组，根据 空格 回车 Tab
 */
export function replaceArray(str: string): Array<string> {
  return str
    .split(/[\t\n\r ]+/)
    .map((item: string) => item.trim())
    .filter((item: string) => item !== '')
}

/**
 * 复制文本
 * @param text
 */
export function copyValue(text: string) {
  const { t } = useI18n()
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    ElMessage.success(t('commonresource.copySuccess.key', '复制成功'))
  } catch (err) {
    ElMessage.warning('赋值失败')
  }
}

/**
 * Base64 解码 16 机制
 * @param text
 */
// import { base64ToHex } from '@/utils/core/string'
export function base64ToHex(base64Str: string) {
  try {
    // 1. Base64 解码
    const binaryStr = atob(base64Str)

    // 2. 转换为字节数组
    const bytes: any[] = []
    for (let i = 0; i < binaryStr.length; i++) {
      bytes.push(binaryStr.charCodeAt(i))
    }

    // 3. 转换为十六进制字符串
    let hexStr = ''
    for (let i = 0; i < bytes.length; i++) {
      const hex = bytes[i].toString(16).padStart(2, '0')
      hexStr += hex
    }

    return {
      bytes: bytes,
      hex: hexStr,
    }
  } catch (error) {
    return { error: '无效的 Base64 字符串: ' }
  }
}
