import type { CreatePermissionDto, PermissionDto } from '@/apis/permission'
import {
  createPermissionApi,
  deletePermissionApi,
  queryPermissionListApi,
  updatePermissionApi,
} from '@/apis/permission'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

interface Attrs {
  handleSuccess?: () => void
}

export const useReqPermission = (attrs: Attrs = {}) => {
  // 一定要确保这个值的唯一性
  const reqKey = 'permissions'

  const {
    handleSuccess = () => {},
  } = attrs

  const queryClient = useQueryClient()

  const searchPermissionsParams = shallowRef<Partial<PermissionDto>>({})
  const handleSearch = (params: Partial<PermissionDto>) => {
    searchPermissionsParams.value = params
  }

  // 2. 用 computed 包装 queryKey，显式依赖分页参数和搜索参数
  const queryKey = computed(() => [
    reqKey,
    searchPermissionsParams.value,
  ])

  // 获取用户列表接口
  const queryPermissionList = useQuery({
    queryKey,
    queryFn: () => {
      return queryPermissionListApi({
        ...searchPermissionsParams.value,
      })
    },
    placeholderData: keepPreviousData,
  })

  const permissionList = computed(() => queryPermissionList.data.value || [])

  // 创建用户接口
  const createPermissionMutation = useMutation({
    mutationFn: (formData: CreatePermissionDto) => createPermissionApi(unref(formData)),
    onSuccess: () => {
      ElMessage.success('用户创建成功')
      handleSuccess()
      // 使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (error: Error) => {
      ElMessage.error(`创建用户失败: ${error.message}`)
    },
  })

  // 编辑用户接口
  const updatePermissionMutation = useMutation({
    mutationFn: (formData: CreatePermissionDto) => updatePermissionApi(unref(formData)),
    onSuccess: () => {
      ElMessage.success('用户更新成功')
      handleSuccess()
      // 使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (error: Error) => {
      ElMessage.error(`创建用户失败: ${error.message}`)
    },
  })

  // 删除用户 Mutation
  const deletePermissionMutation = useMutation({
    mutationFn: deletePermissionApi,
    onSuccess: () => {
      ElMessage.success('角色删除成功')
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (_error: Error) => {},
  })

  return {
    permissionList,
    queryPermissionList,
    createPermissionMutation,
    updatePermissionMutation,
    deletePermissionMutation,
    handleSearch,
  }
}
