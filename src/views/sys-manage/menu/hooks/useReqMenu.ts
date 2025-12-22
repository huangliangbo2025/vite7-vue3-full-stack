import type { CreateMenuDto, MenuDto } from '@/apis/menu'
import { createMenuApi, deleteMenuApi, queryMenuListApi, updateMenuApi } from '@/apis/menu'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

interface Attrs {
  handleSuccess?: () => void
}

export const useReqMenu = (attrs: Attrs = {}) => {
  // 一定要确保这个值的唯一性
  const reqKey = 'menus'

  const {
    handleSuccess = () => {},
  } = attrs

  const queryClient = useQueryClient()

  const searchMenusParams = shallowRef<Partial<MenuDto>>({})
  const handleSearch = (params: Partial<MenuDto>) => {
    searchMenusParams.value = params
  }

  // 2. 用 computed 包装 queryKey，显式依赖分页参数和搜索参数
  const queryKey = computed(() => [
    reqKey,
    searchMenusParams.value,
  ])

  // 获取用户列表接口
  const queryMenuList = useQuery({
    queryKey,
    queryFn: () => {
      return queryMenuListApi({
        ...searchMenusParams.value,
      })
    },
    placeholderData: keepPreviousData,
  })

  const menuList = computed(() => queryMenuList.data.value || [])

  // 创建用户接口
  const createMenuMutation = useMutation({
    mutationFn: (formData: CreateMenuDto) => createMenuApi(unref(formData)),
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
  const updateMenuMutation = useMutation({
    mutationFn: (formData: CreateMenuDto) => updateMenuApi(unref(formData)),
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
  const deleteMenuMutation = useMutation({
    mutationFn: deleteMenuApi,
    onSuccess: () => {
      ElMessage.success('角色删除成功')
      queryClient.invalidateQueries({ queryKey: [reqKey] })
    },
    onError: (_error: Error) => {},
  })

  return {
    menuList,
    queryMenuList,
    createMenuMutation,
    updateMenuMutation,
    deleteMenuMutation,
    handleSearch,
  }
}
