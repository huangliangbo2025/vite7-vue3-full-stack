<script setup lang="ts">
import { generateMenuData } from '@/utils'
import { RouteView, Menus } from './components'
import { permissionsRoutes } from '@/router'

const menuData = computed(() => generateMenuData(permissionsRoutes))
</script>

<template>
  <div class="app-basic-layout h-full w-full">
    <el-container class="layout-container h-full w-full">
      <el-aside class="layout-aside">
        <Menus :menuData="menuData" :collapse="false" />
      </el-aside>
      <el-container class="layout-main">
        <el-header class="layout-header !p-0px"> Header </el-header>
        <el-main class="overflow-hidden bg-[var(--el-bg-color-page)] p-0!">
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
  height: $top-bar-height;
}

.layout-aside {
  width: $sidebar-width;
  height: 100%;
  padding: 12px 12px;
  box-shadow: 0px 0px 6px var(--el-border-color);
  position: relative;
  z-index: 1;
  overflow-y: auto;
}
</style>
