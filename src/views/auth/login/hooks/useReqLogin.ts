import { loginApi } from '@/apis/auth'
import type { LoginParams, LoginResponse } from '@/apis/auth/type'
import { useAuthStore } from '@/stores'
import { useMutation } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'

export const useReqLogin = () => {
  const router = useRouter()

  const authStore = useAuthStore()

  const loginMutation = useMutation({
    // 核心：执行登录请求（Axios 调用）
    mutationFn: (params: LoginParams): Promise<LoginResponse> => {
      return loginApi(params) // 替换为你的实际登录接口
    },

    // 请求成功回调
    onSuccess: (res) => {
      authStore.setUserInfo(res)
      // 4.2 全局提示
      ElMessage.success(`欢迎回来，${res.username}！`)
      // 4.3 跳转首页（根据实际路由调整）
      router.push('/')
    },

    // 请求失败回调（统一错误处理）
    onError: (error: any) => {
      console.log('登录失败', error)
    },
  })

  return {
    loginMutation,
  }
}
