<script setup lang="ts">
import type { ButtonProps } from 'element-plus'
import { defineEmits, defineProps, onUnmounted, ref } from 'vue'
import { SlideVerifyService } from '../SlideVerify/service'

// 定义组件属性类型
interface Props extends Partial<ButtonProps> {
  /** 按钮初始显示文本 */
  initialText?: string
  /** 倒计时秒数 */
  countdownSeconds?: number
  /* 是否禁用 */
  isDisabled?: boolean
}

// 定义组件事件类型
interface Emits {
  /** 点击发送按钮时触发，回调参数为开始倒计时的函数 */
  (e: 'send', startCountdown: () => void): void
  /** 倒计时结束时触发 */
  (e: 'countdownEnd'): void
}

// 组件属性
const { initialText = '发送验证码', countdownSeconds = 60, ...props } = defineProps<Props>()

// 组件事件
const emit = defineEmits<Emits>()

// 状态管理
const isCounting = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const countdown = ref<number>(countdownSeconds)
let timer: NodeJS.Timeout | null = null

/**
 * 处理按钮点击事件
 */
const handleClick = async () => {
  const isPass = await SlideVerifyService.open()
  if (!isPass) {
    return
  }

  // 触发发送事件，传递开始倒计时的方法给父组件
  // emit('send', startCountdown)
  startCountdown()
}

/**
 * 开始倒计时逻辑
 */
const startCountdown = (): void => {
  // 标记为加载中状态
  isLoading.value = true

  // 模拟发送请求延迟，实际项目中可在接口调用成功后再执行
  setTimeout(() => {
    isLoading.value = false
    isCounting.value = true
    countdown.value = countdownSeconds

    // 清除可能存在的定时器
    if (timer) clearInterval(timer)

    // 设置定时器
    timer = setInterval(() => {
      countdown.value--

      if (countdown.value <= 0) {
        endCountdown()
      }
    }, 1000)
  }, 2000)
}

/**
 * 结束倒计时逻辑
 */
const endCountdown = (): void => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isCounting.value = false
  countdown.value = countdownSeconds
  emit('countdownEnd')
}

// 组件卸载时清除定时器，防止内存泄漏
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 暴露方法给父组件
defineExpose({
  startCountdown,
  endCountdown,
  /** 重置按钮状态 */
  reset: (): void => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isCounting.value = false
    isLoading.value = false
    countdown.value = countdownSeconds
  }
})
</script>

<template>
  <el-button
    v-bind="props"
    :disabled="isDisabled || isCounting"
    :loading="isLoading"
    link
    class="countdown-button !p-0"
    :class="{
      counting: isCounting
    }"
    @click="handleClick"
  >
    <template v-if="isCounting"> {{ countdown }}s后可再次获取 </template>
    <template v-else-if="isLoading"> 发送中... </template>
    <template v-else>
      {{ initialText }}
    </template>
  </el-button>
</template>

<style scoped>
.countdown-button {
  transition: all 0.3s ease;
}

.counting {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
