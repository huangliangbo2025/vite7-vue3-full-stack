<script setup lang="ts">
import type { PermissionDto } from '@/apis/permission'
import type { TableColumn } from '@/components/TheTable/type'
import { Delete, Edit } from '@element-plus/icons-vue'

const emit = defineEmits<{
  edit: [v: PermissionDto]
}>()

const columns: TableColumn[] = [
  {
    label: '菜单名称',
    prop: 'title',
    width: 120
  },
  {
    label: '菜单路径',
    prop: 'path'
  },
  {
    label: '图标',
    prop: 'icon'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180
  },

  {
    label: '状态',
    prop: 'enabled',
    width: 80
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
    <template #icon="{ row }">
      <div class="text-primary">
        <svg-icon size="30" :name="row.icon" />
      </div>
    </template>
    <template #enabled="{ row }">
      <el-switch v-model="row.enabled" :active-value="1" :inactive-value="0" />
    </template>
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
