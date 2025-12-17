import { omit } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from './is'

/**
 * 生成完整路径函数（补充parentPath参数传递
 * @param path 当前路径
 * @param parentPath 父级路径
 * @returns string
 */
export const getFullPath = (path: string, parentPath = '') => {
  // 外部链接直接返回
  if (isExternal(path)) return path

  // 如果以/开头，表示根路径，直接返回
  if (path.startsWith('/')) return path

  // 去除父路径末尾的斜杠
  const cleanParent = parentPath.replace(/\/+$/, '')

  return cleanParent ? `${cleanParent}/${path}` : `/${path}`
}

export const generateMenuData = (menuData: RouteRecordRaw[]) => {
  // 递归函数增加parentPath参数，传递父菜单路径
  const recursion = (menu: RouteRecordRaw[], parentPath: string = ''): RouteRecordRaw[] => {
    return menu
      .filter(item => !item.meta?.hideInMenu) // 过滤隐藏菜单
      .map((item) => {
        // 生成当前菜单的完整路径
        const currentFullPath = getFullPath(item.path, parentPath)

        // 有子菜单的情况
        if (item.children && item.children.length > 0) {
          // 子菜单只有1条且不强制显示父菜单时，直接复用子菜单的配置（路径已完整）
          if (item.children.length === 1 && !item.meta?.alwayShowChildInMenu) {
            const child = item.children[0]!
            // 子菜单的完整路径基于当前父路径生成
            const childFullPath = getFullPath(child.path, currentFullPath)
            return {
              ...child,
              path: childFullPath,
              // 继承父菜单的meta（如果子菜单没有的话）
              meta: { ...item.meta, ...child.meta },
            }
          }

          // 正常显示父菜单和子菜单：递归处理子菜单（传递当前菜单的完整路径作为父路径）
          return {
            ...item,
            path: currentFullPath, // 当前菜单路径改为完整路径
            children: recursion(item.children, currentFullPath), // 子菜单基于当前完整路径递归
            // 确保name唯一（可选，避免路由name冲突）
            name: item.name || currentFullPath.replace(/\//g, '-').replace(/^-/, ''),
          }
        }

        // 无子女菜单：返回自身（路径改为完整路径，移除children属性）
        return {
          ...omit(item, ['children']),
          path: currentFullPath,
        } as RouteRecordRaw
      })
  }
  return recursion(menuData)
}
