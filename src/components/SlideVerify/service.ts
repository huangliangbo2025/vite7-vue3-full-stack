import { createVNode, render } from 'vue'
import SlideVerify from './index.vue'

export const SlideVerifyService = {
  open(): Promise<boolean> {
    return new Promise(resolve => {
      // 创建容器
      const container = document.createElement('div')

      // 创建 VNode
      const vnode = createVNode(SlideVerify, {
        // 监听成功事件
        onSuccess: () => {
          cleanup()
          resolve(true)
        },
        // 监听关闭事件
        onClose: () => {
          cleanup()
          resolve(false)
        },
      })

      // 挂载
      render(vnode, container)
      document.body.appendChild(container)

      // 收尾函数
      const cleanup = () => {
        render(null, container)
        if (container.parentNode)
          container.parentNode.removeChild(container)
      }
    })
  },
}
