<!-- MenuItem.vue -->
<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { computed } from 'vue'
import MenuItemContent from './MenuItemContent.vue'

interface Props {
  item: RouteRecordRaw
}

const { item } = defineProps<Props>()

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
      :key="child.name"
      :item="child"
      :disabled="item.meta?.disabled"
    />
  </ElSubMenu>

  <!-- 没有子菜单的情况 -->
  <ElMenuItem v-else :index="item.path" :disabled="item.meta?.disabled">
    <MenuItemContent :item="item" />
  </ElMenuItem>
</template>
