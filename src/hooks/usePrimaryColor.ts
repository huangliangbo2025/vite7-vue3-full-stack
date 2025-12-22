import { generatePrimaryVars } from '@/utils'
import { useStorage } from '@vueuse/core'

export function usePrimaryColor() {
  // 预定义颜色
  const predefinedColors = [
    '#3e4fef', // Element 默认蓝色
    '#1890ff', // 蚂蚁蓝
    '#52c41a', // 绿色
    '#faad14', // 黄色
    '#f5222d', // 红色
    '#722ed1', // 紫色
    '#13c2c2', // 青色
    '#fa541c', // 橙色
    '#8c8c8c', // 灰色
    '#001529', // 暗色
    '#801529', //
    '#501529', //
    '#012d57', //
  ]
  // 本地持久化主题色
  const primaryColor = useStorage(
    'theme-primary-color',
    '#3e4fef',
  )

  function applyPrimary(color: string) {
    const vars = generatePrimaryVars(color)
    const root = document.documentElement

    Object.entries(vars).forEach(([key, val]) => {
      root.style.setProperty(key, val)
    })
  }

  function setPrimary(color: string) {
    primaryColor.value = color
    applyPrimary(color)
  }

  return {
    predefinedColors,
    primaryColor,
    setPrimary,
    applyPrimary,
  }
}
