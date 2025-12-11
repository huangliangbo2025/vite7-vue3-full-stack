<script setup lang="ts">
import type { CaptchaInstance, CaptchaMode, CaptchaProps } from './type'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<CaptchaProps>(), {
  length: 4,
  mode: 'mixed',
  width: 120,
  height: 40,
  fontSize: 24,
  bgColor: '#f5f5f5',
  textColors: () => ['#333', '#666', '#999', '#000', '#c0392b', '#e67e22', '#27ae60', '#2980b9'],
  lineCount: 3,
  dotCount: 30,
  showBorder: true,
  borderColor: '#ddd'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentCode = ref<string>('')

// 生成随机字符
const getRandomChar = (mode: CaptchaMode): string => {
  const numberChars = '0123456789'
  const letterChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const mixedChars = numberChars + letterChars

  let chars = numberChars
  if (mode === 'letter') chars = letterChars
  if (mode === 'mixed') chars = mixedChars

  return chars[Math.floor(Math.random() * chars.length)]
}

// 生成随机颜色
const getRandomColor = (): string => {
  const colors = props.textColors
  return colors[Math.floor(Math.random() * colors.length)]
}

// 绘制验证码
const drawCaptcha = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, props.width, props.height)

  // 绘制背景
  ctx.fillStyle = props.bgColor
  ctx.fillRect(0, 0, props.width, props.height)

  // 绘制边框
  if (props.showBorder) {
    ctx.strokeStyle = props.borderColor
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, props.width, props.height)
  }

  // 生成验证码
  let code = ''
  for (let i = 0; i < props.length; i++) {
    code += getRandomChar(props.mode)
  }
  currentCode.value = code

  // 绘制文字（随机旋转、位置）
  const charWidth = props.width / props.length
  for (let i = 0; i < props.length; i++) {
    const char = code[i]
    ctx.fillStyle = getRandomColor()
    ctx.font = `${props.fontSize}px Arial, sans-serif`
    ctx.textBaseline = 'middle'

    // 随机旋转角度（-30° 到 30°）
    const rotateAngle = ((Math.random() * 60 - 30) * Math.PI) / 180
    // 随机位置偏移
    const x = i * charWidth + charWidth / 2 + (Math.random() * 10 - 5)
    const y = props.height / 2 + (Math.random() * 10 - 5)

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotateAngle)
    ctx.fillText(char, -props.fontSize / 2, 0)
    ctx.restore()
  }

  // 绘制干扰线
  for (let i = 0; i < props.lineCount; i++) {
    ctx.strokeStyle = getRandomColor()
    ctx.lineWidth = Math.random() * 1.5 + 0.5
    ctx.beginPath()
    ctx.moveTo(Math.random() * props.width, Math.random() * props.height)
    ctx.lineTo(Math.random() * props.width, Math.random() * props.height)
    ctx.stroke()
  }

  // 绘制干扰点
  for (let i = 0; i < props.dotCount; i++) {
    ctx.fillStyle = getRandomColor()
    const x = Math.random() * props.width
    const y = Math.random() * props.height
    const radius = Math.random() * 1.5 + 0.5
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

// 刷新验证码
const refresh = () => {
  drawCaptcha()
}

// 获取当前验证码
const getCode = (): string => {
  return currentCode.value
}

// 验证输入
const validate = (input: string): boolean => {
  return input.toLowerCase() === currentCode.value.toLowerCase()
}

// 初始化绘制
onMounted(() => {
  drawCaptcha()
})

// 监听props变化，重新绘制
watch([() => props.length, () => props.mode, () => props.width, () => props.height], () => {
  drawCaptcha()
})

// 计算画布样式
const canvasStyle = computed(() => ({
  cursor: 'pointer',
  display: 'inline-block',
  verticalAlign: 'middle'
}))

// 暴露方法给父组件
defineExpose<CaptchaInstance>({
  getCode,
  refresh,
  validate
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    :style="canvasStyle"
    tabindex="0"
    role="button"
    aria-label="点击刷新验证码"
    @click="refresh"
  />
</template>
