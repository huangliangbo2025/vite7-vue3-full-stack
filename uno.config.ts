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

  shortcuts: [
    ['page-container', 'p-5'],
  ],

  // safelist: 'prose prose-sm m-auto text-left'.split(' '),
  // 预设主演颜色的指令
  theme: {
    colors: {
      // 定义主题颜色变量（实际通过CSS变量控制）
      'brand': {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
        DEFAULT: '#942192', // class="bg-brand"
      },
    },
  },

  rules: [
    // START  ============ element主题规则预设 text-primary-light-3 => color: var(--el-color-primary-light-3)
    [
      /^text-(primary|success|warning|danger|error|info)/,
      ([, type]) => ({
        color: `var(--el-color-${type})`,
      }),
    ],
    [
      /^bg-(primary|success|warning|danger|error|info)/,
      ([, type]) => ({
        'background-color': `var(--el-color-${type})`,
      }),
    ],
    [
      /^text-(primary|success|warning|danger|error|info)-light-(\d+)$/,
      ([, type, num]) => ({
        color: `var(--el-color-${type}-light-${num})`,
      }),
    ],
    [
      /^bg-(primary|success|warning|danger|error|info)-light-(\d+)$/,
      ([, type, num]) => ({
        'background-color': `var(--el-color-${type}-light-${num})`,
      }),
    ],
    [
      /^text-(primary|success|warning|danger|error|info-dark)/,
      ([, type]) => ({
        color: `var(--el-color-${type}-dark-2)`,
      }),
    ],
    // END ==========================================
    // 多文本溢出出现省略号 text-ellipsis-1 => '-webkit-line-clamp': 1,
    [
      /^text-ellipsis-(\d+)$/,
      ([, lineNum]) => ({
        'display': '-webkit-box',
        '-webkit-line-clamp': lineNum, // 提取行数参数
        '-webkit-box-orient': 'vertical',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      }),
      // 规则优先级（可选，确保覆盖默认样式）
      { layer: 'utilities', priority: 10 },
    ],
  ],
})
