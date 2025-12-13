import type { PaginatedRequest } from '@/apis/httpClient'
import { httpClient } from '@/apis/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreateMenuDto, MenuDto } from './type'

export * from './type'

/* 创建角色 */
export const createMenuApi = (data: CreateMenuDto) =>
  httpClient.post<CreateMenuDto>('/api/menu/create', data)

/* 更新角色 */
export const updateMenuApi = (
  data: CreateMenuDto & { id: MenuDto['id'] },
  config: AxiosRequestConfig = {},
) => httpClient.put<CreateMenuDto>('/api/menu/update', data, config)

/* 删除角色 */
export const deleteMenuApi = (id: MenuDto['id']) =>
  httpClient.delete<CreateMenuDto>(`/api/menu/delete/${id}`)

/* 查询角色列表 */
export const queryMenuListApi = (params: PaginatedRequest, config: AxiosRequestConfig = {}) =>
  httpClient.getPaginated<MenuDto>(`/api/menu/list`, params, config)

/* 查询角色详情 */
export const queryMenuDetailApi = (id: MenuDto['id']) =>
  httpClient.getPaginated<MenuDto>(`/api/menu/${id}`)
