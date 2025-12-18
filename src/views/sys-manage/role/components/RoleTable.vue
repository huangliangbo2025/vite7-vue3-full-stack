<script setup lang="ts">
import type { RoleDto } from '@/apis/role'
import type { TableColumn } from '@/components/TheTable/type'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useReqRoles } from '../hooks'
import { ElLoading } from 'element-plus'

const emit = defineEmits<{
  edit: [v: RoleDto]
  delete: [v: RoleDto]
  view: [v: RoleDto]
  permission: [v: RoleDto]
}>()

const columns: TableColumn[] = [
  {
    label: '角色',
    prop: 'name'
  },
  {
    label: '角色',
    prop: 'code'
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
    label: '权限',
    prop: 'permission'
  },
  {
    label: '操作',
    prop: 'operate',
    width: 120
  }
]

const { deleteRoleMutation } = useReqRoles()

const { mutateAsync: deleteRole } = deleteRoleMutation

const handleDelete = async (id: number) => {
  const loadingInstance = ElLoading.service({ text: '正在删除', fullscreen: false })
  await deleteRole(id)
  loadingInstance.close()
}
</script>

<template>
  <TheTable :columns="columns" v-bind="$attrs">
    <template #name="scope">
      <el-link :underline="false" @click="emit('view', scope.row)">
        {{ scope.row.name }}
      </el-link>
    </template>
    <template #permission="scope">
      <el-space>
        <el-link :underline="false" type="primary" @click="emit('permission', scope.row)">
          分配权限
        </el-link>
      </el-space>
    </template>
    <template #operate="scope">
      <el-space>
        <el-link :underline="false" type="primary" @click="emit('edit', scope.row)">
          <el-icon :size="16">
            <Edit />
          </el-icon>
        </el-link>
        <el-popconfirm
          :width="240"
          title="你确认删除改角色吗？"
          @confirm="() => handleDelete(scope.row.id)"
        >
          <template #reference>
            <el-link :underline="false" type="danger">
              <el-icon :size="16">
                <Delete />
              </el-icon>
            </el-link>
          </template>
        </el-popconfirm>
      </el-space>
    </template>
  </TheTable>
</template>
