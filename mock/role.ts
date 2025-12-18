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
    url: '/api/role/delete/:id',
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
        Mock.mock([{
          id: '@id',
          name: '超级管理员',
          code: 'superAdmin',
          desc: '具备用户所有的权限管理',
          menuIds: [
            'menu_1001',
            'menu_2002',
            'menu_2003',
            'menu_1000',
            'menu_2000',
            'menu_2001',
            'menu_2004',
            'menu_2005',
            'menu_9000',
            'menu_9001',
          ],
          permissions: [
            'dashboard:view',
            'sys-manage:view',
            'sys-manage:user:view',
            'sys-manage:user:edit',
            'sys-manage:user:delete',
            'sys-manage:role:edit',
            'sys-manage:role:view',
            'sys-manage:menu:create',
            'sys-manage:menu:edit',
            'sys-manage:menu:delete',
            'sys-manage:permission:edit',
            'sys-manage:permission:create',
            'sys-manage:permission:delete',
            'external:view',
          ],
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
          updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 更新时间
        }, {
          id: '@id',
          name: '管理员',
          code: 'admin',
          desc: '可以查看系统所有界面，但是部分操作权限受限',
          menuIds: [
            'menu_1001',
            'menu_2002',
            'menu_2003',
            'menu_1000',
            'menu_2000',
            'menu_2001',
            'menu_2004',
            'menu_2005',
            'menu_9000',
            'menu_9001',
          ],
          permissions: [
            'dashboard:view',
            'sys-manage:view',
            'sys-manage:user:view',
            'sys-manage:user:edit',
            'sys-manage:user:delete',
            'external:view',
          ],
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
          updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 更新时间
        }, {
          id: '@id',
          name: '游客',
          code: 'guest',
          desc: '可查看系统部分界面，并且部分操作权限受限',
          menuIds: [
            'menu_1001',
          ],
          permissions: [
            'dashboard:view',
          ],
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
          updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 更新时间
        }]),
        request,
      ),
  },
] as MockMethod[]
