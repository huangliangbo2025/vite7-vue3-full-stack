<script setup lang="ts">
import { useDialog } from '@/hooks'
import { FilterMenuSearch, MenuFormDialog, MenuTable } from './components'
import { useReqMenu } from './hooks'

const { dialogRef, openDialog, openEditDialog } = useDialog<InstanceType<typeof MenuFormDialog>>()

const { queryMenuList, handleSearch, menuList } = useReqMenu()

const { isFetching } = queryMenuList
</script>

<template>
  <div class="page-container">
    <div class="mb-5">
      <p class="text-info">您可以进入角色权限界面，对菜单全新进行分配</p>
      <p class="text-[var(--el-color-danger)]">
        注意，你应该看到我左侧菜单栏有一些灰色不能点击的菜单，这往往当作一个标题使用，你在添加这些标题时，可以不写path，只需填写标题即可
      </p>
    </div>
    <el-card>
      <template #header>
        <div class="flex flex-wrap items-end justify-between gap-5">
          <FilterMenuSearch @search="handleSearch" />
          <el-button type="primary" @click="openDialog">
            <template #icon>
              <el-icon-plus />
            </template>
            添加菜单
          </el-button>
        </div>
      </template>
      <MenuTable v-loading="isFetching" :data="menuList" @edit="openEditDialog" />

      <MenuFormDialog ref="dialogRef" :menuList="menuList" />
    </el-card>
  </div>
</template>
