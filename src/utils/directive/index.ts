import type { App } from 'vue'

import goTop from './goTop'
import clickOutside from './clickOutside'

export default (app: App<Element>) => {
  goTop(app)
  clickOutside(app)
}
