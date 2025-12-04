<script setup lang="ts">
const router = useRouter()

const goHome = () => router.push('/')
const goLogin = () => router.push('/login')
const goDashboard = () => router.push('/dashboard')
</script>

<template>
  <div>
    <div>
      <el-button @click="goHome">首页</el-button>
      <el-button @click="goLogin">登录页</el-button>
      <el-button @click="goDashboard">控制面板</el-button>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped></style>
