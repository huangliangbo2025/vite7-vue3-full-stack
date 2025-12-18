<script setup lang="ts">
import type { PermissionDto } from '@/apis/permission'
import type { TableColumn } from '@/components/TheTable/type'
import { Delete, Edit } from '@element-plus/icons-vue'

const emit = defineEmits<{
  edit: [v: PermissionDto]
}>()

const columns: TableColumn[] = [
  {
    label: '权限名称',
    prop: 'name',
    width: 120
  },
  {
    label: '权限标识码',
    prop: 'code'
  },
  {
    label: '权限备注',
    prop: 'remark'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 180
  },
  {
    label: '操作',
    prop: 'operate',
    width: 130
  }
]
</script>

<template>
  <TheTable
    :columns="columns"
    style="width: 100%"
    :default-expand-all="true"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    border
    v-bind="$attrs"
  >
    <template #operate="{ row }">
      <el-space>
        <el-link type="primary" :underline="false" @click="emit('edit', row)">
          <el-icon :size="20">
            <Edit />
          </el-icon>
        </el-link>
        <el-link type="danger" :underline="false">
          <el-icon :size="20">
            <Delete />
          </el-icon>
        </el-link>
      </el-space>
    </template>
  </TheTable>
</template>
