import { Graph, Shape } from '@antv/x6'
import type { Cell } from '@antv/x6'

import { CustomNode } from '@/nodes/custom-node'
import { ports } from '@/ports'
import imgUrl from './downloaded-image.png'
import { useGraphEvent } from './useGraphEvent'

export const useGraph = () => {
  const graphInstance = ref<Graph | null>(null)
  const el = ref<HTMLElement | null>(null)

  const initialGraphData = async () => {
    const graph = new Graph({
      container: el.value!,
      grid: {
        size: 10,
        visible: true,
        type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
        args: {
          color: '#a0a0a0', // 网格线/点颜色
          thickness: 1, // 网格线宽度/网格点大小
        },
      },
      selecting: {
        enabled: true,
        showNodeSelectionBox: true,
        // rubberband: true,
        modifiers: 'ctrl', // 只在按住 ctrl 键时启用框选
      },
      clipboard: {
        enabled: true,
        useLocalStorage: true,
      },
      keyboard: {
        enabled: true,
        // global: true,
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      connecting: {
        snap: true,
        allowBlank: false, // 不允许连接到空白区域
        // allowMulti: false, // 不允许多重连接
        allowLoop: false, // 不允许自环连接
        allowNode: false, // 不允许允许边链接到节点（非节点上的链接桩）
        allowEdge: false, // 不允许边链接到边
        highlight: true, // 高亮显示可连接的链接桩
        router: {
          name: 'manhattan', // 使用曼哈顿路由
        },
      },
    })

    graphInstance.value = graph

    // 这里绑定复制能功能
    useGraphEvent(graphInstance as Ref<Graph>)

    graph.on('clipboard:changed', ({ cells }: { cells: Cell[] }) => {
      // code here
      console.log('clipboard changed:', cells)
    })

    const rect = new Shape.Rect({
      id: 'node1',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'rect',
      zIndex: 12,
      attrs: {
        // 指定 rect 元素的样式
        body: {
          stroke: '#000', // 边框颜色
          fill: '#00f', // 填充颜色
          strokeWidth: 2, // 边框宽度
        },
        // 指定 text 元素的样式
        label: {
          text: 'rect', // 文字
          fill: '#fff', // 文字颜色
        },
      },
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      data: {
        list: [
          { name: 'bozai', age: 18 },
          { name: 'zhangsan', age: 20 },
        ],
      },
      ports: ports,
    })

    rect.attr('label/fill', '#f00fff')

    const circle = new Shape.Circle({
      id: 'node2',
      x: 280,
      y: 200,
      width: 60,
      height: 60,
      label: 'circle',
      zIndex: 2,
      ports: ports,
    })

    const image = new Shape.Image({
      id: 'node3',
      x: 480,
      y: 200,
      width: 60,
      height: 60,
      url: imgUrl,
    })

    const edge = new Shape.Edge({
      clipboard: true,
      id: 'edge1',
      shape: 'edge', // 指定使用何种图形，默认值为 'edge'
      source: rect,
      target: circle,
      zIndex: 1,
      router: 'orth',
      connector: 'rounded',
      labels: ['x6'],
      attrs: {
        line: {
          stroke: '#7c68fc', // 指定 path 元素的填充色
        },
      },
    })

    graph.addNode(rect)
    const a = graph.addNode(circle)
    console.log('---a---', a)
    // graph.addNode(image)
    graph.addEdge(edge)
    graph.showTools()
    graph.addNode(
      new CustomNode({
        x: 600,
        y: 600,
        data: {
          title: '张三',
          desc: '年龄 18',
        },
      }),
    )

    console.log(graph.getCellCount())
  }

  onMounted(() => {
    initialGraphData()
  })

  onUnmounted(() => {
    graphInstance.value?.dispose()
  })

  return {
    el,
    graphInstance,
  }
}
