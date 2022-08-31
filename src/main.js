import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

// 挂载全局
// app.config.globalProperties.$store = 

app.use(ElementPlus).use(createPinia()).mount('#app')
