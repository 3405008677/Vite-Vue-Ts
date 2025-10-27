<!--
  文本输入框
  通用核心组件 - 修改务必谨慎！！！
  本组件的任何改动都可能产生广泛影响，请确保充分测试并保持向下兼容。
-->

<template>
  <!-- 缓存模式：当启用缓存功能且有获取列文本时，显示带历史记录的输入框 -->
  <div v-if="props.formJson.cache && props.formJson.obtPerColText" class="cache-mode">
    <!-- 使用 Element Plus 的 popover 组件实现下拉历史记录 -->
    <el-popover ref="popoverRef" placement="bottom" trigger="click" popper-class="define-input-popover">
      <!-- 触发 popover 的输入框 -->
      <template #reference>
        <el-input
          ref="inputRef"
          v-model.trim="inputValue"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          popper-class="defineInput"
          style="width: 100%"
          clearable
          v-bind="{ ...props.formJson.api }"
          @clear="clear"
          @blur="blur"
          @keyup.enter="handleEnter"
          @input="filterSelectFun"
        />
      </template>

      <!-- popover 内容：显示历史记录选项 -->
      <template #default>
        <div :class="['popover-div', type === 'filter' ? 'filter-mode' : 'default-mode']">
          <!-- 使用 computed 属性 currentOptions 来统一处理过滤和默认状态 -->
          <template v-for="(item, index) in currentOptions" :key="item">
            <p class="cache-item" @click="cacheClick(item)">
              {{ item }}
              <!-- 删除单个历史记录项 -->
              <el-icon class="delete-icon" @click.stop="cacheDel(index)">
                <CircleClose />
              </el-icon>
            </p>
          </template>
        </div>
      </template>
    </el-popover>
  </div>

  <!-- 默认模式：普通输入框 -->
  <el-input
    v-else
    ref="inputRef"
    v-model.trim="inputValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    popper-class="defineInput"
    style="width: 100%"
    clearable
    v-bind="{ ...props.formJson.api }"
    @clear="clear"
    @blur="blur"
    @keyup.enter="handleEnter"
  />
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { FORM_JSON_TYPE_ITEM } from '@/components/common/index.d.ts'
import { IndexDBAdapter } from '@/utils/core/storage/baseIndexDb'

/**
 * 定义组件接收的属性
 */
const props = defineProps({
  // 表单配置对象，包含各种配置项
  formJson: {
    type: Object as PropType<FORM_JSON_TYPE_ITEM>,
    default: () => ({}),
  },
  // 输入框的值，支持 v-model 双向绑定
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // 占位符文本
  placeholder: {
    type: String,
    default: '',
  },
  // 是否禁用输入框
  disabled: {
    type: Boolean,
    default: false,
  },
})

// 创建 IndexDB 实例用于存储输入历史记录
const IndexDB = props.formJson.cache ? new IndexDBAdapter('form_cache') : null

/**
 * 定义组件触发的事件
 */
const emits = defineEmits(['update:modelValue', 'itemEmit'])

// 输入框引用，用于获取 DOM 元素
const inputRef = shallowRef()
// popover 引用，用于控制弹出框显示/隐藏
const popoverRef = shallowRef()
// 当前显示的选项类型：'filter' 过滤结果 或 'default' 默认历史记录
const type = shallowRef<'filter' | 'default'>('default')
// 存储历史记录选项
const cacheOptions = shallowRef<string[]>([])
// 存储过滤后的选项
const optionsFilter = shallowRef<string[]>([])

/**
 * 输入框值的计算属性，实现 v-model 双向绑定
 */
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: string) {
    emits('update:modelValue', newValue)
  },
})

/**
 * 计算当前应该显示的选项（避免在模板中重复逻辑）
 */
const currentOptions = computed(() => {
  return type.value === 'filter' ? optionsFilter.value : cacheOptions.value
})

/**
 * 处理回车键事件
 * @param event 键盘事件对象
 */
function handleEnter(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  // 失去焦点
  target.blur()

  // 如果是换行类型，则输出日志（实际功能待实现）
  if (props.formJson?.type === 'EnterLineFeed') {
    // console.log('回车换行')
  }
}

/**
 * 输入框失去焦点时的处理
 */
function blur() {
  // 隐藏 popover
  popoverRef.value?.hide?.()
  // 触发自定义事件
  activeEvent()
}

/**
 * 清除输入框内容时的处理
 */
function clear() {
  // 清空输入值
  inputValue.value = ''
  // 触发自定义事件
  activeEvent()
}

/**
 * 触发 itemEmit 事件，向父组件传递当前数据和表单配置
 */
function activeEvent() {
  emits('itemEmit', {
    data: { value: inputValue.value },
    formJson: props.formJson,
  })
}

/**
 * 点击历史记录项时的处理
 * @param item 选中的历史记录项
 */
function cacheClick(item: string) {
  // 设置输入框值为选中的历史记录
  inputValue.value = item
  // 隐藏 popover
  popoverRef.value?.hide()
}

/**
 * 删除历史记录项
 * @param index 要删除的项的索引
 */
async function cacheDel(index: number) {
  // 从数组中移除指定项
  cacheOptions.value.splice(index, 1)

  try {
    // 更新 IndexDB 中的记录
    await IndexDB?.mUpdate({
      uid: (props.formJson.obtPerColText || '') + props.formJson.key,
      value: JSON.stringify(cacheOptions.value),
    })
  } catch (error) {
    console.error('删除缓存项失败:', error)
  }
}

/**
 * 添加新的历史记录项
 * @param item 要添加的历史记录项
 */
async function cacheAdd(item: string) {
  // 空值检查
  if (!item) return

  // 避免重复添加
  if (!cacheOptions.value.includes(item)) {
    cacheOptions.value.unshift(item)
    // 如果缓存项数量超过100个，则删除最旧的项
    if (cacheOptions.value.length > 100) {
      cacheOptions.value = cacheOptions.value.slice(0, 100)
    }
    // 去重处理
    cacheOptions.value = [...new Set(cacheOptions.value)]

    try {
      // 更新 IndexDB 中的记录
      await IndexDB?.mUpdate({
        uid: (props.formJson.obtPerColText || '') + props.formJson.key,
        value: JSON.stringify(cacheOptions.value),
      })
    } catch (error) {
      console.error('添加缓存项失败:', error)
    }
  }
}

/**
 * 输入过滤函数，根据输入内容过滤历史记录
 * @param value 当前输入的值
 */
function filterSelectFun(value: string) {
  // 去除首尾空格
  value = value.trim()
  // 根据是否有输入值切换显示模式
  type.value = value ? 'filter' : 'default'
  inputValue.value = value

  // 如果没有输入值，清空过滤结果
  if (!value) {
    optionsFilter.value = []
    return
  }

  // 分别存储完全匹配和部分匹配的结果
  const exactMatches: string[] = []
  const otherMatches: string[] = []

  // 遍历历史记录进行匹配
  cacheOptions.value.forEach((item) => {
    const label = item.toLowerCase()
    if (label === value.toLowerCase()) {
      // 完全匹配
      exactMatches.push(item)
    } else if (label.includes(value.toLowerCase())) {
      // 部分匹配
      otherMatches.push(item)
    }
  })

  // 优先显示完全匹配的结果，然后是部分匹配的结果
  optionsFilter.value = [...exactMatches, ...otherMatches]
}

/**
 * 初始化缓存选项，从 IndexDB 中加载历史记录
 */
async function initCacheOptions() {
  // 只有启用缓存功能且有获取列文本时才进行初始化
  if (!(props.formJson.cache && props.formJson.obtPerColText)) return
  try {
    // 连接 IndexDB
    await IndexDB?.mConnectDB()
    // 根据唯一标识获取缓存数据
    const data = await IndexDB?.get((props.formJson.obtPerColText || '') + props.formJson.key)

    if (data && data.value) {
      // 如果有缓存数据，则解析并赋值
      cacheOptions.value = JSON.parse(data.value)
    } else {
      // 如果没有缓存数据，则初始化空数组
      await IndexDB?.addDataDB({
        uid: (props.formJson.obtPerColText || '') + props.formJson.key,
        value: JSON.stringify([]),
      })
    }
  } catch (error) {
    console.error('缓存初始化失败:', error)
  }
}

/**
 * 组件挂载后初始化缓存数据
 */
onMounted(async () => {
  initCacheOptions()
})

// 暴露方法给父组件使用
defineExpose({
  cacheAdd,
})
</script>

<style scoped lang="scss">
.cache-mode {
  width: 100%;
}

// popover 弹出框样式
.popover-div {
  max-height: 300px; // 最大高度，防止内容过多
  overflow-y: auto; // 超出时显示滚动条

  // 历史记录项样式
  .cache-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;
    padding: 4px 8px;
    cursor: pointer;
    transition: background-color 0.2s; // 背景色变化动画

    &:hover {
      background-color: #bbd3f8; // 悬停时背景色
    }
  }

  // 删除图标样式
  .delete-icon {
    margin-left: 12px;
    color: #999; // 灰色

    &:hover {
      color: #f56565; // 悬停时变为红色
    }
  }
}
</style>
