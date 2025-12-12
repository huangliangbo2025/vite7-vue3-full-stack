import { registerApi } from '@/apis/auth'
import type { RegisterParams } from '@/apis/auth/type'
import { useMutation } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'

export const useReqRegister = () => {
  const router = useRouter()

  const registerMutation = useMutation({
    // 核心：执行登录请求（Axios 调用）
    mutationFn: (params: RegisterParams): Promise<any> => {
      return registerApi(params) // 替换为你的实际登录接口
    },

    // 请求成功回调
    onSuccess: () => {
      ElMessage.success(`注册成功`)
      router.push('/auth/login')
    },

    // 请求失败回调（统一错误处理）
    onError: (error: any) => {
      console.log('注册失败', error)
    },
  })

  return {
    registerMutation,
  }
}
