import type { UserModule } from '@/types/modules'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/main.scss'
import './styles/element-reset.scss'
import 'virtual:uno.css'
import 'virtual:svg-icons-register' // 注册svg-icon脚本
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

// 创建一个queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // ❌ 关闭窗口聚焦自动刷新
      refetchOnReconnect: false, // （可选）网络重连时也不刷新
      retry: false, // （可选）失败不重试
    },
  },
})

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })

// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({ app, router }))

app.mount('#app')
