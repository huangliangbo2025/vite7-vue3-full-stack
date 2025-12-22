<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { RouteView, Menus, Header } from './components'
import { storeToRefs } from 'pinia'
import { sortMenuTree } from '@/utils/menu'
import { useAppTheme } from '@/hooks/useAppTheme'

const { isDark } = useAppTheme()

const { menus } = storeToRefs(useAuthStore())

const menuData = computed(() => sortMenuTree(menus.value))
</script>

<template>
  <div class="app-basic-layout h-full w-full">
    <el-container class="layout-container h-full w-full">
      <el-aside class="layout-aside">
        <Menus :menuData="menuData" :collapse="false" />
      </el-aside>
      <el-container class="layout-main">
        <el-header class="layout-header !p-0px">
          <Header />
        </el-header>
        <el-main class="overflow-hidden !p-0">
          <div id="view-container" class="h-full w-full">
            <RouteView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  height: var(--top-bar-height);
  background: #fff;
}

.layout-aside {
  position: relative;
  z-index: 1;
  width: var(--sidebar-width);
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 0 6px var(--el-border-color);
}

.dark {
  .layout-header,
  .layout-aside {
    background-color: var(--el-bg-color-overlay);
  }
}
</style>
