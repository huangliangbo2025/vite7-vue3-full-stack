import { ports } from '@/ports'
import { Cell, Graph, Node, Shape } from '@antv/x6'

const shapeName = 'custom-html-node'

/* let CustomNode: any

export function getCustomNode() {
  if (!CustomNode) {
    const name = 'custom-html-node'
    if (!Graph.isNodeRegistered(name)) {
      CustomNode = Shape.HTML.define({
        shape: name,
        width: 200,
        height: 100,
        html(cell) {
          const data = cell.getData()
          const div = document.createElement('div')
          div.innerHTML = `<div>${data.title}</div>`
          return div
        },
      })
    } else {
      CustomNode = Graph.getNodeCtor(name)
    }
  }
  return CustomNode
}
使用案例
graph.addNode(new (getCustomNode())({
  x: 50,
  y: 80,
  data: { title: 'Hello' }
}))

*/

export interface HtmlNodeConfig {
  shape?: string
  width?: number
  height?: number
  effect?: boolean
  html: (cell: Cell) => HTMLElement | string
}
/**
 * HMR 安全的 HTML Node 定义方法
 * @param name 节点名称
 * @param config Shape.HTML.define 的配置
 */
export function defineHtmlNode<T extends HtmlNodeConfig>(name: string, config: T): typeof Node {
  // 1. 如果已注册，直接返回已有类（避免 HMR 重复注册）
  if (Node.registry.exist(name))
    return Node.registry.get(name) as any

  // 2. 否则进行注册
  const NodeClass = Shape.HTML.define({
    shape: name,
    ...config,
  })

  return NodeClass
}

export const CustomNode = defineHtmlNode(shapeName, {
  width: 180,
  height: 200,
  ports: ports,
  html(cell) {
    const data = cell.getData() as { title: string; desc: string }

    const div = document.createElement('div')
    Object.assign(div.style, {
      padding: '10px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      borderRadius: '6px',
      fontSize: '14px',
      width: '180px',
      height: '200px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    } as CSSStyleDeclaration)
    div.innerHTML = `
      <div class="w-180px h-200px">
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
      </div>
    `
    return div
  },
})

// 使用方式
/* graph.addNode(
  new CustomNode({
    x: 100,
    y: 100,
    data: { title: 'Hello', desc: 'World' },
  })
) */
