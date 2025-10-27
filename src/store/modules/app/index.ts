import type { REQUEST_MANAGER_TYPE } from '@/utils/core/requestManager'
import RequestManager from '@/utils/core/requestManager'

export interface AppState {
  isCollapseAside: boolean
  collapseTitle: string
  abortController: REQUEST_MANAGER_TYPE
}
import { defineStore } from 'pinia'
export default defineStore('app', {
  state: (): AppState => {
    return {
      isCollapseAside: false, // 是否隐藏侧导航
      collapseTitle: import.meta.env.VITE_GLOB_APP_TITLE,
      abortController: RequestManager,
    }
  },
  actions: {
    setCollapseAside(params: boolean) {
      this.isCollapseAside = params
    },
  },
})
