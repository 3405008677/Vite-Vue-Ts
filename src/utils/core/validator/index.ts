import useI18n from '@/i18n'

/**
 * 校验电话号码格式是否有效
 * @param {any} rule  规则参数（未使用，可忽略）
 * @param {string} phoneNumber - 需要校验的电话号码
 * @param {Function} callback  回调函数
 * @returns {boolean} 验证结果，true为有效，false为无效
 */
// import { validatePhoneNumber } from '@/utils/core/validator'
export function validatePhoneNumber(rule: any, phoneNumber: any, callback: any) {
  // 去除所有非数字字符
  const cleaned = phoneNumber.replace(/\D/g, '')

  // 手机号码规则：11位数字，以1开头，第二位为3-9
  const mobileRegex = /^1[3-9]\d{9}$/

  // 固定电话规则：区号(可能带0) + 号码，总长度8-13位
  // 考虑可能的格式：010-12345678、02112345678、(021)12345678等
  const landlineRegex = /^(0\d{2,3}-?)?\d{7,8}$/

  // 验证是否符合手机号码或固定电话格式
  if (mobileRegex.test(cleaned) || landlineRegex.test(cleaned)) {
    callback()
  } else {
    callback(new Error(useI18n.global.t('communal.pleaseCorrectMobilePhone.text', '请输入正确的手机号码')))
  }
}

/**
 * 校验身份证号是否合法
 * @param {any} rule  规则参数（未使用，可忽略）
 * @param {string} idCard 身份证号字符串（可含空格）
 * @param {Function} callback  回调函数
 * @returns {boolean} 验证结果（true=合法，false=不合法）
 */
// import { isValidIdCard } from '@/utils/core/validator'
export function isValidIdCard(rule: any, idCard: string, callback: Function) {
  // 1. 基础清洗：去除空格
  const cleanId = (idCard || '').trim()

  // 2. 格式校验（15位纯数字 或 18位数字+最后一位可能为X/x）
  if (!/^(?:\d{15})$|(?:\d{17}[\dXx])$/.test(cleanId)) {
    return callback(new Error(useI18n.global.t('communal.pleaseEnterCorrectID.text', '请输入正确的身份证号')))
  }

  // 3. 15位身份证：仅验证出生日期（转换为18位逻辑类似）
  if (cleanId.length === 15 && !validate15BitId(cleanId)) {
    return callback(new Error(useI18n.global.t('communal.pleaseEnterCorrectDate.text', '请输入正确的出生日期')))
  }

  // 4. 18位身份证：验证出生日期 + 校验码
  if (!validate18BitId(cleanId)) {
    return callback(new Error(useI18n.global.t('communal.dateBirthLastIncorrectly.text', '出生日期或者后四位输入错误')))
  }

  return callback()
}

/**
 * 验证15位身份证号（仅验证出生日期合法性）
 * @param {string} id15 15位身份证号
 * @returns {boolean} 验证结果
 */
function validate15BitId(id15: string): boolean {
  // 提取出生日期（6-11位：YYMMDD）
  const year = `19${id15.slice(6, 8)}` // 15位默认19xx年
  const month = id15.slice(8, 10)
  const day = id15.slice(10, 12)
  return is_valid_date(year, month, day)
}

/**
 * 验证18位身份证号（出生日期 + 校验码）
 * @param {string} id18 18位身份证号
 * @returns {boolean} 验证结果
 */
function validate18BitId(id18: string): boolean {
  // 4.1 验证出生日期（6-13位：YYYYMMDD）
  const year = id18.slice(6, 10)
  const month = id18.slice(10, 12)
  const day = id18.slice(12, 14)
  if (!is_valid_date(year, month, day)) {
    return false
  }

  // 4.2 验证校验码（第18位）
  const lastChar = id18.charAt(17).toUpperCase() // 统一转为大写X
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 权重数组
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对应值

  // 计算前17位与权重乘积之和
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(id18[i], 10) * weights[i]
  }

  // 计算校验码（sum % 11的结果对应checkCodes的索引）
  const checkCode = checkCodes[sum % 11]
  return lastChar === checkCode
}

/**
 * 验证日期是否合法（YYYY-MM-DD）
 * @param {string} year 年份
 * @param {string} month 月份
 * @param {string} day 日期
 * @returns {boolean} 验证结果
 */
function is_valid_date(year: string, month: string, day: string): boolean {
  const date = new Date(`${year}-${month}-${day}`)
  // 验证日期有效性 + 避免月份/日期补零导致的偏差
  return (
    date.getFullYear() === Number(year) &&
    date.getMonth() + 1 === Number(month) && // 月份从0开始
    date.getDate() === Number(day)
  )
}

/**
 * 通过身份证号提取出生日期
 * @param {string} idCard - 15位或18位身份证号（字符串格式，需去除空格）
 * @returns {string|null} - 格式化后的出生日期（YYYY-MM-DD），失败返回null
 */
// import { getBirthDateFromIdCard } from '@/utils/core/validator'
export function getBirthDateFromIdCard(idCard: string): string | null {
  // 1. 基础校验：去除空格、判断长度（仅支持15/18位）
  const cleanIdCard = (idCard || '').trim()
  if (!/^\d{15}(\d{2}[\dXx])?$/.test(cleanIdCard)) {
    console.error(useI18n.global.t('communal.idCodeCheckFormat.text', '身份证号格式错误（需为15位或18位数字，18位末位可含X/x）'))
    return null
  }

  let year, month, day

  // 2. 区分15位和18位身份证号，提取日期片段
  if (cleanIdCard.length === 18) {
    // 18位：第7-10位年份，11-12位月份，13-14位日期
    year = cleanIdCard.slice(6, 10) // 例如：1990
    month = cleanIdCard.slice(10, 12) // 例如：05
    day = cleanIdCard.slice(12, 14) // 例如：20
  } else {
    // 15位：第7-8位年份（需补全为4位，19xx或20xx），9-10位月份，11-12位日期
    const shortYear = cleanIdCard.slice(6, 8)
    // 年份补全规则：通常1900-1999（若shortYear<=当前年份后两位，且当前年份<2050，可考虑20xx，此处简化为19xx）
    year = `19${shortYear}` // 例如：90 → 1990（特殊场景可根据实际需求调整）
    month = cleanIdCard.slice(8, 10)
    day = cleanIdCard.slice(10, 12)
  }

  // 3. 日期合法性验证（避免提取出“20230230”这类无效日期）
  const birthDate = new Date(`${year}-${month}-${day}`)
  // 验证：日期对象是否有效 + 年月日与提取值一致（避免月份/日期补零导致的偏差）
  const isDateValid =
    birthDate.getFullYear() === Number(year) &&
    birthDate.getMonth() + 1 === Number(month) && // 月份从0开始，需+1
    birthDate.getDate() === Number(day)

  if (!isDateValid) {
    console.error(useI18n.global.t('communal.idCodeCheck.text', '身份证号中的出生日期无效'))
    return null
  }

  // 4. 格式化返回（YYYY-MM-DD）
  return `${year}-${month}-${day}`
}

/**
 * 账号校验规则，3到20位
 */
export function logaLength(rule: any, value: any, callback: any) {
  try {
    const Fomrrule = /^[a-zA-Z0-9._@]+$/
    if (!Fomrrule.test(value)) {
      callback(useI18n.global.t('communal.userValidatorStr.text', '账号只允许数字、字母和三个特殊符号. _ @'))
    } else if (value.length < 3 || value.length > 30) {
      callback(useI18n.global.t('communal.userValidatorSun.text', '只能输入3-30位字符'))
    } else {
      callback()
    }
  } catch (error) {
    callback()
  } finally {
  }
}

/**
 * 纳税人识别号（统一社会信用代码）完整校验（含校验码）
 * @param {string} taxId - 纳税人识别号
 * @returns {boolean} 是否合法
 */
export function validateINT(rule: any, value: any, callback: any) {
  // 1. 去除空格（避免用户输入空格）
  const trimmed = value.trim()
  // 2. 校验长度是否为18位
  if (trimmed.length !== 18) return callback(new Error(useI18n.global.t('communal.taxpayerIdNum.text', '请输入18位纳税人识别号')))
  // 3. 校验字符是否符合规则：前17位可包含数字、字母（A-Z，不区分大小写），第18位同上
  // 正则：18位，每位是数字或大写字母（允许小写，统一转为大写校验）
  const reg = /^[0-9A-Za-z]{18}$/
  if (!reg.test(trimmed)) return callback(new Error(useI18n.global.t('communal.taxpayerIdNumFormat.text', '纳税人识别号格式不正确')))

  const code = trimmed.toUpperCase() // 统一转为大写

  // 1. 定义字符对应的值（编码表）
  const codeMap = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    P: 23,
    Q: 24,
    R: 25,
    S: 26,
    T: 27,
    U: 28,
    V: 29,
    W: 30,
    X: 31,
    Y: 32,
    Z: 33,
  }

  // 2. 权重表（第1-17位对应的权重）
  const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]

  // 3. 计算前17位与权重的乘积之和
  let sum = 0
  for (let i = 0; i < 17; i++) {
    const char = code[i]
    const value = codeMap[char]
    // 若字符不在编码表中（理论上基础校验已过滤，此处做双重保障）
    if (value === undefined) {
      return callback(new Error(useI18n.global.t('communal.taxpayerIdNumFormat.text', '纳税人识别号格式不正确')))
    }
    sum += value * weights[i]
  }

  // 4. 计算校验码
  const mod = 31 // 模31
  const remainder = sum % mod
  const checkCodeValue = (mod - remainder) % mod // 校验码对应的值

  // 5. 将校验码值转为字符（反向查编码表）
  let checkCode = ''
  for (const key in codeMap) {
    if (codeMap[key] === checkCodeValue) {
      checkCode = key
      break
    }
  }

  // 6. 对比第18位是否与计算出的校验码一致

  if (code[17] !== checkCode) {
    return callback(new Error(useI18n.global.t('communal.taxpayerIdNumInvalid.text', '纳税人识别号校验码不正确')))
  }

  callback()
}

/**
 * 校验电子邮箱格式是否有效
 */
export function validateEmail(rule: any, email: any, callback: any) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (reg.test(email)) {
    callback()
  } else {
    callback(new Error(useI18n.global.t('communal.pleaseCorrectEmail.text', '请输入正确的邮箱地址')))
  }
}

export default {
  validatePhoneNumber, // 校验电话号码格式是否有效
  isValidIdCard, // 校验身份证号是否合法
  logaLength, // 账号校验规则，3到20位
  validateINT, // 纳税人识别号（统一社会信用代码）完整校验（含校验码）
  validateEmail, // 校验电子邮箱格式是否有效
}
