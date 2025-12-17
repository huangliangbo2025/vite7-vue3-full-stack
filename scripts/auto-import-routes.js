import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const viewsDir = path.resolve(__dirname, '../src/views') // views目录路径
const outputFile = path.resolve(__dirname, '../src/imported-routes-map.ts') // 输出文件路径

// 需要忽略的目录/文件模式
const ignorePatterns = [
  'components',
  '**/components/**',
  'hooks',
  '**/hooks/**',
  'utils',
  '**/utils/**',
  'helper',
  '**/helper/**',
  '**/auth/**',
  '**/error-page/**',
]

// 控制台颜色代码
const colors = {
  reset: '\x1B[0m',
  cyan: '\x1B[36m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  red: '\x1B[31m',
  magenta: '\x1B[35m',
}

// 状态标记
const status = {
  success: `${colors.green}✓${colors.reset}`,
  info: `${colors.cyan}ℹ${colors.reset}`,
  warning: `${colors.yellow}⚠${colors.reset}`,
  error: `${colors.red}✗${colors.reset}`,
}

// 格式化时间 (毫秒转换为秒或毫秒)
function formatTime(ms) {
  return ms > 1000
    ? `${(ms / 1000).toFixed(2)}秒`
    : `${ms}毫秒`
}

/**
 * 生成路由键名（适配目录+index.vue结构）
 * @param {string} targetPath - 文件/目录路径
 * @param {boolean} isDirectory - 是否为目录
 */
function generateRouteKey(targetPath, isDirectory = false) {
  // 目录直接生成 /目录名 格式
  if (isDirectory)
    return `/${targetPath.replace(/\\/g, '/')}`

  const parsedPath = path.parse(targetPath)
  // index.vue 文件 → 取所在目录作为路由key（如 sys-manage/menu/index.vue → /sys-manage/menu）
  if (parsedPath.name === 'index')
    return `/${parsedPath.dir.replace(/\\/g, '/')}`
  // 非index.vue 文件 → /目录/文件名 格式
  const fullKey = path.join(parsedPath.dir, parsedPath.name).replace(/\\/g, '/')
  return `/${fullKey}`
}

// 路由键排序函数 - 层级浅→深、同层级字母序
function sortRouteKeys(keys) {
  return keys.sort((a, b) => {
    const aSegments = a.split('/').filter(segment => segment)
    const bSegments = b.split('/').filter(segment => segment)

    // 层级浅的在前（如 /sys-manage 排在 /sys-manage/menu 前面）
    if (aSegments.length !== bSegments.length)
      return aSegments.length - bSegments.length

    // 同层级按字母排序
    for (let i = 0; i < aSegments.length; i++) {
      const compare = aSegments[i].localeCompare(bSegments[i])
      if (compare !== 0) return compare
    }
    return 0
  })
}

// 生成路由映射文件
async function generateRouteMap() {
  const startTime = Date.now()

  try {
    console.log(`${status.info} 开始生成路由映射...`)
    console.log(`${status.info} 扫描目录: ${viewsDir}`)
    console.log(`${status.info} 忽略模式: ${ignorePatterns.join(', ')}`)

    // 1. 扫描所有.vue文件（应用忽略规则）
    console.log(`${status.info} 正在扫描Vue组件文件...`)
    const files = await fg('**/*.vue', {
      cwd: viewsDir,
      absolute: false,
      onlyFiles: true,
      ignore: ignorePatterns,
      dot: true, // 支持动态路由(:id)路径
    })

    // 2. 扫描所有目录（应用忽略规则）
    console.log(`${status.info} 正在扫描目录结构...`)
    const directories = await fg('**/', {
      cwd: viewsDir,
      onlyDirectories: true,
      absolute: false,
      ignore: ignorePatterns,
    }).then(dirs => dirs.map(dir => dir.replace(/\/$/, ''))) // 移除目录末尾的/

    if (files.length === 0 && directories.length === 0) {
      console.log(`${status.warning} 未找到任何Vue组件文件或目录`)
      return
    }

    console.log(
      `${status.success} 找到 ${files.length} 个Vue组件文件和 ${directories.length} 个目录`,
    )

    // 3. 构建路由映射
    const routeMap = {}

    // 先处理文件：生成 import 映射
    files.forEach(file => {
      const routeKey = generateRouteKey(file)
      const importPath = `@/views/${file.replace(/\\/g, '/')}` // 统一路径分隔符
      routeMap[routeKey] = `() => import('${importPath}')`
    })

    // 再处理目录：生成 undefined 映射（仅当路由键未被文件占用时）
    directories.forEach(dir => {
      const routeKey = generateRouteKey(dir, true)
      if (!routeMap[routeKey])
        routeMap[routeKey] = 'undefined'
    })

    // 4. 对路由键排序（层级浅→深、字母序）
    const sortedKeys = sortRouteKeys(Object.keys(routeMap))

    // 5. 生成文件内容
    const content = `// 自动生成的路由映射文件，请勿手动修改
// 生成时间: ${new Date().toLocaleString()}
// 文件数量: ${files.length}，目录数量: ${directories.length}
// 忽略目录: ${ignorePatterns.join(', ')}

export default {
${sortedKeys.map(key => `  '${key}': ${routeMap[key]}`).join(',\n')}
} as Record<string, any>
`

    // 6. 写入文件
    console.log(`${status.info} 正在写入文件: ${outputFile}`)
    fs.writeFileSync(outputFile, content, 'utf-8')

    // 输出成功信息
    const endTime = Date.now()
    const duration = endTime - startTime
    console.log(
      `${status.success} 路由映射文件生成成功！${colors.magenta}(${
        formatTime(duration)
      })${colors.reset}`,
    )
    console.log(`${status.info} 输出文件: ${colors.cyan}${outputFile}${colors.reset}`)
  } catch (error) {
    const endTime = Date.now()
    const duration = endTime - startTime
    console.error(
      `\n${status.error} 生成路由映射时出错 ${colors.magenta}(${
        formatTime(duration)
      })${colors.reset}:`,
    )
    console.error(error)
    process.exit(1)
  }
}

// 执行生成任务
console.log(`
${colors.cyan}╔══════════════════════════════════════╗
║    🚀 开始生成 Vue 路由映射文件    ║
╚══════════════════════════════════════╝${colors.reset}
`)

generateRouteMap()
