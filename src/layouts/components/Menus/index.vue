<script setup lang="ts">
import { ElMenu } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/is'
import MenuItem from './MenuItem.vue'
import type { MenuDto } from '@/apis/menu'
import Logo from '../Logo.vue'
import { useCollapseInject } from '@/layouts/helper/menuCollapse'

// 属性定义
interface Props {
  menuData: MenuDto[]
  mode?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical'
})

const route = useRoute()
const { isCollapse } = useCollapseInject()

// 获取当前激活的菜单
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <div class="app-side-menu-container flex flex-col" :class="{ 'is-collapse': isCollapse }">
    <div class="flex h-[var(--top-bar-height)] items-center">
      <Logo />
    </div>
    <div class="flex-1">
      <ElMenu
        :default-openeds="['/sys-manage']"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="true"
        :unique-opened="true"
        :mode="mode"
        router
      >
        <MenuItem v-for="item in menuData" :key="item.id" :item="item" />
      </ElMenu>
    </div>
  </div>
</template>
