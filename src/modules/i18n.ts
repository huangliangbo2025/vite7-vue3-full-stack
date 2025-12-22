import { messages } from '@/locales'
import type { UserModule } from '@/types/modules'
import { createI18n } from 'vue-i18n'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false, // 必须
    locale: 'zh-CN', // 默认语言
    fallbackLocale: 'en-US', // 兜底语言
    messages,
    globalInjection: true, // 允许全局 $t
  })
  app.use(i18n)
}
