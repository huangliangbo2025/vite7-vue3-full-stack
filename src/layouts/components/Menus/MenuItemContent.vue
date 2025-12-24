<!-- MenuItemContent.vue -->
<script setup lang="ts">
import { isExternal } from '@/utils/is'
import type { MenuDto } from '@/apis/menu'
import { useCollapseInject } from '@/layouts/helper/menuCollapse'

interface Props {
  item: MenuDto
}

defineProps<Props>()

const { isCollapse } = useCollapseInject()

const handleClick = (e: Event, path: string) => {
  if (isExternal(path)) {
    e.stopPropagation()
    window.open(path, '_blank')
  }
}
</script>

<template>
  <div
    class="menu-item-content"
    :class="{ 'is-collapse': isCollapse }"
    @click="(e: Event) => handleClick(e, item.path)"
  >
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
  width: 100%;
  height: 40px;
  line-height: 1.5;
  border-radius: 20px;
  align-items: center;
}

.menu-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  font-size: 24px;
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

<style lang=""></style>
