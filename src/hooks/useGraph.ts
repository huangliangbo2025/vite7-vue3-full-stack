import { Cell, Graph, Shape } from '@antv/x6'
import { MOCK_DATA_1 } from './mock.data'

export const useGraph = () => {
  const LINE_HEIGHT = 24
  const NODE_WIDTH = 150

  const graphInstance = ref<Graph | null>(null)
  const el = ref<HTMLElement | null>(null)

  Graph.registerPortLayout(
    'erPortPosition',
    (portsPositionArgs) => {
      return portsPositionArgs.map((_, index) => {
        return {
          position: {
            x: 0,
            y: (index + 1) * LINE_HEIGHT,
          },
          angle: 0,
        }
      })
    },
    true,
  )

  Graph.registerNode(
    'er-rect',
    {
      inherit: 'rect',
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
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        label: {
          fontWeight: 'bold',
          fill: '#ffffff',
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true,
  )

  const getData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(MOCK_DATA_1)
      }, 1000)
    )

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
      connecting: {
        router: {
          name: 'er',
          args: {
            offset: 25,
            direction: 'H',
          },
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
              },
            },
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
    })

    graphInstance.value = graph

    const data = await getData() as any[]

    const cells: Cell[] = []
    data.forEach((item: any) => {
      if (item.shape === 'edge')
        cells.push(graph.createEdge(item))
      else
        cells.push(graph.createNode(item))
    })
    graph.resetCells(cells)
    graph.zoomToFit({ padding: 10, maxScale: 1 })
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
