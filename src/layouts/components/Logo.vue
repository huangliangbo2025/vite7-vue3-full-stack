<script setup lang="ts">
import { useCollapseInject } from '../helper/menuCollapse'
import { useAppTheme } from '@/hooks'

const { isCollapse } = useCollapseInject()

const { isDark } = useAppTheme()
</script>

<template>
  <div
    class="text-primary flex gap-3"
    :class="{
      'justify-center': isCollapse,
      'w-full': isCollapse,
      'text-primary-light-7': isDark
    }"
  >
    <svg-icon name="logo" :size="24" />
    <span v-if="!isCollapse">平台管理系统</span>
  </div>
</template>
