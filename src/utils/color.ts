/**
 * 生成 Element Plus 主色变量
 */
export function generatePrimaryVars(color: string) {
  const styles: Record<string, string> = {}

  styles['--el-color-primary'] = color

  for (let i = 1; i <= 9; i++)
    styles[`--el-color-primary-light-${i}`] = `color-mix(in srgb, ${color} ${100 - i * 10}%, white)`

  styles['--el-color-primary-dark-2'] = `color-mix(in srgb, ${color} 80%, black)`

  return styles
}
