<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'

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
      <UserInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
