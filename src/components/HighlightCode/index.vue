<template>
  <!-- 使用highlightjs组件来高亮代码 -->
  <highlightjs
    :code="code"
    :language="language"
    :highlight-only="highlightOnly"
    :class="themeClass"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  language?: string
  highlightOnly?: boolean
  theme?: 'light' | 'dark'
}>()

// 默认值
const theme = computed(() => props.theme || 'light') // 默认主题为 'light'

// 动态计算主题样式类
const themeClass = computed(() => (theme.value === 'dark' ? 'highlight-dark' : 'highlight-light'))
</script>

<style scoped>
/* 浅色主题 */
pre.highlight-light {
  background-color: #fafafa;
  color: #333;
  padding: 15px;
  border-radius: 6px;
  overflow: auto;
}

/* 深色主题 */
pre.highlight-dark {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 6px;
  overflow: auto;
}
</style>
