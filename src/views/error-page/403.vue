<script setup lang="ts">
import { useRouter } from 'vue-router'
import img_403 from '@/assets/images/403.png'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 text-gray-700">
    <img class="w-60% h-auto" :src="img_403" alt="" />
    <!-- <div class="text-center">
      <h1 class="text-9xl font-extrabold tracking-widest">403</h1>
      <p class="mt-4 text-xl">抱歉，你访问的页面无权限</p>
      <p class="mt-2 text-gray-500">The page you are looking for was not found.</p>
    </div>

    <div class="mt-8">
      <el-button type="primary" round @click="goHome">返回首页</el-button>
    </div> -->
  </div>
</template>
