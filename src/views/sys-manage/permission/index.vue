<script setup lang="ts">
import { useDialog } from '@/hooks'
import { MenuTree, PermissionFormDialog, PermissionTable } from './components'
import { useReqPermission } from './hooks'
import type { MenuDto } from '@/apis/menu'

const { dialogRef, openDialog, openEditDialog } =
  useDialog<InstanceType<typeof PermissionFormDialog>>()

const { queryPermissionList, permissionList, handleSearch } = useReqPermission()

const { isFetching } = queryPermissionList

const handleMenuSelect = (menuItem: MenuDto) => {
  handleSearch({
    menuId: menuItem.id
  })
}
</script>

<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col :sm="8" :md="8" :lg="6">
        <el-card>
          <MenuTree @select="handleMenuSelect" />
        </el-card>
      </el-col>
      <el-col :sm="16" :md="16" :lg="18">
        <el-card>
          <template #header>
            <div class="flex flex-wrap items-end justify-between gap-5">
              <h3>权限列表</h3>
              <el-button type="primary" @click="openDialog">
                <template #icon>
                  <el-icon-plus />
                </template>
                添加菜单
              </el-button>
            </div>
          </template>
          <PermissionTable v-loading="isFetching" :data="permissionList" @edit="openEditDialog" />
        </el-card>
      </el-col>
    </el-row>

    <PermissionFormDialog ref="dialogRef" :permissionList="permissionList" />
  </div>
</template>
