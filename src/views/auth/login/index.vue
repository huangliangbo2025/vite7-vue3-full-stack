<script lang="ts" setup>
import PwdLogin from './PwdLogin.vue'
</script>

<template>
  <div class="login-wrap bg-[rgba(115,103,240,0.1)]">
    <div class="login-content">
      <div class="head mb-30px">
        <p class="text-30px mb-12px text-center font-bold">欢迎回来</p>
      </div>
      <el-config-provider
        component-size="large"
        :input="{
          size: 'large'
        }"
      >
        <component :is="PwdLogin" />
      </el-config-provider>
    </div>
  </div>
</template>

<style lang="scss">
.login-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh);
  overflow: hidden;
  background-size: 100% auto !important;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 406px;
  padding: 36px;
  background: #fff;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 0 6px #999;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}

.login-form-box {
  $height: 48px;

  position: relative;
  z-index: 111;
  background-color: #fff;

  .el-form-item {
    margin-bottom: 30px !important;
  }

  .el-input__wrapper {
    height: $height;
    padding-top: 4px;
    padding-bottom: 4px;
    overflow: hidden;
    line-height: 38px;
    border-radius: 8px;
  }

  .identify {
    position: absolute;
    top: 1px;
    right: 2px;
    bottom: 1px;
    z-index: 1;
    overflow: hidden;
    line-height: 46px;
    border-radius: 8px;

    img {
      vertical-align: middle;
    }
  }

  .login-btn {
    width: 100%;
    height: $height !important;
    background-color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
}
</style>
