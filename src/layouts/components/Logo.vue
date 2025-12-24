<script setup lang="ts">
import { useCollapseInject } from '../helper/menuCollapse'

const { isCollapse } = useCollapseInject()
</script>

<template>
  <div
    class="text-primary flex gap-3"
    :class="{ 'justify-center': isCollapse, 'w-full': isCollapse }"
  >
    <svg-icon name="logo" :size="24" />
    <span v-if="!isCollapse">平台管理系统</span>
  </div>
</template>
