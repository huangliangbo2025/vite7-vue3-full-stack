<script setup lang="ts">
import { useTitle } from '@vueuse/core'

useTitle(import.meta.env.VITE_TITLE)
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
