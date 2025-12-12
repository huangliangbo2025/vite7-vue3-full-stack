import type { AxiosRequestConfig } from 'axios'

import { httpClient } from '@/apis/httpClient'
import type { LoginParams, LoginResponse, RegisterParams, UserInfo } from './type'

export const loginApi = (data: LoginParams, config: AxiosRequestConfig = {}) =>
  httpClient.post<LoginResponse>('/api/login', data, config)

export const registerApi = (data: RegisterParams, config: AxiosRequestConfig = {}) =>
  httpClient.post<LoginResponse>('/api/register', data, config)
