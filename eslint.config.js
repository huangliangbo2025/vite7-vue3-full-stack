import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default [
  {
    // 忽略
    ignores: [
      'dist',
      'node_modules',
      '**/*.d.ts',
      'coverage',
      'pnpm-lock.yaml',
      'vite.config.*',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  // Vue for Flat Config
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['flat/recommended'].rules,
    },
  },

  // 禁用所有与 Prettier 冲突的规则
  eslintConfigPrettier,

  // Prettier 检查（让 Prettier 负责格式）
  {
    files: ['**/*.{ts,tsx,js,jsx,vue}'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]
