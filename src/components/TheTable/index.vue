<script setup lang="ts">
import type { TableColumn } from './type'
import { ElTableColumn } from 'element-plus'

// import { TableColumn } from './type';

interface Props {
  columns?: TableColumn[]
}

const { columns = [] } = defineProps<Props>()
</script>

<template>
  <el-table v-bind="$attrs">
    <template v-for="col in columns" :key="col.prop">
      <ElTableColumn v-bind="col">
        <!-- { $index, cellIndex, column, expanded, row   } -->
        <template #default="scope">
          <slot :name="col.prop" v-bind="scope">
            <template v-if="col.ellipsis">
              <el-tooltip :content="scope.row[col.prop!]">
                <span class="text-ellipsis-1 block">{{ scope.row[col.prop!] }}</span>
              </el-tooltip>
            </template>
            <span v-else>{{ scope.row[col.prop!] }}</span>
          </slot>
        </template>
      </ElTableColumn>
    </template>
  </el-table>
</template>
