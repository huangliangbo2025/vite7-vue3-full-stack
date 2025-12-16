// mock/index.ts
import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
import { getMenuList } from './mock.data.ts'
import { createResponse } from './util'

export default [
  {
    url: '/api/menu/create',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/menu/update',
    method: 'put',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/menu/delete',
    method: 'delete',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse(undefined, request),
  },
  {
    url: '/api/menu/list',
    method: 'get',
    timeout: 1000, // 模拟延迟
    response: (request: any) =>
      createResponse(
        Mock.mock(getMenuList()),
        request,
      ),
  },
] as MockMethod[]
