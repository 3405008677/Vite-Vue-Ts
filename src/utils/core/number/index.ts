/**
 * 数字转金额
 * @param num
 * @returns 转换后的金额
 */
export function numberToAmount(num: string) {
  // 只展示两位小数
  let str = halfAdjust(String(num), 2)

  // 切割小数点
  let arr = str.split('.')

  // 添加千位符
  let regExp = arr[0].replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  // 拼接数据
  str = arr[1] === undefined ? regExp : `${regExp}.${arr[1]}`

  return str
}

/**
 * 四舍五入 传入数字和需要保留几位小数
 * @param num 数字字符串
 * @param digit 传入需要保留几位小数
 * @returns
 */
export function halfAdjust(num: string, digit: number) {
  if (!num || !+num) return '0'
  num = String(num)
  if (num && num.includes('.')) {
    const arr = num.split('.')
    let d = ''
    if (arr[1]) {
      d = String(Number('1.' + arr[1]).toFixed(digit + 1)).slice(2, 2 + digit)
      // console.log(`num:${arr[0]}.${d}`)
      return `${arr[0]}.${d}`
    }
    // console.log(`num2:${parseFloat(num).toFixed(digit)}`)
    return parseFloat(num).toFixed(digit)
  } else {
    return num
  }
}
