export interface CreateUserDto {
  id?: string
  username: string
  password: string
  role: string
  nickname: string
  status: 1 | 0
  remark: string
}

export interface UserDto extends CreateUserDto {
  createTime: string
  lastLoginTime: string
  ip: string
  userAgent: string
  isAdmin?: 1 | 0 // 是否是系统管理员， 如果是系统管理员，就不应该被限制
}
