<script setup lang="ts">
import { useDialog } from '@/hooks'
import { RoleFormDialog, RoleTable, AssignPermissionDialog } from './components'
import { useReqRoles } from './hooks'

const { dialogRef, openDialog, openEditDialog, openDetailDialog } = useDialog()
const { dialogRef: dialogAssignPermissionRef, openDialog: openAssignPermissionDialog } = useDialog()

const { queryRoleList, roleList } = useReqRoles()

const { isFetching } = queryRoleList
</script>

<template>
  <div class="w-full p-5">
    <p class="text-info">每个系统都应当内置一个系统管理，可进行界面的任何操作</p>
    <el-card class="mt-5">
      <template #header>
        <div class="flex flex-wrap items-end justify-end gap-5">
          <el-button type="primary" @click="openDialog">
            <template #icon>
              <el-icon-plus />
            </template>
            添加角色
          </el-button>
        </div>
      </template>
      <RoleTable
        v-loading="isFetching"
        :data="roleList"
        @edit="openEditDialog"
        @delete="openDetailDialog"
        @view="openDetailDialog"
        @permission="openAssignPermissionDialog"
      />

      <RoleFormDialog ref="dialogRef" />
      <AssignPermissionDialog ref="dialogAssignPermissionRef" />
    </el-card>
  </div>
</template>
