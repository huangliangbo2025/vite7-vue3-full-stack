<script setup lang="ts">
import { useAppTheme } from '@/hooks'
import { Logo, Lang, PrimaryColor, RouteView, SkinToggle } from './components'

const { isDark } = useAppTheme()
</script>

<template>
  <div>
    <div
      class="right top fixed z-999 flex h-[var(--top-bar-height)] w-full items-center justify-between px-5"
    >
      <div>
        <Logo />
      </div>
      <div>
        <el-space :size="20">
          <!-- 设置主题颜色 -->
          <PrimaryColor />

          <el-divider :direction="'vertical'" class="!m-0" />

          <!-- 预约切换 -->
          <Lang>
            <span class="text-primary cursor-pointer" :class="{ 'text-primary-light-7': isDark }">
              <svg-icon size="20" name="global"></svg-icon>
            </span>
          </Lang>

          <el-divider :direction="'vertical'" class="!m-0" />

          <!-- 黑白切换 -->
          <SkinToggle />
        </el-space>
      </div>
    </div>
    <RouteView />
  </div>
</template>
