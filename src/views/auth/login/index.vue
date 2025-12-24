<script lang="ts" setup>
import PwdLogin from './components/PwdLogin.vue'
import SmsLogin from './components/SmsLogin.vue'
import { ElLink } from 'element-plus'

const router = useRouter()

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
  <div class="login-wrap">
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
        <el-link class="!text-14px" type="primary" @click="router.push('/auth/register')"
          >去注册</el-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh);
  overflow: hidden;
  background: var(--el-color-primary-light-9);
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 406px;
  min-height: 484px;
  padding: 36px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px #999;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}

.login-form-box {
  $height: 48px;

  position: relative;
  z-index: 111;

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

.dark {
  .login-wrap {
    background: none;
  }

  .login-content {
    background-color: var(--el-bg-color-overlay);
    box-shadow: 0 0 6px var(--el-bg-color-overlay);
  }
}
</style>
