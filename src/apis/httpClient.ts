import { request } from '@/utils'
import type { AxiosRequestConfig } from 'axios'

// 统一的响应类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

// 分页响应类型
export interface PaginatedResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 分页请求参数
export interface PaginatedRequest {
  page?: number
  pageSize?: number
  [key: string]: any
}

// 创建针对 Vue Query 优化的 HTTP 客户端
class VueQueryHttpClient {
  private instance = request

  // GET 请求 - 适用于 useQuery
  async get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.get<T>(url, {
      params,
      ...config,
    })

    return response.data
  }

  // POST 请求 - 适用于 useMutation
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  // PUT 请求
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  // DELETE 请求
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  // 分页查询 - 专门为分页列表优化
  async getPaginated<T = any>(
    url: string,
    params: PaginatedRequest = {},
    config?: AxiosRequestConfig,
  ): Promise<PaginatedResponse<T>> {
    const response = await this.instance.get<PaginatedResponse<T>>(url, {
      params,
      ...config,
    })
    return response.data
  }
}

export const httpClient = new VueQueryHttpClient()
