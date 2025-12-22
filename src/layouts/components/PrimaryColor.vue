<script setup lang="ts">
import { useAppTheme } from '@/hooks/useAppTheme'
import { usePrimaryColor } from '@/hooks/usePrimaryColor'
import { Platform } from '@element-plus/icons-vue'

const { predefinedColors, setPrimary } = usePrimaryColor()

const { isDark } = useAppTheme()

const popoverRef = useTemplateRef('popoverRef')

const onClick = (color: string) => {
  setPrimary(color)
  popoverRef.value?.hide()
}
</script>

<template>
  <el-popover width="154" trigger="click" title="设置主题颜色" ref="popoverRef">
    <template #reference>
      <span class="primary-color-btn" :class="{ 'is-dark': isDark }">
        <el-icon size="16"><Platform /></el-icon>
      </span>
    </template>
    <el-space :wrap="true" size="large">
      <span
        v-for="color in predefinedColors"
        :key="color"
        class="w-20px h-20px block cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="() => onClick(color)"
      ></span>
    </el-space>
  </el-popover>
</template>

<style lang="scss" scoped>
.primary-color-btn {
  display: flex;
  width: 24px;
  height: 24px;
  color: var(--el-color-primary);
  border: 1px solid var(--el-border-color);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.is-dark {
    background: var(--el-color-info-light-7) !important;
  }
}
</style>
