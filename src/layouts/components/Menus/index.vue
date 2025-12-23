<script setup lang="ts">
import { ElMenu } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/is'
import MenuItem from './MenuItem.vue'
import type { MenuDto } from '@/apis/menu'
import Logo from '../Logo.vue'

// 属性定义
interface Props {
  menuData: MenuDto[]
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
  <div class="menu-container px-12px flex-col">
    <div class="flex h-[var(--top-bar-height)] items-center">
      <Logo />
    </div>
    <div class="flex-1">
      <ElMenu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="true"
        :unique-opened="true"
        :mode="mode"
        @select="handleMenuSelect"
      >
        <MenuItem v-for="item in menuData" :key="item.id" :item="item" />
      </ElMenu>
    </div>
  </div>
</template>

<style lang="scss"></style>
