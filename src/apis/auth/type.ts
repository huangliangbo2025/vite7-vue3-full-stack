import type { RouteMeta } from 'vue-router'

export interface LoginParams {
  username: string
  password: string
}

export interface MenuItem extends RouteMeta {
  // 路由ID
  id: string
  // 父级路由
  parentId?: string
  // 路由名称
  name?: string
  // 路由路径
  path: string
  /* 路由重定向 */
  redirect?: string

  children?: MenuItem[]
}

export interface LoginResponse {
  username: string
  token: string
  isAdmin: number
  role: string | string[]
  createTime: string
  nickname: string
  remark: string
  menuPermissions: string[]
  buttonPermissions: string[]
}

export interface RegisterParams {
  username: string
  password: string
  nickname: string
}
