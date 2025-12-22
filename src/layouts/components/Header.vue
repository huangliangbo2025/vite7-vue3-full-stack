<script setup lang="ts">
import { Dish, Expand, Platform } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'
import { Brush, MagicStick } from '@element-plus/icons-vue'
import PrimaryColor from './PrimaryColor.vue'
import SkinToggle from './SkinToggle.vue'

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
</script>

<template>
  <div class="flex h-full items-center justify-between px-5">
    <el-button size="small" type="text" class="!p-0">
      <el-icon class="text-info-light-3 text-5 cursor-pointer">
        <Expand />
      </el-icon>
    </el-button>
    <div>
      <el-space :size="20">
        <!-- 设置主题颜色 -->
        <PrimaryColor />
        <!-- 暗黑/浅色切换 -->
        <SkinToggle />
        <UserInfo />
      </el-space>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
