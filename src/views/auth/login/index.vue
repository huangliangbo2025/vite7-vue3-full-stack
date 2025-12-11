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
  overflow: hidden;
  width: 100%;
  height: calc(100vh);
  background-size: 100% auto !important;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 406px;
  padding: 36px;
  border-radius: 8px;
  background: #fff;
  background-size: cover;
  box-shadow: 0 0 6px #999;
  transform: translate(-50%, -50%);
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
    border-radius: 8px;
    line-height: 38px;
    overflow: hidden;
  }

  .identify {
    position: absolute;
    top: 1px;
    right: 2px;
    bottom: 1px;
    z-index: 1;
    overflow: hidden;
    border-radius: 8px;
    line-height: 46px;

    img {
      vertical-align: middle;
    }
  }

  .login-btn {
    width: 100%;
    height: $height !important;
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary);
  }
}
</style>
