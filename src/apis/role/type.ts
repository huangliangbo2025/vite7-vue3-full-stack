export interface CreateRoleDto {
  id?: number
  name: string
  buttons: string[]
  menus: string[]
}

export interface RoleDto extends CreateRoleDto {
  createTime: string
  updateTime: string
}
