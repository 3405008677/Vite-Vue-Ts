/**
 * 获取当前时间
 * 格式——年 月 日
 */
// import { getCurrentTime } from "@/utils/core/time"
export function getCurrentTime(type?: boolean) {
  let today = new Date()

  // 获取年、月、日、时、分、秒
  let year = today.getFullYear()
  let month = today.getMonth() + 1 // 月份是从 0 开始计数的，需要加1
  let day = today.getDate()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let seconds = today.getSeconds()

  if (type) {
    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day
  } else {
    return (
      year +
      '-' +
      (month < 10 ? '0' : '') +
      month +
      '-' +
      (day < 10 ? '0' : '') +
      day +
      ' ' +
      (hours < 10 ? '0' : '') +
      hours +
      ':' +
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
    )
  }

  // 格式化输出

  // "2023-11-08 19:05:05"
}

/**
 * 设置当前时间
 * @param query {string} 当前时间
 * @param target {string} 需要添加的天数
 */
// import { addDays } from "@/utils/core/time"
export function addDays(date: Date, days: number) {
  let result = new Date(date)
  result.setTime(result.getTime() + days * 24 * 60 * 60 * 1000)
  // 获取年、月（注意月份是从0开始的，所以需要+1）和日
  let year = result.getFullYear()
  let month = String(result.getMonth() + 1).padStart(2, '0') // 使用padStart确保月份总是两位数
  let day = String(result.getDate()).padStart(2, '0') // 使用padStart确保日期总是两位数
  // 组合成一个"年月日"格式的字符串
  return `${year}-${month}-${day}`
}

/**
 *获取当前时间和两个月前的时间
 * @param today 时间
 * @returns
 */
// import { getDatesIncludingTwoMonthsAgo } from "@/utils/core/time"
export function getDatesIncludingTwoMonthsAgo(today?: Date) {
  // 如果未提供today，则默认为当前日期
  today = today || new Date()

  // 获取前两个月的日期（注意：这里直接设置了月份，而不是使用setMonth减去，以保持日不变）
  let twoMonthsAgo = new Date(today)
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

  function formatDate(date: Date) {
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，所以需要+1
    let day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 创建一个包含两个日期的数组
  return [
    formatDate(twoMonthsAgo), // 前两个月的日期（可能跨年）
    formatDate(today), // 当前日期
  ]
}

/**
 * 当前时间增加本地时差
 * @param str 时间
 * @returns 处理后的时间
 */
// import { setLocalTime } from "@/utils/core/time"
export function setLocalTime(str: string) {
  // 将时间字符串转换为 Date 对象
  const date = new Date(str.replace(' ', 'T'))

  // 获取本地时差（以分钟为单位）
  const timezoneOffset = date.getTimezoneOffset()

  // 将本地时差转换为毫秒
  const offsetMilliseconds = timezoneOffset * 60 * 1000

  // 将本地时差加到 Date 对象上
  date.setTime(date.getTime() + offsetMilliseconds)

  // 将结果格式化为所需的格式
  return date.toISOString().replace('T', ' ').substring(0, 19)
}

/**
 * 获取两个日期之间的天数
 * @param startDateStr  {string} 前
 * @param endDateStr  {string} 后
 */
// import { getStartDateToEndDateDays } from "@/utils/core/time"
export function getStartDateToEndDateDays(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  // 处理日期解析失败的情况（返回 NaN 方便外部判断）
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return NaN
  }

  // 计算绝对时间差（取绝对值，忽略日期先后）
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime())

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

  // 向上取整（不足1天按1天算）
  return Math.ceil(daysDifference)
}

/**
 * 格式化 ISO 日期格式
 * @param text {string} 输入的值
 */
// import { setISODate } from "@/utils/core/time"
export function setISODate(text: string) {
  if (!text) return ''

  const date = new Date(text)
  const timestamp = +date

  // 判断是否为无效日期
  if (isNaN(timestamp)) return ''

  // 判断是否早于 2010 年
  const year2010 = new Date('2010-01-01').getTime()
  if (timestamp < year2010) return ''

  // 转换时区并格式化
  return new Date(timestamp + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
}

/**
 * 格式化 毫秒 为 小时
 * @param milliseconds
 * @returns
 */
// import { formatMilliseconds } from "@/utils/core/time"
export function formatMilliseconds(milliseconds: string | number) {
  // 处理非数字或负数输入
  const ms = Math.max(0, Number(milliseconds) || 0)

  // 计算各单位值并取整
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const padZero = (num: any) => num.toString().padStart(2, '0')

  return `${hours}小时${padZero(minutes)}分钟${padZero(seconds)}秒`
}

/**
 * 将日期范围的结束时间格式化为当天的 23:59:59
 * @param dateRange
 */
// import { formatEndTimeToEndOfDayWithRegex } from "@/utils/core/time"
export function formatEndTimeToEndOfDayWithRegex(dateRange: any) {
  if (!dateRange || dateRange.length !== 2) {
    return dateRange // 不是有效的日期范围，直接返回
  }

  // 复制数组，避免修改原始数据
  const result = [...dateRange]

  // 使用正则表达式替换结束日期的时间部分
  result[1] = dateRange[1].replace(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/, '$1 23:59:59')

  return result
}

/**
 * 格式化日期
 * @param dateArray
 */
// import { formatDateArray } from "@/utils/core/time"
export function formatDateArray(dateArray: any) {
  return dateArray.map((date: any) => {
    // 确保输入是 Date 对象
    const d = new Date(date)

    // 提取年、月、日、时、分、秒
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    // 返回格式化后的字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  })
}

/** * 将总分钟数转换为小时和分钟
 * @param totalMinutes 总分钟数
 * @returns 包含小时和分钟的对象
 */
// import { convertMinutesToHoursAndMinutes } from "@/utils/core/time"
export function convertMinutesToHoursAndMinutes(totalMinutes) {
  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return { hours: 0, minutes: 0 } // 返回默认值
  }

  const hours = Math.floor(totalMinutes / 60) // 计算小时数（向下取整）
  const minutes = totalMinutes % 60 // 计算剩余分钟数（取余）
  return { hours, minutes }
}
