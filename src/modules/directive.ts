import { setupDirectives } from '@/directives'
import type { UserModule } from '@/types/modules'

// 全局注册指令
export const install: UserModule = ({ app }) => {
  setupDirectives(app)
}
