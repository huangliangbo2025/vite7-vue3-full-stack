// mock/index.ts
import type { MenuDto } from '@/apis/menu'
import { v4 as uuidv4 } from 'uuid'
import type { MockMethod } from 'vite-plugin-mock'
import { getMenuList, getMenuUserInfo } from './mock.data'
import { createErrorResponse, createResponse, getUserMenus } from './util'

export default [
  // 登录接口
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: ({ body }: any) => {
      console.log('Login request body:', body)
      const result = getMenuUserInfo(body.username)

      if (result) {
        const menuList = getMenuList() as MenuDto[]
        return createResponse({
          ...result,
          menus: getUserMenus(result.menuIds, menuList),
        })
      } else {
        return createErrorResponse('正确的账号是:admin、guest、superadmin', 0)
      }
    },
  },
  // 注册接口
  {
    url: '/api/register',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: ({ body }: any) => {
      return createResponse(body)
    },
  },
] as MockMethod[]
