<script setup lang="ts">
import type { MenuDto } from '@/apis/menu'
import type { TableColumn } from '@/components/TheTable/type'
import { Delete, Edit } from '@element-plus/icons-vue'

const emit = defineEmits<{
  edit: [v: MenuDto]
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
    label: '备注',
    prop: 'remark',
    ellipsis: true
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
    label: '按钮',
    prop: 'buttons',
    width: 80
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
  <TheTable :columns="columns" v-bind="$attrs" style="width: 100%">
    <template #buttons="{ row }">
      <el-link type="primary" class="text-12px!" @click="emit('edit', row)"> 查看 </el-link>
    </template>
    <template #enabled="{ row }">
      <el-switch v-model="row.enabled" :active-value="1" :inactive-value="0" />
    </template>
    <template #operate="{ row }">
      <el-space>
        <el-link type="primary" class="text-12px!" @click="emit('edit', row)"> 添加按钮 </el-link>
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
