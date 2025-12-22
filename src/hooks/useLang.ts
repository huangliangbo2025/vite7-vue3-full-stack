// 多语言设置

import { useStorage } from '@vueuse/core'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'

// 默认语言，简体中文
export const LOCALE_DEFAULT = 'zh-CN'

export type LangType = 'zh-CN' | 'en-US'

export const useLang = () => {
  // 缓存，哪怕刷新也是可以保证当前设置不修改
  const localeLang = useStorage('locale', LOCALE_DEFAULT)

  const { t, locale } = useI18n()

  const changeLang = (lang: LangType) => {
    localeLang.value = lang
  }

  watch(localeLang, (v) => {
    locale.value = v
  }, {
    immediate: true,
  })

  const langOptions = {
    'zh-CN': '简体中文',
    'en-US': 'English',
  } as const

  // 注意，这里引用了element-plus组件的多语言，看个人是否需要使用
  const elementLocaleMap: Record<any, any> = {
    'zh-CN': zhCn,
    'en-US': en,
  }

  const elementLocale = computed(() =>
    elementLocaleMap[locale.value] || elementLocaleMap[LOCALE_DEFAULT]
  )

  return {
    langOptions,
    elementLocale,
    t,
    locale,
    changeLang,
  }
}
