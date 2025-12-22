import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('stylelint').Config} */
export default {
  // 自定义插件
  plugins: [
    'stylelint-order', // 顺序插件
    'stylelint-prettier', // 集成prettier
  ],

  // 继承的配置
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-less',
    'stylelint-config-recommended-vue', // Vue文件配置（安装后添加）
    'stylelint-config-recess-order', // CSS属性顺序
    'stylelint-prettier/recommended', // 与prettier集成
  ],

  // 自定义规则
  rules: {
    // 通用规则
    // 'at-rule-no-unknown': null, // 允许未知的@规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'mixin',
          'include',
          'extend',
          'if',
          'else',
          'for',
          'each',
          'while',
          'function',
          'return',
          'use',
          'forward',
          'at-root',
          'debug',
          'warn',
          'error',
          'content',
        ],
      },
    ],

    // 修复伪元素错误
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          'v-deep',
          'v-global',
          'v-slotted', // Vue特定的
          'input-placeholder',
          'placeholder', // 浏览器前缀
          'webkit-input-placeholder',
          'moz-placeholder',
          'ms-input-placeholder',
        ],
      },
    ],

    // 修复伪类错误 - 重点是这里！
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'local',
          'deep',
          'slotted',
          'export',
          'import',
          'input-placeholder', // 添加这个！注意是伪类，单冒号
          'webkit-input-placeholder',
          '-webkit-input-placeholder',
          'moz-placeholder',
          '-moz-placeholder',
          'ms-input-placeholder',
          '-ms-input-placeholder',
        ],
      },
    ],
    'selector-class-pattern': null, // 允许任意类名选择器
    'no-descending-specificity': null, // 允许特异性降序
    'no-empty-source': null, // 允许一个空的style标签，里面无任何内容
    'scss/selector-no-redundant-nesting-selector': null, // 修复错误 & > .class
    // 'selector-pseudo-class-no-unknown': [
    //   true,
    //   {
    //     ignorePseudoClasses: ['global', 'local'], // 忽略CSS模块的伪类
    //   },
    // ],

    // SCSS相关规则
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': null,

    // 顺序规则 - 属性顺序
    'order/properties-order': [[
      // 布局定位
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'clear',

      // 盒模型
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'overflow',
      'overflow-x',
      'overflow-y',

      // 排版
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'line-height',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',

      // 背景
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-position',
      'background-size',

      // 边框
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-radius',

      // 其他
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'transform',
      'transition',
      'animation',
    ], {
      severity: 'warning', // 设置为警告
    }],

    // 与Prettier一致的规则
    'prettier/prettier': [
      true,
      {
        semi: false,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'none',
        tabWidth: 2,
        vueIndentScriptAndStyle: false,
        endOfLine: 'lf',
      },
    ],
  },

  // 文件忽略配置
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    'node_modules/**',
    'dist/**',
    'build/**',
    '.output/**',
    'public/**',
    '**/coverage/**',
  ],

  // 覆盖特定文件的规则
  overrides: [
    {
      files: ['**/*.vue', '**/*.html'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
}
