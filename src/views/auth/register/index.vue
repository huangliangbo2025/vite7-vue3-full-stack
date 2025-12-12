<script lang="ts" setup>
import FormRegister from './components/FormRegister.vue'

const router = useRouter()
</script>

<template>
  <div class="register-wrap bg-[rgba(115,103,240,0.1)]">
    <div class="register-content">
      <div class="head mb-30px">
        <p class="text-30px mb-12px text-center font-bold">注册</p>
      </div>
      <el-config-provider
        component-size="large"
        :input="{
          size: 'large'
        }"
      >
        <form-register />
      </el-config-provider>
      <div class="flex justify-end">
        <span class="text-14px">已有账户，</span>
        <el-link class="!text-14px" type="primary" @click="() => router.push('/auth/login')">
          去登录
        </el-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.register-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(100vh);
  background-size: 100% auto !important;
}

.register-content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 406px;
  min-height: 484px;
  padding: 36px;
  border-radius: 8px;
  background: #fff;
  background-size: cover;
  box-shadow: 0 0 6px #999;
  transform: translate(-50%, -50%);
}

.register-form-box {
  $height: 48px;

  position: relative;
  z-index: 111;
  background-color: #fff;

  .register-btn {
    width: 100%;
    background-color: var(--el-color-primary);
  }
}
</style>
