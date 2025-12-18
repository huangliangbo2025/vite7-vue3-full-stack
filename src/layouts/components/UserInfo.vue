<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { removeRoutes } from '@/router'
import type { PopoverInstance } from 'element-plus'

const router = useRouter()

const avatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

const { clearUserInfo } = useAuthStore()
const { token, userInfo } = storeToRefs(useAuthStore())
const isLogin = computed(() => !!token.value)
const buttonRef = ref()
const popoverRef = useTemplateRef('popoverRef')
const onClickOutside = () => {
  popoverRef.value?.hide()
}

const loginOut = () => {
  clearUserInfo()
  removeRoutes()
  router.push('/auth/login')
}
</script>

<template>
  <el-space v-if="!isLogin">
    <el-button outline-blue> 注册 </el-button>
    <el-button type="primary" @click="() => router.push('/login')"> 登录 </el-button>
  </el-space>

  <template v-else>
    <div
      ref="buttonRef"
      v-click-outside="onClickOutside"
      class="flex-center gap-3px flex cursor-pointer items-center"
    >
      <el-avatar class="h-32px w-32px" :src="avatar" />
    </div>

    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
      width="240"
    >
      <el-row align="middle">
        <el-col :span="24">
          <div class="flex items-center gap-3">
            <el-avatar class="h-36px w-36px" :src="avatar" />
            <div class="text-12px color-[var(--el-text-color-regular)] leading-18px">
              <p>
                {{ userInfo?.username }}
              </p>
              <p>超级管理员</p>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-divider class="my-3" />
        </el-col>
        <el-col :span="24">
          <el-button type="danger" class="w-full" @click="loginOut"> 退出登录 </el-button>
        </el-col>
      </el-row>
    </el-popover>
  </template>
</template>
