// mock/index.ts
import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
import { getMenuList } from './mock.data.ts'
import { createResponse } from './util.ts'

export default [
  {
    url: '/api/permission/create',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/permission/update',
    method: 'put',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/permission/delete',
    method: 'delete',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse(undefined, request),
  },
  {
    url: '/api/permission/list',
    method: 'get',
    timeout: 1000, // 模拟延迟
    response: (request: any) =>
      createResponse(
        Mock.mock([{
          'id': '@id', // 随机生成 GUID 或简单 ID（可选字段）
          code: 'sys:user:add',
          name: '新增用户',
          remark: '允许创建系统用户',
          'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        }, {
          'id': '@id', // 随机生成 GUID 或简单 ID（可选字段）
          code: 'sys:user:edit',
          name: '编辑用户',
          remark: '允许编辑系统用户',
          'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        }]),
        request,
      ),
  },
] as MockMethod[]
