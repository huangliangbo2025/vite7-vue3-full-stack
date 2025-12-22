<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useAppTheme } from '@/hooks/useAppTheme'

withDefaults(
  defineProps<{
    type?: 'select' | 'switch'
  }>(),
  {
    type: 'switch'
  }
)
const { isDark, toggleDark } = useAppTheme()
</script>

<template>
  <div
    class="theme-toggle h-22px w-40px relative block cursor-pointer rounded-full border transition-colors duration-300"
    :class="{
      'is-dark': isDark
    }"
    @click="() => toggleDark()"
  >
    <span class="toggle-thumb">
      <el-icon v-if="isDark" class="text-yellow-400">
        <Moon />
      </el-icon>
      <el-icon v-else class="text-gray-700">
        <Sunny />
      </el-icon>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.theme-toggle {
  background-color: var(--el-color-info-light-9);
  border: 1px solid var(--el-border-color);

  &.is-dark {
    background-color: var(--el-color-info-light-7);
  }

  .toggle-thumb {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    display: flex;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s ease-in-out !important;
    justify-content: center;
    align-items: center;

    .el-icon {
      display: block;
      font-size: 14px;
    }
  }

  &.is-dark .toggle-thumb {
    background: #000;
    transform: translateY(-50%) translateX(18px);
  }
}
</style>
