<script setup lang="ts">
import type { RoleDto, UserDto } from '@/apis/user'
import type { TableColumn } from '@/components/TheTable/type'
import { Delete, Edit, Share } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'

const emit = defineEmits<{
  edit: [v: RoleDto]
}>()

const columns: TableColumn[] = [
  {
    label: '账号',
    prop: 'username',
    width: 120
  },
  {
    label: '角色',
    prop: 'role',
    width: 120
  },
  {
    label: '昵称',
    prop: 'nickname',
    width: 120
  },
  {
    label: '备注',
    prop: 'remark',
    ellipsis: true
  },
  {
    label: 'IP',
    prop: 'ip',
    width: 130
  },
  {
    label: 'USER-AGENT',
    prop: 'userAgent',
    ellipsis: true
  },
  {
    label: '上次登录时间',
    prop: 'lastLoginTime',
    width: 180
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180
  },
  {
    label: '状态',
    prop: 'status',
    width: 80
  },
  {
    label: '操作',
    prop: 'operate',
    width: 120,
    fixed: 'right'
  }
]

const { copy } = useClipboard()

const onCopy = (row: UserDto) => {
  const source = `${row.username} \n ${row.password} \n ${window.location.host}`
  copy(source).then(() => {
    ElMessage.success('复制成功')
  })
}
</script>

<template>
  <TheTable :columns="columns" v-bind="$attrs" style="width: 100%">
    <template #role="{ row }">
      <el-tag>{{ row.role }}</el-tag>
    </template>
    <template #status="{ row }">
      <el-tag v-if="row.status === 1"> 启用 </el-tag>
      <el-tag v-else type="danger"> 停用 </el-tag>
    </template>
    <template #operate="{ row }">
      <el-space>
        <el-link type="primary" @click="emit('edit', row)">
          <el-icon :size="20">
            <Edit />
          </el-icon>
        </el-link>
        <el-link type="danger" @click="onCopy(row)">
          <el-icon :size="20">
            <Delete />
          </el-icon>
        </el-link>
      </el-space>
    </template>
  </TheTable>
</template>
