import type { PaginatedRequest } from '@/apis/httpClient'
import { httpClient } from '@/apis/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreateUserDto, UserDto } from './type'

export * from './type'

/* 创建用户 */
export const createUserApi = (data: CreateUserDto) =>
  httpClient.post<CreateUserDto>('/api/user/create', data)

/* 更新用户 */
export const updateUserApi = (data: CreateUserDto, config: AxiosRequestConfig = {}) =>
  httpClient.put<CreateUserDto>('/api/user/update', data, config)

/* 删除用户 */
export const deleteUserApi = (id: CreateUserDto['id']) =>
  httpClient.delete<CreateUserDto>(`/api/user/delete/${id}`)

/* 查询用户列表 */
export const queryUserListApi = (params: PaginatedRequest, config: AxiosRequestConfig = {}) =>
  httpClient.getPaginated<UserDto>(`/api/user/list`, params, config)
