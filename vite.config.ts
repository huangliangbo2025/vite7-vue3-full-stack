import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { envParse } from 'vite-plugin-env-parse'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  console.log('isDev', isDev)

  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      envParse({
        dtsPath: 'typings/env.d.ts',
      }),
      AutoImport({
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        })],
        dts: 'typings/auto-imports.d.ts',
        vueTemplate: true,
        eslintrc: {
          enabled: true, // ⭐ 自动生成 .eslintrc-auto-import.json
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'typings/components.d.ts',
        resolvers: [ElementPlusResolver({
          importStyle: 'sass', // 自动引入修改主题色添加这一行，使用预处理样式
        })],
      }),
      ElementPlus({ // 新增：配置 Element Plus 样式
        useSource: true, // 使用源代码样式，避免样式缺失
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__',
      }),
      VueDevTools(),
      viteMockServe({
        mockPath: 'mock', // mock 文件夹
        enable: isDev, // 启用 mock
        watchFiles: true, // mock 热更新
        logger: true, // 日志打印
      }),
      VueI18nPlugin({
        // 语言文件路径
        include: path.resolve(__dirname, 'src/locales/*/index.ts'),

        // 默认开启 Composition API
        runtimeOnly: false,
        compositionOnly: true,
        fullInstall: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/styles/element-override.scss" as override;
              @use "@/styles/variable.scss" as *;
            `,
        },
      },
    },
  }
})
