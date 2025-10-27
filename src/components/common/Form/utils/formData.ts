import { setShowText } from '@/utils/base/dataFormat/setShowText'
import http from '@/service'

/**
 * 获取表单数据
 */
export function getFormData(formJson: any): Record<string, any> {
  const params: Record<string, any> = {}
  for (const key in formJson) {
    const value = formJson[key]?.value
    params[key] = value !== undefined ? value : ''
  }
  return params
}

/**
 * 设置表单数据
 */
export function setFormData(formJson: any, data: any): void {
  if (!Object.keys(data)) return
  for (let key in data) {
    if (!formJson[key]) continue
    formJson[key].value = data[key]
  }
}

/**
 * 获取表单文本数据
 */
export function getFormTextData(formJson: any, setShowTextFun: Function): Record<string, any> {
  const params: Record<string, any> = {}
  for (const key in formJson) {
    const item = formJson[key]
    if (item.value !== undefined && item.value !== null && (item.value !== '' || item.value === 0 || item.value === false)) {
      params[key] = item.valueText !== undefined ? item.valueText : setShowTextFun(item.value, item?.showTextCallback, item)
    } else {
      params[key] = ''
    }
  }
  return params
}

/**
 * 重置表单数据
 */
export function resetFormData(formJson: any, neglect: string[] = []): void {
  const ignoreKeys = new Set(neglect)
  for (let key in formJson) {
    if (ignoreKeys.has(key)) continue

    if (formJson[key].value !== undefined || formJson[key].value !== null) {
      formJson[key].value = null
    }
  }
}

/**
 * 设置指定字段的值
 */
export function setFieldValue(formJson: any, formModel: any, key: string, value: any): void {
  formModel[key] = value
  if (formJson[key]) {
    formJson[key].value = value
  }
}

/**
 * 更新表单模型值
 */
export function updateFormModel(formJson: any, formModel: any, value: any): void {
  const key = formJson['key'] || formJson['colCode']
  formModel[key] = value
  formJson['value'] = value
}

/**
 * 获取依赖字段的值和参数
 */
export function getDependencyParams(formJson: any, field: string): any {
  const params = { ...formJson[field]?.optionsSetting?.params }
  if (formJson[field]?.optionsSetting?.depsFieldList?.length) {
    formJson[field]?.optionsSetting?.depsFieldList.forEach((item) => {
      const depsFieldKey = item?.key ?? item?.value ?? ''
      const depsFieldValue = item?.value
      if (depsFieldKey && depsFieldValue) {
        params[depsFieldKey] = formJson[depsFieldValue]?.value
      }
    })
  }
  return params
}

/**
 * 设置显示文本（包含异步加载选项）
 */
export function setShowTextWithOptions(text: any, showTextCallback: any, item: any): string {
  if (!item.optionsSetting?.optionsData) {
    if (item.optionsSetting?.getOptionsFunc) {
      let params = { ...item.optionsSetting.params }
      item.optionsSetting.getOptionsFunc(params ? params : '').then((result: any) => {
        item.optionsSetting['optionsData'] = result?.data?.items ? result.data.items : result.data || result
      })
    } else if (item.optionsSetting?.url) {
      http.post(item.optionsSetting?.url, { ...item.optionsSetting.params }).then((result) => {
        item.optionsSetting['optionsData'] = result?.data?.items ? result.data.items : result.data || result
      })
    }
  }
  return setShowText(text, showTextCallback, item)
}

export default {
  getFormData,
  setFormData,
  getFormTextData,
  resetFormData,
  setFieldValue,
  updateFormModel,
  getDependencyParams,
  setShowTextWithOptions,
}

