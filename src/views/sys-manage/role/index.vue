<script setup lang="ts">
import { useDialog } from '@/hooks'
import { RoleFormDialog, RoleTable } from './components'
import { useReqRoles } from './hooks'

const { dialogRef, openDialog, openEditDialog, openDetailDialog } = useDialog()

const { queryRoleList, pagination, roleList, total } = useReqRoles()

const { isFetching } = queryRoleList
</script>

<template>
  <div class="w-full p-5">
    <p class="text-[var(--el-color-danger)]">
      如需分流，请自己创建一个角色，然后再分配给对应要分流的账号。
    </p>
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
        @view="openDetailDialog"
      />
      <div class="mt-20px flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :pager-count="7"
          :total="total"
          background
          layout="total, sizes, prev, pager, next"
        />
      </div>
      <RoleFormDialog ref="dialogRef" />
    </el-card>
  </div>
</template>
