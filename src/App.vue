<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { usePrimaryColor } from './hooks/usePrimaryColor'

useTitle(import.meta.env.VITE_TITLE)

const { applyPrimary, primaryColor } = usePrimaryColor()
onMounted(() => applyPrimary(primaryColor.value))
</script>

<template>
  <RouterView />
</template>
