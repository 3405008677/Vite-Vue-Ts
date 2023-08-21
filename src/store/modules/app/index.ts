export interface AppState {
  isCardIcon: boolean
  isHome: boolean
  isCollapseAside: boolean
  collapseTitle: string
}
import { defineStore } from 'pinia'
export default defineStore('app', {
  state: (): AppState => {
    return {
      isCardIcon: true, //是否显示信息卡片
      isHome: true, //是否为主页
      isCollapseAside: false, //
      collapseTitle: import.meta.env.VITE_GLOB_APP_TITLE,
    }
  },
  actions: {
    setCarIcon(params: boolean) {
      this.isCardIcon = params
    },
    setIsHome(params: boolean) {
      this.isHome = params
    },
    setCollapseAside(params: boolean) {
      this.isCollapseAside = params
    },
  },
})
