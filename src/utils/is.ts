import { isVNode } from 'vue'

/**
 * @description 校验手机号格式是否正确
 * @param value 手机号
 * @returns  boolean
 */
export const isPhone = (value: string) => {
  const reg = /^1[3-9]\d{9}$/

  return reg.test(value)
}

/**
 * 是否是外链
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path: string) {
  return /^(?:https?:|mailto:|tel:)/.test(path)
}

// 是否是组件
export function isComponent(value: any) {
  // 检查是否是VNode且类型是组件
  return isVNode(value) && typeof value.type === 'object' && value.type !== null
}
