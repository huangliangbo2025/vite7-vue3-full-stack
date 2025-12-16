/**
 * 核心函数：将路由key数组转换为嵌套树形结构
 * @param {string[]} routeKeys - 排序后的路由key数组
 * @returns {Array} 嵌套树形结构 [{label: string, value: string, children: []}]
 */
export function buildRouteTree(routeKeys: string[]) {
  interface TreeItem {
    label: string
    value: string
    children: TreeItem[]
  }

  const tree: TreeItem[] = []
  // 遍历每个路由key，逐层构建树形结构
  routeKeys.forEach(key => {
    // 分割路径片段（过滤空字符串），如 '/sys-manage/menu' → ['sys-manage', 'menu']
    const segments = key.split('/').filter(seg => seg)
    let currentLevel = tree // 当前层级的节点数组（初始为根节点）
    let currentPath = '' // 拼接当前节点的完整路径

    // 逐层处理每个片段
    segments.forEach((segment, index) => {
      // 拼接当前节点的完整路径（如 'sys-manage' → '/sys-manage'，'menu' → '/sys-manage/menu'）
      currentPath = index === 0 ? `/${segment}` : `${currentPath}/${segment}`

      // 查找当前层级是否已存在该节点
      let existingNode = currentLevel.find(node => node.value === currentPath)

      // 不存在则创建新节点
      if (!existingNode) {
        existingNode = {
          label: currentPath,
          value: currentPath,
          children: [], // 初始化子节点数组
        }
        currentLevel.push(existingNode)
      }

      // 进入下一层级（处理子节点）
      currentLevel = existingNode.children
    })
  })

  return tree
}
