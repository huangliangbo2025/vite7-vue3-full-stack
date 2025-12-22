<!-- MenuItemContent.vue -->
<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/is'

interface Props {
  item: RouteRecordRaw
}

defineProps<Props>()
</script>

<template>
  <div class="menu-item-content">
    <span
      v-if="!item.meta?.disabled"
      class="menu-icon text-center"
      :class="{
        'text-10px!': !item.meta?.icon
      }"
    >
      <svg-icon :name="item.meta?.icon || 'menu-icon-default'" />
    </span>
    <span class="menu-title">{{ item.meta?.title }}</span>
    <i
      v-if="isExternal((item.redirect as string) || item.path)"
      class="external-link-icon el-icon-link"
    />
  </div>
</template>

<style scoped>
.menu-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: normal;
}

.menu-icon {
  position: relative;
  top: -2px;
  display: block;
  width: 40px;
  font-size: 24px;
  text-align: center;
  color: currentcolor;
  flex-shrink: 0;
}

.menu-title {
  display: block;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.external-link-icon {
  display: block;
  margin-left: 4px;
  font-size: 12px;
  flex-shrink: 0;
}
</style>
