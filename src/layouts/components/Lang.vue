<script setup lang="ts">
import { useLang, type LangType } from '@/hooks'
import { ArrowDownBold } from '@element-plus/icons-vue'

const popoverRef = useTemplateRef('popoverRef')

const { langOptions, changeLang } = useLang()

const onClick = (key: LangType) => {
  popoverRef.value?.hide()
  changeLang(key)
}
</script>

<template>
  <el-popover width="154" trigger="click" ref="popoverRef">
    <template #reference>
      <span class="gap-6px flex cursor-pointer items-center">
        <svg-icon name="lang"></svg-icon>
        <el-icon size="10"><ArrowDownBold /></el-icon>
      </span>
    </template>
    <ul class="gap-12px flex flex-col">
      <li v-for="(l, key) in langOptions" :key="key">
        <el-button text class="w-full" @click="onClick(key)">{{ l }}</el-button>
      </li>
    </ul>
  </el-popover>
</template>

<style lang="scss" scoped></style>
