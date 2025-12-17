<script setup lang="ts">
import { useDialog } from '@/hooks'
import { PermissionFormDialog, PermissionTable } from './components'
import { useReqPermission } from './hooks'

const { dialogRef, openDialog, openEditDialog } =
  useDialog<InstanceType<typeof PermissionFormDialog>>()

const { queryPermissionList, handleSearch, permissionList } = useReqPermission()

const { isFetching } = queryPermissionList
</script>

<template>
  <div class="page-container">
    <el-row>
      <el-col :span="8"> 123 </el-col>
      <el-col :span="16">222</el-col>
    </el-row>

    <el-card>
      <template #header>
        <div class="flex flex-wrap items-end justify-between gap-5">
          <el-button type="primary" @click="openDialog">
            <template #icon>
              <el-icon-plus />
            </template>
            添加菜单
          </el-button>
        </div>
      </template>
      <PermissionTable v-loading="isFetching" :data="permissionList" @edit="openEditDialog" />

      <PermissionFormDialog ref="dialogRef" :permissionList="permissionList" />
    </el-card>
  </div>
</template>
