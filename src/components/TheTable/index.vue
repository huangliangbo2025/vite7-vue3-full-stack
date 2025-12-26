<script setup lang="ts">
import type { TableColumn } from './type'

interface Props {
  columns?: TableColumn[]
  rowKey?: string
  treeProps?: {
    children?: string
    hasChildren?: string
  }
}

withDefaults(defineProps<Props>(), {
  columns: () => [],
  rowKey: 'id',
  treeProps: () => ({
    children: 'children'
  })
})
</script>
<template>
  <el-table v-bind="$attrs" :row-key="rowKey" :tree-props="treeProps">
    <template v-for="(col, index) in columns" :key="col.prop || index">
      <el-table-column v-bind="col">
        <template #default="scope" v-if="col.prop && $slots[col.prop]">
          <slot :name="col.prop" v-bind="scope" :index="index"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
