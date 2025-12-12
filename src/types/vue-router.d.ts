export {}

declare module 'vue-router' {
  // type redirect = string | undefined
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /* 路由标题 */
    title?: string
    /* assets/icons */
    icon?: string
    /* 排序 */
    sort?: number
    /* 是否缓存 */
    isCache?: boolean
    /* 是否在菜单栏隐藏, 例如详情页 */
    hideInMenu?: boolean
    /* 总是显示在二级菜单，哪怕二级菜单只有一条 */
    alwayShowChildInMenu?: boolean
    /* 是否禁用 */
    disabled?: boolean
    /* 是否需要登录 */
    noLogin?: boolean
  }
}
