<script setup lang="ts">
import { RouteView } from './components'
</script>

<template>
  <div class="app-basic-layout h-full w-full">
    <el-container class="layout-container h-full w-full">
      <el-aside class="layout-aside relative z-1"> Aside </el-aside>
      <el-container class="layout-main">
        <el-header class="layout-header !p-0px"> Header </el-header>

        <el-main class="overflow-hidden bg-[var(--el-bg-color-page)] p-0!">
          <div id="view-container" class="h-full w-full overflow-auto">
            <RouteView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
