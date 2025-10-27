import validatorFun from '@/utils/core/validator'

/**
 * 根据容器宽度计算网格列数
 * @param containerWidth 容器宽度（默认750px）
 * @returns 网格列数（1-25列）
 */
export function getGridTemplateColumns(containerWidth: number = 750): number {
  const minItemWidth = 50
  const maxColumns = 25
  const gap = 0
  const calculatedColumns = Math.floor((containerWidth + gap) / (minItemWidth + gap))
  return Math.max(1, Math.min(calculatedColumns, maxColumns))
}

/**
 * 初始化表单项样式
 * @param item 表单项配置
 * @returns 样式字符串
 */
export function initItemStyle(item: any): string {
  let style = ''

  if (item?.row) {
    style += `grid-row: span ${item.row};`
  }
  if (item.padding) {
    style += `padding: ${item.padding}px;`
  }
  if (item.paddingLeft) {
    style += `padding-left: ${item.paddingLeft}px;`
  }
  if (item.paddingRight) {
    style += `padding-right: ${item.paddingRight}px;`
  }
  if (item.paddingTop) {
    style += `padding-top: ${item.paddingTop}px;`
  }
  if (item.paddingBottom) {
    style += `padding-bottom: ${item.paddingBottom}px;`
  }

  style += 'width:100%;display:flex;'
  return style
}

/**
 * 构建字段验证规则
 */
export function buildFieldRules(item: any, t: Function): any[] {
  const rules: any[] = []

  // 必填验证
  if (item.requiredType) {
    rules.push({
      required: true,
      message: t(`${item?.langKey}.text`, item?.colName || item?.label),
    })
  }

  // 自定义验证规则
  if (item.rules && item.rules.length) {
    for (let i = 0; i < item.rules.length; i++) {
      if (item.rules[i] === 'required') {
        rules.push({
          required: true,
          message: t(`${item?.langKey}.text`, item?.colName || item?.label),
        })
        continue
      }
      if (typeof item.rules[i] === 'string') {
        rules.push({
          validator: validatorFun[item.rules[i]],
          trigger: 'blur',
        })
      } else if (typeof item.rules[i] === 'object') {
        rules.push({ ...item.rules[i] })
      }
    }
  }

  return rules
}

/**
 * 构建单个字段配置
 */
export function buildFieldItem(data: any, obtPerColText: string, t: Function): any {
  // 解析正则配置
  if (data.regularJson && data.regularJson !== '') {
    try {
      const parsed = JSON.parse(data.regularJson)
      Object.assign(data, parsed)
    } catch (error) {
      console.error('解析regularJson错误:', error)
    }
  }

  const rules: any[] = buildFieldRules(data, t)
  data.obtPerColText = obtPerColText

  return { data, rules }
}

/**
 * 生成输入框提示文字
 */
export function generatePlaceholder(item: any, disabled: boolean, noPlaceholder: boolean, t: Function): string {
  const isDisabled = !!(disabled || item?.disabled || noPlaceholder)
  if (isDisabled) return ' '

  const placeholder = item?.placeholder
  if (placeholder !== undefined && placeholder !== null && placeholder !== '') return String(placeholder)

  return String(t(`${item?.langKey}.text`, item?.colName ?? item?.label ?? '')) || ''
}

/**
 * 验证字段是否可以纯文本渲染
 */
export function canRenderAsText(item: any): boolean {
  return (
    item.name !== 'definePicker' &&
    item.name !== 'defineAddress' &&
    item.name !== 'defineEmployee' &&
    item.name !== 'defineMultipleEmployee' &&
    item.name !== 'defineSwitch' &&
    item.name !== 'defineImage' &&
    !item?.optionsSetting?.hasOwnProperty('depsFieldList')
  )
}

/**
 * 处理快捷搜索参数
 */
export function handleFastSearchParams(type: string, fastSearchParams: any, key: string = 'apprStatus'): void {
  const statusMap = {
    draft: '4',
    toMyApproval: '0',
    myApply: '5',
    myApproval: '6',
  }

  const targetStatus = statusMap[type]
  if (targetStatus) {
    fastSearchParams[key] = fastSearchParams[key] === targetStatus ? '' : targetStatus
  }
}

export default {
  buildFieldRules,
  buildFieldItem,
  generatePlaceholder,
  canRenderAsText,
  handleFastSearchParams,
}
