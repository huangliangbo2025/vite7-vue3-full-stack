<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ElMenu } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/is'
import MenuItem from './MenuItem.vue'

// 属性定义
interface Props {
  menuData: RouteRecordRaw[]
  collapse?: boolean
  mode?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  collapse: false,
  mode: 'vertical'
})

const route = useRoute()
const router = useRouter()
const isCollapse = ref(props.collapse)

// 监听父组件传来的折叠状态
watch(
  () => props.collapse,
  (newVal) => {
    isCollapse.value = newVal
  }
)

// 生成完整路径函数（补充parentPath参数传递）
const getFullPath = (currentPath: string, parentPath: string = ''): string => {
  // 外部链接直接返回
  if (isExternal(currentPath)) return currentPath

  // 绝对路径直接返回
  if (currentPath.startsWith('/')) return currentPath

  // 无父路径时，拼接为根路径开头的绝对路径
  if (!parentPath) return `/${currentPath}`

  // 有父路径时，拼接父路径（确保父路径末尾没有多余的/）
  return parentPath.endsWith('/') ? `${parentPath}${currentPath}` : `${parentPath}/${currentPath}`
}

// 处理菜单数据：过滤隐藏项 + 生成完整路径
const processedMenuData = computed((): RouteRecordRaw[] => {
  // 递归函数增加parentPath参数，传递父菜单路径
  const recursion = (menu: RouteRecordRaw[], parentPath: string = ''): RouteRecordRaw[] => {
    return menu
      .filter((item) => !item.meta?.hideInMenu) // 过滤隐藏菜单
      .map((item) => {
        // 生成当前菜单的完整路径
        const currentFullPath = getFullPath(item.path, parentPath)

        // 有子菜单的情况
        if (item.children && item.children.length > 0) {
          // 子菜单只有1条且不强制显示父菜单时，直接复用子菜单的配置（路径已完整）
          if (item.children.length === 1 && !item.meta?.alwayShowChildInMenu) {
            const child = item.children[0]
            // 子菜单的完整路径基于当前父路径生成
            const childFullPath = getFullPath(child.path, currentFullPath)
            return {
              ...child,
              path: childFullPath,
              // 继承父菜单的meta（如果子菜单没有的话）
              meta: { ...item.meta, ...child.meta }
            }
          }

          // 正常显示父菜单和子菜单：递归处理子菜单（传递当前菜单的完整路径作为父路径）
          return {
            ...item,
            path: currentFullPath, // 当前菜单路径改为完整路径
            children: recursion(item.children, currentFullPath), // 子菜单基于当前完整路径递归
            // 确保name唯一（可选，避免路由name冲突）
            name: item.name || currentFullPath.replace(/\//g, '-').replace(/^-/, '')
          }
        }

        // 无子女菜单：返回自身（路径改为完整路径，移除children属性）
        return {
          ...omit(item, ['children']),
          path: currentFullPath
        } as RouteRecordRaw
      })
  }

  return recursion(props.menuData)
})

// 获取当前激活的菜单
const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 处理菜单选择
const handleMenuSelect = (index: string) => {
  console.log('handleMenuSelect', index)
  // 如果是外链，在新标签页打开
  if (isExternal(index)) {
    window.open(index, '_blank')
  } else {
    router.push(index)
  }
}
</script>

<template>
  <div class="menu-container">
    <ElMenu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="true"
      :unique-opened="true"
      :mode="mode"
      @select="handleMenuSelect"
    >
      <MenuItem v-for="item in processedMenuData" :key="item.name" :item="item" />
    </ElMenu>
  </div>
</template>

<style lang="scss"></style>
