<script setup lang="ts">
import { Close, CopyDocument, Download, FullScreen } from '@element-plus/icons-vue'
import { ErrorInfo } from './error-log.mock'
import { useClipboard, useFullscreen } from '@vueuse/core'
import { downloadTextFile } from '@/utils/download'
import HighlightCode from '@/components/HighlightCode/index.vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

interface Props {
  apiUrl?: string
  content: string
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  content: ErrorInfo
})

const { isFullscreen, toggle } = useFullscreen()

const { copied, copy } = useClipboard()
watch(copied, (isTrue) => {
  if (isTrue) ElMessage.success('复制成功')
})

const onDownload = () => {
  const prefix = props.apiUrl || 'error-log'
  const time = new Date().toISOString().replace(/[:.]/g, '-')

  const logName = `${prefix}-${time}.txt`

  downloadTextFile(props.content, logName)
}

const onClose = () => {
  if (isFullscreen.value) toggle()
  emit('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    width="80%"
    class="my-dialog"
    :fullscreen="isFullscreen"
    :show-close="false"
    :model-value="modelValue"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3>日志</h3>
        <el-space>
          <el-icon class="cursor-pointer" @click="toggle"><FullScreen /></el-icon>
          <el-icon class="cursor-pointer" @click="onDownload"><Download /></el-icon>
          <el-icon class="cursor-pointer" @click="() => copy(content)"><CopyDocument /></el-icon>
          <el-icon class="cursor-pointer" @click="onClose"><Close /></el-icon>
        </el-space>
      </div>
    </template>
    <div :class="`${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(80vh)]'}`">
      <HighlightCode :code="ErrorInfo" />
    </div>
  </el-dialog>
</template>
<style lang="scss">
.my-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
}
</style>
