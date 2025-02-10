// 样式导入
// import './assets/main.css'
import './assets/global.css'
import './assets/nprogress.css'
// Vue 相关导入
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'

async function bootstrap() {
  // 创建应用实例
  const app = createApp(App)

  // 使用插件
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  app.use(router)

  // 挂载应用
  app.mount('#app')
}

export { bootstrap }
