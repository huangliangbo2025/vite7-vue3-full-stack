<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ElMenu } from 'element-plus'
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
      <MenuItem v-for="item in menuData" :key="item.name" :item="item" />
    </ElMenu>
  </div>
</template>

<style lang="scss"></style>
