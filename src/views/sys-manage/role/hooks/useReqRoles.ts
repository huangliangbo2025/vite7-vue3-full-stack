import type { CreateRoleDto } from '@/apis/role'
import { deleteRoleApi, queryRoleDetailApi, queryRoleListApi, updateRoleApi } from '@/apis/role'
import { usePagination } from '@/hooks/usePagination'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

interface Attrs {
  handleSuccess?: () => void
}

export const useReqRoles = (attrs: Attrs = {}) => {
  // 一定要确保这个值的唯一性
  const reqKey = 'roles'

  const {
    handleSuccess = () => {},
  } = attrs

  const queryClient = useQueryClient()

  const {
    pagination,
    ...resetPage
  } = usePagination()

  // 2. 用 computed 包装 queryKey，显式依赖分页参数和搜索参数
  const queryKey = computed(() => [
    reqKey,
    pagination.pageSize,
    pagination.currentPage,
  ])

  // 获取角色列表接口
  const queryRoleList = useQuery({
    queryKey, // 依赖 roleId，变化时自动重新请求
    queryFn: () => {
      return queryRoleListApi({
        ...toRaw(pagination),
      })
    },
    placeholderData: keepPreviousData,
  })

  const roleId = ref<number>()
  // 获取角色列表接口
  const queryRoleDetail = useQuery({
    queryKey: computed(() => ['role_detail', roleId]),
    queryFn: () => {
      return queryRoleDetailApi(roleId.value as number)
    },
    enabled: computed(() => Boolean(roleId.value)), // 没有 id 时不请求
    placeholderData: keepPreviousData,
  })

  const roleList = computed(() => queryRoleList.data.value?.list || [])
  const total = computed(() => queryRoleList.data.value?.total || 0)

  // 常见角色接口
  const createRoleMutation = useMutation({
    mutationFn: (formData: CreateRoleDto) => updateRoleApi(unref(formData)),
    onSuccess: () => {
      ElMessage.success('角色创建成功')
      handleSuccess()
      // 使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (error: Error) => {
      ElMessage.error(`创建角色失败: ${error.message}`)
    },
  })

  // 常见角色接口
  const updateRoleMutation = useMutation({
    mutationFn: (formData: CreateRoleDto) => updateRoleApi(unref(formData)),
    onSuccess: () => {
      ElMessage.success('角色更新成功')
      handleSuccess()
      // 使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (error: Error) => {
      ElMessage.error(`创建角色失败: ${error.message}`)
    },
  })

  const mutate = (formData: CreateRoleDto) =>
    formData.id ? updateRoleMutation.mutate(formData) : createRoleMutation.mutate(formData)
  const mutateAsync = (formData: CreateRoleDto) =>
    formData.id
      ? updateRoleMutation.mutateAsync(formData)
      : createRoleMutation.mutateAsync(formData)
  const isPending = computed(() => {
    return createRoleMutation.isPending.value || updateRoleMutation.isPending.value
  })

  // 删除角色 Mutation
  const deleteRoleMutation = useMutation({
    mutationFn: deleteRoleApi,
    onSuccess: () => {
      ElMessage.success('角色删除成功')
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (_error: Error) => {},
  })

  return {
    pagination,
    total,
    ...resetPage,
    roleList,
    queryRoleList,
    createRoleMutation,
    deleteRoleMutation,
    roleId,
    queryRoleDetail,
    updateRoleMutation,
    mutate,
    mutateAsync,
    isPending,
  }
}
