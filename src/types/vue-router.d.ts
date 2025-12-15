export {}

declare module 'vue-router' {
  // type redirect = string | undefined
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /* 路由标题 */
    title?: string
    /* assets/icons */
    icon?: string
    /* 排序 */
    order?: number
    /* 是否缓存 */
    keepAlive?: boolean
    /* 是否在菜单栏隐藏, 例如详情页 */
    hidden?: boolean
    /* 是否需要登录 */
    noLogin?: boolean
    /* 是否禁止点击 */
    disabled: boolean
    // 权限
    permissions?: string[]
  }
}
