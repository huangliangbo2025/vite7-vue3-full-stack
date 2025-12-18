export interface CreateMenuDto {
  // 父级菜单
  parentId?: string
  // 菜单ID，编辑时需要
  id?: string
  /* 路由路径 */
  path: string
  /* 路由标题 */
  title: string
  /* assets/icons */
  icon?: string
  /* 排序 */
  order?: number
  /* 是否缓存 */
  keepAlive?: boolean
  /* 是否在菜单栏隐藏, 例如详情页 */
  hidden?: boolean
  /* 是否需要登录 */
  isLogin?: boolean
  /* 是否禁止点击 */
  disabled: boolean
  // 权限
  permissions?: Array<{ name: string; code: string; id: string; remark: string }>
  // 是否启用
  enabled: 1 | 0
}

export interface MenuDto extends CreateMenuDto {
  id: string
  createTime: string
  updateTime: string
  children?: MenuDto[]
}
