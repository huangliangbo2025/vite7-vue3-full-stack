<script setup lang="ts">
import { Graph, Scroller, Snapline } from '@antv/x6'
const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      }
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      },
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5
              }
            }
          }
        }
      }
    }
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1
        }
      }
    }
  ]
}

const el = useTemplateRef('el')
const graphInstance = ref<Graph | null>(null)

onMounted(() => {
  renderGraph()
})

const renderGraph = () => {
  if (graphInstance.value) {
    graphInstance.value.dispose()
  }
  const graph = new Graph({
    container: el.value!,
    // 设置画布背景颜色
    background: {
      color: '#F2F7FA'
    },
    grid: 10,
    panning: true,
    mousewheel: true,
    autoResize: true
  })
  // Snapline 插件可以使节点在拖动过程中显示与其他节点的对齐线
  graph.use(
    new Snapline({
      enabled: true
    })
  )
  // Scroller 插件可以使画布支持滚动
  graph.use(
    new Scroller({
      enabled: true,
      pannable: true
    })
  )
  graph.fromJSON(data) // 渲染元素
  graph.centerContent() // 居中显示
  graphInstance.value = graph
}

const exportData = () => {
  if (graphInstance.value) {
    const json = graphInstance.value.toJSON()
    console.log('exportData', json)
  }
}
</script>

<template>
  <div class="app-content">
    <div class="r-2 fixed top-2 z-10">
      <el-button @click="exportData" size="small">导出数据</el-button>
    </div>
    <div id="container" ref="el" class="h-full w-full"></div>
  </div>
</template>

<style lang="scss" scoped>
.app-content {
  height: calc(100vh);
  width: calc(100vw);
}
</style>
