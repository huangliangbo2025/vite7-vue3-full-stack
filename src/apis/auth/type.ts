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

export interface UserInfo {
  username: string
  token: string
  status: number
  isadmin: number
  roleId: number
  ip: string
  userAgent: string
  loginTime: string
  expireTime: 0
  createTime: string
  nickname: string
  remark: string
  accountId?: string | number // 用户账号ID
  sid?: string | number // 商户ID
  permissions: string[]
}

export type LoginResponse = UserInfo
