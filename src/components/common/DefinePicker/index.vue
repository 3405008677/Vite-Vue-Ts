<!--

时间组件

import DefinePicker from "@/components/definePicker/index.vue"

-->

<template>
  <div id="define-picker">
    <el-date-picker
      ref="pickerRef"
      v-model="pickerValue"
      range-separator="到"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :placeholder="props.placeholder || '请选择' + props.formJson?.label"
      :format="props.formJson?.pickerValueType === 'time' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :value-format="props.formJson?.pickerValueType === 'time' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :type="pickerType"
      :disabled="props.disabled"
      :default-time="props.formJson?.defaultTime"
      :unlink-panels="true"
      @change="change"
      @visible-change="visibleChange"
      @calendar-change="calendarChange"
    />
  </div>
</template>

<script setup lang="ts">
import { formatEndTimeToEndOfDayWithRegex, formatDateArray } from '@/utils/core/time'
const props = defineProps(['modelValue', 'formJson', 'disabled', 'placeholder'])

const emits = defineEmits(['update:modelValue', 'itemEmit'])

const pickerRef = shallowRef() // 时间组件 Ref
// 'year' | 'years' |'month' | 'months' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange'
const pickerType = ref(props.formJson?.pickerType || 'daterange') // 设置当前时间组件的 类型

const pickerValue = computed({
  get: () => props.modelValue,
  set: (value: any) => emits('update:modelValue', value),
})

/**
 * 触发回调函数 通知父类 并且传递值
 * @param val
 */
function change(val: any) {
  emits('itemEmit', {
    formJson: props.formJson,
    value: val,
  })
}

/**
 * 当 DateTimePicker 的下拉列表出现/消失时触发
 */
function visibleChange(item: any) {
  // console.log(item)
}

/**
 * 如果用户没有选择日期，那默认展示当前日的月份
 */
function calendarChange(item: any) {
  if (!(item[0] && item[1])) return
  pickerValue.value = formatEndTimeToEndOfDayWithRegex(formatDateArray(item))
  pickerRef.value?.handleClose?.()
}

/**
 * 初始化
 */
function init() {
  //
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
#define-picker {
  width: 100%;
  :deep(.el-date-editor) {
    width: 100%;
  }
}
</style>
