import { defineStore } from 'pinia'

import type { UserInfo } from '@/apis/auth/type'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = useStorage('auth-user-info', {} as UserInfo, localStorage)

  const token = computed<string>(() => userInfo.value?.token || '')

  function setUserInfo(info: UserInfo) {
    console.log('Setting user info:', info)
    userInfo.value = info
  }

  function clearUserInfo() {
    userInfo.value = null
  }

  return {
    userInfo,
    token,
    setUserInfo,
    clearUserInfo,
  }
})
