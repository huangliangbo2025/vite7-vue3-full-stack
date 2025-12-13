// mock/index.ts
import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
import type { MockMethod } from 'vite-plugin-mock'
import { createResponse } from './util'

const Random = Mock.Random
// 扩展 Random 的 md5 方法
Mock.Random.extend({
  md5(str) {
    // 支持传入自定义字符串，无参数则生成随机 md5（模拟 v1.x 行为）
    const randomStr = str || Mock.Random.string(16) // 生成16位随机字符串
    return md5(randomStr)
  },
  userAgent() {
    // 真实 User-Agent 列表（可根据需求补充更多）
    const uas = [
      // PC 浏览器
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/119.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/118.0.2088.61 Safari/537.36',
      // 移动端浏览器
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/115.0 Firefox/115.0',
      'Mozilla/5.0 (Linux; Android 12; SM-G9910) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    ]
    // 随机返回一个 UA（Mock.Random.integer 是 v2.x 仍支持的内置方法）
    const randomIndex = Mock.Random.integer(0, uas.length - 1)
    return uas[randomIndex]
  },
})

export default [
  {
    url: '/api/user/create',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/user/update',
    method: 'put',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse({}, request),
  },
  {
    url: '/api/user/delete',
    method: 'delete',
    timeout: 1000, // 模拟延迟
    response: (request: any) => createResponse(undefined, request),
  },
  {
    url: '/api/user/list',
    method: 'get',
    timeout: 1000, // 模拟延迟
    response: (request: any) =>
      createResponse(
        Mock.mock({
          'list|10': [{
            'id': '@id', // 随机生成 GUID 或简单 ID（可选字段）
            'username': /^[a-z0-9]{6,12}$/, // 用户名：6-12位字母+数字
            'isAdmin?1': [1, 0],
            'role|1': ['admin', 'editor', 'viewer', 'operator'], // 角色：从指定列表随机选
            'nickname': Random.cname(), // 昵称：随机中文姓名
            'status|1': [0, 1], // 状态：0（禁用）/1（启用）
            'remark': Random.cparagraph(1, 3), // 备注：1-3句中文段落
            'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间：YYYY-MM-DD HH:mm:ss
            'lastLoginTime': '@datetime("yyyy-MM-dd HH:mm:ss")', // 最后登录时间：同上
            'ip': Random.ip(), // IP地址：随机合法 IP
            'userAgent': Random.userAgent(), // User-Agent：随机浏览器/设备标识
          }],
        }),
        request,
      ),
  },
  {
    url: '/api/user/detail',
    method: 'get',
    timeout: 1000, // 模拟延迟
    response: (request: any) =>
      createResponse(
        Mock.mock({
          'token': uuidv4(),
          'id': '@id', // 随机生成 GUID 或简单 ID（可选字段）
          'username': /^[a-z0-9]{6,12}$/, // 用户名：6-12位字母+数字
          'password': Random.md5(), // 密码：模拟加密后的 MD5 字符串（实际场景不会明文返回）
          'role?1': ['admin', 'editor', 'viewer', 'operator'], // 角色：从指定列表随机选
          'nickname': Random.cname(), // 昵称：随机中文姓名
          'status?1': [0, 1], // 状态：0（禁用）/1（启用）
          'remark': Random.cparagraph(1, 3), // 备注：1-3句中文段落
          'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间：YYYY-MM-DD HH:mm:ss
          'lastLoginTime': '@datetime("yyyy-MM-dd HH:mm:ss")', // 最后登录时间：同上
          'ip': Random.ip(), // IP地址：随机合法 IP
          'userAgent': Random.userAgent(), // User-Agent：随机浏览器/设备标识
        }),
        request,
      ),
  },
] as MockMethod[]
