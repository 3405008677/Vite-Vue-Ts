import { defineAsyncComponent } from 'vue'
export default {
  // 基类组件
  defineInput: defineAsyncComponent(() => import('@/components/common/DefineInput/index.vue')), // 输入框
  defineSelect: defineAsyncComponent(() => import('@/components/common/DefineSelect/index.vue')), // 选择框
  definePicker: defineAsyncComponent(() => import('@/components/common/DefinePicker/index.vue')), // 时间
} as any
