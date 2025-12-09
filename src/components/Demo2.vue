<script setup lang="ts">
import { Graph } from '@antv/x6'

const el = useTemplateRef('el')
const graphInstance = ref<Graph | null>(null)

onMounted(() => {
  renderGraph()
})

const renderGraph = () => {
  const graph = new Graph({
    container: el.value!,
    background: {
      color: '#F2F7FA'
    },
    connecting: {
      // router: 'orth',
      connector: 'smooth',
      allowBlank: false, // 是否允许连接到画布空白处，默认为 true。
      allowMulti: false, // 是否允许在相同的起始节点和终止节点之间创建多条边，默认为 true。
      allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true。
      allowNode: false, // 是否允许边连接到节点（非节点上的连接桩），默认为 true。
      allowEdge: false, // 是否允许边连接到另一个边，默认为 true。
      allowPort: true, // 是否允许边连接到连接桩，默认为 true。
      createEdge() {
        return this.createEdge({
          attrs: {
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1
            }
          }
        })
      }
    },
    highlighting: {
      // 连接桩可以被连接时在连接桩外围渲染一个包围框
      magnetAvailable: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#A4DEB1',
            strokeWidth: 4
          }
        }
      },
      // 连接桩吸附连线时在连接桩外围渲染一个包围框
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4
          }
        }
      }
    }
  })

  graph.on('cell:dblclick', ({ e, x, y, cell, view, ...reset }) => {
    console.log('cell:dblclick', { e, x, y, cell, view }, reset)
  })

  graph.on('edge:connected', ({ isNew, edge }) => {
    console.log('isNew', isNew)
    if (isNew) {
      console.log('edge:connected', edge)
      // 对新创建的边进行插入数据库等持久化操作
    }
  })

  graph.addNode({
    x: 60,
    y: 50,
    width: 100,
    height: 40,
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
        in: {
          position: 'top',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5
            }
          }
        },
        out: {
          position: 'bottom',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5
            }
          }
        }
      },
      items: [
        {
          id: 'port1',
          group: 'in'
        },
        {
          id: 'port2',
          group: 'in'
        },
        {
          id: 'port3',
          group: 'in'
        },
        {
          id: 'port4',
          group: 'out'
        },
        {
          id: 'port5',
          group: 'out'
        }
      ]
    }
  })

  graph.addNode({
    x: 160,
    y: 200,
    width: 100,
    height: 40,
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
        in: {
          position: 'top',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5
            }
          }
        },
        out: {
          position: 'bottom',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5
            }
          }
        }
      },
      items: [
        {
          id: 'port1',
          group: 'in'
        },
        {
          id: 'port2',
          group: 'in'
        },
        {
          id: 'port3',
          group: 'in'
        },
        {
          id: 'port4',
          group: 'out'
        },
        {
          id: 'port5',
          group: 'out'
        }
      ]
    }
  })

  // graph.addEdge({
  //   source: [320, 80],
  //   target: [500, 200],
  //   attrs: {
  //     line: {
  //       stroke: '#8f8f8f',
  //       strokeWidth: 1
  //     }
  //   }
  // })
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
