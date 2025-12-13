export interface CreateMenuDto {
  // 路由路径
  path: string
  // 菜单名称
  title: string
  icon: string
  parentId: string | null
  sort: number
  status: 1 | 0
  remark: string
  buttons?: string[]
}

export interface MenuDto extends CreateMenuDto {
  id: string
  createTime: string
  updateTime: string
  children?: MenuDto[]
}
