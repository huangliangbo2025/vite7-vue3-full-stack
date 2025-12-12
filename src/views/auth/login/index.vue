<script lang="ts" setup>
import PwdLogin from './components/PwdLogin.vue'
import SmsLogin from './components/SmsLogin.vue'
import { ElLink } from 'element-plus'

const tabs = [
  {
    title: '账号密码登录',
    key: 'pwd',
    component: PwdLogin
  },
  {
    title: '验证码登录',
    key: 'code',
    component: SmsLogin
  }
]

const activeTab = ref('pwd')

const activeComponent = computed(() => {
  const tab = tabs.find((t) => t.key === activeTab.value)
  return tab ? tab.component : PwdLogin
})

const getElLinkAttrs = (tabKey: string): InstanceType<typeof ElLink>['$props'] => {
  if (activeTab.value !== tabKey) {
    return {
      type: 'default',
      underline: 'never'
    }
  }
  return {
    type: 'primary',
    underline: 'always'
  }
}

function onTabChange(key: string) {
  activeTab.value = key
}
</script>

<template>
  <div class="login-wrap bg-[rgba(115,103,240,0.1)]">
    <div class="login-content">
      <div class="head mb-30px">
        <p class="text-30px mb-12px text-center font-bold">欢迎回来</p>
      </div>
      <div class="mb-30px gap-30px flex justify-center">
        <el-link
          v-for="tab in tabs"
          :key="tab.key"
          v-bind="getElLinkAttrs(tab.key)"
          @click="onTabChange(tab.key)"
        >
          {{ tab.title }}
        </el-link>
      </div>
      <el-config-provider
        component-size="large"
        :input="{
          size: 'large'
        }"
      >
        <component :is="activeComponent" />
      </el-config-provider>
      <div class="flex justify-end">
        <el-link type="primary">去注册</el-link>
      </div>
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
  min-height: 484px;
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
