// 可以抽离到单独的类型文件，比如 types/provide.ts
import { inject, type Ref } from 'vue'

// 复用上面定义的key
export const COLLAPSE_KEY = Symbol('collapse')

export interface CollapseProvide {
  isCollapse: Ref<boolean>
  collapseToggle: () => void
}

export const useCollapseProvide = () => {
  const isCollapse = ref(false)

  const collapseToggle = () => {
    isCollapse.value = !isCollapse.value
  }

  provide(COLLAPSE_KEY, {
    isCollapse,
    collapseToggle,
  })

  return {
    isCollapse,
  }
}

// 封装inject方法，添加默认值和类型提示
export const useCollapseInject = (): CollapseProvide => {
  const collapse = inject<CollapseProvide>(COLLAPSE_KEY, {
    isCollapse: ref(false),
    collapseToggle: () => {},
  })
  return collapse
}
