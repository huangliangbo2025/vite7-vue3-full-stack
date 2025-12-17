<!-- MenuItemContent.vue -->
<script setup lang="ts">
import { isExternal } from '@/utils/is'
import type { MenuDto } from '@/apis/menu'

interface Props {
  item: MenuDto
}

defineProps<Props>()
</script>

<template>
  <div class="menu-item-content">
    <span
      v-if="!item.disabled"
      class="menu-icon text-center"
      :class="{
        'text-10px!': !item.icon
      }"
    >
      <svg-icon :name="item.icon || 'menu-icon-default'" />
    </span>
    <span class="menu-title">{{ item.title }}</span>
    <i v-if="isExternal(item.path)" class="external-link-icon el-icon-link" />
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
  display: block;
  width: 40px;
  text-align: center;
  font-size: 24px;
  flex-shrink: 0;
  color: currentcolor;
  position: relative;
  top: -2px;
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
