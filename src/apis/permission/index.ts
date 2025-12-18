import { httpClient } from '@/apis/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreatePermissionDto, PermissionDto } from './type'

export * from './type'

/* 创建角色 */
export const createPermissionApi = (data: CreatePermissionDto) =>
  httpClient.post<CreatePermissionDto>('/api/permission/create', data)

/* 更新权限 */
export const updatePermissionApi = (
  data: CreatePermissionDto,
  config: AxiosRequestConfig = {},
) => httpClient.put<CreatePermissionDto>('/api/permission/update', data, config)

/* 删除权限 */
export const deletePermissionApi = (id: PermissionDto['id']) =>
  httpClient.delete<CreatePermissionDto>(`/api/permission/delete/${id}`)

/* 查询权限列表 */
export const queryPermissionListApi = (params = {}, config: AxiosRequestConfig = {}) =>
  httpClient.get<PermissionDto[]>(`/api/permission/list`, params, config)

/* 查询权限详情 */
export const queryPermissionDetailApi = (id: PermissionDto['id']) =>
  httpClient.getPaginated<PermissionDto>(`/api/permission/${id}`)
