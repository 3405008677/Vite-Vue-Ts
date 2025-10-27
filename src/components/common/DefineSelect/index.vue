<!--
  下拉框基础组件
  通用核心组件 - 修改务必谨慎！！！
  本组件的任何改动都可能产生广泛影响，请确保充分测试并保持向下兼容。
-->

<template>
  <div v-if="refresh" class="defineSelectRef" style="width: 100%">
    <el-select
      ref="defineSelectRef"
      popper-class="defineSelect"
      style="width: 100%"
      clearable
      filterable
      collapse-tags
      collapse-tags-tooltip
      size="small"
      :model-value="selectValue as any"
      :disabled="props.disabled"
      :loading="loading"
      :filter-method="filterSelect"
      :placeholder="props.placeholder"
      :multiple="props.formJson.multiple"
      :max-collapse-tags="2"
      @remove-tag="removeTag"
      @clear="clearItem"
      @visible-change="visibleChange"
      @focus="selectFocus"
    >
      <!-- 历史缓存切换头部 -->
      <div v-if="props.formJson.cache" class="select-header">
        <p @click.prevent="handleClick(false)">默认数据</p>
        <p @click.prevent="handleClick(true)">历史数据</p>
        <div :class="cacheActive ? 'lineMoveLeft line' : 'lineMoveRight line'" />
      </div>
      <div style="height: 30px; min-width: 200px" v-if="props.formJson.cache" />

      <!-- 选项渲染 -->
      <template v-if="type === 'default' && options.length > 0">
        <el-option
          v-for="item in optionsDefault"
          :key="item[optionsValue]"
          :label="item[optionsLabel]"
          :value="item[optionsValue]"
          @mousedown.native.prevent="selectChangeTap(item, $event)"
        />
      </template>
      <template v-else>
        <el-option
          v-for="item in optionsFilter.slice(0, rangeNumber)"
          :key="item[optionsValue]"
          :label="item[optionsLabel]"
          :value="item[optionsValue]"
          @mousedown.native.prevent="selectChangeTap(item, $event)"
        />
      </template>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import type { FORM_JSON_TYPE_ITEM } from '@/components/common/index.d.ts'
import type { PropType } from 'vue'
import { toggleValueInArray } from '@/utils/core/array'
import http from '@/service' // 引入网络请求http

export interface OptionItem {
  [key: string]: any
}

// ----------------------------- 组件属性定义 -----------------------------
const props = defineProps({
  modelValue: {}, // 双向绑定的值
  placeholder: {
    type: String,
    default: ' ', // 提示语
  },
  formJson: {
    type: Object as PropType<FORM_JSON_TYPE_ITEM>,
    default: () => ({}), // 表单配置项
  },
  disabled: {
    type: Boolean,
    default: false, // 是否禁用
  },
  deps: {
    // 关联值，用于动态更新options
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue', 'selectItem', 'itemEmit', 'noSelect', 'setItemValue', 'filterCustom'])

// ----------------------------- 响应式变量定义 -----------------------------
const defineSelectRef = shallowRef() // 选择器 DOM 引用
const loading = ref(true) // 加载状态
const cacheActive = ref(false) // 是否切换到历史数据
const refresh = ref(true) // 组件刷新控制
const type = ref<'filter' | 'default'>('default') // 展示类型：过滤内容 | 基础内容
const optionsFilter = ref<any[]>([]) // 过滤后的选项列表
const rangeNumber = ref(20) // 虚拟滚动展示数量
const optionsDefaultArray = ref<OptionItem[]>([]) // 默认展示的数组

// 计算属性：选项标签和值的字段名
const optionsLabel = computed(() => props.formJson.optionsSetting?.optionsLabel?.label || 'txt')
const optionsValue = computed(() => props.formJson.optionsSetting?.optionsLabel?.value || 'val')

// ----------------------------- 计算属性 -----------------------------
// 默认选项列表（包含默认数组和原始选项）
const optionsDefault = computed(() => {
  let data: any[] = []
  if (options?.value?.length) {
    data = options?.value?.slice(0, rangeNumber.value)
  }
  return [...optionsDefaultArray.value, ...data]
})

// 选项数据（双向绑定）
const options = computed({
  get() {
    return props.formJson.optionsSetting?.optionsData || []
  },
  set(newValue) {
    props.formJson.optionsSetting!.optionsData = newValue
  },
})

// 选择框的值
const selectValue = computed<any | any[]>(() => props.modelValue)

// ----------------------------- 监听器 -----------------------------
// 监听 modelValue 变化，更新默认数组
watch(() => props.modelValue, handleDefaultArrayUpdate, { immediate: true })

// 监听关联值变化，动态更新选项
watch(
  () => props.deps,
  (newDeps, oldDeps) => {
    if (JSON.stringify(newDeps) === JSON.stringify(oldDeps)) return

    if (props.formJson.optionsSetting?.getOptionsFunc) {
      props.formJson.optionsSetting?.getOptionsFunc(newDeps).then((result: any) => {
        options.value = result?.data || result
        isClearValue(options.value)
      })
    } else if (props.formJson.optionsSetting?.url) {
      http.post(props.formJson.optionsSetting?.url, { ...props.formJson.optionsSetting.params, ...newDeps }).then((result) => {
        options.value = result?.data?.items ? result.data.items : result.data || result
        isClearValue(options.value)
      })
    }
  },
  { deep: true },
)

function isClearValue(options: any[]) {
  let isClear = false
  // let optionsLabel = props.formJson.optionsSetting?.optionsLabel?.label || 'txt'
  let optionsValue = props.formJson.optionsSetting?.optionsLabel?.value || 'val'
  if (props.modelValue && !options.find((item) => item[optionsValue] === props.modelValue) && !props.disabled) {
    isClear = true
  }
  if (isClear) {
    emits('update:modelValue', '')
  }
}

watch(
  () => [props.formJson.optionsSetting?.getOptionsFunc, props.formJson.optionsSetting?.url],
  () => {
    // 初始化数据获取
    if (props.formJson.optionsSetting?.getOptionsFunc) {
      let params = { ...props.formJson.optionsSetting.params, ...props.deps }
      props.formJson.optionsSetting.getOptionsFunc(params ? params : '').then((result: any) => {
        options.value = result?.data?.items ? result.data.items : result.data || result
      })
    } else if (props.formJson.optionsSetting?.url) {
      http.post(props.formJson.optionsSetting?.url, { ...props.formJson.optionsSetting.params, ...props.deps }).then((result) => {
        options.value = result?.data?.items ? result.data.items : result.data || result
      })
    }
  },
  { deep: true },
)

// ----------------------------- 方法定义 -----------------------------

/**
 * 处理默认数组更新
 * 确保当前选中的值在默认展示数组中存在
 */
function handleDefaultArrayUpdate() {
  const { modelValue } = props

  // 多选情况处理
  if (props.formJson.multiple) {
    if (!Array.isArray(modelValue) && modelValue) {
      emits('update:modelValue', [modelValue])
    }
    return
  }

  const valueKey = optionsValue.value
  const labelKey = optionsLabel.value

  // 空值或无效值处理
  if (!optionsDefault.value?.length || modelValue === '' || modelValue === null || modelValue === undefined) return

  const firstDefaultValue = optionsDefault.value[0][valueKey]
  if (firstDefaultValue === modelValue) return

  // 清除默认数组并重新查找
  optionsDefaultArray.value = []

  let defaultItem = optionsDefault.value.find((item) => item[optionsValue.value] === props.modelValue)
  if (defaultItem) return

  let optionsItem = options.value.find((item) => item[optionsValue.value] === props.modelValue)
  if (optionsItem) {
    optionsDefaultArray.value.push(optionsItem)
  } else {
    optionsDefaultArray.value.push({ [valueKey]: modelValue, [labelKey]: modelValue })
  }
}

/**
 * 初始化组件
 * 设置初始选项数据和默认选中项
 */
let isOptionsList: NodeJS.Timer
function initialize() {
  // 定时器检查选项数据并设置默认值
  if (selectValue.value) {
    isOptionsList = setInterval(() => {
      if (!options.value || options.value.length === 0) return

      if (props.formJson.multiple) {
        selectValue.value.forEach((item) => {
          let defaultItem = optionsDefault.value.find((i) => i[optionsValue.value] === item)
          if (!defaultItem) {
            let optionsItem = options.value.find((i) => i[optionsValue.value] === item)
            optionsItem ? optionsDefaultArray.value.push(optionsItem) : ''
          }
        })
      } else {
        let defaultItem = optionsDefault.value.find((item) => item[optionsValue.value] === selectValue.value)
        if (defaultItem) return clearInterval(isOptionsList as unknown as number)
        let item = options.value.find((item) => item[optionsValue.value] === selectValue.value)
        item ? optionsDefaultArray.value.push(item) : ''
      }
    }, 500)
  }

  // 已有数据直接返回
  if (props.formJson.optionsSetting?.optionsData?.length) return

  // 初始化数据获取
  if (props.formJson.optionsSetting?.getOptionsFunc) {
    let params = { ...props.formJson.optionsSetting.params, ...props.deps }
    props.formJson.optionsSetting.getOptionsFunc(params ? params : '').then((result: any) => {
      options.value = result?.data?.items ? result.data.items : result.data || result
    })
  } else if (props.formJson.optionsSetting?.url) {
    http.post(props.formJson.optionsSetting?.url, { ...props.formJson.optionsSetting.params, ...props.deps }).then((result) => {
      options.value = result?.data?.items ? result.data.items : result.data || result
    })
  }
}

/**
 * 选项过滤搜索
 * @param value 搜索关键词y
 */
let tiemFilter = 150 // 防抖时间
let isFilter = false
let ifFilterTimeout: any
let filterSelectInput = ''
function filterSelect(value: string) {
  loading.value = true
  value = value.trim()
  filterSelectInput = value
  type.value = value ? 'filter' : 'default'

  // 防抖处理
  if (isFilter) {
    clearTimeout(ifFilterTimeout)
    ifFilterTimeout = setTimeout(() => {
      isFilter = false
      if (props.formJson?.filterCustom) {
        // 自定义筛选在外面写方法（注意是给optionsFilter填值，并且最后将loading状态设置回来）
        emits('filterCustom', value)
      } else {
        filterSelectFun(value.toLowerCase())
      }
    }, tiemFilter)
  } else {
    isFilter = true
    ifFilterTimeout = setTimeout(() => {
      isFilter = false
      if (props.formJson?.filterCustom) {
        emits('filterCustom', value)
      } else {
        filterSelectFun(value.toLowerCase())
      }
    }, tiemFilter)
  }
}

/**
 * 实际执行过滤逻辑
 * @param value 搜索关键词
 */
const handleInput = ref('') // 当前输入值
function filterSelectFun(value: string) {
  handleInput.value = value
  if (!value || options.value.length === 0) return (loading.value = false)
  if (!options.value[0][optionsLabel.value]) return (loading.value = false)

  optionsFilter.value = []
  const exactMatches: object[] = [] // 精确匹配
  const otherMatches: Array<Array<object>> = [] // 其他匹配

  for (let i = 0; i < options.value.length; i++) {
    const label = options.value[i][optionsLabel.value].toLowerCase()

    // 额外搜索键处理
    if (props.formJson.optionsSetting!.optionsSearchKey && options.value[i][props.formJson.optionsSetting!.optionsSearchKey]) {
      const optionsSearchValue = options.value[i][props.formJson.optionsSetting!.optionsSearchKey]?.toLowerCase()
      if (!optionsSearchValue) continue

      if (label.indexOf(value) === -1 && optionsSearchValue.indexOf(value) === -1 && String(i + 1) !== value) continue

      if (label === value || optionsSearchValue === value || String(i + 1) === value) {
        exactMatches.push(options.value[i])
      } else {
        let index = label.indexOf(value)
        let index2 = optionsSearchValue.indexOf(value)
        if (index !== -1) {
          otherMatches[index] = otherMatches[index] ? otherMatches[index] : []
          otherMatches[index].push(options.value[i])
        } else if (index2 !== -1) {
          otherMatches[index2] = otherMatches[index2] ? otherMatches[index2] : []
          otherMatches[index2].push(options.value[i])
        }
      }
    } else {
      // 基础标签搜索
      if (label.indexOf(value) === -1 && String(i + 1) !== value) continue

      if (label === value || String(i + 1) === value) {
        exactMatches.push(options.value[i])
      } else {
        let index = label.indexOf(value)
        if (index !== -1) {
          otherMatches[index] = otherMatches[index] ? otherMatches[index] : []
          otherMatches[index].push(options.value[i])
        }
      }
    }
  }

  optionsFilter.value = exactMatches.concat(...otherMatches.filter((subArr) => subArr.length !== 0))
  if (!optionsFilter.value.length) emits('noSelect')
  loading.value = false
}

/**
 * 键盘回车事件处理
 * @param event 键盘事件
 */
function handleEnter(event: KeyboardEvent) {
  if (event.code === 'Enter' || (event.code as any) === 'NumpadEnter') {
    event.stopPropagation()
    event.preventDefault()

    let textContent: any = undefined
    const activeElement = (event as any).target.ariaActiveDescendantElement
    if (activeElement) {
      const spanElement = activeElement.querySelector('span')
      textContent = spanElement?.textContent || ''
    }

    // 多选和单选分别处理
    if (props.formJson.multiple) {
      handleMultipleEnter(textContent)
    } else {
      handleSingleEnter(textContent)
    }
  }
}

/**
 * 多选回车处理
 * @param textContent 当前聚焦文本
 */
function handleMultipleEnter(textContent: string) {
  const getSelectedValue = (source, textContent) => {
    if (!source?.length) return null
    const item = textContent ? source.find((i) => i[optionsLabel.value] === textContent) : source[0]
    return item?.[optionsValue.value] ?? null
  }

  const isCreateMode = props.formJson.enterType === 'create'
  const hasSearchInput = !!handleInput.value
  const searchResultsEmpty = !optionsFilter.value?.length

  let valueToAdd: any = null

  if (isCreateMode && hasSearchInput && searchResultsEmpty) {
    valueToAdd = handleInput.value.trim()
  } else {
    const dataSource = hasSearchInput ? optionsFilter.value : optionsDefault.value
    valueToAdd = getSelectedValue(dataSource, textContent)
  }

  if (valueToAdd === null) return
  emits('update:modelValue', toggleValueInArray(selectValue.value, valueToAdd))
}

/**
 * 单选回车处理
 * @param textContent 当前聚焦文本
 */
function handleSingleEnter(textContent: string) {
  const getSelectedValue = (source, textContent) => {
    if (!source?.length) return null
    const item = textContent ? source.find((i) => i[optionsLabel.value] === textContent) : source[0]
    return item?.[optionsValue.value] ?? null
  }

  const isCreateMode = props.formJson.enterType === 'create'
  const hasSearchInput = !!handleInput.value
  const searchResultsEmpty = !optionsFilter.value?.length

  if (isCreateMode && hasSearchInput && searchResultsEmpty) {
    emits('update:modelValue', handleInput.value.trim())
    visibleChange(false)
    return
  }

  if (!isCreateMode && hasSearchInput && searchResultsEmpty) {
    visibleChange(false)
    return
  }

  const dataSource = hasSearchInput ? optionsFilter.value : optionsDefault.value
  const selectedValue = getSelectedValue(dataSource, textContent)

  if (selectedValue != null) {
    emits('update:modelValue', selectedValue)
  }

  visibleChange(false)
}

/**
 * 选择框获取焦点
 */
function selectFocus() {
  visibleChange(true)
}

/**
 * 下拉框显隐变化
 * @param visible 是否可见
 */
function visibleChange(visible: boolean) {
  if (visible) {
    type.value = 'default'
  }
}

/**
 * 选项选择事件
 * @param item 选中的选项
 * @param e 鼠标事件
 */
function selectChangeTap(item: any, e) {
  e.stopPropagation()

  if (props.formJson.multiple) {
    emits('update:modelValue', toggleValueInArray(selectValue.value, item[optionsValue.value]))
  } else {
    emits('update:modelValue', item[optionsValue.value])

    // 保存额外参数
    props.formJson.optionsSetting?.extraValue?.forEach((i) => {
      emits('setItemValue', i.key, item[i.value])
    })
  }

  emits('itemEmit', { formJson: props.formJson, value: selectValue.value, data: item })
}

/**
 * 多选标签移除事件
 * @param tagValue 被移除的值
 */
function removeTag(tagValue: any) {
  emits('update:modelValue', toggleValueInArray(selectValue.value, tagValue))
}

/**
 * 历史缓存切换
 * @param value 是否切换到历史数据
 */
function handleClick(value: boolean) {
  cacheActive.value = value
}

/**
 * 获取选项数据
 * @returns 选项数组
 */
function getOptionsData() {
  return options.value
}

/**
 * 清除选中项
 */
function clearItem() {
  visibleChange(true)
  emits('update:modelValue', '')
  emits('itemEmit', {
    formJson: props.formJson,
    value: selectValue.value,
    data: {},
  })

  setTimeout(() => defineSelectRef.value.blur(), 100)
}

/**
 * 设置选项数据
 * @param list 选项列表
 * @param value 要设置的值
 */
async function setOptions(list: any[], value?: any) {
  options.value = list
  refresh.value = false
  await nextTick()
  refresh.value = true

  if (list.length === 0) return emits('update:modelValue', '')
  if (!value) return
  emits('update:modelValue', value)
}

// ----------------------------- 生命周期 -----------------------------
onMounted(() => {
  initialize()

  // 添加滚动懒加载
  const SELECT_DOM = defineSelectRef.value.popperRef.getElementsByClassName('el-select-dropdown__wrap')
  SELECT_DOM[0].addEventListener('scroll', (el: any) => {
    if (el.target.scrollHeight - el.target.scrollTop === el.target.clientHeight) {
      rangeNumber.value += 10
    }
  })

  const input = defineSelectRef.value.$el.querySelector('input')
  input?.addEventListener('keydown', handleEnter)
})

// 暴露方法
defineExpose({ optionsFilter, loading, getOptionsData, initialize, setOptions })
</script>

<style lang="scss" scoped>
.defineSelectRef {
  display: flex;
}

.select-header {
  min-width: 200px;
  position: absolute;
  width: 100%;
  line-height: 62px;
  top: 0px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #5a9cd5;
  text-align: center;
  background-color: white;
  line-height: 30px;

  p {
    width: 50%;
    padding: 4px 10px;
    white-space: nowrap;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .line {
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: #5a9cd5;
    left: 25%;
    top: 34px;
    border-radius: 20%;
    transform: translateX(-50%);
  }
}

.lineMoveLeft {
  animation: lineMoveLeftKey 0.3s forwards;
}

.lineMoveRight {
  animation: lineMoveRightKey 0.3s forwards;
}

@keyframes lineMoveLeftKey {
  from {
    left: 25%;
  }
  to {
    left: 75%;
  }
}

@keyframes lineMoveRightKey {
  from {
    left: 75%;
  }
  to {
    left: 25%;
  }
}
</style>
