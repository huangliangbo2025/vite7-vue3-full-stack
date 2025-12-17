import type { MenuDto } from '@/apis/menu'
import importedRoutes from '@/imported-routes'
import { BasicLayout } from '@/layouts'

import type { RouteMeta, RouteRecordRaw } from 'vue-router'

// =========== 辅助工具方法 =============

/**
 * 将路径格式（如 /sys-manage/user）转换为大驼峰（PascalCase）命名（如 SysManageUser）
 * @param path 输入路径，支持以/开头/结尾、包含连字符/下划线/斜杠的格式
 * @returns 大驼峰格式的字符串
 * @throws 空路径或无效路径时抛出错误
 */
export function convertPathToPascalCase(path: string): string {
  // 空值校验
  if (!path || path.trim() === '')
    throw new Error('路径不能为空，请传入有效的路径字符串')

  // 1. 清理路径：去除首尾的/、替换所有分隔符为空格、去除多余空格
  const cleanedPath = path
    .trim()
    .replace(/^\/+|\/+$/g, '') // 移除首尾的 /
    .replace(/[-_/]+/g, ' ') // 将 -/_/ 统一替换为空格
    .replace(/\s+/g, ' ') // 合并多个连续空格为单个

  // 2. 分割为单词数组并过滤空单词
  const words = cleanedPath.split(' ').filter(word => word.length > 0)

  if (words.length === 0)
    throw new Error(`无效的路径格式：${path}，无法提取有效单词`)

  // 3. 转换为大驼峰：每个单词首字母大写，其余字母小写
  const pascalCaseWords = words.map(word => {
    if (word.length === 0) return ''
    // 首字母大写，其余字母小写（保证格式统一，也可根据需求改为保留原大小写）
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  return pascalCaseWords.join('')
}

const loadView = (key: string) => {
  return importedRoutes[key]
}

const menuToRoute = (menu: MenuDto): RouteRecordRaw => {
  const { path, children, ...meta } = menu

  const route = {
    path: path,
    name: convertPathToPascalCase(path),
    meta,
    component: loadView(menu.path),
  } as RouteRecordRaw

  if (children && children?.length)
    route.children = children.map(menuToRoute)

  return route
}

// ============   动态路由实现的整个逻辑 ====================

/**
 *   1、过滤path是外链的，或者为空的菜单
 *
 *   2、对第一级路由进行遍历，如果没有父级路由的，给自己匹配父级路由，组件映射到 BasicLayout
 *
 *   3、对路由进行扁平，要不然三级以下的路由对 keep-live 缓存失效
 */

// ========= 1、过滤path是外链的，或者为空的菜单 ===========
/**
 * 递归过滤菜单数组，保留存在有效 path 的菜单及其层级结构
 * @param menu 原始菜单数组
 * @returns 过滤后的菜单数组（保留层级结构）
 */
export const filterRoute = (menu: MenuDto[]): MenuDto[] => {
  // 空数组直接返回
  if (!Array.isArray(menu) || menu.length === 0)
    return []

  return menu
    .filter((menuItem) => {
      // 过滤条件：当前菜单必须有有效 path（非空/非undefined）
      return !!menuItem.path
    })
    .map((menuItem) => {
      // 递归处理子菜单（如果有）
      const processedMenuItem = { ...menuItem }
      if (Array.isArray(processedMenuItem.children))
        processedMenuItem.children = filterRoute(processedMenuItem.children)
      return processedMenuItem
    })
}

// ========= 2、给路由打补丁，添加BasicLayout组件 ===========
export const patchRouteLayout = (menu: MenuDto[]) => {
  return menu.map(menuItem => {
    if (!menuItem.children || menuItem.children.length === 0) {
      return {
        path: menuItem.path,
        component: BasicLayout,
        children: [{
          ...menuToRoute(menuItem),
          path: '',
        }],
      }
    }
    return {
      ...menuToRoute(menuItem),
      component: loadView(menuItem.path) || BasicLayout,
    }
  })
}

//  ========= 3、对路由进行，以防keep-alive 失效 =========
/*
有一种路由是不能进行提示的，就是本身自己存在index.vue，内部有自己的跳转机制，例如

system
 └── userManage   ✅ index.vue 不可提升
      ├── user/index.vue
      └── menu/index.vue

*/

export const flatRoute = (
  routes: RouteRecordRaw[],
  parentPath = '',
  parentRoute?: RouteRecordRaw,
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const currentPath = parentPath && route.path && !route.path.startsWith('/')
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : route.path

    const hasComponent = Boolean(route.component)

    // 有 component：正常保留
    if (hasComponent) {
      const newRoute: RouteRecordRaw = {
        ...route,
      }

      if (route.children?.length) {
        newRoute.children = flatRoute(
          route.children,
          currentPath,
          newRoute,
        )
      }

      res.push(newRoute)
      return
    }

    // 没有 component：中转节点，直接提升 children
    if (route.children?.length) {
      const liftedChildren = flatRoute(
        route.children,
        currentPath,
        parentRoute,
      )

      liftedChildren.forEach((child) => {
        child.meta = {
          ...child.meta,
          activeMenu: currentPath,
        } as RouteMeta
        res.push(child)
      })
    }
  })

  return res
}

export const generateAccessRoute = (menuTree: MenuDto[]) => {
  const route = filterRoute(menuTree)

  const routesWithLayout = patchRouteLayout(route) as RouteRecordRaw[]

  const finalRoutes = flatRoute(routesWithLayout)

  return finalRoutes
}
