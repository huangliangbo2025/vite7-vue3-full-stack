<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-gray-700">
    <div class="text-center">
      <h1 class="text-9xl font-extrabold tracking-widest">404</h1>
      <p class="mt-4 text-xl">抱歉，你访问的页面不存在</p>
      <p class="mt-2 text-gray-500">The page you are looking for was not found.</p>
    </div>

    <div class="mt-8">
      <el-button type="primary" round @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped>
/* 可选：流畅淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div {
  animation: fade-in 0.6s ease;
}
</style>
