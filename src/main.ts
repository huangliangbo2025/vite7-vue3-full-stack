import type { UserModule } from '@/types/modules'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/main.scss'
import 'virtual:uno.css'

const app = createApp(App)

// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({ app, router }))

app.mount('#app')
