import type { MenuDto } from '@/apis/menu'

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
