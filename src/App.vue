<script setup lang="ts">
import { useAuthStore } from '@/stores'

const { token, userInfo } = useAuthStore()

console.log('--token--', token, userInfo)
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
