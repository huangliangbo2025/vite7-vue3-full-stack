import type { App } from 'vue'
import type { Directive } from 'vue'

// 🔴 核心：自动导入 directives 目录下所有 .ts 文件（排除 index.ts）
// import.meta.glob 是 Vite 特性，webpack 可替换为 require.context
const directivesModules = import.meta.glob('./[^index]*.ts', {
  eager: true, // 同步导入（非懒加载）
  import: 'default', // 导入每个文件的 default 导出
})

// 指令名称映射：文件名 -> 指令名（如 clickOutside.ts → click-outside）
const getDirectiveName = (fileName: string): string => {
  // 提取文件名（去掉路径和后缀），并转为 kebab-case（短横线命名）
  const name = fileName.replace(/^\.\/|\.ts$/g, '')
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}

/**
 * 全局注册所有自定义指令
 * @param app Vue 实例
 */
export const setupDirectives = (app: App) => {
  // 遍历所有导入的指令模块
  Object.entries(directivesModules).forEach(([filePath, directive]) => {
    if (!directive) return

    // 获取指令名（如 ./clickOutside.ts → click-outside）
    const directiveName = getDirectiveName(filePath)

    // 全局注册指令（app.directive('指令名', 指令对象)）
    app.directive(directiveName, directive as Directive)

    // 可选：打印注册日志，方便调试
    console.log(`✅ 自动注册指令：v-${directiveName}`)
  })
}
