<!-- MenuItem.vue -->
<script setup lang="ts">
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { computed } from 'vue'
import MenuItemContent from './MenuItemContent.vue'
import type { MenuDto } from '@/apis/menu'
import { useCollapseInject } from '@/layouts/helper/menuCollapse'

interface Props {
  item: MenuDto
}

const { item } = defineProps<Props>()

const { isCollapse } = useCollapseInject()

// 判断是否有子菜单
const hasChildren = computed(() => {
  return item.children && item.children.length > 0
})
</script>

<template>
  <ElSubMenu v-if="hasChildren" :index="item.path" :popper-append-to-body="false">
    <template #title>
      <MenuItemContent :item="item" />
    </template>
    <MenuItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      :disabled="item.disabled"
    />
  </ElSubMenu>

  <!-- 没有子菜单的情况, 当菜单收缩时，哪些无用的标题隐藏掉 -->
  <ElMenuItem
    v-else-if="!(isCollapse && item.disabled)"
    :index="item.path"
    :disabled="item.disabled"
  >
    <MenuItemContent :item="item" />
  </ElMenuItem>
</template>
