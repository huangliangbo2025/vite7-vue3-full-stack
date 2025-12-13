<script setup lang="ts">
import type { RoleDto } from '@/apis/role'
import type { TableColumn } from '@/components/TheTable/type'
import { Edit } from '@element-plus/icons-vue'

const emit = defineEmits<{
  edit: [v: RoleDto]
  view: [v: RoleDto]
}>()

const columns: TableColumn[] = [
  {
    label: '角色',
    prop: 'name'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '更新时间',
    prop: 'updateTime'
  },
  {
    label: '操作',
    prop: 'operate',
    width: 120
  }
]
</script>

<template>
  <TheTable :columns="columns" v-bind="$attrs">
    <template #name="scope">
      <el-link :underline="false" @click="emit('view', scope.row)">
        {{ scope.row.name }}
      </el-link>
    </template>
    <template #operate="scope">
      <el-link :underline="false" @click="emit('edit', scope.row)">
        <el-icon :size="24">
          <Edit />
        </el-icon>
      </el-link>
    </template>
  </TheTable>
</template>
