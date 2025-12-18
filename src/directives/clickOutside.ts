// import type { Directive, DirectiveBinding } from 'vue'

// // 定义指令支持的元素类型（排除文本节点等非元素节点）
// type ElType = HTMLElement | null

// // 点击外部指令的核心逻辑
// const clickOutside: Directive = {
//   // 指令绑定到元素时触发
//   mounted(el: ElType, binding: DirectiveBinding) {
//     if (!el) return

//     // 存储点击处理函数（方便后续解绑）
//     const onClick = (e: MouseEvent) => {
//       // 排除元素自身、子元素、指令修饰符指定的例外元素
//       if (el && !el.contains(e.target as Node) && binding.value) {
//         // 执行绑定的外部点击回调函数
//         binding.value()
//       }
//     }

//     // 将事件处理函数挂载到元素上，方便卸载时移除
//     el.__clickOutsideHandler__ = onClick

//     // 监听文档点击事件（使用捕获阶段，避免事件冒泡被阻止导致失效）
//     document.addEventListener('click', onClick, true)
//   },

//   // 指令所在组件卸载时触发（清理事件监听）
//   unmounted(el: ElType) {
//     if (!el || !el.__clickOutsideHandler__) return

//     // 移除事件监听，防止内存泄漏
//     document.removeEventListener('click', el.__clickOutsideHandler__, true)
//     delete el.__clickOutsideHandler__
//   },
// }

// // 扩展HTMLElement类型，避免TS报错（声明自定义属性）
// declare global {
//   interface HTMLElement {
//     __clickOutsideHandler__?: (e: MouseEvent) => void
//   }
// }

// export default clickOutside
import { ClickOutside } from 'element-plus'

export default ClickOutside
