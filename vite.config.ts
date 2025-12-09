import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
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
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @use "@/styles/element-override.scss" as override;
          `,
      },
    },
  },
})
