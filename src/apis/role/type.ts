export interface CreateRoleDto {
  /* 角色ID */
  id?: number
  /* 角色名称 */
  name: string
  /* 角色标识码 */
  code: string
  /* 角色描述 */
  desc: string
  /* 角色拥有的菜单权限 */
  menuIds: string[]
  /* 角色拥有的操作权限 */
  permissions: string[]
}

export interface RoleDto extends CreateRoleDto {
  createTime: string
  updateTime: string
}
