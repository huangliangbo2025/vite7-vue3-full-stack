import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetAttributify, presetIcons, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(), // Tailwind 兼容语法
    presetAttributify(), // bg="red-500" 写法
    presetIcons(), // Iconify 图标
  ],
  transformers: [
    transformerVariantGroup(), // 支持 hover:(bg-red text-white)
  ],
})
