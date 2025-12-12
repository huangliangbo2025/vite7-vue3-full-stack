import { isPhone } from './is'

// 手机号验证规则
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (!value)
    return callback(new Error('请输入手机号'))
  if (!isPhone(value))
    return callback(new Error('请输入11位手机号'))
  callback()
}
