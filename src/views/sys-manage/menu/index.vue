<script setup lang="ts">
import { useDialog } from '@/hooks'
import { FilterMenuSearch, MenuFormDialog, MenuTable } from './components'
import { useReqMenu } from './hooks'

const { openDialog, openEditDialog } = useDialog()

const { queryMenuList, handleSeach, pagination, menuList, total } = useReqMenu()

const { isFetching } = queryMenuList
</script>

<template>
  <div class="page-container">
    <div class="mb-5">
      <p class="text-info">您可以进入角色权限界面，对菜单全新进行分配</p>
      <p class="text-info">你可以在菜单下添加按钮，需要前端配合才能做到按钮的权限限制</p>
      <p class="text-[var(--el-color-danger)]">
        注意，你应该看到我左侧菜单栏有一些灰色不能点击的菜单，这往往当作一个标题使用，你在添加这些标题时，可以不写path，只需填写标题即可
      </p>
    </div>
    <el-card>
      <template #header>
        <div class="flex flex-wrap items-end justify-between gap-5">
          <FilterMenuSearch @search="handleSeach" />
          <el-button type="primary" @click="openDialog">
            <template #icon>
              <el-icon-plus />
            </template>
            添加菜单
          </el-button>
        </div>
      </template>
      <MenuTable v-loading="isFetching" :data="menuList" @edit="openEditDialog" />
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
      <MenuFormDialog ref="dialogRef" />
    </el-card>
  </div>
</template>
