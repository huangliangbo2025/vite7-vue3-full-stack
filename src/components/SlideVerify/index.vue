<script setup lang="ts">
import Slide from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
import { ElMessage } from 'element-plus'

const emit = defineEmits<{
  success: []
  close: []
}>()

const onSliderSuccess = () => {
  ElMessage.success('验证成功')
  emit('success')
}

// 滑块失败
const onSliderFail = () => {
  ElMessage.error('验证失败，请重试')
}
</script>

<template>
  <el-dialog :model-value="true" @close="$emit('close')" width="360px" center>
    <Slide
      ref="sliderRef"
      :l="42"
      :r="10"
      :w="310"
      :h="155"
      slider-text="向右滑动完成验证"
      @success="onSliderSuccess"
      @fail="onSliderFail"
    />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
