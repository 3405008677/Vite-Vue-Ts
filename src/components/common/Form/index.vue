<template>
  <!--
    Form 表单组件配置说明：
    
    核心属性：
    - ref: 表单实例引用
    - v-loading: 加载状态
    - inline-message: 行内显示验证信息
    - class: 动态样式类名
    - style: 动态网格布局样式
    - label-width: 标签宽度
    - model: 表单数据模型
    - rules: 验证规则
    - validate-on-rule-change: 规则变化时是否触发验证
    - scroll-to-error: 验证失败时自动滚动到错误位置
  -->
  <el-form
    ref="formRef"
    v-loading="formLoading"
    inline-message
    :class="props.className + ' form-content'"
    :style="dynamicGridStyle"
    :label-width="labelWidth"
    :model="formModel"
    :rules="ruleList"
    :validate-on-rule-change="false"
    :scroll-to-error="scrollToError"
  >
    <template v-for="item in props.formJson" :key="item?.refresh || '' + item?.key || item?.colCode">
      <!-- 表单项 -->
      <el-form-item
        v-if="item?.displayType === 1 || !item.hasOwnProperty('displayType')"
        :class="[item.key || item?.colCode, { labelHide: item?.labelHide }]"
        :prop="item?.key || item?.colCode"
        :label-width="item?.labelWidth ?? item?.colWidth"
        :style="getItemStyle(item)"
      >
        <!-- 标签 -->
        <template #label>
          <span
            class="label-text"
            :class="(item?.optionsSetting?.dict && item?.typeAuth === 1) || item?.dataDictionary || item?.type === 'link' ? 'label-link' : ''"
            :title="item?.label"
            @click.prevent="openDialog(item)"
          >
            {{ item?.label }}
          </span>
        </template>

        <!-- 表单项内容 -->
        <template #default>
          <!-- 插槽 -->
          <template v-if="item?.type === 'slot'">
            <div :class="item?.key || item?.colCode + '-item'" :style="getItemStyle(item)">
              <slot :item="item" :name="item?.key || item?.colCode" />
            </div>
          </template>

          <!-- 组件渲染 -->
          <div v-else :class="item?.key || item?.colCode + '-item'" style="display: flex; width: 100%; height: 100%; align-items: center">
            <!-- 左侧插槽 -->
            <slot :item="item" :name="item?.slotLeft" />

            <!-- 禁用状态下的纯文本显示 -->
            <div class="set-show-text" v-if="props.disabled && verification(item)">
              <el-tooltip effect="dark" placement="top" :content="setShowTextFun(item.value, item?.showTextCallback, item)">
                <span :class="{ 'text-link': item?.event?.inline && (item.disabled || props.disabled) }" @click="handleDisabledClick(item)">
                  {{ setShowTextFun(item.value, item?.showTextCallback, item) }}
                </span>
              </el-tooltip>
            </div>

            <!-- 组件渲染 -->
            <component
              v-else
              :ref="(v: any) => setFormItemRef(v, item)"
              :is="item?.name ? componentGetComponents(item.name!) : componentGetComponents('defineInput')"
              :disabled="props.disabled || item?.disabled"
              :modelValue="item?.value"
              :formJson="item"
              :deps="getDeps(item?.key || item?.colCode)"
              :placeholder="placeholderText(item)"
              @itemEmit="(e: any) => itemEmit(e, item?.key || item?.colCode)"
              @refresh="refresh"
              @update:modelValue="(value: any) => updateModelEmit(item, value)"
              @setItemValue="setItemValue"
            />

            <!-- 右侧插槽 -->
            <slot :item="item" :name="item?.slotRight" />

            <!-- 单位 -->
            <div class="unit" v-if="item?.unit" style="margin-left: 5px">{{ t(item?.unit?.langKey + '.text', item?.unit?.label) }}</div>
          </div>
        </template>
      </el-form-item>

      <!-- 占位符 -->
      <div class="rightGap" v-if="item?.rightGap" :style="`grid-column: span ${gridTemplateColumns};`"></div>

      <!-- 下划分割线 -->
      <div class="underline" v-if="item?.underline" :style="`grid-column: span ${gridTemplateColumns};`">
        <el-divider></el-divider>
      </div>

      <!-- 竖线分割线 -->
      <div class="dividingLine" v-if="item?.dividingLine" :style="`grid-column: span 1;`"><span></span></div>
    </template>

    <!-- 列表展示方式 -->
    <div class="list-mode" v-if="props.pageConfig?.modeFormJson">
      <div class="label">列表展示方式</div>
      <div class="content">
        <DefineSelect v-model="modeType" :form-json="modeFormJson" @item-emit="modeTypeEmit" />
      </div>
    </div>

    <!-- 搜索按钮组 -->
    <div class="buttons" v-if="props.search.visible">
      <el-button type="primary" @click="submit">搜索</el-button>
      <el-button type="primary" plain @click="reset()">重置</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import type { FORM_JSON_TYPE, FORM_SEARCH_TYPE, FORM_JSON_TYPE_ITEM } from '@/components/common/index.d.ts'
import type { PropType, Reactive } from 'vue'
import { useCloned } from '@vueuse/core'
import outFile from '@/components/common/outFile'
import DefineSelect from '@/components/common/DefineSelect/index.vue'
import { viewColumnListStore } from '@/store'
import { initOptionsFuncs } from '@/utils/base/dataFormat/optionsFuncs'
import { initShowTextMethods } from '@/utils/base/dataFormat/showTextMethods'

import {
  getFormData,
  setFormData,
  getFormTextData,
  resetFormData,
  setFieldValue,
  updateFormModel,
  getDependencyParams,
  setShowTextWithOptions,
} from './utils/formData'

import {
  getGridTemplateColumns,
  initItemStyle,
  buildFieldRules,
  buildFieldItem,
  generatePlaceholder,
  canRenderAsText,
  handleFastSearchParams,
} from './utils/formConfig'

import { validateForm } from './utils/formValidation'

import EditItemDialog from '@/views/business/sysmanage/adminMenu/src/fieldMapping/edit.vue'

const DataDictionary = defineAsyncComponent(() => import('@/components/dataDictionary/index.vue'))

const { t } = useI18n()

const emits = defineEmits(['itemEmit', 'search', 'reset', 'itemEmitDataDictionary', 'formComplete', 'modeTypeEmit'])
const props = defineProps({
  formJson: {
    type: Object as PropType<FORM_JSON_TYPE>,
    default: () => ({}),
  },
  pageConfig: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  search: {
    type: Object as PropType<FORM_SEARCH_TYPE>,
    default: () => ({ visible: false }),
  },
  className: {
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  obtPerColText: {
    type: String,
  },
  noPlaceholder: {
    type: Boolean,
    default: false,
  },
  gridTemplateColumns: {
    type: Number,
    default: 0,
  },
})

const formItemRef = ref<any>({})
const formRef = shallowRef()
const formLoading = ref(false)
const ruleList = reactive<{ [key: string]: any }>({})
const labelWidth = '120px'
let scrollToError = ref(false)

const nowItem = ref<FORM_JSON_TYPE_ITEM>()

// 线上配置
const colListConfig = reactive({}) as Reactive<{
  viewId: string
  viewCode: string
  viewType: string
  viewColumns: any[]
}>

// 表单数据模型
const formModel = reactive({})

const formModelComputed = computed(() => {
  let result = {}
  for (let key in props.formJson) {
    if (props.formJson[key].value !== undefined) {
      result[key] = props.formJson[key].value
    } else {
      result[key] = ''
    }
  }
  return result
})

const adminEdit = ref(false)
const route = useRoute()
const editItemDialogRef = ref()

const containerWidth = ref(0)
const gridTemplateColumns = ref(25)

const fastSearchParams: any = ref({})

// 列表展示方式
const modeType = ref(1)
const defaultModeFormJson = {
  optionsLabel: { label: 'txt', value: 'val' },
  optionsSetting: {
    optionsData: [
      { txt: '收起明细', val: 1 },
      { txt: '平铺明细', val: 2 },
    ],
  },
}
const modeFormJson = computed(() => {
  if (props.pageConfig?.modeFormJson?.optionsData) {
    let data: any = []
    props.pageConfig?.modeFormJson?.optionsData.forEach((item) => {
      data.push({
        txt: t(`${item.label.langKey}.text`, item.label.txt),
        val: item.value,
        mode: item?.mode,
        componentName: item?.componentName,
      })
    })
    defaultModeFormJson.optionsSetting.optionsData = data
  }
  return defaultModeFormJson
})

/**
 * 初始化
 */
onMounted(() => {
  adminEdit.value = route.query?.adminEdit === 'true' ? true : false

  nextTick(() => {
    const element = formRef.value?.$el || formRef.value

    if (element && (element as any) instanceof Element) {
      containerWidth.value = element.offsetWidth
      gridTemplateColumns.value = props.gridTemplateColumns > 0 ? props.gridTemplateColumns : getGridTemplateColumns(containerWidth.value)
      console.log('页面总列数', gridTemplateColumns.value)
    }
  })
})

/**
 * 监听表单数据变化
 */
watch(
  formModelComputed,
  (newVal) => {
    for (let key in newVal) {
      if (newVal[key] !== formModel[key]) {
        formModel[key] = newVal[key]
      }
    }
  },
  { immediate: true },
)

/**
 * 动态网格样式
 */
const dynamicGridStyle = computed(() => {
  return `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(${gridTemplateColumns.value}, 1fr);
    padding-top: 5px;
  `
})

/**
 * 获取表单项样式
 */
const getItemStyle = (item: FORM_JSON_TYPE_ITEM) => {
  return computed(() => {
    let style = ''

    if (item?.column) {
      const maxColumns = gridTemplateColumns.value
      const span = Math.min(item.column, maxColumns)
      style += `grid-column: span ${span};`
    }

    style += initItemStyle(item)
    return style
  }).value
}

/**
 * 子组件事件回调
 */
function itemEmit(item: any, key: string) {
  console.log('form-触发回调事件', item)
  emits('itemEmit', item, key)
}

/**
 * 更新表单值
 */
function updateModelEmit(formJson: object, value: any) {
  updateFormModel(formJson, formModel, value)
  formRef.value?.validateField(formJson['key'] || formJson['colCode'])
}

/**
 * 设置指定字段的值
 */
function setItemValue(key, value) {
  setFieldValue(props.formJson, formModel, key, value)
}

/**
 * 获取自定义组件
 */
function componentGetComponents(compontentName: string) {
  return outFile[compontentName]
}

/**
 * 快捷搜索
 */
async function fastSearch(type: string) {
  handleFastSearchParams(type, fastSearchParams.value, props.pageConfig?.fastSearchButtons?.key || 'apprStatus')
  await new Promise((resolve) => setTimeout(resolve, 100))
  emits('search')
}

/**
 * 提交搜索
 */
function submit() {
  emits('search', formModel)
}

/**
 * 设置输入框提示文字
 */
function placeholderText(item: any): string {
  return generatePlaceholder(item, props.disabled, props.noPlaceholder, t)
}

/**
 * 刷新指定字段组件
 */
function refresh(key: string) {
  const item = props.formJson[key]
  if (!item) return
  item.refresh = `${nowItem.value?.label || ''}_${Date.now()}`
}

/**
 * 获取表单数据
 */
function getData() {
  return getFormData(props.formJson)
}

/**
 * 设置表单数据
 */
function setData(item: any) {
  setFormData(props.formJson, item)
}

/**
 * 获取表单文本数据
 */
function getTextData() {
  return getFormTextData(props.formJson, setShowTextFun)
}

/**
 * 验证表单
 */
function verify() {
  scrollToError.value = true
  return validateForm(formRef.value).then((result) => {
    scrollToError.value = false
    return result
  })
}

/**
 * 重置表单数据
 */
async function reset(neglect: string[] = []) {
  resetFormData(props.formJson, neglect)
  fastSearchParams.value = {}
  modeType.value = 1

  await new Promise((resolve) => setTimeout(resolve, 100))
  emits('reset')
}

/**
 * 设置组件ref
 */
function setFormItemRef(ref: any, item: any) {
  if (!item['ref']) return
  const refKey = item['colCode'] || item['key']
  if (refKey) item[refKey] = ref
}

const dataDictionaryRef = ref()

/**
 * 打开数据字典或字段编辑弹窗
 */
function openDialog(item: FORM_JSON_TYPE_ITEM) {
  if (adminEdit.value) return openEditItemDialog(item)
  dataDictionaryRef.value.openDialog(item)
}

/**
 * 打开字段编辑弹窗
 */
async function openEditItemDialog(row) {
  let resCode = props.obtPerColText?.split('.')[0]
  if (!resCode) return
  let viewList = await viewColumnListStore.getPowerViewColumnList(resCode)
  if (!viewList) return
  editItemDialogRef.value.dialogOpen({
    visible: true,
    title: t('communal.edit.text', '编辑'),
    width: '1200px',
    mode: 'edit',
    resCode: colListConfig['resCode'],
    tableSelectData: [row],
    viewList: viewList,
    sort: 1,
  })
}

/**
 * 获取依赖字段的值
 */
function getDeps(field: string) {
  return getDependencyParams(props.formJson, field)
}

/**
 * 验证字段是否可以纯文本渲染
 */
function verification(item) {
  return canRenderAsText(item)
}

/**
 * 设置显示文本
 */
function setShowTextFun(text, showTextCallback, item) {
  return setShowTextWithOptions(text, showTextCallback, item)
}

/**
 * 处理禁用状态下点击事件
 */
function handleDisabledClick(item: any) {
  if (item?.event?.inline && (item.disabled || props.disabled)) {
    item.event.inline(item)
  }
}

/**
 * 列表展示方式切换
 */
function modeTypeEmit(item: any) {
  emits('modeTypeEmit', item.data)
}

/**
 * 初始化配置数据
 */
function initRulesData() {
  if (!props.obtPerColText || props.obtPerColText === '') {
    initWithoutOnline()
  } else {
    initWithOnline()
  }
}

/**
 * 初始化本地配置
 */
function initWithoutOnline() {
  for (let key in props.formJson) {
    let item = props.formJson[key]
    const rules = buildFieldRules(item, t)
    ruleList[key] = rules
  }
  initOptionsFuncs(props.formJson, t)
  initShowTextMethods(props.formJson, t)
  emits('formComplete')
  console.log('表单配置完毕(本地): ', props.formJson)
}

/**
 * 初始化线上配置
 */
function initWithOnline() {
  const configList = viewColumnListStore.getViewColumnList(props.obtPerColText as string)
  Object.assign(colListConfig, {
    viewId: configList.viewId,
    resCode: configList.resCode,
    viewCode: configList.viewCode,
    viewColumns: configList.viewColumns,
  })

  if (!colListConfig.viewColumns || colListConfig.viewColumns.length === 0) {
    colListConfig.viewColumns = []
  }

  let newViewColumns: any[] = useCloned(colListConfig.viewColumns).cloned.value
  newViewColumns.forEach((item: any) => {
    makeItem(item)
  })

  Object.keys(props.formJson).forEach((key) => {
    delete props.formJson[key]
  })

  newViewColumns.sort((a, b) => a.sort - b.sort)
  newViewColumns.forEach((item) => {
    props.formJson[item.colCode] = item
  })

  initOptionsFuncs(props.formJson, t)
  initShowTextMethods(props.formJson, t)
  emits('formComplete')
  console.log('表单配置完毕(线上): ', props.formJson)
}

/**
 * 字段编辑成功回调
 */
function editSuccess(data) {
  let value = props.formJson[data.colCode]['value']
  makeItem(data)
  props.formJson[data.colCode] = data
  props.formJson[data.colCode]['value'] = value
}

/**
 * 构建字段配置
 */
function makeItem(data) {
  const result = buildFieldItem(data, props.obtPerColText || '', t)
  ruleList[data.colCode] = result.rules
}

// 初始化配置
initRulesData()

defineExpose({
  getData,
  setData,
  getTextData,
  reset,
  verify,
  editSuccess,
  formItemRef,
  formRef,
  fastSearchParams,
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  align-items: center;
  margin-bottom: 7px !important;
  .el-form-item__content {
    margin-left: 0 !important;
    height: 100%;
    color: var(--el-text-color-regular);
    .el-form-item__error {
      position: absolute;
      bottom: -6px;
      z-index: 2;
      background-color: #fff;
    }
  }

  label {
    height: auto;
    line-height: normal;
  }
}

.form-content {
  .el-form-item {
    grid-column: span 5;
    align-items: center;
  }
}

.label-link {
  color: #5393f5;
  cursor: pointer;
}

.set-show-text {
  flex: 1;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  color: var(--el-disabled-text-color);
  font-size: var(--gg-font-size);
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: default !important;
  background-color: var(--gg-disabled-bg-color);
}

.label-text {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.dividingLine {
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;

  span {
    display: inline-block;
    width: 1px;
    height: calc(100% - 10px);
    margin-top: 3px;
    background-color: #dcdfe6;
  }
}

:deep(.labelHide .el-form-item__label) {
  display: none !important;
}

.list-mode {
  display: flex;
  align-items: center;
  grid-column: span 5;
  margin-bottom: 7px !important;
  .label {
    width: 100px;
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--el-text-color-regular);
    font-size: var(--el-form-label-font-size);
  }
  .content {
    flex: 1;
  }
}

.buttons {
  display: flex;
  margin-bottom: 7px;
  margin-left: 30px;
  align-items: center;
}
</style>
