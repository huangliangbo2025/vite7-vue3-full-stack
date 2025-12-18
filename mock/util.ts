import type { MenuDto } from '@/apis/menu'

export function createResponse(data: any, res?: any) {
  const params = res?.query || res?.body || {}
  if (data && data.list && Array.isArray(data.list)) {
    return {
      code: 1,
      message: 'success',
      data: {
        ...data,
        current: params.current ? Number(params.current) : 1,
        pageSize: params.pageSize ? Number(params.pageSize) : 10,
        total: 1000,
      },
    }
  }

  if (Array.isArray(data)) {
    return {
      code: 1,
      message: 'success',
      data,
    }
  }

  return {
    code: 1,
    message: 'success',
    data: {
      ...data,
      ...res?.body,
    },
  }
}
export function createErrorResponse(message = 'failed', code = 0) {
  return {
    code,
    message,
    data: null,
  }
}

/**
 * 根据用户的menuIds筛选出有权限的菜单列表
 * @param {string[]} menuIds - 用户拥有的菜单ID数组
 * @param {Array} menuList - 完整的菜单列表
 * @returns {Array} 用户有权限的菜单列表（保留层级结构）
 */
export const getUserMenus = (menuIds: string[], menuList: MenuDto[]) => {
  // 转换为Set，提升查找效率
  const menuIdSet = new Set(menuIds)

  // 递归筛选菜单的核心函数
  const filterMenus = (menus: MenuDto[]) => {
    return menus.reduce((acc, menu) => {
      // 只处理用户有权限的菜单
      if (menuIdSet.has(menu.id)) {
        // 深拷贝当前菜单，避免修改原数据
        const menuCopy = { ...menu }
        // 递归处理子菜单
        menuCopy.children = filterMenus(menuCopy.children || [])
        acc.push(menuCopy)
      }
      return acc
    }, [] as MenuDto[])
  }

  // 处理边界情况：参数为空时返回空数组
  if (!Array.isArray(menuIds) || !Array.isArray(menuList))
    return []

  return filterMenus(menuList)
}
