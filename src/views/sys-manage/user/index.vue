<script setup lang="ts">
import { useDialog } from '@/hooks'
import { FilterUSersSearch, UserFormDialog, UserTable } from './components'
import { useReqUser } from './hooks'

const { dialogRef, openDialog, openEditDialog } = useDialog()

const { queryUserList, handleSeach, pagination, userList, total } = useReqUser()

const { isFetching } = queryUserList
</script>

<template>
  <div class="w-full p-5">
    <div class="mb-5">
      <p class="text-info">您可以进入角色权限界面，设置相应的角色权限</p>
      <p class="text-info">可前往系统设置打开和关闭分流</p>
      <p class="text-[var(--el-color-danger)]">
        如需分流，请自己创建一个角色，然后再分配给对应要分流的账号。
      </p>
    </div>
    <el-card>
      <template #header>
        <div class="flex flex-wrap items-end justify-between gap-5">
          <FilterUSersSearch @search="handleSeach" />
          <el-button type="primary" @click="openDialog">
            <template #icon>
              <el-icon-plus />
            </template>
            添加角色
          </el-button>
        </div>
      </template>
      <UserTable v-loading="isFetching" :data="userList" @edit="openEditDialog" />
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
      <UserFormDialog ref="dialogRef" />
    </el-card>
  </div>
</template>
