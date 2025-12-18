// src/types/axios.d.ts (或项目任意目录，确保 tsconfig.json 能识别)
import 'axios'

// 扩展 Axios 请求配置类型
declare module 'axios' {
  interface InternalAxiosRequestConfig<D = any> {
    // 定义 skipToken 属性，可选，类型根据你的实际使用场景调整（如 boolean）
    skipToken?: boolean
    metadata: Record<any, any>
  }
}
