import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import fs from 'node:fs'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

// ⭐ 加载 auto-import 的 JSON（旧格式包含 "globals"）
const autoImportJson = JSON.parse(
  fs.readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8'),
)

// ⭐ 转换成适配 Flat Config 的格式
const autoImportEslint = {
  languageOptions: {
    // 避免console等esLint检测异常
    globals: {
      // 浏览器
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
      setTimeout: 'readonly',
      setInterval: 'readonly',

      // Node
      process: 'readonly',
      Buffer: 'readonly',
      URL: 'readonly',
      ...autoImportJson.globals,
      ...globals.browser,
    },
  },
}

export default [
  {
    // 忽略
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'pnpm-lock.yaml',
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
        ecmaFeatures: {
          jsx: true, // ⬅️ 必须
        },
      },
    },
    plugins: {
      vue,
    },
    rules: {
      'linebreak-style': ['error', 'unix'], // unix = LF
      ...vue.configs['flat/recommended'].rules,
    },
  },

  autoImportEslint,

  // 禁用所有与 Prettier 冲突的规则
  eslintConfigPrettier,

  // Prettier 检查（让 Prettier 负责格式）
  {
    files: ['**/*.{ts,tsx,js,jsx,vue}', 'mock/**/*.ts'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]
