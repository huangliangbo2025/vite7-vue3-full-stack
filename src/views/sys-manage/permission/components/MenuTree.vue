<script setup lang="ts">
import type { MenuDto } from '@/apis/menu'
import { useReqMenu } from '../../menu/hooks'
import { filterMenu } from '@/utils/menu'

const emit = defineEmits<{
  select: [menuItem: MenuDto]
}>()

const defaultProps = {
  children: 'children',
  label: 'title'
}

const { menuList } = useReqMenu()

const data = computed(() => {
  return filterMenu(menuList.value)
})

const handleNodeClick = (menuItem: MenuDto) => {
  emit('select', menuItem)
}
</script>

<template>
  <el-tree
    class="menu-tree-container"
    :data="data"
    :node-key="'id'"
    :props="defaultProps"
    default-expand-all
    highlight-current
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
  />
</template>

<style lang="scss">
.menu-tree-container {
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > .el-tree-node {
    border: 1px solid #e9f5fe;
    border-radius: 4px;
  }

  .el-tree-node__content {
    height: 36px;
  }
}
</style>
