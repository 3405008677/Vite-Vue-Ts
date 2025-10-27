// import type { FORM_JSON_TYPE, TABLE_JSON_TYPE, TABLE_CONFIG_TYPE } from "@/components/common/index.d.ts"

type NAME_TYPE =
  | 'defineInput' // 通用组件 文本输入框
  | 'defineSelect' // 通用组件 下拉框
  | 'defineTextarea' // 通用组件 文本域
  | 'definePicker' // 通用组件 时间选择器

// ----------------------------form类型 start----------------------------

interface OPTIONS_SETTING_TYPE {
  depsFieldList?: [{ key: string; value: string }] // 依赖字段 value填依赖字段的key,key填最后组装参数的key
  extraValue?: [{ key: string; value: string }] // 额外填充字段 value为从结果取值的key,key为填充字段的key
  optionsData?: Array<any> // 传给组件的值
  optionsLabel?: { label?: string; value?: string; type?: 'number' | 'string'; [key: string]: any }
  getOptionsFunc?: any // 不满足组件请求，需要自定义请求的时候
  params?: any // 给请求传参的值
  [key: string]: any
}

interface FORM_JSON_TYPE_ITEM {
  [key: string]: any
  label?: string
  key?: string
  type?: 'slot' | 'EnterLineFeed' | 'link' // slot——插槽   EnterLineFeed——    link——可点击
  ref?: any // 存放元素的 Ref 需要启用时 初始化为 true
  labelWidth?: number | string
  name?: NAME_TYPE // 自定义插槽名称
  disabled?: boolean // 是否禁止
  labelHide?: boolean // 是否隐藏 label
  column?: number // 站几列
  rightGap?: number // 右侧间距
  row?: number // 站几行
  optionsSetting?: OPTIONS_SETTING_TYPE
  refresh?: string // 刷新数据
  api?: any // 组件库的 API
  slotLeft?: string // 左侧插槽
  slotRight?: string // 右侧插槽
  rules?: any[] // 规则  可以为 字符串数组 如 ： ['required']  也可以传递 element plus 组件 定义的自定义规则 对象
  value?: any // 值
  padding?: number // 内边距
  paddingLeft?: number // 左内边距
  paddingRight?: number // 右内边距
  paddingTop?: number // 上内边距
  paddingBottom?: number // 下内边距
  linkFunction?: () => any // label 额外点击事件——和字典点击事件冲突  二存一
}

interface FORM_JSON_TYPE {
  [key: string]: FORM_JSON_TYPE_ITEM
}

// ----------------------------form类型 end----------------------------

// ----------------------------table类型 end----------------------------

export { OPTIONS_SETTING_TYPE, FORM_JSON_TYPE_ITEM, FORM_JSON_TYPE, FORM_SEARCH_TYPE }
