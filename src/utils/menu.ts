import type { MenuDto } from '@/apis/menu'

// 给菜单进行排序，值越大越往后
export const sortMenuTree = (menus: MenuDto[]): MenuDto[] => {
  return menus
    .slice()
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })
    .map((menu) => {
      if (menu.children?.length) {
        return {
          ...menu,
          children: sortMenuTree(menu.children),
        }
      }
      return menu
    })
}

// 递归移除禁用的菜单项
export const filterMenu = (menuList: MenuDto[] | undefined | null): MenuDto[] => {
  // 空值保护：如果入参是 null/undefined/空数组，直接返回空数组
  if (!menuList || menuList.length === 0)
    return []

  // 先过滤当前层级，再递归处理子菜单（正确顺序）
  return menuList
    .filter((item) => {
      const isFalse = item.enabled === 0
      return !isFalse
    }) // 过滤当前层级禁用项
    .map((item) => {
      // 递归处理子菜单，并回写 children 属性
      const children = filterMenu(item.children)
      return {
        ...item,
        children: children.length > 0 ? children : undefined, // 空数组转为 undefined 更合理
      }
    })
}
