import { httpClient } from '@/apis/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreatePermissionDto, PermissionDto } from './type'

export * from './type'

/* 创建角色 */
export const createPermissionApi = (data: CreatePermissionDto) =>
  httpClient.post<CreatePermissionDto>('/api/menu/create', data)

/* 更新权限 */
export const updatePermissionApi = (
  data: CreatePermissionDto,
  config: AxiosRequestConfig = {},
) => httpClient.put<CreatePermissionDto>('/api/menu/update', data, config)

/* 删除权限 */
export const deletePermissionApi = (id: PermissionDto['id']) =>
  httpClient.delete<CreatePermissionDto>(`/api/menu/delete/${id}`)

/* 查询权限列表 */
export const queryPermissionListApi = (params: any, config: AxiosRequestConfig = {}) =>
  httpClient.get<PermissionDto[]>(`/api/menu/list`, params, config)

/* 查询权限详情 */
export const queryPermissionDetailApi = (id: PermissionDto['id']) =>
  httpClient.getPaginated<PermissionDto>(`/api/menu/${id}`)
