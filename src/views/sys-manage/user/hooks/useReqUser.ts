import type { CreateUserDto, UserDto } from '@/apis/user'
import { createUserApi, deleteUserApi, queryUserListApi, updateUserApi } from '@/apis/user'
import { usePagination } from '@/hooks/usePagination'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

interface Attrs {
  handleSuccess?: () => void
}

export const useReqUser = (attrs: Attrs = {}) => {
  // 一定要确保这个值的唯一性
  const reqKey = 'users'

  const {
    handleSuccess = () => {},
  } = attrs

  const queryClient = useQueryClient()

  const {
    pagination,
    ...resetPage
  } = usePagination()
  const searchUsersParams = shallowRef<Partial<UserDto>>({})
  const handleSeach = (params: Partial<UserDto>) => {
    searchUsersParams.value = params
  }

  // 2. 用 computed 包装 queryKey，显式依赖分页参数和搜索参数
  const queryKey = computed(() => [
    reqKey,
    searchUsersParams.value,
    pagination.pageSize,
    pagination.currentPage,
  ])

  // 获取用户列表接口
  const queryUserList = useQuery({
    queryKey,
    queryFn: () => {
      return queryUserListApi({
        ...toRaw(pagination),
        ...searchUsersParams.value,
      })
    },
    placeholderData: keepPreviousData,
  })

  const userList = computed(() => queryUserList.data.value?.list || [])
  const total = computed(() => queryUserList.data.value?.total || 0)

  // 创建用户接口
  const createUserMutation = useMutation({
    mutationFn: (formData: CreateUserDto) => createUserApi(unref(formData)),
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
  const updateUserMutation = useMutation({
    mutationFn: (formData: CreateUserDto) => updateUserApi(unref(formData)),
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
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserApi,
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
    userList,
    queryUserList,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    handleSeach,
  }
}
