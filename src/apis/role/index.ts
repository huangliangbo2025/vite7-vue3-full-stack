import type { PaginatedRequest } from '@/apis/httpClient'
import { httpClient } from '@/apis/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreateRoleDto, RoleDto } from './type'

export * from './type'

/* 创建角色 */
export const createRoleApi = (data: CreateRoleDto) =>
  httpClient.post<CreateRoleDto>('/api/role/create', data)

/* 更新角色 */
export const updateRoleApi = (data: CreateRoleDto, config: AxiosRequestConfig = {}) =>
  httpClient.put<CreateRoleDto>('/api/role/update', data, config)

/* 删除角色 */
export const deleteRoleApi = (id: CreateRoleDto['id']) =>
  httpClient.delete<CreateRoleDto>(`/api/role/delete/${id}`)

/* 查询角色列表 */
export const queryRoleListApi = (params: PaginatedRequest, config: AxiosRequestConfig = {}) =>
  httpClient.get<RoleDto>(`/api/role/list`, params, config)

/* 查询角色详情 */
export const queryRoleDetailApi = (id: CreateRoleDto['id']) =>
  httpClient.get<RoleDto>(`/api/role/${id}`)
