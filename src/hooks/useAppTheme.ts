import { useDark, useToggle } from '@vueuse/core'

export function useAppTheme() {
  // 自动读取系统偏好 + localStorage
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
