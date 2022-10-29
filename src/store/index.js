import app from './modules/app'
import user from './modules/user'
import settings from './modules/settings'

import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia

const appStore = app(pinia),
  userStore = user(pinia),
  settingsStore = settings(pinia)

export { appStore, userStore, settingsStore }
