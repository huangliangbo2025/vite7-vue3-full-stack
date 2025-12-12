import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = useStorage<any>('auth-user-info', {}, localStorage)

  const token = computed<string>(() => userInfo.value?.token || '')

  function setUserInfo(info: any) {
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
