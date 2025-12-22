<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { usePrimaryColor } from './hooks/usePrimaryColor'
import { useLang } from './hooks'
import { useI18n } from 'vue-i18n'

useTitle(import.meta.env.VITE_TITLE)

const { applyPrimary, primaryColor } = usePrimaryColor()
onMounted(() => applyPrimary(primaryColor.value))

const { elementLocale } = useLang()

const { t } = useI18n()
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <!-- <p>多语言示例 {{ t('menu.dashboard') }}</p> -->
    <RouterView />
  </el-config-provider>
</template>
