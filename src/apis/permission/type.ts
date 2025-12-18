export interface CreatePermissionDto {
  id?: string
  code: string
  name: string
  description?: string
}

export interface PermissionDto extends CreatePermissionDto {
  menuId: string
  id: string
  createTime: string
  updateTime: string
}
