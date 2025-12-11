// mock/index.ts
import { v4 as uuidv4 } from 'uuid'
import type { MockMethod } from 'vite-plugin-mock'
import { createErrorResponse, createResponse } from './util'

export default [
  // 示例 2：POST 请求 + 动态参数
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: ({ body }: any) => {
      console.log('Login request body:', body)
      if (body.username === 'admin' && body.password === 'admin') {
        return createResponse({
          token: uuidv4(),
          ...body,
          role: ['admin'],
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        })
      } else {
        return createErrorResponse('正确的账号密码是:admin/admin', 0)
      }
    },
  },
] as MockMethod[]
