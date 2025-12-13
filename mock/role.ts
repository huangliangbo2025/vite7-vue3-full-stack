// mock/index.ts
import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
import { createResponse } from './util'

export default [
  {
    url: '/api/role/create',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/role/update',
    method: 'put',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/role/delete',
    method: 'delete',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse(undefined, request),
  },
  {
    url: '/api/role/list',
    method: 'get',
    timeout: 1000, // 模拟延迟
    response: (request: any) =>
      createResponse(
        Mock.mock({
          'list|10': [{
            id: '@id',
            name: '@cname',
            menus: [],
            buttons: [],
            createTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
            updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 更新时间
          }],
        }),
        request,
      ),
  },
] as MockMethod[]
