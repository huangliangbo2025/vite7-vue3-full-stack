import { useAuthStore } from '@/stores'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const createAxiosInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { token } = useAuthStore()

      console.log('--token--', token)

      // 添加 token 等认证信息
      if (!config.skipToken) {
        if (token && config.headers)
          config.headers.Authorization = `Bearer ${token}`
      }

      /* const num = randomInt(1, 10)
      if (num % 2 === 1) {
        throw new Error('请求异常了哈哈哈哈哈')
      } */

      // 请求开始时间（用于计算请求耗时）
      config.metadata = { startTime: new Date().getTime() }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { clearUserInfo } = useAuthStore()
      const endTime = new Date().getTime()
      const startTime = response.config.metadata?.startTime
      const duration = startTime ? endTime - startTime : 0
      // 根据后端返回的数据结构进行调整
      if (response.data?.code === 1) {
        return {
          ...response.data,
          duration: `API ${response.config.url} 耗时: ${duration}ms`,
        }
      } else if (response.data?.code === 401) {
        clearUserInfo()
        window.location.href = '/login'
      } else {
        console.log('--- 响应数据 ---', response.data)
        // 业务逻辑错误
        const errorMsg = response.data?.message || '请求失败'
        ElMessage.error(errorMsg)
        return Promise.reject(new Error(errorMsg))
      }
    },
    (error) => {
      const { clearUserInfo } = useAuthStore()
      // HTTP 错误处理
      let errorMessage = '网络错误，请稍后重试'
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = '未授权，请重新登录'
            // 清除 token 并跳转到登录页
            clearUserInfo()
            window.location.href = '/login'
            break
          case 403:
            errorMessage = '拒绝访问'
            break
          case 404:
            errorMessage = '请求资源不存在'
            break
          case 500:
            errorMessage = '服务器内部错误'
            break
          default:
            errorMessage = error.response.data?.message || `请求失败: ${error.response.status}`
        }
      } else if (error.request) {
        errorMessage = '网络连接失败，请检查网络'
      }

      ElMessage.error(errorMessage)
      return Promise.reject(new Error(errorMessage))
    },
  )

  return instance
}

// const baseURL = import.meta.env.VITE_BASE_API
const baseURL = import.meta.env.VITE_API_BASE_URL

export const request = createAxiosInstance(baseURL)
export default request
