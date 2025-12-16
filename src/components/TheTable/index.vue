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
        <template #default="scope">
          <slot :name="col.prop" v-bind="scope">
            <template v-if="col.ellipsis">
              <el-tooltip :content="scope.row[col.prop!]">
                <span class="text-ellipsis-1 block">
                  {{ scope.row[col.prop!] }}
                </span>
              </el-tooltip>
            </template>
            <span v-else>
              {{ scope.row[col.prop!] }}
            </span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
