<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'
import PrimaryColor from './PrimaryColor.vue'
import SkinToggle from './SkinToggle.vue'
import Lang from './Lang.vue'
import { useCollapseInject } from '../helper/menuCollapse'

const { collapseToggle, isCollapse } = useCollapseInject()
</script>

<template>
  <div class="flex h-full items-center justify-between px-5">
    <el-button size="small" type="text" class="!p-0" @click="collapseToggle">
      <el-icon
        class="text-info-light-3 text-5 relative rotate-180 cursor-pointer"
        :class="{ '!rotate-360': isCollapse }"
      >
        <Expand />
      </el-icon>
    </el-button>
    <div>
      <el-space :size="20">
        <!-- 设置主题颜色 -->
        <PrimaryColor />

        <el-divider :direction="'vertical'" class="!m-0" />

        <!-- 预约切换 -->
        <Lang />

        <el-divider :direction="'vertical'" class="!m-0" />

        <!-- 暗黑/浅色切换 -->
        <SkinToggle />

        <el-divider :direction="'vertical'" class="!m-0" />

        <UserInfo />
      </el-space>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
